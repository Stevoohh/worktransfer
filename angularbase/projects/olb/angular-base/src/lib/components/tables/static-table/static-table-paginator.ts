import { Injectable } from "@angular/core";
import { MatPaginatorIntl } from "@angular/material/paginator";
import { Subject } from "rxjs";

@Injectable()
export class StaticTablePaginator implements MatPaginatorIntl {
  changes = new Subject<void>();

  firstPageLabel = `Erste Seite`;
  itemsPerPageLabel = `Einträge pro Seite:`;
  lastPageLabel = `Letzte Seite`;

  nextPageLabel = "Nächste Seite";
  previousPageLabel = "Vorherige Seite";

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return `Seite 1 of 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return `Seite ${page + 1} of ${amountPages}`;
  }
}
