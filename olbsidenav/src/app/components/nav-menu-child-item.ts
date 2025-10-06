import { Component, input, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MenuItem } from '../types/menu.types';

@Component({
  selector: 'nav-menu-child-item',
  standalone: true,
  imports: [MatIconModule, MatMenuModule, NavMenuChildItemComponent],
  template: `
    @for (item of items(); track item.label) {
      @if (!item.children?.length) {
        <button mat-menu-item 
                [class.active]="isActive(item)"
                (click)="item.externalUrl ? openExternal(item) : navigateTo(item.route, item.anchor)">
          <mat-icon>{{ item.icon }}</mat-icon>
          <span>{{ item.label }}</span>
          @if (item.badge) {
            <span class="badge" [class]="'badge ' + (item.badgeVariant || 'neutral')">{{ item.badge }}</span>
          }
        </button>
      } @else {
        <button mat-menu-item 
                [class.active]="isActive(item)"
                [class.ancestor-active]="isAncestorActive(item)"
                [matMenuTriggerFor]="subMenuRef">
          <mat-icon>{{ item.icon }}</mat-icon>
          <span>{{ item.label }}</span>
          @if (item.badge) {
            <span class="badge" [class]="'badge ' + (item.badgeVariant || 'neutral')">{{ item.badge }}</span>
          }
          <mat-icon>chevron_right</mat-icon>
        </button>
        <mat-menu #subMenuRef="matMenu">
          <nav-menu-child-item [items]="item.children || []"></nav-menu-child-item>
        </mat-menu>
      }
    }
  `,
  styleUrls: ['../app.scss']
})
export class NavMenuChildItemComponent {
  items = input<MenuItem[]>([]);
  protected readonly currentUrl = signal<string>('');

  private readonly router = inject(Router);
  private readonly viewportScroller = inject(ViewportScroller);

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

  protected openExternal(node: any): void {
    if (node?.externalUrl) {
      window.open(node.externalUrl, '_blank', 'noopener');
    }
  }

  protected navigateTo(route: string | undefined, anchor?: string): void {
    if (!route) return;
    if (!anchor) {
      this.router.navigateByUrl(route);
      return;
    }
    const currentPath = window?.location?.pathname || '';
    const navigate = currentPath !== route
      ? this.router.navigateByUrl(route + '#' + anchor)
      : Promise.resolve(true);
    navigate.then(() => {
      setTimeout(() => this.viewportScroller.scrollToAnchor(anchor, { behavior: 'smooth' }), 0);
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
}
