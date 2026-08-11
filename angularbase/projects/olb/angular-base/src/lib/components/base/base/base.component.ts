import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, effect, Inject, inject, input, OnInit, Optional, signal } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTreeModule } from "@angular/material/tree";
import { Router, RouterModule, RouterOutlet } from "@angular/router";

import { OverlayModule } from "@angular/cdk/overlay";
import { MatButtonModule } from "@angular/material/button";
import { Title } from "@angular/platform-browser";

import moment from "moment";
import { OLB_BASE_CONFIG_TOKEN, OlbBaseConfig } from "../../../config/olb-base-config";
import { OlbAuthenticationService } from "../../../services/olb-authentication.service";
import { OlbEnvironmentService } from "../../../services/olb-environment.service";
import { OlbKordobaEnvironmentService } from "../../../services/olb-kordoba-environment.service";
import { OlbUserMenuService } from "../../../services/olb-user-menu.service";
import { ThemeService } from "../../../services/theme/theme.service";
import { DynamicHostComponent } from "../dynamic-host/dynamic-host.component";
import { MenuHeading } from "../navigation/menu-heading";
import { MenuItem } from "../navigation/menu-item";
import { NavMenuComponent } from "../navigation/nav-menu/nav-menu.component";
import { NavTreeComponent } from "../navigation/nav-tree/nav-tree.component";

@Component({
  selector: "olb-base",
  templateUrl: "./base.component.html",
  styleUrls: ["./base.component.scss"],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    RouterOutlet,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTreeModule,
    MatMenuModule,
    NavMenuComponent,
    NavTreeComponent,
    OverlayModule,
    DynamicHostComponent
  ]
})
export class BaseComponent implements OnInit {
  appVersion = input<string>("n.v.");
  baseVersion = "22.1.0";

  title = input<string>("App-Name nicht gesetzt");
  logoUrl = input<string>("/assets/images/olb-logo-neg.png");
  menuItems = input<(MenuHeading | MenuItem)[]>([]);
  menu = signal<(MenuHeading | MenuItem)[]>([]);
  showCustomUserMenu = false;
  userMenuisOpen = false;

  private readonly router = inject(Router);
  private readonly themeService = inject(ThemeService);
  private readonly environmentService = inject(OlbEnvironmentService);
  private readonly olbUserMenuService = inject(OlbUserMenuService);
  // private breakpointObserver: BreakpointObserver,
  // public olbSidebarService: OlbSidebarService,  // denke das braucht man nicht mehr
  public readonly authenticationService = inject(OlbAuthenticationService);
  public readonly kordobaEnvironmentService = inject(OlbKordobaEnvironmentService);

  protected toolbarClass = "prod";
  protected readonly isExpanded = signal(true);
  protected readonly showMenuInBanner = signal(false);
  protected readonly currentUrl = signal<string>("");

  // Für das autom. umschalten in kl. menü wenn die bildschirmbreite zu klein wird
  // isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
  //   map(result => result.matches),
  //   shareReplay()
  // );

  constructor(
    private readonly titleService: Title,
    @Optional() @Inject(OLB_BASE_CONFIG_TOKEN) public readonly config: OlbBaseConfig | null
  ) {
    effect(() => {
      this.menu.set(this.menuItems());
      this.setImagePathByThemeType(this.themeService.darkTheme());
    });

    // Initialize current url
    this.currentUrl.set(globalThis?.location?.pathname || "");
    // Keep url updated
    this.router.events.subscribe((evt: any) => {
      if (evt?.constructor?.name === "NavigationEnd") {
        this.currentUrl.set(this.router.url);
      }
    });

    if (config?.authEnabled) {
      this.forwardAfterLogin();
    }

    this.setToolbarClass();
    effect(() => {
      const customUserMenuComponent = this.olbUserMenuService.component();
      customUserMenuComponent ? (this.showCustomUserMenu = true) : (this.showCustomUserMenu = false);
    });
  }

  ngOnInit(): void {
    this.setTitle();
  }

  protected isHeading(item: any): item is { heading: string } {
    return !!item && typeof item.heading === "string";
  }

  protected isItem(item: any): item is MenuItem {
    return !!item && typeof item.heading !== "string";
  }

  protected toggleNode(node: any): void {
    if (!node.children?.length) {
      return;
    }
    if (!this.isExpanded()) {
      this.isExpanded.set(true);
      node.expanded = true;
      this.menu.update((m: (MenuHeading | MenuItem)[]) => [...m]);
      return;
    }
    node.expanded = !node.expanded;
    this.menu.update((m: (MenuHeading | MenuItem)[]) => [...m]);
  }

  protected openExternal(node: any): void {
    if (node?.externalUrl) {
      window.open(node.externalUrl, "_blank", "noopener");
    }
  }

  protected toggle(): void {
    this.isExpanded.update(v => !v);
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
    this.showMenuInBanner.update(v => !v);
  }

  protected navigateTo(route: string | undefined): void {
    if (!route) return;
    this.router.navigateByUrl(route);
  }

  private forwardAfterLogin() {
    // When user is not logged in, he is first redirected to the backend and keycloak
    // With these redirects, the originally requested path gets lost
    // thats why we save it here and reapply it if we get redirected back to the homepage a short amount of time after
    if (globalThis.location.pathname === "/") {
      const loginPath = localStorage.getItem("login.path");
      const loginTimestamp = localStorage.getItem("login.timestamp");
      console.log("Checking previous login request: ", loginPath, loginTimestamp);
      if (loginTimestamp && moment(loginTimestamp).isAfter(moment().subtract(7, "seconds"))) {
        this.router.navigate([loginPath]);
      }
    } else {
      console.log("Setting login path to ", globalThis.location.pathname);
      localStorage.setItem("login.path", globalThis.location.pathname);
      localStorage.setItem("login.timestamp", moment().toISOString());
    }
  }

  private setToolbarClass() {
    this.toolbarClass = this.environmentService.getEnvironment();
  }

  private setImagePathByThemeType(_isDarkTheme: boolean) {
    // reaktivieren wenn das themeing umgesetzt wird
    // if (this.toolbarClass === OlbEnvironment.dev || this.toolbarClass === OlbEnvironment.prod) {
    //   if (isDarkTheme) {
    //     this.imagePath = "assets/images/OLB_Superzeichen_pos_RGB.svg";
    //   } else {
    //     this.imagePath = "assets/images/OLB_Superzeichen_neg_RGB.svg";
    //   }
    // } else {
    //   this.imagePath = "assets/images/OLB_Superzeichen_neg_RGB.svg";
    // }
  }

  private setTitle() {
    this.titleService.setTitle(this.title() + " " + (globalThis.location.host.includes("localhost") ? "Lokal" : this.toolbarClass));
  }
}
