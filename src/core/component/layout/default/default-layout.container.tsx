import * as React from 'react';

import { Drawer } from '../../drawer';
import { NavigationList } from '../../list';
import { lazyInject } from '../../../di';
import { toClassName, orNull } from '../../../util';
import {
  LAYOUT_FULL_MODE,
  LAYOUT_MINIMAL_MODE,
  LAYOUT_UPDATE_ACTION_TYPE,
} from '../layout.interface';
import { LayoutContainer } from '../layout.container';
import { IDefaultLayoutContainerProps } from './default-layout.interface';
import { Header } from '../../header';
import { NavigationMenuBuilder } from '../../../navigation';
import { Main } from '../../main';
import { Profile } from '../../profile';
import { INavigationListItemConfiguration } from '../../../configurations-definitions.interface';
import {
  ILayoutEntity,
  IStringMenuActionEntity,
  IXYEntity,
} from '../../../entities-definitions.interface';
import { FlexLayout } from '../../layout';
import { Operation } from '../../../operation';
import { IPayloadWrapper } from '../../../definitions.interface';
import { Message } from '../../message';
import { CenterLayout } from '../../layout';

export class DefaultLayoutContainer extends LayoutContainer<IDefaultLayoutContainerProps> {

  public static defaultProps: IDefaultLayoutContainerProps = {
    headerConfiguration: {},
    user: {
      email: '(no email)',
    },
  };
  private static PROFILE_EXIT_ACTION = 'exit';

  @lazyInject(NavigationMenuBuilder) private navigationMenuBuilder: NavigationMenuBuilder;

  constructor(props: IDefaultLayoutContainerProps) {
    super(props);
    this.onHeaderMoreOptionsSelect = this.onHeaderMoreOptionsSelect.bind(this);
    this.onProfileMenuActionClick = this.onProfileMenuActionClick.bind(this);
    this.onHeaderNavigationActionClick = this.onHeaderNavigationActionClick.bind(this);
    this.onChangeNavigationList = this.onChangeNavigationList.bind(this);
  }

  public render(): JSX.Element {
    const props = this.props;
    const menu = this.navigationMenuBuilder.provide()
        .map((item): INavigationListItemConfiguration => ({ ...item, active: props.root.path === item.link }));
    const runtimeTitle = menu.find((item) => item.active);

    return (
        <div className={toClassName(
                            'rac-default-layout',
                            'rac-flex',
                            'rac-flex-row',
                            'rac-flex-full',
                            this.props.className
                        )}>
          <Drawer opened={this.isLayoutFullModeEnabled}>
            <div className={toClassName(
                                'rac-persistent-drawer-toolbar-spacer',
                                this.uiFactory.persistentDrawerToolbarSpacer
                            )}>
              {this.profileTpl}
            </div>
            <NavigationList {...props.layout}
                            items={menu}
                            onChange={this.onChangeNavigationList}/>
          </Drawer>
          <FlexLayout className='rac-default-layout-body'>
            <Header {...props.headerConfiguration}
                    title={runtimeTitle && runtimeTitle.label || props.title}
                    className={props.filter && props.filter.active && 'rac-header-search-toolbar-active'}
                    onNavigationActionClick={this.onHeaderNavigationActionClick}
                    onMoreOptionsSelect={this.onHeaderMoreOptionsSelect}>
              {props.headerConfiguration.items}
            </Header>
            <Main>
              {props.children}
              {
                orNull<JSX.Element>(
                  props.progress,
                  () => (
                    <CenterLayout className='rac-overlay'>
                      <Message progress={true}/>
                    </CenterLayout>
                  )
                )
              }
            </Main>
            {orNull(props.footer, () => <footer className='rac-footer'>{props.footer}</footer>)}
          </FlexLayout>
          {this.snackbarTpl}
        </div>
    );
  }

  protected get profileTpl(): JSX.Element {
    const user = this.props.user;

    return orNull(
      this.routes.profile,
      () => (
        <Profile path={this.routes.home}
                 name={user && user.name}
                 email={user && user.email}
                 menuItems={[{ label: 'Exit', icon: 'exit_to_app', value: DefaultLayoutContainer.PROFILE_EXIT_ACTION }]}
                 onClick={this.onProfileMenuActionClick}/>
      )
    );
  }

  /**
   * @stable [08.08.2018]
   * @param {IStringMenuActionEntity} option
   */
  protected onHeaderMoreOptionsSelect(option: IStringMenuActionEntity): void {
    const params: IPayloadWrapper = {payload: Operation.create(option.value)};
    this.dispatch(option.value, params);
  }

  protected onProfileMenuActionClick(option: any): void {// TODO
    switch (option.value) {
      case DefaultLayoutContainer.PROFILE_EXIT_ACTION:
        this.navigate(this.routes.logout);
        break;
    }
  }

  /**
   * @stable [11.08.2018]
   */
  private onHeaderNavigationActionClick(): void {
    const props = this.props;
    const headerConfiguration = props.headerConfiguration;

    if (headerConfiguration.onNavigationActionClick) {
      headerConfiguration.onNavigationActionClick();
    } else {
      this.dispatchLayoutChanges({
        payload: {mode: this.isLayoutFullModeEnabled ? LAYOUT_MINIMAL_MODE : LAYOUT_FULL_MODE},
      });
    }
  }

  /**
   * @stable [10.08.2018]
   * @param {IXYEntity} xy
   */
  private onChangeNavigationList(xy: IXYEntity): void {
    this.dispatchLayoutChanges({payload: xy});
  }

  /**
   * @stable [11.08.2018]
   * @param {IPayloadWrapper<ILayoutEntity>} payloadWrapper
   */
  private dispatchLayoutChanges(payloadWrapper: IPayloadWrapper<ILayoutEntity>): void {
    this.appStore.dispatch({type: LAYOUT_UPDATE_ACTION_TYPE, data: payloadWrapper});
  }

  /**
   * @stable [11.08.2018]
   * @returns {boolean}
   */
  private get isLayoutFullModeEnabled(): boolean {
    return this.props.layout.mode === LAYOUT_FULL_MODE;
  }
}
