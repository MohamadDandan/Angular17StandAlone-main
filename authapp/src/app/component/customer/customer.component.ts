import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { Router, RouterLink } from '@angular/router';
import { CustomerService } from '../../_service/customer.service';
import { customer } from '../../_model/customer.model';
import { MatTableDataSource } from '@angular/material/table';
import { GetMenuPermissions } from '../../_model/user.model';
import { UserService } from '../../_service/user.service';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [MaterialModule,RouterLink],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit {


  customerlist!: customer[];
  displayColumns:string[]=["code", "name", "email", "phone","creditlimit","status","action"];
  dataSource:any;
  _response:any;
  _permission:GetMenuPermissions={
    code: '',
    name: '',
    haveview: false,
    haveadd: false,
    haveedit: false,
    havedelete: false,
    userrole: '',
    menucode: ''
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private customerService:CustomerService,
    private userService:UserService, 
    private toastr:ToastrService,
    private router:Router) {
      this.setAccess();
    }
  ngOnInit(): void {
    
    this.LoadCustomer();
  }

  setAccess(){
    let role=localStorage.getItem("userRole") as string;
    this.userService.GetMenuPermissions(role,'customer')
     .subscribe(data=>{
        this._permission=data;
      });
    
  }

  LoadCustomer(){
    this.customerService.GetAll().subscribe(data=>{
      this.customerlist = data;
      this.dataSource = new MatTableDataSource<customer>(this.customerlist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  fnEdit(code: string) {
    if(this._permission.haveedit){
      this.router.navigateByUrl('/customer/edit/'+code);
    }else{
      this.toastr.warning('user not having edite access');
    }
    }
    fnDelete(code: string) {
      
      if(this._permission.havedelete){
        if(confirm('Are you sure you want to delete')){
          this.customerService.DeleteCustomer(code).subscribe(data=>{
            this._response=data;
            if(this._response.result==='pass'){
              this.toastr.success("deleted","Success");
              this.LoadCustomer();
            }
            else{
              this.toastr.error(this._response.message,"Failed");  
          }
        })
        }
      }else{
        
        this.toastr.warning('user not having delete access');
      }
      }
}
