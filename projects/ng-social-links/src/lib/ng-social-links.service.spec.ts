import { TestBed } from '@angular/core/testing';

import { NgSocialLinksService } from './ng-social-links.service';

describe('NgSocialLinksService', () => {
  let service: NgSocialLinksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgSocialLinksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
