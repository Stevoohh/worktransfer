import { NgModule } from "@angular/core";
import { ExtraOptions, RouterModule, Routes } from "@angular/router";
import { ApiGenerationComponent } from "./api-generation/api-generation.component";
import { AuthorizationComponent } from "./authorization/authorization.component";
import { DirectivesComponent } from "./directives/directives.component";
import { FiletransfersComponent } from "./filetransfers/filetransfers.component";
import { HomeComponent } from "./home/home.component";
import { DeepLinkComponent } from "./olb-base-demo/deep-link/deep-link.component";
import { OlbBaseDemoComponent } from "./olb-base-demo/olb-base-demo.component";
import { OlbComponentsDemoComponent } from "./olb-components-demo/olb-components-component-demo.component";
import { OlbFormFieldsComponent } from "./olb-form-fields-demo/olb-form-fields.component";
import { PipesComponent } from "./pipes/pipes.component";
import { ServicesComponent } from "./services/services.component";
import { SimplemattableComponent } from "./simplemattable/simplemattable.component";
import { ThemingComponent } from "./theming/theming.component";
import { UpdatesComponent } from "./updates/updates.component";
import { VersionComponent } from "./version/version.component";

const routes: Routes = [
  {
    path: "installation",
    component: HomeComponent
  },
  {
    path: "olb-base",
    component: OlbBaseDemoComponent,
    children: [
      {
        path: "deeplink",
        component: DeepLinkComponent
      },
      {
        path: "anotherdeeplink",
        component: DeepLinkComponent
      },
      {
        path: ":id",
        children: [
          {
            path: "overview",
            component: DeepLinkComponent
          },
          {
            path: "anotherdeeplink",
            component: DeepLinkComponent
          }
        ]
      }
    ]
  },
  {
    path: "olb-components",
    component: OlbComponentsDemoComponent
  },
  {
    path: "olb-form-fields",
    component: OlbFormFieldsComponent
  },
  {
    path: "olb-pipes",
    component: PipesComponent
  },
  {
    path: "olb-directives",
    component: DirectivesComponent
  },
  {
    path: "olb-services",
    component: ServicesComponent
  },
  {
    path: "authorization",
    component: AuthorizationComponent
  },
  {
    path: "api-generation",
    component: ApiGenerationComponent
  },
  {
    path: "tables",
    component: SimplemattableComponent
  },
  {
    path: "versions",
    component: VersionComponent
  },
  {
    path: "filetransfers",
    component: FiletransfersComponent
  },
  {
    path: "theming",
    component: ThemingComponent
  },
  {
    path: "updates",
    component: UpdatesComponent
  },
  {
    path: "",
    pathMatch: "full",
    component: HomeComponent
  }
];

const _routerOptions: ExtraOptions = {
  anchorScrolling: "enabled",
  scrollOffset: [0, 80],
  scrollPositionRestoration: "enabled"
};

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
