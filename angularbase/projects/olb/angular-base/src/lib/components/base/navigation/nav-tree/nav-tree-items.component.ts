import { ViewportScroller } from "@angular/common";
import { ChangeDetectionStrategy, Component, effect, inject, input, output } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { Router, RouterLink } from "@angular/router";
import { MenuHeading } from "../menu-heading";
import { MenuItem } from "../menu-item";

@Component({
  selector: "olb-nav-tree-items",
  standalone: true,
  imports: [RouterLink, MatIconModule, NavTreeItemsComponent],
  templateUrl: "./nav-tree-items.component.html",
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ["./nav-tree-items.component.scss"]
})
export class NavTreeItemsComponent {
  nodes = input<(MenuItem | MenuHeading)[]>([]);
  isExpanded = input<boolean>(true);
  currentUrl = input<string>("");
  readonly toggleRequested = output<void>();

  constructor(private readonly router: Router) {}
  private readonly viewportScroller = inject(ViewportScroller);

  // Auto-expand any ancestor nodes whose subtree contains the current URL
  private readonly autoExpandEffect = effect(() => {
    const url = this.currentUrl();
    const items = this.nodes();

    if (!url || !Array.isArray(items) || items.length === 0) {
      return;
    }

    this.expandAncestorsForUrl(items);
  });

  protected isHeading(item: any): item is MenuHeading {
    return !!item && typeof (item as any).heading === "string";
  }

  protected isItem(item: any): boolean {
    return !!item && typeof (item as any).heading !== "string";
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
    console.log("##############onParentClick node: ", node);
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
        this.navigateWithAnchor(node.route, node.anchor);
      }
      return;
    }
    // Leaf node
    if (node?.externalUrl) {
      this.openExternal(node);
      return;
    }
    if (node?.route) {
      this.navigateWithAnchor(node.route, node.anchor);
    }
  }

  protected openExternal(node: any): void {
    if (node?.externalUrl) {
      window.open(node.externalUrl, "_blank", "noopener");
    }
  }

  protected isActive(node: MenuItem): boolean {
    // return !!node?.route && this.currentUrl() === node.route;
    if (!node?.route) {
      return false;
    }

    return this.matchesRoute(node.route);
  }

  protected isAncestorActive(node: any): boolean {
    if (!node?.children?.length) return false;
    return this.hasDescendantWithRoute(node, this.currentUrl());
  }

  private matchesRoute(route: string): boolean {
    const currentUrl = this.router.url.split("?")[0].split("#")[0];

    const routeSegments = this.getSegments(route);
    const currentSegments = this.getSegments(currentUrl);

    if (routeSegments.length !== currentSegments.length) {
      return false;
    }

    return routeSegments.every((segment, index) => {
      // :id, :customerId etc. matchen jeden URL-Segment
      if (segment.startsWith(":")) {
        return true;
      }

      return segment === currentSegments[index];
    });
  }

  private getSegments(url: string): string[] {
    return url.split("/").filter(Boolean);
  }

  private hasDescendantWithRoute(node: any, url: string): boolean {
    if (!node?.children?.length) return false;
    for (const child of node.children) {
      if (child?.route && child.route === url) return true;
      if (child?.children?.length && this.hasDescendantWithRoute(child, url)) return true;
    }
    return false;
  }

  private expandAncestorsForUrl(nodes: (MenuItem | MenuHeading)[]): boolean {
    let foundInThisLevel = false;

    for (const node of nodes) {
      if (this.isHeading(node)) {
        continue;
      }

      let foundHere = false;

      if (this.isActive(node)) {
        foundHere = true;
      } else if (node.children?.length) {
        const foundInChildren = this.expandAncestorsForUrl(node.children);

        if (foundInChildren) {
          node.expanded = true;
          foundHere = true;
        }
      }

      foundInThisLevel ||= foundHere;
    }

    return foundInThisLevel;
  }

  private navigateWithAnchor(route: string, anchor?: string): void {
    if (!anchor) {
      this.router.navigateByUrl(route);
      return;
    }
    const currentPath = window?.location?.pathname || "";
    const navigate = currentPath !== route ? this.router.navigateByUrl(route + "#" + anchor) : Promise.resolve(true);
    navigate.then(() => {
      setTimeout(() => this.viewportScroller.scrollToAnchor(anchor), 0);
    });
  }
}
