
import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { DateFilterFn, MatDatepickerInputEvent, MatDatepickerModule } from "@angular/material/datepicker";
import { MatError, MatFormFieldAppearance, MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import moment from "moment";
import { FormFieldBase } from "../form-field-base";

@Component({
  selector: "olb-date-form-field",
  templateUrl: "./date-form-field.component.html",
  styleUrls: ["./date-form-field.component.scss"],
  imports: [MatFormFieldModule, MatLabel, ReactiveFormsModule, MatError, MatDatepickerModule, MatInputModule],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: true
})
export class DateFormFieldComponent extends FormFieldBase {
  @Input() dateFilterFn?: DateFilterFn<moment.Moment | null>;
  @Input() maxDate: moment.Moment | null = null;
  @Input() minDate: moment.Moment | null = null;
  @Input() control!: FormControl;
  @Input() label = "Datum";
  @Input() hintLabel = "";
  @Input() appearance!: MatFormFieldAppearance;

  @Output() inputBlur: EventEmitter<FocusEvent | MatDatepickerInputEvent<moment.Moment>> = new EventEmitter<
    FocusEvent | MatDatepickerInputEvent<moment.Moment>
  >();
}
