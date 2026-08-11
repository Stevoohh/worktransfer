import { LOCALE_ID, NgModule } from "@angular/core";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { AngularBaseModule } from "@olb/angular-base";
import { SimplemattableModule } from "simplemattable";
import { ApiGenerationComponent } from "./api-generation/api-generation.component";
import { ApiModule } from "./api/api.module";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthorizationComponent } from "./authorization/authorization.component";
import { CodeComponent } from "./code/code.component";
import { DirectivesComponent } from "./directives/directives.component";
import { FiletransfersComponent } from "./filetransfers/filetransfers.component";
import { HomeComponent } from "./home/home.component";
import { OlbBaseDemoComponent } from "./olb-base-demo/olb-base-demo.component";
import { OlbComponentsDemoComponent } from "./olb-components-demo/olb-components-component-demo.component";
import { OlbFormFieldsComponent } from "./olb-form-fields-demo/olb-form-fields.component";
import { PipesComponent } from "./pipes/pipes.component";
import { ServicesComponent } from "./services/services.component";
import { SimplemattableComponent } from "./simplemattable/simplemattable.component";
import { ThemingComponent } from "./theming/theming.component";
import { UpdatesComponent } from "./updates/updates.component";
import { VersionComponent } from "./version/version.component";

export const DATE_FORMATS = {
  parse: {
    dateInput: "DD.MM.YYYY"
  },
  display: {
    dateInput: "DD.MM.YYYY",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY"
  }
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OlbBaseDemoComponent,
    OlbFormFieldsComponent,
    CodeComponent,
    AuthorizationComponent,
    SimplemattableComponent,
    VersionComponent,
    PipesComponent,
    OlbComponentsDemoComponent,
    ApiGenerationComponent,
    DirectivesComponent,
    ServicesComponent,
    FiletransfersComponent,
    UpdatesComponent,
    ThemingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    AngularBaseModule.forRoot({
      authEnabled: true,
      authApiRootUrl: "/api",
      errorNotificationEnabled: true
    }),
    ApiModule.forRoot({
      rootUrl: "/api"
    }),
    SimplemattableModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: "de-DE" },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS },
    { provide: LOCALE_ID, useValue: "de-DE" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
