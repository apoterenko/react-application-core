import * as React from 'react';
import * as R from 'ramda';

import { BasicTextField, IBasicTextFieldAction } from '../textfield';
import { DnD, IDnd } from '../../dnd';
import {
  BasicEventT,
  EntityIdT,
  KeyboardEventT,
  AnyT,
} from '../../../definition.interface';
import { MultiFieldPlugin } from '../multifield';
import {
  IBasicFileFieldInternalState,
  IBasicFileFieldInternalProps,
} from './basic-filefield.interface';

export class BasicFileField<TComponent extends BasicFileField<TComponent, TInternalProps, TInternalState>,
                            TInternalProps extends IBasicFileFieldInternalProps,
                            TInternalState extends IBasicFileFieldInternalState>
    extends BasicTextField<TComponent, TInternalProps, TInternalState> {

  protected multiFieldPlugin = new MultiFieldPlugin(this);
  private filesMap = new Map<string, File>();

  constructor(props: TInternalProps) {
    super(props);
    this.onSelect = this.onSelect.bind(this);

    this.defaultActions = R.insert<IBasicTextFieldAction>(0,
        {
          type: 'attach_file',
          actionHandler: (event: BasicEventT) => this.openFileDialog(event),
        },
        this.defaultActions
    );
  }

  public componentWillUnmount(): void {
    super.componentWillUnmount();
    this.filesMap.clear();
  }

  public onKeyEnter(event: KeyboardEventT): void {
    super.onKeyEnter(event);
    this.openFileDialog(event);
  }

  public onKeyBackspace(event: KeyboardEventT): void {
    super.onKeyBackspace(event);
    this.clearValue();
  }

  protected onClick(event: BasicEventT): void {
    super.onClick(event);
    this.openFileDialog(event);
  }

  protected getAttachment(): JSX.Element {
    return (
        <DnD ref='dnd'
             onSelect={this.onSelect}/>
    );
  }

  protected toDisplayValue(value: AnyT): EntityIdT {
    const file = this.filesMap.get(value);
    return file ? file.name : super.toDisplayValue(value);
  }

  protected onSelect(file: File[]): void {
    const selectedFile = file[0];
    const fileUrl = URL.createObjectURL(selectedFile);

    this.filesMap.set(fileUrl , selectedFile);

    this.multiFieldPlugin.onAddItem({id: fileUrl});
    this.setFocus();
  }

  protected clearValue(): void {
    const currentValue = this.value;
    this.filesMap.delete(currentValue);
    this.setFocus();

    if (this.isValuePresent()) {
      this.multiFieldPlugin.onDeleteItem({id: currentValue});
    }
  }

  private get dnd(): IDnd {
    return this.refs.dnd as IDnd;
  }

  private openFileDialog(event: BasicEventT): void {
    this.stopEvent(event);
    this.dnd.open();
  }
}
