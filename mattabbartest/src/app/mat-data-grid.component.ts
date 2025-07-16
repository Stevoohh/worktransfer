import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CdkScrollable, ScrollingModule } from '@angular/cdk/scrolling';

interface ExampleData {
  id: number;
  name: string;
  icon: string;
}

@Component({
  selector: 'app-mat-data-grid',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    ScrollingModule
  ],
  template: `  
    <h2>MatDataGrid 1234</h2>
    <cdk-virtual-scroll-viewport itemSize="48" class="viewport" (scrolledIndexChange)="onScroll()">
      <table mat-table [dataSource]="data" matSort>
        <!-- Icon Column -->
        <ng-container matColumnDef="icon">
          <th mat-header-cell *matHeaderCellDef> Icon </th>
          <td mat-cell *matCellDef="let element"> <mat-icon>{{element.icon}}</mat-icon> </td>
        </ng-container>
        <!-- Name Column -->
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef mat-sort-header> Name </th>
          <td mat-cell *matCellDef="let element"> {{element.name}} </td>
        </ng-container>
        <!-- Button Column -->
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef> Actions </th>
          <td mat-cell *matCellDef="let element">
            <button mat-button (click)="onAction(element)">Test</button>
          </td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </cdk-virtual-scroll-viewport>
  `,
  styles: [`
    .viewport { height: 400px; width: 100%; }
    table { width: 100%; }
  `]
})
export class MatDataGridComponent implements OnInit {
  displayedColumns: string[] = ['icon', 'name', 'actions'];
  data: ExampleData[] = [];
  page = 0;
  pageSize = 20;
  loading = false;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    if (this.loading) return;
    this.loading = true;
    // Simulate HTTP request
    setTimeout(() => {
      const newData = Array.from({length: this.pageSize}, (_, i) => ({
        id: this.page * this.pageSize + i,
        name: `Name ${this.page * this.pageSize + i}`,
        icon: 'person'
      }));
      this.data = [...this.data, ...newData];
      this.page++;
      this.loading = false;
    }, 500);
  }

  onScroll() {
    this.loadData();
  }

  onAction(element: ExampleData) {
    alert(`Action for ${element.name}`);
  }
} 