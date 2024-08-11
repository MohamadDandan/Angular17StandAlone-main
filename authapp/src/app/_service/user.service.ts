import { ResetPassword, UpdatePassword, loginResponse, menu, registerConfirm, userlogin, userregister, GetMenuPermissions, users, roles, updateUser, menus } from './../_model/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { customer } from '../_model/customer.model';

@Injectable({
  providedIn: 'root'
})
export class UserService { 

  constructor(private http:HttpClient) { }

  baseUrl=environment.apiUrl;
  _registerResp=signal<registerConfirm>({
    userID:0,
    userName:'',
    otpText:'' 
  })

  _username=signal('')
  _menulist=signal<menu[]>([]);
   
  UserRegistration(_data:userregister){
    return this.http.post(this.baseUrl+'User/userregisteration',_data);
  }
  UserConfirmation(_data:registerConfirm){
    return this.http.post(this.baseUrl+'User/confirmregisteration',_data);
  }
  UserLogin(_data:userlogin){
    return this.http.post<loginResponse>(this.baseUrl+'Authorize/GenerateToken',_data);
  }
  LoadMenuByeRole(role:string){
    return this.http.get<menu[]>(this.baseUrl+'UserRole/GetAllMenusbyrole?userrole='+role);
  }
  ResetPassword(_data:ResetPassword){
    return this.http.post(this.baseUrl+'User/resetpassword',_data);
  }
  ForgetPassword(username:string){
    return this.http.get(this.baseUrl+'User/forgetpassword?username='+username);
  }
  UpdatePassword(_data:UpdatePassword){
    return this.http.post(this.baseUrl+'User/updatepassword',_data);
  }
  GetMenuPermissions(userRole:string,menuCode:string){ 
     return this.http.get<GetMenuPermissions>(this.baseUrl+'UserRole/GetMenupermissionbyrole?userrole='+userRole+'&menucode='+menuCode);
  }
  GetAllUsers(){
    return this.http.get<users[]>(this.baseUrl+'User/GetAll');
  }
  GetUserbyCode(code:string){ 
    return this.http.get<users>(this.baseUrl+'User/GetBycode?code='+code);
  }
  GetAllRoles(){ 
    return this.http.get<roles[]>(this.baseUrl+'UserRole/GetAllRoles');
  }
  UpdateRole(_data:updateUser){
    return this.http.post(this.baseUrl+'User/updaterole',_data);
  }
  UpdateStatus(_data:updateUser){
    return this.http.post(this.baseUrl+'User/updatestatus',_data);
  }
  GetAllMenus(){ 
    return this.http.get<menus[]>(this.baseUrl+'UserRole/GetAllMenus');
  }
  AssignRolePermission(_data:GetMenuPermissions[]){
    return this.http.post(this.baseUrl+'UserRole/assignrolepermission',_data);
  }
 
} 
