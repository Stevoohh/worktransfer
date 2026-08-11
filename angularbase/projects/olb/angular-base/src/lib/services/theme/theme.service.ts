import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ThemeService {
  private readonly THEME_KEY = "selected-theme";
  public darkTheme = signal<boolean>(false);

  constructor() {
    // Initialisiere Theme aus localStorage oder System-Einstellung
    const savedTheme = localStorage.getItem(this.THEME_KEY);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    this.darkTheme.set(savedTheme ? savedTheme === "dark" : prefersDark);
    this.applyTheme();
    // Reagiere auf System-Theme-Änderungen
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
      if (!localStorage.getItem(this.THEME_KEY)) {
        this.darkTheme.set(e.matches);
        this.applyTheme();
      }
    });
  }

  toggleTheme() {
    this.darkTheme.update(dark => !dark);
    this.applyTheme();
    localStorage.setItem(this.THEME_KEY, this.darkTheme() ? "dark" : "light");
  }

  private applyTheme() {
    document.body.classList.remove("light-theme", "light-theme");
    document.body.classList.add(this.darkTheme() ? "light-theme" : "light-theme");
  }
}
