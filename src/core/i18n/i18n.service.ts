import { injectable } from 'inversify';

import { II18n } from './i18n.interface';

@injectable()
export class I18n implements II18n {

  /**
   * @stable [23.02.2019]
   * @param {string} fallbackLang
   * @returns {string}
   */
  public getCurrentLanguage(fallbackLang = 'en'): string {
    const nav = navigator;
    const browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'];
    let language;

    // support for HTML 5.1 "navigator.languages"
    if (Array.isArray(nav.languages)) {
      nav.languages.filter((lang) => language = language || lang);
      if (language) {
        return language;
      }
    }

    // support for other well known properties in browsers
    browserLanguagePropertyKeys.filter((browserLanguagePropertyKey) => language = language || nav[browserLanguagePropertyKey]);
    return language || fallbackLang;
  }
}
