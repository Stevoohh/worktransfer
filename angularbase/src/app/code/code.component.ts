import { Component, Input, ChangeDetectionStrategy } from "@angular/core";
import { OlbSnackBarService } from "../../../projects/olb/angular-base/src/lib/services/olb-snack-bar.service";

@Component({
    selector: "app-code",
    templateUrl: "./code.component.html",
    styleUrls: ["./code.component.scss"],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class CodeComponent {
  @Input() title = "";
  @Input() ts = "";
  @Input() html = "";
  @Input() scss = "";
  @Input() bash = "";

  constructor(private snackBarService: OlbSnackBarService) {}

  download(content: string) {
    navigator.clipboard.writeText(content);
    this.snackBarService.info("In Zwischenablage kopiert!");
  }
}
