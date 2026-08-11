import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "app-directives",
  templateUrl: "./directives.component.html",
  styleUrls: ["./directives.component.scss"],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class DirectivesComponent {
  isChecked = true;
  myPermission = "Angular_Development_NGDEMO_READ";
  buttonReadonly = false;
  buttonHtml =
    "<button mat-flat-button color='accent' olbPermission [olbPermissions]='myPermissions' [olbReadonly]='buttonReadonly'> Mein Button inkl. Berechtigung </button>";

  public buttonClicked() {
    alert("button clicked");
  }
}
