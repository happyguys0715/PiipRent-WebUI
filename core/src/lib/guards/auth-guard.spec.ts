import { async, inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AuthGuard } from './auth-guard';
import { AuthService } from '../services';

class MockAuthService {
  _isAuthorized = true;

  get isAuthorized() {
    return this._isAuthorized;
  }

  set isAuthorized(value) {
    this._isAuthorized = value;
  }
}

describe('AuthGuard', () => {
  let guard: AuthGuard;
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
        AuthGuard,
        { provide: Router, useValue: mockRouter },
        { provide: AuthService, useClass: MockAuthService },
      ],
      imports: [],
    });

    guard = TestBed.get(AuthGuard);
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
      authService.isAuthorized = false;
      spyOn(router, 'navigate');
      expect(guard.canActivate()).toBeFalsy();
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });
  });
});
