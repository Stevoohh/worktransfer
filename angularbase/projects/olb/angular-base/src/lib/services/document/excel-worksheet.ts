import { Column } from "exceljs";

export class ExcelWorksheet {
  title = "";
  columns: Partial<Column>[] = [];
  data: any[] = [];
}
