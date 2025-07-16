import { Routes } from '@angular/router';
import { NestedTestComponent } from './nested-test/nested-test.component';
import { NestedTestChildComponent } from './nested-test/nested-test-child/nested-test-child.component';
import { TesttabbarComponent } from './testtabbar/testtabbar.component';
import { TesttabbarchildComponent } from './testtabbarchild/testtabbarchild.component';

export const routes: Routes = [
  // {
  //   path: 'nested-test',
  //   component: NestedTestComponent,
  //   children: [
  //     {
  //       path: ':id',
  //       component: NestedTestChildComponent
  //     }
  //   ]
  // }
  {
    path: '',
    component: TesttabbarComponent,
    children: [
      {
        path: 'tab/:id',
        component: TesttabbarchildComponent
      }
    ]
  },
  { path: '**', redirectTo: '' }
];
