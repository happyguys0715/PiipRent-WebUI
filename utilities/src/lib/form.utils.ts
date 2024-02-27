import { Field } from '@webui/metadata';
import { isMobile } from '@webui/utilities';

export function fillingForm(metadata: Field[], data: any): void {
  metadata.forEach(el => {
    if (el.key) {
      getValueOfData(data, el.key, el);
    } else if (el.children) {
      fillingForm(el.children, data);
    }
  });
}

export function getValueOfData(data: any, key: string, obj: Field): void {
  const keys = key.split('.');
  const prop: string = keys.shift() as string;
  if (keys.length === 0) {
    if (data) {
      if (!obj['value']) {
        obj['value'] = data[key];
      }
      if (obj.type === 'related') {
        if (obj.value && obj.value instanceof Object) {
          if (obj.value.id && obj.value.__str__) {
            obj.options = [obj.value];
          }
        }
      }
    }
  } else {
    if (data[prop]) {
      getValueOfData(data[prop], keys.join('.'), obj);
    }
  }
}

export function getElementFromMetadata(
  metadata: Field[],
  key: string,
  param: keyof Field = 'key'
): Field | null {
  let element: Field | null = null;
  metadata.forEach((el: Field) => {
    if (el[param] === key) {
      if (!element) {
        element = el;
      }
    } else if (el.children) {
      if (!element) {
        element = getElementFromMetadata(el.children, key, param);
      }
    }
  });
  return element;
}

export function removeValue(key: string, data: any): void {
  const keysArray = key.split('.');
  const firstKey: string = keysArray.shift() as string;

  if (keysArray.length === 0) {
    if (data) {
      delete data[firstKey];
    }
  } else if (keysArray.length > 0) {
    const combineKeys = keysArray.join('.');
    removeValue(combineKeys, data[firstKey]);
  }
}

export function createAddAction(data: any) {
  return {
    action: 'add',
    data,
  };
}

export function getEvaluationScore(score: string) {
  return Math.floor(parseFloat(score));
}

export function isMobileLandscape() {
  return isMobile() && getOrientation() === 90;
}

export function getOrientation(): number {
  let orientation;
  if (Number.isInteger((window as any).orientation)) {
    orientation = Math.abs((window as any).orientation);
  } else {
    const stringOrientation =
      (screen as any).msOrientation ||
      (screen as any).mozOrientation ||
      ((screen as any).orientation || ({} as any)).type;
    orientation = stringOrientation.includes('landscape') ? 90 : 0;
  }
  return orientation || 0;
}

export function generateCssStyles(
  styles: string[] = [],
  prefix: string
): string[] {
  return [
    styles
      .map(modificator => {
        return `${prefix}__${modificator}`;
      })
      .reduce((prev, current) => {
        return `${prev} ${current}`;
      }, '')
      .trim() || '',
  ];
}

export const isAddressField = (field: Field) => {
  const { type, key } = field;

  if (type === 'address') {
    return true;
  }

  return key === 'address' || key === 'street_address';
};

export const isPhoneField = (key: string): boolean => {
  const phoneFieldKeys = ['phone_mobile', 'emergency_contact_phone'];

  if (key.includes('.')) {
    return key.split('.').some(part => phoneFieldKeys.includes(part));
  }

  return phoneFieldKeys.includes(key);
};

export function convertPhoneNumber(data: any): void {
  if (!data) {
    return;
  }

  Object.keys(data).forEach(key => {
    if (isPhoneField(key)) {
      data[key] = data[key]?.internationalNumber || data[key];
    }

    if (typeof data[key] === 'object' && !Array.isArray(data[key])) {
      convertPhoneNumber(data[key]);
    }
  });
}
