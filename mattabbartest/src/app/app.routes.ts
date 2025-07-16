import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'beispiel', loadComponent: () => import('./beispiel.component').then(m => m.BeispielComponent) },
  { path: 'tab/:id', loadComponent: () => import('./tab.component').then(m => m.TabComponent) },
  { path: 'datagrid', loadComponent: () => import('./mat-data-grid.component').then(m => m.MatDataGridComponent) },
  { path: '', redirectTo: 'beispiel', pathMatch: 'full' },
  { path: '**', redirectTo: 'beispiel' }
];
