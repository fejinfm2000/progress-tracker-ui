import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VisitorService } from '../../../web/service/visitor.service';

@Component({
  selector: 'app-log-in',
  standalone: false,

  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private visitorService: VisitorService) {
    this.loginForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }

  onLogin() {
    console.log(this.loginForm);
  }
}
