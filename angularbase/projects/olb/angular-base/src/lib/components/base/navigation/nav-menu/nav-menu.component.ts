import { ViewportScroller } from "@angular/common";
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild, inject, input, signal } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs";
import { NavMenuChildItemsComponent } from "./nav-menu-child-items.component";

@Component({
  selector: "olb-nav-menu",
  standalone: true,
  imports: [MatIconModule, MatMenuModule, NavMenuChildItemsComponent],
  templateUrl: "./nav-menu.component.html",
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ["./nav-menu.component.scss"]
})
export class NavMenuComponent implements AfterViewInit {
  menu = input<any[]>([]);

  @ViewChild("bannerMenuViewport") bannerMenuViewport?: ElementRef<HTMLDivElement>;
  protected readonly canScrollLeft = signal<boolean>(false);
  protected readonly canScrollRight = signal<boolean>(false);
  protected readonly currentUrl = signal<string>("");

  private readonly router = inject(Router);
  private readonly viewportScroller = inject(ViewportScroller);

  constructor() {
    this.currentUrl.set(this.normalizeUrl(window?.location?.pathname || ""));
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      this.currentUrl.set(this.normalizeUrl(event.urlAfterRedirects));
    });
  }

  ngAfterViewInit(): void {
    // nach dem ersten Render prüfen
    setTimeout(() => {
      this.updateBannerMenuScrollState();
    }, 500);

    // auch bei Fenster-Resize prüfen
    window.addEventListener("resize", this.updateBannerMenuScrollState.bind(this));
  }

  protected isItem(item: any): boolean {
    return !!item && typeof (item as any).heading !== "string";
  }

  protected isActive(node: any): boolean {
    if (!node?.route) {
      return false;
    }
    return this.matchesRoute(node.route, this.currentUrl());
  }

  protected isAncestorActive(node: any): boolean {
    if (!node?.children?.length) return false;
    return this.hasDescendantWithRoute(node, this.currentUrl());
  }

  protected openExternal(node: any): void {
    if (node?.externalUrl) {
      window.open(node.externalUrl, "_blank", "noopener");
    }
  }

  protected navigateTo(route: string | undefined, anchor?: string): void {
    if (!route) return;
    const resolvedRoute = this.resolveRoute(route);
    if (!anchor) {
      this.router.navigateByUrl(resolvedRoute);
      return;
    }
    const currentPath = this.normalizeUrl(window?.location?.pathname || "");
    const navigate = currentPath !== resolvedRoute ? this.router.navigateByUrl(resolvedRoute + "#" + anchor) : Promise.resolve(true);
    navigate.then(() => {
      setTimeout(() => this.viewportScroller.scrollToAnchor(anchor), 0);
    });
  }

  protected onBannerMenuScroll(): void {
    this.updateBannerMenuScrollState();
  }

  protected scrollBannerMenu(direction: 1 | -1): void {
    const viewport = this.bannerMenuViewport?.nativeElement;
    if (!viewport) return;
    const delta = Math.max(200, viewport.clientWidth * 0.6) * direction;
    viewport.scrollBy({ left: delta, behavior: "smooth" });
    setTimeout(() => this.updateBannerMenuScrollState(), 300);
  }

  private resolveRoute(route: string): string {
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

  private matchesRoute(route: string, currentUrl: string): boolean {
    const routeSegments = this.getSegments(route);
    const currentSegments = this.getSegments(currentUrl);

    if (routeSegments.length !== currentSegments.length) {
      return false;
    }

    return routeSegments.every((segment, index) => {
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
