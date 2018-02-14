import * as React from 'react';

import { BaseComponent, IBaseComponentInternalProps } from '../base';

export class Spacer extends BaseComponent<Spacer, IBaseComponentInternalProps, {}> {

  public render(): JSX.Element {
    return (
      <section className='rac-spacer'>
        &bull;
      </section>
    );
  }
}
