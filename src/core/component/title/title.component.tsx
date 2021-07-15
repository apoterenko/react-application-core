import * as React from 'react';

import {
  CalcUtils,
  ClsUtils,
  PropsUtils,
} from '../../util';
import {
  ITitleProps,
  TitleClassesEnum,
} from '../../definition';
import { GenericComponent } from '../base/generic.component';

/**
 * @component-impl
 * @stable [20.03.2021]
 */
export class Title extends GenericComponent<ITitleProps> {

  public static readonly defaultProps: ITitleProps = {
    full: false,
  };

  /**
   * @stable [20.03.2021]
   */
  public render(): JSX.Element {
    const {
      contentBorder,
    } = this.mergedProps;
    const {
      className,
      full,
      items,
    } = this.originalProps;

    return (
      <div
        className={
          ClsUtils.joinClassName(
            TitleClassesEnum.TITLE,
            full && TitleClassesEnum.FULL_TITLE,
            CalcUtils.calc(className)
          )
        }
      >
        <div
          className={TitleClassesEnum.CONTENT}
        >
          {this.t(this.originalChildren as string)}
          {
            contentBorder && (
              <div
                className={TitleClassesEnum.CONTENT_EDGE}
              />
            )
          }
        </div>
        {items && (
          <div
            className={TitleClassesEnum.RIGHT_CONTENT}
          >
            {items}
          </div>
        )}
      </div>
    );
  }

  /**
   * @stable [01.07.2021]
   */
  protected getComponentSettingsProps(): Readonly<ITitleProps> {
    return PropsUtils.extendProps(
      super.getComponentSettingsProps(),
      this.componentsSettings?.title
    );
  }
}
