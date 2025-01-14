import { HttpInterceptorFn } from '@angular/common/http';
import { SpinnerService } from '../../services/spinner.service';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

export const webInterceptor: HttpInterceptorFn = (req, next) => {
  console.log("webInterceptor");
  const spinnerService = inject(SpinnerService);
  const modifiedReq = req.clone({
    setHeaders: {
      Authorization: 'Bearer my-token', // Dynamically inject the token
    },
  });

  spinnerService.show();

  return next(modifiedReq).pipe(
    finalize(() => {
      spinnerService.hide();
    })
  );
};

