import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { NotAuthorizedGuard } from './not-authorized-guard';
import { AuthService } from '../services';

class MockAuthService {
  _isAuthorized = false;

  get isAuthorized() {
    return this._isAuthorized;
  }

  set isAuthorized(value) {
    this._isAuthorized = value;
  }

  getRedirectUrl() {
    return '/';
  }
}

describe('NotAuthorizedGuard', () => {
  let guard: NotAuthorizedGuard;
  let router: Router;
  let authService: MockAuthService;

  const mockRouter = {
    navigate() {
      return true;
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NotAuthorizedGuard,
        { provide: Router, useValue: mockRouter },
        { provide: AuthService, useClass: MockAuthService },
      ],
      imports: [],
    });

    guard = TestBed.get(NotAuthorizedGuard);
    router = TestBed.get(Router);
    authService = TestBed.get(AuthService);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  describe('canActivate method', () => {
    it('should return true', () => {
      expect(guard.canActivate()).toBeTruthy();
    });

    it('should return false', () => {
      spyOn(router, 'navigate');
      authService.isAuthorized = true;

      expect(guard.canActivate()).toBeFalsy();
      expect(router.navigate).toHaveBeenCalledWith([
        authService.getRedirectUrl(),
      ]);
    });
  });
});
