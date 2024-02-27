export function generateOptions(options: { [value: string]: any }) {
  return Object.keys(options).map(value => {
    return {
      value,
      label: options[value],
      key: value.toString().toLocaleLowerCase(),
    };
  });
}
