import { Employee } from './../../models/employee.model';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'Employee-Form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @Input() objEmployee=new Employee();

  @Output() notifyCreate=new EventEmitter<Employee>(); 
  @Output() notityUpdate=new EventEmitter<Employee>();
  @Output() notifyCancel=new EventEmitter<any>(); 

  constructor() { }

  ngOnInit(): void {
  }
  onSave(){
    if(this.objEmployee.id === 0){
      this.notifyCreate.emit(this.objEmployee);
    }
    else{
      this.notityUpdate.emit(this.objEmployee);
    }
  }
  onCancel(){
    this.notifyCancel.emit();
    this.objEmployee=new Employee();
  }
}
