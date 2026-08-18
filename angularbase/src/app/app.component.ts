import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { MenuHeading, MenuItem, OlbBannerIconService, OlbUserMenuService } from "@olb/angular-base";
import appPackageJson from "../../package.json";
import { AppStateService } from "./app-state.service";
import { UserInfoComponent } from "./olb-base-demo/user-info/user-info.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class AppComponent {
  title = "Angular Demo";
  logoUrl = "assets/images/olb-logo-neg.png";
  appVersion = appPackageJson.version;

  userMenuService = inject(OlbUserMenuService);
  bannerIconService = inject(OlbBannerIconService);
  appStateService = inject(AppStateService);

  readonly menu: (MenuHeading | MenuItem)[] = [
    { heading: "Installation" },
    {
      icon: "download",
      route: "/installation",
      label: "Installation"
    },
    { heading: "Erste Schritte" },
    {
      icon: "settings",
      route: "/api-generation",
      label: "API-Generierung"
    },
    {
      icon: "home",
      label: "OLB-Base",
      route: "/olb-base",
      children: [
        {
          icon: "folder",
          label: "Ordner",
          children: [
            {
              icon: "route",
              route: "/olb-base/deeplink",
              label: "Deeplink",
              anchor: "base-deeplinks"
            }
          ]
        },
        {
          icon: "notifications",
          route: "/olb-base",
          label: "Banner-Icons",
          anchor: "base-banner-icons"
        },
        {
          icon: "route",
          route: "/olb-base/:id/anotherdeeplink",
          label: "Deeplink 2"
        },
        {
          icon: "route",
          route: "/olb-base/anotherdeeplink",
          label: "Deeplink 3"
        }
      ]
    },
    { heading: "Komponenten" },
    {
      icon: "apps",
      route: "/olb-components",
      label: "OLB-Komponenten"
    },
    {
      icon: "edit",
      route: "/olb-form-fields",
      label: "OLB-Formularfelder"
    },
    {
      icon: "oil_barrel",
      route: "/olb-pipes",
      label: "OLB-Pipes"
    },
    {
      icon: "view_in_ar",
      route: "/olb-directives",
      label: "OLB-Direktiven"
    },
    {
      icon: "view_in_ar",
      route: "/olb-services",
      label: "OLB-Services"
    },
    {
      icon: "table_view",
      route: "/tables",
      label: "Tabellen"
    },
    {
      icon: "security",
      route: "/authorization",
      label: "Berechtigungen"
    },
    {
      icon: "description",
      route: "/filetransfers",
      label: "Dateiübertragung"
    },
    { heading: "Look and Feel" },
    {
      icon: "palette",
      route: "/theming",
      label: "Themen"
    },
    { heading: "Aktueller Stand" },
    {
      icon: "tag",
      route: "/versions",
      label: "Versionen"
    },
    {
      icon: "update",
      route: "/updates",
      label: "Updates"
    },
    {
      icon: "help",
      externalUrl: "/assets/documents/test.pdf",
      label: "Hilfe"
    }
  ];

  constructor() {
    this.userMenuService.show(UserInfoComponent);

    const homeIconId = this.bannerIconService.add({
      icon: "home",
      url: "https://www.olb.de"
    });
    this.bannerIconService.add({
      icon: "help",
      url: "https://www.olb.de",
      color: "#ffeb3b"
    });

    setTimeout(() => {
      this.bannerIconService.update(homeIconId, { badge: 15, color: "#8de23c" });
    }, 2500);
  }
}
