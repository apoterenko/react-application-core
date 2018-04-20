import * as React from 'react';

import { IKeyValue } from '../../../definitions.interface';
import { ILayoutViewBuilder } from './layout-builder.interface';
import { ILayoutBuilderConfiguration, LayoutBuilderElementT } from '../../../configurations-definitions.interface';
import { isDef } from '../../../util';

export class DefaultLayoutViewBuilder implements ILayoutViewBuilder {

  public buildRowView(props: IKeyValue, children: React.ReactNode[], layoutConfig: ILayoutBuilderConfiguration): React.ReactNode {
    return {
      ...layoutConfig.factor ? { factor: layoutConfig.factor } : {},
      columns: children,
    };
  }

  public buildColumnView(props: IKeyValue, children: React.ReactNode[], layoutConfig: ILayoutBuilderConfiguration): React.ReactNode {
    return {
      ...layoutConfig.factor ? { factor: layoutConfig.factor } : {},
      rows: children,
    };
  }

  public buildSeparatorView(props: IKeyValue): React.ReactNode {
    return {
      separator: null,
    };
  }

  public isReactElement(item: LayoutBuilderElementT): boolean {
    return isDef((item as JSX.Element).props);
  }

  public cloneReactElement(item: JSX.Element, props: React.ClassAttributes<{}>): JSX.Element {
    return item;
  }

  public toClonedElementProps(item: LayoutBuilderElementT, layoutConfig: ILayoutBuilderConfiguration, props: React.ClassAttributes<{}>): React.ClassAttributes<{}> {
    return props;
  }
}
