/**
 * @stable [29.08.2020]
 */
export type KeyValuePredicateT = <TValue = unknown>(key: string, value: TValue) => boolean;
export type ValuePredicateT = (value: unknown) => boolean;

/**
 * @stable [27.04.2020]
 */
export const FILTER_ACTIVATE_ACTION_TYPE = 'filter.activate';
export const FILTER_APPLY_ACTION_TYPE = 'filter.apply';
export const FILTER_CHANGE_ACTION_TYPE = 'filter.change';
export const FILTER_DEACTIVATE_ACTION_TYPE = 'filter.deactivate';
export const FILTER_DESTROY_ACTION_TYPE = 'filter.destroy';
