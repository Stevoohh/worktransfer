import { Service, signal, Type } from "@angular/core";

@Service()
export class OlbUserMenuService {
  readonly component = signal<Type<unknown> | null>(null);
  show(component: Type<unknown>) {
    this.component.set(component);
  }
  clear() {
    this.component.set(null);
  }
}
