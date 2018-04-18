import { IKeyValue } from '../../../definitions.interface';
import { LayoutBuilderFactorEnum,  LayoutBuilderElementT } from '../../../configurations-definitions.interface';

/* @stable - 16.04.2018 */
export interface ILayoutViewBuilder {
  buildRowView(props: IKeyValue, children: JSX.Element[], factor: LayoutBuilderFactorEnum): JSX.Element;
  buildColumnView(props: IKeyValue, children: JSX.Element[], factor: LayoutBuilderFactorEnum): JSX.Element;
  buildSeparatorView(props: IKeyValue): JSX.Element;
  isReactElement(item: LayoutBuilderElementT): boolean;
  toClonedElementProps<TProps>(item: LayoutBuilderElementT, props: TProps): TProps;
}
