import { CreateElement } from 'vue';
import { Component } from 'vue-property-decorator';
import { LoggerFactory } from 'ts-smart-logger';

import { findUrlPattern, isFn } from '../../util';
import { DI_TYPES, lazyInject } from '../../di';
import { IKeyValue } from '../../definitions.interface';
import { APPLICATION_SECTION } from '../application/application.interface';
import { VueNodeT } from '../../vue-definitions.interface';
import { VueBaseContainer } from '../base/vue-index';
import { vueConnectorOptionsFactory } from '../connector/vue-index';
import { ApplicationActionBuilder } from './application-action.builder';

@Component(vueConnectorOptionsFactory({
  section$: APPLICATION_SECTION,
  customComputed$: [
    (state) => ({application: state.application})   // TODO move to common
  ],
  forceUpdateOnChangeData$: (state) => state.application.path,
}))
export class VueApplicationContainer extends VueBaseContainer {
  private static logger = LoggerFactory.makeLogger('VueApplicationContainer');

  @lazyInject(DI_TYPES.Routes) private routes: IKeyValue;

  /**
   * @stable [23.10.2018]
   */
  constructor() {
    super();

    const prevOnPopState = window.onpopstate;
    window.onpopstate = () => {
      if (isFn(prevOnPopState)) {
        prevOnPopState.call(window);
      }
      // Force call the render method when internal state updating. See forceUpdateOnChangeData$ above
      this.dispatchCustomType(ApplicationActionBuilder.buildPathActionType(), location.pathname);
    };
  }

  /**
   * @stable [21.10.2018]
   * @param {CreateElement} factory
   * @returns {VueNodeT}
   */
  public render(factory: CreateElement): VueNodeT {
    return factory(this.getContainer());
  }

  /**
   * @stable [23.10.2018]
   * @returns {string}
   */
  private getContainer() {
    const pathname = location.pathname;
    const routePatternResult = findUrlPattern(pathname, this.routes);

    if (routePatternResult.route) {
      VueApplicationContainer.logger.debug(
        `[$VueApplicationContainer][getContainer] Router is recognized. Route result: ${
          JSON.stringify(routePatternResult)}, pathname: ${pathname}`
      );
    } else {
      VueApplicationContainer.logger.debug(
        `[$VueApplicationContainer][getContainer] Router is not recognized. Route result: ${pathname}`
      );
    }
    return this.routes[routePatternResult.route] || this.routes['/not_found'];
  }
}
