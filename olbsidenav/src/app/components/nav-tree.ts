import { Component, inject, signal, input, output } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { NavTreeItemComponent } from './nav-tree-item';

@Component({
  selector: 'nav-tree',
  standalone: true,
  imports: [MatIconModule, NavTreeItemComponent],
  templateUrl: './nav-tree.html',
  styleUrls: ['../app.scss']
})
export class NavTreeComponent {
  menu = input<Array<any>>([]);
  readonly isExpanded = input<boolean>(true);
  readonly toggleRequested = output<void>();
  private readonly router = inject(Router);
  protected readonly currentUrl = signal<string>('');

  constructor() {
    this.currentUrl.set(window?.location?.pathname || '');
    this.router.events.subscribe((evt: any) => {
      if (evt?.constructor?.name === 'NavigationEnd') {
        this.currentUrl.set(this.router.url);
      }
    });
  }

  protected onToggle(): void {
    this.toggleRequested.emit();
  }
}


