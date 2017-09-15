import { FILTER_SECTION } from './filter.interface';

export class FilterActionBuilder {
  public static buildFilterSectionActionType(section: string): string {
    return `${section}.${FILTER_SECTION}`;
  }
}
