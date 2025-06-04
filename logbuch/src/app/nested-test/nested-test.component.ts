import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-nested-test',
  templateUrl: './nested-test.component.html',
  styleUrls: ['./nested-test.component.scss'],
  standalone: true,
  imports: [RouterOutlet, RouterLink]
})
export class NestedTestComponent {
  title = 'Nested Test Component';
} 