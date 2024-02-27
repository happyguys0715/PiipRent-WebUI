export function getPropValue(
  data: Record<string, unknown>,
  key: string
): unknown | undefined {
  const props = key.split('.');
  const prop = props.shift();

  if (!prop) {
    return;
  }

  if (!props.length) {
    if (data) {
      return data[prop];
    }
  } else {
    if (data) {
      const newData = data[prop];

      if (Array.isArray(newData)) {
        return getPropValue(newData[0], props.join('.'));
      }

      return getPropValue(
        data[prop] as Record<string, unknown>,
        props.join('.')
      );
    }
  }

  return;
}

export function setPropValue(
  key: string,
  target: Record<string, unknown>,
  value: Record<string, unknown>
): void {
  const path = key.split('.');
  const prop = path.shift();

  if (!prop) {
    return;
  }

  if (!path.length) {
    target[prop] = value;
  } else {
    const newTaget = target[prop] as Record<string, unknown>;

    setPropValue(path.join('.'), newTaget, value);
  }
}
