import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VisitorService } from '../../../web/service/visitor.service';
import { AuthService } from '../../service/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: false,

  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnDestroy {
  signupForm: FormGroup;
  unSubscribe$ = new Subject();

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.signupForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      passwordHash: [null, Validators.required],
      termsAndConditionFlag: [false],
    });
  }

  onAccountCreation() {
    this.authService.addUser(this.signupForm.value).pipe(takeUntil(this.unSubscribe$)).subscribe(data => {
      this.router.navigate(['/auth/login'], { state: data })
    });
  }


  ngOnDestroy(): void {
    this.unSubscribe$.next(null);
    this.unSubscribe$.complete();
  }
}
