import * as React from 'react';
import { injectable } from 'inversify';

import { isString, toClassName, uuid } from '../../../util';
import { IUIFactory, IIconConfig } from '../../factory';

@injectable()
export class UIMaterialFactory implements IUIFactory {

  public list = 'mdc-list';
  public listItem = 'mdc-list-item';
  public listDivider = 'mdc-list-divider';
  public listGroupSubHeader = 'mdc-list-group__subheader';
  public formField = 'mdc-form-field';
  public checkbox = 'mdc-checkbox';
  public textFieldInput = 'mdc-text-field__input';
  public textFieldFocused = 'mdc-text-field--focused';
  public textFieldHelpText = 'mdc-text-field-helptext';
  public textFieldValidationText = 'mdc-text-field-helptext--validation-msg';
  public textFieldLabel = 'mdc-text-field__label';
  public textFieldFocusedLabel = 'mdc-text-field__label--float-above';
  public checkboxInput = 'mdc-checkbox__native-control';

  public makeIcon(cfg: IIconConfig|string): JSX.Element {
    if (!cfg) {
      return null;
    }
    const config = isString(cfg) ? { type: cfg } as IIconConfig : cfg as IIconConfig;
    return config.onClick
        ? (
            <button key={uuid()}
                    disabled={config.disabled}
                    title={config.title}
                    className={
                      toClassName('material-icons', 'rac-material-icon', ...config.classes)
                    }
                    onClick={config.onClick}>
              {config.type}
            </button>
        )
        : (
            <i key={uuid()}
               title={config.title}
               className={toClassName('material-icons', ...config.classes)}>
              {config.type}
            </i>
        );
  }

  public makeCheckboxAttachment(): JSX.Element {
    return (
        <div className='mdc-checkbox__background'>
          <svg className='mdc-checkbox__checkmark'
               viewBox='0 0 24 24'>
            <path className='mdc-checkbox__checkmark__path'
                  fill='none'
                  stroke='white'
                  d='M1.73,12.91 8.1,19.28 22.79,4.59'/>
          </svg>
          <div className='mdc-checkbox__mixedmark'/>
        </div>
    );
  }
}
