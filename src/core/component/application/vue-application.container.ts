import { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { DI_TYPES, lazyInject } from '../../di';
import { IVueContainerEntity } from '../../vue-entities-definitions.interface';
import { VueBaseContainer } from '../base/vue-base.container';

@Component
export class VueApplicationContainer extends VueBaseContainer implements IVueContainerEntity<any> {

  @lazyInject(DI_TYPES.Routes) private routes;

  public render(factory: CreateElement): VNode {
    return factory(this.getContainer(), {
      props: {
        appState: this.appState,
      },
    });
  }

  private getContainer() {
    return this.routes[window.location.pathname] || this.routes['/not_found'];
  }
}
