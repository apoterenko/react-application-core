import * as React from 'react';

import {
  IClassNameWrapper,
  IFactorWrapper,
  IFullWrapper,
  IItemsWrapper,
  IKeyValue,
  ILayoutWrapper,
  IStyleWrapper,
} from '../definitions.interface';

/**
 * @enum
 * @stable [23.01.2020]
 */
export enum LayoutTypesEnum {
  HORIZONTAL,
  VERTICAL,
}

/**
 * @enum
 * @stable [23.01.2020]
 */
export enum LayoutFactorsEnum {
  FACTOR_0_25,
  FACTOR_0_30,
  FACTOR_0_5,
  FACTOR_0_70,
  FACTOR_0_75,
  FACTOR_0_85,
  FACTOR_1,
  FACTOR_2,
  FACTOR_4,
  FACTOR_8,
}

/**
 * @stable [23.01.2020]
 */
export type UniversalLayoutBuilderChildrenT<TNode> = IUniversalLayoutBuilderConfigEntity<TNode> | TNode;

/**
 * @stable [06.04.2020]
 */
export type LayoutBuilderChildrenNodeT = JSX.Element;

/**
 * @stable [23.01.2020]
 */
export type LayoutBuilderChildrenT = UniversalLayoutBuilderChildrenT<LayoutBuilderChildrenNodeT>;

/**
 * @config-entity
 * @stable [23.01.2020]
 */
export interface IUniversalLayoutBuilderConfigEntity<TNode>
  extends IItemsWrapper<Array<UniversalLayoutBuilderChildrenT<TNode>>>,
    IClassNameWrapper,
    IFactorWrapper<LayoutFactorsEnum>,
    IFullWrapper,
    ILayoutWrapper<LayoutTypesEnum>,
    IStyleWrapper<IKeyValue> {
}

/**
 * @config-entity
 * @stable [23.01.2020]
 */
export interface ILayoutBuilderConfigEntity
  extends IUniversalLayoutBuilderConfigEntity<LayoutBuilderChildrenT> {
}

/**
 * @props
 * @stable [23.01.2020]
 */
export interface IUniversalLayoutProps
  extends React.Attributes {
}

/**
 * @service
 * @stable [23.01.2020]
 */
export interface IUniversalLayoutViewBuilder<TNode, TProps extends IUniversalLayoutProps = IUniversalLayoutProps> {
  buildColumnView(props: TProps,
                  children: Array<UniversalLayoutBuilderChildrenT<TNode>>,
                  layoutConfig: IUniversalLayoutBuilderConfigEntity<TNode>): TNode;
  buildRowView(props: TProps,
               children: Array<UniversalLayoutBuilderChildrenT<TNode>>,
               layoutConfig: IUniversalLayoutBuilderConfigEntity<TNode>): TNode;
  cloneItem(item: TNode, props: TProps): TNode;
  getClonedItemProps(item: TNode, layoutConfig: IUniversalLayoutBuilderConfigEntity<TNode>, props: TProps): TProps;
  isClonedItem(item: UniversalLayoutBuilderChildrenT<TNode>): boolean;
}

/**
 * @service
 * @stable [23.01.2020]
 */
export interface ILayoutViewBuilder
  extends IUniversalLayoutViewBuilder<LayoutBuilderChildrenNodeT, React.DetailedHTMLProps<React.HTMLAttributes<{}>, {}>> {
}
