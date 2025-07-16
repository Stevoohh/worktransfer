import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

interface Tab {
  label: string;
  route: string;
  removable: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [MatTabsModule, MatIconModule, MatButtonModule, RouterModule, CommonModule]
})
export class AppComponent {
  tabs: Tab[] = [
    { label: 'Beispiel', route: '/beispiel', removable: true }
  ];
  activeRoute = '/beispiel';
  selectedIndex = 0;
  tabHistory: string[] = [];

  constructor(private router: Router) {
    this.tabs.forEach(tab => tab.removable = true);
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.activeRoute = event.urlAfterRedirects;
        this.selectedIndex = this.tabs.findIndex(tab => tab.route === this.activeRoute);
        this.ensureTabForRoute(this.activeRoute);
        this.tabHistory = this.tabHistory.filter(r => r !== this.activeRoute);
        this.tabHistory.push(this.activeRoute);
      }
    });
  }

  ensureTabForRoute(route: string) {
    if (route.startsWith('/tab/')) {
      const id = route.split('/tab/')[1];
      if (!this.tabs.find(tab => tab.route === route)) {
        this.tabs.push({ label: `Tab ${id}`, route, removable: true });
      }
    }
  }

  onTabChange(index: number) {
    this.selectedIndex = index;
    this.router.navigate([this.tabs[index].route]);
  }

  closeTab(tab: Tab, event: MouseEvent) {
    event.stopPropagation();
    const closedRoute = tab.route;
    this.tabs = this.tabs.filter(t => t !== tab);
    this.tabHistory = this.tabHistory.filter(r => r !== closedRoute);
    if (this.activeRoute === closedRoute) {
      const lastRoute = this.tabHistory.length > 0
        ? this.tabHistory[this.tabHistory.length - 1]
        : (this.tabs.length > 0 ? this.tabs[0].route : '/beispiel');
      this.router.navigate([lastRoute]);
    }
  }
}
