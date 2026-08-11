import { Injectable } from "@angular/core";
import { Workbook } from "exceljs";
import * as fs from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";
import { ExcelExportFileType } from "./excel-export-file-type";
import { ExcelWorksheet } from "./excel-worksheet";
import { PdfData } from "./pdf-data";

@Injectable({
  providedIn: "root"
})
export class OlbDocumentService {
  public exportToExcel(worksheets: ExcelWorksheet[], fileName: string, fileType: ExcelExportFileType): void {
    const workbook = new Workbook();
    workbook.title = fileName;

    worksheets.forEach(ws => {
      const worksheet = workbook.addWorksheet(ws.title);
      worksheet.columns = ws.columns;
      worksheet.addRows(ws.data, "n");
    });

    switch (fileType) {
      case ExcelExportFileType.XLSX:
        workbook.xlsx.writeBuffer().then(data => {
          const blob = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
          fs.saveAs(blob, fileName + ".xlsx");
        });
        break;
      case ExcelExportFileType.CVS:
        // Aktuell nicht implementiert
        alert(".csv Export ist noch nicht komplett sauber implementiert.");
        //
        workbook.csv.writeBuffer().then(data => {
          const blob = new Blob([data], { type: "text/csv" });
          fs.saveAs(blob, fileName + ".csv");
        });
        break;
      default:
        break;
    }
  }

  public exportToPdf(data: PdfData[], fileName: string, userName: string): jsPDF {
    const doc: any = new jsPDF();
    const totalPagesExp = "{total_pages_count_string}";

    data.forEach((pdfData, index, _ary) => {
      doc.autoTable({
        head: pdfData.columns,
        body: pdfData.data,
        showHead: "firstPage",
        startY: 45,
        margin: index === 0 ? { top: 45 } : { top: 45 },
        pageBreak: index === 0 ? "auto" : "always",
        headStyles: { fillColor: [6, 148, 114] },
        didDrawPage: function (data: any) {
          // Header
          doc.setFontSize(20);
          doc.setTextColor(40);
          doc.text(pdfData.title, data.settings.margin.left + 20, 22);
          doc.setFontSize(14);
          doc.text(pdfData.subTitle, data.settings.margin.left + 20, 30);
          // OLB Logo
          const imgBase64 =
            "data:image/png;base64,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";
          if (imgBase64) {
            doc.addImage(imgBase64, "PNG", data.settings.margin.left, 16, 15, 15);
          }
          // Linien
          let pageSize = doc.internal.pageSize;
          const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
          doc.line(data.settings.margin.left, 35, pageWidth - data.settings.margin.right, 35);
          doc.line(data.settings.margin.left, 36, pageWidth - data.settings.margin.right, 36);
          // Footer
          let str = "Seite " + doc.getNumberOfPages();
          if (typeof doc.putTotalPages === "function") {
            str = str + " von " + totalPagesExp;
          }
          doc.setFontSize(8);
          pageSize = doc.internal.pageSize;
          const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
          doc.text("gedruckt am: " + moment(Date.now()).format("DD.MM.yyyy hh:mm:ss") + " von " + userName, data.settings.margin.left, pageHeight - 10);
          doc.text(str, pageWidth - data.settings.margin.right - 15, pageHeight - 10);
        }
      });
    });

    if (typeof doc.putTotalPages === "function") {
      doc.putTotalPages(totalPagesExp);
    }
    doc.save(fileName + ".pdf");

    return doc;
  }
}
