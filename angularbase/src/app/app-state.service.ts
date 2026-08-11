import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AppStateService {
  public type: "sidebar" | "navbar" = "sidebar";
}
