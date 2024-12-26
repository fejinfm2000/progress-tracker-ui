import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebTeamComponent } from './web-team.component';

describe('WebTeamComponent', () => {
  let component: WebTeamComponent;
  let fixture: ComponentFixture<WebTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WebTeamComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(WebTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
