import { Component, input } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MenuItem } from '../types/menu.types';

@Component({
  selector: 'nav-menu-child-item',
  standalone: true,
  imports: [MatIconModule, MatMenuModule, NavMenuChildItemComponent],
  template: `
    @for (item of items(); track item.label) {
      @if (!item.children?.length) {
        <button mat-menu-item (click)="item.externalUrl ? openExternal(item) : navigateTo(item.route)">
          <mat-icon>{{ item.icon }}</mat-icon>
          <span>{{ item.label }}</span>
          @if (item.badge) {
            <span class="badge" [class]="'badge ' + (item.badgeVariant || 'neutral')">{{ item.badge }}</span>
          }
        </button>
      } @else {
        <button mat-menu-item [matMenuTriggerFor]="subMenuRef">
          <mat-icon>{{ item.icon }}</mat-icon>
          <span>{{ item.label }}</span>
          @if (item.badge) {
            <span class="badge" [class]="'badge ' + (item.badgeVariant || 'neutral')">{{ item.badge }}</span>
          }
          <mat-icon>chevron_right</mat-icon>
        </button>
        <mat-menu #subMenuRef="matMenu">
          <nav-menu-child-item [items]="item.children || []"></nav-menu-child-item>
        </mat-menu>
      }
    }
  `,
  styleUrls: ['../app.scss']
})
export class NavMenuChildItemComponent {
  items = input<MenuItem[]>([]);

  constructor(private readonly router: Router) {}

  protected openExternal(node: any): void {
    if (node?.externalUrl) {
      window.open(node.externalUrl, '_blank', 'noopener');
    }
  }

  protected navigateTo(route: string | undefined): void {
    if (!route) return;
    this.router.navigateByUrl(route);
  }
}
