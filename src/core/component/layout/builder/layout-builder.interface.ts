import * as React from 'react';

import { IKeyValue } from '../../../definitions.interface';
import {
  LayoutBuilderElementT,
  ILayoutBuilderConfiguration,
} from '../../../configurations-definitions.interface';

export interface ILayoutViewBuilder {
  buildRowView(props: IKeyValue, children: React.ReactNode[], layoutConfig: ILayoutBuilderConfiguration, root: boolean): React.ReactNode;
  buildColumnView(props: IKeyValue, children: React.ReactNode[], layoutConfig: ILayoutBuilderConfiguration, root: boolean): React.ReactNode;
  buildSeparatorView(props: IKeyValue): React.ReactNode;
  isReactElement(item: LayoutBuilderElementT): boolean;
  cloneReactElement(item: JSX.Element, props: React.ClassAttributes<{}>): JSX.Element;
  toClonedElementProps(item: LayoutBuilderElementT,
                       layoutConfig: ILayoutBuilderConfiguration,
                       props: React.ClassAttributes<{}>): React.ClassAttributes<{}>;
}
