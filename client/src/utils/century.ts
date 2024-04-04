export function numToCentury(i: number) {
  if (i < 1) {
    return -1 * Math.abs(i - 1);
  }

  return i;
}

export function numToCenturyStart(i: number) {
  const century = numToCentury(i);

  if (century < 0) {
    return century * 100;
  }

  return (century - 1) * 100;
}
