import {
  IBaseComponentInternalProps,
  IBaseContainerInternalProps,
  IBaseContainer,
} from '../../component/base';
import {
  DEFAULT_PAGE_SIZE,
  FIRST_PAGE,
  IEntity,
  ILockable,
  ITouchable,
  IProgressable,
  IErrorable,
  ISelectable,
  IDataSource,
  IIdentifiedEntity,
  IChangeable,
  ISorter,
  IKeyValue, IPayloadable,
} from '../../definition.interface';
import { IListItemOptions } from './item';

export interface IListModifyPayload extends IIdentifiedEntity,
                                            IChangeable<IKeyValue> {
}

export interface IListModifyWrapperPayload extends IPayloadable<IListModifyPayload> {
}

export interface IListOptions extends IBaseComponentInternalProps,
                                      ISorter {
  itemOptions?: IListItemOptions;
  addAction?: boolean;
  searchAction?: boolean;
}

export interface IPageOptions {
  page: number;
  pageSize: number;
  totalCount: number;
  totalAmount?: number;
}

export interface IListContainerInternalProps extends IBaseContainerInternalProps,
                                                     IApplicationListWrapperState {
  listOptions?: IListOptions;
}

export interface IListContainer extends IBaseContainer<IListContainerInternalProps, {}> {
}

export interface IListEntity<TEntity extends IEntity> {
  totalCount: number;
  page: number;
  data: TEntity[];
}

export interface IApplicationListState extends ILockable,
                                               IPageOptions,
                                               IProgressable,
                                               ITouchable,
                                               ISelectable<IEntity>,
                                               IErrorable<string>,
                                               IDataSource<IEntity[]> {
}

export interface IApplicationListWrapperState {
  list: IApplicationListState;
}

export interface IListInternalProps extends IBaseComponentInternalProps,
                                            IApplicationListState,
                                            IListOptions {
  onSelect?(props: IEntity): void;
  onSearch?(): void;
  onCreate?(): void;
}

export const INITIAL_APPLICATION_LIST_STATE: IApplicationListState = {
  progress: false,
  touched: false,
  data: null,
  selected: null,
  page: FIRST_PAGE,
  pageSize: DEFAULT_PAGE_SIZE,
  totalCount: 0,
};

export const LIST_LOAD_ACTION_TYPE = 'list.load';
export const LIST_LOAD_DONE_ACTION_TYPE = 'list.load.done';
export const LIST_LOAD_ERROR_ACTION_TYPE = 'list.load.error';
export const LIST_LOCK_ACTION_TYPE = 'list.lock';
export const LIST_DESTROY_ACTION_TYPE = 'list.destroy';
export const LIST_SELECT_ACTION_TYPE = 'list.select';
export const LIST_SEARCH_ACTION_TYPE = 'list.search';
export const LIST_CREATE_ACTION_TYPE = 'list.create';
export const LIST_DESELECT_ACTION_TYPE = 'list.deselect';
export const LIST_UPDATE_ACTION_TYPE = 'list.update';
export const LIST_INSERT_ACTION_TYPE = 'list.insert';
export const LIST_NEXT_PAGE_ACTION_TYPE = 'list.next.page';
export const LIST_PREVIOUS_PAGE_ACTION_TYPE = 'list.previous.page';
export const LIST_FIRST_PAGE_ACTION_TYPE = 'list.first.page';
export const LIST_LAST_PAGE_ACTION_TYPE = 'list.last.page';
