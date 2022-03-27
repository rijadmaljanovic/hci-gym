import { Injectable } from '@angular/core';
import{HttpClient}from '@angular/common/http'
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl="https://localhost:44343/api/Zaposlenik";
  catUrl="https://localhost:44343/api/Category";

  constructor(private http:HttpClient) { }

  getCategories(){
    return this.http.get<any>("https://localhost:44343/api/Category")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getCategory(id:number){
    return this.http.get<any>("https://localhost:44343/api/Category/"+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  postEmployees(data:any){
    return this.http.post<any>(this.baseUrl,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getEmployees(){
    return this.http.get<any>(this.baseUrl)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  updateEmployees(data:any, id:number){
    return this.http.put<any>(this.baseUrl+"/"+id, data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  deleteEmployees(id:number){
    return this.http.delete<any>(this.baseUrl+"/"+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  searchEmployees(search:string){
    let url= this.baseUrl+"/search?Name="+search
    return this.http.get<any>(url)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
