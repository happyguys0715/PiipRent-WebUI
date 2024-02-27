import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { ToastService, MessageType } from './toast.service';

export type ParseErrorOptions = {
  showMessage?: boolean;
};

type Errors =
  | string[]
  | {
      detail?: string;
      message?: string;
      non_field_errors?: string[] | string;
      shift?: string;
      [key: string]: unknown;
    };

type Error = {
  status: string;
  message?: string;
  errors?: Errors;
  error?: string;
};

@Injectable({
  providedIn: 'root',
})
export class ErrorsService {
  constructor(private ts: ToastService) {}

  public handleError(
    response: HttpErrorResponse,
    { showMessage = false }: ParseErrorOptions = {}
  ): never {
    const { status, error } = response;

    switch (status) {
      case 500: {
        this.showErrorMessage(error, 'Server error');
        break;
      }

      case 403: {
        this.showErrorMessage(error);

        throw error;
      }
    }

    if (showMessage) {
      this.showErrorMessage(error);
    }

    throw error;
  }

  private showErrorMessage(error: Error | string, defaultMessage = '') {
    if (typeof error === 'string') {
      this.ts.sendMessage(defaultMessage, MessageType.Error);
      return;
    }

    const { errors, error: errorText, message: errorMessage } = error;

    if (!errors) {
      return;
    }

    if (Array.isArray(errors)) {
      this.ts.sendMessage(errors.join('. '), MessageType.Error);
    } else {
      const { detail, non_field_errors, shift, message, ...fields } = errors;

      let text =
        detail ||
        message ||
        shift ||
        errorMessage ||
        errorText ||
        this.parseNonFieldErrors(non_field_errors) ||
        defaultMessage;

      Object.keys(fields).forEach(
        (key: string) => (text += ` ${fields[key]}.`)
      );

      this.ts.sendMessage(text, MessageType.Error);
    }
  }

  private parseNonFieldErrors(errors?: string[] | string): string {
    if (!errors) {
      return '';
    }

    return Array.isArray(errors) ? errors.join(', ') : errors;
  }
}
