import { HttpInterceptorFn } from '@angular/common/http';
import { SpinnerService } from '../../services/spinner.service';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

export const webInterceptor: HttpInterceptorFn = (req, next) => {
  console.log("webInterceptor");
  const spinnerService = inject(SpinnerService);
  const skipSpinner = req.headers.has('Skip-Spinner');

  const modifiedReq = req.clone({
    headers: req.headers.delete('Skip-Spinner'),
    setHeaders: {
      Authorization: 'Bearer my-token', // Dynamically inject the token
    },
  });
  if (!skipSpinner) {
    spinnerService.show();
  }

  return next(modifiedReq).pipe(
    finalize(() => {
      if (!skipSpinner) {
        spinnerService.hide();
      }
    })
  );
};

