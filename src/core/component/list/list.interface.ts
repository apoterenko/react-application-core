import {
  IBaseComponentInternalProps,
  IBaseContainerInternalProps,
  IBaseContainer,
} from '../base';
import {
  DEFAULT_PAGE_SIZE,
  FIRST_PAGE,
  IEntity,
  ITouchedWrapper,
  IProgressWrapper,
  IErrorable,
  ISelectable,
  IDataWrapper,
  ISorter,
  IPageWrapper,
  IPageSizeWrapper,
  ITotalCountWrapper,
  ITotalAmountWrapper,
  IListWrapper,
} from '../../definition.interface';
import { IListItemOptions } from './item';
import { ISimpleListInternalProps } from './simple';

export interface IListOptions extends IBaseComponentInternalProps,
                                      ISimpleListInternalProps,
                                      ISorter {
  itemOptions?: IListItemOptions;
  addAction?: boolean;
}

export interface IPageOptions extends IPageWrapper,
                                      IPageSizeWrapper,
                                      ITotalCountWrapper,
                                      ITotalAmountWrapper {
}

export interface IListContainerInternalProps extends IBaseContainerInternalProps,
                                                     IListWrapper<IApplicationListState> {
  listOptions?: IListOptions;
}

export interface IListContainer extends IBaseContainer<IListContainerInternalProps, {}> {
}

export interface IListEntity<TEntity extends IEntity> {
  totalCount: number;
  page: number;
  data: TEntity[];
}

export interface IApplicationListState extends IPageOptions,
                                               IProgressWrapper,
                                               ITouchedWrapper,
                                               ISelectable<IEntity>,
                                               IErrorable<string>,
                                               IDataWrapper<IEntity[]> {
}

// @deprecated
export interface IApplicationListWrapperState extends IListWrapper<IApplicationListState> {
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
