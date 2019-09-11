/**
 * @stable [28.08.2019]
 */
export enum EnvironmentVariablesEnum {
  TRANSPORT = '$$transport',
}

/**
 * @stable [11.09.2019]
 */
export interface IEnvironment {
  document: Document;
  documentClickEvent: string;
}
