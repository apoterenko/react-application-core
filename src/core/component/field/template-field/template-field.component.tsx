import * as React from 'react';
import * as R from 'ramda';
import { LoggerFactory } from 'ts-smart-logger';

import { Field } from '../field/field.component';
import {
  AsyncLibsEnum,
  FieldConstants,
  IUnlayerEditorEntity,
  IUnlayerEditorMetaEntity,
  SyntheticEmitterEventsEnum,
  TemplateFieldClassesEnum,
} from '../../../definition';
import {
  Base64Utils,
  ClsUtils,
  ObjectUtils,
  PropsUtils,
  TypeUtils,
  UuidUtils,
} from '../../../util';
import { ITemplateFieldProps } from '../../../definition';
import { TemplateUtils } from '../../../util/template';

/**
 * @component-impl
 * @stable [28.05.2021]
 */
export class TemplateField extends Field<ITemplateFieldProps> {

  private static readonly logger = LoggerFactory.makeLogger('TemplateField');

  public static readonly defaultProps = PropsUtils.mergeWithParentDefaultProps<ITemplateFieldProps>({
    fieldRendered: false,
    url: 'https://editor.unlayer.com/embed.js',
  }, Field);

  private readonly id = UuidUtils.uuid(true);

  private editor: IUnlayerEditorEntity;
  private unlayerLibTask: Promise<HTMLScriptElement>;
  private currentTemplate: string;

  /**
   * @stable [26.03.2021]
   * @param originalProps
   */
  constructor(originalProps: ITemplateFieldProps) {
    super(originalProps);

    this.exportHtml = this.exportHtml.bind(this);
    this.onScriptInit = this.onScriptInit.bind(this);
    this.onTemplateLoaded = this.onTemplateLoaded.bind(this);
    this.onTemplateUpdated = this.onTemplateUpdated.bind(this);
  }

  /**
   * @stable [26.03.2021]
   */
  public componentDidMount(): void {
    this.unlayerLibTask = this.createUnlayerLibTask();
  }

  /**
   * @stable [26.03.2021]
   */
  public componentWillUnmount(): void {
    this.asyncLibManager.cancelWaiting(this.unlayerLibTask);

    this.editor = null;
    this.unlayerLibTask = null;
  }

  /**
   * @stable [26.03.2021]
   * @param prevProps
   * @param prevState
   */
  public componentDidUpdate(prevProps: Readonly<ITemplateFieldProps>, prevState: Readonly<{}>): void {
    super.componentDidUpdate(prevProps, prevState);

    if (this.editor && this.isCurrentValueNotEqualPreviousValue(prevProps)) {
      this.doRefresh();
    }
  }

  /**
   * @stable [28.05.2021]
   */
  protected get originalEmptyValue(): string {
    return FieldConstants.VALUE_TO_RESET;
  }

  /**
   * @stable [26.03.2021]
   */
  protected get inputAttachmentElement(): JSX.Element {
    return this.getSelfFieldWrapper(this.labelElement);
  }

  /**
   * @stable [27.03.2021]
   */
  protected get attachmentBodyElement(): JSX.Element {
    return (
      <React.Fragment/>
    );
  }

  /**
   * @stable [27.03.2021]
   */
  protected get attachmentElementId(): string {
    return this.id;
  }

  /**
   * @stable [26.03.2021]
   */
  protected getComponentsSettingsProps(): ITemplateFieldProps {
    return PropsUtils.mergeWithSystemProps<ITemplateFieldProps>(
      super.getComponentsSettingsProps(),
      this.componentsSettings.templateField
    );
  }

  /**
   * @stable [26.03.2021]
   */
  protected getFieldClassName(): string {
    return ClsUtils.joinClassName(
      super.getFieldClassName(),
      TemplateFieldClassesEnum.TEMPLATE_FIELD
    );
  }

  /**
   * @stable [27.05.2021]
   */
  private doRefresh(): void {
    const value = this.value;
    if (TypeUtils.isUndef(value)) {
      return;
    }
    this.loadDesign(value);
  }

  /**
   * @stable [26.03.2021]
   * @param initialValue
   */
  private loadDesign(initialValue: string): void {
    if (ObjectUtils.isObjectNotEmpty(initialValue)) {
      const templateAsJson = Base64Utils.base64ToJson(initialValue);
      if (TypeUtils.isObject(templateAsJson)) {
        if (R.equals(initialValue, this.currentTemplate)) { // Because of Flux cycle
          TemplateField.logger.debug('[$TemplateField][loadDesign] Self-updating. Do nothing');
        } else {
          this.editor.loadDesign(templateAsJson);
          this.currentTemplate = null;
        }
        return;
      }
    }

    TemplateField.logger.debug(
      '[$TemplateField][loadDesign] The template is invalid. Load a blank template. Template:',
      initialValue
    );
    this.editor.loadBlank();
  }

  /**
   * @stable [26.03.2021]
   * @param data
   */
  private exportHtml(data: IUnlayerEditorMetaEntity): void {
    this.onChangeManually(this.currentTemplate = Base64Utils.jsonToBase64(data.design));
  }

  /**
   * @stable [26.03.2021]
   */
  private onTemplateLoaded(): void {
    this.eventEmitter.emit(SyntheticEmitterEventsEnum.REFRESH);
  }

  /**
   * @stable [26.03.2021]
   */
  private onTemplateUpdated(): void {
    this.editor.exportHtml(this.exportHtml);
  }

  /**
   * @stable [26.03.2021]
   */
  private createUnlayerLibTask(): Promise<HTMLScriptElement> {
    const {
      url,
    } = this.mergedProps;

    return this.asyncLibManager
      .waitForLib({alias: AsyncLibsEnum.UNLAYER, url})
      .then(this.onScriptInit);
  }

  /**
   * @stable [26.03.2021]
   * @param script
   */
  private onScriptInit(script: HTMLScriptElement): HTMLScriptElement {
    this.editor = this.createEditor();
    this.doRefresh();

    return script;
  }

  /**
   * @stable [26.03.2021]
   */
  private createEditor(): IUnlayerEditorEntity {
    const {
      data,
      tags,
      user,
    } = this.originalProps;
    const {
      projectId,
    } = this.mergedProps;

    const id = this.id;
    const editor = this.environment.window.unlayer.createEditor({
      displayMode: 'email',
      id,
      mergeTags: tags,
      projectId,
      user,
    });

    editor.addEventListener('design:updated', this.onTemplateUpdated);
    editor.addEventListener('design:loaded', this.onTemplateLoaded);

    if (TypeUtils.isFn(data)) {
      editor.registerCallback('previewHtml', (params, done) => {
        done({
          html: TemplateUtils.render(params.html, data()),
        });
      });
    }
    return editor;
  }
}
