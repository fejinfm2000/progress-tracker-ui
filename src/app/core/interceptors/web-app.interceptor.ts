import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';

import { Component, inject } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const webAppInterceptor: HttpInterceptorFn = (req, next) => {
  console.log("webAppInterceptor");
  let _snackBar = inject(MatSnackBar);

  let horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  let verticalPosition: MatSnackBarVerticalPosition = 'top';

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unknown error occurred!';
      console.log(error);

      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Client-side error: ${error.error.message}`;
      } else {
        // Server-side error
        errorMessage = `${error.error.message}`;
      }

      // Display error message using MatSnackBar
      _snackBar.open(errorMessage, 'Close', {
        horizontalPosition,
        verticalPosition,
        duration: 3000, // Snackbar will auto-close after 3 seconds
      });

      // Return an observable with an error
      return throwError(() => error);
    })
  );
};
