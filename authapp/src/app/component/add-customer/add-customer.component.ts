
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../../_service/customer.service';
import { customer } from '../../_model/customer.model';

@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [MaterialModule,ReactiveFormsModule,RouterLink],
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.css'
})
export class AddCustomerComponent implements OnInit {

  _response:any;
  title='Add Customer';
  editCode='';
  isEdit=false;
  editDate!:customer;

  constructor(
    private builder:FormBuilder,
    private toaster:ToastrService,
    private router:Router,
    private customerService:CustomerService,
    private act:ActivatedRoute) { }

  ngOnInit(): void {
    this.editCode = this.act.snapshot.paramMap.get('code') as string;
    if(this.editCode!=''&&this.editCode!=null) {
      this.isEdit = true;
      this.title='Edit Customer';
      this.customerForm.controls['code'].disable();
      this.customerService.GetByCode(this.editCode).subscribe(data => {
        this.editDate=data;
        this.customerForm.setValue({
          code:this.editDate.code as unknown as string,
          name:this.editDate.name,
          email:this.editDate.email,
          phone:this.editDate.phone,
          creditlimit:this.editDate.creditlimit,
          status:this.editDate.isActive
        });
      })
    }
  }

   customerForm=this.builder.group({  
    code:this.builder.control('',Validators.required),
    name:this.builder.control('',Validators.required),
    email:this.builder.control('',Validators.required),
    phone:this.builder.control('',Validators.required),
    creditlimit:this.builder.control(0,Validators.required),
    status:this.builder.control(true),
   })

   SaveCustomer(){
    if(this.customerForm.valid){
      let _obj:customer={
        code:this.customerForm.value.code as unknown as number,
        name:this.customerForm.value.name as string,
        email:this.customerForm.value.email as string,
        phone:this.customerForm.value.phone as string,
        creditlimit:this.customerForm.value.creditlimit as number,
        isActive:this.customerForm.value.status as boolean,
        statusname:""
      }
      if(!this.isEdit){
        this.customerService.CreateCustomer(_obj).subscribe(data=>{ 
          this._response=data;
          console.log(this._response);
          if(this._response.result==='pass'){
            this.toaster.success("created","Success");
            this.router.navigateByUrl('/customer');
          }
          else{
            this.toaster.error(this._response.message,"Failed");
          }
        })
      }else{
        _obj.code=this.editDate.code;
        this.customerService.UpdateCustomer(_obj).subscribe(data=>{
          this._response=data;
          console.log(this._response);
          if(this._response.result==='pass'){
            this.toaster.success("upadted","Success");
            this.router.navigateByUrl('/customer');
          }
          else{
            this.toaster.error(this._response.message,"Failed");
          }
        })
      }
    }
    
   }

} 
