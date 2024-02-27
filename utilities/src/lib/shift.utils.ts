export function getFulfilledStatus(
  status: number,
  workers: { undefined: number; accepted: number; cancelled: number }
): number | undefined {
  if (status === 1) {
    return 1;
  }

  if (status === 0 && !workers.undefined) {
    return 0;
  }

  if (status === 0 && workers.undefined) {
    return 2;
  }

  return;
}
