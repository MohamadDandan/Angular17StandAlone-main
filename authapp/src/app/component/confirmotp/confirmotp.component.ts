import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../_service/user.service';
import { registerConfirm } from '../../_model/user.model';

@Component({
  selector: 'app-confirmotp',
  standalone: true,
  imports: [MaterialModule,FormsModule,RouterLink],
  templateUrl: './confirmotp.component.html',
  styleUrl: './confirmotp.component.css'
})
export class ConfirmotpComponent implements OnInit {

otptext='';
regResponse!:registerConfirm;
_response:any;

constructor(
  private service:UserService,
  private router:Router,
  private toastr:ToastrService ){

}
  ngOnInit(): void {
    this.regResponse=this.service._registerResp()
  }

confirmOTP() {
  this.regResponse.otpText=this.otptext
  this.service.UserConfirmation(this.regResponse).subscribe(data =>{
    this._response = data;
    if(this._response.result=='pass'){
      this.toastr.success("Registration Success","nice");
      this.service._registerResp.set({
        userID:0,
        userName:'',
        otpText:''
      })
      this.router.navigateByUrl('/login');  
    }else{ 
      this.toastr.error(this._response.message);
    }
  })
  }  

}
