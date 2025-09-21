import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-project-b-page',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <h2>Projekt B</h2>
    <p>Beispielinhalt für Projekt B.</p>
    <p>Alle Childs werden in dieses Router-Outlet gerendert.</p>
    <router-outlet></router-outlet>
  `
})
export class ProjectBPage {}


