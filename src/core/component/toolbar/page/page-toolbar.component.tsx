import * as React from 'react';

import { BaseComponent } from '../../../component/base';

import { IPageToolbarInternalProps } from './page-toolbar.interface';

export class PageToolbar extends BaseComponent<PageToolbar, IPageToolbarInternalProps, {}> {

  constructor(props: IPageToolbarInternalProps) {
    super(props);
    this.onLeft = this.onLeft.bind(this);
    this.onRight = this.onRight.bind(this);
  }

  public render(): JSX.Element {
    const props = this.props;
    const className = ['mdc-toolbar', 'app-toolbar', props.className];
    const contentTpl = props.contentDisplay === false
        ? (
            <div className='mdc-toolbar__row'/>
        )
        : (
            <div className='mdc-toolbar__row'>
              <section className='app-toolbar-west-column'>
                {props.children}
              </section>
              <section className='app-toolbar-east-column'>
                <div className='material-icons mdc-toolbar__icon'
                     onClick={this.onLeft}>
                  keyboard_arrow_left
                </div>
                <div className='material-icons mdc-toolbar__icon'
                     onClick={this.onRight}>
                  keyboard_arrow_right
                </div>
              </section>
            </div>
        );

    return (
        <div className={className.filter((cls) => !!cls).join(' ')}>
          {contentTpl}
        </div>
    );
  }

  private onLeft(): void {
    if (this.props.onBackward) {
      this.props.onBackward();
    }
  }

  private onRight(): void {
    if (this.props.onForward) {
      this.props.onForward();
    }
  }
}
