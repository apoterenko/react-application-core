import { IKeyValue } from '../../../definitions.interface';
import {
  UniversalLayoutBuilderChildrenT,
  IUniversalLayoutBuilderConfiguration,
} from '../../../configurations-definitions.interface';

export interface ILayoutViewBuilder<TNode> {
  buildRowView(props: IKeyValue,
               children: Array<UniversalLayoutBuilderChildrenT<TNode>>,
               layoutConfig: IUniversalLayoutBuilderConfiguration<TNode>): TNode;
  buildColumnView(props: IKeyValue,
                  children: Array<UniversalLayoutBuilderChildrenT<TNode>>,
                  layoutConfig: IUniversalLayoutBuilderConfiguration<TNode>): TNode;
  buildSeparatorView(props: IKeyValue): TNode;
  isClonedItem(item: UniversalLayoutBuilderChildrenT<TNode>): boolean;
  cloneItem(item: TNode, props: IKeyValue): TNode;
  getClonedItemProps(item: TNode,
                     layoutConfig: IUniversalLayoutBuilderConfiguration<TNode>, props: IKeyValue): IKeyValue;
}
