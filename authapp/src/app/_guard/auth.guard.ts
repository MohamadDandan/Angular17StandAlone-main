import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../_service/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  let router = inject(Router)
  let toaster = inject(ToastrService)
  let userService = inject(UserService)
  let menuName = '';

  if (route.url.length > 0) {
    menuName = route.url[0].path;
  }
  if (localStorage.getItem('username') != null) {
    let userRole = localStorage.getItem('userRole') as string;
    if(menuName!=''){
      userService.GetMenuPermissions(userRole, menuName)
      .subscribe(data => {
        console.log(data)
        if (data.haveview) {
         
          return true;}
        else {
          toaster.warning('UnAuthorized 55');
          router.navigateByUrl('');
          return false;
        }
      })
      return true;
    }else{
      return true
    }

  } else {
    toaster.warning('UnAuthorized');
    router.navigateByUrl('/login');
    return false;
  }
 
};
