import * as React from 'react';
import * as R from 'ramda';
import { LoggerFactory, ILogger } from 'ts-smart-logger';

import { BaseTextField } from '../text-field';
import {
  downloadFile,
  downloadFileAsBlob,
  joinClassName,
  objectValuesArrayFilter,
  orNull,
  uuid,
} from '../../../util';
import { DnD } from '../../dnd';
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
import { toLastAddedMultiItemEntityId } from '../multifield';
import { Dialog } from '../../dialog';
import { WebCamera } from '../../web-camera';
import {
  FieldActionTypesEnum,
  IBaseEvent,
  IFieldActionEntity,
} from '../../../definition';

export class BaseFileField<TProps extends IBaseFileFieldProps,
                           TState extends IBaseFileFieldState>
    extends BaseTextField<TProps, TState> {

  protected static readonly logger = LoggerFactory.makeLogger('BaseFileField');
  protected readonly multiFieldPlugin = new MultiFieldPlugin(this);
  private readonly cameraRef = React.createRef<WebCamera>();
  private readonly cameraDialogRef = React.createRef<Dialog>();
  private readonly dndRef = React.createRef<DnD>();

  /**
   * @stable [30.10.2019]
   * @param {TProps} props
   */
  constructor(props: TProps) {
    super(props);

    this.doSelectBlob = this.doSelectBlob.bind(this);
    this.downloadFile = this.downloadFile.bind(this);
    this.onCameraDialogAccept = this.onCameraDialogAccept.bind(this);
    this.onCameraDialogDeactivate = this.onCameraDialogDeactivate.bind(this);
    this.onCameraSnapshotSelect = this.onCameraSnapshotSelect.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.openCameraDialog = this.openCameraDialog.bind(this);
    this.openFileDialog = this.openFileDialog.bind(this);

    const actions = objectValuesArrayFilter<IFieldActionEntity>(
      props.useCamera && {type: FieldActionTypesEnum.VIDEO, onClick: this.openCameraDialog},
      {type: FieldActionTypesEnum.ATTACH_FILE, onClick: this.openFileDialog},
      props.useDownloadAction && {
        type: FieldActionTypesEnum.DOWNLOAD,
        disabled: () => this.isDownloadActionDisabled,
        onClick: this.downloadFile,
      }
    );
    this.defaultActions = [...actions, ...this.defaultActions];
  }

  /**
   * @stable [28.06.2018]
   * @param {IBaseEvent} event
   */
  public onKeyEnter(event: IBaseEvent): void {
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
      <DnD ref={this.dndRef}
           disabled={this.isInactive}
           onSelect={this.onSelect}/>
    );
    if (!props.useCamera) {
      return dndElement;
    }
    return (
      <div className='rac-dnd-wrapper'>
        {dndElement}
        {
          orNull(
            this.state.opened,
            () => (
              <Dialog
                ref={this.cameraDialogRef}
                title={messages.takeSnapshotMessage}
                acceptText={messages.acceptMessage}
                onDeactivate={this.onCameraDialogDeactivate}
                onBeforeAccept={this.onCameraDialogAccept}
              >
                <WebCamera
                  ref={this.cameraRef}
                  onSelect={this.onCameraSnapshotSelect}/>
              </Dialog>
            )
          )
        }
      </div>
    );
  }

  /**
   * @stable [02.08.2018]
   * @returns {EntityIdT[]}
   */
  protected get originalEmptyValue(): EntityIdT[] {
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
  protected decorateDisplayValue(value: AnyT): string {
    const len = this.multiFieldPlugin.getActiveValueLength(value);
    return this.buildDisplayMessage(len > 0, len);
  }

  /**
   * @stable [11.05.2020]
   */
  private onCameraDialogDeactivate(): void {
    this.setState({opened: false});
  }

  /**
   * @stable [11.05.2020]
   */
  private onCameraDialogAccept(): void {
    this.camera.capture();
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
  private onCameraSnapshotSelect(blob: Blob): void {
    this.onSelect([blob]);
  }

  private get dnd(): DnD {
    return this.dndRef.current;
  }

  /**
   * @stable [02.08.2018]
   * @param {IBaseEvent} event
   */
  private openCameraDialog(event: IBaseEvent): void {
    this.setState({opened: true}, () => this.cameraDialog.activate());
  }

  /**
   * @stable [28.06.2018]
   * @param {IBaseEvent} event
   */
  private openFileDialog(event: IBaseEvent): void {
    this.dnd.open();
  }

  /**
   * @stable [28.06.2018]
   * @param {IBaseEvent} event
   */
  private async downloadFile(event: IBaseEvent): Promise<void> {
    if (this.isValueNotPresent) {
      return;
    }
    const url = toLastAddedMultiItemEntityId(this.value) as string; // TODO
    const fileName = this.props.fileName || url;

    const blob = await this.databaseStorage.get(url);
    return R.isNil(blob) ? downloadFile(url, fileName) : downloadFileAsBlob(blob, fileName);
  }

  /**
   * @stable [15.02.2020]
   * @returns {Dialog}
   */
  private get cameraDialog(): Dialog {
    return this.cameraDialogRef.current;
  }

  /**
   * @stable [14.02.2020]
   * @returns {WebCamera}
   */
  private get camera(): WebCamera {
    return this.cameraRef.current;
  }

  /**
   * @stable [30.10.2019]
   * @returns {boolean}
   */
  private get isDownloadActionDisabled(): boolean {
    return this.isDisabled || this.isFieldBusy() || this.isValueNotPresent;
  }
}
