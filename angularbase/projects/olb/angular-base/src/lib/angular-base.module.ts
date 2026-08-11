import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi, withXhr } from "@angular/common/http";
import {
  DEFAULT_CURRENCY_CODE,
  EnvironmentProviders,
  ErrorHandler,
  importProvidersFrom,
  LOCALE_ID,
  ModuleWithProviders,
  NgModule,
  Provider,
  Type
} from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatBadgeModule } from "@angular/material/badge";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";

import { NavMenuChildItemsComponent, NavTreeItemsComponent, OlbErrorNotificationService } from "../public-api";
import { BaseComponent } from "./components/base/base/base.component";
import { DrawerComponent } from "./components/base/drawer/drawer.component";
import { NavMenuComponent } from "./components/base/navigation/nav-menu/nav-menu.component";
import { NavTreeComponent } from "./components/base/navigation/nav-tree/nav-tree.component";
import { TaskCountBadgeComponent } from "./components/base/task-count-badge/task-count-badge.component";
import { AccountNumberFormFieldComponent } from "./components/form-fields/account-number-form-field/account-number-form-field.component";
import { DateFormFieldComponent } from "./components/form-fields/date-form-field/date-form-field.component";
import { UserFormFieldComponent } from "./components/form-fields/user-form-field/user-form-field.component";
import { StaticTableComponent } from "./components/tables/static-table/static-table.component";
import { OLB_BASE_CONFIG_TOKEN, OlbBaseConfig } from "./config/olb-base-config";
import { PermissionDirective } from "./directives/permission.directive";
import { OlbAuthErrorInterceptor } from "./interceptors/olb-auth-error-interceptor.service";
import { IbanPipe } from "./pipes/iban.pipe";

const imExports = [
  // Angular
  CommonModule,
  RouterModule,
  BrowserAnimationsModule,
  ReactiveFormsModule,
  FormsModule,
  // Material
  MatToolbarModule,
  MatCardModule,
  MatIconModule,
  MatSidenavModule,
  MatTabsModule,
  MatListModule,
  MatTooltipModule,
  MatBadgeModule,
  MatButtonModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatDialogModule,
  MatInputModule,
  MatSnackBarModule,
  MatMomentDateModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatCheckboxModule,
  MatAutocompleteModule,
  MatMenuModule,
  MatSlideToggleModule
];

const standaloneComponents: Type<any>[] = [
  BaseComponent,
  NavMenuComponent,
  NavMenuChildItemsComponent,
  NavTreeComponent,
  NavTreeItemsComponent,
  TaskCountBadgeComponent,
  StaticTableComponent,
  DrawerComponent,
  AccountNumberFormFieldComponent,
  DateFormFieldComponent,
  UserFormFieldComponent
];

const standaloneDirectives: Type<any>[] = [PermissionDirective];

const standalonePipes: Type<any>[] = [IbanPipe];

@NgModule({
  declarations: [],
  imports: [...imExports, standaloneComponents, standaloneDirectives, standalonePipes],
  exports: [...imExports, standaloneComponents, standaloneDirectives, standalonePipes],
  providers: [
    provideHttpClient(withXhr(), withInterceptorsFromDi()),
    // Currency
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: "EUR"
    },
    // Date localization
    {
      provide: MAT_DATE_LOCALE,
      useValue: "de-DE"
    },
    {
      provide: LOCALE_ID,
      useValue: "de-DE"
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: ["DD.MM.YYYY", "DDMMYYYY", "DDMMYY", "D.M.YY", "D.M.YYYY"]
        },
        display: {
          dateInput: "DD.MM.YYYY",
          monthYearLabel: "MMM YYYY",
          dateA11yLabel: "LL",
          monthYearA11yLabel: "MMMM YYYY"
        }
      }
    },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: "outline" } }
  ]
})
export class AngularBaseModule {
  static forRoot(config: OlbBaseConfig): ModuleWithProviders<AngularBaseModule> {
    const providers: (Provider | EnvironmentProviders)[] = [{ provide: OLB_BASE_CONFIG_TOKEN, useValue: config }];
    if (config.authEnabled) {
      providers.push({
        provide: HTTP_INTERCEPTORS,
        useClass: OlbAuthErrorInterceptor,
        multi: true
      });
    }
    if (config.errorNotificationEnabled) {
      providers.push({
        provide: ErrorHandler,
        useClass: OlbErrorNotificationService
      });
    }
    return {
      ngModule: AngularBaseModule,
      providers: providers
    };
  }

  static provideOlbBase(config: OlbBaseConfig): EnvironmentProviders {
    return importProvidersFrom(AngularBaseModule.forRoot(config));
  }
}
