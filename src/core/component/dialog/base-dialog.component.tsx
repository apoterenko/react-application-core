import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as R from 'ramda';

import { Button } from '../button';
import {
  CalcUtils,
  ClsUtils,
  ConditionUtils,
  PropsUtils,
  TypeUtils,
} from '../../util';
import { PerfectScrollPlugin } from '../plugin/perfect-scroll.plugin';
import {
  DialogClassesEnum,
  EventsEnum,
  GenericPluginCtorT,
  IActivateDialogConfigEntity,
  IBaseEvent,
  IconsEnum,
  IDialog,
  IDialogProps,
  IDialogState,
} from '../../definition';
import { BasicComponent } from '../base/basic.component';
import { GenericComponent } from '../base/generic.component';

/**
 * @component-impl
 * @stable [10.10.2020]
 */
export class BaseDialog<TProps extends IDialogProps = IDialogProps,
                        TState extends IDialogState = IDialogState>
  extends GenericComponent<TProps, TState>
  implements IDialog<TProps, TState> {

  public static readonly defaultProps: IDialogProps = {
    acceptable: true,
    closable: true,
    closableOverlay: true,
    default: true,
    scrollable: true,
  };

  private $closeEventUnsubscriber: () => void;
  private $onDeactivateCallback: () => void;
  private $isCheckNeededAndAnotherModalDialogOpen: boolean;
  private readonly bodyRef = React.createRef<HTMLDivElement>();

  /**
   * @stable [10.10.2020]
   * @param originalProps
   */
  constructor(originalProps: TProps) {
    super(originalProps);

    this.doClose = this.doClose.bind(this);
    this.onAcceptClick = this.onAcceptClick.bind(this);
    this.onCloseClick = this.onCloseClick.bind(this);
    this.onDialogClick = this.onDialogClick.bind(this);
    this.onDocumentClickCapture = this.onDocumentClickCapture.bind(this);

    this.state = {opened: false} as TState;

    this.$isCheckNeededAndAnotherModalDialogOpen = this.isCheckNeededAndAnotherModalDialogOpen;
  }

  /**
   * @stable [10.10.2020]
   */
  public render(): React.ReactNode {
    return ConditionUtils.orNull(
      this.state.opened,
      () => {
        const inline = this.isInline;
        const modal = this.isModal;

        const content = (
          <div
            ref={this.actualRef}
            className={this.dialogClassName}
            {...PropsUtils.buildClickHandlerProps(this.onDialogClick, modal, false)}
          >
            {this.dialogBodyElement}
          </div>
        );
        return inline
          ? content
          : ReactDOM.createPortal(content, this.portalElement);
      }
    );
  }

  /**
   * @stable [10.10.2020]
   */
  public componentDidMount(): void {
    this.showOverlayIfApplicable();

    if (this.isOverlay) {
      this.activate();
    }
  }

  /**
   * @stable [10.10.2020]
   */
  public componentWillUnmount(): void {
   this.onDestroy();
  }

  /**
   * @stable [10.10.2020]
   * @param payload
   */
  public activate(payload?: IActivateDialogConfigEntity): void {
    this.setState({opened: true}, () => {
      this.onAfterRender();

      const {
        onActivate,
        onDeactivate,
      } = payload || {} as IActivateDialogConfigEntity;

      if (TypeUtils.isFn(onDeactivate)) {
        this.$onDeactivateCallback = onDeactivate;
      }
      if (TypeUtils.isFn(onActivate)) {
        onActivate.call(this);
      }

      const originalProps = this.originalProps;
      if (TypeUtils.isFn(originalProps.onActivate)) {
        originalProps.onActivate();
      }
    });
  }

  /**
   * @stable [10.10.2020]
   */
  public close(): void {
    this.onCloseClick();
  }

  /**
   * @stable [10.10.2020]
   */
  protected onAcceptClick(): void {
    const {
      onAccept,
      onBeforeAccept,
    } = this.originalProps;

    if (onBeforeAccept) {
      onBeforeAccept();
    }

    this.doClose(() => {
      if (TypeUtils.isFn(onAccept)) {
        onAccept();
      }
    });
  }

  /**
   * @stable [10.10.2020]
   */
  protected onCloseClick(): void {
    const {
      onClose,
    } = this.originalProps;

    this.doClose(() => {
      if (TypeUtils.isFn(onClose)) {
        onClose();
      }
    });
  }

  /**
   * @stable [10.10.2020]
   */
  protected get title(): string | boolean {
    return this.originalProps.title;
  }

  /**
   * @stable [10.10.2020]
   */
  protected get closeText(): string {
    return this.mergedProps.closeText || this.settings.messages.DIALOG_CANCEL;
  }

  /**
   * @stable [10.10.2020]
   */
  protected get acceptText(): string {
    return this.mergedProps.acceptText || this.settings.messages.DIALOG_ACCEPT;
  }

  /**
   * @stable [10.10.2020]
   */
  private onDialogClick(): void {
    this.doClose();
  }

  /**
   * @stable [10.10.2020]
   */
  private onDocumentClickCapture(event: IBaseEvent): void {
    const element = event.target as HTMLElement;

    if (this.domAccessor.getParentsAsElements({parentClassName: DialogClassesEnum.DIALOG, element})
        .includes(this.actualRef.current)) {
      return;
    }
    this.doClose();
  }

  /**
   * @stable [10.10.2020]
   */
  private onDestroy(): void {
    this.closeOverlayIfApplicable();
    this.unsubscribeEvents();
  }

  /**
   * @stable [10.10.2020]
   */
  private onAfterRender(): void {
    if (!this.isAnchored) {
      return;
    }
    this.unsubscribeEvents();

    const {
      anchorElement,
      positionConfiguration,
    } = this.originalProps;

    this.domAccessor.setPosition({
      ...positionConfiguration,
      element: this.bodyRef.current,
      of: CalcUtils.calc(anchorElement),
    });

    this.$closeEventUnsubscriber = this.domAccessor.captureEvent({
      eventName: EventsEnum.CLICK,
      callback: this.onDocumentClickCapture,

      /**
       * We must process a capture phase of click event because a component may stop an events bubbling.
       * This case is reproduced in case of child non-modal dialogs:
       *   1. Open the modal dialog "D" with field "F" <Non-modal Select>
       *   2. Click on field "F" => simple menu is open
       *   3. Try click on the body of "D"
       *   4. Simple menu will be closed automatically
       *   5. "D" is still open
       *   6. See the "onDocumentClickCapture" method
       */
      capture: true,
    });
  }

  /**
   * @stable [10.10.2020]
   * @param callback
   */
  private doClose(callback?: () => void): void {
    const {
      onDeactivate,
    } = this.originalProps;

    this.setState({opened: false}, () => {
      this.onDestroy();

      if (TypeUtils.isFn(this.$onDeactivateCallback)) {
        this.$onDeactivateCallback.call(this);
        this.$onDeactivateCallback = null;
      }
      if (TypeUtils.isFn(onDeactivate)) {
        onDeactivate();
      }
      if (TypeUtils.isFn(callback)) {
        callback.call(this);
      }
    });
  }

  /**
   * @stable [10.10.2020]
   */
  private get actionsElement(): JSX.Element {
    const {
      acceptActionConfiguration,
      acceptDisabled,
      closeActionConfiguration,
      closeDisabled,
    } = this.originalProps;

    return ConditionUtils.orNull(
      this.closable || this.acceptable,
      () => (
        <div className={DialogClassesEnum.DIALOG_ACTIONS}>
          {
            ConditionUtils.orNull(
              this.closable,
              () => (
                <Button
                  icon={IconsEnum.TIMES}
                  {...closeActionConfiguration}
                  disabled={closeDisabled}
                  onClick={this.onCloseClick}>
                  {this.t(this.closeText)}
                </Button>
              )
            )
          }
          {
            ConditionUtils.orNull(
              this.acceptable,
              () => (
                <Button
                  icon={IconsEnum.CHECK_CIRCLE}
                  raised={true}
                  {...acceptActionConfiguration}
                  disabled={acceptDisabled}
                  onClick={this.onAcceptClick}>
                  {this.t(this.acceptText)}
                </Button>
              )
            )
          }
        </div>
      )
    );
  }

  /**
   * @stable [10.10.2020]
   */
  private get dialogBodyElement(): JSX.Element {
    const {
      closableOverlay,
      width,
    } = this.originalProps;

    return (
      <div
        ref={this.bodyRef}
        style={{width: CalcUtils.calc(width)}}
        className={DialogClassesEnum.DIALOG_BODY}
        onClick={this.domAccessor.cancelEvent}  // To stop the events bubbling
      >
        {
          this.isDialogInProgress
            ? this.progressElement
            : (
              <React.Fragment>
                {this.titleElement}
                {
                  this.hasExtraActions
                    ? (
                      <div className={DialogClassesEnum.DIALOG_BODY_CONTENT_WRAPPER}>
                        {this.bodyElement}
                        {this.extraActionsElement}
                      </div>
                    )
                    : (
                      <BasicComponent
                        className={DialogClassesEnum.DIALOG_BODY_CONTENT_WRAPPER}
                        plugins={this.wrapperPlugins}
                      >
                        {this.bodyElement}
                        {this.extraActionsElement}
                      </BasicComponent>
                    )
                }
                {this.isOverlay
                  ? closableOverlay && this.closeOverlayActionElement
                  : this.actionsElement}
              </React.Fragment>
            )
        }
      </div>
    );
  }

  /**
   * @stable [10.10.2020]
   */
  private get titleElement(): JSX.Element {
    const title = this.title;
    return (
      <React.Fragment>
        {
          title && (
            <div className={DialogClassesEnum.DIALOG_BODY_TITLE}>
              {this.t(title as string)}
            </div>
          )
        }
      </React.Fragment>
    );
  }

  /**
   * @stable [10.10.2020]
   */
  private get extraActionsElement(): JSX.Element {
    return (
      <React.Fragment>
        {
          this.hasExtraActions && (
            <div className={DialogClassesEnum.DIALOG_EXTRA_ACTIONS}>
              {this.originalProps.extraActions}
            </div>
          )
        }
      </React.Fragment>
    );
  }

  /**
   * @stable [10.10.2020]
   */
  private get bodyElement(): JSX.Element {
    const originalChildren = this.originalChildren;

    return (
      <React.Fragment>
        {
          this.hasExtraActions
            ? (
              originalChildren && (
                <BasicComponent
                  className={DialogClassesEnum.DIALOG_BODY_CONTENT}
                  plugins={this.wrapperPlugins}
                >
                  {originalChildren}
                </BasicComponent>
              )
            )
            : originalChildren
        }
      </React.Fragment>
    );
  }

  /**
   * @stable [10.10.2020]
   */
  private unsubscribeEvents(): void {
    if (TypeUtils.isFn(this.$closeEventUnsubscriber)) {
      this.$closeEventUnsubscriber();
      this.$closeEventUnsubscriber = null;
    }
  }

  /**
   * @stable [10.10.2020]
   */
  private showOverlayIfApplicable(): void {
    if (this.isOverlay) {
      this.domAccessor.addClassNamesToRootElement(DialogClassesEnum.OVERLAY_FILTER);
    }
  }

  /**
   * @stable [10.10.2020]
   */
  private closeOverlayIfApplicable(): void {
    if (this.isOverlay) {
      this.domAccessor.removeClassNamesFromRootElement(DialogClassesEnum.OVERLAY_FILTER);
    }
  }

  /**
   * @stable [10.10.2020]
   */
  private get progressElement(): JSX.Element {
    return (
      this.uiFactory.makeIcon({
        type: IconsEnum.SPINNER,
        className: DialogClassesEnum.DIALOG_PROGRESS_ICON,
      })
    );
  }

  /**
   * @stable [10.10.2020]
   */
  private get closeOverlayActionElement(): JSX.Element {
    return (
      this.uiFactory.makeIcon({
        type: IconsEnum.TIMES,
        className: DialogClassesEnum.OVERLAY_CLOSE_ICON,
        onClick: this.doClose,
      })
    );
  }

  /**
   * @stable [10.10.2020]
   */
  private get acceptable(): boolean {
    return this.originalProps.acceptable;
  }

  /**
   * @stable [10.10.2020]
   */
  private get closable(): boolean {
    return this.originalProps.closable;
  }

  /**
   * @stable [10.10.2020]
   */
  private get portalElement(): Element {
    return this.domAccessor.documentBody;
  }

  /**
   * @stable [10.10.2020]
   */
  private get isAnchored(): boolean {
    return !R.isNil(this.originalProps.anchorElement);
  }

  /**
   * @stable [10.10.2020]
   */
  private get isInline(): boolean {
    return this.originalProps.inline;
  }

  /**
   * @stable [10.10.2020]
   */
  private get isDefault(): boolean {
    return this.originalProps.default;
  }

  /**
   * @stable [10.10.2020]
   */
  private get isOverlay(): boolean {
    return this.originalProps.overlay;
  }

  /**
   * @stable [10.10.2020]
   */
  private get isConfirm(): boolean {
    return this.originalProps.confirm;
  }

  /**
   * @stable [10.10.2020]
   */
  private get isWide(): boolean {
    return this.originalProps.wide;
  }

  /**
   * @stable [10.10.2020]
   */
  private get isModal(): boolean {
    return (!this.isInline && !this.isAnchored) || this.isOverlay;
  }

  /**
   * @stable [10.10.2020]
   */
  private get hasExtraActions(): boolean {
    return !R.isNil(this.originalProps.extraActions);
  }

  /**
   * @stable [10.10.2020]
   */
  private get isScrollable(): boolean {
    return this.mergedProps.scrollable;
  }

  /**
   * @stable [10.10.2020]
   */
  private get isDialogInProgress(): boolean {
    return this.originalProps.progress;
  }

  /**
   * @stable [10.10.2020]
   */
  private get wrapperPlugins(): GenericPluginCtorT[] {
    return this.isScrollable ? [PerfectScrollPlugin] : [];
  }

  /**
   * @stable [10.10.2020]
   */
  private get dialogClassName(): string {
    const {
      className,
    } = this.originalProps;

    return ClsUtils.joinClassName(
      CalcUtils.calc(className),
      DialogClassesEnum.DIALOG,

      this.isOverlay && DialogClassesEnum.OVERLAY_DIALOG,
      this.isDialogInProgress && DialogClassesEnum.PROGRESS_DIALOG,
      this.isModal && DialogClassesEnum.MODAL_DIALOG,

      !this.isOverlay && (
        ClsUtils.joinClassName(
          this.isConfirm && DialogClassesEnum.CONFIRM_DIALOG,
          this.isDefault && DialogClassesEnum.DEFAULT_DIALOG,
          this.isWide && DialogClassesEnum.WIDE_DIALOG,

          this.isAnchored
            ? DialogClassesEnum.ANCHORED_DIALOG
            : DialogClassesEnum.NOT_ANCHORED_DIALOG,

          this.isInline
            ? DialogClassesEnum.INLINE_DIALOG
            : (
              !this.isAnchored && (
                this.$isCheckNeededAndAnotherModalDialogOpen
                  ? DialogClassesEnum.TRANSPARENT_DIALOG
                  : DialogClassesEnum.NOT_TRANSPARENT_DIALOG
              )
            ),
        )
      )
    );
  }

  /**
   * @stable [10.10.2020]
   */
  private get isCheckNeededAndAnotherModalDialogOpen(): boolean {
    return this.originalProps.checkModal && (
      this.domAccessor.hasElements(DialogClassesEnum.MODAL_DIALOG, this.portalElement)
    );
  }

  /**
   * @stable [10.10.2020]
   */
  protected get componentsSettingsProps(): TProps {
    return this.componentsSettings.dialog as TProps;
  }
}
