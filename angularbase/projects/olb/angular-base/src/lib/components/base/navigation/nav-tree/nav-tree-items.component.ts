import { ViewportScroller } from "@angular/common";
import { ChangeDetectionStrategy, Component, effect, inject, input, output, signal } from "@angular/core";
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

  /** Erhöht sich nach Auto-Expand, damit das Template neu gerendert wird. */
  protected readonly expandRevision = signal(0);

  constructor(private readonly router: Router) {}
  private readonly viewportScroller = inject(ViewportScroller);

  // Auto-expand any ancestor nodes whose subtree contains the current URL
  private readonly autoExpandEffect = effect(() => {
    const url = this.normalizeUrl(this.currentUrl());
    const items = this.nodes();

    if (!url || !Array.isArray(items) || items.length === 0) {
      return;
    }

    if (this.expandAncestorsForUrl(items, url)) {
      this.expandRevision.update(v => v + 1);
    }
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
      this.expandRevision.update(v => v + 1);
      return;
    }
    node.expanded = !node.expanded;
    this.expandRevision.update(v => v + 1);
  }

  protected onParentClick(node: any): void {
    if (node?.children?.length) {
      if (!this.isExpanded()) {
        // Open sidenav first, then toggle this node and navigate if route exists
        this.toggleRequested.emit();
        node.expanded = !node.expanded;
        this.expandRevision.update(v => v + 1);
        if (node.route) {
          this.router.navigateByUrl(this.resolveRoute(node.route));
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

  /** Ersetzt :param-Segmente durch aktuelle Router-Params (Fallback: Param-Name ohne ':'). */
  protected resolveRoute(route: string): string {
    const params = this.collectRouteParams();
    const resolved = this.getSegments(route)
      .map(segment => {
        if (!segment.startsWith(":")) {
          return segment;
        }
        const paramName = segment.slice(1);
        return params[paramName] ?? paramName;
      })
      .join("/");
    return route.startsWith("/") ? `/${resolved}` : resolved;
  }

  private collectRouteParams(): Record<string, string> {
    const params: Record<string, string> = {};
    let route = this.router.routerState.snapshot.root;
    while (route) {
      Object.assign(params, route.params);
      route = route.firstChild!;
    }
    return params;
  }

  protected openExternal(node: any): void {
    if (node?.externalUrl) {
      window.open(node.externalUrl, "_blank", "noopener");
    }
  }

  protected isActive(node: MenuItem): boolean {
    if (!node?.route) {
      return false;
    }

    return this.matchesRoute(node.route, this.normalizeUrl(this.currentUrl()));
  }

  protected isAncestorActive(node: any): boolean {
    if (!node?.children?.length) return false;
    return this.hasDescendantWithRoute(node, this.normalizeUrl(this.currentUrl()));
  }

  private matchesRoute(route: string, currentUrl: string): boolean {
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

  private normalizeUrl(url: string): string {
    return (url || "").split("?")[0].split("#")[0];
  }

  private getSegments(url: string): string[] {
    return url.split("/").filter(Boolean);
  }

  private hasDescendantWithRoute(node: any, url: string): boolean {
    if (!node?.children?.length) return false;
    for (const child of node.children) {
      if (child?.route && this.matchesRoute(child.route, url)) return true;
      if (child?.children?.length && this.hasDescendantWithRoute(child, url)) return true;
    }
    return false;
  }

  /**
   * Klappt alle Vorfahren eines zur URL passenden Menüeintrags auf.
   * @returns true, wenn mindestens ein `expanded`-Flag neu gesetzt wurde
   */
  private expandAncestorsForUrl(nodes: (MenuItem | MenuHeading)[], url: string): boolean {
    let changed = false;

    for (const node of nodes) {
      if (this.isHeading(node)) {
        continue;
      }

      if (!node.children?.length) {
        continue;
      }

      const childChanged = this.expandAncestorsForUrl(node.children, url);
      changed ||= childChanged;

      const shouldExpand =
        this.matchesRoute(node.route || "", url) || this.hasDescendantWithRoute(node, url);

      if (shouldExpand && !node.expanded) {
        node.expanded = true;
        changed = true;
      }
    }

    return changed;
  }

  private navigateWithAnchor(route: string, anchor?: string): void {
    const resolvedRoute = this.resolveRoute(route);
    if (!anchor) {
      this.router.navigateByUrl(resolvedRoute);
      return;
    }
    const currentPath = window?.location?.pathname || "";
    const navigate = currentPath !== resolvedRoute ? this.router.navigateByUrl(resolvedRoute + "#" + anchor) : Promise.resolve(true);
    navigate.then(() => {
      setTimeout(() => this.viewportScroller.scrollToAnchor(anchor), 0);
    });
  }
}
