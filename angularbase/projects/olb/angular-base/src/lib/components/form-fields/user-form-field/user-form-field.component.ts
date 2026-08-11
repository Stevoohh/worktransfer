import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule, MatOption } from "@angular/material/autocomplete";
import { MatError, MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { Observable, debounceTime, distinctUntilChanged, switchMap } from "rxjs";
import { User } from "../../../services/olb-user";
import { OlbUserService } from "../../../services/olb-user.service";
import { FormFieldBase } from "../form-field-base";

@Component({
  selector: "olb-user-form-field",
  templateUrl: "./user-form-field.component.html",
  styleUrls: ["./user-form-field.component.scss"],
  imports: [CommonModule, MatFormField, MatLabel, ReactiveFormsModule, MatError, MatAutocompleteModule, MatOption, MatInputModule],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: true
})
export class UserFormFieldComponent extends FormFieldBase implements OnInit {
  @Input()
  userFormControl!: FormControl;

  @Output()
  optionSelected: EventEmitter<User> = new EventEmitter<User>();

  public placeholder = "Benutzer";
  public filteredUsers!: Observable<User[]>;

  constructor(private readonly olbUserService: OlbUserService) {
    super();
  }

  public ngOnInit(): void {
    if (this.userFormControl) {
      this.filteredUsers = this.userFormControl.valueChanges.pipe(
        distinctUntilChanged(),
        debounceTime(500),
        switchMap(input => (!!input && input?.length >= 3 ? this.filterUsers(input) : []))
      );
    }
  }

  public getUserDisplayName(user: User): string {
    return user.lastName + ", " + user.firstName + " (" + user.bNummer + ")";
  }

  public getSelectedUserDisplayName(selectedoption: User): string {
    return selectedoption ? (selectedoption.lastName || "") + (", " + selectedoption.firstName || "") + (" (" + selectedoption.bNummer || "") + ")" : "";
  }

  public userSelected(matOptionEvent: any): void {
    const selectedUser = matOptionEvent.option.value as User;
    this.optionSelected.emit(selectedUser);
  }

  private filterUsers(input: string): Observable<User[]> {
    return this.olbUserService.filterUsers$(input.toLowerCase());
  }
}
