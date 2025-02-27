import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EmployeeModel } from './Model/EmployeeModel';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  employeeForm:FormGroup= new FormGroup({});
   
  employeeObj:EmployeeModel = new EmployeeModel();
   EmployeeList:EmployeeModel[]=[];

    constructor(){
      debugger
      this.CraeteForm();
      const olddata= localStorage.getItem("Empdata");
      if(olddata!=null){
        const parsedata= JSON.parse(olddata);
          this.EmployeeList=parsedata;
      }
    }

  CraeteForm(){
    this.employeeForm= new FormGroup({  
      Empid:new FormControl(this.employeeObj.Empid),
      EmpName:new FormControl(this.employeeObj.EmpName),
      EmpContactno: new FormControl(this.employeeObj.EmpContactNo),
      state: new FormControl(this.employeeObj.state),
      Country: new FormControl(this.employeeObj.Country)
    })
  }

  onsave(){
    debugger
    const olddata= localStorage.getItem("Empdata");
    if(olddata!=null){
      const parsedata= JSON.parse(olddata);
      this.employeeForm.controls['empId'].setValue(parsedata.length+1);
      this.EmployeeList.unshift(this.employeeForm.value);
      }
      else{
        this.EmployeeList.unshift(this.employeeForm.value);
      }
      localStorage.setItem("EmpData",JSON.stringify(this.EmployeeList));
  }
  onedit(item:EmployeeModel){
     this.employeeObj=item;
     this.CraeteForm()
  }

  onUpdate(){
    const record= this.EmployeeList.find(m=>m.Empid==this.employeeForm.controls["empid"].value);
    if(record!=undefined){
      record.EmpName=this.employeeForm.controls['EmpName'].value;
      record.EmpContactNo=this.employeeForm.controls['EmpContactNo'].value;
      record.state=this.employeeForm.controls['state'].value;
    }
    localStorage.setItem("Empdata",JSON.stringify(this.EmployeeList));
    this.employeeObj=new EmployeeModel();
    this.CraeteForm();
  }

  onDelete(id:number){
    const IdDelete= confirm('If U want Delete This Item?');
    if(IdDelete){
      const index= this.EmployeeList.findIndex(m=>m.Empid==id);
      this.EmployeeList.splice(index,1);
      localStorage.setItem("Empdata",JSON.stringify(this.EmployeeList));
    }
  }
}
