import { FILTER_SECTION } from './filter.interface';

export class FilterActionBuilder {
  public static buildSectionActionType(section: string): string {
    return `${section}.${FILTER_SECTION}`;
  }
}
