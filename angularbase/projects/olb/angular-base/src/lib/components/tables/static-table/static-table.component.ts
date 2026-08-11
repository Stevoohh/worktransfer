
import { AfterViewInit, Component, Input, OnInit, ViewChild, ChangeDetectionStrategy } from "@angular/core";
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { Observable } from "rxjs";
import { StaticTablePaginator } from "./static-table-paginator";

@Component({
  selector: "olb-static-table",
  templateUrl: "./static-table.component.html",
  styleUrls: ["./static-table.component.scss"],
  imports: [MatTableModule, MatPaginatorModule, MatSortModule],
  providers: [{ provide: MatPaginatorIntl, useClass: StaticTablePaginator }],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: true
})
export class StaticTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  @Input()
  public data!: Observable<any[]>;
  @Input()
  public columns!: string[];
  @Input()
  public columnNames!: Record<string, string>;

  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  ngOnInit() {
    this.data.subscribe(data => {
      this.dataSource.data = data;
    });
  }

  public ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public getColValue(element: any, col: string): string {
    return element[col];
  }

  public getColName(colKey: string): string {
    return this.columnNames[colKey] || "";
  }
}
