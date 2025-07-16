import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [CommonModule],
  template: `<h2>Tab: {{ tabId }}</h2>`
})
export class TabComponent {
  tabId = '';
  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.tabId = params['id']);
  }
} 