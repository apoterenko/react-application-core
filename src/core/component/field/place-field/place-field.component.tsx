import * as React from 'react';
import * as R from 'ramda';
import * as BPromise from 'bluebird';

import {
  ifNotNilThanValue,
  isObjectNotEmpty,
  isPlaceActionRendered,
  joinClassName,
  orNull,
  uuid,
} from '../../../util';
import { BaseSelect } from '../select/base-select.component';
import { GoogleMaps } from '../../google';
import { Dialog } from '../../dialog';
import { AnyT } from '../../../definitions.interface';
import {
  FieldConverterTypesEnum,
  FILTERED_CENTERED_MENU_ENTITY,
  IDialog,
  IGoogleMaps,
  IGoogleMapsMenuItemEntity,
  ILatLngEntity,
  IMenuItemEntity,
  IMenuProps,
  IPlaceEntity,
  IPlaceFieldProps,
  IPlaceFieldState,
  PlaceMarkerActionsEnum,
} from '../../../definition';

export class PlaceField extends BaseSelect<IPlaceFieldProps, IPlaceFieldState> {

  public static readonly defaultProps: IPlaceFieldProps = {
    forceOpenEmptyMenu: true,
    forceReload: true,
    preventFocus: true,
  };
  private static readonly PLACE_MARKER = uuid();

  private readonly dialogRef = React.createRef<Dialog<AnyT>>();
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
      this.defaultActions = R.insert(1, {type: 'location_on', onClick: this.openDialog},
        this.defaultActions);
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
   * @stable [09.01.2020]
   * @param {IPlaceEntity} value
   * @returns {string}
   */
  protected decorateValueBeforeDisplaying(value: IPlaceEntity): string {
    return this.fieldConverter.convert({
      from: FieldConverterTypesEnum.PLACE_ENTITY,
      to: FieldConverterTypesEnum.STRING,
      value,
    });
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
    return orNull(
      dialogOpened,  // To improve a performance
      () => {
        const formattedName = this.decorateValueBeforeDisplaying(placeEntity || this.value);
        return (
          <Dialog
            ref={this.dialogRef}
            title={this.settings.messages.ADDRESS_SELECTION}
            acceptDisabled={!this.isPlaceChanged}
            onDeactivate={this.onDialogDeactivate}
            onAccept={this.onDialogAccept}
            className={joinClassName(this.props.dialogClassName, 'rac-place-field__dialog')}
          >
            <div className='rac-place-field__dialog-place'>{formattedName}</div>
            <GoogleMaps
              ref={this.googleMapsRef}
              className='rac-place-field__dialog-google-maps'
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
      ...FILTERED_CENTERED_MENU_ENTITY,
      remoteFilter: true,
      ...super.getMenuProps(),
    };
  }

  /**
   * @stable [09.01.2020]
   * @param {ILatLngEntity} latLngEntity
   */
  private refreshGeocodeInfo(latLngEntity: ILatLngEntity): void {
    this.cancelPlaceGeoCodeTask();

    this.placeGeoCodeTask = this.placeApi.getPlaceGeoCode<BPromise<IPlaceEntity[]>>(latLngEntity)
      .then((result) => this.onGeoCodeResultDone(result));
  }

  /**
   * @stable [09.01.2020]
   * @param {IPlaceEntity[]} result
   * @returns {IPlaceEntity[]}
   */
  private onGeoCodeResultDone(result: IPlaceEntity[]): IPlaceEntity[] {
    if (!isObjectNotEmpty(result)) {
      return result;
    }
    this.setState({placeEntity: result[0]});
    return result;
  }

  /**
   * @stable [09.01.2020]
   * @param {IGoogleMapsMenuItemEntity} payload
   */
  private onDialogMenuActionSelect(payload: IGoogleMapsMenuItemEntity): void {
    switch (payload.item.value) {
      case PlaceMarkerActionsEnum.PUT_MARKER:
        this.googleMaps.setMarkerState({
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
   * @stable [09.01.2020]
   */
  private onDialogAccept(): void {
    this.setState({dialogOpened: false}, () => this.onChangeManually(this.state.placeEntity));
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
   * @stable [09.01.2020]
   */
  private initPlaceMarker(): void {
    this.googleMaps.addMarker({draggable: true, position: null}, PlaceField.PLACE_MARKER);

    const {lat, lng} = this.placeEntityValue || {} as IPlaceEntity;
    const isMarkerVisible = !(R.isNil(lat) && R.isNil(lng));

    if (isMarkerVisible) {
      this.googleMaps.setMarkerState({
        marker: PlaceField.PLACE_MARKER,
        refreshMap: true,
        lat,
        lng,
        zoom: this.settings.googleMaps.prettyZoom,
      });
    } else {
      this.googleMaps.setMarkerState({
        marker: PlaceField.PLACE_MARKER,
        visible: false,
        refreshMap: true,
      });
    }
  }

  /**
   * @stable [09.01.2020]
   * @returns {boolean}
   */
  private get isPlaceChanged(): boolean {
    return !R.isNil(this.state.placeEntity);
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
   * @stable [09.01.2020]
   * @returns {IPlaceEntity}
   */
  private get placeEntityValue(): IPlaceEntity {
    return this.value;
  }
}
