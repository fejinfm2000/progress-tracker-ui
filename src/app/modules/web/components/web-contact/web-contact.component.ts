import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { VisitorService } from '../../service/visitor.service';
import { Subject, take, takeUntil } from 'rxjs';
import { IVisitor } from '../../models/visitor';

@Component({
  selector: 'app-web-contact',
  standalone: false,

  templateUrl: './web-contact.component.html',
  styleUrl: './web-contact.component.scss'
})
export class WebContactComponent implements OnInit, OnDestroy {
  contactForm: FormGroup;
  unSubscribe$ = new Subject();
  constructor(private fb: FormBuilder, private visitorService: VisitorService) {
    this.contactForm = this.fb.group({
      visitorName: ['', Validators.required],
      visitorEmail: ['', [Validators.required, Validators.email]],
      feedBackMessage: ['', Validators.required]
    });
  }

  ngOnInit(): void {

  }

  onSubmit() {
    this.visitorService.addVisitor(this.contactForm.value).pipe(takeUntil(this.unSubscribe$)).subscribe(data => {
      this.contactForm.reset();
      this.contactForm.markAsPristine();
    });
  }

  ngOnDestroy(): void {
    this.unSubscribe$.next(null);
    this.unSubscribe$.complete();
  }
}
