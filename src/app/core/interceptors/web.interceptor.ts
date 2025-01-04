import { HttpInterceptorFn } from '@angular/common/http';

export const webInterceptor: HttpInterceptorFn = (req, next) => {
  console.log("InterCeptor");

  const modifiedReq = req.clone({
    setHeaders: {
      Authorization: 'Bearer my-token', // Dynamically inject the token
    },
  });
  return next(modifiedReq);
};

