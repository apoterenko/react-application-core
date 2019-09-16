import { injectable } from 'inversify';

import { IVersionProcessor } from '../definition';

@injectable()
export class VersionProcessor implements IVersionProcessor {

  /**
   * @stable [16.09.2019]
   * @param {boolean} isApplicationAuthorized
   * @returns {Promise<boolean>}
   */
  public async hasBeenUpdated(isApplicationAuthorized: boolean): Promise<boolean> {
    return false;
  }
}
