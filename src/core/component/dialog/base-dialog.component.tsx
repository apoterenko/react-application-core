import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as R from 'ramda';

import { Button } from '../button';
import {
  CalcUtils,
  ClsUtils,
  ConditionUtils,
  isAcceptable,
  isAcceptDisabled,
  isCheckModalNeeded,
  isClosable,
  isCloseDisabled,
  isOpened,
  isOverlay,
  isOverlayClosable,
  isScrollable,
  PropsUtils,
  TypeUtils,
  WrapperUtils,
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
 * @stable [11.05.2020]
 */
export class BaseDialog<TProps extends IDialogProps = IDialogProps,
                        TState extends IDialogState = IDialogState>
  extends GenericComponent<TProps, TState>
  implements IDialog<TProps, TState> {

  public static readonly defaultProps: IDialogProps = {
    default: true,
  };

  private $closeEventUnsubscriber: () => void;
  private $onDeactivateCallback: () => void;
  private $isCheckNeededAndAnotherModalDialogOpen: boolean;
  private readonly $bodyRef = React.createRef<HTMLDivElement>();

  /**
   *  @stable [11.05.2020]
   * @param {TProps} props
   */
  constructor(props: TProps) {
    super(props);

    this.doClose = this.doClose.bind(this);
    this.onAcceptClick = this.onAcceptClick.bind(this);
    this.onCloseClick = this.onCloseClick.bind(this);
    this.onDialogClick = this.onDialogClick.bind(this);
    this.onDocumentClickCapture = this.onDocumentClickCapture.bind(this);

    this.state = {opened: false} as TState;

    this.$isCheckNeededAndAnotherModalDialogOpen = this.isCheckNeededAndAnotherModalDialogOpen;
  }

  /**
   * @stable [11.05.2020]
   * @returns {React.ReactNode}
   */
  public render(): React.ReactNode {
    return ConditionUtils.orNull(
      isOpened(this.state),
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
   * @stable [11.05.2020]
   */
  public componentDidMount(): void {
    this.showOverlayIfApplicable();
    if (this.isOverlay) {
      this.activate();
    }
  }

  /**
   * @stable [11.05.2020]
   */
  public componentWillUnmount(): void {
   this.onDestroy();
  }

  /**
   * @stable [11.05.2020]
   * @param {IActivateDialogConfigEntity} payload
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
   * @stable [11.05.2020]
   */
  protected onAcceptClick(): void {
    const {
      onAccept,
      onBeforeAccept,
    } = this.mergedProps;

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
   * @stable [11.05.2020]
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
   * @stable [11.05.2020]
   * @returns {string}
   */
  protected get title(): string | boolean {
    return this.mergedProps.title;
  }

  /**
   * @stable [11.05.2020]
   * @returns {string}
   */
  protected get closeText(): string {
    return this.mergedProps.closeText || this.settings.messages.DIALOG_CANCEL;
  }

  /**
   * @stable [11.05.2020]
   * @returns {string}
   */
  protected get acceptText(): string {
    return this.mergedProps.acceptText || this.settings.messages.DIALOG_ACCEPT;
  }

  /**
   * @stable [11.05.2020]
   */
  private onDialogClick(): void {
    this.doClose();
  }

  /**
   * @stable [11.05.2020]
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
   * @stable [11.05.2020]
   */
  private onDestroy(): void {
    this.closeOverlayIfApplicable();
    this.unsubscribeEvents();
  }

  /**
   * @stable [11.05.2020]
   */
  private onAfterRender(): void {
    if (!this.isAnchored) {
      return;
    }
    this.unsubscribeEvents();

    const {
      anchorElement,
      positionConfiguration,
    } = this.mergedProps;

    this.domAccessor.setPosition({
      ...positionConfiguration,
      element: this.$bodyRef.current,
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
   * @stable [11.05.2020]
   * @param {() => void} callback
   */
  private doClose(callback?: () => void): void {
    const {
      onDeactivate,
    } = this.mergedProps;

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
   * @stable [19.09.2020]
   */
  protected get componentsSettingsProps(): TProps {
    return this.componentsSettings.dialog as TProps;
  }

  /**
   * @stable [11.05.2020]
   * @returns {JSX.Element}
   */
  private get actionsElement(): JSX.Element {
    return ConditionUtils.orNull(
      this.closable || this.acceptable,
      () => {
        const mergedProps = this.mergedProps;
        return (
          <div className={DialogClassesEnum.DIALOG_ACTIONS}>
            {
              ConditionUtils.orNull(
                this.closable,
                () => (
                  <Button
                    icon={IconsEnum.TIMES}
                    {...mergedProps.closeActionConfiguration}
                    disabled={isCloseDisabled(mergedProps)}
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
                    {...mergedProps.acceptActionConfiguration}
                    disabled={isAcceptDisabled(mergedProps)}
                    onClick={this.onAcceptClick}>
                    {this.t(this.acceptText)}
                  </Button>
                )
              )
            }
          </div>
        );
      }
    );
  }

  /**
   * @stable [11.05.2020]
   * @returns {JSX.Element}
   */
  private get dialogBodyElement(): JSX.Element {
    const mergedProps = this.mergedProps;

    return (
      <div
        ref={this.$bodyRef}
        style={{width: CalcUtils.calc(mergedProps.width)}}
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
                  ? isOverlayClosable(mergedProps) && this.closeOverlayActionElement
                  : this.actionsElement}
              </React.Fragment>
            )
        }
      </div>
    );
  }

  /**
   * @stable [11.05.2020]
   * @returns {JSX.Element}
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
   * @stable [11.05.2020]
   * @returns {JSX.Element}
   */
  private get extraActionsElement(): JSX.Element {
    return (
      <React.Fragment>
        {
          this.hasExtraActions && (
            <div className={DialogClassesEnum.DIALOG_EXTRA_ACTIONS}>
              {this.mergedProps.extraActions}
            </div>
          )
        }
      </React.Fragment>
    );
  }

  /**
   * @stable [11.05.2020]
   * @returns {JSX.Element}
   */
  private get bodyElement(): JSX.Element {
    const {children} = this.props;

    return (
      <React.Fragment>
        {
          this.hasExtraActions
            ? (
              children && (
                <BasicComponent
                  className={DialogClassesEnum.DIALOG_BODY_CONTENT}
                  plugins={this.wrapperPlugins}
                >
                  {children}
                </BasicComponent>
              )
            )
            : children
        }
      </React.Fragment>
    );
  }

  /**
   * @stable [11.05.2020]
   */
  private unsubscribeEvents(): void {
    if (TypeUtils.isFn(this.$closeEventUnsubscriber)) {
      this.$closeEventUnsubscriber();
      this.$closeEventUnsubscriber = null;
    }
  }

  /**
   * @stable [11.05.2020]
   */
  private showOverlayIfApplicable(): void {
    if (this.isOverlay) {
      this.domAccessor.addClassNamesToRootElement(DialogClassesEnum.OVERLAY_FILTER);
    }
  }

  /**
   * @stable [11.05.2020]
   */
  private closeOverlayIfApplicable(): void {
    if (this.isOverlay) {
      this.domAccessor.removeClassNamesFromRootElement(DialogClassesEnum.OVERLAY_FILTER);
    }
  }

  /**
   * @stable [11.05.2020]
   * @returns {JSX.Element}
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
   * @stable [11.05.2020]
   * @returns {JSX.Element}
   */
  private get closeOverlayActionElement(): JSX.Element {
    return (
      this.uiFactory.makeIcon({
        type: IconsEnum.TIMES,
        className: DialogClassesEnum.OVERLAY_DIALOG_CLOSE_ICON,
        onClick: this.doClose,
      })
    );
  }

  /**
   * @stable [11.05.2020]
   * @returns {boolean}
   */
  private get acceptable(): boolean {
    return isAcceptable(this.originalProps);
  }

  /**
   * @stable [11.05.2020]
   * @returns {boolean}
   */
  private get closable(): boolean {
    return isClosable(this.originalProps);
  }

  /**
   * @stable [11.05.2020]
   * @returns {Element}
   */
  private get portalElement(): Element {
    return this.domAccessor.documentBody;
  }

  /**
   * @stable [11.05.2020]
   * @returns {boolean}
   */
  private get isAnchored(): boolean {
    return !R.isNil(this.mergedProps.anchorElement);
  }

  /**
   * @stable [21.08.2020]
   */
  private get isInline(): boolean {
    return this.originalProps.inline;
  }

  /**
   * @stable [04.10.2020]
   */
  private get isDefault(): boolean {
    return this.originalProps.default;
  }

  /**
   * @stable [11.05.2020]
   * @returns {boolean}
   */
  private get isOverlay(): boolean {
    return isOverlay(this.mergedProps);
  }

  /**
   * @stable [04.10.2020]
   */
  private get isConfirm(): boolean {
    return this.originalProps.confirm;
  }

  /**
   * @stable [04.10.2020]
   */
  private get isWide(): boolean {
    return this.originalProps.wide;
  }

  /**
   * @stable [11.05.2020]
   * @returns {boolean}
   */
  private get isModal(): boolean {
    return (!this.isInline && !this.isAnchored) || this.isOverlay;
  }

  /**
   * @stable [11.05.2020]
   * @returns {boolean}
   */
  private get hasExtraActions(): boolean {
    return !R.isNil(this.mergedProps.extraActions);
  }

  /**
   * @stable [11.05.2020]
   * @returns {boolean}
   */
  private get isScrollable(): boolean {
    return isScrollable(this.mergedProps);
  }

  /**
   * @stable [02.08.2020]
   */
  private get isDialogInProgress(): boolean {
    return WrapperUtils.inProgress(this.originalProps);
  }

  /**
   * @stable [11.05.2020]
   * @returns {GenericPluginCtorT[]}
   */
  private get wrapperPlugins(): GenericPluginCtorT[] {
    return this.isScrollable ? [PerfectScrollPlugin] : [];
  }

  /**
   * @stable [11.05.2020]
   * @returns {string}
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
   * @stable [11.05.2020]
   * @returns {boolean}
   */
  private get isCheckNeededAndAnotherModalDialogOpen(): boolean {
    return isCheckModalNeeded(this.mergedProps) && (
      this.domAccessor.hasElements(DialogClassesEnum.MODAL_DIALOG, this.portalElement)
    );
  }
}
