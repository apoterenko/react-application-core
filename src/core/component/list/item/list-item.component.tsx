import * as React from 'react';

import {
  handlerPropsFactory,
  isDisabled,
  isFn,
  isSelected,
  joinClassName,
} from '../../../util';
import {
  ListItemGraphic,
  ListItemText,
} from '../../list';
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
                  props.icon && <ListItemGraphic iconConfiguration={props.icon}/>
                }
                {
                  isFn(props.tpl)
                    ? <ListItemText>{props.tpl(props.rawData)}</ListItemText>
                    : props.children
                }
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
          props.className,
          props.odd && 'rac-list-item-odd',
          ...(
            isSelected(props)
              ? ['rac-list-item-selected', context.selectedElementClassName]
              : ['rac-list-item-unselected']
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
