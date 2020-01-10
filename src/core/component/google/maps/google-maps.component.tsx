import * as BPromise from 'bluebird';
import * as React from 'react';

import { BaseComponent } from '../../base';
import { Menu } from '../../menu';
import {
  DelayedTask,
  ifNotNilThanValue,
  isArrayNotEmpty,
  isDef,
  isFn,
  isObjectNotEmpty,
  isString,
  joinClassName,
  nvl,
  orNull,
  uuid,
} from '../../../util';
import {
  IGoogleMapsProps,
} from './google-maps.interface';
import {
  IGoogleMapsClickPayloadEntity,
  GoogleMapsMapTypeEnum,
} from './google-maps.interface';
import { FlexLayout } from '../../layout/flex';
import {
  AsyncLibsEnum,
  IGoogleMaps,
  IGoogleMapsHeatMapLayerConfigEntity,
  IGoogleMapsMarkerConfigEntity,
  IGoogleMapsOpenMenuContextEntity,
  IGoogleMapsSettingsEntity,
  ILatLngEntity,
  IMenu,
  IMenuItemEntity,
} from '../../../definition';

export class GoogleMaps extends BaseComponent<IGoogleMapsProps>
  implements IGoogleMaps,
    IGoogleMapsOpenMenuContextEntity {

  public lat: number;
  public lng: number;
  public x: number;
  public y: number;

  private clickEventListener: google.maps.MapsEventListener;
  private dbClickEventListener: google.maps.MapsEventListener;
  private googleMapsLibTask: BPromise<void>;
  private heatMapLayer: google.maps.visualization.HeatmapLayer;
  private map: google.maps.Map;
  private openMenuTask: DelayedTask;
  private readonly markers = new Map<string, google.maps.Marker>();
  private readonly markersDragListeners = new Map<string, google.maps.MapsEventListener>();
  private readonly menuRef = React.createRef<Menu>();

  /**
   * @stable [10.01.2020]
   * @param {IGoogleMapsProps} props
   */
  constructor(props: IGoogleMapsProps) {
    super(props);

    this.addHeatMapLayer = this.addHeatMapLayer.bind(this);
    this.onGoogleMapsReady = this.onGoogleMapsReady.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
    this.onMapDbClick = this.onMapDbClick.bind(this);
    this.onMenuSelect = this.onMenuSelect.bind(this);
    this.openMenu = this.openMenu.bind(this);

    if (this.haveMenuOptions) {
      this.openMenuTask = new DelayedTask(this.openMenu, 200); // Double click issue
    }
  }

  /**
   * @stable [09.01.2020]
   */
  public componentDidMount(): void {
    super.componentDidMount();

    this.googleMapsLibTask = this.asyncLibManager
      .waitForLib<BPromise<HTMLScriptElement>>({alias: AsyncLibsEnum.GOOGLE_MAPS})
      .then(() => this.onGoogleMapsReady());
  }

  /**
   * @stable [10.01.2020]
   */
  public componentWillUnmount(): void {
    super.componentWillUnmount();

    ifNotNilThanValue(
      this.openMenuTask,
      (task) => {
        task.stop();
        this.openMenuTask = null;
      }
    );
    this.cancelGoogleMapsLibTask();

    this.markersDragListeners.forEach((listener) => listener.remove());
    this.markersDragListeners.clear();
    this.markers.clear();

    ifNotNilThanValue(
      this.clickEventListener,
      (listener) => {
        listener.remove();
        this.clickEventListener = null;
      }
    );
    ifNotNilThanValue(
      this.dbClickEventListener,
      (listener) => {
        listener.remove();
        this.dbClickEventListener = null;
      }
    );
    ifNotNilThanValue(
      this.heatMapLayer,
      (heatMapLayer) => {
        heatMapLayer.unbindAll();
        this.heatMapLayer = null;
      }
    );
    ifNotNilThanValue(
      this.map,
      (map) => {
        map.unbindAll();
        this.map = null;
      }
    );
  }

  /**
   * @stable [31.07.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    return (
      <FlexLayout className={joinClassName('rac-google-maps', props.className)}>
        <div
          ref={this.selfRef}
          className='rac-google-maps-map rac-flex-full'/>
        {
          orNull(
            this.haveMenuOptions,
            () => (
              <Menu
                ref={this.menuRef}
                xPosition={() => this.x + this.getSelf().offsetLeft}
                yPosition={() => this.y + this.getSelf().offsetTop}
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
   * @stable [10.01.2020]
   * @param {IGoogleMapsMarkerConfigEntity} cfg
   */
  public setMarkerState(cfg: IGoogleMapsMarkerConfigEntity): void {
    const {
      marker,
      visible = true,
      refreshMap,
      lat = this.mapsSettings.lat,
      lng = this.mapsSettings.lng,
      zoom = this.mapsSettings.zoom,
    } = cfg;

    const markerAsObject = isString(marker)
      ? this.markers.get(marker as string)
      : marker as google.maps.Marker;

    markerAsObject.setPosition({lat, lng});
    markerAsObject.setVisible(visible);

    if (refreshMap) {
      this.refreshMap({lat, lng}, zoom);
    }
  }

  /**
   * @stable [04.03.2019]
   * @param {IGoogleMapsHeatMapLayerConfigEntity} cfg
   */
  public addHeatMapLayer(cfg: IGoogleMapsHeatMapLayerConfigEntity): void {
    const {points} = cfg;
    const isArrayOfPointsNotEmpty = isArrayNotEmpty(points);

    if (isArrayOfPointsNotEmpty) {
      this.heatMapLayer = new google.maps.visualization.HeatmapLayer({
        map: this.map,
        data: points.map((point) => new google.maps.LatLng(point.lat, point.lng)),
      });
    }
    if (cfg.refreshMap) {
      this.refreshMap(
        isArrayOfPointsNotEmpty ? points[0] : this.mapsSettings,
        nvl(cfg.zoom, this.mapsSettings.zoom)
      );
    }
  }

  /**
   * @stable [10.01.2020]
   * @param {string} markerId
   * @param {google.maps.Marker} marker
   */
  private onMarkerDragEnd(markerId: string, marker: google.maps.Marker): void {
    const position = marker.getPosition();
    const lat = position.lat();
    const lng = position.lng();

    const props = this.props;
    if (isFn(props.onChangePlace)) {
      props.onChangePlace({name: markerId, item: marker, lat, lng});
    }
  }

  /**
   * @stable [10.01.2020]
   * @param {IMenuItemEntity} item
   */
  private onMenuSelect(item: IMenuItemEntity): void {
    const props = this.props;
    if (isFn(props.onSelect)) {
      props.onSelect({item, lat: this.lat, lng: this.lng});
    }
  }

  /**
   * @stable [10.01.2020]
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
        const payload: IGoogleMapsOpenMenuContextEntity = {x, y, lat, lng};
        this.openMenuTask.start(payload);
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
   * @stable [10.01.2020]
   * @param {IGoogleMapsOpenMenuContextEntity} context
   */
  private openMenu(context: IGoogleMapsOpenMenuContextEntity) {
    Object.assign(this, context);
    this.menu.show();
  }

  /**
   * @stable [31.07.2018]
   */
  private onGoogleMapsReady(): void {
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

    if (isFn(props.onInit)) {
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
   * @stable [09.01.2020]
   */
  private cancelGoogleMapsLibTask(): void {
    this.asyncLibManager.cancelWaiting<BPromise<void>>(this.googleMapsLibTask);
    this.googleMapsLibTask = null;
  }

  /**
   * @stable [10.01.2020]
   * @returns {IMenu}
   */
  private get menu(): IMenu {
    return this.menuRef.current;
  }

  /**
   * @stable [26.10.2018]
   * @returns {boolean}
   */
  private get haveMenuOptions(): boolean {
    return isObjectNotEmpty(this.props.menuOptions);
  }

  /**
   * @stable [04.03.2019]
   * @returns {IGoogleMapsSettingsEntity}
   */
  private get mapsSettings(): IGoogleMapsSettingsEntity {
    return this.settings.googleMaps;
  }
}
