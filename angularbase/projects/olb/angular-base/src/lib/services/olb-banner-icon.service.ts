import { Service, signal } from "@angular/core";

export interface OlbBannerIcon {
  id: string;
  icon: string;
  url: string;
  badge?: string | number | null;
  color?: string;
}

export type OlbBannerIconConfig = Omit<OlbBannerIcon, "id"> & { id?: string };

@Service()
export class OlbBannerIconService {
  private nextId = 0;
  private readonly iconsState = signal<OlbBannerIcon[]>([]);
  readonly icons = this.iconsState.asReadonly();

  add(icon: OlbBannerIconConfig): string {
    this.nextId += 1;
    const id = icon.id ?? `banner-icon-${this.nextId}`;
    const next: OlbBannerIcon = { ...icon, id };
    this.iconsState.update(icons => {
      const index = icons.findIndex(existing => existing.id === id);
      if (index === -1) {
        return [...icons, next];
      }
      return icons.map((existing, i) => (i === index ? next : existing));
    });
    return id;
  }

  update(id: string, changes: Partial<Omit<OlbBannerIcon, "id">>): void {
    this.iconsState.update(icons => icons.map(icon => (icon.id === id ? { ...icon, ...changes } : icon)));
  }

  remove(id: string): void {
    this.iconsState.update(icons => icons.filter(icon => icon.id !== id));
  }

  clear(): void {
    this.iconsState.set([]);
  }
}
