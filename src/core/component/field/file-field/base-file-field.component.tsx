import * as React from 'react';
import * as R from 'ramda';
import { LoggerFactory, ILogger } from 'ts-smart-logger';

import { BaseTextField } from '../text-field/base-text-field.component';
import {
  ClsUtils,
  ConditionUtils,
  downloadFile,
  downloadFileAsBlob,
  FilterUtils,
  NvlUtils,
  PropsUtils,
  UuidUtils,
} from '../../../util';
import { DnD } from '../../dnd/dnd.component';
import {
  EntityIdT,
  AnyT,
} from '../../../definitions.interface';
import { MultiFieldPlugin } from '../multifield/multifield.plugin';
import { toLastAddedMultiItemEntityId } from '../multifield';
import { Dialog } from '../../dialog/dialog.component';
import { WebCamera } from '../../web-camera/web-camera.component';
import {
  ChangeEventT,
  ComponentClassesEnum,
  FieldActionTypesEnum,
  FieldConstants,
  IBaseEvent,
  IBaseFileFieldProps,
  IBaseFileFieldState,
  IFieldActionEntity,
  IFieldInputProps,
  IKeyboardEvent,
} from '../../../definition';

export class BaseFileField<TProps extends IBaseFileFieldProps,
                           TState extends IBaseFileFieldState>
    extends BaseTextField<TProps, TState> {

  public static readonly defaultProps = PropsUtils.mergeWithParentDefaultProps<IBaseFileFieldProps>({}, BaseTextField);

  protected static readonly logger = LoggerFactory.makeLogger('BaseFileField');
  protected readonly multiFieldPlugin = new MultiFieldPlugin(this);
  private readonly cameraRef = React.createRef<WebCamera>();
  private readonly cameraDialogRef = React.createRef<Dialog>();
  private readonly dndRef = React.createRef<DnD>();

  /**
   * @stable [20.10.2020]
   * @param originalProps
   */
  constructor(originalProps: TProps) {
    super(originalProps);

    this.downloadFile = this.downloadFile.bind(this);
    this.onCameraDialogAccept = this.onCameraDialogAccept.bind(this);
    this.onCameraDialogDeactivate = this.onCameraDialogDeactivate.bind(this);
    this.onCameraSnapshotSelect = this.onCameraSnapshotSelect.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.openCameraDialog = this.openCameraDialog.bind(this);
    this.openFileDialog = this.openFileDialog.bind(this);

    const {
      useCamera,
      useDownloadAction,
    } = originalProps;

    const actions = FilterUtils.objectValuesArrayFilter<IFieldActionEntity>(
      useCamera && ({
        type: FieldActionTypesEnum.VIDEO,
        onClick: this.openCameraDialog,
      }),
      ({
        type: FieldActionTypesEnum.ATTACH_FILE,
        onClick: this.openFileDialog,
      }),
      useDownloadAction && ({
        type: FieldActionTypesEnum.DOWNLOAD,
        disabled: () => this.isDownloadActionDisabled,
        onClick: this.downloadFile,
      })
    );
    this.defaultActions = [...actions, ...this.defaultActions];
  }

  /**
   * @stable [19.10.2020]
   * @param event
   */
  public async onChange(event: ChangeEventT): Promise<void> {
    if (this.isNativeFileFieldUsed) {
      const files = (event.target as { files?: Blob[] }).files;
      await this.onSelect(files);
    } else {
      await super.onChange(event);
    }
  }

  /**
   * @stable [20.10.2020]
   * @param event
   */
  public async onKeyBackspace(event: IKeyboardEvent): Promise<void> {
    super.onKeyBackspace(event);
    await this.clearValue();
  }

  /**
   * @stable [20.10.2020]
   * @protected
   */
  protected async doClearValue(): Promise<void> {
    const activeValue = this.multiFieldPlugin.activeValue[0];
    if (R.isNil(activeValue)) {
      return;
    }
    await this.clearValueById(activeValue.id);
  }

  /**
   * @stable [19.10.2020]
   * @param event
   * @protected
   */
  protected onClick(event: IBaseEvent): void {
    super.onClick(event);

    if (!this.isNativeFileFieldUsed) {
      this.openFileDialog(event);
    }
  }

  /**
   * @stable [19.10.2020]
   * @param event
   * @protected
   */
  protected doCancelEvent(event: IBaseEvent): void {
    if (this.isNativeFileFieldUsed) {
      return;
    }
    super.doCancelEvent(event);
  }

  /**
   * @stable [03.08.2018]
   * @returns {JSX.Element}
   */
  protected get attachmentBodyElement(): JSX.Element {
    const {
      useCamera,
    } = this.mergedProps;

    const dndElement = ConditionUtils.orNull(
      !this.isNativeFileFieldUsed,
      () => (
        <DnD
          ref={this.dndRef}
          disabled={this.isInactive}
          onSelect={this.onSelect}/>
      )
    );

    const messages = this.settings.messages;
    const cameraElement = ConditionUtils.orNull(
      useCamera,
      () => this.state.opened && (
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
    );

    return (
      <React.Fragment>
        {dndElement}
        {cameraElement}
      </React.Fragment>
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
    return ClsUtils.joinClassName(super.getFieldClassName(), 'rac-file-field');
  }

  /**
   * @stable [14.10.2020]
   * @protected
   */
  protected getInputElementProps(): IFieldInputProps {
    const attributes = super.getInputElementProps() as IFieldInputProps;

    return {
      ...attributes,
      capture: NvlUtils.nvl(
        attributes.capture,
        this.environment.mobilePlatform ? 'environment' : 'user'
      ),
      ...(
        this.isNativeFileFieldUsed
          ? {
            className: ClsUtils.joinClassName(attributes.className, ComponentClassesEnum.TRANSPARENT),
            type: 'file',
          }
          : {}
      ),
    };
  }

  /**
   * @stable [19.10.2020]
   * @param value
   * @protected
   */
  protected decorateDisplayValue(value: AnyT): string {
    if (this.isNativeFileFieldUsed) {
      return FieldConstants.DISPLAY_EMPTY_VALUE;
    }

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
   * @stable [19.10.2020]
   * @param files
   * @private
   */
  private async onSelect(files: Blob[]): Promise<void> {
    const {
      multi,
    } = this.originalProps;

    const file = files[0];  // Before async call of clearValue (!)

    if (!multi) {
      await this.clearValue();
    }
    await this.doAddBlob(file);

    this.setFocus();
  }

  /**
   * @stable [19.10.2020]
   * @param blob
   * @private
   */
  private async doAddBlob(blob: Blob): Promise<void> {
    const url = UuidUtils.uuid();
    await this.databaseStorage.set(url, blob);

    this.multiFieldPlugin.onAddItem({id: url});
  }

  /**
   * @stable [19.10.2020]
   * @param blob
   * @private
   */
  private async onCameraSnapshotSelect(blob: Blob): Promise<void> {
    await this.onSelect([blob]);
  }

  /**
   * @stable [19.10.2020]
   * @param event
   * @private
   */
  private openCameraDialog(event: IBaseEvent): void {
    this.setState({opened: true}, () => this.cameraDialog.activate());
  }

  /**
   * @stable [19.10.2020]
   * @param event
   * @private
   */
  private openFileDialog(event: IBaseEvent): void {
    if (this.isNativeFileFieldUsed) {
      this.input.click();
    } else {
      this.dnd.open();
    }
  }

  /**
   * @stable [19.10.2020]
   * @param id
   * @private
   */
  private async clearValueById(id: EntityIdT): Promise<void> {
    await this.databaseStorage.remove(id as string);
    this.multiFieldPlugin.onDeleteItem({id});
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
   * @stable [19.10.2020]
   * @private
   */
  private get isDownloadActionDisabled(): boolean {
    return this.isDisabled || this.isBusy || this.isValueNotPresent;
  }

  /**
   * @stable [19.10.2020]
   * @private
   */
  private get isNativeFileFieldUsed(): boolean {
    return this.environment.mobilePlatform;
  }

  /**
   * @stable [20.10.2020]
   * @private
   */
  private get camera(): WebCamera {
    return this.cameraRef.current;
  }

  /**
   * @stable [20.10.2020]
   * @private
   */
  private get cameraDialog(): Dialog {
    return this.cameraDialogRef.current;
  }

  /**
   * @stable [20.10.2020]
   * @private
   */
  private get dnd(): DnD {
    return this.dndRef.current;
  }
}
