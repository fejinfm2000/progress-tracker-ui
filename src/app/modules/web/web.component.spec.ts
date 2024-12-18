import { ComponentFixture, TestBed } from '@angular/core/testing';
import { webComponent } from './web.component';


describe('WebComponent', () => {
  let component: webComponent;
  let fixture: ComponentFixture<webComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [webComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(webComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
