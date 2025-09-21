import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'email-page',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <div class="page">
      <h1><mat-icon>mail</mat-icon> Email</h1>
      <p>Dies ist die Email-Seite.</p>
    </div>
  `,
})
export class EmailPage {}


