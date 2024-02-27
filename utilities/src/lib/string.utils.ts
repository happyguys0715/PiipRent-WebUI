import { MomentInput, Time } from '@webui/time';
import { getPropValue } from './object.utils';

export class Formatter {
  private regExp: RegExp;

  constructor(private startSymbol: string, private endSymbol: string) {
    this.regExp = new RegExp(
      `${this.parseSymbol(startSymbol)}\\w+${this.parseSymbol(endSymbol)}`,
      'g'
    );
  }

  format(target: string, data: Record<string, unknown> = {}): string {
    const matches = target.match(this.regExp);

    if (!matches) {
      return target;
    }

    const values: string[] = matches.map(key => {
      const valueKey = key
        .replace(this.startSymbol, '')
        .replace(this.endSymbol, '');
      const value = getPropValue(data, valueKey);

      if (!value) {
        return '';
      }

      return value + '';
    });

    return matches.reduce(
      (acc, value, index) => acc.replace(value, values[index]),
      target
    );
  }

  private parseSymbol(symbol: string): string {
    return symbol
      .split('')
      .map(item => `\\${item}`)
      .join('');
  }
}

function format(str: string, data: Record<string, unknown>) {
  const open = '{';
  const close = '}';
  const pieces = [];
  let before;
  let propValue;
  let pos = 0;
  let trail;
  while (true && str) {
    const start = str.indexOf(open, pos);
    const end = str.indexOf(close, pos);
    const key = str.substring(start + 1, end);
    if (start === -1 || end === -1) {
      trail = str.substr(pos);
      if (trail !== '') {
        pieces.push(trail);
      }
      break;
    }

    if (data) {
      const shift_started_at = Time.parse(
        data['shift_started_at'] as MomentInput,
        {
          timezone:
            (data['timezone'] as string) ||
            (data['time_zone'] as string) ||
            undefined,
        }
      );

      if (key === 'shift_ended_at') {
        data['shift_ended_at'] =
          data['shift_ended_at'] ||
          shift_started_at.clone().add(8, 'hour').add(30, 'minute').format();
      }

      if (key === 'break_started_at') {
        data['break_started_at'] =
          data['break_started_at'] ||
          shift_started_at.clone().add(4, 'hour').format();
      }

      if (key === 'break_ended_at') {
        data['break_ended_at'] =
          data['break_ended_at'] ||
          shift_started_at.clone().add(4, 'hour').add(30, 'minute').format();
      }
    }

    propValue = getPropValue(data, key);
    before = str.substring(pos, start);
    pieces.push(before);
    pieces.push(propValue);
    pos = end + 1;
  }
  return pieces.join('');
}

export class FormatString {
  static format = format;
  format = format;
}
