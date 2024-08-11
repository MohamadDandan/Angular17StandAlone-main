import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { httpinterceptorInterceptor } from './_service/httpinterceptor.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
     provideRouter(routes),
     provideAnimationsAsync(),
     provideHttpClient(withInterceptors([
      httpinterceptorInterceptor
     ])),
     provideToastr({closeButton: true})]
};
