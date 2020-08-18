import {
  IDisabledWrapper,
  IEntity,
  IEntityWrapper,
  IHighlightOddWrapper,
  IHoveredWrapper,
  IIndexedWrapper,
  IIndexWrapper,
  ILastWrapper,
  IOnClickWrapper,
  ISelectableWrapper,
  ISelectedWrapper,
} from '../definitions.interface';

/**
 * @presets-entity
 * @stable [17.08.2020]
 */
export interface IPresetsRowEntity<TEntity extends IEntity = IEntity>
  extends IDisabledWrapper,
    IEntityWrapper<TEntity>,
    IHighlightOddWrapper,
    IHoveredWrapper,
    IIndexedWrapper,
    IIndexWrapper,
    ILastWrapper,
    IOnClickWrapper<TEntity>,
    ISelectableWrapper,
    ISelectedWrapper {
}
