// import { NO_ERRORS_SCHEMA } from '@angular/core';
// import { ComponentFixture, TestBed, async } from '@angular/core/testing';
//
// import { of } from 'rxjs';
//
// import { NavigationService, AuthService } from '@webui/core';
//
// import { NavigationComponent } from './navigation.component';
//
// describe('NavigationComponent', () => {
//   let comp: NavigationComponent;
//   let fixture: ComponentFixture<NavigationComponent>;
//
//   const mockNavigationService = {
//     getPages() {
//       return of([]);
//     },
//   };
//   const mockAuthService = {};
//
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [NavigationComponent],
//       providers: [
//         { provide: AuthService, useValue: mockAuthService },
//         { provide: NavigationService, useValue: mockNavigationService },
//       ],
//       schemas: [NO_ERRORS_SCHEMA],
//     })
//       .compileComponents()
//       .then(() => {
//         fixture = TestBed.createComponent(NavigationComponent);
//         comp = fixture.componentInstance;
//       });
//   }));
//
//   it('should be defined', () => {
//     expect(comp).toBeDefined();
//   });
//
//   describe('ngOnInit method', () => {
//     it('should call getUserInformation method', () => {
//       spyOn(comp, 'getUserInformation');
//       comp.ngOnInit();
//       expect(comp.getUserInformation).toHaveBeenCalled();
//     });
//   });
//
//   describe('ngAfterViewInit method', () => {
//     it('should get height of page header', () => {
//       comp.header = {
//         nativeElement: {
//           offsetHeight: 40,
//         },
//       };
//       comp.ngAfterViewInit();
//       expect(comp.headerHeight).toEqual(39);
//     });
//   });
//
//   describe('getUserInformation method', () => {
//     it('should update greeting property', () => {
//       comp.getUserInformation();
//       expect(comp.greeting).toEqual('Welcome, Anonymous User');
//     });
//
//     it('should udate user information', () => {
//       comp.user = <any>{
//         currentRole: {},
//         data: {
//           contact: {
//             __str__: 'Mr. Tom Smith',
//           },
//         },
//       };
//       spyOn(comp, 'checkCandidateRole');
//       comp.getUserInformation();
//       expect(comp.checkCandidateRole).toHaveBeenCalled();
//       expect(comp.greeting).toEqual(
//         `Welcome, ${comp.user.data.contact.__str__}`
//       );
//     });
//   });
//
//   describe('hideUserBlock', () => {
//     it('should hide user block', () => {
//       const event = {
//         preventDefault() {
//           return true;
//         },
//         stopPropagation() {
//           return true;
//         },
//       };
//       spyOn(event, 'preventDefault');
//       spyOn(event, 'stopPropagation');
//       comp.hideUserMenu = false;
//       comp.hideUserBlock(event);
//       expect(comp.isCollapsed).toBeFalsy();
//       expect(comp.hideUserMenu).toBeTruthy();
//       expect(event.preventDefault).toHaveBeenCalled();
//       expect(event.stopPropagation).toHaveBeenCalled();
//     });
//   });
//
//   describe('showNavigation', () => {
//     it('should show navigation', () => {
//       const event = {
//         preventDefault() {
//           return true;
//         },
//         stopPropagation() {
//           return true;
//         },
//       };
//       spyOn(event, 'preventDefault');
//       spyOn(event, 'stopPropagation');
//       comp.isCollapsed = true;
//       comp.showNavigation(event);
//       expect(comp.isCollapsed).toBeFalsy();
//       expect(comp.hideUserMenu).toBeTruthy();
//       expect(event.preventDefault).toHaveBeenCalled();
//       expect(event.stopPropagation).toHaveBeenCalled();
//     });
//   });
//
//   describe('handleClick method', () => {
//     it('should do not change proerty', () => {
//       const component = {};
//       const event = {
//         target: component,
//       };
//       comp.nav = {
//         nativeElement: component,
//       };
//       comp.isCollapsed = true;
//       comp.hideUserMenu = true;
//       comp.handleClick(event);
//       expect(comp.isCollapsed).toBeTruthy();
//       expect(comp.hideUserMenu).toBeTruthy();
//     });
//
//     it('should change isCollapsed property', () => {
//       const component = {};
//       const event = {
//         target: component,
//       };
//       comp.nav = {
//         nativeElement: {},
//       };
//       comp.isCollapsed = true;
//       comp.handleClick(event);
//       expect(comp.isCollapsed).toBeFalsy();
//     });
//
//     it('should change hideUserMenu property', () => {
//       const component = {};
//       const event = {
//         target: component,
//       };
//       comp.userBlock = {
//         nativeElement: {},
//       };
//       comp.hideUserMenu = false;
//       comp.handleClick(event);
//       expect(comp.hideUserMenu).toBeTruthy();
//     });
//   });
// });
