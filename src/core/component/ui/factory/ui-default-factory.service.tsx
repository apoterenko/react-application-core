import * as React from 'react';
import { injectable } from 'inversify';
import { Store } from 'redux';

import { Button } from '../../button';
import { DI_TYPES, lazyInject } from '../../../di';
import {
  ErrorEventCategoriesEnum,
  IDomAccessor,
  IEnvironment,
  ILogManager,
  IRouter,
  IRoutesEntity,
  IUniversalStoreEntity,
} from '../../../definition';
import { ISettingsEntity } from '../../../settings';
import { IUIFactory } from '../../factory';
import {
  getCurrentUrlPath,
  ifNotNilThanValue,
  joinClassName,
} from '../../../util';

@injectable()
export class UIDefaultFactory implements IUIFactory {
  @lazyInject(DI_TYPES.DomAccessor) protected readonly domAccessor: IDomAccessor;
  @lazyInject(DI_TYPES.Environment) protected readonly environment: IEnvironment;
  @lazyInject(DI_TYPES.LogManager) protected readonly logManager: ILogManager;
  @lazyInject(DI_TYPES.Router) protected readonly router: IRouter;
  @lazyInject(DI_TYPES.Routes) protected readonly routes: IRoutesEntity;
  @lazyInject(DI_TYPES.Settings) protected readonly settings: ISettingsEntity;
  @lazyInject(DI_TYPES.Store) protected readonly store: Store<IUniversalStoreEntity>;

  /**
   * @stable [07.10.2019]
   */
  constructor() {
    this.onRestart = this.onRestart.bind(this);
  }

  /**
   * @stable [30.09.2019]
   * @param {Error} e
   * @returns {JSX.Element}
   */
  public makeWindowErrorElement(e: Error): Element {
    this.logError(ErrorEventCategoriesEnum.WINDOW_ERROR, e);

    const errorMessageEl = this.domAccessor.createElement();
    this.domAccessor.addClassNameToElement(errorMessageEl, ...this.getErrorWrapperClassNames());
    this.domAccessor.addChild(errorMessageEl);

    errorMessageEl.innerHTML = `
      <div class='${joinClassName(...this.getErrorClassNames())}'>
        ${this.buildErrorMessages(e).join('<br>')}
      </div>
    `;
    return errorMessageEl;
  }

  /**
   * @stable [07.10.2019]
   * @param {Error} e
   * @returns {React.ReactNode}
   */
  public makeReactErrorElement(e: Error): React.ReactNode {
    this.logError(ErrorEventCategoriesEnum.REACT_ERROR, e);

    return (
      <div className={joinClassName(...this.getErrorWrapperClassNames())}>
        <div className={joinClassName(...this.getErrorClassNames())}>
          {this.makeReactErrorBodyElement(e)}
        </div>
      </div>
    );
  }

  /**
   * @stable [07.10.2019]
   * @param {Error} e
   * @returns {JSX.Element}
   */
  protected makeReactErrorBodyElement(e: Error): JSX.Element {
    return (
      <React.Fragment>
        {this.restartActionElement}
        {this.getErrorMessagesElement(e)}
      </React.Fragment>
    );
  }

  /**
   * @stable [07.10.2019]
   * @param {Error} error
   * @returns {string[]}
   */
  protected buildErrorMessages(error: Error): string[] {
    const messages = this.settings.messages;
    return [
      messages.SOMETHING_WENT_WRONG,
      messages.PLS_SEND_THIS_SCR_TO_SUPPORT_MANAGER,
      this.errorSystemInfoLine,
      `${messages.ERROR}: ${error.message}`,
      `${messages.DETAILS_INFO}: [${error.stack}]`
    ];
  }

  /**
   * @stable [07.10.2019]
   * @returns {string}
   */
  protected get errorSystemInfoLine(): string {
    const environment = this.environment;
    const messages = this.settings.messages;
    const user = this.store.getState().user;
    return [
      `${messages.ENVIRONMENT}: `,
      [
        ifNotNilThanValue(user, () => `${messages.USER} ${user.id}`),
        `${messages.BUILD} ${environment.appVersion}`,
        `${environment.browserName} ${environment.browserVersion}${environment.platformType}`,
        `${messages.PATH} ${getCurrentUrlPath()}`
      ].join(', ')
    ].join('');
  }

  /**
   * @stable [07.10.2019]
   * @param {Error} e
   * @returns {JSX.Element}
   */
  protected getErrorMessagesElement(e: Error): JSX.Element {
    return (
      <React.Fragment>
        {this.buildErrorMessages(e).map((v, index) => <div key={`error-` + index}>{v}</div>)}
      </React.Fragment>
    );
  }

  /**
   * @stable [07.10.2019]
   * @returns {string[]}
   */
  protected getErrorWrapperClassNames(): string[] {
    return ['rac-window-error-wrapper', 'rac-full-size', 'rac-fixed'];
  }

  /**
   * @stable [07.10.2019]
   * @returns {string[]}
   */
  protected getErrorClassNames(): string[] {
    return ['rac-window-error', 'rac-alignment-center'];
  }

  /**
   *
   * @returns {JSX.Element}
   */
  protected get restartActionElement(): JSX.Element {
    return (
      <Button
        text={this.settings.messages.RESTART_APP}
        raised={true}
        onClick={this.onRestart}
        className={this.getRestartActionClassName()}/>
    );
  }

  /**
   * @stable [07.10.2019]
   * @returns {string}
   */
  protected getRestartActionClassName(): string {
    return 'rac-window-error-restart-action';
  }

  /**
   * @stable [07.10.2019]
   */
  protected onRestart(): void {
    this.router.go(-this.router.length);
    this.router.push(this.routes.logout);
  }

  /**
   * @stable [07.10.2019]
   * @param {ErrorEventCategoriesEnum} errorCategory
   * @param {Error} e
   */
  protected logError(errorCategory: ErrorEventCategoriesEnum, e: Error): void {
    this.logManager.send(errorCategory, e.name, e.stack || e.message);
  }
}
