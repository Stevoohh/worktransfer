import { Component } from '@angular/core';
import { LogTabsComponent } from './log-tabs/log-tabs.component';

@Component({
  selector: 'app-root',
  imports: [LogTabsComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
