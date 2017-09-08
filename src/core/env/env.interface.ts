const origin = (location.origin || (location.protocol + '//' + location.host));

export const APP_VERSION = process.env.APP_VERSION;
export const PROD_MODE = process.env.NODE_ENV === 'production';
export const BASE_PATH = (document.baseURI || location.href).replace(origin, '');
