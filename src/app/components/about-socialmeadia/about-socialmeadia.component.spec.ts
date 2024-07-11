import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutSocialmeadiaComponent } from './about-socialmeadia.component';

describe('AboutSocialmeadiaComponent', () => {
  let component: AboutSocialmeadiaComponent;
  let fixture: ComponentFixture<AboutSocialmeadiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutSocialmeadiaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AboutSocialmeadiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
