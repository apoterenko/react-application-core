import { injectable } from 'inversify';
import * as R from 'ramda';

import { II18n } from './i18n.interface';

@injectable()
export class I18n implements II18n {
  private static readonly browserLanguagePropertyKeys = [
    'language',
    'browserLanguage',
    'systemLanguage',
    'userLanguage'
  ];

  /**
   * @stable [23.02.2019]
   * @param {Record<string, string>} dualLanguagesMapper
   * @returns {string}
   */
  public getCurrentLanguage(dualLanguagesMapper?: Record<string, string>): string {
    const nav = navigator;
    let language;

    // support for HTML 5.1 "navigator.languages"
    if (Array.isArray(nav.languages)) {
      nav.languages.forEach((lang) => language = language || lang);
    }
    // support for other well known properties in browsers
    I18n.browserLanguagePropertyKeys.forEach(
      (browserLanguagePropertyKey) => language = language || nav[browserLanguagePropertyKey]
    );

    if (!R.isNil(language) && !R.isEmpty(language)) {
      const parts = language.split('-');
      if (!R.isNil(dualLanguagesMapper) && parts.length > 1) {
        return dualLanguagesMapper[language] || language;
      }
      return parts[0];
    }
    return language;
  }
}
