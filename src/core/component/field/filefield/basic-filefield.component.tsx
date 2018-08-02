import * as React from 'react';
import * as R from 'ramda';
import { LoggerFactory, ILogger } from 'ts-smart-logger';

import { BasicTextField } from '../textfield';
import { cancelEvent, orNull, downloadBlob } from '../../../util';
import { DnD, IDnd } from '../../dnd';
import {
  IBasicEvent,
  EntityIdT,
  IKeyboardEvent,
} from '../../../definitions.interface';
import { MultiFieldPlugin } from '../multifield';
import {
  IBasicFileFieldInternalState,
  IBasicFileFieldInternalProps,
} from './basic-filefield.interface';
import { IFieldActionConfiguration } from '../../../configurations-definitions.interface';
import { toLastAddedMultiItemEntity } from '../multifield';
import { IUniversalDialog, Dialog } from '../../dialog';
import { WebCamera, IWebCamera } from '../../web-camera';

export class BasicFileField<TComponent extends BasicFileField<TComponent, TProps, TInternalState>,
                            TProps extends IBasicFileFieldInternalProps,
                            TInternalState extends IBasicFileFieldInternalState>
    extends BasicTextField<TComponent, TProps, TInternalState> {

  protected static readonly logger = LoggerFactory.makeLogger(BasicFileField);

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
    const currentValue = activeValue.id;

    this.destroyBlob(currentValue);

    if (this.isValuePresent()) {
      this.multiFieldPlugin.onDeleteItem({id: currentValue});
    }
    this.setFocus();
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
   * @stable [28.06.2018]
   * @returns {JSX.Element}
   */
  protected getAttachment(): JSX.Element {
    const state = this.state;
    const dndElement = (
      <DnD ref='dnd'
           onSelect={this.onSelect}/>
    );
    if (!this.props.useCamera) {
      return dndElement;
    }
    return orNull<JSX.Element>(
      !this.isDeactivated(),
      () => (
        <div className='rac-dnd-wrapper'>
          {dndElement}
          <Dialog ref='cameraDialog'
                  autoWidth={true}
                  title={this.settings.messages.takeSnapshotMessage}
                  acceptMessage={this.settings.messages.acceptMessage}
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
      )
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
   * @stable [02.08.2018]
   * @param {File[]} file
   */
  private onSelect(file: File[]): void {
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

    BasicFileField.logger.debug(`[$BasicFileField][destroyBlob] The blob has been destroyed to the key ${key}`);
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
