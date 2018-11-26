import * as vue2Dropzone from 'vue2-dropzone';
import { Component, Prop } from 'vue-property-decorator';
import { LoggerFactory } from 'ts-smart-logger';

import { uuid } from '../../util';
import { ComponentName } from '../connector/vue-index';
import { VueBaseComponent } from '../base/vue-index';
import { IKeyValue } from '../../definitions.interface';

const vueDndLogger = LoggerFactory.makeLogger('VueDnd');

@ComponentName('vue-dnd')
@Component({
  components: {
    vue2Dropzone,
  },
  data: () => ({
    defaultOptions: {
      url: 'https://',
      autoQueue: false,
      previewTemplate: '<div class="rac-display-none"/>',
    },
  }),
  template: `
    <vue2Dropzone :id="id"
                  :options="getOptions()"
                  @vdropzone-files-added="onDrop"/>
  `,
})
class VueDnd extends VueBaseComponent {
  @Prop() private options: IKeyValue;
  @Prop() private defaultMessage: string;
  private id = uuid(true);

  /**
   * @stable [25.11.2018]
   * @param {File[]} files
   */
  private onDrop(files: File[]): void {
    vueDndLogger.debug('[$VueDnd] The dropped files:', files);
    this.$emit('select', files);
  }

  /**
   * @stable [25.11.2018]
   * @returns {IKeyValue}
   */
  private getOptions(): IKeyValue {
    return {
      ...this.$data.defaultOptions,
      ...this.options,
      dictDefaultMessage: this.defaultMessage
        ? this.t(this.defaultMessage)
        : this.t(this.settings.messages.dndMessage),
    };
  }
}
