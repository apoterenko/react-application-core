import { injectable } from 'inversify';
import {
  ILogger,
  LoggerFactory,
} from 'ts-smart-logger';

import {
  PatchUtils,
  TypeUtils,
} from '../../../util';
import {
  ConnectorActionBuilder,
  StackActionBuilder,
} from '../../../action';
import {
  DI_TYPES,
  DiServices,
  lazyInject,
} from '../../../di';
import {
  IConnectorContainerFactory,
  IEnvironment,
  IGenericContainerCtor,
  IGenericContainerProps,
} from '../../../definition';

@injectable()
export class ConnectorContainerFactory implements IConnectorContainerFactory {

  private static readonly logger = LoggerFactory.makeLogger('ConnectorContainerFactory');

  @lazyInject(DI_TYPES.Environment) private readonly environment: IEnvironment;

  /**
   * @stable [11.06.2020]
   * @param {IGenericContainerCtor} target
   * @param {string} section
   * @returns {IGenericContainerCtor}
   */
  public fromTarget(target: IGenericContainerCtor,
                    section: string): IGenericContainerCtor {
    const environment = this.environment;

    // tslint:disable:max-classes-per-file
    return class extends target {

      /**
       * @stable [11.06.2020]
       * @param {IGenericContainerProps} props
       */
      constructor(props: IGenericContainerProps) {
        super(props);
        PatchUtils.patchRenderMethod(this);

        ConnectorContainerFactory.logger.debug(
          `[$ConnectorContainerFactory][constructor] Section: ${section}`
        );
      }

      /**
       * @stable [11.06.2020]
       */
      public componentWillUnmount(): void {
        const store = DiServices.store();

        store.dispatch(StackActionBuilder.buildPopPlainAction({section}));
        store.dispatch(ConnectorActionBuilder.buildDestroyPlainAction(section));

        ConnectorContainerFactory.logger.debug(
          `[$ConnectorContainerFactory][componentWillUnmount] Section: ${section}`
        );

        if (TypeUtils.isFn(super.componentWillUnmount)) {
          super.componentWillUnmount();
        }
      }

      /**
       * @stable [11.06.2020]
       */
      public componentDidMount(): void {
        const store = DiServices.store();

        store.dispatch(StackActionBuilder.buildPushPlainAction({section, url: environment.path}));
        store.dispatch(ConnectorActionBuilder.buildInitPlainAction(section));

        ConnectorContainerFactory.logger.debug(
          `[$ConnectorContainerFactory][componentDidMount] Section: ${section}`
        );

        if (TypeUtils.isFn(super.componentDidMount)) {
          super.componentDidMount();
        }
      }
    };
    // tslint:enable:max-classes-per-file
  }
}
