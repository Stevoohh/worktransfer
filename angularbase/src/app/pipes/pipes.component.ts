import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: "app-pipes",
    templateUrl: "./pipes.component.html",
    styleUrls: ["./pipes.component.scss"],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class PipesComponent {
  ibanHtml = '{{"De68500105178297336485" | iban}}';
}
