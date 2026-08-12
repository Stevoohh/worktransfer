import { Component, inject, input, output, signal, ChangeDetectionStrategy } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs";
import { NavTreeItemsComponent } from "./nav-tree-items.component";

@Component({
  selector: "olb-nav-tree",
  standalone: true,
  imports: [MatIconModule, NavTreeItemsComponent],
  templateUrl: "./nav-tree.component.html",
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ["./nav-tree.component.scss"]
})
export class NavTreeComponent {
  menu = input<any[]>([]);
  appVersion = input<string>("n.v.");
  baseVersion = input<string>("n.v.");
  isExpanded = input<boolean>(true);
  readonly toggleRequested = output<void>();
  private readonly router = inject(Router);
  protected currentUrl = signal<string>("");

  constructor() {
    this.currentUrl.set((window?.location?.pathname || "").split("?")[0].split("#")[0]);
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      const url = event.urlAfterRedirects.split("?")[0].split("#")[0];
      this.currentUrl.set(url);
    });
  }

  protected onToggle(): void {
    this.toggleRequested.emit();
  }
}
