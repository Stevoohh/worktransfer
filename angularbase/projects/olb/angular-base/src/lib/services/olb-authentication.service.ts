import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, Optional } from "@angular/core";
import { Observable, ReplaySubject, Subject } from "rxjs";
import { map } from "rxjs/operators";
import { OLB_BASE_CONFIG_TOKEN, OlbBaseConfig } from "../config/olb-base-config";

@Injectable({
  providedIn: "root"
})
export class OlbAuthenticationService {
  principal$: Subject<Principal> = new ReplaySubject<Principal>(1);
  fullName$: Observable<string> = this.principal$.pipe(map(principal => principal.fullName));
  name$: Observable<string> = this.principal$.pipe(map(principal => principal.name));

  constructor(
    private http: HttpClient,
    @Optional() @Inject(OLB_BASE_CONFIG_TOKEN) private readonly config: OlbBaseConfig | null
  ) {
    if (!config?.authEnabled) {
      return;
    }
    this.http.get<Principal>((config.authApiRootUrl || "/api") + "/user").subscribe((principal: Principal) => {
      console.log("Got principal", principal);
      this.principal$.next(principal);
      console.log("Initializing heartbeat");
      setInterval(() => {
        this.http.get<Principal>((config.authApiRootUrl || "/api") + "/user").subscribe((currentPrincipal: Principal) => {
          console.log("Hertbeat OK " + currentPrincipal.name);
        });
      }, 60000);
    });
  }

  hasAnyRole(argosRoles: string[]): Observable<boolean> {
    return this.principal$.pipe(
      map(principal => {
        if (!principal.groups) {
          return false;
        }
        return principal.groups.some(group => argosRoles.some(argosRole => argosRole === group));
      })
    );
  }

  hasAllRoles(argosRoles: string[]): Observable<boolean> {
    return this.principal$.pipe(
      map(principal => {
        if (!principal.groups) {
          return false;
        }
        return !argosRoles.some(argosRole => !principal.groups.includes(argosRole));
      })
    );
  }
}

export interface Principal {
  name: string;
  email: string;
  lastName: string;
  fullName: string;
  firstName: string;
  groups: string[];
}
