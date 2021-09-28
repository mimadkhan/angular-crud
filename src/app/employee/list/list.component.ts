import { Employee } from './../../models/employee.model';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import jspdf, {jsPDF} from 'jspdf';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
const htmlToPdfmake = require("html-to-pdfmake");

declare var require: any;

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'Employee-List',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {

  @ViewChild('pdfTable')
  pdfTable!: ElementRef;
  
  @Input() employeeList: Employee[] = [];
  @Output() notifySelect = new EventEmitter<Employee>();
  @Output() notifyshowedit = new EventEmitter<Employee>();
  @Output() notifyDelete = new EventEmitter<Employee>();
  
  page = 1;
  pageSize =10;

  constructor() {}

  ngOnInit() {}

  onSelect(objEmp: Employee): void {
    this.notifySelect.emit(objEmp);
  }

  showedit() {
    this.notifyshowedit.emit();
  }

  onDelete(objEmp: Employee): void {
    this.notifyDelete.emit(objEmp);
  }

 // Angular HTML to PDF
  
  public downloadAsPDF() {
    const pdfTable = this.pdfTable.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).download(); 
     
  }

}


