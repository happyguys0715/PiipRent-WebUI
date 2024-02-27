import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class InputService {
  private _lastInputInFocus = new BehaviorSubject<
    HTMLInputElement | HTMLTextAreaElement | null
  >(null);

  push(text: string): void {
    const input = this._lastInputInFocus.value;

    if (input) {
      const position = input.selectionStart;

      if (position) {
        const newValue =
          input.value.slice(0, position) + text + input.value.slice(position);

        input.value = newValue;
      } else {
        input.value = input.value + text;
      }

      input.focus();
    }
  }

  setInput(element: HTMLInputElement | HTMLTextAreaElement): void {
    this._lastInputInFocus.next(element);
  }
}
