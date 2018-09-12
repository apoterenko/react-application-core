import { ENV } from '../env';

/**
 * @stable [27.08.2018]
 * @param {string | Error | {}} error
 * @param {string} separator
 * @returns {string}
 */
export const buildErrorMessage = (error: string | Error | {}, separator = '\n'): string => [
  'Houston! We\'re in trouble!',
  'Please send this screen to the developers.',
  'Thank you!',
  `Build: ${ENV.appVersion}`,
  `Details info: [${(() => {
    try {
      return JSON.stringify(error);
    } catch (e) {
      return error;
    }
  })()}]`
].join(separator || '\n');
