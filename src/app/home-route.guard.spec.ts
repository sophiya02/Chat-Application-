import { TestBed } from '@angular/core/testing';

import { HomeRouteGuard } from './home-route.guard';

describe('HomeRouteGuard', () => {
  let guard: HomeRouteGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HomeRouteGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
