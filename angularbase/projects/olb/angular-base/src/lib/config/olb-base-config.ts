import { InjectionToken } from "@angular/core";

export interface OlbBaseConfig {
  authApiRootUrl: string;
  authEnabled: boolean;
  errorNotificationEnabled?: boolean;
  showKordobaEnvironment?: boolean;
}

export const OLB_BASE_CONFIG_TOKEN = new InjectionToken<OlbBaseConfig>("OLB_BASE_CONFIG");
