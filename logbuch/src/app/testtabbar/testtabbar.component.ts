import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-testtabbar',
  templateUrl: './testtabbar.component.html',
  styleUrls: ['./testtabbar.component.css'],
  imports: [RouterModule, MatTabsModule, MatIcon]
})
export class TesttabbarComponent  {

  tabs: Array<{ id: string; label: string }> = [];
  activeLink = '';

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events.subscribe(() => {
      this.activeLink = this.router.url;
    });
  }

  addTab() {
    const id = 'tab-' + Date.now(); // einfacher eindeutiger Key
    this.tabs.push({ id, label: `Tab ${this.tabs.length + 1}` });
    this.router.navigate(['/tab', id]);
  }

  removeTab(id: string, event: MouseEvent) {
    event.stopPropagation();
    this.tabs = this.tabs.filter(t => t.id !== id);
    if (this.activeLink === `/tab/${id}` && this.tabs.length > 0) {
      this.router.navigate(['/tab', this.tabs[0].id]);
    } else if (this.tabs.length === 0) {
      this.router.navigate(['/']);
    }
  }
}
