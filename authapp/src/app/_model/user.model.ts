export interface userregister{
    userName:string;
    name:string;
    phone:string;
    email:string;
    password:string;
}
export interface registerConfirm{
    userID:number;
    userName:string;
    otpText:string;
}

export interface userlogin{
    userName:string;
    password:string;
}

 export interface loginResponse{
    token:string;
    refreshToken:string; 
    userRole:string;
 }

 export interface menu{
    code:string;
    name:string;
    
 }
 export interface ResetPassword{
    UserName:string;
    oldPassword:string;
    newPassword:string;
 }
 export interface UpdatePassword{
    UserName:string;
    Password:string;
    otpText:string;
 }
 export interface GetMenuPermissions{ 
    userrole:string;
    menucode:string;
    code: string;
    name: string;
    haveview: boolean;
    haveadd: boolean;
    haveedit: boolean;
    havedelete: boolean;
 }
 export interface users{
    username: string;
    name: string ;
    email: string;
    phone: string;
    isactive: boolean;
    statusname: string;
    role: string;
 }

 export interface roles{
   code:string;
   name:string;
   status:boolean;
 }
 export interface updateUser{
   username:string;
   role:string;
   status:boolean;
}
export interface menus{
   code:string;
   name:string;
   status:boolean;
 }
