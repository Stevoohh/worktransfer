
import { Component, Input, ChangeDetectionStrategy } from "@angular/core";
import { MatIcon } from "@angular/material/icon";
import { MatDrawer, MatDrawerContainer } from "@angular/material/sidenav";

@Component({
  selector: "olb-drawer",
  templateUrl: "./drawer.component.html",
  styleUrls: ["./drawer.component.scss"],
  imports: [MatDrawer, MatDrawerContainer, MatIcon],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: true
})
export class DrawerComponent {
  @Input()
  title = "Suche";
}
