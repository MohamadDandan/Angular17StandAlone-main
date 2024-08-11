import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { Router, RouterLink } from '@angular/router';
import { registerConfirm, userregister } from '../../_model/user.model';
import { UserService } from '../../_service/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,MaterialModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  _response:any;

  constructor(
    private builder:FormBuilder,
    private service:UserService,
    private toastr:ToastrService,
    private route:Router) { }

   
  _regform=this.builder.group({
    username:this.builder.control('',Validators.compose([
      Validators.required,
      Validators.minLength(5)])),
    password:this.builder.control('',Validators.required),
    confirmPassword:this.builder.control('',Validators.required),
    name:this.builder.control('',Validators.required),
    email:this.builder.control('',Validators.required),
    phone:this.builder.control('',Validators.required)
  })

  proceedregister() {
    if(this._regform.valid) {
      let _obj:userregister={
        userName:this._regform.value.username as string,
        name:this._regform.value.name as string,
        phone:this._regform.value.phone as string,
        email:this._regform.value.email as string,
        password:this._regform.value.password as string
      }
      this.service.UserRegistration(_obj).subscribe(data=>{
        this._response = data;
        console.log(this._response);
        if(this._response.result=='pass'){
          let _confirmObj:registerConfirm={
            userID:this._response.message,
            userName:_obj.userName,
            otpText:''
          }
          this.service._registerResp.set(_confirmObj)
          this.toastr.success('successfuly registration');
           this.route.navigateByUrl('/confirmotp');
        }else{
          this.toastr.error(this._response.message);
        }
      },err=>{
        console.log(err);
      })
    }
  }
}
/*
message
: 
"1007"
responseCode
: 
0
result
: 
"pass"
*/
