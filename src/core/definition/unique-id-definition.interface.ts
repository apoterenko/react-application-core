import {
  IPartsWrapper,
  IPrefixWrapper,
} from '../definitions.interface';

/**
 * @stable [03.02.2020]
 */
export interface IUniqueId {
  fromName(cfg: IUniqueIdConfigEntity): string;
}

/**
 * @config-entity
 * @stable [03.02.2020]
 */
export interface IUniqueIdConfigEntity
  extends IPrefixWrapper,
    IPartsWrapper<string[]> {
}
