import { registerLocaleData } from "@angular/common";
import localeDE from "@angular/common/locales/de";
import { provideZoneChangeDetection } from "@angular/core";
import { platformBrowser } from "@angular/platform-browser";
import moment from "moment";
// import "moment/locale/de";
import { AppModule } from "./app/app.module";

registerLocaleData(localeDE);
moment.locale("de");

platformBrowser()
  .bootstrapModule(AppModule, { applicationProviders: [provideZoneChangeDetection()] })
  .catch(err => console.error(err));
