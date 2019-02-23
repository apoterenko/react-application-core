/**
 * @stable [23.02.2019]
 */
export interface II18n {
  getCurrentLanguage(dualLanguagesMapper?: Record<string, string>): string;
}
