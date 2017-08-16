export function clone<TObject>(o: TObject): TObject {
  return JSON.parse(JSON.stringify(o));
}
