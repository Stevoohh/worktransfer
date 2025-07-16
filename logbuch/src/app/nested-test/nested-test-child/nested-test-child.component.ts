import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface TestData {
  id: number;
  title: string;
  body: string;
  userId: number;
}

@Component({
  selector: 'app-nested-test-child',
  templateUrl: './nested-test-child.component.html',
  styleUrls: ['./nested-test-child.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class NestedTestChildComponent implements OnInit {
  id: string | null = null;
  testData: TestData | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id) {
        this.loadTestData(this.id);
      }
    });
  }

  private loadTestData(id: string) {
    this.loading = true;
    this.error = null;
    
    this.http.get<TestData>(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .subscribe({
        next: (data) => {
          this.testData = data;
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Fehler beim Laden der Daten';
          this.loading = false;
          console.error('Error loading test data:', error);
        }
      });
  }
} 