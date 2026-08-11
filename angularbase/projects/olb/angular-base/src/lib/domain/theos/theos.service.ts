import { Injectable } from "@angular/core";
import { OlbEnvironment } from "../../services/olb-environment";
import { OlbEnvironmentService } from "../../services/olb-environment.service";

@Injectable({
  providedIn: "root"
})
export class TheosService {
  constructor(private readonly olbEnvironmentService: OlbEnvironmentService) {}

  public getTheosUrl(): string {
    switch (this.olbEnvironmentService.getEnvironment()) {
      case OlbEnvironment.dev || OlbEnvironment.int:
        return "https://theos-int.olb.de/getPersonalNrXML.php";
      case OlbEnvironment.prod:
        return "https://theos.olb.de/getPersonalNrXML.php";
      default:
        return "https://theos-int.olb.de/getPersonalNrXML.php";
    }
  }

  public getTheosSoapUrl(): string {
    return "https://theos.olb.de/service";
  }
}
