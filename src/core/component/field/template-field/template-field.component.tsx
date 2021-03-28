import * as React from 'react';
import * as R from 'ramda';

import { Field } from '../field/field.component';
import {
  AsyncLibsEnum,
  IFieldInputProps,
  IUnlayerEditorEntity,
  IUnlayerEditorMetaEntity,
  SyntheticEmitterEventsEnum,
  TemplateFieldClassesEnum,
} from '../../../definition';
import {
  Base64Utils,
  ClsUtils,
  ConditionUtils,
  PropsUtils,
  TypeUtils,
  UuidUtils,
} from '../../../util';
import { ITemplateFieldProps } from '../../../definition';

/**
 * @component-impl
 * @stable [26.03.2021]
 */
export class TemplateField extends Field<ITemplateFieldProps> {

  public static readonly defaultProps = PropsUtils.mergeWithParentDefaultProps<ITemplateFieldProps>({
    fieldRendered: false,
    url: 'https://editor.unlayer.com/embed.js',
  }, Field);

  private static readonly EMPTY_TEMPLATE_AS_BASE64 = 'eyJjb3VudGVycyI6eyJ1X2NvbHVtbiI6MiwidV9yb3ciOjJ9LCJib2R5Ijp7InJvd3MiOlt7ImNlbGxzIjpbMV0sImNvbHVtbnMiOlt7ImNvbnRlbnRzIjpbXSwidmFsdWVzIjp7ImJhY2tncm91bmRDb2xvciI6IiIsInBhZGRpbmciOiIwcHgiLCJib3JkZXIiOnt9LCJfbWV0YSI6eyJodG1sSUQiOiJ1X2NvbHVtbl8xIiwiaHRtbENsYXNzTmFtZXMiOiJ1X2NvbHVtbiJ9fX1dLCJ2YWx1ZXMiOnsiZGlzcGxheUNvbmRpdGlvbiI6bnVsbCwiY29sdW1ucyI6ZmFsc2UsImJhY2tncm91bmRDb2xvciI6IiIsImNvbHVtbnNCYWNrZ3JvdW5kQ29sb3IiOiIiLCJiYWNrZ3JvdW5kSW1hZ2UiOnsidXJsIjoiIiwiZnVsbFdpZHRoIjp0cnVlLCJyZXBlYXQiOmZhbHNlLCJjZW50ZXIiOnRydWUsImNvdmVyIjpmYWxzZX0sInBhZGRpbmciOiIwcHgiLCJoaWRlRGVza3RvcCI6ZmFsc2UsImhpZGVNb2JpbGUiOmZhbHNlLCJub1N0YWNrTW9iaWxlIjpmYWxzZSwiX21ldGEiOnsiaHRtbElEIjoidV9yb3dfMSIsImh0bWxDbGFzc05hbWVzIjoidV9yb3cifSwic2VsZWN0YWJsZSI6dHJ1ZSwiZHJhZ2dhYmxlIjp0cnVlLCJkdXBsaWNhdGFibGUiOnRydWUsImRlbGV0YWJsZSI6dHJ1ZX19XSwidmFsdWVzIjp7ImJhY2tncm91bmRDb2xvciI6IiNlN2U3ZTciLCJiYWNrZ3JvdW5kSW1hZ2UiOnsidXJsIjoiIiwiZnVsbFdpZHRoIjp0cnVlLCJyZXBlYXQiOmZhbHNlLCJjZW50ZXIiOnRydWUsImNvdmVyIjpmYWxzZX0sImNvbnRlbnRXaWR0aCI6IjUwMHB4IiwiY29udGVudEFsaWduIjoiY2VudGVyIiwiZm9udEZhbWlseSI6eyJsYWJlbCI6IkFyaWFsIiwidmFsdWUiOiJhcmlhbCxoZWx2ZXRpY2Esc2Fucy1zZXJpZiJ9LCJwcmVoZWFkZXJUZXh0IjoiIiwibGlua1N0eWxlIjp7ImJvZHkiOnRydWUsImxpbmtDb2xvciI6IiMwMDAwZWUiLCJsaW5rSG92ZXJDb2xvciI6IiMwMDAwZWUiLCJsaW5rVW5kZXJsaW5lIjp0cnVlLCJsaW5rSG92ZXJVbmRlcmxpbmUiOnRydWV9LCJfbWV0YSI6eyJodG1sSUQiOiJ1X2JvZHkiLCJodG1sQ2xhc3NOYW1lcyI6InVfYm9keSJ9fX0sInNjaGVtYVZlcnNpb24iOjV9';
  private readonly id = UuidUtils.uuid(true);

  private editor: IUnlayerEditorEntity;
  private unlayerLibTask: Promise<HTMLScriptElement>;

  /**
   * @stable [26.03.2021]
   * @param originalProps
   */
  constructor(originalProps: ITemplateFieldProps) {
    super(originalProps);

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
    this.unlayerLibTask = null;
    this.editor = null;
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
   * @stable [26.03.2021]
   */
  private doRefresh(): void {
    const value = this.value;
    if (!TypeUtils.isDef(value)) {
      return;
    }
    this.loadDesign(
      R.isNil(value)
        ? TemplateField.EMPTY_TEMPLATE_AS_BASE64  // Because we have no clearDesign method (see https://docs.unlayer.com/docs/react-component)
        : value
    );
  }

  /**
   * @stable [26.03.2021]
   * @param initialValue
   */
  private loadDesign(initialValue: string): void {
    ConditionUtils.ifNotNilThanValue(
      Base64Utils.base64ToJson(initialValue),
      (templateAsJson) => this.editor.loadDesign(templateAsJson)
    );
  }

  /**
   * @stable [26.03.2021]
   * @param data
   */
  private exportHtml(data: IUnlayerEditorMetaEntity): void {
    this.onChangeManually(Base64Utils.jsonToBase64(data.design));
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
      tags,
      user,
    } = this.originalProps;

    const id = this.id;
    const editor = this.editor = this.environment.window.unlayer.createEditor({
      displayMode: 'email',
      id,
      mergeTags: tags,
      projectId: 12653,
      user,
    });

    editor.addEventListener('design:updated', this.onTemplateUpdated);
    editor.addEventListener('design:loaded', this.onTemplateLoaded);
    return editor;
  }
}
