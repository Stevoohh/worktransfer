import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-beispiel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Beispiel-Komponente</h2>
    <button (click)="openTab('foo')">Tab Foo öffnen</button>
    <button (click)="openTab('bar')">Tab Bar öffnen</button>
    <button (click)="openTab('baz')">Tab Baz öffnen</button>
    <button (click)="openTab('qux')">Tab Qux öffnen</button>
    <button (click)="gotoDataGrid()">DataGrid öffnen</button>
  `
})
export class BeispielComponent {
  constructor(private router: Router) {}

  openTab(id: string) {
    this.router.navigate(['/tab', id]);
  }

  gotoDataGrid() {
    this.router.navigate(['/datagrid']);
  }
} 