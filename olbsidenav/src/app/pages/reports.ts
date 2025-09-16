import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-reports-page',
  standalone: true,
  imports: [NgFor],
  template: `
    <h2>Berichte</h2>
    <p>Beispielhafte Berichte für Projekt B.</p>
    <div>
      <h3>Langliste</h3>
      <p>Unten folgt ausreichend Beispielinhalt, sodass der Bereich scrollen muss.</p>
      <ul>
        <li *ngFor="let n of items">
          Eintrag {{ n }} — Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          sollicitudin, tortor non egestas auctor, massa sapien egestas purus, non
          efficitur velit odio vitae nunc. Cras non felis id lorem gravida consequat.
        </li>
      </ul>
    </div>
  `
})
export class ReportsPage {
  protected readonly items = Array.from({ length: 120 }, (_, i) => i + 1);
}


