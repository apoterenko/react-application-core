import {
  EffectsAction,
  IEffectsAction,
} from 'redux-effects-promise';

import {
  IEntityActionBuilder,
  IEntityReducerFactoryConfigEntity,
} from '../definition';
import {
  IReplacedWrapper,
  ISelectedWrapper,
  IUpdatedWrapper,
} from '../definitions.interface';
import { JoinUtils } from './join';

/**
 * @stable [16.12.2020]
 * @param config
 */
const makeEntityActionBuilderFactory =
  <TValue = {}>(config: IEntityReducerFactoryConfigEntity): IEntityActionBuilder<TValue> =>
    Reflect.construct(class implements IEntityActionBuilder {

      /**
       * @stable [16.12.2020]
       * @param replaced
       */
      public buildReplaceAction<TPayload = TValue>(replaced: TPayload): IEffectsAction {
        const plainAction = this.buildReplacePlainAction(replaced);
        return EffectsAction.create(plainAction.type, plainAction.data);
      }

      /**
       * @stable [16.12.2020]
       */
      public buildDestroyAction(): IEffectsAction {
        const plainAction = this.buildDestroyPlainAction();
        return EffectsAction.create(plainAction.type);
      }

      /**
       * @stable [16.12.2020]
       * @param updated
       */
      public buildUpdateAction<TPayload = TValue>(updated: TPayload): IEffectsAction {
        const payloadWrapper: IUpdatedWrapper<TPayload> = {updated};
        return EffectsAction.create(config.update, payloadWrapper);
      }

      /**
       * @stable [16.12.2020]
       * @param selected
       */
      public buildSelectAction<TPayload = TValue>(selected: TPayload): IEffectsAction {
        const plainAction = this.buildSelectPlainAction(selected);
        return EffectsAction.create(plainAction.type, plainAction.data);
      }

      /**
       * @stable [16.12.2020]
       * @param selected
       */
      public buildSelectPlainAction<TPayload = TValue>(selected: TPayload): IEffectsAction {
        const payloadWrapper: ISelectedWrapper<TPayload> = {selected};
        return {type: config.select, data: payloadWrapper};
      }

      /**
       * @stable [15.04.2021]
       * @param replaced
       */
      public buildReplacePlainAction<TPayload = TValue>(replaced: TPayload): IEffectsAction {
        const payloadWrapper: IReplacedWrapper<TPayload> = {replaced};
        return {type: config.replace, data: payloadWrapper};
      }

      /**
       * @stable [16.12.2020]
       */
      public buildDestroyPlainAction(): IEffectsAction {
        return {type: config.destroy};
      }
    }, []);

/**
 * @stable [16.04.2021]
 * @param action
 */
const asPlainAction = (action: IEffectsAction): IEffectsAction => ({...action});

/**
 * @stable [07.07.2021]
 */
const asComplexActionType = (prefix: string, postfix: string): string => JoinUtils.join([prefix, postfix], '.');

/**
 * @stable [16.12.2020]
 */
// tslint:disable:max-classes-per-file
export class ActionUtils {
  public static readonly asComplexActionType = asComplexActionType;
  public static readonly asPlainAction = asPlainAction;
  public static readonly entityActionBuilderFactory = makeEntityActionBuilderFactory;
}
// tslint:enable:max-classes-per-file
