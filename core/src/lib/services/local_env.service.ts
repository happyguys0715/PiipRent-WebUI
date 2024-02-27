import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class LocalEnvService {
  private _env: BehaviorSubject<{ [key: string]: unknown }> =
    new BehaviorSubject({});

  public get env$(): Observable<{ [key: string]: unknown }> {
    return this._env.asObservable();
  }

  public get value(): { [key: string]: unknown } {
    return this._env.getValue();
  }

  public register(key: string, value: unknown): void {
    const state = this._env.getValue();

    if (state[key]) {
      throw 'Variable already registered!';
    }

    this._env.next({
      ...state,
      [key]: value,
    });
  }

  public clean(): void {
    this._env.next({});
  }
}
