import { injectable } from 'inversify';
import {
  ILogger,
  LoggerFactory,
} from 'ts-smart-logger';

import {
  isFn,
  patchRenderMethod,
} from '../../../util';
import {
  ConnectorActionBuilder,
  StackActionBuilder,
} from '../../../action';
import {
  DI_TYPES,
  getStore,
  lazyInject,
} from '../../../di';
import {
  IEnvironment,
  IUniversalConnectorContainerFactory,
  IUniversalContainerCtor,
  IUniversalContainerProps,
  IUniversalStoreEntity,
} from '../../../definition';

@injectable()
export class UniversalConnectorContainerFactory
  implements IUniversalConnectorContainerFactory {

  private static readonly logger = LoggerFactory.makeLogger('UniversalConnectorContainerFactory');

  @lazyInject(DI_TYPES.Environment) private readonly environment: IEnvironment;

  /**
   * @stable [19.12.2019]
   * @param {IUniversalContainerCtor} target
   * @param {string} section
   * @returns {IUniversalContainerCtor}
   */
  public fromTarget(target: IUniversalContainerCtor,
                    section: string): IUniversalContainerCtor {
    const environment = this.environment;

    // tslint:disable:max-classes-per-file
    return class extends target {

      /**
       * @stable [09.10.2019]
       * @param {IUniversalContainerProps} props
       */
      constructor(props: IUniversalContainerProps) {
        super(props);
        patchRenderMethod(this);

        UniversalConnectorContainerFactory.logger.debug(
          `[$UniversalConnectorContainerFactory][constructor] Section: ${section}`
        );
      }

      /**
       * @stable [02.12.2019]
       */
      public componentWillUnmount(): void {
        const store = getStore();
        store.dispatch(StackActionBuilder.buildPopPlainAction({section}));
        store.dispatch(ConnectorActionBuilder.buildDestroyPlainAction(section));

        UniversalConnectorContainerFactory.logger.debug(
          `[$UniversalConnectorContainerFactory][componentWillUnmount] Section: ${section}`
        );

        if (isFn(super.componentWillUnmount)) {
          super.componentWillUnmount();
        }
      }

      /**
       * @stable [11.09.2019]
       */
      public componentDidMount(): void {
        const store = getStore();
        store.dispatch(StackActionBuilder.buildPushPlainAction({section, url: environment.path}));
        store.dispatch(ConnectorActionBuilder.buildInitPlainAction(section));

        UniversalConnectorContainerFactory.logger.debug(
          `[$UniversalConnectorContainerFactory][componentDidMount] Section: ${section}`
        );

        if (isFn(super.componentDidMount)) {
          super.componentDidMount();
        }
      }
    };
    // tslint:enable:max-classes-per-file
  }
}
