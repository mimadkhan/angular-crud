import { Employee } from './../models/employee.model';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent implements OnInit {

  public EmployeeList:Employee[]=[];
  public objEmp:Employee=new Employee();
  public mode:string= 'List';

  constructor(private dataSRV : DataService) { }

  ngOnInit(): void {
    this.getData();
  }
  
  getData(){
    this.dataSRV.getAll().subscribe(
      (res)=>{
        this.EmployeeList=res;
        console.log(res);
      },
      (error)=>{
        console.log(error);
      }
    );
    this.objEmp = new Employee();
  }
  select(objEmp:Employee){
    this.objEmp=objEmp;
    this.mode= 'Form';
  }
  showEdit(){
    this.mode= 'Form';
    }
  create(objEmp:Employee){
    this.dataSRV.create(objEmp).subscribe(
      (res)=>{
        this.getData();
        console.log('Data Created Successfully !')
        console.log(res);
      },
      (error)=>{
       console.log(error);
      } 
    )
    this.mode= 'List';
  }
  update(objEmp:Employee){
    this.dataSRV.update(objEmp.id,objEmp).subscribe(
      (res)=>{
        this.getData();
        console.log('Data Updated Successfully !')
      },
      (error)=>{
       console.log(error);
      } 
    )
    this.mode= 'List';
  }
  delete(objEmp:Employee){
    this.dataSRV.delete(objEmp.id).subscribe(
      (res)=>{
        this.getData();
        console.log('Data deleted Successfully !')
      },
      (error)=>{
       console.log(error);
      } 
    )
  }
  cancel(){
    this.objEmp=new Employee();
    this.mode= 'List';
  }
}
