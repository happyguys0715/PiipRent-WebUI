// import { NO_ERRORS_SCHEMA } from '@angular/core';
// import {
//   TestBed,
//   async,
//   ComponentFixture,
//   inject,
// } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
// import { DebugElement } from '@angular/core';
// import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
//
// import { FormPictureComponent } from './form-picture.component';
// import { WebcamComponent } from 'webcam';
// import { FallbackDispatcher } from 'webcam';
//
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
//
// describe('FormPictureComponent', () => {
//   let fixture: ComponentFixture<FormPictureComponent>;
//   let comp: FormPictureComponent;
//   let el;
//   let config = {
//     type: 'picture',
//     key: 'name field',
//     read_only: false,
//     templateOptions: {
//       label: 'Picture',
//       label_upload: 'Choose a file',
//       label_photo: 'Take a photo',
//       type: 'file',
//       required: false,
//       description: 'help text',
//       file: true,
//       photo: false,
//     },
//   };
//   let errors = {};
//   let mime = 'image/jpeg';
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [FormPictureComponent, WebcamComponent],
//       providers: [FormBuilder],
//       imports: [ReactiveFormsModule, NgbModule.forRoot()],
//       schemas: [NO_ERRORS_SCHEMA],
//     });
//   });
//
//   beforeEach(async(() => {
//     TestBed.compileComponents().then(() => {
//       fixture = TestBed.createComponent(FormPictureComponent);
//       comp = fixture.componentInstance;
//     });
//   }));
//
//   describe('ngOnInit method', () => {
//     it('should call addControl method', async(
//       inject([FormBuilder], (fb: FormBuilder) => {
//         comp.config = Object.assign({}, config);
//         comp.key = comp.config.key;
//         spyOn(comp, 'addControl');
//         spyOn(comp, 'setInitValue');
//         spyOn(comp, 'checkModeProperty');
//         spyOn(comp, 'checkHiddenProperty');
//         spyOn(comp, 'createEvent');
//         comp.ngOnInit();
//         expect(comp.addControl).toHaveBeenCalledWith(comp.config, fb);
//         expect(comp.mime).toEqual('image/jpeg');
//         expect(comp.setInitValue).toHaveBeenCalled();
//         expect(comp.checkModeProperty).toHaveBeenCalled();
//         expect(comp.checkHiddenProperty).toHaveBeenCalled();
//         expect(comp.createEvent).toHaveBeenCalled();
//       })
//     ));
//   });
//
//   describe('checkHiddenProperty method', () => {
//     it('should call setInitValue method', async(
//       inject([FormBuilder], (fb: FormBuilder) => {
//         comp.config = Object.assign({}, config);
//         comp.key = comp.config.key;
//         comp.group = fb.group({});
//         comp.group.addControl(comp.key, fb.control(''));
//         spyOn(comp, 'setInitValue');
//         comp.config.hidden = new BehaviorSubject(true);
//         comp.checkHiddenProperty();
//         expect(comp.config.hide).toBeTruthy();
//         expect(comp.group.get(comp.key).value).toBeUndefined();
//         expect(comp.setInitValue).toHaveBeenCalled();
//       })
//     ));
//
//     it('should set hide false value', () => {
//       comp.config = Object.assign({}, config);
//       comp.config.hidden = new BehaviorSubject(false);
//       comp.checkHiddenProperty();
//       expect(comp.config.hide).toBeFalsy();
//     });
//   });
//
//   describe('checkModeProperty method', () => {
//     it('should set viewMode true value', () => {
//       comp.config = Object.assign({}, config);
//       comp.config.mode = new BehaviorSubject('view');
//       spyOn(comp, 'setInitValue');
//       comp.checkModeProperty();
//       expect(comp.viewMode).toBeTruthy();
//     });
//
//     it('should set viewMode false value', () => {
//       comp.config = Object.assign({}, config);
//       comp.config.mode = new BehaviorSubject('edit');
//       comp.config.read_only = false;
//       spyOn(comp, 'setInitValue');
//       comp.checkModeProperty();
//       expect(comp.viewMode).toBeFalsy();
//     });
//   });
//
//   describe('setInitValue method', () => {
//     it('should set default value', async(
//       inject([FormBuilder], (fb: FormBuilder) => {
//         comp.group = fb.group({});
//         comp.config = Object.assign({}, config);
//         comp.key = config.key;
//         comp.group.addControl(comp.key, fb.control(''));
//         comp.config.default = 'logo.png';
//         comp.setInitValue();
//         expect(comp.group.get(comp.key).value).toBeUndefined();
//         expect(comp.value).toEqual('ecore/media/logo.png');
//       })
//     ));
//
//     it('should set value from api by Object value', async(
//       inject([FormBuilder], (fb: FormBuilder) => {
//         comp.group = fb.group({});
//         comp.config = Object.assign({}, config);
//         comp.key = config.key;
//         comp.group.addControl(comp.key, fb.control(''));
//         comp.config.value = {
//           origin: 'logo.png',
//         };
//         comp.setInitValue();
//         expect(comp.group.get(comp.key).value).toBeUndefined();
//         expect(comp.value).toEqual('logo.png');
//       })
//     ));
//
//     it('should set value from api by string value', async(
//       inject([FormBuilder], (fb: FormBuilder) => {
//         comp.group = fb.group({});
//         comp.config = Object.assign({}, config);
//         comp.key = config.key;
//         comp.group.addControl(comp.key, fb.control(''));
//         comp.config.value = 'logo.png';
//         comp.setInitValue();
//         expect(comp.group.get(comp.key).value).toBeUndefined();
//         expect(comp.value).toEqual('logo.png');
//       })
//     ));
//
//     it('should set pdf value from api by string value', async(
//       inject([FormBuilder], (fb: FormBuilder) => {
//         comp.group = fb.group({});
//         comp.config = Object.assign({}, config);
//         comp.key = config.key;
//         comp.group.addControl(comp.key, fb.control(''));
//         comp.config.value = '1202.pdf';
//         comp.setInitValue();
//         expect(comp.group.get(comp.key).value).toBeUndefined();
//         expect(comp.link).toEqual('1202.pdf');
//       })
//     ));
//   });
//
//   describe('ngAfterViewInit method', () => {
//     it('should call addFlag method', () => {
//       comp.config = config;
//       comp.picture = {};
//       spyOn(comp, 'addFlags');
//       comp.ngAfterViewInit();
//       expect(comp.addFlags).toHaveBeenCalledWith(comp.picture, comp.config);
//     });
//   });
//
//   describe('upload method', () => {
//     it('should upload file from system', async(
//       inject([FormBuilder], (fb: FormBuilder) => {
//         comp.config = config;
//         comp.picture = {
//           nativeElement: {
//             click() {
//               return true;
//             },
//           },
//         };
//         comp.modal = {};
//         spyOn(comp.picture.nativeElement, 'click');
//         comp.upload();
//         expect(comp.picture.nativeElement.click).toHaveBeenCalled();
//       })
//     ));
//   });
//
//   describe('open method', () => {
//     it('should open modal window for take a photo', () => {
//       comp.config = config;
//       comp.modal = {};
//       comp.photoExist = true;
//       spyOn(comp.modalService, 'open');
//       comp.open();
//       expect(comp.modalService.open).toHaveBeenCalledWith(comp.modal, {
//         size: 'lg',
//       });
//       expect(comp.photoExist).toBeFalsy();
//     });
//   });
//
//   describe('onSuccess method', () => {
//     it('should call onFallback method', () => {
//       comp.config = config;
//       let stream = new FallbackDispatcher({
//         capture() {
//           return true;
//         },
//         save() {
//           return true;
//         },
//         setCamera() {
//           return true;
//         },
//         getCameraList() {
//           return true;
//         },
//         width: 320,
//         height: 240,
//       });
//       spyOn(comp, 'onFallback');
//       comp.onSuccess(stream);
//       expect(comp.flashPlayer).toEqual(stream);
//       expect(comp.onFallback).toHaveBeenCalled();
//     });
//   });
//
//   describe('onError method', () => {
//     it('should call onFallback method', () => {
//       comp.config = config;
//       let error = 'some error';
//       comp.onError(error);
//       expect(comp.err).toEqual(error);
//     });
//   });
//
//   describe('getPhoto method', () => {
//     it('should convert image into base64', () => {
//       comp.config = config;
//       comp.mime = mime;
//       spyOn(comp, 'createPhoto').and.returnValue({
//         toDataURL(type) {
//           return 'some base64';
//         },
//       });
//       comp.getPhoto();
//       expect(comp.base64).toEqual('some base64');
//     });
//   });
//
//   describe('save method', () => {
//     it('should save image from webcam', () => {
//       comp.config = config;
//       comp.base64 = 'base64';
//       let test = {
//         closeModal() {
//           return true;
//         },
//       };
//       spyOn(test, 'closeModal');
//       spyOn(comp, 'updateValue');
//       comp.save(test.closeModal);
//       expect(comp.updateValue).toHaveBeenCalledWith(
//         'image.jpeg',
//         'base64',
//         true
//       );
//       expect(test.closeModal).toHaveBeenCalled();
//     });
//   });
//
//   describe('createPhoto method', () => {
//     it('should get photo from webcam', () => {
//       comp.config = config;
//       comp.photoExist = false;
//       document.getElementsByTagName = (name): any => {
//         let array = [];
//         array.push(document.createElement(name));
//         return array;
//       };
//       let result = comp.createPhoto();
//       expect(comp.photoExist).toBeTruthy();
//       expect(result).toBeDefined();
//     });
//
//     it('should get photo from webcam with flash', () => {
//       comp.config = config;
//       comp.photoExist = false;
//       comp.flashPlayer = {
//         capture() {
//           return true;
//         },
//       };
//       document.getElementsByTagName = (name): any => {
//         return '';
//       };
//       spyOn(comp.flashPlayer, 'capture');
//       comp.createPhoto();
//       expect(comp.photoExist).toBeTruthy();
//       expect(comp.flashPlayer.capture).toHaveBeenCalled();
//     });
//   });
//
//   describe('fileChangeEvent method', () => {
//     it('should update value by file', () => {
//       comp.config = config;
//       let event = {
//         target: {
//           files: [
//             {
//               name: 'index.html',
//               type: 'text/html',
//             },
//           ],
//         },
//       };
//       FileReader.prototype.readAsDataURL = () => {
//         this.result = 'some result';
//       };
//       spyOn(comp, 'updateValue');
//       comp.fileChangeEvent(event);
//       expect(comp.updateValue).toHaveBeenCalled();
//     });
//   });
//
//   describe('updateValue method', () => {
//     it('should update value', inject([FormBuilder], (fb: FormBuilder) => {
//       comp.config = config;
//       comp.key = 'picture';
//       comp.group = fb.group({});
//       comp.group.addControl(comp.key, fb.control(''));
//       let name = 'image.jpeg';
//       let value = 'some string';
//       comp.updateValue(name, value);
//       expect(comp.fileName).toEqual(name);
//       expect(comp.group.get(comp.key).value).toEqual(value);
//     }));
//
//     it('should update value', inject([FormBuilder], (fb: FormBuilder) => {
//       comp.config = config;
//       comp.key = 'picture';
//       comp.group = fb.group({});
//       comp.group.addControl(comp.key, fb.control(''));
//       let name = 'logo.jpeg';
//       let value = 'some string';
//       spyOn(comp.event, 'emit');
//       comp.updateValue(name, value, true);
//       expect(comp.fileName).toEqual(name);
//       expect(comp.group.get(comp.key).value).toEqual(value);
//       expect(comp.event.emit).toHaveBeenCalled();
//     }));
//   });
// });
