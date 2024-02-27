import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { User } from '@webui/data';

import { NavigationService } from './navigation.service';
import { UserService } from './user.service';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { ToastService } from './toast.service';
import { AuthService } from './auth.service';
import { ErrorsService } from './errors.service';

describe('UserService', () => {
  let service: UserService;
  let response;

  const user = {} as User;
  const mockRouter = {
    navigate() {
      return true;
    },
  };

  const mockNavigationService = {
    navigationList: [],
  };

  const mockAuthService = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        ToastService,
        ErrorsService,
        { provide: AuthService, useValue: mockAuthService },
        { provide: NavigationService, useValue: mockNavigationService },
        { provide: Router, useValue: mockRouter },
      ],
      imports: [
        HttpClientTestingModule,
        NgxWebstorageModule.forRoot({ prefix: 'web', separator: '.' }),
      ],
    });

    service = TestBed.get(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUserData method', () => {
    it('should return user data if first request', () => {
      response = user;
      service.getUserData().subscribe((userData: any) => {
        expect(userData).toEqual(response);
        expect(service.user).toEqual(response);
      });
    });

    it('should return user data if is not fisrt request', () => {
      service.user = <User>user;
      service.getUserData().subscribe((userData: any) => {
        expect(userData).toEqual(user);
      });
    });
  });

  // describe('logout method', () => {
  //   it('should delete information about user',
  //     async(inject([UserService, Router, NavigationService],
  //     (userService: UserService, router: Router, nav: NavigationService) => {
  //       response = {
  //         status: 'success',
  //         message: 'You are logged out'
  //       };
  //       userService.user = user;
  //       nav.navigationList = [];
  //       spyOn(router, 'navigate');
  //       userService.logout();
  //       expect(userService.user).toBeNull();
  //       expect(cookie.get('sessionid')).toBeUndefined();
  //       expect(router.navigate).toHaveBeenCalledWith(['/home']);
  //       expect(nav.navigationList).toBeNull();
  //   })));
  // });
});
