import { Employee } from './../../models/employee.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'Employee-List',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() employeeList:Employee[]=[];
  @Output() notifySelect= new EventEmitter<Employee>();
  @Output() notifyshowedit= new EventEmitter<Employee>();
  @Output() notifyDelete= new EventEmitter<Employee>();
  
  constructor(private spinner: NgxSpinnerService) { }

  ngOnInit() {
    // /** spinner starts on init */
    // this.spinner.show();

    // setTimeout(() => {
    //   /** spinner ends after 5 seconds */
    //   this.spinner.hide();
    // }, 3000);
  }
 
  onSelect(objEmp: Employee): void {
    this.notifySelect.emit(objEmp);
  }
  
  showedit() {
    this.notifyshowedit.emit();
  }
 
  onDelete(objEmp: Employee): void {
    this.notifyDelete.emit(objEmp);
  }
}
