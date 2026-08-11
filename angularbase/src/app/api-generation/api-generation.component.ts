import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: "app-api-generation",
    templateUrl: "./api-generation.component.html",
    styleUrls: ["./api-generation.component.scss"],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ApiGenerationComponent {
  bash = `
# save in tmp first to not trigger hot reload before new files are ready
echo "Removing old tmp files"
mkdir /tmp/app-backend-client
rm -rf /tmp/app-backend-client/*
echo "Generating Client"
ng-openapi-gen --input ../tulp-controller-api/api-docs.yml --output /tmp/app-backend-client/generated
if [[ $? != 0 ]]; then
    echo "Client generation not successful"
    exit 1
fi
echo "removing old files"
rm -rf src/app/api/*
echo "moving tmp client to src"
mv /tmp/app-backend-client/generated/* src/app/api/
  `;

  moduleTs = `
imports: [
  ...,
  ApiModule.forRoot({rootUrl: "/api"}),
]
`;

  npmInstallBash = `
sudo npm i -g ng-openapi-gen
  `;

  apiCallTs = `
constructor(
  private snackBarService: OlbSnackBarService,
  private bookingRuleService: BookingRuleService,
) {
}

ngOnInit(): void {
  this.bookingRuleService.getBookingRules().subscribe({
    next: bookingRules => {
      this.bookingRules = bookingRules.bookingRules;
    }, error: this.snackBarService.error("Laden der Buchungsregeln")
  });
}
`;
}
