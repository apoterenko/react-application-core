import { IComponentProps } from '../../../../definition';
import { IIconConfigurationWrapper } from '../../../../definitions.interface';
import { UIIconConfigurationT } from '../../../../configurations-definitions.interface';

/**
 * @stable [01.10.2019]
 */
export interface IListItemGraphicProps
  extends IComponentProps,
  IIconConfigurationWrapper<UIIconConfigurationT> {
}
