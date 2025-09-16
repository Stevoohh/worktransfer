import { Component, ElementRef, ViewChild, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTreeModule } from '@angular/material/tree';
import { MatMenuModule } from '@angular/material/menu';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, MatSidenavModule, MatIconModule, MatListModule, MatTreeModule, MatMenuModule, NgFor, NgIf],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('olbsidenav');

  protected readonly isExpanded = signal(true);
  protected readonly showMenuInBanner = signal(false);
  protected readonly logoUrl = '/logo.png';

  private readonly router = inject(Router);
  protected readonly currentUrl = signal<string>('');

  @ViewChild('bannerMenuViewport') bannerMenuViewport?: ElementRef<HTMLDivElement>;
  protected readonly canScrollLeft = signal<boolean>(false);
  protected readonly canScrollRight = signal<boolean>(false);

  protected readonly menu = signal<{
    icon: string;
    label: string;
    route?: string;
    externalUrl?: string;
    expanded?: boolean;
    children?: { icon: string; label: string; route?: string; externalUrl?: string; expanded?: boolean; children?: any[] }[];
  }[]>([
    {
      icon: 'dashboard',
      label: 'Dashboard',
      route: '/dashboard'
    },
    {
      icon: 'folder',
      label: 'Projekte',
      expanded: true,
      children: [
        { icon: 'assignment', label: 'Projekt A', route: '/projekte/a' },
        { icon: 'assignment', label: 'Projekt B', expanded: true, children: [{ icon: 'description', label: 'Berichte', route: '/projekte/b/berichte' }], route: '/projekte/b' }
      ]
    },
    { icon: 'settings', label: 'Einstellungen', route: '/einstellungen' },
    { icon: 'open_in_new', label: 'Beispiellink', externalUrl: 'https://example.com' },
    { icon: 'open_in_new', label: 'Beispiellink', externalUrl: 'https://example.com' },
    { icon: 'open_in_new', label: 'Beispiellink', externalUrl: 'https://example.com' },
    { icon: 'open_in_new', label: 'Beispiellink', externalUrl: 'https://example.com' },
    { icon: 'open_in_new', label: 'Beispiellink', externalUrl: 'https://example.com' },
    { icon: 'open_in_new', label: 'Beispiellink', externalUrl: 'https://example.com' },
    { icon: 'open_in_new', label: 'Beispiellink', externalUrl: 'https://example.com' },
    { icon: 'open_in_new', label: 'Beispiellink', externalUrl: 'https://example.com' },
    { icon: 'open_in_new', label: 'Beispiellink', externalUrl: 'https://example.com' },    
  ]);

  protected toggleNode(node: any): void {
    if (!node.children?.length) {
      return;
    }
    if (!this.isExpanded()) {
      this.isExpanded.set(true);
      node.expanded = true;
      this.menu.update((m) => [...m]);
      return;
    }
    node.expanded = !node.expanded;
    this.menu.update((m) => [...m]);
  }

  protected openExternal(node: any): void {
    if (node?.externalUrl) {
      window.open(node.externalUrl, '_blank', 'noopener');
    }
  }

  protected toggle(): void {
    this.isExpanded.update((v) => !v);
  }

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

  protected toggleMenuPlacement(): void {
    this.showMenuInBanner.update((v) => !v);
    setTimeout(() => this.updateBannerMenuScrollState(), 0);
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
    // Update state after the scroll animation
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
    this.canScrollRight.set(viewport.scrollLeft < maxScrollLeft - 1);
  }
}
