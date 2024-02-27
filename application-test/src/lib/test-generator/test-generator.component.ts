import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CdkStepper, CdkStepperModule } from '@angular/cdk/stepper';
import { BehaviorSubject, Observable } from 'rxjs';

import { CommonModule } from '@angular/common';
import { StepperComponent } from '@webui/stepper';
import {
  FormCheckboxComponent,
  FormInputControlComponent,
  FormRadioSwitchComponent,
  FormTextareaComponent,
} from '@webui/form-controls';
import { TranslateModule } from '@ngx-translate/core';
import { LoaderComponent } from '@webui/ui';
import { GenericFormService } from '@webui/core';

enum QuestionType {
  Options,
  Text,
  YesNo,
  Checkboxes,
}

interface IQuestionConfig {
  acceptance_test_question: string;
  name: string;
  details: string;
  type: QuestionType;
  order: number;
  workflow_object: string;
  group: FormGroup;
  pictures: string[];
  last: boolean;
  first: boolean;
  options: any[];
}

interface ITestConfig {
  name: string;
  description?: string;
  questions: IQuestionConfig[];
}

@Component({
  standalone: true,
  selector: 'webui-test-generator',
  templateUrl: './test-generator.component.html',
  styleUrls: ['./test-generator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    StepperComponent,
    CdkStepperModule,
    ReactiveFormsModule,
    FormRadioSwitchComponent,
    FormTextareaComponent,
    FormInputControlComponent,
    TranslateModule,
    LoaderComponent,
    FormCheckboxComponent,
  ],
})
export class TestGeneratorComponent implements OnInit {
  @Input() public id?: string;
  @Input() public send? = true;
  @Input() public workflowObject?: string;
  @Input() test: any;
  @Input() skipScore?: boolean;

  @ViewChild('cdkStepper') stepper!: CdkStepper;

  @Output() public sended: EventEmitter<any> = new EventEmitter();

  public testEndpoint = '/acceptance-tests/acceptancetests/';
  public answerEndpoint = '/acceptance-tests/workflowobjectanswers/';
  public testData: any;
  public form: FormGroup = new FormGroup({});

  private testConfig: BehaviorSubject<ITestConfig | null> =
    new BehaviorSubject<ITestConfig | null>(null);

  public testConfig$: Observable<ITestConfig | null> =
    this.testConfig.asObservable();
  public QuestionType = QuestionType;

  constructor(private genericFormService: GenericFormService) {}

  public ngOnInit() {
    this.fetchTest();
  }

  public generateTestForm(data: any) {
    const config = {
      name: data.test_name,
      description: data.description,
      questions: data.acceptance_test_questions.map(
        (question: any, index: number) => {
          return this.generateQuestion(question, {
            last: index === data.acceptance_test_questions.length - 1,
            first: index === 0,
          });
        }
      ),
    };

    config.questions.sort((p: any, n: any) => (p.order > n.order ? 1 : -1));

    this.testConfig.next(config);
  }

  public generateQuestion(
    data: any,
    config: { last?: boolean; first?: boolean }
  ) {
    this.form.addControl(data.id, new FormGroup({}));
    const questionForm: FormGroup = this.form.get(data.id) as FormGroup;
    let options;

    const question: { [key: string]: any } = {
      acceptance_test_question: data.id,
      name: data.question,
      details: data.details,
      type: data.type,
      order: data.order,
      workflow_object: this.workflowObject,
      group: questionForm,
      pictures: data.pictures.map((el: any) => el.picture.origin),
      last: config.last,
      first: config.first,
    };

    const hasOptions = [
      QuestionType.Checkboxes,
      QuestionType.Options,
      QuestionType.YesNo,
    ].includes(data.type);

    if (hasOptions) {
      options = data.acceptance_test_answers.map(
        ({ answer, id }: { answer: any; id: string }) => ({
          label: answer,
          value: id,
        })
      );

      if (question['type'] === QuestionType.Checkboxes) {
        options.forEach((option: any) => {
          questionForm.addControl(option.value, new FormControl(''));
        });
      } else {
        questionForm.addControl(
          'answer',
          new FormControl('', Validators.required)
        );
      }
    }

    if (question['type'] === QuestionType.Text) {
      (this.form.get(data.id) as FormGroup).addControl(
        'answer_text',
        new FormControl('', Validators.required)
      );
      (this.form.get(data.id) as FormGroup).addControl(
        'score',
        new FormControl('')
      );
    }

    question['options'] = options;

    return question;
  }

  public sendForm(questions: IQuestionConfig[]) {
    const formValue = this.form.value;

    const body = questions.map(question => {
      const value = formValue[question.acceptance_test_question];
      let answer = value.answer;

      if (question.type === QuestionType.Checkboxes) {
        answer = Object.entries(value)
          .filter(el => el[1])
          .map(([key]) => key);
      }

      return {
        acceptance_test_question: question.acceptance_test_question,
        workflow_object: question.workflow_object,
        answer,
        answer_text: value.answer_text,
        score: this.skipScore && value.answer_text ? 5 : value.score,
      };
    });

    if (this.send) {
      this.genericFormService
        .submitForm(this.answerEndpoint, body)
        .subscribe(() => {
          this.sended.emit(true);
        });
    } else {
      this.sended.emit(body);
    }
  }

  private fetchTest(): void {
    if (this.test) {
      this.generateTestForm(this.test);
    } else {
      this.genericFormService
        .getAll(`${this.testEndpoint}${this.id}/`)
        .subscribe(res => {
          this.generateTestForm(res);
        });
    }
  }
}
