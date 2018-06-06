import * as React from 'react';

import { IFieldChangeEntity, IListEntity } from '../../../entities-definitions.interface';
import { Grid } from '../../grid';
import { INITIAL_APPLICATION_LIST_STATE } from '../../list';
import { IGridFieldProps, IGridFieldState } from './gridfield.interface';
import { MultiField } from '../multifield';

export class GridField extends MultiField<GridField, IGridFieldProps, IGridFieldState> {

  /**
   * @stable [02.06.2018]
   * @param {IGridFieldProps} props
   */
  constructor(props: IGridFieldProps) {
    super(props);
    this.onChangeRowField = this.onChangeRowField.bind(this);
  }

  /**
   * @stable [02.06.2018]
   * @returns {JSX.Element}
   */
  protected getAttachment(): JSX.Element {
    const props = this.props;
    const gridListEntity: IListEntity = {
      ...INITIAL_APPLICATION_LIST_STATE,
      data: this.multiFieldPlugin.activeValue,
    };

    return (
      <Grid onChange={this.onChangeRowField}
            deactivated={this.isDeactivated()}
            emptyDataMessage={this.settings.messages.noSelectedItems}
            {...props.gridConfiguration}
            {...gridListEntity}/>
    );
  }

  /**
   * @stable [07.06.2018]
   * @param {IFieldChangeEntity} fieldChangeEntity
   */
  private onChangeRowField(fieldChangeEntity: IFieldChangeEntity): void {
    this.multiFieldPlugin.onEditItem({id: fieldChangeEntity.rawData.id, ...fieldChangeEntity});
  }
}
