import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <h2>Projekte</h2>
    <p>Alle Childs werden in dieses Router-Outlet gerendert.</p>
    <br><br>    
    <a href="/projekte/a/a2">Direktlink zu projekt a2</a>
    <router-outlet></router-outlet>
  `
})
export class ProjectsPage {}


