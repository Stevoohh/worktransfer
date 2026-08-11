import { ViewportScroller } from "@angular/common";
import { Component, inject, input, signal, ChangeDetectionStrategy } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs";
import { MenuItem } from "../menu-item";

@Component({
  selector: "olb-nav-menu-child-items",
  templateUrl: "./nav-menu-child-items.component.html",
  styleUrls: ["./nav-menu-child-items.component.scss"],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [MatIconModule, MatMenuModule, NavMenuChildItemsComponent]
})
export class NavMenuChildItemsComponent {
  items = input<MenuItem[]>([]);
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
