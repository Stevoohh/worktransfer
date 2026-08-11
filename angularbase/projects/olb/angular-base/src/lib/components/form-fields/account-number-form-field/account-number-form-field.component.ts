
import { Component, Input, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { MatFormField, MatFormFieldAppearance, MatHint, MatLabel } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { FormFieldBase } from "../form-field-base";

@Component({
  selector: "olb-account-number-form-field",
  templateUrl: "./account-number-form-field.component.html",
  styleUrls: ["./account-number-form-field.component.scss"],
  imports: [MatFormField, MatLabel, ReactiveFormsModule, MatIcon, MatHint, MatInputModule],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: true
})
export class AccountNumberFormFieldComponent extends FormFieldBase implements OnInit {
  @Input() control!: FormControl;
  @Input() label = "Kontonummer";
  @Input() appearance: MatFormFieldAppearance = "fill";
  @Input() icon?: string | null;
  @Input() length?: number = 10;
  @Input() showHint?: boolean = true;

  public hintLabel = "";

  ngOnInit(): void {
    if (this.showHint) {
      this.hintLabel = this.length?.toString() + " Zahlen erwartet";
    } else {
      this.hintLabel = "";
    }
  }
}
