import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { ConfirmotpComponent } from './component/confirmotp/confirmotp.component';
import { RegisterComponent } from './component/register/register.component';
import { CustomerComponent } from './component/customer/customer.component';
import { UserComponent } from './component/user/user.component';
import { ForgetpasswordComponent } from './component/forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './component/resetpassword/resetpassword.component';
import { UpdateComponent } from './component/update/update.component';
import { authGuard } from './_guard/auth.guard';
import { UserRoleComponent } from './component/user-role/user-role.component';
import { AddCustomerComponent } from './component/add-customer/add-customer.component';

export const routes: Routes = [
    {path: '', component:HomeComponent,canActivate: [authGuard]},
    {path:'customer', component: CustomerComponent,canActivate: [authGuard]},
    {path:'customer/add', component: AddCustomerComponent,canActivate: [authGuard]},
    {path:'customer/edit/:code', component: AddCustomerComponent,canActivate: [authGuard]},
    {path:'user', component: UserComponent,canActivate: [authGuard]},
    {path:'userrole', component: UserRoleComponent,canActivate: [authGuard]},

    
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path:'confirmotp', component: ConfirmotpComponent},
    {path:'forgetpassword', component: ForgetpasswordComponent},
    {path:'resetpassword', component: ResetpasswordComponent},
    {path:'update', component: UpdateComponent}
];
