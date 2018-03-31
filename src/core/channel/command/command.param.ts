import { AnyT } from '../../definitions.interface';

export class CommandParam {
  private paramName: string;
  private paramValue: AnyT;

  constructor(paramName: string, paramValue: AnyT) {
    this.paramName = paramName;
    this.paramValue = paramValue;
  }

  public getParamName(): string {
    return this.paramName;
  }

  public getParamValue(): AnyT {
    return this.paramValue;
  }
}
