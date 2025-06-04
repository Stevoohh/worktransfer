import { Routes } from '@angular/router';
import { NestedTestComponent } from './nested-test/nested-test.component';
import { NestedTestChildComponent } from './nested-test/nested-test-child/nested-test-child.component';

export const routes: Routes = [
  {
    path: 'nested-test',
    component: NestedTestComponent,
    children: [
      {
        path: ':id',
        component: NestedTestChildComponent
      }
    ]
  }
];
