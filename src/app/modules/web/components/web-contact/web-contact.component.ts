import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-web-contact',
  standalone: false,

  templateUrl: './web-contact.component.html',
  styleUrl: './web-contact.component.scss'
})
export class WebContactComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
      console.log('Form Submitted', this.contactForm.value);
  }
}
