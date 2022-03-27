import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Model } from './dashboard.model';
import { ApiService } from '../shared/api.service';
import { ToastrService } from 'ngx-toastr';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  formValue !: FormGroup;
  modelObj: Model = new Model();
  employeeData!: any;
  showAdd!: boolean;
  showUpdate!: boolean;
  invalidRating: boolean | undefined;
  checkYear: any;
  searchEmployee: string="";

  constructor(private formbuilder: FormBuilder,
    private api: ApiService, private toastr: ToastrService) { }
  checkfalse = false;

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      ime: [''],
      jmbg: [''],
      godinaZaposlenja: [''],
      kategorijaId: [''],
      kategorijaName:[''],
      adresa: [''],
      aktivan: ['']
    })
    this.getAllEmployees();
    this.getkategorije();
  }
  SelectCategory: any | undefined;
  getkategorije()
  {
    return this.api.getCategories().subscribe((result)=>{
      this.SelectCategory = result;
      console.log(this.SelectCategory);
    });
  }
  Search() {
    if (this.searchEmployee == "") {
      this.getAllEmployees();
    }
    else {
      this.api.searchEmployees(this.searchEmployee).subscribe(res => {
        this.employeeData = res;

      })
    }
  }
  clickAddEmployee() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postEmployeeDetails() {
    this.modelObj.ime = this.formValue.value.ime;
    this.modelObj.jmbg = this.formValue.value.jmbg;
    this.modelObj.adresa = this.formValue.value.adresa;
    this.modelObj.godinaZaposlenja = +this.formValue.value.godinaZaposlenja;
    this.modelObj.aktivan = this.formValue.value.aktivan ? this.formValue.value.aktivan : false;
    this.modelObj.kategorijaId = +this.formValue.value.kategorijaId;

    this.checkYear = Number(this.modelObj.godinaZaposlenja);
    if (this.checkYear < 2010 || this.checkYear > 2022) {
      this.toastr.warning("Year needs to be between 2010 and 2022.")
    }
    else {
      this.api.postEmployees(this.modelObj)
        .subscribe(res => {
          console.log(res);
          this.toastr.success("Employee added successfully!")
          let ref = document.getElementById('cancel')
          ref?.click();
          this.formValue.reset();
          this.getAllEmployees();

        },
          err => {
            this.toastr.error("Something went wrong.")
          })
    }
  }
  getAllEmployees() {
    this.api.getEmployees()
      .subscribe(res => {
        this.employeeData = res;
      })
  }

  deleteEmployee(row: any) {
    this.api.deleteEmployees(row.id)
      .subscribe(res => {
        this.toastr.success("Employee deleted.");
        this.getAllEmployees();
      })
  }
  logOut():void
  {
    // this.document.location.href = 'https://stackoverflow.com';
    window.location.href='https://ajzisj123.wixsite.com/websitegym';
  }
  home():void
  {
    // this.document.location.href = 'https://stackoverflow.com';
    window.location.href='https://ajzisj123.wixsite.com/websitegym';
  }
  account():void
  {
    // this.document.location.href = 'https://stackoverflow.com';
    window.location.href='https://ajzisj123.wixsite.com/websitegym/profile/rijadmaljanovic98/profile';
  }
  products():void
  {
    // this.document.location.href = 'https://stackoverflow.com';
    window.location.href='https://ajzisj123.wixsite.com/websitegym/shop';
  }
  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.modelObj.id = row.id;
    this.formValue.controls['ime'].setValue(row.ime);
    this.formValue.controls['jmbg'].setValue(row.jmbg);
    this.formValue.controls['adresa'].setValue(row.adresa);
    this.formValue.controls['godinaZaposlenja'].setValue(row.godinaZaposlenja);
    this.formValue.controls['aktivan'].setValue(row.aktivan);
    this.formValue.controls['kategorijaId'].setValue(row.kategorijaId);
  }
  updateEmployeeDetails() {
    this.modelObj.ime = this.formValue.value.ime;
    this.modelObj.jmbg = this.formValue.value.jmbg;
    this.modelObj.adresa = this.formValue.value.adresa;
    this.modelObj.godinaZaposlenja = +this.formValue.value.godinaZaposlenja;
    this.modelObj.aktivan = this.checkfalse;
    this.modelObj.kategorijaId = +this.formValue.value.kategorijaId;

    this.checkYear = Number(this.modelObj.godinaZaposlenja);
    if (this.checkYear < 2010 || this.checkYear > 2022) {
      this.toastr.warning("Year needs to be between 2010 and 2022.")
    }
    else {
      this.api.updateEmployees(this.modelObj, this.modelObj.id)
        .subscribe(res => {
          this.toastr.success("Updated successfully!");
          let ref = document.getElementById('cancel')
          ref?.click();
          this.formValue.reset();
          this.getAllEmployees();
        })
    }
  }
}
