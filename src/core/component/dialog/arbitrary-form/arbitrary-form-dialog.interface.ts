import { IFormConfigurationWrapper } from '../../../configurations-definitions.interface';
import { IDialogProps } from '../dialog.interface';
import { IEditableEntityFormWrapperEntity } from '../../../entities-definitions.interface';

/**
 * @stable [03.08.2018]
 */
export interface IArbitraryFormDialogProps extends IDialogProps,
                                                   IFormConfigurationWrapper {
}

/**
 * @stable [03.08.2018]
 */
export interface IArbitraryFormDialogState extends IEditableEntityFormWrapperEntity {
}
