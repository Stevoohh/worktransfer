import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { OlbAuthenticationService } from "@olb/angular-base";

@Component({
  selector: "app-user-info",
  templateUrl: "./user-info.component.html",
  styleUrls: ["./user-info.component.scss"],
  imports: [CommonModule]
})
export class UserInfoComponent {
  public readonly authenticationService = inject(OlbAuthenticationService);
}
