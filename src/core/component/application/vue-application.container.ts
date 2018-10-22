import { CreateElement } from 'vue';
import { Component } from 'vue-property-decorator';

import { DI_TYPES, lazyInject } from '../../di';
import { APPLICATION_SECTION } from '../application/application.interface';
import { VueNodeT } from '../../vue-definitions.interface';
import { VueBaseContainer } from '../base/vue-index';
import { vueConnectorOptionsFactory } from '../connector/vue-index';
import { applicationMapper } from '../connector/universal-connector.mapper';

@Component(vueConnectorOptionsFactory({
  section$: APPLICATION_SECTION,
  customComputed$: [
    applicationMapper
  ],
}))
export class VueApplicationContainer extends VueBaseContainer {

  @lazyInject(DI_TYPES.Routes) private routes;

  /**
   * @stable [21.10.2018]
   * @param {CreateElement} factory
   * @returns {VueNodeT}
   */
  public render(factory: CreateElement): VueNodeT {
    return factory(this.getContainer());
  }

  // TODO
  private getContainer() {
    return this.routes[window.location.pathname] || this.routes['/not_found'];
  }
}
