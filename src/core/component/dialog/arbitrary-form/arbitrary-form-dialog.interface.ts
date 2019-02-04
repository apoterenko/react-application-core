import { IDialogProps } from '../dialog.interface';
import { IEditableEntityFormWrapperEntity } from '../../../entities-definitions.interface';
import { IFormConfigurationWrapperEntity } from '../../../definition';

/**
 * @stable [03.08.2018]
 */
export interface IArbitraryFormDialogProps extends IDialogProps,
                                                   IFormConfigurationWrapperEntity {
}

/**
 * @stable [03.08.2018]
 */
export interface IArbitraryFormDialogState extends IEditableEntityFormWrapperEntity {
}
