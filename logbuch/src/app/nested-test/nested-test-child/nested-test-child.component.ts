import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nested-test-child',
  templateUrl: './nested-test-child.component.html',
  styleUrls: ['./nested-test-child.component.scss'],
  standalone: true
})
export class NestedTestChildComponent implements OnInit {
  id: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
  }
} 