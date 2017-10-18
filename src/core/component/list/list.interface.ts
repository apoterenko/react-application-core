import {
  IBaseComponentInternalProps,
  IBaseContainerInternalProps,
  IBaseContainer,
} from '../../component/base';
import { IEntity, ILockable } from '../../definition.interface';
import { IListItemOptions } from './item/list-item.interface';

export interface IListOptions extends IBaseComponentInternalProps {
  itemOptions?: IListItemOptions;
  addAction?: boolean;
}

export interface IPageOptions {
  page: number;
  pageSize?: number;
  totalCount: number;
  totalAmount?: number;
}

export interface IListContainerInternalProps extends IBaseContainerInternalProps,
                                                     IApplicationListAttributesWrapper {
  listOptions?: IListOptions;
}

export interface IListContainer extends IBaseContainer<IListContainerInternalProps, {}> {
}

export interface IListEntity<TEntity extends IEntity> {
  totalCount: number;
  page: number;
  data: TEntity[];
}

export interface IApplicationListAttributes extends ILockable, IPageOptions {
  progress: boolean;
  data: IEntity[];
  selected: IEntity;
  error?: string;
  dirty: boolean;
}

export interface IApplicationListAttributesWrapper {
  list: IApplicationListAttributes;
}

export interface IListInternalProps extends IBaseComponentInternalProps,
                                            IApplicationListAttributes,
                                            IListOptions {
  onSelect?(props: IEntity): void;
  onAddItem?(): void;
}

export interface IApplicationListState extends IApplicationListAttributes {
}

export interface IApplicationListWrapperState {
  list: IApplicationListState;
}

export const INITIAL_APPLICATION_LIST_STATE: IApplicationListState = {
  progress: false,
  dirty: false,
  data: null,
  selected: null,
  page: 1,
  totalCount: 0,
};

export const LIST_LOAD_ACTION_TYPE = 'list.load';
export const LIST_LOAD_DONE_ACTION_TYPE = 'list.load.done';
export const LIST_LOAD_ERROR_ACTION_TYPE = 'list.load.error';
export const LIST_LOCK_ACTION_TYPE = 'list.lock';
export const LIST_DESTROY_ACTION_TYPE = 'list.destroy';
export const LIST_SELECT_ACTION_TYPE = 'list.select';
export const LIST_ADD_ITEM_ACTION_TYPE = 'list.add.item';
export const LIST_DESELECT_ACTION_TYPE = 'list.deselect';
export const LIST_UPDATE_ACTION_TYPE = 'list.update';
export const LIST_INSERT_ACTION_TYPE = 'list.insert';
export const LIST_NEXT_PAGE_ACTION_TYPE = 'list.next.page';
export const LIST_PREVIOUS_PAGE_ACTION_TYPE = 'list.previous.page';
