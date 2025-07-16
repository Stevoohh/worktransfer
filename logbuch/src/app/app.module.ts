import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { TabRouterLinksComponent } from './tab-router-links/tab-router-links.component';
import { TesttabbarComponent } from './testtabbar/testtabbar.component';
import { TesttabbarchildComponent } from './testtabbarchild/testtabbarchild.component';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
    TabRouterLinksComponent
  ],
  bootstrap: [/* your root component */],
   declarations: [	
    "TesttabbarComponent",
      TesttabbarchildComponent
   ]
})
export class AppModule { } 