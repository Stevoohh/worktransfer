import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: "app-authorization",
    templateUrl: "./authorization.component.html",
    styleUrls: ["./authorization.component.scss"],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class AuthorizationComponent {
  tsHasRole = `
hasRole(role: "read" | "write"): Observable<boolean> {
  const argosRolePrefix = "API_tulp-controller-api_";
  const roles = [argosRolePrefix + "WRITE"];
  if (role === "read") {
    roles.push(argosRolePrefix + "READ");
  }
  return this.olbAuthenticationService.hasAnyRole(roles);
}
`;
  htmlHasAnyRole = `
  <button color="accent" mat-raised-button (click)="startWorkflow()"
          *ngIf="authenticationService.hasAnyRole(['API_tulp-controller-api_WRITE']) | async">
    <mat-icon>send</mat-icon>
    STARTEN
  </button>
`;
  tsHasAnyRole = `
  constructor(
    public authenticationService: OlbAuthenticationService,
  ) {
  }
`;

  tsGuard = `
@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private authenticationService: OlbAuthenticationService,
    private router: Router,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authenticationService.hasAnyRole(["API_tulp-controller-api_WRITE"]).pipe(
      tap(hasRole => {
        if (!hasRole) {
          console.log("No write role!");
          this.router.navigate(["/no-rights"])
        } else {
          console.log("Has write role!");
        }
      }),
    );
  }

}
`;
  tsGuardRoute = `
const routes: Routes = [
  {path: 'config-mappings', component: ConfigMappingsComponent, canActivate: [RoleGuard]},
  {path: 'data-mappings', component: DataMappingsComponent, canActivate: [RoleGuard]},
  {path: 'booking-rules', component: BookingRulesComponent, canActivate: [RoleGuard]},
];
`;
}
