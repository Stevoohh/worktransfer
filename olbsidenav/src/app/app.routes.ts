import { Routes } from '@angular/router';
import { DashboardPage } from './pages/dashboard';
import { ProjectAPage } from './pages/project-a';
import { ProjectBPage } from './pages/project-b';
import { ReportsPage } from './pages/reports';
import { SettingsPage } from './pages/settings';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', component: DashboardPage },
  { path: 'projekte/a', component: ProjectAPage },
  { path: 'projekte/b', component: ProjectBPage },
  { path: 'projekte/b/berichte', component: ReportsPage },
  { path: 'einstellungen', component: SettingsPage }
];
