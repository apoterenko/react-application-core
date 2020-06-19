import { injectable } from 'inversify';

import {
  IViewerCtor,
  IViewerLocator,
  ViewersEnum,
} from '../../definition';

@injectable()
export class ViewerLocator implements IViewerLocator {

  private readonly viewers: Record<ViewersEnum, IViewerCtor> = {} as Record<ViewersEnum, IViewerCtor>;

  /**
   * @stable [19.06.2020]
   * @param {ViewersEnum} name
   * @param {IViewerCtor} ctor
   */
  public register(name: ViewersEnum, ctor: IViewerCtor): void {
    this.viewers[name] = ctor;
  }

  /**
   * @stable [19.06.2020]
   * @returns {IViewerCtor}
   */
  public resolve(name: ViewersEnum): IViewerCtor {
    return this.viewers[name];
  }
}
