import { IFileFieldInternalProps, IFileFieldInternalState } from './filefield.interface';
import { BasicFileField } from './basic-filefield.component';
import { MultiFieldEntityT } from '../multifield';

export class FileField
    extends BasicFileField<FileField, IFileFieldInternalProps, IFileFieldInternalState> {

  public static defaultProps: IFileFieldInternalProps = {
    displayMessage: '%d file(s)',
    displayValue: (value: MultiFieldEntityT, field: FileField) => {
      const len = field.multiFieldPlugin.getActiveValueLength(value);
      return field.printfDisplayMessage(len > 0, len);
    },
  };
}
