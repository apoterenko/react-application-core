import * as React from 'react';
import { injectable } from 'inversify';
import {
  ILogger,
  LoggerFactory,
} from 'ts-smart-logger';
import { IEffectsAction } from 'redux-effects-promise';

import {
  ConditionUtils,
  ObjectUtils,
  Selectors,
  TypeUtils,
} from '../../../util';
import {
  ConnectorActionBuilder,
  RouterActionBuilder,
  StackActionBuilder,
} from '../../../action';
import {
  DI_TYPES,
  DiServices,
  lazyInject,
} from '../../../di';
import {
  DynamicSectionsMapT,
  IBasicConnectorEntity,
  IConnectorContainerFactory,
  IDomAccessor,
  IEnvironment,
  IGenericConnectorContainerState,
  IGenericContainerCtor,
  IGenericContainerProps,
  IUiFactory,
} from '../../../definition';

@injectable()
export class ConnectorContainerFactory implements IConnectorContainerFactory {

  private static readonly logger = LoggerFactory.makeLogger('ConnectorContainerFactory');

  @lazyInject(DI_TYPES.DynamicSections) private readonly dynamicSections: DynamicSectionsMapT;
  @lazyInject(DI_TYPES.Environment) private readonly environment: IEnvironment;

  /**
   * @stable [19.03.2021]
   * @param target
   * @param section
   * @param config
   */
  public fromTarget(target: IGenericContainerCtor<IGenericContainerProps, IGenericConnectorContainerState>,
                    section: string,
                    config: IBasicConnectorEntity): IGenericContainerCtor {
    const dynamicSections = this.dynamicSections;
    const environment = this.environment;

    // tslint:disable:max-classes-per-file
    return class extends target {

      /**
       * @stable [18.09.2020]
       * @param originalProps
       */
      constructor(originalProps: IGenericContainerProps) {
        super(originalProps);

        this.state = this.state || {};

        ConnectorContainerFactory.logger.debug(`[$ConnectorContainerFactory][constructor] Section: ${section}`);
      }

      /**
       * @stable [18.09.2020]
       */
      public render(): React.ReactNode {
        const {
          error,
        } = this.state;
        if (error) {
          if (this.rootPathOfFirstStackItem) {
            return null;
          }
          return this.uiFactory.makeReactError(error);
        }
        try {
          if (TypeUtils.isFn(super.render)) {
            return super.render();
          } else {
            return null;
          }
        } catch (e) {
          // If componentDidCatch doesn't work
          ConnectorContainerFactory.logger.error(`[$ConnectorContainerFactory][render] Error:`, error);

          this.setState({error: e});
          return null;
        }
      }

      /**
       * @stable [11.06.2020]
       */
      public componentWillUnmount(): void {
        this.$dispatch(StackActionBuilder.buildPopPlainAction({section}));
        this.$dispatch(ConnectorActionBuilder.buildDestroyPlainAction(section));

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
        this.$dispatch(StackActionBuilder.buildPushPlainAction({section, url: environment.path}));
        this.$dispatch(ConnectorActionBuilder.buildInitPlainAction(section));

        ConnectorContainerFactory.logger.debug(
          `[$ConnectorContainerFactory][componentDidMount] Section: ${section}`
        );

        if (TypeUtils.isFn(super.componentDidMount)) {
          super.componentDidMount();
        }

        if (config.autoScrollToInitPosition) {
          this.domAccessor.scrollTo({top: 0, left: 0});
        }
      }

      /**
       * @stable [19.09.2020]
       * @param prevProps
       * @param prevState
       * @param snapshot
       */
      public componentDidUpdate(prevProps: Readonly<IGenericContainerProps>,
                                prevState: Readonly<IGenericConnectorContainerState>,
                                snapshot?: unknown): void {
        if (TypeUtils.isFn(super.componentDidUpdate)) {
          super.componentDidUpdate(prevProps, prevState, snapshot);
        }

        if (ObjectUtils.isCurrentValueNotEqualPreviousValue(this.state.error, prevState.error)) {
          const rootPathOfFirstStackItem = this.rootPathOfFirstStackItem;
          if (rootPathOfFirstStackItem) {
            this.$dispatch(RouterActionBuilder.buildNavigatePlainAction(rootPathOfFirstStackItem));
          }
        }
      }

      /**
       * @stable [19.09.2020]
       * @param error
       * @param errorInfo
       */
      public componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        if (TypeUtils.isFn(super.componentDidCatch)) {
          super.componentDidCatch(error, errorInfo);
        }

        ConnectorContainerFactory.logger.error(`[$ConnectorContainerFactory][componentDidCatch] Error:`, error);
        this.setState({error});
      }

      /**
       * @stable [19.09.2020]
       * @param action
       */
      private $dispatch(action: IEffectsAction): void {
        this.originalProps.dispatch(action);
      }

      /**
       * @stable [18.09.2020]
       */
      private get rootPathOfFirstStackItem(): string {
        return ConditionUtils.ifNotNilThanValue(
          Selectors.firstStackItemEntity(this.originalProps),
          (firstStackItemEntity) =>
            ConditionUtils.ifNotNilThanValue(
              dynamicSections.get(firstStackItemEntity.section),
              (connectorEntity) =>
                ConditionUtils.ifNotNilThanValue(
                  connectorEntity.routeConfiguration.rootPath,
                  (rootPath) => rootPath
                )
            )
        );
      }

      /**
       * @stable [19.09.2020]
       */
      private get originalProps(): IGenericContainerProps {
        return this.props as IGenericContainerProps;
      }

      /**
       * @stable [19.09.2020]
       */
      private get uiFactory(): IUiFactory {
        return DiServices.uiFactory(); // Without injection (!), because runtime service may be overridden
      }

      /**
       * @stable [19.03.2021]
       */
      private get domAccessor(): IDomAccessor {
        return DiServices.domAccessor(); // Without injection (!), because runtime service may be overridden
      }
    };
    // tslint:enable:max-classes-per-file
  }
}
