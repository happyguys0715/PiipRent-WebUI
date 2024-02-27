// import { NO_ERRORS_SCHEMA } from '@angular/core';
// import { ComponentFixture, TestBed, async } from '@angular/core/testing';
// import { ActivatedRoute } from '@angular/router';
//
// import { of, BehaviorSubject } from 'rxjs';
//
// import {
//   PermissionsComponent,
//   Group,
//   User,
//   Permission,
// } from './permissions.component';
// import { PermissionsService } from './permissions.service';
// import { SettingsService } from './../settings.service';
//
// describe('PermissionsComponent', () => {
//   let comp: PermissionsComponent;
//   let fixture: ComponentFixture<PermissionsComponent>;
//   const response: any = {
//     data: {},
//   };
//
//   const mockPermissionsService = {
//     getAllGroups() {
//       return of(response.data);
//     },
//     getAllUsers() {
//       return of(response.data);
//     },
//     getPermissions() {
//       return of(response.data);
//     },
//     revokePermissionsOfTheUser() {
//       return of(response.data);
//     },
//     revokePermissionsOfTheGroup() {
//       return of(response.data);
//     },
//     addPermissionsOnTheUser() {
//       return of(response.data);
//     },
//     addPermissionsOnTheGroup() {
//       return of(response.data);
//     },
//     addUserOnTheGroup() {
//       return of(response.data);
//     },
//     removeUserOnTheGroup() {
//       return of(response.data);
//     },
//     createGroup() {
//       return of(response.data);
//     },
//     deleteGroup() {
//       return of(response.data);
//     },
//     getPermissionsOfUser() {
//       return of(response.data);
//     },
//     getAllPermissionsOfTheGroup() {
//       return of(response.data);
//     },
//     getAllPermissions() {
//       return of(response.data);
//     },
//     getGroupsOnTheUser() {
//       return of(response.data);
//     },
//   };
//
//   const mockUrl: any = [
//     {
//       path: 'permissions',
//     },
//   ];
//
//   const mockActivatedRoute = {
//     url: of(mockUrl),
//   };
//
//   const mockSettingsService = {
//     url: new BehaviorSubject(mockUrl),
//   };
//
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [PermissionsComponent],
//       providers: [
//         { provide: SettingsService, useValue: mockSettingsService },
//         { provide: ActivatedRoute, useValue: mockActivatedRoute },
//         { provide: PermissionsService, useValue: mockPermissionsService },
//       ],
//       schemas: [NO_ERRORS_SCHEMA],
//     })
//       .compileComponents()
//       .then(() => {
//         fixture = TestBed.createComponent(PermissionsComponent);
//         comp = fixture.componentInstance;
//       });
//   }));
//
//   describe('ngOnInit method', () => {
//     it('should call methods', () => {
//       spyOn(comp, 'getPermissions');
//       spyOn(comp, 'getGroups');
//       spyOn(comp, 'getUsers');
//       comp.ngOnInit();
//       expect(comp.getPermissions).toHaveBeenCalled();
//       expect(comp.getGroups).toHaveBeenCalled();
//       expect(comp.getUsers).toHaveBeenCalled();
//     });
//   });
//
//   describe('getGroups method', () => {
//     it('should get groups of company', () => {
//       response.data.results = [];
//       comp.getGroups();
//       expect(comp.cashGroups).toEqual(response.data.results);
//       expect(comp.groups).toEqual(response.data.results);
//     });
//   });
//
//   describe('getUsers method', () => {
//     it('should get users of company', () => {
//       response.data.user_list = [];
//       comp.getUsers();
//       expect(comp.cashUsers).toEqual(response.data.user_list);
//       expect(comp.users).toEqual(response.data.user_list);
//     });
//   });
//
//   describe('getPermissions method', () => {
//     it('should get permissions list', () => {
//       response.data.permission_list = [];
//       comp.getPermissions();
//       expect(comp.cashPermissions).toEqual(response.data.permission_list);
//       expect(comp.permissionsList).toEqual(response.data.permission_list);
//     });
//   });
//
//   describe('toggle method', () => {
//     it('should call getPermissionOf method', () => {
//       const type = 'list';
//       const element = 'user';
//       const item: User = {
//         id: '1',
//         name: 'Managers',
//       };
//       spyOn(comp, 'getPermissionsOf');
//       spyOn(comp, 'resetData');
//       spyOn(comp, 'getGroupsOfUser');
//       comp.toggle(type, element, item);
//       expect(comp.resetData).toHaveBeenCalledTimes(2);
//       expect(comp.getGroupsOfUser).toHaveBeenCalled();
//       expect(comp.getPermissionsOf).toHaveBeenCalled();
//       expect(comp.targetId).toEqual(item.id);
//     });
//
//     it('should call togglePermissions method', () => {
//       const type = 'permission';
//       const element = 'user';
//       const item: Permission = {
//         id: '1',
//         name: 'can activate',
//         codename: 'can_activate',
//       };
//       spyOn(comp, 'togglePermissions');
//       comp.toggle(type, element, item);
//       expect(comp.togglePermissions).toHaveBeenCalledWith(item, element);
//     });
//
//     it('should call toggleGroup method', () => {
//       const type = 'group';
//       const element = 'user';
//       const item: Group = {
//         id: '1',
//         name: 'Managers',
//       };
//       spyOn(comp, 'toggleGroup');
//       comp.toggle(type, element, item);
//       expect(comp.toggleGroup).toHaveBeenCalledWith(item);
//     });
//   });
//
//   describe('togglePermissions method', () => {
//     let permission: Permission;
//     beforeEach(() => {
//       permission = {
//         id: '1',
//         name: 'Can Activate',
//         codename: 'can_activate',
//       };
//     });
//
//     it('should revoke permission from user', () => {
//       const type = 'user';
//       permission.active = true;
//       comp.togglePermissions(permission, type);
//       expect(permission.active).toBeFalsy();
//     });
//
//     it('should revoke permission from group', () => {
//       const type = 'group';
//       permission.active = true;
//       comp.togglePermissions(permission, type);
//       expect(permission.active).toBeFalsy();
//     });
//
//     it('should add new permission for user', () => {
//       const type = 'user';
//       permission.active = false;
//       comp.togglePermissions(permission, type);
//       expect(permission.active).toBeTruthy();
//     });
//
//     it('should add new permission for group', () => {
//       const type = 'group';
//       permission.active = false;
//       comp.togglePermissions(permission, type);
//       expect(permission.active).toBeTruthy();
//     });
//   });
//
//   describe('toggleGroup method', () => {
//     it('should add a user to group', () => {
//       const group: Group = {
//         id: '1',
//         name: 'Managers',
//         active: false,
//       };
//       comp.toggleGroup(group);
//       expect(group.active).toBeTruthy();
//     });
//
//     it('should remove a user from group', () => {
//       const group: Group = {
//         id: '1',
//         name: 'Managers',
//         active: true,
//       };
//       comp.toggleGroup(group);
//       expect(group.active).toBeFalsy();
//     });
//   });
//
//   describe('addGroup method', () => {
//     it('should create new group', () => {
//       const name = 'Managers';
//       spyOn(comp, 'getGroups');
//       comp.addGroup(name);
//       expect(comp.name).toEqual('');
//       expect(comp.getGroups).toHaveBeenCalled();
//     });
//   });
//
//   describe('removeGroup method', () => {
//     it('should remove group', () => {
//       const group: Group = {
//         id: '1',
//         name: 'Managers',
//       };
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
//       comp.groups = [];
//       comp.cashGroups = [];
//       comp.groups.push(group);
//       comp.cashGroups.push(group);
//       comp.removeGroup(group, event);
//       expect(event.preventDefault).toHaveBeenCalled();
//       expect(event.stopPropagation).toHaveBeenCalled();
//       expect(comp.cashGroups.length).toEqual(0);
//       expect(comp.groups.length).toEqual(0);
//     });
//   });
//
//   describe('getPermissionsOf', () => {
//     it('should update permissions of user', () => {
//       const id = '1';
//       const type = 'user';
//       response.data.results = [];
//       comp.permissionsList = [];
//       spyOn(comp, 'combineElement');
//       comp.getPermissionsOf(id, type);
//       expect(comp.combineElement).toHaveBeenCalledWith(
//         response.data.results,
//         []
//       );
//     });
//
//     it('should update permissions of group', () => {
//       const id = '1';
//       const type = 'group';
//       response.data.results = [];
//       comp.permissionsList = [];
//       spyOn(comp, 'combineElement');
//       comp.getPermissionsOf(id, type);
//       expect(comp.combineElement).toHaveBeenCalledWith(
//         response.data.results,
//         []
//       );
//     });
//   });
//
//   describe('getGroupsOfUser', () => {
//     it('should update groups of user', () => {
//       const id = '1';
//       response.data.results = [];
//       comp.groups = [];
//       spyOn(comp, 'combineElement');
//       comp.getGroupsOfUser(id);
//       expect(comp.targetGroups).toEqual(response.data.results);
//       expect(comp.combineElement).toHaveBeenCalledWith(
//         response.data.results,
//         []
//       );
//     });
//   });
//
//   describe('combineElement method', () => {
//     it('should combine user permission with permission list', () => {
//       const data: Permission[] = [
//         {
//           id: '1',
//           name: 'Can set contact',
//           codename: 'can_set_contact',
//         },
//       ];
//       const permissionsList: Permission[] = [
//         {
//           id: '1',
//           name: 'Can set contact',
//           codename: 'can_set_contact',
//         },
//         {
//           id: '2',
//           name: 'Can get contacts',
//           codename: 'can_get_contatcs',
//         },
//       ];
//       comp.combineElement(data, permissionsList);
//       expect(permissionsList[0].active).toBeTruthy();
//     });
//   });
//
//   describe('beforeChange', () => {
//     it('should reset properties', () => {
//       comp.targetId = '2';
//       comp.permissionsList = [
//         {
//           id: '1',
//           name: 'Can activate',
//           codename: 'can_activate',
//         },
//       ];
//       comp.groups = [
//         {
//           id: '1',
//           name: 'Managers',
//         },
//       ];
//       comp.cashGroups = [].concat(comp.groups);
//       comp.cashPermissions = [].concat(comp.permissionsList);
//       spyOn(comp, 'resetData');
//       comp.beforeChange();
//       expect(comp.targetId).toBeUndefined();
//       expect(comp.search).toEqual({
//         list: '',
//         group: '',
//         permission: '',
//       });
//       expect(comp.permissionsList).toEqual(comp.cashPermissions);
//       expect(comp.groups).toEqual(comp.cashGroups);
//       expect(comp.targetPermissions).toEqual([]);
//       expect(comp.targetGroups).toEqual([]);
//       expect(comp.resetData).toHaveBeenCalledTimes(2);
//     });
//   });
//
//   describe('resetData method', () => {
//     it('should delete active property from objects', () => {
//       const array = [
//         {
//           active: true,
//         },
//       ];
//       comp.resetData(array);
//       expect(array[0].active).toBeUndefined();
//     });
//   });
// });
