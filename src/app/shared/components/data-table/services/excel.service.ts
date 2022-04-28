import { element } from 'protractor';
import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { LocalizationService } from 'src/app/services/localization/localization.service';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8;';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor(public localize: LocalizationService) {

  }

  public exportAsExcelFile(json: any[], excelFileName: string, rtl): void {

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    this.delete_row(worksheet , 0);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'], Workbook: { Views: [{ RTL: rtl }] } };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  private ec(r, c) {
    return XLSX.utils.encode_cell({ r: r, c: c });
  }
  private delete_row(ws, row_index) {
    var variable = XLSX.utils.decode_range(ws['!ref']);
    for (var R = row_index; R < variable.e.r; ++R) {
      for (var C = variable.s.c; C <= variable.e.c; ++C) {
        ws[this.ec(R, C)] = ws[this.ec(R + 1, C)];
      }
    }
    variable.e.r--
    ws['!ref'] = XLSX.utils.encode_range(variable.s, variable.e);
  }

}
