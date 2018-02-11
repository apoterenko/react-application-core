import * as React from 'react';

import { uuid, toClassName } from '../../../util';
import { ILayoutConfig, LayoutEnum, LayoutElementT, LayoutFactorEnum } from './layout-builder.interface';

export class LayoutBuilder {

  private index: number;

  constructor(private formId: string  // This way React can handle the minimal DOM change.
  ) {
  }

  public build(layoutConfig: ILayoutConfig): JSX.Element {
    this.index = 0;   // React keys magic
    return this.buildLayout(layoutConfig);
  }

  private buildLayout(layoutConfig: ILayoutConfig): JSX.Element {
    if (layoutConfig.layout === LayoutEnum.HORIZONTAL) {
      return this.buildHorizontalLayout(layoutConfig.children, layoutConfig.factor);
    }
    return this.buildVerticalLayout(layoutConfig.children, layoutConfig.factor);
  }

  private buildHorizontalLayout(items: LayoutElementT[], factor: LayoutFactorEnum): JSX.Element {
    const children = [];
    items.forEach((item, index) => {
      children.push(this.clone(item));
      if (index < items.length - 1) {
        children.push(<div key={uuid()} className='rac-flex-separator'/>);
      }
    });
    return (
      <div key={this.key}
           className={toClassName(
             'rac-flex',
             'rac-flex-row',
             this.toFactoryClassName(factor)
           )}>
        {children}
      </div>
    );
  }

  private buildVerticalLayout(items: LayoutElementT[], factor: LayoutFactorEnum): JSX.Element {
    return (
      <div key={this.key}
           className={toClassName(
             'rac-flex',
             'rac-flex-column',
             this.toFactoryClassName(factor)
           )}>
        {items.map((item) => this.clone(item))}
      </div>
    );
  }

  private clone(item: LayoutElementT): LayoutElementT {
    const itemAsElement = item as JSX.Element;
    const type = itemAsElement.type;

    return React.PureComponent.isPrototypeOf(type)
      ? React.cloneElement<{}, {}>(itemAsElement, { key: itemAsElement.props.name || uuid() })
      : this.buildLayout(item as ILayoutConfig);
  }

  private get key(): string {
    return `${this.formId}-${this.index++}`;
  }

  private toFactoryClassName(factor: LayoutFactorEnum): string {
    switch (factor) {
      case LayoutFactorEnum.FACTOR_2:
        return 'rac-flex-full-x2';
      case LayoutFactorEnum.FACTOR_4:
        return 'rac-flex-full-x4';
      case LayoutFactorEnum.FACTOR_8:
        return 'rac-flex-full-x8';
      default:
        return 'rac-flex-full';
    }
  }
}
