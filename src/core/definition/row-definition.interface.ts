import {
  IEntity,
  IEntityWrapper,
  IHoveredWrapper,
  ILastWrapper,
  IOnClickWrapper,
  ISelectableWrapper,
  ISelectedWrapper,
} from '../definitions.interface';
import {
  IPresetsHighlightedEntity,
} from './entity-definition.interface';

/**
 * @presets-entity
 * @stable [17.08.2020]
 */
export interface IPresetsRowEntity<TEntity extends IEntity = IEntity>
  extends IPresetsHighlightedEntity,
    IEntityWrapper<TEntity>,
    IHoveredWrapper,
    ILastWrapper,
    IOnClickWrapper<TEntity>,
    ISelectableWrapper,
    ISelectedWrapper {
}
