export function getContactAvatar(name: string): string {
  const nameElements = name.split(' ');

  if (nameElements && nameElements.length) {
    if (nameElements.length === 2) {
      return nameElements
        .map(el => el[0])
        .join('')
        .toUpperCase();
    } else if (nameElements.length > 2) {
      nameElements.shift();
      return nameElements
        .map(el => el[0])
        .join('')
        .toUpperCase();
    }
  }

  return '';
}
