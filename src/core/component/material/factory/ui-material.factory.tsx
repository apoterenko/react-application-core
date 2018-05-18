import * as React from 'react';
import { injectable } from 'inversify';

import { isString, toClassName, uuid, isDef } from '../../../util';
import { IUIFactory } from '../../factory';
import { Button } from '../../button';
import { IUIIconConfiguration } from '../../../configurations-definitions.interface';

@injectable()
export class UIMaterialFactory implements IUIFactory {
  public icons = 'material-icons';
  public persistentDrawerToolbarSpacer = 'mdc-drawer__toolbar-spacer';
  public toolbar = 'mdc-toolbar';
  public toolbarSection = 'mdc-toolbar__section';
  public toolbarSectionAlignEnd = 'mdc-toolbar__section--align-end';
  public toolbarSectionAlignStart = 'mdc-toolbar__section--align-start';
  public toolbarRow = 'mdc-toolbar__row';
  public toolbarTitle = 'mdc-toolbar__title';
  public toolbarMenuIcon = 'mdc-toolbar__menu-icon';
  public list = 'mdc-list';
  public listTwoLine = 'mdc-list--two-line';
  public listAvatar = 'mdc-list--avatar-list';
  public listNonInteractive = 'mdc-list--non-interactive';
  public tabBarIndicator = 'mdc-tab-bar__indicator';
  public tabBarScrollerFrameTabs = 'mdc-tab-bar-scroller__scroll-frame__tabs';
  public tabBarScrollerFrame = 'mdc-tab-bar-scroller__scroll-frame';
  public tabBar = 'mdc-tab-bar';
  public tab = 'mdc-tab';
  public tabIcon = 'mdc-tab__icon';
  public tabIconText = 'mdc-tab__icon-text';
  public tabActive = 'mdc-tab--active';
  public tabBarScroller = 'mdc-tab-bar-scroller';
  public tabBarScrollerIndicator = 'mdc-tab-bar-scroller__indicator';
  public tabBarScrollerIndicatorBack = 'mdc-tab-bar-scroller__indicator--back';
  public tabBarScrollerIndicatorForward = 'mdc-tab-bar-scroller__indicator--forward';
  public tabBarScrollerIndicatorInner = 'mdc-tab-bar-scroller__indicator__inner';
  public button = 'mdc-button';
  public listItem = 'mdc-list-item';
  public listItemGraphic = 'mdc-list-item__graphic';
  public listItemMeta = 'mdc-list-item__meta';
  public listItemText = 'mdc-list-item__text';
  public listItemSecondaryText = 'mdc-list-item__secondary-text';
  public listDivider = 'mdc-list-divider';
  public listGroupSubHeader = 'mdc-list-group__subheader';
  public formField = 'mdc-form-field';
  public textField = 'mdc-text-field';
  public textFieldBox = 'mdc-text-field--box';
  public checkbox = 'mdc-checkbox';
  public textFieldInput = 'mdc-text-field__input';
  public textFieldTextArea = 'mdc-text-field--textarea';
  public textFieldFocused = 'mdc-text-field--focused';
  public textFieldInvalid = 'mdc-text-field--invalid';
  public textFieldUpgraded = 'mdc-text-field--upgraded';
  public textFieldHelpText = 'mdc-text-field-helper-text';
  public textFieldValidationText = 'mdc-text-field-helper-text--validation-msg';
  public textFieldLabel = 'mdc-floating-label';
  public textFieldFocusedLabel = 'mdc-floating-label--float-above';
  public checkboxInput = 'mdc-checkbox__native-control';
  public card = 'mdc-card';
  public cardActions = 'mdc-card__actions';
  public cardActionButtons = 'mdc-card__action-buttons';
  public cardActionIcons = 'mdc-card__action-icons';
  public rippleSurface = 'mdc-ripple-surface';
  public menuAnchor = 'mdc-menu-anchor';
  public menu = 'mdc-menu';
  public menuItems = 'mdc-menu__items';
  public fab = 'mdc-fab';
  public dialog = 'mdc-dialog';
  public dialogSurface = 'mdc-dialog__surface';
  public dialogBody = 'mdc-dialog__body';
  public dialogHeader = 'mdc-dialog__header';
  public dialogHeaderTitle = 'mdc-dialog__header__title';
  public dialogBackdrop = 'mdc-dialog__backdrop';
  public dialogFooter = 'mdc-dialog__footer';
  public dialogFooterButton = 'mdc-dialog__footer__button';
  public dialogFooterButtonCancel = 'mdc-dialog__footer__button--cancel';
  public dialogFooterButtonAccept = 'mdc-dialog__footer__button--accept';

  /**
   * @stable [18.05.2018]
   * @param {UniversalUIIconConfigurationT} cfg
   * @returns {JSX.Element}
   */
  public makeIcon(cfg: IUIIconConfiguration | string): JSX.Element {
    if (!cfg) {
      return null;
    }
    const config = this.toIconConfig(cfg);
    const className = toClassName(this.icons, config.className);
    return isDef(config.onClick) && !config.simple
      ? (
        <Button key={uuid()}
                notApplyFrameworkClassName={true}
                disabled={config.disabled}
                onClick={config.onClick}
                className={className}>
          {config.type}
        </Button>
      )
      : (
        <i key={uuid()}
           title={config.title}
           onClick={config.onClick}
           className={className}>
          {config.type}
        </i>
      );
  }

  /**
   * @stable [18.05.2018]
   * @param {IUIIconConfiguration | string} cfg
   * @returns {JSX.Element}
   */
  public makeTabBarScrollerIndicatorIcon(cfg: IUIIconConfiguration | string): JSX.Element {
    const config = this.toIconConfig(cfg);
    return this.makeIcon(
      cfg
        ? {
          ...config,
          className: toClassName(config.className, this.tabBarScrollerIndicatorInner),
        }
        : cfg
    );
  }

  /**
   * @stable [18.05.2018]
   * @param {IUIIconConfiguration | string} cfg
   * @returns {JSX.Element}
   */
  public makeListItemMetaIcon(cfg: IUIIconConfiguration | string): JSX.Element {
    const config = this.toIconConfig(cfg);
    return this.makeIcon(
      cfg
        ? {
          ...config,
          className: toClassName(config.className, this.listItemMeta),
        }
        : cfg
    );
  }

  public makeCheckboxAttachment(): JSX.Element {
    return (
      <div className='mdc-checkbox__background'>
        <svg className='mdc-checkbox__checkmark'
             viewBox='0 0 24 24'>
          <path className='mdc-checkbox__checkmark-path'
                fill='none'
                stroke='white'
                d='M1.73,12.91 8.1,19.28 22.79,4.59'/>
        </svg>
        <div className='mdc-checkbox__mixedmark'/>
      </div>
    );
  }

  /**
   * @stable [18.05.2018]
   * @param {UniversalUIIconConfigurationT} cfg
   * @returns {IUIIconConfiguration}
   */
  private toIconConfig(cfg: IUIIconConfiguration | string): IUIIconConfiguration {
    return (isString(cfg) ? {type: cfg} : cfg)  as IUIIconConfiguration;
  }
}
