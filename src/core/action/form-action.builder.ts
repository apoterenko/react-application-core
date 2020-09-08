import {
  EffectsAction,
  IEffectsAction,
} from 'redux-effects-promise';

import { SectionUtils } from '../util';
import {
  FieldConstants,
  FORM_ACTIVE_VALUE_ACTION_TYPE,
  FORM_CHANGE_ACTION_TYPE,
  FORM_CLEAR_ACTION_TYPE,
  FORM_DEFAULT_CHANGE_ACTION_TYPE,
  FORM_DESTROY_ACTION_TYPE,
  FORM_INACTIVE_VALUE_ACTION_TYPE,
  FORM_PROGRESS_ACTION_TYPE,
  FORM_RESET_ACTION_TYPE,
  FORM_SUBMIT_ACTION_TYPE,
  FORM_SUBMIT_DONE_ACTION_TYPE,
  FORM_SUBMIT_ERROR_ACTION_TYPE,
  FORM_SUBMIT_FINISH_ACTION_TYPE,
  FORM_VALID_ACTION_TYPE,
  IApiEntity,
  IFluxActiveValueEntity,
  IFluxFieldsChangesEntity,
  IFluxValidEntity,
} from '../definition';
import { IKeyValue } from '../definitions.interface';

/**
 * @action-builder
 * @stable [08.09.2020]
 */
export class FormActionBuilder {

  /**
   * @stable [08.09.2020]
   * @param section
   */
  public static buildDestroyActionType(section: string): string {
    return `${SectionUtils.actionPrefix(section)}.${FORM_DESTROY_ACTION_TYPE}`;
  }

  /**
   * @stable [08.09.2020]
   * @param section
   */
  public static buildClearActionType(section: string): string {
    return `${SectionUtils.actionPrefix(section)}.${FORM_CLEAR_ACTION_TYPE}`;
  }

  /**
   * @stable [08.09.2020]
   * @param section
   */
  public static buildChangeActionType(section: string): string {
    return `${SectionUtils.actionPrefix(section)}.${FORM_CHANGE_ACTION_TYPE}`;
  }

  /**
   * @stable [08.09.2020]
   * @param section
   */
  public static buildDefaultChangeActionType(section: string): string {
    return `${SectionUtils.actionPrefix(section)}.${FORM_DEFAULT_CHANGE_ACTION_TYPE}`;
  }

  /**
   * @stable [08.09.2020]
   * @param section
   */
  public static buildResetActionType(section: string): string {
    return `${SectionUtils.actionPrefix(section)}.${FORM_RESET_ACTION_TYPE}`;
  }

  /**
   * @stable [08.09.2020]
   * @param section
   */
  public static buildValidActionType(section: string): string {
    return `${SectionUtils.actionPrefix(section)}.${FORM_VALID_ACTION_TYPE}`;
  }

  /**
   * @stable [08.09.2020]
   * @param section
   */
  public static buildActiveValueActionType(section: string): string {
    return `${SectionUtils.actionPrefix(section)}.${FORM_ACTIVE_VALUE_ACTION_TYPE}`;
  }

  /**
   * @stable [08.09.2020]
   * @param section
   */
  public static buildInactiveValueActionType(section: string): string {
    return `${SectionUtils.actionPrefix(section)}.${FORM_INACTIVE_VALUE_ACTION_TYPE}`;
  }

  /**
   * @stable [08.09.2020]
   * @param section
   */
  public static buildSubmitActionType(section: string): string {
    return `${SectionUtils.actionPrefix(section)}.${FORM_SUBMIT_ACTION_TYPE}`;
  }

  /**
   * @stable [08.09.2020]
   * @param section
   */
  public static buildProgressActionType(section: string): string {
    return `${SectionUtils.actionPrefix(section)}.${FORM_PROGRESS_ACTION_TYPE}`;
  }

  /**
   * @stable [08.09.2020]
   * @param section
   */
  public static buildSubmitDoneActionType(section: string): string {
    return `${SectionUtils.actionPrefix(section)}.${FORM_SUBMIT_DONE_ACTION_TYPE}`;
  }

  /**
   * @stable [08.09.2020]
   * @param section
   */
  public static buildSubmitFinishActionType(section: string): string {
    return `${SectionUtils.actionPrefix(section)}.${FORM_SUBMIT_FINISH_ACTION_TYPE}`;
  }

  /**
   * @stable [08.09.2020]
   * @param section
   */
  public static buildSubmitErrorActionType(section: string): string {
    return `${SectionUtils.actionPrefix(section)}.${FORM_SUBMIT_ERROR_ACTION_TYPE}`;
  }

  /**
   * @stable [08.09.2020]
   * @param section
   */
  public static buildSubmitDoneAction(section: string): IEffectsAction {
    return EffectsAction.create(this.buildSubmitDoneActionType(section), SectionUtils.applySection(section));
  }

  /**
   * @stable [08.09.2020]
   * @param section
   */
  public static buildResetAction(section: string): IEffectsAction {
    return EffectsAction.create(this.buildResetActionType(section), SectionUtils.applySection(section));
  }

  /**
   * @stable [08.09.2020]
   * @param section
   */
  public static buildProgressAction(section: string): IEffectsAction {
    return EffectsAction.create(this.buildProgressActionType(section), SectionUtils.applySection(section));
  }

  /**
   * @stable [03.02.2020]
   * @param {string} section
   * @param {boolean} valid
   * @returns {IEffectsAction}
   */
  public static buildValidAction(section: string, valid: boolean): IEffectsAction {
    const plainAction = this.buildValidPlainAction(section, valid);
    return EffectsAction.create(plainAction.type, plainAction.data);
  }

  /**
   * @stable [08.09.2020]
   * @param section
   */
  public static buildSubmitFinishAction(section: string): IEffectsAction {
    const plainAction = this.buildSubmitFinishPlainAction(section);
    return EffectsAction.create(plainAction.type, plainAction.data);
  }

  /**
   * @stable [08.09.2020]
   * @param section
   */
  public static buildDestroyAction(section: string): IEffectsAction {
    return EffectsAction.create(this.buildDestroyActionType(section), SectionUtils.applySection(section));
  }

  /**
   * @stable [08.09.2020]
   * @param section
   * @param fieldName
   */
  public static buildClearAction(section: string, fieldName: string): IEffectsAction {
    const plainAction = this.buildClearPlainAction(section, fieldName);
    return EffectsAction.create(plainAction.type, plainAction.data);
  }

  /**
   * @stable [08.09.2020]
   * @param section
   * @param changes
   */
  public static buildChangesAction<TData = {}>(section: string, changes: TData): IEffectsAction {
    const plainAction = this.buildChangesPlainAction(section, changes);
    return EffectsAction.create(plainAction.type, plainAction.data);
  }

  /**
   * @stable [08.09.2020]
   * @param section
   * @param changes
   */
  public static buildDefaultChangesAction<TData = {}>(section: string,
                                                      changes: TData): IEffectsAction {
    const plainAction = this.buildDefaultChangesPlainAction(section, changes);
    return EffectsAction.create(plainAction.type, plainAction.data);
  }

  /**
   * @stable [08.09.2020]
   * @param section
   * @param fieldName
   */
  public static buildClearPlainAction(section: string, fieldName: string): IEffectsAction {
    return {
      type: this.buildClearActionType(section),
      data: SectionUtils.applySection(
        section,
        this.buildChangesPayload({[fieldName]: FieldConstants.VALUE_TO_CLEAR_DIRTY_CHANGES})
      ),
    };
  }

  /**
   * @stable [08.09.2020]
   * @param section
   */
  public static buildResetPlainAction(section: string): IEffectsAction {
    return {type: this.buildResetActionType(section), data: SectionUtils.applySection(section)};
  }

  /**
   * @stable [08.09.2020]
   * @param section
   * @param apiEntity
   */
  public static buildSubmitPlainAction(section: string, apiEntity: IApiEntity): IEffectsAction {
    return {type: this.buildSubmitActionType(section), data: SectionUtils.applySection(section, apiEntity)};
  }

  /**
   * @stable [08.09.2020]
   * @param section
   * @param valid
   */
  public static buildValidPlainAction(section: string, valid: boolean): IEffectsAction {
    const fluxEntity: IFluxValidEntity = {valid};
    return {type: this.buildValidActionType(section), data: SectionUtils.applySection(section, fluxEntity)};
  }

  /**
   * @stable [08.09.2020]
   * @param section
   * @param payload
   */
  public static buildActiveValuePlainAction(section: string, payload: number): IEffectsAction {
    const fluxEntity: IFluxActiveValueEntity = {payload};
    return {type: this.buildActiveValueActionType(section), data: SectionUtils.applySection(section, fluxEntity)};
  }

  /**
   * @stable [08.09.2020]
   * @param section
   * @param payload
   */
  public static buildInactiveValuePlainAction(section: string, payload: number): IEffectsAction {
    const fluxEntity: IFluxActiveValueEntity = {payload};
    return {type: this.buildInactiveValueActionType(section), data: SectionUtils.applySection(section, fluxEntity)};
  }

  /**
   * @stable [08.09.2020]
   * @param section
   */
  public static buildSubmitFinishPlainAction(section: string): IEffectsAction {
    return {type: this.buildSubmitFinishActionType(section), data: SectionUtils.applySection(section)};
  }

  /**
   * @stable [08.09.2020]
   * @param section
   * @param changes
   */
  public static buildChangesPlainAction<TData = {}>(section: string, changes: TData): IEffectsAction {
    return {
      type: this.buildChangeActionType(section),
      data: SectionUtils.applySection(section, this.buildChangesPayload(changes)),
    };
  }

  /**
   * @stable [08.09.2020]
   * @param section
   * @param changes
   */
  public static buildDefaultChangesPlainAction<TData = {}>(section: string, changes: TData): IEffectsAction {
    return {
      type: this.buildDefaultChangeActionType(section),
      data: SectionUtils.applySection(section, this.buildChangesPayload(changes)),
    };
  }

  /**
   * @stable [08.09.2020]
   * @param fields
   * @private
   */
  private static buildChangesPayload(fields: IKeyValue): IFluxFieldsChangesEntity {
    return {fields};
  }
}
