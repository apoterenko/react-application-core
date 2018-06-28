import * as React from 'react';
import * as R from 'ramda';
import { LoggerFactory, ILogger } from 'ts-smart-logger';
import * as Webcam from 'webcamjs';

import { BasicTextField } from '../textfield';
import { cancelEvent, orNull, downloadBlob, toBlobEntities, uuid } from '../../../util';
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
import { Button } from '../../button';
import { FlexLayout } from '../../layout';

export class BasicFileField<TComponent extends BasicFileField<TComponent, TProps, TInternalState>,
                            TProps extends IBasicFileFieldInternalProps,
                            TInternalState extends IBasicFileFieldInternalState>
    extends BasicTextField<TComponent, TProps, TInternalState> {

  protected static readonly logger = LoggerFactory.makeLogger(BasicFileField);

  private static readonly CAMERA_ID = uuid(true);

  protected multiFieldPlugin = new MultiFieldPlugin(this);
  private filesMap = new Map<EntityIdT, Blob>();

  /**
   * @stable [28.06.2018]
   * @param {TProps} props
   */
  constructor(props: TProps) {
    super(props);

    this.onSelect = this.onSelect.bind(this);
    this.doCapture = this.doCapture.bind(this);
    this.onCapture = this.onCapture.bind(this);

    this.defaultActions = R.insertAll<IFieldActionConfiguration>(
      0,
      [{
        type: 'attach_file',
        onClick: (event: IBasicEvent) => this.openFileDialog(event),
      }].concat(
        props.useDownloadAction
          ? [
            {
              type: 'cloud_download',
              onClick: (event: IBasicEvent) => this.downloadFile(event),
            }
          ]
          : []
      ),
      this.defaultActions
    );
  }

  /**
   * @stable [28.06.2018]
   */
  public componentDidMount(): void {
    super.componentDidMount();

    const props = this.props;
    if (props.useCamera) {
      Webcam.set({
        width: props.cameraWidth || 270,
        height: props.cameraHeight || 203,
        image_format: 'jpeg',
        jpeg_quality: 90,
      });
      Webcam.attach(`#${BasicFileField.CAMERA_ID}`);
    }
  }

  /**
   * @stable [28.06.2018]
   */
  public componentWillUnmount(): void {
    super.componentWillUnmount();

    if (this.props.useCamera) {
      Webcam.reset();
    }
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
          <FlexLayout row={true}
                      className='rac-web-camera-wrapper'>
            <div id={BasicFileField.CAMERA_ID}
                 className='rac-web-camera'/>
            <Button text={this.settings.messages.takeSnapshot}
                    outlined={true}
                    onClick={this.doCapture}/>
          </FlexLayout>
        </div>
      )
    );
  }

  protected getEmptyValue(): EntityIdT[] {
    return [];
  }

  protected onSelect(file: File[]): void {
    this.doSelectBlob(file[0]);
  }

  private doSelectBlob(blob: Blob): void {
    const fileUrl = URL.createObjectURL(blob);

    this.filesMap.set(fileUrl , blob);

    this.multiFieldPlugin.onAddItem({id: fileUrl});
    this.setFocus();
  }

  private get dnd(): IDnd {
    return this.refs.dnd as IDnd;
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
   * @stable [28.06.2018]
   */
  private doCapture(): void {
    Webcam.snap(this.onCapture);
  }

  /**
   * @stable [28.06.2018]
   * @param {string} dataUri
   * @returns {Promise<void>}
   */
  private async onCapture(dataUri: string): Promise<void> {
    const blobEntities = await toBlobEntities(dataUri);
    this.doSelectBlob(blobEntities[0].blob);
  }
}
