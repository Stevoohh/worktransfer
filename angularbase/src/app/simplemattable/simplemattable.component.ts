import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Observable, of } from "rxjs";
import { TableColumn } from "simplemattable";

@Component({
    selector: "app-simplemattable",
    templateUrl: "./simplemattable.component.html",
    styleUrls: ["./simplemattable.component.scss"],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class SimplemattableComponent implements OnInit {
  html = `<smc-simplemattable [columns]="columns" [data]="data"></smc-simplemattable>`;
  ts = `data: MyModel[] = [
  { a: "wuff1", b: "wuff2" },
  { a: "wuff3", b: "wuff4" },
];

columns: TableColumn<MyModel, any>[] = [
    new TableColumn<MyModel, "a">("Spalte A", "a"),
    new TableColumn<MyModel, "b">("Spalte B", "b"),
];

interface MyModel {
    a: string;
    b: string;
}
`;

  staticTableHtml = `<olb-static-table [columnNames]="staticTableColumnNames" [columns]="staticTableColumns" [data]="staticTableDataSource"></olb-static-table>`;
  staticTableTs = `staticTableDataSource = of([
    {
      a: 'Zeile 1 Spalte 1',
      b: 'Zeile 1 Spalte 2'
    },
    {
      a: 'Zeile 2 Spalte 1',
      b: 'Zeile 2 Spalte 2'
    }
  ])

  staticTableColumns: string[] = ['a', 'b'];

  staticTableColumnNames: { [key: string]: string } = {
    a: 'Spalte 1',
    b: 'Spalte 2',
  };

  interface MyModel {
      a: string;
      b: string;
  }
  `;

  data: MyModel[] = [
    { a: "wuff1", b: "wuff2" },
    { a: "wuff3", b: "wuff4" }
  ];

  columns: TableColumn<MyModel, any>[] = [new TableColumn<MyModel, "a">("Spalte A", "a"), new TableColumn<MyModel, "b">("Spalte B", "b")];

  public staticTableDataSource!: Observable<MyModel[]>;
  public staticTableColumns: string[] = ["a", "b"];
  public staticTableColumnNames: Record<string, string> = {
    a: "Spalte 1",
    b: "Spalte 2"
  };

  public ngOnInit(): void {
    // Create static table datasource
    this.staticTableDataSource = of([
      {
        a: "Zeile 1 Spalte 1",
        b: "Zeile 1 Spalte 2"
      },
      {
        a: "Zeile 2 Spalte 1",
        b: "Zeile 2 Spalte 2"
      },
      {
        a: "Zeile 3 Spalte 1",
        b: "Zeile 3 Spalte 2"
      },
      {
        a: "Zeile 4 Spalte 1",
        b: "Zeile 4 Spalte 2"
      },
      {
        a: "Zeile 5 Spalte 1",
        b: "Zeile 5 Spalte 2"
      },
      {
        a: "Zeile 6 Spalte 1",
        b: "Zeile 6 Spalte 2"
      },
      {
        a: "Zeile 7 Spalte 1",
        b: "Zeile 7 Spalte 2"
      }
    ]);
  }
}

interface MyModel {
  a: string;
  b: string;
}
