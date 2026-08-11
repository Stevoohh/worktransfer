import { Component, inject, ChangeDetectionStrategy } from "@angular/core";
import { ThemeService } from "@olb/angular-base";

@Component({
  selector: "app-theming",
  templateUrl: "./theming.component.html",
  styleUrls: ["./theming.component.scss"],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class ThemingComponent {
  themeService = inject(ThemeService);
  public logoPath = "assets/images/OLB_Logo_pos_RGB.svg";
  public superzeichenPath = "assets/images/OLB_Superzeichen_pos_RGB.svg";
  public materialSystemColors = [
    "--mat-sys-tertiary-fixed-dim",
    "--mat-sys-background",
    "--mat-sys-error",
    "--mat-sys-error-container",
    "--mat-sys-inverse-on-surface",
    "--mat-sys-inverse-primary",
    "--mat-sys-inverse-surface",
    "--mat-sys-on-background",
    "--mat-sys-on-error",
    "--mat-sys-on-error-container",
    "--mat-sys-on-primary",
    "--mat-sys-on-primary-container",
    "--mat-sys-on-primary-fixed",
    "--mat-sys-on-primary-fixed-variant",
    "--mat-sys-on-secondary",
    "--mat-sys-on-secondary-container",
    "--mat-sys-on-secondary-fixed",
    "--mat-sys-on-secondary-fixed-variant",
    "--mat-sys-on-surface",
    "--mat-sys-on-surface-variant",
    "--mat-sys-on-tertiary",
    "--mat-sys-on-tertiary-container",
    "--mat-sys-on-tertiary-fixed",
    "--mat-sys-on-tertiary-fixed-variant",
    "--mat-sys-outline",
    "--mat-sys-outline-variant",
    "--mat-sys-primary",
    "--mat-sys-primary-container",
    "--mat-sys-primary-fixed",
    "--mat-sys-primary-fixed-dim",
    "--mat-sys-scrim",
    "--mat-sys-secondary",
    "--mat-sys-secondary-container",
    "--mat-sys-secondary-fixed",
    "--mat-sys-secondary-fixed-dim",
    "--mat-sys-shadow",
    "--mat-sys-surface",
    "--mat-sys-surface-bright",
    "--mat-sys-surface-container",
    "--mat-sys-surface-container-high",
    "--mat-sys-surface-container-highest",
    "--mat-sys-surface-container-low",
    "--mat-sys-surface-container-lowest",
    "--mat-sys-surface-dim",
    "--mat-sys-surface-tint",
    "--mat-sys-surface-variant",
    "--mat-sys-tertiary",
    "--mat-sys-tertiary-container",
    "--mat-sys-tertiary-fixed",
    "--mat-sys-tertiary-fixed-dim",
    "--mat-sys-neutral-variant20"
  ];

  public simpleColors = [
    {
      variable: "$green",
      value: "#005f3d"
    },
    {
      variable: "$yellow",
      value: "#ffc04b"
    },
    {
      variable: "$orange",
      value: "#f09029"
    },
    {
      variable: "$red",
      value: "#e53935"
    },
    {
      variable: "$light-grey",
      value: "#dedede"
    },
    {
      variable: "$dark-grey",
      value: "#666"
    },
    {
      variable: "$light-blue",
      value: "#bcefff"
    },
    {
      variable: "$medium-blue",
      value: "#528dc0"
    },
    {
      variable: "$teal",
      value: "#3cd8d8"
    },
    {
      variable: "$petrol",
      value: "#006982"
    },
    {
      variable: "$blue-purple",
      value: "#90adff"
    },
    {
      variable: "$violett",
      value: "#5a2f91"
    },
    {
      variable: "$purpur",
      value: "#a62a7c"
    },
    {
      variable: "$brown",
      value: "#543210"
    }
  ];
  public colorsScss = `@use "@olb/angular-base/assets/styles/colors" as olb-colors;
background: olb-colors.$primary`;
}
