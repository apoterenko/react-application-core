import * as React from 'react';
import * as R from 'ramda';
import { LoggerFactory, ILogger } from 'ts-smart-logger';

import { BasicTextField } from '../textfield';
import { cancelEvent, orNull } from '../../../util';
import { DnD, IDnd } from '../../dnd';
import {
  BasicEventT,
  EntityIdT,
  KeyboardEventT,
} from '../../../definitions.interface';
import { MultiFieldPlugin } from '../multifield';
import {
  IBasicFileFieldInternalState,
  IBasicFileFieldInternalProps,
} from './basic-filefield.interface';
import { IFieldActionConfiguration } from '../../../configurations-definitions.interface';

export class BasicFileField<TComponent extends BasicFileField<TComponent, TInternalProps, TInternalState>,
                            TInternalProps extends IBasicFileFieldInternalProps,
                            TInternalState extends IBasicFileFieldInternalState>
    extends BasicTextField<TComponent, TInternalProps, TInternalState> {

  protected static logger = LoggerFactory.makeLogger(BasicFileField);

  protected multiFieldPlugin = new MultiFieldPlugin(this);
  private filesMap = new Map<EntityIdT, File>();

  constructor(props: TInternalProps) {
    super(props);
    this.onSelect = this.onSelect.bind(this);

    this.defaultActions = R.insert<IFieldActionConfiguration>(0,
        {
          type: 'attach_file',
          onClick: (event: BasicEventT) => this.openFileDialog(event),
        },
        this.defaultActions
    );
  }

  public componentWillReceiveProps(nextProps: Readonly<TInternalProps>, nextContext: {}): void {
    const activeValue = this.multiFieldPlugin.activeValue;
    if (R.isNil(nextProps.value) && activeValue.length > 0) {
      activeValue.forEach((item) => this.destroyBlob(item.id));
    }
  }

  public componentWillUnmount(): void {
    super.componentWillUnmount();

    this.filesMap.forEach((value, key) => this.destroyBlob(key));
  }

  public onKeyEnter(event: KeyboardEventT): void {
    super.onKeyEnter(event);
    this.openFileDialog(event);
  }

  public onKeyBackspace(event: KeyboardEventT): void {
    super.onKeyBackspace(event);
    this.clearValue();
  }

  public clearValue(): void {
    const activeValue = this.multiFieldPlugin.activeValue[0];
    const currentValue = activeValue.id;

    this.destroyBlob(currentValue);

    if (this.isValuePresent()) {
      this.multiFieldPlugin.onDeleteItem({id: currentValue});
    }
    this.setFocus();
  }

  protected onClick(event: BasicEventT): void {
    super.onClick(event);
    this.openFileDialog(event);
  }

  protected getAttachment(): JSX.Element {
    return orNull(
      !this.isDeactivated(),
      () => (
        <DnD ref='dnd'
             onSelect={this.onSelect}/>
      )
    );
  }

  protected toDisplayValue(value: EntityIdT): EntityIdT {
    const file = this.filesMap.get(value);
    return file ? file.name : super.toDisplayValue(value);
  }

  protected getEmptyValue(): EntityIdT[] {
    return [];
  }

  protected onSelect(file: File[]): void {
    const selectedFile = file[0];
    const fileUrl = URL.createObjectURL(selectedFile);

    this.filesMap.set(fileUrl , selectedFile);

    this.multiFieldPlugin.onAddItem({id: fileUrl});
    this.setFocus();
  }

  private get dnd(): IDnd {
    return this.refs.dnd as IDnd;
  }

  private openFileDialog(event: BasicEventT): void {
    cancelEvent(event);
    this.dnd.open();
  }

  private destroyBlob(key: EntityIdT): void {
    URL.revokeObjectURL(key as string);
    this.filesMap.delete(key);

    BasicFileField.logger.debug(`The blob has been destroyed on the key ${key}`);
  }
}
