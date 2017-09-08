import * as React from 'react';
import * as ramda from 'ramda';

import { IMaterialComponentFactory, MaterialComponent } from 'core/component/material';
import { AnyT } from 'core/definition.interface';

import { IDrawerInternalProps, INativeMaterialDrawerComponent } from './drawer.interface';

export class Drawer<TComponent extends Drawer<TComponent>>
    extends MaterialComponent<TComponent,
                              IDrawerInternalProps,
                              {},
                              INativeMaterialDrawerComponent> {

  constructor(props: IDrawerInternalProps,
              mdcFactory: IMaterialComponentFactory<INativeMaterialDrawerComponent>) {
    super(props, mdcFactory);
  }

  public componentWillReceiveProps(nextProps: Readonly<IDrawerInternalProps>, nextContext: AnyT): void {
    super.componentWillReceiveProps(nextProps, nextContext);

    if (!ramda.equals(nextProps.opened, this.props.opened)) {
      this.nativeMdcInstance.open = nextProps.opened;
    }
  }

  public componentDidMount(): void {
    super.componentDidMount();
    this.nativeMdcInstance.open = this.props.opened;
  }

  public render() {
    return (
      <aside ref='self'
           className='mdc-persistent-drawer'>
        <nav className='mdc-persistent-drawer__drawer'>
          {this.props.children}
        </nav>
      </aside>
    );
  }
}
