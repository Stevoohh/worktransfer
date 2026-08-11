import { Injectable } from "@angular/core";
import { OlbEnvironment } from "./olb-environment";

@Injectable({
  providedIn: "root"
})
export class OlbEnvironmentService {
  getEnvironment(): OlbEnvironment {
    const origin = window.location.origin;
    if (origin.includes("-dev.olb.de")) {
      return OlbEnvironment.dev;
    }
    if (origin.includes("-int.olb.de")) {
      return OlbEnvironment.int;
    }
    if (origin.includes(".olb.de")) {
      return OlbEnvironment.prod;
    }
    return OlbEnvironment.dev; // localhost, pxxxx, ...
  }
}
