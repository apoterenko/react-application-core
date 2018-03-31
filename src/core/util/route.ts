import { IEntity, IKeyValue, NEW_OPTION } from '../definitions.interface';

export function buildRoute(path: string, params: IKeyValue): string {
  (path.match(/\:[a-zA-Z0-9]+/g) || []).forEach((placeholder) => {
    path = path.replace(placeholder, params[placeholder.substring(1, placeholder.length)]);
  });
  return path;
}

export function buildEntityRoute<TEntity extends IEntity>(path: string,
                                                          entity: TEntity,
                                                          params?: IKeyValue): string {
  return buildRoute(path, { id: entity ? entity.id : NEW_OPTION, ...params });
}
