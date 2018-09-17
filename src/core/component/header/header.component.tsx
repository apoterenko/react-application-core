import * as React from 'react';
import * as R from 'ramda';

import { toClassName, orNull } from '../../util';
import { IHeaderProps } from './header.interface';
import { BaseComponent } from '../base';
import { Menu } from '../menu';
import { IMenu } from '../menu';
import { FlexLayout } from '../layout';

export class Header extends BaseComponent<Header, IHeaderProps> {

  /**
   * @stable [31.05.2018]
   * @param {IHeaderProps} props
   */
  constructor(props: IHeaderProps) {
    super(props);
    this.onMoreOptionsClick = this.onMoreOptionsClick.bind(this);
  }

  /**
   * @stable [29.06.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    const hasExtraItems = !R.isNil(props.items) || !R.isNil(props.moreOptions);

    return (
      <header className={toClassName(
                          'rac-header',
                          hasExtraItems && 'rac-full-header',
                          'rac-flex',
                          'rac-flex-column',
                          props.className)}>
        <FlexLayout row={true}>
          <FlexLayout row={true}
                      alignItemsCenter={true}>
            {orNull<JSX.Element>(
              props.navigationActionType,
              () => (
                this.uiFactory.makeIcon({
                  className: 'rac-header-navigation-action',
                  type: props.navigationActionType,
                  onClick: props.onNavigationActionClick,
                })
              )
            )}
            <span className='rac-header-section-title'>{props.title}</span>
          </FlexLayout>
          {
            orNull<JSX.Element>(
              props.children,
              () => (
                <FlexLayout row={true}
                            justifyContentEnd={true}
                            alignItemsCenter={true}>
                  {props.children}
                </FlexLayout>
              )
            )
          }
        </FlexLayout>
        {
          orNull<JSX.Element>(
            hasExtraItems,
            () => (
              <FlexLayout row={true}
                          justifyContentEnd={true}
                          alignItemsCenter={true}>
                {props.items}
                {
                  orNull<JSX.Element>(
                    props.moreOptions,
                    () => (
                      this.uiFactory.makeIcon({
                        ...props.moreOptionsConfiguration,
                        type: 'more_vert',
                        onClick: this.onMoreOptionsClick,
                      })
                    )
                  )
                }
                {
                  orNull<JSX.Element>(
                    props.moreOptions,
                    () => (
                      <Menu ref='menu'
                            options={props.moreOptions}
                            onSelect={props.onMoreOptionsSelect}/>
                    )
                  )
                }
              </FlexLayout>
            )
          )
        }
      </header>
    );
  }

  /**
   * @stable [31.05.2018]
   */
  private onMoreOptionsClick(): void {
    this.menu.show();
  }

  /**
   * @stable [31.05.2018]
   * @returns {IMenu}
   */
  private get menu(): IMenu {
    return this.refs.menu as IMenu;
  }
}
