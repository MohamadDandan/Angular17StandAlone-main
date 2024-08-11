import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { roles, updateUser, users } from '../../_model/user.model';
import { UserService } from '../../_service/user.service';


@Component({
  selector: 'app-user-update',
  standalone: true,
  imports: [MaterialModule,ReactiveFormsModule],
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.css'
})
export class UserUpdateComponent implements OnInit {



  dialogData:any;
  userData!:users;
  roleList!:roles[];
  type='';
  _response:any;
  constructor(
      private builder: FormBuilder,
      private toastr: ToastrService,
      private userService:UserService,
      private ref:MatDialogRef<UserUpdateComponent>,
      @Inject(MAT_DIALOG_DATA) public data:any) { }


  ngOnInit(): void {
    this.loadRole()
    this.dialogData=this.data;
    this.type=this.dialogData.type;
    console.log(this.dialogData)
    if(this.dialogData.username!==''){
      this.userService.GetUserbyCode(this.dialogData.username).subscribe(data=>{
        this.userData = data;
        this.userForm.setValue({
          username: this.userData.username,
          role: this.userData.role,
          status: this.userData.isactive})
      })
    }
  }

  userForm=this.builder.group({
    username:this.builder.control({value:'',disabled:true}),
    role:this.builder.control('',Validators.required),
    status:this.builder.control(true)
  });

  UpdateRole() {
    if(this.userForm.valid){
      let _obj:updateUser={
        username:this.dialogData.username,
        role:this.userForm.value.role as string,
        status:this.userForm.value.status as boolean,
      }
      if(this.type==='role'){
        this.userService.UpdateRole(_obj).subscribe(data =>{
          this._response=data;
          if(this._response.result=='pass'){
            this.toastr.success("success",this._response.message);
            this.ClosePopup();
          }else{ 
            this.toastr.error("failed",this._response.message);
          }
        })
        }
        else{ 
        
          this.userService.UpdateStatus(_obj).subscribe(data =>{
            this._response=data;
            if(this._response.result=='pass'){
              this.toastr.success("success status",this._response.message);
              this.ClosePopup();
            }else{ 
              this.toastr.error("failed",this._response.message);
            }
          })
          }
      }
      }
    
  
  loadRole() {
    this.userService.GetAllRoles().subscribe(data=>{
      this.roleList = data;
    })
  }
  ClosePopup() {
    this.ref.close();
    }
}
