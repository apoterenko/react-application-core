import {
  IActiveValueWrapper,
  IChannelWrapper,
  IDictionariesWrapper,
  IDisabledWrapper,
  IFormWrapper,
  ILayoutWrapper,
  IListWrapper,
  INotificationWrapper,
  IOptionsWrapper,
  IPrimaryFilterWrapper,
  IProgressWrapper,
  IQueryFilterWrapper,
  IQueryWrapper,
  ISecondaryFilterWrapper,
  ISectionNameWrapper,
  IStackWrapper,
  ITabPanelWrapper,
  ITransportWrapper,
  IUserWrapper,
  IWaitingForOptionsWrapper,
} from '../definitions.interface';
import {
  FilterUtils,
} from './filter';

/**
 * @map-as-wrapper
 *
 * @stable [27.07.2020]
 * @param stack
 */
const mapStack = <TValue>(stack: TValue): IStackWrapper<TValue> =>
  FilterUtils.defValuesFilter<IStackWrapper<TValue>, IStackWrapper<TValue>>({stack});

/**
 * @map-as-wrapper
 *
 * @stable [27.07.2020]
 * @param user
 */
const mapUser = <TUser>(user: TUser): IUserWrapper<TUser> =>
  FilterUtils.defValuesFilter<IUserWrapper<TUser>, IUserWrapper<TUser>>({user});

/**
 * @map-as-wrapper
 *
 * @stable [10.08.2020]
 * @param progress
 */
const mapProgress = <TValue>(progress: TValue): IProgressWrapper<TValue> =>
  FilterUtils.defValuesFilter<IProgressWrapper<TValue>, IProgressWrapper<TValue>>({progress});

/**
 * @map-as-wrapper
 *
 * @stable [27.07.2020]
 * @param options
 */
const mapOptions = <TValue>(options: TValue): IOptionsWrapper<TValue> =>
  FilterUtils.defValuesFilter<IOptionsWrapper<TValue>, IOptionsWrapper<TValue>>({options});

/**
 * @map-as-wrapper
 *
 * @stable [27.07.2020]
 * @param layout
 */
const mapLayout = <TValue>(layout: TValue): ILayoutWrapper<TValue> =>
  FilterUtils.defValuesFilter<ILayoutWrapper<TValue>, ILayoutWrapper<TValue>>({layout});

/**
 * @map-as-wrapper
 *
 * @stable [27.07.2020]
 * @param waitingForOptions
 */
const mapWaitingForOptions = (waitingForOptions: boolean): IWaitingForOptionsWrapper =>
  FilterUtils.defValuesFilter<IWaitingForOptionsWrapper, IWaitingForOptionsWrapper>({waitingForOptions});

/**
 * @map-as-wrapper
 *
 * @stable [27.07.2020]
 * @param form
 */
const mapForm = <TForm>(form: TForm): IFormWrapper<TForm> =>
  FilterUtils.defValuesFilter<IFormWrapper<TForm>, IFormWrapper<TForm>>({form});

/**
 * @map-as-wrapper
 *
 * @stable [27.07.2020]
 * @param tabPanel
 */
const mapTabPanel = <TTabPanel>(tabPanel: TTabPanel): ITabPanelWrapper<TTabPanel> =>
  FilterUtils.defValuesFilter<ITabPanelWrapper<TTabPanel>, ITabPanelWrapper<TTabPanel>>({tabPanel});

/**
 * @map-as-wrapper
 *
 * @stable [27.07.2020]
 * @param disabled
 */
const mapDisabled = (disabled: boolean): IDisabledWrapper =>
  FilterUtils.defValuesFilter<IDisabledWrapper, IDisabledWrapper>({disabled});

/**
 * @map-as-wrapper
 *
 * @stable [27.07.2020]
 * @param sectionName
 */
const mapSectionName = (sectionName: string): ISectionNameWrapper =>
  FilterUtils.defValuesFilter<ISectionNameWrapper, ISectionNameWrapper>({sectionName});

/**
 * @map-as-wrapper
 *
 * @stable [27.07.2020]
 * @param notification
 */
const mapNotification = <TValue>(notification: TValue): INotificationWrapper<TValue> =>
  FilterUtils.defValuesFilter<INotificationWrapper<TValue>, INotificationWrapper<TValue>>({notification});

/**
 * @map-as-wrapper
 *
 * @stable [27.07.2020]
 * @param transport
 */
const mapTransport = <TValue>(transport: TValue): ITransportWrapper<TValue> =>
  FilterUtils.defValuesFilter<ITransportWrapper<TValue>, ITransportWrapper<TValue>>({transport});

/**
 * @map-as-wrapper
 *
 * @stable [27.07.2020]
 * @param channel
 */
const mapChannel = <TValue>(channel: TValue): IChannelWrapper<TValue> =>
  FilterUtils.defValuesFilter<IChannelWrapper<TValue>, IChannelWrapper<TValue>>({channel});

/**
 * @map-as-wrapper
 *
 * @stable [27.07.2020]
 * @param list
 */
const mapList = <TList>(list: TList): IListWrapper<TList> =>
  FilterUtils.defValuesFilter<IListWrapper<TList>, IListWrapper<TList>>({list});

/**
 * @map-as-wrapper
 *
 * @stable [27.07.2020]
 * @param queryFilter
 */
const mapQueryFilter = <TEntity = string>(queryFilter: TEntity): IQueryFilterWrapper<TEntity> =>
  FilterUtils.defValuesFilter<IQueryFilterWrapper<TEntity>, IQueryFilterWrapper<TEntity>>({queryFilter});

/**
 * @map-as-wrapper
 *
 * @stable [27.07.2020]
 * @param primaryFilter
 */
const mapPrimaryFilter = <TEntity = string>(primaryFilter: TEntity): IPrimaryFilterWrapper<TEntity> =>
  FilterUtils.defValuesFilter<IPrimaryFilterWrapper<TEntity>, IPrimaryFilterWrapper<TEntity>>({primaryFilter});

/**
 * @map-as-wrapper
 *
 * @stable [27.07.2020]
 * @param secondaryFilter
 */
const mapSecondaryFilter = <TEntity = string>(secondaryFilter: TEntity): ISecondaryFilterWrapper<TEntity> =>
  FilterUtils.defValuesFilter<ISecondaryFilterWrapper<TEntity>, ISecondaryFilterWrapper<TEntity>>({secondaryFilter});

/**
 * @map-as-wrapper
 *
 * @stable [27.07.2020]
 * @param {string} query
 * @returns {IQueryWrapper}
 */

/**
 * @map-as-wrapper
 *
 * @stable [27.07.2020]
 * @param query
 */
const mapQuery = (query: string): IQueryWrapper => FilterUtils.defValuesFilter<IQueryWrapper, IQueryWrapper>({query});

/**
 * @map-as-wrapper
 *
 * @stable [27.07.2020]
 * @param dictionaries
 */
const mapDictionaries = <TValue>(dictionaries: TValue): IDictionariesWrapper<TValue> =>
  FilterUtils.defValuesFilter<IDictionariesWrapper<TValue>, IDictionariesWrapper<TValue>>({dictionaries});

/**
 * @map-as-wrapper
 *
 * @stable [30.07.2020]
 * @param activeValue
 */
const mapActiveValue = <TValue>(activeValue: TValue): IActiveValueWrapper<TValue> =>
  FilterUtils.defValuesFilter<IActiveValueWrapper<TValue>, IActiveValueWrapper<TValue>>({activeValue});

/**
 * @stable [27.07.2020]
 */
export class MapAsWrapperUtils {
  public static readonly activeValue = mapActiveValue;                                                         /* stable [30.07.2020] */
  public static readonly channel = mapChannel;                                                                 /* stable [27.07.2020] */
  public static readonly dictionaries = mapDictionaries;                                                       /* stable [27.07.2020] */
  public static readonly disabled = mapDisabled;                                                               /* stable [07.05.2020] */
  public static readonly form = mapForm;                                                                       /* stable [08.05.2020] */
  public static readonly layout = mapLayout;                                                                   /* stable [27.07.2020] */
  public static readonly list = mapList;                                                                       /* stable [27.07.2020] */
  public static readonly notification = mapNotification;                                                       /* stable [27.07.2020] */
  public static readonly options = mapOptions;                                                                 /* stable [19.05.2020] */
  public static readonly primaryFilter = mapPrimaryFilter;                                                     /* stable [27.07.2020] */
  public static readonly progress = mapProgress;                                                               /* stable [10.08.2020] */
  public static readonly query = mapQuery;                                                                     /* stable [08.05.2020] */
  public static readonly queryFilter = mapQueryFilter;                                                         /* stable [08.05.2020] */
  public static readonly secondaryFilter = mapSecondaryFilter;                                                 /* stable [27.07.2020] */
  public static readonly sectionName = mapSectionName;                                                         /* stable [08.05.2020] */
  public static readonly stack = mapStack;                                                                     /* stable [27.07.2020] */
  public static readonly tabPanel = mapTabPanel;                                                               /* stable [27.07.2020] */
  public static readonly transport = mapTransport;                                                             /* stable [27.07.2020] */
  public static readonly user = mapUser;                                                                       /* stable [27.07.2020] */
  public static readonly waitingForOptions = mapWaitingForOptions;                                             /* stable [19.05.2020] */
}
