import { injectable } from 'inversify';

import {
  IUniqueId,
  IUniqueIdConfigEntity,
} from '../definition';

@injectable()
export class UniqueId implements IUniqueId {

  public fromName(cfg: IUniqueIdConfigEntity): string {
    const {
      parts,
      prefix,
    } = cfg;
    return parts
      .map(
        (name) => (name || '').split(' ').map((part) => (part[0] || '').toLowerCase()).join('-')
      ).join('-');
  }
}
