import * as React from 'react';
import * as R from 'ramda';
import { LoggerFactory, ILogger } from 'ts-smart-logger';

import { BaseTextField } from '../textfield';
import { cancelEvent, orNull, downloadFileAsBlob, joinClassName, uuid, downloadFile } from '../../../util';
import { DnD, IDnd } from '../../dnd';
import {
  EntityIdT,
  IKeyboardEvent,
  AnyT,
} from '../../../definitions.interface';
import { MultiFieldPlugin } from '../multifield';
import {
  IBaseFileFieldState,
  IBaseFileFieldProps,
} from './basic-filefield.interface';
import { IFieldActionConfiguration } from '../../../configurations-definitions.interface';
import { toLastAddedMultiItemEntityId } from '../multifield';
import { IUniversalDialog2, Dialog } from '../../dialog';
import { WebCamera, IWebCamera } from '../../web-camera';
import { IBaseEvent } from '../../../definition';

export class BaseFileField<TProps extends IBaseFileFieldProps,
                           TState extends IBaseFileFieldState>
    extends BaseTextField<TProps, TState> {

  protected static readonly logger = LoggerFactory.makeLogger('BaseFileField');

  protected multiFieldPlugin = new MultiFieldPlugin(this);

  /**
   * @stable [30.06.2018]
   * @param {TProps} props
   */
  constructor(props: TProps) {
    super(props);

    this.onSelect = this.onSelect.bind(this);
    this.onCameraDialogClose = this.onCameraDialogClose.bind(this);
    this.onCameraDialogAccept = this.onCameraDialogAccept.bind(this);
    this.doSelectBlob = this.doSelectBlob.bind(this);
    this.openFileDialog = this.openFileDialog.bind(this);
    this.downloadFile = this.downloadFile.bind(this);
    this.openCameraDialog = this.openCameraDialog.bind(this);
    this.onSelectCameraSnapshot = this.onSelectCameraSnapshot.bind(this);

    const actions: IFieldActionConfiguration[] = [
      orNull<IFieldActionConfiguration>(props.useCamera, () => ({type: 'video', onClick: this.openCameraDialog})),
      {type: 'attach_file', onClick: this.openFileDialog},
      orNull<IFieldActionConfiguration>(props.useDownloadAction, (): IFieldActionConfiguration => ({
        type: 'download',
        disabled: () => this.isFieldDisabled() || this.isFieldInProgress() || !this.isValuePresent(),
        onClick: this.downloadFile,
      }))
    ];
    this.defaultActions = R.insertAll<IFieldActionConfiguration>(0, actions.filter((cfg) => !R.isNil(cfg)), this.defaultActions);
  }

  /**
   * @stable [28.06.2018]
   * @param {IKeyboardEvent} event
   */
  public onKeyEnter(event: IKeyboardEvent): void {
    super.onKeyEnter(event);
    this.openFileDialog(event);
  }

  /**
   * @stable [28.06.2018]
   * @param {IKeyboardEvent} event
   */
  public onKeyBackspace(event: IKeyboardEvent): void {
    super.onKeyBackspace(event);
    this.clearValue();
  }

  public clearValue(): void {
    const activeValue = this.multiFieldPlugin.activeValue[0];
    if (!R.isNil(activeValue)) {
      const currentValue = activeValue.id;
      this.databaseStorage.remove(currentValue as string);
      this.multiFieldPlugin.onDeleteItem({id: currentValue});
    }
  }

  /**
   * @stable [28.06.2018]
   * @param {IBaseEvent} event
   */
  protected onClick(event: IBaseEvent): void {
    super.onClick(event);
    this.openFileDialog(event);
  }

  /**
   * @stable [03.08.2018]
   * @returns {JSX.Element}
   */
  protected getAttachmentElement(): JSX.Element {
    const state = this.state;
    const props = this.props;
    const messages = this.settings.messages;

    const dndElement = (
      <DnD ref='dnd'
           disabled={this.isFieldInactive()}
           onSelect={this.onSelect}/>
    );
    if (!props.useCamera) {
      return dndElement;
    }
    return (
      <div className='rac-dnd-wrapper'>
        {dndElement}
        <Dialog ref='cameraDialog'
                title={messages.takeSnapshotMessage}
                acceptMessage={messages.acceptMessage}
                onClose={this.onCameraDialogClose}
                onAccept={this.onCameraDialogAccept}>
          {
            orNull(
              state.cameraEnabled,
              () => (
                <WebCamera
                  ref='camera'
                  onSelect={this.onSelectCameraSnapshot}/>
              )
            )
          }
        </Dialog>
      </div>
    );
  }

  /**
   * @stable [02.08.2018]
   * @returns {EntityIdT[]}
   */
  protected getEmptyValue(): EntityIdT[] {
    return [];
  }

  /**
   * @stable [05.10.2018]
   * @returns {string}
   */
  protected getFieldClassName(): string {
    return joinClassName(super.getFieldClassName(), 'rac-filefield');
  }

  /**
   * @stable [14.01.2019]
   * @param {AnyT} value
   * @returns {string}
   */
  protected decorateValueBeforeDisplaying(value: AnyT): string {
    const len = this.multiFieldPlugin.getActiveValueLength(value);
    return this.printfDisplayMessage(len > 0, len);
  }

  /**
   * @stable [02.08.2018]
   */
  private onCameraDialogClose(): void {
    this.setState({cameraEnabled: false});
  }

  /**
   * @stable [02.08.2018]
   */
  private onCameraDialogAccept(): void {
    this.camera.capture();
    this.onCameraDialogClose();
  }

  /**
   * @stable [19.12.2018]
   * @param {Blob[]} file
   */
  private onSelect(file: Blob[]): void {
    if (!this.props.multi) {
      this.clearValue();
    }
    this.doSelectBlob(file[0]);
  }

  /**
   * @stable [02.08.2018]
   * @param {Blob} blob
   */
  private async doSelectBlob(blob: Blob): Promise<void> {
    const url = uuid();
    await this.databaseStorage.set(url, blob);
    this.multiFieldPlugin.onAddItem({id: url});

    this.setFocus();
  }

  /**
   * @stable [01.08.2019]
   * @param {Blob} blob
   */
  private onSelectCameraSnapshot(blob: Blob): void {
    this.onSelect([blob]);
  }

  private get dnd(): IDnd {
    return this.refs.dnd as IDnd;
  }

  /**
   * @stable [02.08.2018]
   * @param {IBaseEvent} event
   */
  private openCameraDialog(event: IBaseEvent): void {
    cancelEvent(event);
    this.setState({cameraEnabled: true});
    this.cameraDialog.activate();
  }

  /**
   * @stable [28.06.2018]
   * @param {IBaseEvent} event
   */
  private openFileDialog(event: IBaseEvent): void {
    cancelEvent(event);
    this.dnd.open();
  }

  /**
   * @stable [28.06.2018]
   * @param {IBaseEvent} event
   */
  private async downloadFile(event: IBaseEvent): Promise<void> {
    cancelEvent(event);

    if (!this.isValuePresent()) {
      return;
    }
    const url = toLastAddedMultiItemEntityId(this.value) as string; // TODO
    const fileName = this.props.fileName || url;

    const blob = await this.databaseStorage.get(url);
    return R.isNil(blob) ? downloadFile(url, fileName) : downloadFileAsBlob(blob, fileName);
  }

  /**
   * @stable [02.08.2018]
   * @returns {IUniversalDialog2}
   */
  private get cameraDialog(): IUniversalDialog2 {
    return this.refs.cameraDialog as IUniversalDialog2;
  }

  /**
   * @stable [02.08.2018]
   * @returns {IWebCamera}
   */
  private get camera(): IWebCamera {
    return this.refs.camera as IWebCamera;
  }
}
