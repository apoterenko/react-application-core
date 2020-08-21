import { BaseTextField } from '../text-field';
import { IDateTimeSettings } from '../../../settings';
import {
  ITimeFieldInternalState,
  ITimeFieldInternalProps,
} from './timefield.interface';
import { PropsUtils } from '../../../util';

export class TimeField extends BaseTextField<ITimeFieldInternalProps,
                                              ITimeFieldInternalState> {

  public static readonly defaultProps = PropsUtils.mergeWithParentDefaultProps<ITimeFieldInternalProps>({}, BaseTextField);

  protected getFieldMask(): (string|RegExp)[] {
    return super.getFieldMask() ||
      (this.props.useShortMask ? this.dateTimeSettings.uiShortTimeMask : this.dateTimeSettings.uiTimeMask);
  }

  protected getFieldPattern(): string {
    return super.getFieldPattern() ||
      (this.props.useShortMask ? this.dateTimeSettings.uiShortTimePattern : this.dateTimeSettings.uiTimePattern);
  }

  private get dateTimeSettings(): IDateTimeSettings {
    return this.settings.dateTime || {};
  }
}
