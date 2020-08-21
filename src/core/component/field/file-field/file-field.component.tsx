import {
  ClsUtils,
  PropsUtils,
} from '../../../util';
import {
  FileFieldClassesEnum,
  IFileFieldProps,
  IFileFieldState,
} from '../../../definition';
import { BaseFileField } from './base-file-field.component';

/**
 * @component-impl
 * @stable [21.08.2020]
 */
export class FileField extends BaseFileField<IFileFieldProps, IFileFieldState> {

  public static readonly defaultProps = PropsUtils.mergeWithParentDefaultProps<IFileFieldProps>({
    displayMessage: '%d file(s)',
    preventFocus: true,
  }, BaseFileField);

  /**
   * @stable [21.08.2020]
   */
  protected getFieldClassName(): string {
    return ClsUtils.joinClassName(super.getFieldClassName(), FileFieldClassesEnum.FILE_FIELD);
  }
}
