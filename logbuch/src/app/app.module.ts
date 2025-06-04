import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { TabRouterLinksComponent } from './tab-router-links/tab-router-links.component';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
    TabRouterLinksComponent
  ],
  bootstrap: [/* your root component */]
})
export class AppModule { } 