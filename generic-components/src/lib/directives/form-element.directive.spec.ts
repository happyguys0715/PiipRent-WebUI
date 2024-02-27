// import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
// import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
// import { TestBed, async, ComponentFixture } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
//
// import { FormElementDirective } from './form-element.directive';
// import { FormInputComponent } from '../components/form-input/form-input.component';
//
// @Component({
//   selector: 'container',
//   template: `<div formElement [config]="config" [group]="form"></div>`,
//   entryComponents: [FormInputComponent],
// })
// export class ContainerComponent implements OnInit {
//   public config = {
//     type: 'input',
//     key: 'test',
//     templateOptions: {
//       placeholder: 'test',
//       max: 2,
//       min: 2,
//       label: 'test',
//       type: 'text',
//       required: true,
//       description: 'test',
//     },
//   };
//   public form: FormGroup;
//
//   constructor(private fb: FormBuilder) {}
//
//   public ngOnInit() {
//     this.form = this.fb.group({});
//   }
// }
//
// describe('FormElementDirective', () => {
//   let fixture: ComponentFixture<ContainerComponent>;
//   let comp: ContainerComponent;
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [
//         FormElementDirective,
//         ContainerComponent,
//         FormInputComponent,
//       ],
//       providers: [],
//       imports: [ReactiveFormsModule],
//       schemas: [NO_ERRORS_SCHEMA],
//     });
//   });
//
//   beforeEach(async(() => {
//     TestBed.compileComponents().then(() => {
//       fixture = TestBed.createComponent(ContainerComponent);
//       comp = fixture.componentInstance;
//       fixture.detectChanges();
//     });
//   }));
//
//   it('should enter the assertion', () => {
//     const el = fixture.debugElement.query(By.directive(FormInputComponent));
//     expect(el.nativeElement.textContent).toContain('test');
//   });
// });
