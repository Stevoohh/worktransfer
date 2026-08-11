import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { User } from "@olb/angular-base";

import moment from "moment";

@Component({
  selector: "app-olb-form-fields-demo",
  templateUrl: "./olb-form-fields.component.html",
  styleUrls: ["./olb-form-fields.component.scss"],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class OlbFormFieldsComponent {
  dateControl = new FormControl<moment.Moment | null>(null, Validators.required);
  userControl = new FormControl<User | null>(null, [Validators.required]);
  accountSearchControl = new FormControl<number | null>(null);

  dateHtml = `<olb-date-form-field label="Datum bis" [control]="searchGroup.controls.dateTill" [appearance]="'outline'" [validationErrors]="{required: 'Pflichtfeld'}"></olb-date-form-field>`;
  userHtml = `<olb-user-form-field [userFormControl]="userControl" [validationErrors]="{required: 'Bitte wählen Sie einen Benutzer aus'}"></olb-user-form-field>`;
  accountSearchHtml = `<olb-account-number-form-field [control]="accountSearchControl" [label]="'Meine Kontonummer'" [appearance]="'fill'" [length]="10" [showHint]="true"></olb-account-number-form-field>`;

  constructor(private formBuilder: FormBuilder) {
    const _form = this.formBuilder.group({
      date: this.dateControl,
      user: this.userControl,
      account: this.accountSearchControl
    });
  }
}
