const origin = (location.origin || (location.protocol + '//' + location.host));

export const APP_VERSION = process.env.APP_VERSION;
export const APP_PROFILE = process.env.APP_PROFILE;
export const APP_NAMESPACE = process.env.APP_NAMESPACE;
export const PROD_MODE = process.env.NODE_ENV === 'production';
export const GOOGLE_KEY = process.env.GOOGLE_KEY;
export const BASE_PATH = (document.baseURI || location.href).replace(origin, '');
export const PORT = location.port || '80';
export const NORMALIZED_BASE_PATH = BASE_PATH.replace(/\//g, '');
