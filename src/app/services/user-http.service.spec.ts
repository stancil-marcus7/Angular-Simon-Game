import { TestBed } from '@angular/core/testing';

import { UserHTTPService } from './user-http.service';

describe('UserService', () => {
  let service: UserHTTPService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserHTTPService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
