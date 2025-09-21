import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-project-c-page',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <h2>Projekt C</h2>
    <p>Beispielinhalt für Projekt C.</p>
    <p>Ohne extra Router-Outlet</p>
    <router-outlet></router-outlet>
  `
})
export class ProjectCPage {}


