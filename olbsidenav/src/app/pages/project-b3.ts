import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-project-b3-page',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <h2>Projekt B3</h2>
    <p>Beispielinhalt für Projekt B3.</p>
    <p>Alle Childs werden in dieses Router-Outlet gerendert.</p>
    <router-outlet></router-outlet>
  `
})
export class ProjectB3Page {}


