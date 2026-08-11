import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "iban",
  standalone: true
})
export class IbanPipe implements PipeTransform {
  transform(iban: string, ..._args: unknown[]): string {
    if (!iban) {
      return "";
    }
    // magic regex to insert a space every 4th character if missing
    // see https://stackoverflow.com/questions/17260238/how-to-insert-space-every-4-characters-for-iban-registering
    return iban
      .toUpperCase()
      .replace(/[^\dA-Z]/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();
  }
}
