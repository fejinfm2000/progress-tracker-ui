import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebFeaturesComponent } from './web-features.component';

describe('WebFeaturesComponent', () => {
  let component: WebFeaturesComponent;
  let fixture: ComponentFixture<WebFeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WebFeaturesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
