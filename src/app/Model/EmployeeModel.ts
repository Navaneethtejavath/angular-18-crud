export class EmployeeModel{
        Empid:number;
        EmpName:string;
        EmpContactNo:number;
        state:string;
        Country:string
        
        constructor(){
            this.Empid=0;
            this.EmpName='';
            this.EmpContactNo=0;
            this.state='';
            this.Country='';
        }
}