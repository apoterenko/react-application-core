import { IBlobEntity } from '../definitions.interface';
import { isDef, orDefault } from '../util';

export function toBlobEntities(ids: string[]): Promise<IBlobEntity[]> {
  return Promise.all<IBlobEntity>(orDefault<Array<Promise<IBlobEntity>>, Array<Promise<IBlobEntity>>>(
    isDef(ids),
    () => (
      ids.map<Promise<IBlobEntity>>(
        (id) =>
          fetch(id)
            .then((r) => r.blob())
            .then((blob) => ({ id, blob }))
      )
    ),
    []
  ));
}
