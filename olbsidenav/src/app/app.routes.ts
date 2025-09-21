import { Routes } from '@angular/router';
import { DashboardPage } from './pages/dashboard';
import { ProjectAPage } from './pages/project-a';
import { ProjectBPage } from './pages/project-b';
import { ReportsPage } from './pages/reports';
import { EmailPage } from './pages/email';
import { SettingsPage } from './pages/settings';
import { ProjectA2Page } from './pages/project-a2';
import { ProjectA3Page } from './pages/project-a3';
import { ProjectA4Page } from './pages/project-a4';
import { ProjectB3Page } from './pages/project-b3';
import { ProjectB4Page } from './pages/project-b4';
import { ProjectB2Page } from './pages/project-b2';
import { ProjectCPage } from './pages/project-c';
import { ProjectsPage } from './pages/projects';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', component: DashboardPage },
  { path: 'projekte', component: ProjectsPage, children: [
    { path: 'a', component: ProjectAPage, children: [
      { path: 'a2', component: ProjectA2Page },
      { path: 'a3', component: ProjectA3Page },
      { path: 'a4', component: ProjectA4Page },
    ] },
    { path: 'b', component: ProjectBPage, children: [
      { path: 'b2', component: ProjectB2Page },
      { path: 'b3', component: ProjectB3Page, children: [
        { path: 'b4', component: ProjectB4Page },
      ]  },
    ] },
    { path: 'b/berichte', component: ReportsPage },
  ] },
  { path: 'projekte/c', component: ProjectCPage },
  { path: 'email', component: EmailPage },
  { path: 'einstellungen', component: SettingsPage }
];
