import { AfterViewInit, Directive, ElementRef, HostListener, Input, OnChanges, Renderer2, SimpleChanges } from "@angular/core";
import { MatTooltip } from "@angular/material/tooltip";
import { debounceTime, first, tap } from "rxjs";
import { OlbAuthenticationService } from "../services/olb-authentication.service";

@Directive({
  selector: "[olbPermission]",
  providers: [MatTooltip],
  standalone: true
})
export class PermissionDirective implements AfterViewInit, OnChanges {
  @Input() olbPermissions: string[] = [];
  @Input() olbReadonly?: boolean;
  @Input() roleType: "ALL_ROLES" | "ANY_ROLE" = "ANY_ROLE";

  private hasPermission = false;
  private elementReadonly = false;

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private tooltip: MatTooltip,
    private readonly authService: OlbAuthenticationService
  ) {}

  ngAfterViewInit(): void {
    this.applyPermission();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes["olbReadonly"]?.currentValue) {
      this.elementReadonly = changes["olbReadonly"]?.currentValue;
    } else {
      this.elementReadonly = false;
    }

    if (changes && changes["olbPermissions"]?.currentValue) {
      this.olbPermissions = changes["olbPermissions"]?.currentValue;
      this.applyPermission();
    }
    this.applyReadonly();
  }

  private applyPermission(): void {
    const baseObservable = this.roleType === "ANY_ROLE" ? this.authService.hasAnyRole(this.olbPermissions) : this.authService.hasAllRoles(this.olbPermissions);
    baseObservable
      .pipe(
        debounceTime(500),
        first(),
        tap(hasPermission => {
          this.hasPermission = hasPermission;
          if (!this.hasPermission) {
            this.renderer.setProperty(this.element.nativeElement, "disabled", true);
            this.renderer.setStyle(this.element.nativeElement, "pointer-events", "all");
            this.tooltip.message = "Fehlende Berechtigungen: \n \r\n " + this.getMissingPermissionsText();
            this.tooltip.tooltipClass = "olb-tooltip";
          }
          this.applyReadonly();
        })
      )
      .subscribe();
  }

  private getMissingPermissionsText(): string {
    let ret = "";
    this.olbPermissions.forEach(perm => {
      ret += "- " + perm.toString() + " \n ";
    });

    return ret;
  }

  private applyReadonly(): void {
    if (!this.hasPermission) {
      this.renderer.setProperty(this.element.nativeElement, "disabled", true);
    } else {
      if (this.elementReadonly) {
        this.renderer.setProperty(this.element.nativeElement, "disabled", true);
      } else {
        this.renderer.setProperty(this.element.nativeElement, "disabled", false);
      }
    }
  }

  @HostListener("pointerenter") pointerenter() {
    if (!this.hasPermission) {
      this.tooltip.show();
    }
  }

  @HostListener("pointerleave") onmouseleave() {
    if (!this.hasPermission) {
      this.tooltip.hide(200);
    }
  }
}
