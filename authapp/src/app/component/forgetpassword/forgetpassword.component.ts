
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../_service/user.service';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [MaterialModule,RouterLink,FormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.css'
})
export class ForgetpasswordComponent implements OnInit{
  username='';
  _response:any;
  
  constructor(
    private service:UserService,
    private router:Router,
    private toastr:ToastrService ){
  
  }
    ngOnInit(): void {
      
    }
  
  forgetPassword() {
    this.service.ForgetPassword(this.username).subscribe(data =>{
      this._response = data;
      if(this._response.result=='pass'){
        this.toastr.success("otp send to regi mail","forget password");
        this.service._username.set(this.username);
        this.router.navigateByUrl('/update');  
      }else{ 
        this.toastr.error(this._response.message);
      }
    })
    }  
  

}
