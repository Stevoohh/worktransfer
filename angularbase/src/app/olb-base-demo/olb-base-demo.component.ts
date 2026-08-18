import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { OlbBannerIconService } from "@olb/angular-base";
import { AppStateService } from "../app-state.service";

@Component({
  selector: "app-olb-base-demo",
  templateUrl: "./olb-base-demo.component.html",
  styleUrls: ["./olb-base-demo.component.scss"],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class OlbBaseDemoComponent {
  html = `<olb-base [title]="title" [menuItems]="menu" [appVersion]="appVersion" [logoUrl]="logoUrl"></olb-base>`;

  ts = `navLinks: MenuItem[] = [
  {
    type: MenuType.ITEM,
    icon: "home",
    link: "/",
    text: "Startseite",
  },
  {
    type: MenuType.ITEM,
    icon: "home",
    link: "/olb-base",
    text: "OLB-Base",
  },
  {
    type: MenuType.ITEM,
    icon: "send",
    link: "/test",
    text: "Test",
  }
];`;

  appVersionTs = `
import appPackageJson from "../../package.json";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  appVersion = appPackageJson.version;

  [...]

}
  `;

  appVersionHtml = `
<olb-base [menuItems]="menu" [title]="title" [logoUrl]="logoUrl" [appVersion]="appVersion"></olb-base>
  `;

  menuStructureHtml = `Anchor mittels id. Dieses div oder Dom-Element dann in der Ziel Komponente deiner App deklarieren
<div id="childAnchor"></div>`;

  menuStructureTs = `readonly menu: (MenuHeading | MenuItem)[] = [
      { heading: "Gruppierung 1" },
      {
        icon: "material icon",
        route: "/route",
        label: "Link 1"
      },
      { heading: "Gruppierung 2" },      
      {
        icon: "parent",
        label: "Parent",
        route: "/parent",
        children: [
          {
            icon: "folder",
            label: "Ordner",
            children: [
              {
                icon: "child",
                route: "/parent/child",
                label: "Child",
                anchor: "childAnchor"
              }
            ]
          }
        ]
      },`;

  bannerIconsTs = `private readonly bannerIconService = inject(OlbBannerIconService);

const mailId = this.bannerIconService.add({
  icon: "mail",
  url: "https://www.olb.de"
});

this.bannerIconService.update(mailId, { badge: 15, color: "#ffcc00" });
this.bannerIconService.remove(mailId);`;

  private readonly bannerIconService = inject(OlbBannerIconService);
  private demoIconId: string | null = null;
  private demoBadgeCount = 0;

  constructor(
    private appStateService: AppStateService,
    private router: Router
  ) {}

  openDeeplink() {
    this.router.navigate(["olb-base/deeplink"]);
  }

  addBannerIcon(): void {
    this.demoIconId = this.bannerIconService.add({
      id: "demo-mail",
      icon: "mail",
      url: "https://www.olb.de"
    });
    this.demoBadgeCount = 0;
  }

  updateBannerIconBadge(): void {
    if (!this.demoIconId) {
      this.addBannerIcon();
    }
    this.demoBadgeCount += 1;
    this.bannerIconService.update("demo-mail", { badge: this.demoBadgeCount });
  }

  updateBannerIconColor(): void {
    if (!this.demoIconId) {
      this.addBannerIcon();
    }
    this.bannerIconService.update("demo-mail", { color: "#ff5252" });
  }

  removeBannerIcon(): void {
    this.bannerIconService.remove("demo-mail");
    this.demoIconId = null;
    this.demoBadgeCount = 0;
  }
}
