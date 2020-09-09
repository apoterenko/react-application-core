import {
  ACTION_PREFIX,
  IKeyValue,
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
const applySection =
  <TResult extends IFluxSectionDataEntity = IFluxSectionDataEntity, TData = IKeyValue | IKeyValue[]>(
    section: string, data?: TData): TResult =>
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
 * @stable [09.09.2020]
 * @param section
 * @param cfg
 */
const asConfigSection =
  <TState = {}>(section: SectionT<TState>, cfg: IActionStateEntity<TState>): string =>
    CalcUtils.calc(
      section,
      FilterUtils.defValuesFilter<IActionStateEntity<TState>, IActionStateEntity<TState>>({action: cfg.action, state: cfg.state})
    );

/**
 * @stable [09.09.2020]
 * @param cfg
 */
const asListSection =
  <TState = {}>(cfg: IListMiddlewareConfigEntity<TState> & IActionStateEntity<TState>): string =>
    asConfigSection(cfg.listSection, cfg);

/**
 * @stable [09.09.2020]
 * @param cfg
 */
const asContainerSection =
  <TState = {}>(cfg: IContainerMiddlewareConfigEntity<TState> & IActionStateEntity<TState>): string =>
    asConfigSection(cfg.containerSection, cfg);

/**
 * @stable [09.09.2020]
 * @param cfg
 */
const asFormSection =
  <TState = {}>(cfg: IFormMiddlewareConfigEntity<TState> & IActionStateEntity<TState>): string =>
    asConfigSection(cfg.formSection, cfg);

/**
 * @stable [09.09.2020]
 * @param cfg
 */
const asFormOrListSection =
  <TState = {}>(cfg: IFormMiddlewareConfigEntity<TState> & IListMiddlewareConfigEntity<TState> & IActionStateEntity<TState>): string =>
    NvlUtils.nvl(asFormSection(cfg), asListSection(cfg));

/**
 * @stable [12.04.2020]
 * @param {ITabPanelMiddlewareConfigEntity<TState> & IActionStateEntity<TState>} cfg
 * @returns {string}
 */
export const toTabPanelSection =
  <TState = {}>(cfg: ITabPanelMiddlewareConfigEntity<TState> & IActionStateEntity<TState>): string =>
    asConfigSection(cfg.tabPanelSection, cfg);

/**
 * @stable [26.07.2020]
 */
export class SectionUtils {
  public static readonly actionPrefix = actionPrefix;
  public static readonly applySection = applySection;
  public static readonly asContainerSection = asContainerSection;
  public static readonly asFormOrListSection = asFormOrListSection;
  public static readonly asFormSection = asFormSection;
  public static readonly asListSection = asListSection;
}
