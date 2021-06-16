import * as React from 'react';
import * as R from 'ramda';

import { Menu } from '../../menu';
import {
  CalcUtils,
  ClsUtils,
  ConditionUtils,
  DelayedTask,
  FilterUtils,
  NvlUtils,
  ObjectUtils,
  TypeUtils,
  UuidUtils,
} from '../../../util';
import {
  AsyncLibsEnum,
  EventsEnum,
  GoogleMapsClassesEnum,
  GoogleMapsMapTypesEnum,
  IGoogleMaps,
  IGoogleMapsEventEntity,
  IGoogleMapsHeatMapLayerConfigEntity,
  IGoogleMapsRefreshMarkerConfigEntity,
  IGoogleMapsMarkerInfoEntity,
  IGoogleMapsAddMarkerConfigEntity,
  IGoogleMapsMenuContextEntity,
  IGoogleMapsProps,
  IGoogleMapsSettingsEntity,
  ILatLngEntity,
  IPresetsMenuItemEntity,
  IGoogleMapsAddOverlayConfigEntity,
} from '../../../definition';
import { GenericComponent } from '../../base/generic.component';
import { EntityIdT } from '../../../definitions.interface';

export class GoogleMaps extends GenericComponent<IGoogleMapsProps>
  implements IGoogleMaps,
    IGoogleMapsMenuContextEntity {

  public event: Event;
  public lat: number;
  public lng: number;

  private clickEventListener: google.maps.MapsEventListener;
  private dbClickEventListener: google.maps.MapsEventListener;
  private directionsService: google.maps.DirectionsService;
  private draggedMarkerId: EntityIdT;
  private googleMapsLibTask: Promise<HTMLScriptElement>;
  private heatMapLayer: google.maps.visualization.HeatmapLayer;
  private map: google.maps.Map;
  private markersListeners = new Map<EntityIdT, google.maps.MapsEventListener[]>();
  private openMenuTask: DelayedTask;
  private readonly menuRef = React.createRef<Menu>();
  private wheelListenerUnsubscriber: () => void;
  // @stable [11.05.2021]
  private $$markers = new Map<EntityIdT, google.maps.Marker>();
  private $$polyLines = new Map<EntityIdT, google.maps.Polyline>();

  /**
   * @stable [10.01.2020]
   * @param {IGoogleMapsProps} props
   */
  constructor(props: IGoogleMapsProps) {
    super(props);

    this.addHeatMapLayer = this.addHeatMapLayer.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
    this.onMapDbClick = this.onMapDbClick.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMarkerMouseOut = this.onMarkerMouseOut.bind(this);
    this.onMarkerMouseOver = this.onMarkerMouseOver.bind(this);
    this.onMenuSelect = this.onMenuSelect.bind(this);
    this.onScriptInit = this.onScriptInit.bind(this);
    this.openMenu = this.openMenu.bind(this);

    if (this.haveMenuOptions) {
      this.openMenuTask = new DelayedTask(this.openMenu, 200); // Double click issue
    }
  }

  /**
   * @stable [28.07.2020]
   */
  public render(): JSX.Element {
    const {
      className,
      style,
    } = this.originalProps;

    return (
      <div
        style={style}
        className={ClsUtils.joinClassName(GoogleMapsClassesEnum.GOOGLE_MAPS, CalcUtils.calc(className))}
      >
        <div
          ref={this.actualRef}
          className={GoogleMapsClassesEnum.GOOGLE_MAPS_BODY}/>
        {this.menuElement}
      </div>
    );
  }

  /**
   * @stable [09.01.2020]
   */
  public componentDidMount(): void {
    this.googleMapsLibTask = this.createGoogleMapsLibTask();

    // It seems google doesn't stop mouse wheel propagate event.
    this.wheelListenerUnsubscriber = this.domAccessor.captureEvent({
      eventName: EventsEnum.WHEEL,
      element: this.actualRef.current,
      callback: this.domAccessor.cancelEvent,
    });
  }

  /**
   * @stable [22.01.2020]
   */
  public componentWillUnmount(): void {
    if (TypeUtils.isFn(this.wheelListenerUnsubscriber)) {
      this.wheelListenerUnsubscriber();
      this.wheelListenerUnsubscriber = null;
    }
    ConditionUtils.ifNotNilThanValue(
      this.openMenuTask,
      (task) => {
        task.stop();
        this.openMenuTask = null;
      }
    );

    this.cancelGoogleMapsLibTask();
    this.unbindListeners();

    this.$$markers = null;
    this.markersListeners = null;
    this.event = null;
    this.$$polyLines = null;
  }

  /**
   * @stable [10.06.2021]
   * @param cfg
   * @param id
   */
  public addMarker(cfg: IGoogleMapsAddMarkerConfigEntity, id?: EntityIdT): google.maps.Marker {
    if (!this.isGoogleMapsLibLoaded) {
      return;
    }
    if (!R.isNil(id) && this.$$markers.has(id)) {
      return this.$$markers.get(id);
    }

    const config: IGoogleMapsAddMarkerConfigEntity = {
      anchorPoint: new google.maps.Point(0, -29),
      position: null,
      ...cfg,
      map: this.map,
    };

    const markerId = id || UuidUtils.uuid();
    const marker = new google.maps.Marker(config);
    this.$$markers.set(markerId, marker);

    if (config.clickable) {
      this.addMarkerListener('click', markerId, marker, (event) => this.onMarkerClick(event, markerId, marker));
    }
    if (config.draggable) {
      this.addMarkerListener('dragstart', markerId, marker, (event) => this.onMarkerDragStart(event, markerId, marker));
      this.addMarkerListener('dragend', markerId, marker, (event) => this.onMarkerDragEnd(event, markerId, marker));
    }
    if (config.trackable) {
      this.addMarkerListener('mouseover', markerId, marker, (event) => this.onMarkerMouseOver(event, markerId, marker));
      this.addMarkerListener('mouseout', markerId, marker, (event) => this.onMarkerMouseOut(event, markerId, marker));
    }
    return marker;
  }

  /**
   * @stable [11.05.2021]
   * @param name
   */
  public removeMarker(name: EntityIdT): void {
    this.removeObject(name, this.$$markers);
  }

  /**
   * @stable [11.05.2021]
   * @param name
   */
  public removePolyLine(name: EntityIdT): void {
    this.removeObject(name, this.$$polyLines);
  }

  // TODO
  public addOverlay(cfg?: IGoogleMapsAddOverlayConfigEntity): void {
    if (!this.isGoogleMapsLibLoaded) {
      return;
    }
    const domAccessor = this.domAccessor;
    const self = this;

    // tslint:disable-next-line:max-classes-per-file
    class MapOverlay extends google.maps.OverlayView {

      // tslint:disable-next-line:variable-name
      private bounds_;
      // tslint:disable-next-line:variable-name
      private div_;

      /**
       * @stable [11.06.2021]
       */
      constructor() {
        super();

        this.bounds_ = new google.maps.LatLngBounds(self.makeLatLng(85, -180), self.makeLatLng(-85, 180));
        this.div_ = null;
      }

      /**
       * @stable [11.06.2021]
       */
      public onAdd() {
        this.div_ = domAccessor.createElement('div');
        this.div_.style.position = 'absolute';
        this.div_.style.opacity = .6;

        this.div_.style.background = 'white';
        const panes = this.getPanes();
        panes.overlayLayer.appendChild(this.div_);
      }

      /**
       * @stable [11.06.2021]
       */
      public draw() {
        this.div_.style.left = '-10000px';
        this.div_.style.top = '-10000px';
        this.div_.style.width = '20000px';
        this.div_.style.height = '20000px';
      }

      /**
       * @stable [11.06.2021]
       */
      public onRemove() {
        if (this.div_) {
          this.div_.parentNode.removeChild(this.div_);
          this.div_ = null;
        }
      }
    }

    const overlay = new MapOverlay();
    overlay.setMap(this.map);
  }

  /**
   * @stable [09.06.2021]
   * @param cfg
   */
  public refreshMarker(cfg: IGoogleMapsRefreshMarkerConfigEntity): void {
    const mapsSettings = this.mapsSettings;

    const {
      lat = mapsSettings.lat,
      lng = mapsSettings.lng,
      marker,
      refresh,
      url,
      visible = true,
      zoom = mapsSettings.zoom,
    } = cfg;

    const latLng = {lat, lng};

    ConditionUtils.ifNotNilThanValue(
      this.asMarkerObject(marker),
      (markerAsObject) => {
        markerAsObject.setPosition(latLng);
        markerAsObject.setVisible(visible);

        if (ObjectUtils.isObjectNotEmpty(url)) {
          markerAsObject.setIcon({
            labelOrigin: this.makePoint(22, 15),
            path: null,
            url,
          });
        }

        if (refresh) {
          this.refreshMap(latLng, zoom);
        }
      }
    );
  }

  /**
   * @stable [11.05.2021]
   * @param polylineCfg
   * @param id
   */
  public addPolyline(polylineCfg: google.maps.PolylineOptions, id?: EntityIdT): google.maps.Polyline {
    const polylineConfig: google.maps.PolylineOptions = {
      strokeWeight: 2,
      ...polylineCfg,
    };

    const polyline = new google.maps.Polyline(polylineConfig);
    polyline.setMap(this.map);

    const polylineId = id || UuidUtils.uuid();
    this.$$polyLines.set(polylineId, polyline);
    return polyline;
  }

  /**
   * @stable [23.02.2020]
   */
  public addDirectionPolyline(directionCfg: google.maps.DirectionsRequest, polylineCfg: google.maps.PolylineOptions, ): void {
    const directionConfig: google.maps.DirectionsRequest = {
      travelMode: google.maps.TravelMode.DRIVING,
      ...directionCfg,
    };

    this.directionsService.route(directionConfig, (result, status) => {
      // TODO Convert to Promise (to cancel)
      if (status === google.maps.DirectionsStatus.OK) {
        this.addPolyline({
          path: result.routes[0].overview_path,
          ...polylineCfg,
        });
      } else {
        throw new Error(`google.maps.DirectionsService request error, status code: ${status}`);
      }
    });
  }

  /**
   * @stable [04.03.2019]
   * @param {IGoogleMapsHeatMapLayerConfigEntity} cfg
   */
  public addHeatMapLayer(cfg: IGoogleMapsHeatMapLayerConfigEntity): void {
    const {
      points,
    } = cfg;
    const isArrayOfPointsNotEmpty = ObjectUtils.isObjectNotEmpty(points);

    if (isArrayOfPointsNotEmpty) {
      this.heatMapLayer = new google.maps.visualization.HeatmapLayer({
        map: this.map,
        data: points.map((point) => this.makeLatLng(point.lat, point.lng)),
      });
    }
    if (cfg.refresh) {
      this.refreshMap(
        isArrayOfPointsNotEmpty ? points[0] : this.mapsSettings,
        NvlUtils.nvl(cfg.zoom, this.mapsSettings.zoom)
      );
    }
  }

  /**
   * @stable [11.06.2021]
   * @param lat
   * @param lng
   */
  public makeLatLng(lat: number, lng: number): google.maps.LatLng {
    return this.isGoogleMapsLibLoaded
      ? new google.maps.LatLng(lat, lng)
      : null;
  }

  /**
   * @stable [10.06.2021]
   * @param x
   * @param y
   */
  public makePoint(x: number, y: number): google.maps.Point {
    return this.isGoogleMapsLibLoaded
      ? new google.maps.Point(x, y)
      : null;
  }

  /**
   * @stable [20.02.2020]
   */
  public fitBounds(bounds: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral,
                   padding?: number | google.maps.Padding) {
    this.map.fitBounds(bounds, padding);
  }

  /**
   * @stable [11.05.2021]
   */
  public get markers(): Map<EntityIdT, google.maps.Marker> {
    return this.$$markers;
  }

  /**
   * @stable [29.03.2020]
   * @returns {boolean}
   */
  public get isInitialized(): boolean {
    return !R.isNil(this.map);
  }

  /**
   * @stable [22.01.2020]
   * @returns {JSX.Element}
   */
  private get menuElement(): JSX.Element {
    return ConditionUtils.orNull(
      this.haveMenuOptions,
      () => (
        <Menu
          ref={this.menuRef}
          inline={true}
          positionConfiguration={{event: () => this.event}}
          anchorElement={() => this.actualRef.current}
          options={this.props.menuOptions}
          onSelect={this.onMenuSelect}/>
      )
    );
  }

  /**
   * @stable [03.02.2020]
   * @param {IGoogleMapsEventEntity} event
   * @param {string} markerId
   * @param {google.maps.Marker} marker
   */
  private onMarkerDragEnd(event: IGoogleMapsEventEntity, markerId: EntityIdT, marker: google.maps.Marker): void {
    const {
      onMarkerDragEnd,
    } = this.originalProps;

    this.draggedMarkerId = null;

    if (TypeUtils.isFn(onMarkerDragEnd)) {
      onMarkerDragEnd(GoogleMaps.asMarkerInfo(event, markerId, marker));

      // 156543.03392 * Math.cos(this.map.getCenter().lat() * Math.PI / 180) / Math.pow(2, this.map.getZoom())
    }
  }

  /**
   * @stable [03.02.2020]
   * @param {IGoogleMapsEventEntity} event
   * @param {string} markerId
   * @param {google.maps.Marker} marker
   */
  private onMarkerDragStart(event: IGoogleMapsEventEntity, markerId: EntityIdT, marker: google.maps.Marker): void {
    const {
      onMarkerDragStart,
    } = this.originalProps;

    this.draggedMarkerId = markerId;

    if (TypeUtils.isFn(onMarkerDragStart)) {
      onMarkerDragStart(GoogleMaps.asMarkerInfo(event, markerId, marker));
    }
  }

  /**
   * @stable [28.07.2020]
   * @param event
   * @param markerId
   * @param marker
   */
  private onMarkerMouseOver(event: IGoogleMapsEventEntity, markerId: EntityIdT, marker: google.maps.Marker): void {
    const {
      onMarkerEnter,
    } = this.originalProps;

    if (this.draggedMarkerId === markerId) {
      return;
    }
    if (TypeUtils.isFn(onMarkerEnter)) {
      onMarkerEnter();
    }
  }

  /**
   * @stable [28.07.2020]
   * @param event
   * @param markerId
   * @param marker
   */
  private onMarkerMouseOut(event: IGoogleMapsEventEntity, markerId: EntityIdT, marker: google.maps.Marker): void {
    const {
      onMarkerLeave,
    } = this.originalProps;

    if (this.draggedMarkerId === markerId) {
      return;
    }
    if (TypeUtils.isFn(onMarkerLeave)) {
      onMarkerLeave();
    }
  }

  /**
   * @stable [11.05.2021]
   * @param event
   * @param markerId
   * @param marker
   */
  private onMarkerClick(event: IGoogleMapsEventEntity, markerId: EntityIdT, marker: google.maps.Marker): void {
    const {
      onMarkerClick,
    } = this.originalProps;

    if (TypeUtils.isFn(onMarkerClick)) {
      onMarkerClick(GoogleMaps.asMarkerInfo(event, markerId, marker));
    }
  }

  /**
   * @stable [11.05.2021]
   * @param event
   * @param markerId
   * @param marker
   */
  private static asMarkerInfo(event: IGoogleMapsEventEntity,
                              markerId: EntityIdT,
                              marker: google.maps.Marker): IGoogleMapsMarkerInfoEntity {
    const position = marker.getPosition();
    const lat = position.lat();
    const lng = position.lng();
    return {
      event,
      item: marker,
      lat,
      lng,
      name: String(markerId),
    };
  }

  /**
   * @stable [28.07.2020]
   * @param item
   */
  private onMenuSelect(item: IPresetsMenuItemEntity): void {
    const {
      onSelect,
    } = this.originalProps;

    if (TypeUtils.isFn(onSelect)) {
      onSelect({item, lat: this.lat, lng: this.lng});
    }
  }

  /**
   * @stable [22.01.2020]
   * @param {IGoogleMapsEventEntity} payload
   */
  private onMapClick(payload: IGoogleMapsEventEntity): void {
    const {
      onClick,
    } = this.originalProps;

    ConditionUtils.ifNotNilThanValue(
      payload.pixel,
      () => {
        const event = R.find(FilterUtils.EVENT_VALUE_PREDICATE, R.values(payload)) as MouseEvent;
        const lat = payload.latLng.lat();
        const lng = payload.latLng.lng();

        ConditionUtils.ifNotNilThanValue(
          this.openMenuTask,
          (openMenuTask) => openMenuTask.start<IGoogleMapsMenuContextEntity>({event, lat, lng})
        );
      }
    );

    if (TypeUtils.isFn(onClick)) {
      onClick(payload);
    }
  }

  /**
   * @stable [23.01.2020]
   * @param {IGoogleMapsEventEntity} event
   */
  private onMapDbClick(event: IGoogleMapsEventEntity): void {
    ConditionUtils.ifNotNilThanValue(this.openMenuTask, (openMenuTask) => openMenuTask.stop());
  }

  /**
   * @stable [10.01.2020]
   * @param {IGoogleMapsMenuContextEntity} context
   */
  private openMenu(context: IGoogleMapsMenuContextEntity) {
    this.event = context.event;
    this.lat = context.lat;
    this.lng = context.lng;

    this.menu.show();
  }

  /**
   * @stable [28.07.2020]
   */
  private onScriptInit(script: HTMLScriptElement): HTMLScriptElement {
    const {
      initialMarkers,
      onInit,
      options = {},
    } = this.originalProps;

    // google.maps.MapTypeId enum is loaded as a lazy resource (within a lazy loaded script)
    const mapTypes = new Map();
    mapTypes.set(GoogleMapsMapTypesEnum.SATELLITE, google.maps.MapTypeId.SATELLITE);
    mapTypes.set(GoogleMapsMapTypesEnum.HYBRID, google.maps.MapTypeId.HYBRID);
    mapTypes.set(GoogleMapsMapTypesEnum.TERRAIN, google.maps.MapTypeId.TERRAIN);

    this.unbindListeners();

    this.map = new google.maps.Map(this.actualRef.current, {
      ...options,
      mapTypeId: mapTypes.get(options.mapTypeId) || google.maps.MapTypeId.ROADMAP,
    });

    this.directionsService = new google.maps.DirectionsService();
    this.clickEventListener = google.maps.event.addListener(this.map, 'click', this.onMapClick);
    this.dbClickEventListener = google.maps.event.addListener(this.map, 'dblclick', this.onMapDbClick);

    ConditionUtils.ifNotEmptyThanValue(
      initialMarkers,
      () => {
        initialMarkers.forEach((cfg, index) => {
          const marker = this.addMarker(cfg);
          const markerPosition = marker.getPosition();

          this.refreshMarker({
            marker,
            lat: markerPosition.lat(),
            lng: markerPosition.lng(),
            visible: true,
            refresh: initialMarkers.length - 1 === index,
          });
        });
      }
    );

    ConditionUtils.ifNotNilThanValue(onInit, () => onInit(this.map));
    return script;
  }

  /**
   * @stable [09.06.2021]
   * @param latLng
   * @param zoom
   */
  private refreshMap(latLng: ILatLngEntity, zoom: number): void {
    this.map.setCenter({lat: latLng.lat, lng: latLng.lng});
    this.map.setZoom(zoom);
  }

  /**
   * @stable [09.06.2021]
   * @param marker
   */
  private asMarkerObject(marker: string | google.maps.Marker): google.maps.Marker {
    return TypeUtils.isString(marker)
      ? this.$$markers.get(marker as string)
      : marker as google.maps.Marker;
  }

  /**
   * @stable [09.06.2021]
   */
  private cancelGoogleMapsLibTask(): void {
    this.asyncLibManager.cancelWaiting(this.googleMapsLibTask);
    this.googleMapsLibTask = null;
  }

  /**
   * @stable [28.03.2021]
   */
  private createGoogleMapsLibTask(): Promise<HTMLScriptElement> {
    return this.asyncLibManager
      .waitForLib({alias: AsyncLibsEnum.GOOGLE_MAPS})
      .then(this.onScriptInit);
  }

  /**
   * @stable [28.07.2020]
   * @param eventName
   * @param markerId
   * @param marker
   * @param callback
   */
  private addMarkerListener(eventName: string,
                            markerId: EntityIdT,
                            marker: google.maps.Marker,
                            callback: (event: IGoogleMapsEventEntity) => void): void {
    let listeners = this.markersListeners.get(markerId);
    if (!Array.isArray(listeners)) {
      this.markersListeners.set(markerId, listeners = []);
    }
    listeners.push(google.maps.event.addListener(marker, eventName, callback));
  }

  /**
   * @stable [11.05.2021]
   * @param name
   * @param map
   */
  private removeObject(name: EntityIdT, map: Map<EntityIdT, google.maps.Marker | google.maps.Polyline>): void {
    ConditionUtils.ifNotNilThanValue(
      map.get(name),
      (marker) => {
        marker.unbindAll();
        marker.setMap(null);
        map.delete(name);
      }
    );
  }

  /**
   * @stable [22.01.2020]
   */
  private unbindListeners(): void {
    this.markersListeners.forEach((listeners) => listeners.forEach((listener) => listener.remove()));
    this.markersListeners.clear();

    this.$$markers.forEach((marker) => marker.unbindAll());
    this.$$markers.clear();

    this.$$polyLines.forEach((polyLine) => polyLine.unbindAll());
    this.$$polyLines.clear();

    ConditionUtils.ifNotNilThanValue(
      this.clickEventListener,
      (listener) => {
        listener.remove();
        this.clickEventListener = null;
      }
    );
    ConditionUtils.ifNotNilThanValue(
      this.dbClickEventListener,
      (listener) => {
        listener.remove();
        this.dbClickEventListener = null;
      }
    );
    ConditionUtils.ifNotNilThanValue(
      this.heatMapLayer,
      (heatMapLayer) => {
        heatMapLayer.unbindAll();
        this.heatMapLayer = null;
      }
    );
    ConditionUtils.ifNotNilThanValue(
      this.map,
      (map) => {
        map.unbindAll();
        this.map = null;
      }
    );
  }

  /**
   * @stable [23.01.2020]
   * @returns {boolean}
   */
  private get haveMenuOptions(): boolean {
    return ObjectUtils.isObjectNotEmpty(this.originalProps.menuOptions);
  }

  /**
   * @stable [04.03.2019]
   * @returns {IGoogleMapsSettingsEntity}
   */
  private get mapsSettings(): IGoogleMapsSettingsEntity {
    return this.settings.googleMaps;
  }

  /**
   * @stable [10.06.2021]
   */
  private get isGoogleMapsLibLoaded(): boolean {
    return TypeUtils.isDef(this.environment.window.google);
  }

  /**
   * @stable [10.06.2021]
   */
  private get menu(): Menu {
    return this.menuRef.current;
  }
}
