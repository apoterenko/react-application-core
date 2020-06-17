import { render } from 'react-dom';
import { injectable } from 'inversify';

import { TypeUtils } from '../../util';
import {
  DI_TYPES,
  lazyInject,
} from '../../di';
import {
  IAsyncLibConfigEntity,
  IBootstrapper,
  IDomAccessor,
} from '../../definition';
import { makeApplicationRootContainerCtor } from '../../component/application/application-root-container-ctor.factory';
import { ApplicationContainer } from '../../component/application/application.container';

@injectable()
export class ReactBootstrapper implements IBootstrapper {
  @lazyInject(DI_TYPES.DomAccessor) private readonly domAccessor: IDomAccessor;
  @lazyInject(DI_TYPES.WebBootstrapper) private readonly webBootstrapper: IBootstrapper;

  /**
   * @stable [17.06.2020]
   * @param {IAsyncLibConfigEntity} cfg
   * @returns {IBootstrapper}
   */
  public registerAsyncLibrary(cfg: IAsyncLibConfigEntity): IBootstrapper {
    this.webBootstrapper.registerAsyncLibrary(cfg);
    return this;
  }

  /**
   * @stable [17.06.2020]
   * @param {() => void} callback
   */
  public init(callback?: (() => void)): void {
    this.webBootstrapper.init(() => {
      const applicationRootContainerCtor = makeApplicationRootContainerCtor(ApplicationContainer);
      render(
        new applicationRootContainerCtor({}).render() as JSX.Element, // Isomorphic container ctor (React Native)
        this.domAccessor.rootElement,
      );

      if (TypeUtils.isFn(callback)) {
        callback();
      }
    });
  }
}
