import * as React from 'react';
import * as R from 'ramda';
import { LoggerFactory, ILogger } from 'ts-smart-logger';

import { BaseTextField } from '../textfield';
import { cancelEvent, orNull, downloadBlob, toClassName } from '../../../util';
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
import { toLastAddedMultiItemEntity } from '../multifield';
import { IUniversalDialog, Dialog } from '../../dialog';
import { WebCamera, IWebCamera } from '../../web-camera';
import { IBasicEvent } from '../../../react-definitions.interface';

export class BaseFileField<TComponent extends BaseFileField<TComponent, TProps, TState>,
                           TProps extends IBaseFileFieldProps,
                           TState extends IBaseFileFieldState>
    extends BaseTextField<TComponent, TProps, TState> {

  protected static readonly logger = LoggerFactory.makeLogger('BaseFileField');

  protected multiFieldPlugin = new MultiFieldPlugin(this);
  private filesMap = new Map<EntityIdT, Blob>();

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

    const actions: IFieldActionConfiguration[] = [
      orNull<IFieldActionConfiguration>(props.useCamera, () => ({type: 'video', onClick: this.openCameraDialog})),
      {type: 'attach_file', onClick: this.openFileDialog},
      orNull<IFieldActionConfiguration>(props.useDownloadAction, () => ({type: 'cloud_download', onClick: this.downloadFile}))
    ];
    this.defaultActions = R.insertAll<IFieldActionConfiguration>(0, actions.filter((cfg) => !R.isNil(cfg)), this.defaultActions);
  }

  /**
   * @stable [28.06.2018]
   */
  public componentWillUnmount(): void {
    super.componentWillUnmount();

    this.filesMap.forEach((value, key) => this.destroyBlob(key));
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
      this.destroyBlob(currentValue);
      this.multiFieldPlugin.onDeleteItem({id: currentValue});
    }
  }

  /**
   * @stable [28.06.2018]
   * @param {IBasicEvent} event
   */
  protected onClick(event: IBasicEvent): void {
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
            orNull<JSX.Element>(
              state.cameraEnabled,
              () => (
                <WebCamera ref='camera'
                           onSelect={this.doSelectBlob}/>
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
    return toClassName(super.getFieldClassName(), 'rac-filefield');
  }

  /**
   * @stable [14.01.2019]
   * @param {AnyT} value
   * @returns {string}
   */
  protected prepareValueBeforeDisplaying(value: AnyT): string {
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
   * @param {File[]} file
   */
  private onSelect(file: File[]): void {
    if (!this.props.multi) {
      this.clearValue();
    }
    this.doSelectBlob(file[0]);
  }

  /**
   * @stable [02.08.2018]
   * @param {Blob} blob
   */
  private doSelectBlob(blob: Blob): void {
    const fileUrl = URL.createObjectURL(blob);

    this.filesMap.set(fileUrl, blob);
    this.multiFieldPlugin.onAddItem({id: fileUrl});

    this.setFocus();
  }

  private get dnd(): IDnd {
    return this.refs.dnd as IDnd;
  }

  /**
   * @stable [02.08.2018]
   * @param {IBasicEvent} event
   */
  private openCameraDialog(event: IBasicEvent): void {
    cancelEvent(event);
    this.setState({cameraEnabled: true});
    this.cameraDialog.activate();
  }

  /**
   * @stable [28.06.2018]
   * @param {IBasicEvent} event
   */
  private openFileDialog(event: IBasicEvent): void {
    cancelEvent(event);
    this.dnd.open();
  }

  /**
   * @stable [28.06.2018]
   * @param {IBasicEvent} event
   */
  private downloadFile(event: IBasicEvent): void {
    cancelEvent(event);

    const url = toLastAddedMultiItemEntity(this.value);
    downloadBlob(url, this.props.fileName || url);
  }

  /**
   * @stable [28.06.2018]
   * @param {EntityIdT} key
   */
  private destroyBlob(key: EntityIdT): void {
    URL.revokeObjectURL(key as string);
    this.filesMap.delete(key);

    BaseFileField.logger.debug(`[$BasicFileField][destroyBlob] The blob has been destroyed to the key ${key}`);
  }

  /**
   * @stable [02.08.2018]
   * @returns {IUniversalDialog}
   */
  private get cameraDialog(): IUniversalDialog {
    return this.refs.cameraDialog as IUniversalDialog;
  }

  /**
   * @stable [02.08.2018]
   * @returns {IWebCamera}
   */
  private get camera(): IWebCamera {
    return this.refs.camera as IWebCamera;
  }
}
