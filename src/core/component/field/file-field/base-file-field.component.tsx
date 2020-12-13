import * as React from 'react';
import * as R from 'ramda';
import {
  LoggerFactory,
  ILogger,
} from 'ts-smart-logger';

import { BaseTextField } from '../text-field/base-text-field.component';
import {
  ClsUtils,
  ConditionUtils,
  FilterUtils,
  NvlUtils,
  ObjectUtils,
  PropsUtils,
  UuidUtils,
} from '../../../util';
import { DnD } from '../../dnd/dnd.component';
import {
  AnyT,
  EntityIdT,
  IEntity,
} from '../../../definitions.interface';
import { MultiFieldPlugin } from '../multifield/multifield.plugin';
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
  /**/
  private readonly dndRef = React.createRef<DnD>();
  private readonly videoDialogRef = React.createRef<Dialog>();
  private readonly videoRef = React.createRef<WebCamera>();

  /**
   * @stable [20.10.2020]
   * @param originalProps
   */
  constructor(originalProps: TProps) {
    super(originalProps);

    this.downloadFile = this.downloadFile.bind(this);
    this.onAttachFileClick = this.onAttachFileClick.bind(this);
    this.onCameraActionClick = this.onCameraActionClick.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onVideoDialogAccept = this.onVideoDialogAccept.bind(this);
    this.onVideoDialogDeactivate = this.onVideoDialogDeactivate.bind(this);
    this.onVideoSnapshotSelect = this.onVideoSnapshotSelect.bind(this);
    this.openVideoDialog = this.openVideoDialog.bind(this);

    const {
      useCamera,
      useDownload,
      useVideo,
    } = originalProps;

    const actions = FilterUtils.objectValuesArrayFilter<IFieldActionEntity>(
      useVideo && ({
        type: FieldActionTypesEnum.VIDEO,
        onClick: this.openVideoDialog,
      }),
      useCamera && ({
        type: FieldActionTypesEnum.CAMERA,
        disabled: () => this.isCameraActionDisabled,
        onClick: this.onCameraActionClick,
      }),
      ({
        type: FieldActionTypesEnum.ATTACH_FILE,
        onClick: this.onAttachFileClick,
      }),
      useDownload && ({
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
   * @stable [09.11.2020]
   * @param url
   */
  public doAddItem(url: string): void {
    if (ObjectUtils.isObjectNotEmpty(url)) {
      this.multiFieldPlugin.onAddItem({id: url});
    }
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
      this.onAttachFileClick();
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
   * @stable [07.11.2020]
   * @protected
   */
  protected get attachmentBodyElement(): JSX.Element {
    const {
      useVideo,
    } = this.originalProps;

    const dndElement = ConditionUtils.orNull(
      !this.isNativeFileFieldUsed,
      () => (
        <DnD
          ref={this.dndRef}
          disabled={this.isInactive}
          onSelect={this.onSelect}/>
      )
    );

    const {
      ACCEPT,
      TAKE_SNAPSHOT,
    } = this.settings.messages;

    const videoElement = ConditionUtils.orNull(
      useVideo && this.state.$$videoOpened,
      () => (
        <Dialog
          ref={this.videoDialogRef}
          title={TAKE_SNAPSHOT}
          acceptText={ACCEPT}
          onDeactivate={this.onVideoDialogDeactivate}
          onBeforeAccept={this.onVideoDialogAccept}
        >
          <WebCamera
            ref={this.videoRef}
            onSelect={this.onVideoSnapshotSelect}/>
        </Dialog>
      )
    );

    return (
      <React.Fragment>
        {dndElement}
        {videoElement}
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
  private onVideoDialogDeactivate(): void {
    this.setState({$$videoOpened: false});
  }

  /**
   * @stable [11.05.2020]
   */
  private onVideoDialogAccept(): void {
    this.video.capture();
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

    this.doAddItem(url);
  }

  /**
   * @stable [19.10.2020]
   * @param blob
   * @private
   */
  private async onVideoSnapshotSelect(blob: Blob): Promise<void> {
    await this.onSelect([blob]);
  }

  /**
   * @stable [19.10.2020]
   * @private
   */
  private openVideoDialog(): void {
    this.setState({$$videoOpened: true}, () => this.videoDialog.activate());
  }

  /**
   * @stable [07.11.2020]
   * @private
   */
  private onCameraActionClick(): void {
    ConditionUtils.ifNotNilThanValue(this.originalProps.onCamera, (onCamera) => onCamera());
  }

  /**
   * @stable [19.10.2020]
   * @private
   */
  private onAttachFileClick(): void {
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
   * @stable [13.12.2020]
   * @private
   */
  private async downloadFile(): Promise<void[]> {
    const entities = this.fieldConverter
      .fromNotMultiFieldValueToEntities(
        this.fieldConverter
          .fromMultiFieldValueToDefinedEntities(this.value)
      );

    const blobs = await Promise.all(
      entities
        .map((entity: IEntity) => this.databaseStorage.get(entity.id as string))
    );

    const {
      fileName,
    } = this.originalProps;

    return Promise.all(
      blobs.map((data, index) => {
        const url = entities[index].id as string;
        const actualFileName = NvlUtils.nvl(fileName, url);

        return R.isNil(data)
          ? this.domAccessor.downloadFile({url, fileName: actualFileName})
          : this.domAccessor.downloadFileByBlob({data, fileName: actualFileName});
      })
    );
  }

  /**
   * @stable [09.11.2020]
   * @private
   */
  private get isDownloadActionDisabled(): boolean {
    return this.isValueNotPresent;
  }

  /**
   * @stable [19.10.2020]
   * @private
   */
  private get isCameraActionDisabled(): boolean {
    return this.originalProps.cameraActionDisabled;
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
  private get video(): WebCamera {
    return this.videoRef.current;
  }

  /**
   * @stable [20.10.2020]
   * @private
   */
  private get videoDialog(): Dialog {
    return this.videoDialogRef.current;
  }

  /**
   * @stable [20.10.2020]
   * @private
   */
  private get dnd(): DnD {
    return this.dndRef.current;
  }
}
