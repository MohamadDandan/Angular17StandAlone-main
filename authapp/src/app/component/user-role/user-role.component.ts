import { GetMenuPermissions, menus, roles } from './../../_model/user.model';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../_service/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-role',
  standalone: true,
  imports: [MaterialModule,ReactiveFormsModule,CommonModule],
  templateUrl: './user-role.component.html',
  styleUrl: './user-role.component.css'
})
export class UserRoleComponent implements OnInit {

  rolesList!:roles[];
  menusList!:menus[];
  accessArray!:FormArray<any>;
  userAccess!:GetMenuPermissions
  _response:any;

  constructor(
    private builder:FormBuilder,
    private toastr:ToastrService,
    private userService:UserService) { }
  ngOnInit(): void {
    this.LoadRoles();
    this.LoadMenus('');
    
  }

  roleForm=this.builder.group({
    userrole:this.builder.control('',Validators.required),
    access:this.builder.array([])
  })

  GentrateMenuRow(input:menus,_access:GetMenuPermissions,role:string){
    return this.builder.group({
      menucode:this.builder.control(input.code),
      haveview:this.builder.control(_access.haveview),
      haveadd:this.builder.control(_access.haveadd),
      haveedit:this.builder.control(_access.haveedit),
      havedelete:this.builder.control(_access.havedelete),
      userrole:this.builder.control(role),

    });
  }

  AddNewRow(input:menus,_access:GetMenuPermissions,role:string){
    this.accessArray.push(this.GentrateMenuRow(input,_access,role));
  }

  get GetRows(){
    return this.roleForm.get('access') as FormArray;
  }
  LoadRoles(){
    this.userService.GetAllRoles().subscribe(data=>{
        this.rolesList=data;
      }
    )
  }
  LoadMenus(userRole:string){
    this.accessArray=this.roleForm.get('access') as FormArray;
    this.accessArray.clear();
    this.userService.GetAllMenus().subscribe(data=>{
        this.menusList=data;
        if(this.menusList.length>0){
          this.menusList.map((res:menus)=>{
            if(userRole!='')
              this.userService.GetMenuPermissions(userRole,res.code).subscribe(data=>{
                this.userAccess=data;
                this.AddNewRow(res,this.userAccess,userRole);
              })
             else{
                this.AddNewRow(res,{
                  code: '',
                  name: '',
                  haveview: false,
                  haveadd: false,
                  haveedit: false,
                  havedelete: false,
                  userrole: '',
                  menucode: ''
                },"");
                
              }
              
            
          })
        }
      }
    )
  }

  roleChange(event:any){
    let selectedRole=event.value;
    this.LoadMenus(selectedRole)
  }
  SaveRoles(){
    if(this.roleForm.valid){
      let formarry=this.roleForm.value.access as GetMenuPermissions[];
      this.userService.AssignRolePermission(formarry).subscribe(data=>{
        this._response = data;
        if(this._response.result=='pass'){
          console.log(formarry);
          this.toastr.success("success permission assigned",this._response.message);
        }else{
          this.toastr.error("failed ermission assigned",this._response.message);
        }
      })
  }

}
}
