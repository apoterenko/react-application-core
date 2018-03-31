import { IMaterialComponentFactory, IListItemNativeMaterialComponent } from '../material.interface';
import { MaterialPlugin } from './material.plugin';
import { IListItem } from '../../list/item';

export class ListItemMaterialPlugin<TListItem extends IListItem>
  extends MaterialPlugin<TListItem, IListItemNativeMaterialComponent> {

  /**
   * @stable - 31.03.2018
   */
  constructor(component: TListItem,
              mdcFactory: IMaterialComponentFactory<IListItemNativeMaterialComponent>) {
    super(component, mdcFactory);
  }

  /**
   * @stable - 31.03.2018
   */
  public componentDidMount(): void {
    super.componentDidMount();

    if (this.component.props.active) {
      this.mdc.activate();
    }
  }
}
