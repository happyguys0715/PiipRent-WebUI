// import { NO_ERRORS_SCHEMA } from '@angular/core';
// import { ComponentFixture, TestBed, inject, async } from '@angular/core/testing';
// import { Router, ActivatedRoute } from '@angular/router';

// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/throw';

// import { LoginService } from '../../services';
// import { LoginFormComponent } from './login-form.component';

// describe('LoginFormComponent', () => {

//   let comp: LoginFormComponent;
//   let fixture: ComponentFixture<LoginFormComponent>;
//   let content: string;
//   let response: any;
//   let metadata: any;

//   beforeEach(async(() => {

//     const mockLoginService = {
//       loginWithToken(token) {
//         if (response.status === 'error') {
//           return Observable.throw(response);
//         }
//         return Observable.of(response);
//       }
//     };

//     const mockRouter = {
//       navigate() {
//         return true;
//       }
//     };

//     const mockActivatedRoute = {
//       params: Observable.of({ token: 123 }),
//       queryParams: Observable.of({ type: 'extranet' }),
//       snapshot: {
//         data: {
//           setting: {}
//         }
//       }
//     };

//     TestBed.configureTestingModule({
//       declarations: [LoginFormComponent],
//       providers: [
//         { provide: Router, useValue: mockRouter },
//         { provide: ActivatedRoute, useValue: mockActivatedRoute },
//         { provide: LoginService, useValue: mockLoginService }
//       ],
//       schemas: [ NO_ERRORS_SCHEMA ]
//     })
//     .compileComponents()
//       .then(() => {
//         fixture = TestBed.createComponent(LoginFormComponent);
//         comp = fixture.componentInstance;
//       });
//   }));

//   it('should be defined', () => {
//     expect(comp).toBeDefined();
//   });

//   describe('ngOnInit method', () => {

//     it('should be defined', () => {
//       expect(comp.ngOnInit).toBeDefined();
//     });

//     it('should be call tokenAuth method', () => {
//       spyOn(comp, 'tokenAuth');
//       comp.ngOnInit();
//       expect(comp.tokenAuth).toHaveBeenCalled();
//     });

//   });

//   describe('tokenAuth method', () => {

//     it('should be defined', () => {
//       expect(comp.tokenAuth).toBeDefined();
//     });

//     it('should redirect user', async(inject([Router], (router: Router) => {
//       spyOn(router, 'navigate');
//       response = {
//         status: 'success',
//         data: {
//           redirect_to: '/'
//         }
//       };
//       comp.tokenAuth(5);
//       expect(router.navigate).toHaveBeenCalledWith([response.data.redirect_to]);
//     })));

//     it('should redirect to login page', inject([Router], (router: Router) => {
//       spyOn(router, 'navigate');
//       response = {
//         status: 'error',
//         errors: 'error message',
//       };
//       comp.tokenAuth(5);
//       expect(router.navigate).toHaveBeenCalledWith(['login']);
//     }));

//   });

//   describe('responseHandler method', () => {

//     it('should be defined', () => {
//       expect(comp.responseHandler).toBeDefined();
//     });

//     it('should redirect to "/"', async(inject([Router], (router: Router) => {
//       spyOn(router, 'navigate');
//       response = {
//         status: 'success',
//         data: 'user data'
//       };
//       comp.responseHandler(response);
//       expect(router.navigate).toHaveBeenCalledWith(['']);
//     })));

//     it('should update error property', () => {
//       comp.loginProcess = true;
//       response = {
//         status: 'success',
//       };
//       comp.responseHandler(response);
//       expect(comp.error).toEqual({});
//       expect(comp.loginProcess).toBeFalsy();
//     });

//   });

//   describe('formEvent method', () => {

//     it('should be defined', () => {
//       expect(comp.formEvent).toBeDefined();
//     });

//     it('should update loginProcess property', () => {
//       comp.loginProcess = false;
//       comp.formEvent({
//         type: 'saveStart'
//       });
//       expect(comp.loginProcess).toBeTruthy();
//     });

//   });

//   describe('errorHandler method', () => {

//     it('should be defined', () => {
//       expect(comp.errorHandler).toBeDefined();
//     });

//     it('should change loginProcess property', () => {
//       comp.loginProcess = true;
//       comp.errorHandler();
//       expect(comp.loginProcess).toBeFalsy();
//     });

//   });

//   describe('updateCheckbox method', () => {

//     it('should be defined', () => {
//       expect(comp.updateCheckbox).toBeDefined();
//     });

//     it('should update additional data', () => {
//       comp.additionalData = {
//         remember_me: false
//       };
//       comp.updateCheckbox(true);
//       expect(comp.additionalData.remember_me).toBeTruthy();
//     });

//   });

// });
