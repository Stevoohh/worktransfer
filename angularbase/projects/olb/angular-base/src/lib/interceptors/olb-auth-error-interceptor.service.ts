import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class OlbAuthErrorInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap({
        next: () => {
          // all good, no error handling to do
        },
        error: (error: any) => {
          if (error instanceof HttpErrorResponse) {
            console.log("HTTP Error detected - ", error);
            const isOwnRequest = request.url.startsWith("/") || request.url.startsWith(window.location.origin);
            const isAuthError = error.status === 401 || error.status === 0;
            if (isAuthError && isOwnRequest) {
              console.log("401 detected - forwarding to login");
              window.location.href = "/oauth2/authorization/olb";
            }
          }
        }
      })
    );
  }
}
