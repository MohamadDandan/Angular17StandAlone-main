import { HttpInterceptorFn } from '@angular/common/http';

export const httpinterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  let _token=localStorage.getItem('token');
  let jwtToken=req.clone({
    setHeaders:{
      Authorization: 'bearer ' + _token
    }
  })
  return next(jwtToken);
};
