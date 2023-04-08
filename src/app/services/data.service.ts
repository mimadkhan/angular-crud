import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  Url='https://localhost:44302/api/Employees';
  // Url='https://614d84dde3cf1f001712d18a.mockapi.io/Empolyee';

  constructor(private http : HttpClient) { }

  getAll():Observable<Employee[]>{
    return this.http.get<Employee[]>(`${this.Url}/GetAll`)
  }
  create(obj:Employee){
    return this.http.post(`${this.Url}/save` , obj)
  }
  update(id:number , objUser:any){
    return this.http.put(`${this.Url}/update/${id}`, objUser)
  }
  delete(id:number){
    return this.http.delete(`${this.Url}/delete/${id}`)
  }
}
