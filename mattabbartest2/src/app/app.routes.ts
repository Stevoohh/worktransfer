import { Routes } from '@angular/router';
import { ProtokolleComponent } from './protokolle/protokolle.component';

export const routes: Routes = [
    {path: "protokolle", component: ProtokolleComponent},
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];
