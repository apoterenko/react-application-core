import { AnyT, IIdWrapper } from '../definitions.interface';

export interface ISetFileResult extends IIdWrapper<string> {
  filePath: string;
}

export interface IMultiEntityStorageResult {
  addResults: AnyT[];
  removeResults: void[];
}

export interface IApplicationStorageHelper {
  saveFiles<TEntity>(changes: TEntity, fields: Array<(entity: TEntity) => string>): Promise<IMultiEntityStorageResult[]>;
}
