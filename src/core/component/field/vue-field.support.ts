import { VueComponentOptionsT } from '../../vue-definitions.interface';
import { VUE_SINGLE_FILE_FIELD_NAME, VUE_MULTI_FILE_FIELD_NAME } from './filefield/vue-index';
import { VUE_TEXT_FIELD_NAME } from './textfield/vue-textfield.interface';
import { VUE_NUMBER_FIELD_NAME } from './numberfield/vue-numberfield.interface';
import { VUE_CHECKBOX_NAME } from './checkbox/vue-checkbox.interface';
import { VUE_SELECT_NAME } from './select/vue-index';

const BIND_CONTAINER = ':bindContainer="bindContainer"';
const BIND_STORE = ':bindStore="bindStore.entity"';
const FIELDS = [
  VUE_CHECKBOX_NAME,
  VUE_SINGLE_FILE_FIELD_NAME,
  VUE_MULTI_FILE_FIELD_NAME,
  VUE_NUMBER_FIELD_NAME,
  VUE_SELECT_NAME,
  VUE_TEXT_FIELD_NAME
];

/**
 * @stable [06.01.2018]
 */
export const vueContainerFieldConfigFactory: (config: VueComponentOptionsT) =>
  VueComponentOptionsT = (config: VueComponentOptionsT) => ({
  ...config,
  template: ((): string => {
    let template = config.template;
    FIELDS.forEach((fieldName) => template = template
      .replace(new RegExp(`${fieldName} `, 'g'), `${fieldName} ${BIND_CONTAINER} ${BIND_STORE} `));
    return template;
  })(),
});
