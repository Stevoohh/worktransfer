import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-testtabbarchild',
  templateUrl: './testtabbarchild.component.html',
  styleUrls: ['./testtabbarchild.component.css']
})
export class TesttabbarchildComponent  {

  tabId = '';

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.tabId = params['id'];
    });
  }
}
