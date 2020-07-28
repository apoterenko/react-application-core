import camelcase from 'camelcase';

/**
 * @stable [25.07.2020]
 * @param value
 * @param options
 */
const asCamelcase = (value: string | string[], options?: camelcase.Options): string =>
  camelcase(value, options);

/**
 * @stable [25.07.2020]
 */
export class StringUtils {
  public static readonly asCamelcase = asCamelcase;
}
