import { FunctionT } from 'core/util';

import { IProtectedComponentCtor } from './permission.interface';

export function permission<TPermissionObject>(config: TPermissionObject): FunctionT {
  return (target: IProtectedComponentCtor<TPermissionObject>): void => {
    target.$$permissionConfig = config;
  };
}
