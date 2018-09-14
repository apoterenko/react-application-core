import * as React from 'react';

import { toClassName, orNull } from '../../util';
import { IHeaderProps } from './header.interface';
import { BaseComponent } from '../base';
import { Menu } from '../menu';
import { IMenu } from '../menu';
import { FlexLayout } from '../layout';

export class Header extends BaseComponent<Header, IHeaderProps> {

  public static defaultProps: IHeaderProps = {
    navigationActionType: 'menu',
  };

  /**
   * @stable [31.05.2018]
   * @param {IHeaderProps} props
   */
  constructor(props: IHeaderProps) {
    super(props);
    this.onMenuClick = this.onMenuClick.bind(this);
  }

  /**
   * @stable [29.06.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;

    return (
      <header className={toClassName('rac-header', 'rac-flex', props.className)}>
        <FlexLayout row={true}
                    className='rac-navigation-section rac-flex-align-items-center'>
          {
            this.uiFactory.makeIcon({
              className: 'rac-navigation-action',
              type: props.navigationActionType,
              onClick: props.onNavigationActionClick,
            })
          }
          <span className='rac-header-section-title'>{props.title}</span>
        </FlexLayout>
        {
          orNull<JSX.Element>(
            props.children || props.moreOptions,
            () => (
              <div className='rac-flex rac-flex-align-items-center'>
                {props.children}
                {
                  orNull<JSX.Element>(
                    props.moreOptions,
                    () => (
                      this.uiFactory.makeIcon({
                        ...props.moreOptionsConfiguration,
                        type: 'more_vert',
                        onClick: this.onMenuClick,
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
              </div>
            )
          )
        }
      </header>
    );
  }

  /**
   * @stable [31.05.2018]
   */
  private onMenuClick(): void {
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
