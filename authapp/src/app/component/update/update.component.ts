import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../_service/user.service';
import { ToastrService } from 'ngx-toastr';
import { ResetPassword, UpdatePassword } from '../../_model/user.model';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [RouterLink,MaterialModule,ReactiveFormsModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit {

  currentUserName='';

  _response: any;
  constructor(
    private toastr: ToastrService,
    private userService: UserService,
    private router: Router,
    private builder:FormBuilder
  ) { }

  ngOnInit(): void {
    this.currentUserName=this.userService._username();
  }

  _resetForm=this.builder.group({
    Password:this.builder.control('',Validators.required),
    OTPtext:this.builder.control('',Validators.required),
    
  })
 
  UpdatePassword(){
      if(this._resetForm.valid){
        let _obj: UpdatePassword={
          UserName:this.currentUserName,
          Password:this._resetForm.value.Password as string,
          otpText:this._resetForm.value.OTPtext as string 
        } 
        this.userService.UpdatePassword(_obj).subscribe(data=>{
          this._response=data;
          if(this._response.result=='pass'){
            this.toastr.success("success",this._response.message);
            this.router.navigateByUrl('/login');
          }else{ 
            this.toastr.error("failed",this._response.message);
          }
        })
      }
  }
 
}
