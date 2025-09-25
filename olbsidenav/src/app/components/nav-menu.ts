import { Component, ElementRef, ViewChild, input, signal, inject, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NavMenuChildItemComponent } from './nav-menu-child-item';

@Component({
  selector: 'nav-menu',
  standalone: true,
  imports: [MatIconModule, MatMenuModule, NavMenuChildItemComponent],
  templateUrl: './nav-menu.html',
  styleUrls: ['../app.scss']
})
export class NavMenuComponent implements AfterViewInit {
  menu = input<Array<any>>([]);

  @ViewChild('bannerMenuViewport') bannerMenuViewport?: ElementRef<HTMLDivElement>;
  protected readonly canScrollLeft = signal<boolean>(false);
  protected readonly canScrollRight = signal<boolean>(false);
  protected readonly currentUrl = signal<string>('');

  private readonly router = inject(Router);

  constructor() {
    // Initialize current url
    this.currentUrl.set(window?.location?.pathname || '');
    // Keep url updated
    this.router.events.subscribe((evt: any) => {
      if (evt?.constructor?.name === 'NavigationEnd') {
        this.currentUrl.set(this.router.url);
      }
    });
  }

  ngAfterViewInit(): void {
    // nach dem ersten Render prüfen
    this.updateBannerMenuScrollState();

    // optional: auch bei Fenster-Resize prüfen
    window.addEventListener('resize', this.updateBannerMenuScrollState.bind(this));
  }

  protected isItem(item: any): boolean {
    return !!item && typeof (item as any).heading !== 'string';
  }

  protected isActive(node: any): boolean {
    return !!node?.route && this.currentUrl() === node.route;
  }

  protected isAncestorActive(node: any): boolean {
    if (!node?.children?.length) return false;
    return this.hasDescendantWithRoute(node, this.currentUrl());
  }

  private hasDescendantWithRoute(node: any, url: string): boolean {
    if (!node?.children?.length) return false;
    for (const child of node.children) {
      if (child?.route && child.route === url) return true;
      if (child?.children?.length && this.hasDescendantWithRoute(child, url)) return true;
    }
    return false;
  }

  protected openExternal(node: any): void {
    if (node?.externalUrl) {
      window.open(node.externalUrl, '_blank', 'noopener');
    }
  }

  protected navigateTo(route: string | undefined): void {
    if (!route) return;
    this.router.navigateByUrl(route);
  }

  protected onBannerMenuScroll(): void {
    this.updateBannerMenuScrollState();
  }

  protected scrollBannerMenu(direction: 1 | -1): void {
    const viewport = this.bannerMenuViewport?.nativeElement;
    if (!viewport) return;
    const delta = Math.max(200, viewport.clientWidth * 0.6) * direction;
    viewport.scrollBy({ left: delta, behavior: 'smooth' });
    setTimeout(() => this.updateBannerMenuScrollState(), 300);
  }

  private updateBannerMenuScrollState(): void {
    const viewport = this.bannerMenuViewport?.nativeElement;
  if (!viewport) {
    this.canScrollLeft.set(false);
    this.canScrollRight.set(false);
    return;
  }

  const maxScrollLeft = viewport.scrollWidth - viewport.clientWidth;

  this.canScrollLeft.set(viewport.scrollLeft > 0);
  this.canScrollRight.set(Math.ceil(viewport.scrollLeft) < Math.floor(maxScrollLeft));
}
}

