import { IEntity, IKeyValue, NEW_OPTION } from '../definitions.interface';

export function buildRoute(path: string, params: IKeyValue): string {
  (path.match(/\:[a-zA-Z0-9]+/g) || []).forEach((placeholder) => {
    path = path.replace(placeholder, params[placeholder.substring(1, placeholder.length)]);
  });
  return path;
}

/**
 * @stable [21.08.2018]
 * @param {string} path
 * @param {TEntity} entity
 * @param {IKeyValue} params
 * @returns {string}
 */
export const buildEntityRoute = <TEntity extends IEntity>(path: string,
                                                          entity?: TEntity,
                                                          params?: IKeyValue): string =>
  buildRoute(path, {id: entity ? entity.id : NEW_OPTION, ...params});
