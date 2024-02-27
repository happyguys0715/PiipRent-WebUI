// import { NO_ERRORS_SCHEMA } from '@angular/core';
// import { By } from '@angular/platform-browser';
// import { DebugElement } from '@angular/core';
// import {
//   TestBed,
//   async,
//   ComponentFixture,
//   inject,
// } from '@angular/core/testing';
//
// import { ReactiveFormsModule, FormBuilder, FormsModule } from '@angular/forms';
// import { FormRuleComponent } from './form-rule.component';
//
// describe('FormRuleComponent', () => {
//   let fixture: ComponentFixture<FormRuleComponent>;
//   let comp: FormRuleComponent;
//   let el;
//   let config = {
//     type: 'rule',
//     key: 'rules',
//     read_only: false,
//     templateOptions: {
//       label: 'Rules',
//       required: true,
//       description: 'help text',
//     },
//     activeMetadata: [
//       {
//         value: 'some value',
//       },
//     ],
//   };
//   let errors = {};
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [FormRuleComponent],
//       providers: [FormBuilder],
//       imports: [ReactiveFormsModule, NgbModule.forRoot(), FormsModule],
//       schemas: [NO_ERRORS_SCHEMA],
//     });
//   });
//
//   beforeEach(async(() => {
//     TestBed.compileComponents().then(() => {
//       fixture = TestBed.createComponent(FormRuleComponent);
//       comp = fixture.componentInstance;
//     });
//   }));
//
//   it('should be defined', () => {
//     expect(comp).toBeDefined();
//   });
//
//   describe('ngOnInit method', () => {
//     it('should add control', async(
//       inject([FormBuilder], (fb: FormBuilder) => {
//         comp.config = config;
//         comp.group = fb.group({});
//         comp.group.addControl(comp.config.key, fb.control(''));
//         comp.ngOnInit();
//         expect(comp.view).toEqual([]);
//         expect(comp.id).toEqual(0);
//         expect(comp.ruleArray).toEqual([]);
//         expect(comp.previewRule).toEqual([]);
//         expect(comp.data).toEqual(<any>{});
//         expect(comp.group.get(comp.config.key).value).toBeNull();
//         expect(comp.config.activeMetadata[0].value).toBeNull();
//       })
//     ));
//
//     it('should set value', async(
//       inject([FormBuilder], (fb: FormBuilder) => {
//         comp.config = config;
//         comp.config.value = {
//           active: [20],
//           required_states: [10],
//         };
//         comp.group = fb.group({});
//         comp.group.addControl(config.key, fb.control(''));
//         comp.key = config.key;
//         spyOn(comp, 'addControl');
//         spyOn(comp, 'generateView');
//         comp.ngOnInit();
//         expect(comp.data).toEqual(comp.config.value);
//         expect(comp.group.get(config.key).value).toEqual(comp.config.value);
//         expect(comp.generateView).toHaveBeenCalledWith(comp.data);
//       })
//     ));
//   });
//
//   describe('ngOnDestroy method', () => {
//     it('should close modal window', () => {
//       comp.modalRef = {
//         close() {
//           return true;
//         },
//       };
//       spyOn(comp.modalRef, 'close');
//       comp.ngOnDestroy();
//       expect(comp.modalRef.close).toHaveBeenCalled();
//     });
//   });
//
//   describe('addNewRule method', () => {
//     it('should add control if first element', async () => {
//       comp.config = config;
//       comp.id = 0;
//       comp.view = [];
//       comp.addNewRule();
//       expect(comp.id).toEqual(1);
//       expect(comp.view.length).toEqual(1);
//     });
//
//     it('should add control if rule complete', async () => {
//       comp.config = config;
//       comp.id = 1;
//       comp.view = [
//         {
//           id: 1,
//           operator: 'or',
//           type: 'state',
//           values: ['10', '20', '30'],
//         },
//       ];
//       comp.addNewRule();
//       expect(comp.id).toEqual(2);
//       expect(comp.view.length).toEqual(2);
//     });
//   });
//
//   describe('open method', () => {
//     it('should open modal window whith new type', async () => {
//       let window = {};
//       let type = undefined;
//       let rule = {
//         id: 1,
//         operator: 'or',
//         values: [],
//       };
//       comp.config = config;
//       comp.id = 0;
//       comp.open(window, type, rule);
//       expect(comp.addType).toEqual('new');
//       expect(comp.editRule).toEqual(rule);
//       expect(comp.choice).toEqual('');
//       expect(comp.editValue).toEqual('');
//       expect(comp.app).toEqual('');
//       expect(comp.model).toEqual('');
//       expect(comp.config.model).toBeNull();
//       expect(comp.config.function).toBeNull();
//       expect(comp.modelsArray).toBeNull();
//       expect(comp.functionsArray).toBeNull();
//       expect(comp.editIndex).toBeNull();
//     });
//
//     it('should open modal with "state" type', async () => {
//       let window = {};
//       let type = 'state';
//       let rule = {
//         id: 2,
//         type: 'state',
//         operator: 'or',
//         values: [10],
//       };
//       comp.config = config;
//       comp.id = 1;
//       spyOn(comp, 'prepareRuleArray').and.returnValue(['#1']);
//       comp.open(window, type, rule);
//       expect(comp.addType).toEqual(type);
//       expect(comp.editRule).toEqual(rule);
//       expect(comp.choice).toEqual(type);
//       expect(comp.app).toEqual('');
//       expect(comp.model).toEqual('');
//       expect(comp.config.model).toBeNull();
//       expect(comp.config.function).toBeNull();
//       expect(comp.modelsArray).toBeNull();
//       expect(comp.functionsArray).toBeNull();
//       expect(comp.prepareRuleArray).toHaveBeenCalledWith(type, rule.id);
//       expect(comp.ruleArray).toEqual(['#1']);
//     });
//
//     it('should open modal with "function" type for edit', async () => {
//       let window = {};
//       let type = 'function';
//       let rule = {
//         id: 2,
//         type: 'function',
//         operator: 'or',
//         values: ['some function'],
//       };
//       comp.config = config;
//       comp.id = 1;
//       spyOn(comp, 'prepareRuleArray').and.returnValue(['#1']);
//       comp.open(window, type, rule, 0);
//       expect(comp.addType).toEqual(type);
//       expect(comp.editRule).toEqual(rule);
//       expect(comp.choice).toEqual(type);
//       expect(comp.editIndex).toEqual(0);
//       expect(comp.editValue).toEqual('some function');
//       expect(comp.app).toEqual('');
//       expect(comp.model).toEqual('');
//       expect(comp.config.model).toBeNull();
//       expect(comp.config.function).toBeNull();
//       expect(comp.modelsArray).toBeNull();
//       expect(comp.functionsArray).toBeNull();
//       expect(comp.prepareRuleArray).toHaveBeenCalledWith(type, rule.id);
//       expect(comp.ruleArray).toEqual(['#1']);
//     });
//   });
//
//   describe('done method', () => {
//     it('should close modal and add new element into a rule', async () => {
//       let type = 'state';
//       let rule = {
//         id: 1,
//         type: undefined,
//         operator: 'or',
//         values: [],
//       };
//       let test = {
//         closeWindow() {
//           return true;
//         },
//       };
//       comp.config = config;
//       comp.editRule = rule;
//       comp.view = [rule];
//       comp.elementValue = '20';
//       spyOn(test, 'closeWindow');
//       spyOn(comp, 'reset');
//       spyOn(comp, 'generateData');
//       comp.done(test.closeWindow, type);
//       expect(rule.type).toEqual(type);
//       expect(rule.values).toEqual(['20']);
//       expect(test.closeWindow).toHaveBeenCalled();
//       expect(comp.reset).toHaveBeenCalled();
//       expect(comp.generateArray).toHaveBeenCalledWith(comp.view);
//     });
//
//     it('should close modal and set new value for edit element', async () => {
//       let type = 'rule';
//       let rule = {
//         id: 2,
//         type: 'state',
//         operator: 'or',
//         values: ['10', '20'],
//       };
//       let test = {
//         closeWindow() {
//           return true;
//         },
//       };
//       comp.config = config;
//       comp.editRule = rule;
//       comp.editIndex = 1;
//       comp.view = [rule];
//       comp.elementValue = '#1';
//       spyOn(test, 'closeWindow');
//       spyOn(comp, 'reset');
//       spyOn(comp, 'generateData');
//       comp.done(test.closeWindow, type);
//       expect(rule.values).toEqual(['10', '#1']);
//       expect(test.closeWindow).toHaveBeenCalled();
//       expect(comp.reset).toHaveBeenCalled();
//       expect(comp.generateArray).toHaveBeenCalledWith(comp.view);
//     });
//   });
//
//   describe('delete method', () => {
//     it('should close modal window and delete element from a rule', async () => {
//       let rule = {
//         id: 2,
//         type: 'state',
//         operator: 'or',
//         values: ['10'],
//       };
//       let test = {
//         closeWindow() {
//           return true;
//         },
//       };
//       comp.config = config;
//       comp.editRule = rule;
//       comp.editIndex = 0;
//       comp.elementValue = '#1';
//       spyOn(test, 'closeWindow');
//       spyOn(comp, 'reset');
//       comp.delete(test.closeWindow);
//       expect(rule.values).toEqual([]);
//       expect(rule.type).toBeNull();
//       expect(test.closeWindow).toHaveBeenCalled();
//       expect(comp.reset).toHaveBeenCalled();
//     });
//   });
//
//   describe('reset method', () => {
//     it('should close modal window and delete element from a rule', async () => {
//       let rule = {
//         id: 2,
//         type: 'state',
//         operator: 'or',
//         values: ['10'],
//       };
//       comp.config = config;
//       comp.editRule = rule;
//       comp.ruleArray = ['#1'];
//       comp.choice = 'state';
//       comp.editIndex = 0;
//       comp.reset();
//       expect(comp.editIndex).toBeNull();
//       expect(comp.editRule).toBeNull();
//       expect(comp.ruleArray).toEqual([]);
//       expect(comp.choice).toEqual('');
//     });
//   });
//
//   describe('prepareRuleArray method', () => {
//     it('should generate array of rules', async () => {
//       let view = [
//         {
//           id: 1,
//           type: 'state',
//           operator: 'or',
//           values: ['10'],
//         },
//         {
//           id: 2,
//           type: 'state',
//           operator: 'and',
//           values: ['20'],
//         },
//       ];
//       comp.config = config;
//       comp.view = view;
//       let type = 'state';
//       let id = 2;
//       let result = comp.prepareRuleArray(type, id);
//       expect(result).toEqual([{ id: 1, name: '#1' }]);
//     });
//   });
//
//   describe('showPreview method', () => {
//     it('should generate data for preview', async () => {
//       let view = [
//         {
//           id: 1,
//           type: 'state',
//           operator: 'or',
//           values: ['10', '20'],
//         },
//         {
//           id: 2,
//           type: 'function',
//           operator: 'and',
//           values: ['function', 'some function'],
//         },
//       ];
//       comp.config = config;
//       comp.view = view;
//       comp.showPreview();
//       expect(comp.previewRule).toEqual([
//         {
//           label: 'State',
//           value: '( "10" or "20" )',
//         },
//         {
//           label: 'Function',
//           value: '( "function" and "some function" )',
//         },
//       ]);
//     });
//   });
//
//   describe('parseValue method', () => {
//     it('should parse view and return data of a rules for state', async () => {
//       let view = [
//         {
//           id: 1,
//           type: 'state',
//           operator: 'or',
//           values: ['New', 'Active'],
//         },
//         {
//           id: 2,
//           type: 'state',
//           operator: 'and',
//           values: ['Approved', '#1'],
//         },
//       ];
//       comp.config = config;
//       comp.config.options = [
//         {
//           name_before_activation: 'New',
//           number: 10,
//         },
//         {
//           name_before_activation: 'Active',
//           number: 20,
//         },
//         {
//           name_before_activation: 'Approved',
//           number: 30,
//         },
//       ];
//       comp.view = view;
//       let result = comp.parseValue(view[1]);
//       expect(result).toEqual(['and', 30, ['or', 10, 20]]);
//     });
//
//     it('should parse view and return data of a rules for function', async () => {
//       let view = [
//         {
//           id: 1,
//           type: 'function',
//           operator: 'or',
//           values: ['some function'],
//         },
//       ];
//       comp.config = config;
//       comp.view = view;
//       let result = comp.parseValue(view[0]);
//       expect(result).toEqual(['some function']);
//     });
//   });
//
//   describe('generateStringOfValues method', () => {
//     it('should generate stirng for preview', async () => {
//       let rule = ['and', 10, ['or', 20, 30]];
//       comp.config = config;
//       comp.config.options = [
//         {
//           name_before_activation: 'New',
//           number: 10,
//         },
//         {
//           name_before_activation: 'Active',
//           number: 20,
//         },
//         {
//           name_before_activation: 'Approved',
//           number: 30,
//         },
//       ];
//       let result = comp.generateStringOfValues(rule, 'state');
//       expect(result).toEqual('( "New" and ( "Active" or "Approved" ) )');
//     });
//
//     it('should generate stirng for preview without operator', async () => {
//       let rule = ['10'];
//       comp.config = config;
//       comp.config.options = [
//         {
//           name_before_activation: 'New',
//           number: 10,
//         },
//       ];
//       let result = comp.generateStringOfValues(rule, 'state');
//       expect(result).toEqual('( "New" )');
//     });
//   });
//
//   describe('generateArray method', () => {
//     it('should generate array of options', async () => {
//       let type = 'options';
//       comp.config = config;
//       comp.config.options = [
//         {
//           name_before_activation: 'New',
//           number: 10,
//         },
//         {
//           name_before_activation: 'Active',
//           number: 20,
//         },
//       ];
//       comp.editRule = {
//         values: ['and', 'New'],
//       };
//       comp.generateArray('options');
//       expect(comp.statesArray).toEqual([
//         {
//           name_before_activation: 'Active',
//           number: 20,
//         },
//       ]);
//     });
//
//     it('should generate array of functions', async () => {
//       let type = 'function';
//       comp.config = config;
//       comp.config.function = ['some function', 'function'];
//       comp.editRule = {
//         values: ['and', 'some function'],
//       };
//       comp.generateArray('function');
//       expect(comp.functionsArray).toEqual(['function']);
//     });
//
//     it('should generate array of app', async () => {
//       let type = 'model';
//       comp.config = config;
//       comp.config.model = ['companyrel', 'company'];
//       comp.generateArray('model');
//       expect(comp.modelsArray).toEqual(comp.config.model);
//     });
//   });
//
//   describe('getRelatedData method', () => {
//     it('should emit event for model type', async () => {
//       let type = 'model';
//       comp.config = config;
//       comp.config.model = [];
//       comp.config.function = [];
//       comp.elementValue = 'some function';
//       comp.app = 'endless_core';
//       let result = {
//         type: 'change',
//         el: {
//           endpoint: '/models/',
//           type: 'rule',
//           related: {
//             field: 'rules',
//             param: 'app',
//             query: `?app_name=`,
//             prop: type,
//           },
//         },
//         value: [{ app: comp.app }],
//       };
//       spyOn(comp.event, 'emit');
//       comp.getRelatedData(type);
//       expect(comp.model).toBeNull();
//       expect(comp.elementValue).toBeNull();
//       expect(comp.config.model).toBeUndefined();
//       expect(comp.config.function).toBeUndefined();
//       expect(comp.event.emit).toHaveBeenCalledWith(result);
//     });
//
//     it('should emit event for function type', async () => {
//       let type = 'function';
//       comp.config = config;
//       comp.config.function = [];
//       comp.elementValue = 'some function';
//       comp.app = 'endless_core';
//       comp.model = 'company';
//       let result = {
//         type: 'change',
//         el: {
//           endpoint: '/functions/',
//           type: 'rule',
//           related: {
//             field: 'rules',
//             param: 'model',
//             query: `?app_name=${comp.app}&model_name=`,
//             prop: type,
//           },
//         },
//         value: [{ model: comp.model }],
//       };
//       spyOn(comp.event, 'emit');
//       comp.getRelatedData(type);
//       expect(comp.elementValue).toBeNull();
//       expect(comp.config.function).toBeUndefined();
//       expect(comp.event.emit).toHaveBeenCalledWith(result);
//     });
//   });
//
//   describe('generateData method', () => {
//     it('should generate data for backend', async () => {
//       let view = [
//         {
//           id: 1,
//           type: 'state',
//           operator: 'or',
//           values: ['10', '20'],
//         },
//         {
//           id: 2,
//           type: 'function',
//           operator: 'and',
//           values: ['function', 'some function'],
//         },
//       ];
//       comp.config = config;
//       comp.view = view;
//       comp.data = {
//         active: undefined,
//         required_states: undefined,
//         required_functions: undefined,
//       };
//       comp.generateData(comp.view);
//       expect(comp.data).toEqual({
//         active: undefined,
//         required_states: ['or', '10', '20'],
//         required_functions: ['and', 'function', 'some function'],
//       });
//     });
//   });
//
//   describe('changeActiveStates method', () => {
//     it('should update active states', async () => {
//       let event = {
//         list: [{ number: 10 }, { number: 20 }],
//       };
//       comp.data = {
//         active: undefined,
//         required_states: undefined,
//         required_functions: undefined,
//       };
//       comp.view = [];
//       spyOn(comp, 'generateData');
//       comp.changeActiveStates(event);
//       expect(comp.data.active).toEqual([10, 20]);
//       expect(comp.generateData).toHaveBeenCalledWith(comp.view);
//     });
//   });
//
//   describe('generateView method', () => {
//     it('should call generateDataForView method', async () => {
//       let data = {
//         active: [40],
//         required_states: ['or', 30, ['and', 10, 20]],
//         required_functions: [
//           'or',
//           'function1',
//           ['and', 'function1', 'functiob2'],
//         ],
//       };
//       comp.config.activeMetadata = [{}];
//       spyOn(comp, 'generateDataForView');
//       comp.generateView(data);
//       expect(comp.config.activeMetadata[0].value).toEqual([40]);
//       expect(comp.generateDataForView).toHaveBeenCalledTimes(2);
//       expect(comp.generateDataForView).toHaveBeenCalledWith(
//         [].concat(data.required_states),
//         'state'
//       );
//       expect(comp.generateDataForView).toHaveBeenCalledWith(
//         [].concat(data.required_functions),
//         'function'
//       );
//     });
//   });
//
//   describe('generateDataForView method', () => {
//     it('should create new element if data equal null', async () => {
//       let data = null;
//       spyOn(comp, 'createElement');
//       comp.id = 0;
//       comp.generateDataForView(data, 'state');
//       expect(comp.createElement).toHaveBeenCalledWith(undefined, 'or', 1, data);
//     });
//
//     it('should generate view for states', async () => {
//       let data = ['or', 30, ['and', 10, [20]]];
//       let options = [
//         {
//           name_before_activation: 'New',
//           number: 10,
//         },
//         {
//           name_before_activation: 'Active',
//           number: 20,
//         },
//         {
//           name_before_activation: 'Appreved',
//           number: 30,
//         },
//       ];
//       comp.id = 0;
//       comp.generateDataForView(data, 'state');
//       expect(comp.view).toEqual([
//         {
//           id: 1,
//           type: 'state',
//           operator: 'or',
//           values: ['Active'],
//         },
//         {
//           id: 1,
//           type: 'state',
//           operator: 'and',
//           values: ['New', '#1'],
//         },
//         {
//           id: 2,
//           type: 'state',
//           operator: 'or',
//           values: ['Approved', '#2'],
//         },
//       ]);
//     });
//   });
//
//   describe('createElement method', () => {
//     it('should add new element into view property', async () => {
//       comp.view = [];
//       comp.createElement('state', 'or', 1, []);
//       expect(comp.view).toEqual([
//         {
//           id: 1,
//           type: 'state',
//           operator: 'or',
//           values: [],
//         },
//       ]);
//     });
//   });
// });
