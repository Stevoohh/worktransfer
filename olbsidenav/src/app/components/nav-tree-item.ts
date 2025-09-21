import { Component, input, output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MenuItem, MenuHeading } from '../types/menu.types';

@Component({
  selector: 'nav-tree-item',
  standalone: true,
  imports: [RouterLink, MatIconModule, NavTreeItemComponent],
  template: `
    @for (node of nodes(); track $index) {
      @if (isHeading(node)) {
        @if (isExpanded()) {
          <li class="menu-heading">{{ node.heading }}</li>
        }
      } @else {
        <li class="menu-item" [class.active]="isActive(node)" [class.ancestor-active]="isAncestorActive(node)">
          <div class="menu-row" [class.clickable]="node.children?.length" (click)="onParentClick(node)" [routerLink]="!node.children?.length && node.route ? node.route : null">
            <mat-icon class="menu-icon">{{ node.icon }}</mat-icon>
            @if (isExpanded()) {
              <span class="menu-label">{{ node.label }}</span>
              <span class="spacer"></span>
              @if (node.badge) {
                <span class="badge" [class]="'badge ' + (node.badgeVariant || 'neutral')">{{ node.badge }}</span>
              }
              @if (node.children?.length) {
                <mat-icon>{{ node.expanded ? 'expand_less' : 'expand_more' }}</mat-icon>
              }
            }
          </div>

          @if (node.children?.length && node.expanded && isExpanded()) {
            <ul class="submenu">
              <nav-tree-item 
                [nodes]="node.children || []" 
                [isExpanded]="isExpanded()" 
                [currentUrl]="currentUrl()"
                (toggleRequested)="toggleRequested.emit()">
              </nav-tree-item>
            </ul>
          }
        </li>
      }
    }
  `,
  styleUrls: ['../app.scss']
})
export class NavTreeItemComponent {
  nodes = input<Array<MenuItem | MenuHeading>>([]);
  isExpanded = input<boolean>(true);
  currentUrl = input<string>('');
  readonly toggleRequested = output<void>();

  constructor(private readonly router: Router) {}

  protected isHeading(item: any): item is MenuHeading {
    return !!item && typeof (item as any).heading === 'string';
  }

  protected isItem(item: any): boolean {
    return !!item && typeof (item as any).heading !== 'string';
  }

  protected toggleNode(node: any): void {
    if (!node.children?.length) return;
    if (!this.isExpanded()) {
      node.expanded = true;
      return;
    }
    node.expanded = !node.expanded;
  }

  protected onParentClick(node: any): void {
    if (node?.children?.length) {
      if (!this.isExpanded()) {
        // Open sidenav first, then toggle this node and navigate if route exists
        this.toggleRequested.emit();
        node.expanded = !node.expanded;
        if (node.route) {
          this.router.navigateByUrl(node.route);
        }
        return;
      }
      // Sidenav is expanded: toggle node state and navigate if route exists
      this.toggleNode(node);
      if (node.route) {
        this.router.navigateByUrl(node.route);
      }
      return;
    }
    // Leaf node
    if (node?.externalUrl) {
      this.openExternal(node);
      return;
    }
    if (node?.route) {
      this.router.navigateByUrl(node.route);
    }
  }

  protected openExternal(node: any): void {
    if (node?.externalUrl) {
      window.open(node.externalUrl, '_blank', 'noopener');
    }
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
