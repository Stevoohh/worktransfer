import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, Optional } from "@angular/core";
import { OlbEnvironment } from "./olb-environment";
import { OlbEnvironmentService } from "./olb-environment.service";
import { OLB_BASE_CONFIG_TOKEN, OlbBaseConfig } from "../config/olb-base-config";

@Injectable({
  providedIn: "root"
})
export class OlbKordobaEnvironmentService {
  public kordobaEnvironment!: KordobaEnvironment;

  constructor(
    private http: HttpClient,
    environmentService: OlbEnvironmentService,
    @Optional() @Inject(OLB_BASE_CONFIG_TOKEN) readonly config: OlbBaseConfig | null
  ) {
    if (environmentService.getEnvironment() === OlbEnvironment.prod) {
      // kordoba-environment is only interesting for dev/int
      return;
    }
    if (config?.showKordobaEnvironment === false) {
      // apparently, some people are massively confused if they see the kordoba environment in the int system
      // so allow to turn it off, but keep it on by default
      return;
    }
    this.http.get<KordobaEnvironment>("https://vslejigs01-int.olb.de:8443/v1/kordoba-environment").subscribe({
      next: (kordobaEnvironment: KordobaEnvironment) => {
        this.kordobaEnvironment = kordobaEnvironment;
      },
      error: () => {
        // Ignore
      }
    });
  }
}

export interface KordobaEnvironment {
  name: string;
  shortName: string;
  host: string;
  port: string;
  app: string;
  url: string;
}
