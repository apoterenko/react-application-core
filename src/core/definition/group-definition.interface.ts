import * as React from 'react';

import {
  EntityIdT,
  IAreGroupsReadyWrapper,
  IEntity,
  IGroupNameWrapper,
  IGroupValueWrapper
} from '../definitions.interface';

/**
 * @stable [30.07.2020]
 */
export type GroupValueRendererT = (groupedRowValue: EntityIdT, groupedEntities: IEntity[]) => React.ReactNode;

/**
 * @presets-entity
 * @stable [30.07.2020]
 */
export interface IPresetsGroupByEntity
  extends IAreGroupsReadyWrapper,
    IGroupNameWrapper,
    IGroupValueWrapper<GroupValueRendererT | GroupValueRendererT[]> {
}
