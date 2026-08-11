import { ViewportScroller } from "@angular/common";
import { AfterViewInit, Component, ElementRef, ViewChild, inject, input, signal, ChangeDetectionStrategy } from "@angular/core";
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
    // Initialize current url
    this.currentUrl.set(window?.location?.pathname || "");
    // Keep url updated
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      const url = event.urlAfterRedirects;
      this.currentUrl.set(url);
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
      window.open(node.externalUrl, "_blank", "noopener");
    }
  }

  protected navigateTo(route: string | undefined, anchor?: string): void {
    if (!route) return;
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
