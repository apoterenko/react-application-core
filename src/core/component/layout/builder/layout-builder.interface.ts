import { IKeyValue } from '../../../definitions.interface';
import {
  UniversalLayoutBuilderElementT,
  IUniversalLayoutBuilderConfiguration,
} from '../../../configurations-definitions.interface';

export interface ILayoutViewBuilder<TNode> {
  buildRowView(props: IKeyValue,
               children: Array<UniversalLayoutBuilderElementT<TNode>>,
               layoutConfig: IUniversalLayoutBuilderConfiguration<TNode>): TNode;
  buildColumnView(props: IKeyValue,
                  children: Array<UniversalLayoutBuilderElementT<TNode>>,
                  layoutConfig: IUniversalLayoutBuilderConfiguration<TNode>): TNode;
  buildSeparatorView(props: IKeyValue): TNode;
  isClonedItem(item: UniversalLayoutBuilderElementT<TNode>): boolean;
  cloneItem(item: TNode, props: IKeyValue): TNode;
  getClonedItemProps(item: UniversalLayoutBuilderElementT<TNode>,
                     layoutConfig: IUniversalLayoutBuilderConfiguration<TNode>, props: IKeyValue): IKeyValue;
}
