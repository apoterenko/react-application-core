import * as Promise from 'bluebird';
import * as React from 'react';
import * as R from 'ramda';

import { BaseComponent } from '../../base';
import { Menu, IMenu } from '../../menu';
import {
  getGoogleMapsScript,
  DelayedTask,
  uuid,
  isString,
  orNull,
  isDef,
  isFn,
  toClassName,
  isArrayNotEmpty,
} from '../../../util';
import {
  IGoogleMapsMarkerConfigEntity,
  IGoogleMapsProps,
} from './google-maps.interface';
import { IMenuItemEntity } from '../../../entities-definitions.interface';
import {
  IGoogleMaps,
  IGoogleMapsClickPayloadEntity,
  GoogleMapsMapTypeEnum,
} from './google-maps.interface';
import { FlexLayout } from '../../layout';
import { ILatLngEntity } from '../../../definition';
import { IGoogleMapsSettings } from '../../../settings';

export class GoogleMaps extends BaseComponent<IGoogleMapsProps>
  implements IGoogleMaps {

  private googleMapsScriptTask: Promise<void>;
  private openMenuTask: DelayedTask;
  private clickEventListener: google.maps.MapsEventListener;
  private dbClickEventListener: google.maps.MapsEventListener;
  private map: google.maps.Map;
  private heatMapLayer: google.maps.visualization.HeatmapLayer;

  private x: number;
  private y: number;
  private lat: number;
  private lng: number;
  private readonly markers = new Map<string, google.maps.Marker>();
  private readonly markersDragListeners = new Map<string, google.maps.MapsEventListener>();

  /**
   * @stable [31.07.2018]
   * @param {IGoogleMapsProps} props
   */
  constructor(props: IGoogleMapsProps) {
    super(props);

    this.onMapClick = this.onMapClick.bind(this);
    this.onMapDbClick = this.onMapDbClick.bind(this);
    this.onMenuSelect = this.onMenuSelect.bind(this);
    this.openMenu = this.openMenu.bind(this);
    this.initGoogleMapsObjects = this.initGoogleMapsObjects.bind(this);
    this.addHeatMapLayer = this.addHeatMapLayer.bind(this);

    if (this.haveMenuOptions) {
      this.openMenuTask = new DelayedTask(this.openMenu, 200);
    }
  }

  /**
   * @stable [31.07.2018]
   */
  public componentDidMount(): void {
    super.componentDidMount();

    // We cannot cancel the original promise, because of it is shared
    this.googleMapsScriptTask = new Promise<HTMLScriptElement>(
      (resolve, reject) => getGoogleMapsScript(this.settings.googleMaps.libraries).then(resolve, reject)
    ).then(this.initGoogleMapsObjects);
  }

  /**
   * @stable [31.07.2018]
   */
  public componentWillUnmount(): void {
    super.componentWillUnmount();

    if (isDef(this.openMenuTask)) {
      this.openMenuTask.stop();
    }
    this.cancelGoogleMapsScriptTaskIfPending();

    this.markersDragListeners.forEach((dragEndEventListener) => dragEndEventListener.remove());

    if (isDef(this.clickEventListener)) {
      this.clickEventListener.remove();
    }
    if (isDef(this.dbClickEventListener)) {
      this.dbClickEventListener.remove();
    }
    this.map = null;
    this.heatMapLayer = null;
    this.openMenuTask = null;
    this.googleMapsScriptTask = null;
  }

  /**
   * @stable [31.07.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    return (
      <FlexLayout className={toClassName('rac-google-maps', props.className)}>
        <div
          ref={this.getSelfRef()}
          className='rac-google-maps-map rac-flex-full'/>
        {
          orNull<JSX.Element>(
            this.haveMenuOptions,
            () => (
              <Menu
                ref='menu'
                renderToX={() => this.x + this.getSelf().offsetLeft}
                renderToY={() => this.y + this.getSelf().offsetTop}
                options={props.menuOptions}
                onSelect={this.onMenuSelect}/>
            )
          )
        }
      </FlexLayout>
    );
  }

  /**
   * @stable [31.07.2018]
   * @param {google.maps.MarkerOptions} cfg
   * @param {string} name
   * @returns {google.maps.Marker}
   */
  public addMarker(cfg?: google.maps.MarkerOptions, name?: string): google.maps.Marker {
    const config: google.maps.MarkerOptions = {
      anchorPoint: new google.maps.Point(0, -29),
      position: null,
      ...cfg,
      map: this.map,
    };
    const markerId = name || uuid();
    const marker = new google.maps.Marker(config);
    this.markers.set(markerId, marker);

    if (config.draggable) {
      this.markersDragListeners.set(
        markerId,
        google.maps.event.addListener(marker, 'dragend', () => this.onMarkerDragEnd(markerId, marker))
      );
    }
    return marker;
  }

  /**
   * @stable [23.02.2019]
   * @param {IGoogleMapsMarkerConfigEntity} cfg
   */
  public setMarkerState(cfg: IGoogleMapsMarkerConfigEntity): void {
    const {
      marker,
      visible,
      refreshMap,
      lat = this.mapsSettings.lat,
      lng = this.mapsSettings.lng,
      zoom = this.mapsSettings.zoom,
    } = cfg;

    const markerAsObject = isString(marker) ? this.markers.get(marker as string) : marker as google.maps.Marker;
    markerAsObject.setPosition({lat, lng});
    markerAsObject.setVisible(visible);

    if (refreshMap) {
      this.refreshMap({lat, lng}, zoom);
    }
  }

  /**
   * @stable [04.03.2019]
   * @param {ILatLngEntity[]} points
   */
  public addHeatMapLayer(points: ILatLngEntity[]): void {
    this.heatMapLayer = new google.maps.visualization.HeatmapLayer({
      map: this.map,
      data: points.map((point) => new google.maps.LatLng(point.lat, point.lng)),
    });

    this.refreshMap(
      isArrayNotEmpty(points) ? points[0] : this.mapsSettings,
      this.mapsSettings.zoom
    );
  }

  /**
   * @stable [31.07.2018]
   * @param {string} markerId
   * @param {google.maps.Marker} marker
   */
  private onMarkerDragEnd(markerId: string, marker: google.maps.Marker): void {
    const position = marker.getPosition();
    const lat = position.lat();
    const lng = position.lng();

    const props = this.props;
    if (props.onChangePlace) {
      props.onChangePlace({name: markerId, item: marker, lat, lng});
    }
  }

  /**
   * @stable [31.07.2018]
   * @param {IMenuItemEntity} item
   */
  private onMenuSelect(item: IMenuItemEntity): void {
    const props = this.props;
    if (props.onSelect) {
      props.onSelect({item, lat: this.lat, lng: this.lng});
    }
  }

  /**
   * @stable [03.03.2019]
   * @param {IGoogleMapsClickPayloadEntity} event
   */
  private onMapClick(event: IGoogleMapsClickPayloadEntity): void {
    const props = this.props;
    if (event.pixel) {
      const x = event.pixel.x;
      const y = event.pixel.y;
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();

      if (isDef(this.openMenuTask)) {
        this.openMenuTask.start({x, y, lat, lng});
      }
    }
    if (isFn(props.onClick)) {
      props.onClick(event);
    }
  }

  /**
   * @stable [03.03.2019]
   * @param {IGoogleMapsClickPayloadEntity} event
   */
  private onMapDbClick(event: IGoogleMapsClickPayloadEntity): void {
    if (this.haveMenuOptions) {
      this.openMenuTask.stop();
    }
  }

  /**
   * @stable [31.07.2018]
   */
  private cancelGoogleMapsScriptTaskIfPending(): void {
    this.cancelTaskIfPending(this.googleMapsScriptTask);
  }

  /**
   * @stable [31.07.2018]
   */
  private cancelTaskIfPending<TResult = void>(promise: Promise<TResult>): void {
    if (promise && promise.isPending()) {
      promise.cancel();
    }
  }

  /**
   * @stable [31.07.2018]
   * @param {{x: number; y: number; lat: number; lng: number}} nextState
   */
  private openMenu(nextState: { x: number, y: number, lat: number, lng: number }) {
    Object.assign(this, nextState);   // We need to sync the internal state with a starting task state
    this.menu.show();
  }

  /**
   * @stable [31.07.2018]
   */
  private initGoogleMapsObjects(): void {
    const props = this.props;
    const {options = {}} = props;

    // google.maps.MapTypeId enum is loaded as a lazy resource (within a lazy loaded script)
    const mapTypes = new Map();
    mapTypes.set(GoogleMapsMapTypeEnum.SATELLITE, google.maps.MapTypeId.SATELLITE);
    mapTypes.set(GoogleMapsMapTypeEnum.HYBRID, google.maps.MapTypeId.HYBRID);
    mapTypes.set(GoogleMapsMapTypeEnum.TERRAIN, google.maps.MapTypeId.TERRAIN);

    this.map = new google.maps.Map(this.getSelf(), {
      ...options,
      mapTypeId: mapTypes.get(options.mapTypeId) || google.maps.MapTypeId.ROADMAP,
    });
    this.clickEventListener = google.maps.event.addListener(this.map, 'click', this.onMapClick);
    this.dbClickEventListener = google.maps.event.addListener(this.map, 'dblclick', this.onMapDbClick);

    if (props.onInit) {
      props.onInit(this.map);
    }
  }

  /**
   * @stable [04.03.2019]
   * @param {ILatLngEntity} latLng
   * @param {number} zoom
   */
  private refreshMap(latLng: ILatLngEntity, zoom: number): void {
    this.map.setCenter({lat: latLng.lat, lng: latLng.lng});
    this.map.setZoom(zoom);
  }

  /**
   * @stable [31.07.2018]
   * @returns {IMenu}
   */
  private get menu(): IMenu {
    return this.refs.menu as IMenu;
  }

  /**
   * @stable [26.10.2018]
   * @returns {boolean}
   */
  private get haveMenuOptions(): boolean {
    return !R.isNil(this.props.menuOptions);
  }

  /**
   * @stable [04.03.2019]
   * @returns {IGoogleMapsSettings}
   */
  private get mapsSettings(): IGoogleMapsSettings {
    return this.settings.googleMaps;
  }
}
