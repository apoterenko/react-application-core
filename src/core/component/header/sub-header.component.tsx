import * as React from 'react';
import * as R from 'ramda';

import { orNull, orDefault, toClassName } from '../../util';
import { ISubHeaderProps } from './header.interface';
import { BaseComponent } from '../base';
import { Menu } from '../menu';
import { FlexLayout } from '../layout';
import { Button } from '../button';

export class SubHeader extends BaseComponent<SubHeader, ISubHeaderProps> {

  private menuRef = React.createRef<Menu>();

  /**
   * @stable [08.10.2018]
   * @param {ISubHeaderProps} props
   */
  constructor(props: ISubHeaderProps) {
    super(props);
    this.onMoreOptionsClick = this.onMoreOptionsClick.bind(this);
  }

  /**
   * @stable [08.10.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    const headerTitle = <span className='rac-sub-header-section-title'>{props.title}</span>;

    return (
      <FlexLayout row={true}
                  full={false}
                  justifyContentEnd={true}
                  alignItemsCenter={true}
                  className={toClassName(
                    'rac-sub-header',
                    props.subBorder && 'rac-sub-header-bordered'
                  )}>
        <FlexLayout row={true}
                    full={R.isNil(props.items)}
                    alignItemsCenter={true}>
          {orNull<JSX.Element>(
            props.navigationActionType,
            () => (
              <Button icon={props.navigationActionType}
                      onClick={props.onNavigationActionClick}
                      className='rac-button-navigation'/>
            )
          )}
          {orDefault<JSX.Element, JSX.Element>(R.isNil(props.titleRenderer), headerTitle, () => props.titleRenderer(headerTitle))}
        </FlexLayout>
        {props.items}
        {
          orNull<JSX.Element>(
            props.moreOptions,
            () => this.uiFactory.makeIcon({...props.moreOptionsConfiguration, type: 'more_vert', onClick: this.onMoreOptionsClick})
          )
        }
        {
          orNull<JSX.Element>(
            props.moreOptions,
            () => (
              <Menu ref={this.menuRef}
                    options={props.moreOptions}
                    onSelect={props.onMoreOptionsSelect}/>
            )
          )
        }
      </FlexLayout>
    );
  }

  /**
   * @stable [08.10.2018]
   */
  private onMoreOptionsClick(): void {
    this.menuRef.current.show();
  }
}
