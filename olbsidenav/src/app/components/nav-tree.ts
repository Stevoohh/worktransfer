import { Component, inject, signal, input, output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'nav-tree',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  templateUrl: './nav-tree.html',
  styleUrls: ['../app.scss']
})
export class NavTreeComponent {
  menu = input<Array<any>>([]);
  readonly isExpanded = input<boolean>(true);
  readonly toggleRequested = output<void>();
  private readonly router = inject(Router);
  protected readonly currentUrl = signal<string>('');

  constructor() {
    this.currentUrl.set(window?.location?.pathname || '');
    this.router.events.subscribe((evt: any) => {
      if (evt?.constructor?.name === 'NavigationEnd') {
        this.currentUrl.set(this.router.url);
      }
    });
  }

  protected isHeading(item: any): item is { heading: string } {
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

  protected onToggle(): void {
    this.toggleRequested.emit();
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


