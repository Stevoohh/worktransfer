import { Component, ElementRef, ViewChild, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'nav-menu',
  standalone: true,
  imports: [NgFor, NgIf, MatIconModule, MatMenuModule],
  templateUrl: './nav-menu.html',
  styleUrls: ['../app.scss']
})
export class NavMenuComponent {
  menu = input<Array<any>>([]);

  @ViewChild('bannerMenuViewport') bannerMenuViewport?: ElementRef<HTMLDivElement>;
  protected readonly canScrollLeft = signal<boolean>(false);
  protected readonly canScrollRight = signal<boolean>(false);

  constructor(private readonly router: Router) {}

  protected isItem(item: any): boolean {
    return !!item && typeof (item as any).heading !== 'string';
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
    this.canScrollRight.set(viewport.scrollLeft < maxScrollLeft - 1);
  }
}


