import * as React from 'react';

import {
  CalcUtils,
  ClsUtils,
  PropsUtils,
  TypeUtils,
  WrapperUtils,
} from '../../../util';
import { GenericBaseComponent } from '../../base/generic-base.component';
import {
  CardClassesEnum,
  ICardProps,
  UniversalScrollableContext,
} from '../../../definition';

export class Card extends GenericBaseComponent<ICardProps> {

  /**
   * @stable [08.06.2020]
   * @param {ICardProps} props
   */
  constructor(props: ICardProps) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  /**
   * @stable [08.06.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const mergedProps = this.mergedProps;
    const {
      className,
      onClick,
    } = mergedProps;

    return (
      <UniversalScrollableContext.Consumer>
        {(selectedElementClassName) => (
          <div
            ref={this.actualRef}
            className={
              ClsUtils.joinClassName(
                CardClassesEnum.CARD,
                CalcUtils.calc(className),
                ...WrapperUtils.isSelected(mergedProps)
                  ? [CardClassesEnum.CARD_SELECTED, selectedElementClassName]
                  : []
              )
            }
            {
              ...PropsUtils.buildClickHandlerProps(
                this.onClick,
                TypeUtils.isFn(onClick) && !WrapperUtils.isDisabled(mergedProps),
                false
              )
            }
          >
            {this.props.children}
          </div>
        )}
      </UniversalScrollableContext.Consumer>
    );
  }

  /**
   * @stable [08.06.2020]
   */
  private onClick(): void {
    const {
      onClick,
    } = this.mergedProps;
    const {
      entity,
    } = this.originalProps;

    onClick(entity);
  }
}
