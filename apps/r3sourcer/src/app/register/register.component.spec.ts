// import { NO_ERRORS_SCHEMA } from '@angular/core';
// import { TestBed, async, ComponentFixture, inject } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
// import { DebugElement } from '@angular/core';

// import { ActivatedRoute, Router } from '@angular/router';

// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';

// import { RegistrationFormComponent } from './registration-form.component';

// describe('RegistrationFormComponent', () => {
//   let fixture: ComponentFixture<RegistrationFormComponent>;
//   let comp: RegistrationFormComponent;
//   let el;
//   let response: any;

//   const mockActivatedRoute = {
//     url: Observable.of([
//       {
//         path: 'registration'
//       },
//       {
//         path: 'password'
//       }
//     ])
//   };

//   const mockRouter = {
//     navigate() {
//       return true;
//     }
//   };

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [
//         RegistrationFormComponent
//       ],
//       providers: [
//         { provide: Router, useValue: mockRouter },
//         { provide: ActivatedRoute, useValue: mockActivatedRoute },
//       ],
//       schemas: [ NO_ERRORS_SCHEMA ],
//     });
//   });

//   beforeEach(async(() => {
//     TestBed.compileComponents().then(() => {
//       fixture = TestBed.createComponent(RegistrationFormComponent);
//       comp = fixture.componentInstance;
//     });
//   }));

// });
