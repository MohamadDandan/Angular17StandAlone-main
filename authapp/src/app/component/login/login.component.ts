import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../_service/user.service';
import { ToastrService } from 'ngx-toastr';
import { loginResponse, userlogin } from '../../_model/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MaterialModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  _response!: loginResponse

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
  ) { }


  ngOnInit(): void {
    localStorage.clear();
    this.userService._menulist.set([])
  }


  _loginForm = this.formBuilder.group({
    username: this.formBuilder.control('', Validators.required),
    password: this.formBuilder.control('', Validators.required),
  });

  proceedLogin() {
    if (this._loginForm.valid) {
      let _obj: userlogin = {
        userName: this._loginForm.value.username as string,
        password: this._loginForm.value.password as string
      }
      this.userService.UserLogin(_obj).subscribe(data => {
        this._response = data;
        localStorage.setItem('token', this._response.token);
        localStorage.setItem('username', _obj.userName);
        localStorage.setItem('userRole', this._response.userRole);
        this.userService.LoadMenuByeRole(this._response.userRole).subscribe(data => {
          this.userService._menulist.set(data);
        });
        this.router.navigateByUrl('/');
      }, err => {
        this.toastr.error("failed",err.error.message);
        console.log(err.error.message);
      });
    }
  }
}
