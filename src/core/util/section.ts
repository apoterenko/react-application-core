import { IEffectsAction } from 'redux-effects-promise';

import {
  ACTION_PREFIX,
  IKeyValue,
  ISectionWrapper,
} from '../definitions.interface';
import {
  IActionStateEntity,
  IContainerMiddlewareConfigEntity,
  IFluxSectionDataEntity,
  IFormMiddlewareConfigEntity,
  IListMiddlewareConfigEntity,
  ITabPanelMiddlewareConfigEntity,
  SectionT,
} from '../definition';
import { CalcUtils } from './calc';
import { ConditionUtils } from './cond';
import { FilterUtils } from './filter';
import { NvlUtils } from './nvl';
import { TypeUtils } from './type';

/**
 * @stable [08.09.2020]
 * @param section
 * @param data
 */
export const applySection =
  <TResult extends IFluxSectionDataEntity = IFluxSectionDataEntity>(section: string, data?: IKeyValue | IKeyValue[]): TResult =>
    ({
      section,
      ...(
        ConditionUtils.ifNotEmptyThanValue(
          data,
          () => (
            Array.isArray(data)
              ? TypeUtils.asType<IFluxSectionDataEntity>({data})
              : data
          )
        )
      ),
    }) as TResult;

/**
 * @stable [26.07.2020]
 * @param section
 */
const actionPrefix = (section: string): string => `${ACTION_PREFIX}${section}`;

/**
 * @stable [05.12.2019]
 * @param {IEffectsAction} action
 * @returns {string}
 */
export const toSection = (action: IEffectsAction): string =>
  NvlUtils.nvl(
    ConditionUtils.ifNotNilThanValue(
      action.data,
      (data: ISectionWrapper) => data.section
    ),
    ConditionUtils.ifNotNilThanValue(
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
    CalcUtils.calc(
      section,
      FilterUtils.defValuesFilter<IActionStateEntity<TState>, IActionStateEntity<TState>>({action: cfg.action, state: cfg.state})
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

/**
 * @stable [26.07.2020]
 */
export class SectionUtils {
  public static readonly actionPrefix = actionPrefix;
  public static readonly applySection = applySection;
}
