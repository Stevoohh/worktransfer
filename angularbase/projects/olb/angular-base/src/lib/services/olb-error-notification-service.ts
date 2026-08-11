import { HttpErrorResponse } from "@angular/common/http";
import {ErrorHandler, inject, Injectable} from "@angular/core";
import { OlbSnackBarPosition } from "./olb-snack-bar-position";
import { OlbSnackBarService } from "./olb-snack-bar.service";
import {OlbEnvironmentService} from "./olb-environment.service";
import {OlbEnvironment} from "./olb-environment";

@Injectable()
export class OlbErrorNotificationService implements ErrorHandler {
  private httpErrorCodes = [400, 500];
  private olbEnvironmentService = inject(OlbEnvironmentService);

  constructor(private readonly snackbarService: OlbSnackBarService) {}

  public handleError(error: any) {
    if(this.olbEnvironmentService.getEnvironment() === OlbEnvironment.dev) {
      console.error(error);
    }

    if (error instanceof HttpErrorResponse) {
      if (this.httpErrorCodes.some((errorCode: number) => error.status === errorCode)) {
        if (error.error.detail) {
          this.snackbarService.errorMessage(error.error.detail, OlbSnackBarPosition.BOTTOM, 5000);
        } else if (error.error) {
          try {
            const errorDetails = JSON.parse(error.error);
            if (this.isHttpErrorType(errorDetails)) {
              if (errorDetails && errorDetails.detail) {
                this.snackbarService.errorMessage(error.error.detail, OlbSnackBarPosition.BOTTOM, 5000);
              }
            } else {
              console.log("error.error ist kein json");
            }
          } catch (error) {
            console.log("Fehler beim parsen zu json des httperrors: ", error);
          }
        }
      }
    }
  }

  private isHttpErrorType(value: any): value is HttpError {
    return value;
  }
}

export class HttpError {
  title?: string;
  status?: string;
  detail?: string;
  instance?: string;
  hash?: string;
}
