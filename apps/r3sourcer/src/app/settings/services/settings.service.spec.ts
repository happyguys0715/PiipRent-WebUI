// import { async, inject, TestBed } from '@angular/core/testing';
//
// import { SettingsService } from './settings.service';
//
// describe('SettingsService', () => {
//   const url = [
//     {
//       path: 'permissions',
//     },
//   ];
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [SettingsService],
//       imports: [],
//     });
//   });
//
//   it('should be defined', async(
//     inject([SettingsService], (service) => {
//       expect(service).toBeDefined();
//     })
//   ));
//
//   it('should return url', async(
//     inject([SettingsService], (service: SettingsService) => {
//       service.url.subscribe((value: any) => {
//         expect(value).toEqual([]);
//       });
//     })
//   ));
//
//   it('should set new url', async(
//     inject([SettingsService], (service: SettingsService) => {
//       service.url = <any>url;
//       service.url.subscribe((value) => {
//         expect(value).toEqual(url);
//       });
//     })
//   ));
// });
