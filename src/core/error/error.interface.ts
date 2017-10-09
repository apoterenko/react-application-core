export interface IError {
  message: string;
  code?: number;
}

export class ApplicationError implements IError {

  public static create(message: string, code?: number): IError {
    return new ApplicationError(message, code);
  }

  constructor(public message: string,
              public code?: number) {
  }
}
