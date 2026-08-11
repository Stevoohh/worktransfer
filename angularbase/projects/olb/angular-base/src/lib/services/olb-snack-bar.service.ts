import { Injectable, NgZone } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";
import { OlbSnackBarPosition } from "./olb-snack-bar-position";

@Injectable({
  providedIn: "root"
})
export class OlbSnackBarService {
  constructor(
    private snackBar: MatSnackBar,
    private zone: NgZone
  ) {}
  /**
   * Simply display a info message in a snackbar
   * @param message the message
   */
  info(message: string, position?: OlbSnackBarPosition, duration?: number): void {
    const config = this.getSnackBarConfig(SnackBarMessageType.Info, position, duration);
    this.snackBar.open(message, "OK", config);
  }
  /**
   * Simply display an error message in a snackbar
   * @param message the message
   */
  errorMessage(message: string, position?: OlbSnackBarPosition, duration?: number): void {
    const config = this.getSnackBarConfig(SnackBarMessageType.Error, position, duration);
    this.zone.run(() => {
      setTimeout(() => {
        this.snackBar.open(message, "OK", config);
      }, 0);
    });
  }
  /**
   * Returns a function which takes an error (as returned by http observable) and opens an error snackbar.
   *
   * @param action Action that should have been executed but failed (e.g. "Mitglied laden")
   */
  error(action: string): (error: any) => void {
    return (error: any) => {
      let addition = "";
      switch (error.status) {
        case 0:
          addition = "Bitte prüfen Sie Ihre Internetverbindung.";
          break;
        case 403:
          addition = "Ihnen fehlen die notwendigen Berechtigungen.";
          break;
        case 404:
          addition = "Nicht vorhanden.";
          break;
        case 500:
          addition = "Unbekannter Fehler. Bitte beim Entwickler melden :-)";
      }
      console.error(error);
      this.snackBar.open(action + " fehlgeschlagen! " + addition, "OK", {
        panelClass: "snackbar-error"
      });
    };
  }

  private getSnackBarConfig(msgType: SnackBarMessageType, position?: OlbSnackBarPosition, duration?: number): MatSnackBarConfig {
    let vertical: MatSnackBarVerticalPosition = "bottom";
    let dur = 6000;
    let panelClass = "";

    if (position === OlbSnackBarPosition.TOP) {
      vertical = "top";
    } else if (position === OlbSnackBarPosition.BOTTOM) {
      vertical = "bottom";
    }
    if (duration) {
      dur = duration;
    }
    if (msgType === SnackBarMessageType.Error) {
      panelClass = "snackbar-error";
    }

    return {
      duration: dur,
      horizontalPosition: "center",
      verticalPosition: vertical,
      panelClass: panelClass
    };
  }
}

enum SnackBarMessageType {
  Info,
  Error
}
