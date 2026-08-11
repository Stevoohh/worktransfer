import { afterRenderEffect, Component, inject, ViewChild, ViewContainerRef } from "@angular/core";
import { OlbUserMenuService } from "../../../services/olb-user-menu.service";

@Component({
  selector: "olb-dynamic-host",
  imports: [],
  templateUrl: "./dynamic-host.component.html",
  styleUrl: "./dynamic-host.component.css"
})
export class DynamicHostComponent {
  @ViewChild("host", { read: ViewContainerRef }) host!: ViewContainerRef;
  private readonly olbUserMenuService = inject(OlbUserMenuService);

  constructor() {
    afterRenderEffect(() => {
      const cmp = this.olbUserMenuService.component();
      this.host.clear();
      if (cmp) {
        this.host.createComponent(cmp);
      }
    });
  }
}
