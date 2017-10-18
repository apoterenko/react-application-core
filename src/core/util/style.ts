export function toClassName(...classNames: string[]): string {
  return classNames.filter((cls) => !!cls).join(' ');
}
