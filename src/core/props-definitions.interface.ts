import {
  ITabPanelConfiguration,
} from './configurations-definitions.interface';
import { ITabPanelEntity } from './definition';

export interface ITabPanelProps extends ITabPanelConfiguration,
                                        ITabPanelEntity {
}
