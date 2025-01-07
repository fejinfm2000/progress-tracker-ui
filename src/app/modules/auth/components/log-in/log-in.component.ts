import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VisitorService } from '../../../web/service/visitor.service';
import { AuthService } from '../../service/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  standalone: false,

  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent implements OnDestroy {
  loginForm: FormGroup;
  unSubscribe$ = new Subject();

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {

    this.loginForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      passwordHash: [null, Validators.required],
    });
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.loginForm.patchValue(navigation.extras.state);
    }
  }

  onLogin() {
    sessionStorage.setItem('user', JSON.stringify(this.loginForm.value));
    this.router.navigate(['/webApp']);
  }

  ngOnDestroy(): void {
    this.unSubscribe$.next(null);
    this.unSubscribe$.complete();
  }
}
