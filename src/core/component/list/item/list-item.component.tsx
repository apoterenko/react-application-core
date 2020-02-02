import * as React from 'react';

import {
  calc,
  handlerPropsFactory,
  isDisabled,
  isFn,
  isSelected,
  joinClassName,
} from '../../../util';
import { BaseComponent } from '../../base';
import {
  IListItemProps,
  UniversalScrollableContext,
} from '../../../definition';
import { ISelectedElementClassNameWrapper } from '../../../definitions.interface';

export class ListItem extends BaseComponent<IListItemProps> {

  /**
   * @stable [27.10.2019]
   * @param {IListItemProps} props
   */
  constructor(props: IListItemProps) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  /**
   * @stable [23.09.2019]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;

    return (
      <UniversalScrollableContext.Consumer>
        {(selectedElementClassName) => (
          isFn(props.renderer)
            ? React.cloneElement(
                props.renderer(props.rawData, props.index),
                this.getItemProps({selectedElementClassName})
              )
            : (
              <li {...this.getItemProps({selectedElementClassName})}>
                {
                  props.icon && this.uiFactory.makeIcon({
                    type: props.icon,
                    className: 'rac-list-item__icon',
                  })
                }
                <div className='rac-list-item__content'>
                  {
                    isFn(props.tpl)
                      ? props.tpl(props.rawData)
                      : props.children
                  }
                </div>
              </li>
            )
        )}
      </UniversalScrollableContext.Consumer>
    );
  }

  /**
   * @stable [27.10.2019]
   * @param {ISelectedElementClassNameWrapper} context
   * @returns {React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>}
   */
  private getItemProps(context: ISelectedElementClassNameWrapper): React.DetailedHTMLProps<
    React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> {
    const props = this.props;
    return (
      {
        ref: this.selfRef,
        className: joinClassName(
          'rac-list-item',
          calc(props.className),
          props.icon && 'rac-list-item__decorated',
          props.odd && 'rac-list-item__odd',
          props.hovered && 'rac-list-item__hovered',
          props.last && 'rac-list-item__last',  // We can't use :not(:last-child) because of PerfectScrollbar Plugin
          ...(
            isSelected(props)
              ? ['rac-list-item__selected', context.selectedElementClassName]
              : ['rac-list-item__unselected']
          )
        ),
        ...handlerPropsFactory(this.onClick, !isDisabled(props) && isFn(props.onClick), false),
      }
    );
  }

  /**
   * @stable [27.10.2019]
   */
  private onClick(): void {
    const props = this.props;
    props.onClick(props.rawData);
  }
}
