import { injectable } from 'inversify';

import { IVersionProcessor } from '../definition';

@injectable()
export class VersionProcessor implements IVersionProcessor {

  /**
   * @stable [16.09.2019]
   * @returns {Promise<boolean>}
   */
  public async processNewVersionUuidAndGetResult(): Promise<boolean> {
    return false;
  }
}
