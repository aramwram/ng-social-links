import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgSocialLinksComponent } from './ng-social-links.component';

describe('NgSocialLinksComponent', () => {
  let component: NgSocialLinksComponent;
  let fixture: ComponentFixture<NgSocialLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgSocialLinksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgSocialLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
