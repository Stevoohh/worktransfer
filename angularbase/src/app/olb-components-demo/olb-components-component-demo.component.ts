import { Component, ChangeDetectionStrategy } from "@angular/core";
import { FormBuilder } from "@angular/forms";

@Component({
    selector: "app-olb-components-demo",
    templateUrl: "./olb-components-component-demo.component.html",
    styleUrls: ["./olb-components-component-demo.component.scss"],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class OlbComponentsDemoComponent {
  html = `
In einfachster Form:

  <olb-drawer title="Suche" class="olb-fill-height-container">
    <form search>
      ...
    </form>
    <div content>
      ...
    </div>
  </olb-drawer>

Code vom Beispiel:

  <olb-drawer title="Wuff-Suche">
    <form search [formGroup]="formGroup" (ngSubmit)="search()"
          style="display: flex; flex-direction: column; padding-right: 12px;">
      <mat-form-field>
        <mat-label>Hunderasse</mat-label>
        <input matInput [formControl]="formGroup.controls.wuff">
      </mat-form-field>
      <button mat-raised-button color="primary">
        <mat-icon>search</mat-icon>
        Wuff suchen
      </button>
    </form>
    <div content style="padding: 0 12px">
      Wuff gefunden!
    </div>
  </olb-drawer>
  `;

  formGroup = this.fb.group({
    wuff: this.fb.control("")
  });

  constructor(private fb: FormBuilder) {}

  search() {
    alert("search clicked");
  }
}
