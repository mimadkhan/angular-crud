import { Employee } from './../models/employee.model';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  public EmployeeList: Employee[] = [];
  public objEmp: Employee = new Employee();
  public mode: string = 'List';

  constructor(
    private dataSRV: DataService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getData();
    /** spinner starts on init */
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 3 seconds */
      this.spinner.hide();
    }, 3000);
  }

  getData() {
    this.dataSRV.getAll().subscribe(
      (res) => {
        this.EmployeeList = res;
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
    this.objEmp = new Employee();
  }
  select(objEmp: Employee) {
    this.objEmp = objEmp;
    this.mode = 'Form';
  }
  showEdit() {
    this.mode = 'Form';
  }
  create(objEmp: Employee) {
    this.spinner.show();
    this.dataSRV.create(objEmp).subscribe(
      (res) => {
        this.toastr.success('Employee Success!', 'Created!');
        this.spinner.hide();
        this.getData();
        console.log('Data Created Successfully !');
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
    this.mode = 'List';
  }
  update(objEmp: Employee) {
    this.spinner.show();
    this.dataSRV.update(objEmp.id, objEmp).subscribe(
      (res) => {
        this.toastr.success('Employee Successful!', 'Update!');
       this.spinner.hide();
        this.getData();
        console.log('Data Updated Successfully !');
      },
      (error) => {
        console.log(error);
      }
    );
    this.mode = 'List';
  }
  delete(objEmp: Employee) {
    this.spinner.show();
    this.dataSRV.delete(objEmp.id).subscribe(
      (res) => {
        this.toastr.error('Employee Successfully', 'Delete !');
       this.spinner.hide();
        this.getData();
        console.log('Data deleted Successfully !');
      },
      (error) => {
        console.log(error);
      }
    );
  }
  cancel() {
    this.spinner.show();
    this.objEmp = new Employee();
    this.mode = 'List';
    setTimeout(() => {
      this.spinner.hide();
    });
  }
}
