import * as React from 'react';
import { injectable } from 'inversify';

import { isString, toClassName, uuid } from '../../../util';
import { IUIFactory, UIIconConfigT } from '../../factory';
import { Button, IButtonInternalProps } from '../../button';

@injectable()
export class UIMaterialFactory implements IUIFactory {

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
  public cardActions = 'mdc-card__actions';
  public rippleSurface = 'mdc-ripple-surface';
  public menuAnchor = 'mdc-menu-anchor';
  public menu = 'mdc-menu';
  public menuItems = 'mdc-menu__items';

  public makeIcon(cfg: UIIconConfigT): JSX.Element {
    if (!cfg) {
      return null;
    }
    const config = (isString(cfg) ? { type: cfg } : cfg) as IButtonInternalProps;
    const className = toClassName('material-icons', config.className);
    return config.onClick && !config.simple
        ? (
            <Button key={uuid()}
                    noClassName={true}
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

  public makeListItemMetaIcon(cfg: UIIconConfigT): JSX.Element {
    const config = (cfg ? (isString(cfg) ? { type: cfg } : cfg) : cfg) as IButtonInternalProps;
    return this.makeIcon(!cfg ? cfg : {
      ...config,
      className: toClassName(config.className, this.listItemMeta),
    });
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
}
