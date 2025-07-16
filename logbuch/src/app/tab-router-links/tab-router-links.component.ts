import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, NgFor } from '@angular/common';

interface TabLink {
  label: string;
  link: string;
  index: number;
  removable: boolean;
}

@Component({
  selector: 'app-tab-router-links',
  templateUrl: './tab-router-links.component.html',
  styleUrls: ['./tab-router-links.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    NgFor
  ]
})
export class TabRouterLinksComponent implements OnInit {
  links: TabLink[] = [
    { label: 'Protokolle', link: '/protokolle', index: 0, removable: false }
  ];
  activeLinkIndex = 0;
  private removedRoutes = new Set<string>();

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const url = event.urlAfterRedirects;
      if (url !== '/protokolle' && 
          !this.links.some(link => link.link === url) && 
          !this.removedRoutes.has(url)) {
        this.addTab(url);
      }
      this.activeLinkIndex = this.links.findIndex(link => link.link === url);
    });
  }

  addTab(url: string) {
    const label = url.split('/').pop() || 'New Tab';
    const newIndex = this.links.length;
    this.links.push({
      label,
      link: url,
      index: newIndex,
      removable: true
    });
  }

  removeTab(index: number) {
    if (this.links[index].removable) {
      const removedLink = this.links[index];
      this.removedRoutes.add(removedLink.link);
      this.links.splice(index, 1);
      if (this.activeLinkIndex === index) {
        this.router.navigate(['/protokolle']);
      }
    }
  }
} 