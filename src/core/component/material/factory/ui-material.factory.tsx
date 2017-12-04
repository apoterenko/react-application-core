import * as React from 'react';
import { injectable } from 'inversify';

import { isString, toClassName, uuid } from '../../../util';
import { IUIFactory, IIconConfig } from '../../factory';

@injectable()
export class UIMaterialFactory implements IUIFactory {

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
}
