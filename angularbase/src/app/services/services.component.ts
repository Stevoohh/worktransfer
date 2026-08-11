import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ExcelExportFileType, ExcelWorksheet, OlbDocumentService, PdfData } from "@olb/angular-base";
// import { ExcelExportFileType, ExcelWorksheet, OlbDocumentService, PdfData } from "@olb/    projects/olb/angular-base/src/public-api";

@Component({
  selector: "app-services",
  templateUrl: "./services.component.html",
  styleUrls: ["./services.component.scss"],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class ServicesComponent {
  public tsPdf: string =
    "const pdfDataArray = []; \nconst data = new PdfData(); \nconst cols = [['Spalte 1', 'Spalte 2']]; \nconst singleData = new Array<Array<string>>(); \nsingleData.push(['Zeile 1 Spalte 1', 'Zeile 1 Spalte 2']);  singleData.push(['Zeile 2 Spalte 1', 'Zeile 2 Spalte 2']);" +
    "data.title = 'Meine Überschrift'\ndata.subTitle = 'Subtitle';\ndata.columns = cols;\ndata.data = singleData;\npdfDataArray.push(data);\nthis.docService.exportToPdf(pdfDataArray, 'Titel', 'mein Benutzername');";
  public tsExcel: string =
    "const worksheets: Array<ExcelWorksheet> = []; \nconst myFirstWorksheet = new ExcelWorksheet();\nconst cols = [\n{ header: 'Spalte 1', key: 'col1', width: 5 },\n{ header: 'Spalte 2', key: 'col2', width: 15 },\n];\nconst data: any[] = [];\ndata.push({\ncol1: 'Zeile 1 Spalte 1',\ncol2: 'Zeile 1 Spalte 2',\n});\ndata.push({" +
    "col1: 'Zeile 2 Spalte 1',\ncol2: 'Zeile 2 Spalte 2',\n});\nmyFirstWorksheet.title = 'mein Titel';\nmyFirstWorksheet.columns = cols;\nmyFirstWorksheet.data = data;\nworksheets.push(myFirstWorksheet);\nthis.docService.exportToExcel(worksheets, 'Mein-Excel-Export', ExcelExportFileType.XLSX);";

  constructor(private readonly docService: OlbDocumentService) {}

  public exportPdf(): void {
    const pdfDataArray = [];
    const data = new PdfData();
    const cols = [["Spalte 1", "Spalte 2"]];
    const singleData = new Array<string[]>();
    singleData.push(["Zeile 1 Spalte 1", "Zeile 1 Spalte 2"]);
    singleData.push(["Zeile 2 Spalte 1", "Zeile 2 Spalte 2"]);

    data.title = "Meine Überschrift";
    data.subTitle = "Subtitle";
    data.columns = cols;
    data.data = singleData;
    pdfDataArray.push(data);
    this.docService.exportToPdf(pdfDataArray, "Titel", "mein Benutzername");
  }

  public exportExcel(): void {
    const worksheets: ExcelWorksheet[] = [];
    const myFirstWorksheet = new ExcelWorksheet();
    const cols = [
      { header: "Spalte 1", key: "col1", width: 5 },
      { header: "Spalte 2", key: "col2", width: 15 }
    ];
    const data: any[] = [];
    data.push({
      col1: "Zeile 1 Spalte 1",
      col2: "Zeile 1 Spalte 2"
    });
    data.push({
      col1: "Zeile 2 Spalte 1",
      col2: "Zeile 2 Spalte 2"
    });

    myFirstWorksheet.title = "mein Titel";
    myFirstWorksheet.columns = cols;
    myFirstWorksheet.data = data;
    worksheets.push(myFirstWorksheet);
    this.docService.exportToExcel(worksheets, "Mein-Excel-Export", ExcelExportFileType.XLSX);
  }
}
