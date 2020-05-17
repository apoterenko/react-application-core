import * as React from 'react';
import * as R from 'ramda';
import * as BPromise from 'bluebird';

import {
  ifNotNilThanValue,
  isObjectNotEmpty,
  isPlaceActionRendered,
  isUseZipCode,
  joinClassName,
  nvl,
  orNull,
  uuid,
} from '../../../util';
import { BaseSelect } from '../select/base-select.component';
import { Dialog } from '../../dialog';
import { GoogleMaps } from '../../google';
import {
  DEFAULT_NO_AUTO_COMPLETE_FIELD_ENTITY,
  DEFAULT_REMOTE_FILTERED_MENU_ENTITY,
  DialogClassesEnum,
  FieldConverterTypesEnum,
  IDialog,
  IGoogleMaps,
  IGoogleMapsMenuItemEntity,
  IMenuItemEntity,
  IMenuProps,
  IPlaceEntity,
  IPlaceFieldProps,
  IPlaceFieldState,
  IPlaceGeoCodeRequestEntity,
  IPlaceSelectOptionEntity,
  PlaceEntityValueT,
  PlaceMarkerActionsEnum,
} from '../../../definition';
import { EntityIdT } from '../../../definitions.interface';

export class PlaceField extends BaseSelect<IPlaceFieldProps, IPlaceFieldState> {

  public static readonly defaultProps: IPlaceFieldProps = {
    ...DEFAULT_NO_AUTO_COMPLETE_FIELD_ENTITY,
    preventFocus: true,
  };
  private static readonly PLACE_MARKER = uuid();

  private readonly dialogRef = React.createRef<Dialog>();
  private readonly googleMapsRef = React.createRef<GoogleMaps>();
  private readonly googleMapsMenuOptions: IMenuItemEntity[] = [{
    label: this.settings.messages.PUT_MARKER_HERE,
    value: PlaceMarkerActionsEnum.PUT_MARKER,
  }];
  private placeGeoCodeTask: BPromise<IPlaceEntity[]>;

  /**
   * @stable [09.01.2020]
   * @param {IPlaceFieldProps} props
   */
  constructor(props: IPlaceFieldProps) {
    super(props);

    this.initPlaceMarker = this.initPlaceMarker.bind(this);
    this.onDialogAccept = this.onDialogAccept.bind(this);
    this.onDialogDeactivate = this.onDialogDeactivate.bind(this);
    this.onDialogMenuActionSelect = this.onDialogMenuActionSelect.bind(this);
    this.openDialog = this.openDialog.bind(this);
    this.refreshGeocodeInfo = this.refreshGeocodeInfo.bind(this);

    if (isPlaceActionRendered(props)) {
      this.defaultActions = R.insert(
        this.isExpandActionRendered ? 1 : 0,
        {type: 'location_on', onClick: this.openDialog},
        this.defaultActions
      );
    }
  }

  /**
   * @stable [09.01.2020]
   */
  public componentWillUnmount(): void {
    this.cancelPlaceGeoCodeTask();
    super.componentWillUnmount();
  }

  /**
   * @stable [11.01.2020]
   * @param {IPlaceSelectOptionEntity} option
   */
  protected onSelect(option: IPlaceSelectOptionEntity): void {
    this.refreshGeocodeInfo({placeId: option.rawData.placeId}, option);
  }

  /**
   * @stable [11.01.2020]
   * @param {PlaceEntityValueT} value
   * @returns {string}
   */
  protected decorateDisplayValue(value: PlaceEntityValueT): string {
    return this.useZipCode
      ? this.zipCodeEntityAsDisplayValue(value)
      : this.fromPlaceEntityToDisplayValue(value);
  }

  /**
   * @stable [09.01.2020]
   * @returns {JSX.Element}
   */
  protected getAttachmentElement(): JSX.Element {
    const {
      dialogOpened,
      placeEntity,
    } = this.state;
    const props = this.props;

    return orNull(
      dialogOpened,  // To improve a performance
      () => {
        return (
          <Dialog
            ref={this.dialogRef}
            scrollable={false}
            title={this.settings.messages.ADDRESS_SELECTION}
            acceptDisabled={!this.isPlaceChanged}
            onDeactivate={this.onDialogDeactivate}
            onAccept={this.onDialogAccept}
            className={joinClassName(this.props.dialogClassName, DialogClassesEnum.PLACE_DIALOG)}
          >
            {
              ifNotNilThanValue(
                this.fromPlaceEntityToDisplayValue(nvl(placeEntity, this.value)),
                (value) => (
                  <div className={DialogClassesEnum.PLACE_DIALOG_TITLE}>{value}</div>
                )
              )
            }
            <GoogleMaps
              {...props.googleMapsConfiguration}
              ref={this.googleMapsRef}
              onSelect={this.onDialogMenuActionSelect}
              onInit={this.initPlaceMarker}
              onChangePlace={this.refreshGeocodeInfo}
              menuOptions={this.googleMapsMenuOptions}/>
          </Dialog>
        );
      }
    );
  }

  /**
   * @stable [09.01.2020]
   * @returns {string}
   */
  protected getFieldClassName(): string {
    return joinClassName(super.getFieldClassName(), 'rac-place-field');
  }

  /**
   * @stable [09.01.2020]
   * @returns {IMenuProps}
   */
  protected getMenuProps(): IMenuProps {
    return {
      ...DEFAULT_REMOTE_FILTERED_MENU_ENTITY,
      ...super.getMenuProps(),
    };
  }

  /**
   * @stable [11.01.2020]
   * @param {IPlaceGeoCodeRequestEntity} geoCodeRequest
   * @param {IPlaceSelectOptionEntity} option
   */
  private refreshGeocodeInfo(geoCodeRequest: IPlaceGeoCodeRequestEntity, option?: IPlaceSelectOptionEntity): void {
    this.cancelPlaceGeoCodeTask();

    this.setState({progress: true}, () => {
      this.placeGeoCodeTask = this.placeApi.getPlaceGeoCode<BPromise<IPlaceEntity[]>>(geoCodeRequest)
        .then(
          (result) => {
            this.setState({progress: false});

            if (isObjectNotEmpty(result)) {
              this.onGeoCodeRequestDone(result, option);
            }
            return result;
          },
          (error) => {
            this.setState({progress: false});
            return error;
          }
        );
    });
  }

  /**
   * @stable [11.01.2020]
   * @param {IPlaceEntity[]} result
   * @param {IPlaceSelectOptionEntity} option
   */
  private onGeoCodeRequestDone(result: IPlaceEntity[], option?: IPlaceSelectOptionEntity): void {
    const placeEntity = result[0];
    if (R.isNil(option)) {
      // To preview in a dialog
      this.setState({placeEntity});
    } else {
      // The selection via a select component
      this.doSelect(placeEntity, option);
    }
  }

  /**
   * @stable [29.01.2020]
   * @param {IPlaceEntity} placeEntity
   * @param {IPlaceSelectOptionEntity} option
   */
  private doSelect(placeEntity: IPlaceEntity, option?: IPlaceSelectOptionEntity): void {
    let payload: IPlaceEntity | EntityIdT;
    if (this.isPlainValueApplied) {
      payload = this.useZipCode
        ? this.zipCodeEntityAsDisplayValue(placeEntity)
        : this.fromPlaceEntityToDisplayValue(placeEntity);
    } else {
      payload = placeEntity;
    }
    this.onChangeManually(payload);
    this.notifySelectOption(option);
  }

  /**
   * @stable [09.01.2020]
   * @param {IGoogleMapsMenuItemEntity} payload
   */
  private onDialogMenuActionSelect(payload: IGoogleMapsMenuItemEntity): void {
    switch (payload.item.value) {
      case PlaceMarkerActionsEnum.PUT_MARKER:
        this.googleMaps.refreshMarker({
          marker: PlaceField.PLACE_MARKER,
          refreshMap: false,
          lat: payload.lat,
          lng: payload.lng,
        });
        this.refreshGeocodeInfo(payload);
        break;
    }
  }

  /**
   * @stable [11.01.2020]
   */
  private onDialogAccept(): void {
    this.setState({dialogOpened: false}, () => this.doSelect(this.state.placeEntity));
  }

  /**
   * @stable [09.01.2020]
   */
  private onDialogDeactivate(): void {
    this.setState({dialogOpened: false});
  }

  /**
   * @stable [09.01.2020]
   */
  private openDialog(): void {
    this.setState({dialogOpened: true, placeEntity: null}, () => this.dialog.activate());
  }

  /**
   * @stable [09.01.2020]
   */
  private cancelPlaceGeoCodeTask(): void {
    ifNotNilThanValue(
      this.placeGeoCodeTask,
      (promise) => {
        if (promise.isPending()) {
          promise.cancel();
        }
        this.placeGeoCodeTask = null;
      }
    );
  }

  /**
   * @stable [03.04.2020]
   */
  private initPlaceMarker(): void {
    this.googleMaps.addMarker({draggable: true, position: null}, PlaceField.PLACE_MARKER);

    const {lat, lng} = this.valueAsPlaceEntity || {} as IPlaceEntity;

    const initialCfg = {marker: PlaceField.PLACE_MARKER};
    this.googleMaps.refreshMarker({
      ...initialCfg,
      ...(
        !R.isNil(lat) && !R.isNil(lng)
          ? {
            lat,
            lng,
            refreshMap: true,
            zoom: this.settings.googleMaps.prettyZoom,
          }
          : {visible: false, refreshMap: !this.hasMapInitialMarkers}
      ),
    });
  }

  /**
   * @stable [17.05.2020]
   * @param {PlaceEntityValueT} placeEntity
   * @returns {string}
   */
  private fromPlaceEntityToDisplayValue(placeEntity: PlaceEntityValueT): string {
    return this.fieldConverter.fromPlaceEntityToDisplayValue(placeEntity);
  }

  /**
   * @stable [28.01.2020]
   * @param {PlaceEntityValueT} placeEntity
   * @returns {string}
   */
  private zipCodeEntityAsDisplayValue(placeEntity: PlaceEntityValueT): string {
    return this.fieldConverter.convert({
      from: FieldConverterTypesEnum.ZIP_CODE_ENTITY,
      to: FieldConverterTypesEnum.DISPLAY_VALUE,
      value: placeEntity,
    });
  }

  /**
   * @stable [09.01.2020]
   * @returns {boolean}
   */
  private get isPlaceChanged(): boolean {
    return !R.isNil(this.state.placeEntity);
  }

  /**
   * @stable [03.04.2020]
   * @returns {IPlaceEntity}
   */
  private get valueAsPlaceEntity(): IPlaceEntity {
    return this.value;
  }

  /**
   * @stable [09.01.2020]
   * @returns {IDialog}
   */
  private get dialog(): IDialog {
    return this.dialogRef.current;
  }

  /**
   * @stable [09.01.2020]
   * @returns {IGoogleMaps}
   */
  private get googleMaps(): IGoogleMaps {
    return this.googleMapsRef.current;
  }

  /**
   * @stable [11.01.2020]
   * @returns {boolean}
   */
  private get useZipCode(): boolean {
    return isUseZipCode(this.props);
  }

  /**
   * @stable [03.04.2020]
   * @returns {boolean}
   */
  private get hasMapInitialMarkers(): boolean {
    const {googleMapsConfiguration = {}} = this.props;
    return isObjectNotEmpty(googleMapsConfiguration.initialMarkers);
  }
}
