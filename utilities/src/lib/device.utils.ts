export function isTouchDevice(): boolean {
  const deviceNamesReg =
    /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;

  return deviceNamesReg.test(navigator.userAgent.toLowerCase());
}

export function isMobile(): boolean {
  if (isTouchDevice()) {
    return window.innerWidth < 768;
  }

  return false;
}
