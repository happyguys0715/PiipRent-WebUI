// import { BrowserModule } from '@angular/platform-browser';
// import { APP_INITIALIZER, NgModule } from '@angular/core';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//
// import { AppComponent } from './app.component';
// import { RouterModule, NoPreloading } from '@angular/router';
//
// import {
//   FontAwesomeModule,
//   FaIconLibrary,
// } from '@fortawesome/angular-fontawesome';
// import {
//   faChevronLeft,
//   faChevronRight,
//   faCircle,
//   faCalendar,
//   faPlus,
//   faCheck,
//   faMinusCircle,
//   faTimes,
//   faMinus,
//   faList,
//   faTimesCircle,
//   faStar,
//   faPencilAlt,
//   faTrash,
//   faCheckCircle,
//   faEyeSlash,
//   faUpload,
//   faCamera,
//   faEllipsisV,
//   faSignInAlt,
//   faChevronDown,
//   faChevronUp,
//   faEye,
//   faSearch,
//   faCreditCard,
//   faMinusSquare,
//   faPlusSquare,
//   faFile,
//   faMapMarkerAlt,
//   faDownload,
//   faPrint,
//   faExternalLinkAlt,
//   faEnvelope,
//   faPlusCircle,
//   faRedo,
//   faExclamationCircle,
//   faSort,
//   faSortUp,
//   faSortDown,
//   faDotCircle,
//   faUser,
// } from '@fortawesome/free-solid-svg-icons';
// import { NgxWebstorageModule } from 'ngx-webstorage';
// import { HttpClientModule, HttpClient } from '@angular/common/http';
// import {
//   TranslateModule,
//   TranslateLoader,
//   MissingTranslationHandler,
// } from '@ngx-translate/core';
//
// import {
//   VerifyEmailComponent,
//   ToastComponent,
//   RedirectComponent,
//   LoginAsComponent,
// } from './components';
//
// import { routes } from './app.routing';
//
// import {
//   CoreModule,
//   JiraService,
//   SiteSettingsService,
//   UserService,
// } from '@webui/core';
// import { environment } from '../environments/environment';
// import { SettingsModule } from './settings/settings.module';
//
// import { MasterGuideModule } from './master-guide/master-guide.module';
// import { HttpLoaderFactory } from './translate.loader';
// import { MissingTranslationHelper } from './helpers/translate.helper';
// import { catchError, forkJoin, of, tap } from 'rxjs';
// import { DialogModule } from '@webui/dialog';
//
// @NgModule({
//   declarations: [
//     AppComponent,
//     VerifyEmailComponent,
//     RedirectComponent,
//     ToastComponent,
//     LoginAsComponent,
//   ],
//   imports: [
//     BrowserModule,
//     BrowserAnimationsModule,
//     RouterModule.forRoot(routes, {
//       useHash: false,
//       preloadingStrategy: NoPreloading,
//     }),
//     HttpClientModule,
//     FontAwesomeModule,
//     NgxWebstorageModule.forRoot({ prefix: 'web', separator: '.' }),
//     TranslateModule.forRoot({
//       defaultLanguage: 'en',
//       missingTranslationHandler: {
//         provide: MissingTranslationHandler,
//         useClass: MissingTranslationHelper,
//       },
//       loader: {
//         provide: TranslateLoader,
//         useFactory: HttpLoaderFactory,
//         deps: [HttpClient],
//       },
//     }),
//
//     CoreModule.forRoot(environment),
//     MasterGuideModule,
//     SettingsModule,
//     DialogModule,
//   ],
//   providers: [
//     {
//       provide: APP_INITIALIZER,
//       useFactory:
//         (
//           userSerice: UserService,
//           siteSettings: SiteSettingsService,
//           jiraService: JiraService
//         ) =>
//         () =>
//           forkJoin({
//             user: userSerice.getUserData(),
//             settings: siteSettings.resolve(),
//             jira: jiraService.init(),
//           }).pipe(
//             tap(({ user }) => jiraService.updateJira(user?.currentRole)),
//             catchError(() => of(false))
//           ),
//       deps: [UserService, SiteSettingsService, JiraService],
//       multi: true,
//     },
//   ],
//   bootstrap: [AppComponent],
// })
// export class AppModule {
//   constructor(library: FaIconLibrary) {
//     const icons = [
//       faChevronLeft,
//       faChevronRight,
//       faPlus,
//       faCircle,
//       faCheck,
//       faMinusCircle,
//       faTimes,
//       faMinus,
//       faList,
//       faTimesCircle,
//       faStar,
//       faMapMarkerAlt,
//       faPencilAlt,
//       faTrash,
//       faCheckCircle,
//       faEyeSlash,
//       faUpload,
//       faCamera,
//       faEllipsisV,
//       faSignInAlt,
//       faChevronDown,
//       faChevronUp,
//       faEye,
//       faSearch,
//       faCreditCard,
//       faMinusSquare,
//       faPlusSquare,
//       faFile,
//       faDownload,
//       faPrint,
//       faExternalLinkAlt,
//       faEnvelope,
//       faPlusCircle,
//       faRedo,
//       faExclamationCircle,
//       faSort,
//       faSortUp,
//       faSortDown,
//       faDotCircle,
//       faCalendar,
//       faUser,
//     ];
//
//     library.addIcons(...icons);
//   }
// }
