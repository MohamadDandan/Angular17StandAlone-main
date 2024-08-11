import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../_service/user.service';
import { ResetPassword } from '../../_model/user.model';

@Component({
  selector: 'app-resetpassword',
  standalone: true,
  imports: [MaterialModule,RouterLink,ReactiveFormsModule],
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.css'
})
export class ResetpasswordComponent implements OnInit  {

  _response: any;
  constructor(
    private toastr: ToastrService,
    private userService: UserService,
    private router: Router,
    private builder:FormBuilder
  ) { }

  _resetForm=this.builder.group({
    oldPassword:this.builder.control('',Validators.required),
    newPassword:this.builder.control('',Validators.required),
    
  })

  changePassword(){
      if(this._resetForm.valid){
        let _obj: ResetPassword={
          UserName:localStorage.getItem('username') as string,
          oldPassword:this._resetForm.value.oldPassword as string,
          newPassword:this._resetForm.value.newPassword as string 
        } 
        this.userService.ResetPassword(_obj).subscribe(data=>{
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
  ngOnInit(): void {
    
  }
}
