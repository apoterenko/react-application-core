import { IEffectsAction } from 'redux-effects-promise';

import {
  ACTION_PREFIX,
  IKeyValue,
  ISectionWrapper,
} from '../definitions.interface';
import {
  ifNotEmptyThanValue,
  ifNotNilThanValue,
} from './cond';
import {
  IActionStateEntity,
  IContainerMiddlewareConfigEntity,
  IFormMiddlewareConfigEntity,
  IListMiddlewareConfigEntity,
  IFluxSectionDataEntity,
  ITabPanelMiddlewareConfigEntity,
  SectionT,
} from '../definition';
import { nvl } from './nvl';
import { toType } from './type';
import { calc } from './calc';
import { defValuesFilter } from './filter';

/**
 * @stable [04.12.2019]
 * @param {string} section
 * @param {IKeyValue | IKeyValue[]} data
 * @returns {TResult}
 */
export const applySection =
  <TResult extends IFluxSectionDataEntity = IFluxSectionDataEntity>(section: string, data?: IKeyValue | IKeyValue[]): TResult =>
    ({
      section,
      ...(
        ifNotEmptyThanValue(
          data,
          () => (
            Array.isArray(data)
              ? toType<IFluxSectionDataEntity>({data})
              : data
          )
        )
      ),
    }) as TResult;

/**
 * @stable [31.08.2018]
 * @param {string} section
 * @returns {string}
 */
export const toActionPrefix = (section: string): string => `${ACTION_PREFIX}${section}`;

/**
 * @stable [05.12.2019]
 * @param {IEffectsAction} action
 * @returns {string}
 */
export const toSection = (action: IEffectsAction): string =>
  nvl(
    ifNotNilThanValue(
      action.data,
      (data: ISectionWrapper) => data.section
    ),
    ifNotNilThanValue(
      action.initialData,
      (initialData: ISectionWrapper) => initialData.section
    )
  );

/**
 * @stable [11.04.2020]
 * @param {SectionT<TState>} section
 * @param {IActionStateEntity<TState>} cfg
 * @returns {string}
 */
const toConfigSection =
  <TState = {}>(section: SectionT<TState>, cfg: IActionStateEntity<TState>): string =>
    calc(
      section,
      defValuesFilter<IActionStateEntity<TState>, IActionStateEntity<TState>>({action: cfg.action, state: cfg.state})
    );

/**
 * @stable [11.04.2020]
 * @param {IListMiddlewareConfigEntity<TState> & IActionStateEntity<TState>} cfg
 * @returns {string}
 */
export const toListSection =
  <TState = {}>(cfg: IListMiddlewareConfigEntity<TState> & IActionStateEntity<TState>): string =>
    toConfigSection(cfg.listSection, cfg);

/**
 * @stable [11.04.2020]
 * @param {IContainerMiddlewareConfigEntity<TState> & IActionStateEntity<TState>} cfg
 * @returns {string}
 */
export const toContainerSection =
  <TState = {}>(cfg: IContainerMiddlewareConfigEntity<TState> & IActionStateEntity<TState>): string =>
    toConfigSection(cfg.containerSection, cfg);

/**
 * @stable [11.04.2020]
 * @param {IFormMiddlewareConfigEntity<TState> & IActionStateEntity<TState>} cfg
 * @returns {string}
 */
export const toFormSection =
  <TState = {}>(cfg: IFormMiddlewareConfigEntity<TState> & IActionStateEntity<TState>): string =>
    toConfigSection(cfg.formSection, cfg);

/**
 * @stable [12.04.2020]
 * @param {ITabPanelMiddlewareConfigEntity<TState> & IActionStateEntity<TState>} cfg
 * @returns {string}
 */
export const toTabPanelSection =
  <TState = {}>(cfg: ITabPanelMiddlewareConfigEntity<TState> & IActionStateEntity<TState>): string =>
    toConfigSection(cfg.tabPanelSection, cfg);
