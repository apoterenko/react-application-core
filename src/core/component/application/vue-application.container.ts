import { CreateElement } from 'vue';
import { Component } from 'vue-property-decorator';
import { LoggerFactory } from 'ts-smart-logger';

import { findUrlPattern } from '../../util';
import { ENV } from '../../env';
import { DI_TYPES, lazyInject } from '../../di';
import { IKeyValue } from '../../definitions.interface';
import { APPLICATION_SECTION } from '../application/application.interface';
import { VueNodeT } from '../../vue-definitions.interface';
import { VueBaseContainer } from '../base/vue-index';
import { vueConnectorOptionsFactory } from '../connector/vue-index';

@Component(vueConnectorOptionsFactory({
  sectionName: APPLICATION_SECTION,
  customComputed$: [
    (state) => ({application: state.application})   // TODO move to common
  ],
  forceUpdateOnChangeData$: (state) => state.application.path,
}))
export class VueApplicationContainer extends VueBaseContainer {
  private static logger = LoggerFactory.makeLogger('VueApplicationContainer');

  @lazyInject(DI_TYPES.Routes) private routes: IKeyValue;

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
    const appPath = ENV.appPath();
    const routePatternResult = findUrlPattern(appPath, this.routes);

    if (routePatternResult.route) {
      VueApplicationContainer.logger.debug(
        `[$VueApplicationContainer][getContainer] Router is recognized. Route result: ${
          JSON.stringify(routePatternResult)}, pathname: "${appPath}"`
      );
    } else {
      VueApplicationContainer.logger.warn(
        `[$VueApplicationContainer][getContainer] Router is not recognized. Route result: "${appPath}"`
      );
    }
    return this.routes[routePatternResult.route] || this.routes['/not_found'];
  }
}
