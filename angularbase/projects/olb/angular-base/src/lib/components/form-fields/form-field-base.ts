import { Directive, Input } from "@angular/core";

@Directive()
export abstract class FormFieldBase {
  @Input()
  public validationErrors: Record<string, string> | null = {};

  public get validationError(): { error: string; message: string }[] {
    return this.validationErrors
      ? Object.keys(this.validationErrors).map(error => {
          return {
            error: error,
            message: (this.validationErrors as any)[error]
          };
        })
      : [];
  }
}
