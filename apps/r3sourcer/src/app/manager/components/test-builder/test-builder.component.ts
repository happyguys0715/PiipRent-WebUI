import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  TemplateRef,
  ViewChildren,
  QueryList,
  ChangeDetectionStrategy,
} from '@angular/core';

import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

// import {
//   PassTestModalComponent,
//   PassTestModalConfig,
//   DynamicFormComponent,
// } from '@webui/dynamic-form';

import {
  testMetadata,
  questionMetadata,
  answerMetadata,
  MetadataType,
} from './test-builder.config';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { Field } from '@webui/metadata';
import { dialogConfig, DialogRef, Endpoints, FormMode } from '@webui/models';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FaIconComponent } from '@webui/ui';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { GenericFormService } from '@webui/core';
import { fillingForm, getElementFromMetadata } from '@webui/utilities';
import { ImageUploaderComponent } from '@webui/form-controls';
import { DynamicFormComponent } from '@webui/generic-components';
import {
  PassTestModalComponent,
  PassTestModalConfig,
} from '@webui/application-test';
import { Dialog } from '@angular/cdk/dialog';

interface IAcceptanceTest {
  acceptance_test_questions: any[];
  acceptance_tests_industries: { [key: number]: any };
  acceptance_tests_skills: { [key: number]: any };
  acceptance_tests_tags: { [key: number]: any };
  acceptance_tests_workflow_nodes: { [key: number]: any };
  description: string;
  id: string;
  is_active: string;
  test_name: string;
  valid_from: string;
  valid_until: string;
  __str__: string;
}

@Component({
  standalone: true,
  selector: 'webui-test-builder',
  templateUrl: './test-builder.component.html',
  styleUrls: ['./test-builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    DragDropModule,
    TranslateModule,
    FaIconComponent,
    InfiniteScrollModule,
    DynamicFormComponent,
    ImageUploaderComponent,
  ],
})
export class TestBuilderComponent implements OnInit, OnChanges {
  @Input() public testData!: IAcceptanceTest;

  @ViewChild('preview') public previewModal!: TemplateRef<any>;
  @ViewChildren('question')
  public questionList!: QueryList<DynamicFormComponent>;

  public testMetadata!: Field[];

  public testId!: string;

  public saveProcess!: boolean;
  public questionId!: number;
  public modalRef!: DialogRef;

  public questions: any[] = [];
  public answers: Record<string, any[]> = {};

  pictures: Map<string, Array<{ id: string; src: string }>> = new Map();
  pictureLoading: Map<string, boolean> = new Map();

  public configMap: Record<string, any> = {
    [Endpoints.AcceptanceTest]: testMetadata,
    [Endpoints.AcceptanceTestQuestion]: questionMetadata,
    [Endpoints.AcceptanceTestAnswers]: answerMetadata,
  };

  constructor(
    private genericFormService: GenericFormService,
    private modalService: Dialog
  ) {}

  public ngOnInit() {
    this.questionId = 1;
  }

  public ngOnChanges(changes: SimpleChanges) {
    const { testData } = changes;

    if (testData && !testData.isFirstChange()) {
      const currentValue: IAcceptanceTest = testData.currentValue;

      if (currentValue) {
        this.setPictures(currentValue);
        this.checkQuestions(currentValue);
      }
    }
  }

  public addModeProperty(metadata: any[], mode: BehaviorSubject<FormMode>) {
    metadata.forEach(el => {
      if (el.key) {
        el.mode = mode;
      } else if (el.children) {
        this.addModeProperty(el.children, mode);
      }
    });
  }

  public updateTestForm(data: any) {
    this.testId = data.id;
    this.createMetadata(Endpoints.AcceptanceTest, 'form', data).subscribe(
      (config: Field[]) => {
        this.testMetadata = config;
      }
    );
  }

  public createMetadata(
    endpoint: string,
    metadataType: MetadataType,
    data?: any
  ): Observable<Field[]> {
    return of(this.configMap[endpoint](metadataType)).pipe(
      map((config: Field[]) => {
        const mode: BehaviorSubject<FormMode> = new BehaviorSubject<FormMode>(
          FormMode.Edit
        );
        const button = getElementFromMetadata(
          config,
          'button',
          'type'
        ) as Field;
        const hidden = new BehaviorSubject(false);
        button.hidden = hidden;
        if (metadataType === 'form') {
          this.addModeProperty(config, mode);
        }

        if (metadataType === 'form') {
          mode.next(FormMode.View);
          hidden.next(true);
          fillingForm(config, data);
        }

        return config;
      })
    );
  }

  public addQuestion(create: boolean, question?: any) {
    const metadataType: MetadataType = create ? 'formadd' : 'form';

    this.createMetadata(
      Endpoints.AcceptanceTestQuestion,
      metadataType,
      question
    ).subscribe((config: Field[]) => {
      if (create) {
        const order = getElementFromMetadata(config, 'order');

        if (order) {
          order.value = ++this.questionId;
        }
      } else {
        const order = getElementFromMetadata(config, 'order') as Field;

        if (order.value > this.questionId) {
          this.questionId = order.value;
        } else {
          this.questionId += 1;
        }
      }

      const hiddenFields = this.updateMetadataByProps(config);

      this.questions.push({
        id: this.getId(config),
        hiddenFields,
        config,
      });
    });
  }

  public addAnswer(
    create: boolean,
    target: any,
    answerData?: any,
    questionData?: any
  ) {
    const metadataType: MetadataType = create ? 'formadd' : 'form';

    const exclude_from_score = questionData
      ? getElementFromMetadata(questionData, 'exclude_from_score')
      : null;

    this.createMetadata(
      Endpoints.AcceptanceTestAnswers,
      metadataType,
      answerData
    ).subscribe((config: Field[]) => {
      if (create) {
        const order = getElementFromMetadata(config, 'order');
        const value = this.getLastOrder(target);

        if (order) {
          order.value = value;
        }
      }

      const score = getElementFromMetadata(config, 'score');

      if (exclude_from_score && score) {
        score.hide = exclude_from_score.value;

        if (score.hide) {
          score.value = 5;
          if (score.templateOptions) {
            score.templateOptions.required = false;
          }
        }
      }

      target.push(config);
    });
  }

  public getLastOrder(answers: any[]) {
    let value = 0;

    answers.forEach(answer => {
      const order = getElementFromMetadata(answer, 'order') as Field;

      value = value > order.value ? value : order.value;
    });

    return value + 1;
  }

  public checkQuestions(acceptanceTest: IAcceptanceTest) {
    const questions = acceptanceTest.acceptance_test_questions.sort(
      (prev, next) => (prev.order > next.order ? 1 : -1)
    );

    questions.forEach(question => {
      this.addQuestion(false, question);
      this.answers[question.id] = [];
      this.checkAnswers(question);
    });
  }

  public checkAnswers(data: any) {
    if (data && data.acceptance_test_answers) {
      const answers = data.acceptance_test_answers as any[];
      const questionMetadataObservable = this.createMetadata(
        Endpoints.AcceptanceTestQuestion,
        'form',
        data
      );
      questionMetadataObservable.subscribe(questionMetadata => {
        answers.forEach(answer => {
          this.addAnswer(
            false,
            this.answers[data.id],
            answer,
            questionMetadata
          );
        });
      });
    }
  }

  public saveQuestion(data: any, index: number, update: string) {
    data.acceptance_test = this.testData.id;
    let action: keyof GenericFormService;
    if (update) {
      action = 'editForm';
    } else {
      action = 'submitForm';
    }

    if (data.type === '1') {
      data.exclude_from_score = true;
    }

    this.genericFormService[action](
      Endpoints.AcceptanceTestQuestion + (update ? data.id + '/' : ''),
      data
    ).subscribe(res => {
      this.createMetadata(
        Endpoints.AcceptanceTestQuestion,
        'form',
        res
      ).subscribe((config: Field[]) => {
        const hiddenFields = this.updateMetadataByProps(config);

        this.answers[res.id] = this.answers[res.id] || [];
        this.questions.splice(index, 1, {
          id: this.getId(config),
          hiddenFields,
          config,
        });
        this.pictures.set(res.id, []);
      });
    });
  }

  public deleteQuestion(id: string, target: any[], index: number) {
    this.deleteObject(Endpoints.AcceptanceTestQuestion, target, index, id);
  }

  public deleteAnswer(id?: string, target?: any[], index?: number) {
    if (!id) {
      return;
    }

    this.deleteObject(Endpoints.AcceptanceTestAnswers, target, index, id);
  }

  public deleteObject(
    endpoint: string,
    target?: any[],
    index?: number,
    id?: string
  ) {
    if (id) {
      this.genericFormService.delete(endpoint, id).subscribe(() => {
        target?.splice(index as number, 1);
      });
    } else {
      target?.splice(index as number, 1);
    }
  }

  public saveAnswer(data: any, index: number, id: string, update?: boolean) {
    data.acceptance_test_question = id;

    let action: keyof GenericFormService;
    if (update) {
      action = 'editForm';
    } else {
      action = 'submitForm';
    }

    this.genericFormService[action](
      Endpoints.AcceptanceTestAnswers + (update ? data.id + '/' : ''),
      data
    ).subscribe(res => {
      this.createMetadata(
        Endpoints.AcceptanceTestAnswers,
        'form',
        res
      ).subscribe((config: Field[]) => {
        this.answers[id].splice(index, 1, config);
      });
    });
  }

  public getId(metadata: Field[]): string | undefined {
    const id = getElementFromMetadata(metadata, 'id');

    if (id) {
      return id.value;
    }
    return;
  }

  public getType(metadata: Field[]): number | undefined {
    const type = getElementFromMetadata(metadata, 'type');

    if (type) {
      return type.value;
    }
    return;
  }

  public showPreview() {
    this.modalService.open(PassTestModalComponent, {
      ...dialogConfig(),
      data: {
        config: {
          testId: this.testData.id,
          send: false,
          description: this.testData.description,
        } as PassTestModalConfig,
      },
    });
    // this.modalRef.componentInstance.config = {
    //   testId: this.testData.id,
    //   send: false,
    //   description: this.testData.description,
    // } as PassTestModalConfig;
  }

  public checkCount(type?: number, length?: number) {
    if (type === 0 || type === 3) {
      return true;
    }

    if (type === 2 && typeof length === 'number' && length < 2) {
      return true;
    }

    return false;
  }

  public editQuestion(question: any) {
    const field = getElementFromMetadata(question, 'question') as Field;
    const button = getElementFromMetadata(question, 'button', 'type') as Field;
    button.hidden?.next(false);
    field.mode?.next('edit');
  }

  public editAnswer(answer: any) {
    const field = getElementFromMetadata(answer, 'answer') as Field;
    const button = getElementFromMetadata(answer, 'button', 'type') as Field;
    button.hidden?.next(false);
    field.mode?.next('edit');
  }

  public onUpload(images: string[], id: string) {
    this.pictureLoading.set(id, true);

    images.forEach(el => {
      this.genericFormService
        .submitForm('/acceptance-tests/acceptancetestquestionpictures/', {
          acceptance_test_question: { id },
          picture: el,
        })
        .pipe(finalize(() => this.pictureLoading.set(id, false)))
        .subscribe(res => {
          if (this.pictures.has(id)) {
            this.pictures.set(id, [
              ...(this.pictures.get(id) as any[]),
              { id: res.id, src: res.picture.origin },
            ]);
          }
        });
    });
  }

  public onRemovePicture(imageId: string, id: string) {
    this.genericFormService
      .delete('/acceptance-tests/acceptancetestquestionpictures/', imageId)
      .subscribe(() => {
        const pictures = this.pictures.get(id) as any[];
        const filteredList = pictures.filter(picture => picture.id !== imageId);

        this.pictures.set(id, [...filteredList]);
      });
  }

  setPictures(data: IAcceptanceTest): void {
    data.acceptance_test_questions.forEach(question => {
      this.pictures.set(
        question.id,
        question.pictures.map((el: any) => {
          return { src: el.picture.origin, id: el.id };
        })
      );
    });
  }

  public drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.questions, event.previousIndex, event.currentIndex);

    setTimeout(() => {
      const orderRequests = this.questionList
        .map((el, i) => {
          const id: string = el.form.value.id;

          return {
            id,
            order: i + 1,
          };
        })
        .map(el => {
          return this.genericFormService.updateForm(
            Endpoints.AcceptanceTestQuestion + el.id + '/',
            el
          );
        });

      forkJoin(orderRequests).subscribe();
    });
  }

  private updateMetadataByProps(metadata: Field[]) {
    let hiddenFields = {
      elements: <any[]>[],
      keys: <any[]>[],
      observers: <any[]>[],
    };

    metadata.forEach(el => {
      if (el.showIf && el.showIf.length) {
        if (hiddenFields.keys.indexOf(el.key) === -1) {
          hiddenFields.keys.push(el.key);
          hiddenFields.elements.push(el);
          hiddenFields.observers = this.observeFields(
            el.showIf,
            hiddenFields.observers
          );
          el.hidden = new BehaviorSubject<boolean>(true);
        }
      }

      if (el.children) {
        hiddenFields = this.updateMetadataByProps(el.children);
      }
    });

    return hiddenFields;
  }

  private observeFields(fields: any[], observers: any[]) {
    fields.forEach((field: any) => {
      if (field instanceof Object) {
        const keys = Object.keys(field);
        keys.forEach(key => {
          if (observers.indexOf(key) === -1) {
            observers.push(key);
          }
        });
      } else {
        if (observers.indexOf(field) === -1) {
          observers.push(field);
        }
      }
    });
    return observers;
  }
}
