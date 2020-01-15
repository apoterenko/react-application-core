import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Button } from '../button';
import {
  handlerPropsFactory,
  isCheckScrimNeeded,
  isFn,
  joinClassName,
  orNull,
} from '../../util';
import { PerfectScrollPlugin } from '../plugin';
import {
  IActivateDialogConfigEntity,
  IDialog,
  IDialogProps,
  IDialogState,
} from '../../definition';
import { BasicComponent } from '../base/basic.component';
import { BaseComponent } from '../base/base.component';
import { ICheckScrimWrapper } from '../../definitions.interface';

export class Dialog<TProps extends IDialogProps = IDialogProps,
                    TState extends IDialogState = IDialogState>
  extends BaseComponent<TProps, TState>
  implements IDialog<TProps, TState> {

  private onDeactivateCallback: () => void;
  private doesAnotherScrimLayerExist = false;

  /**
   * @stable [06.01.2020]
   * @param {TProps} props
   */
  constructor(props: TProps) {
    super(props);

    this.onAcceptClick = this.onAcceptClick.bind(this);
    this.onCloseClick = this.onCloseClick.bind(this);
    this.onDialogScrimClick = this.onDialogScrimClick.bind(this);

    this.state = {opened: false} as TState;

    if (isCheckScrimNeeded(props as ICheckScrimWrapper)) {
      this.doesAnotherScrimLayerExist = this.domAccessor.hasElements('.rac-dialog__scrim', this.anchorElement);
    }
  }

  /**
   * @stable [05.01.2020]
   * @returns {React.ReactNode}
   */
  public render(): React.ReactNode {
    return orNull(
      this.state.opened,
      () => (
        ReactDOM.createPortal(
          <div
            ref={this.selfRef}
            className={this.getDialogClassName()}
            {...handlerPropsFactory(this.onDialogScrimClick, true, false)}
          >
            <div className={joinClassName(
              'rac-dialog__body-wrapper',
              'rac-absolute',
              'rac-full-size',
              this.doesAnotherScrimLayerExist ? 'rac-dialog__transparent-scrim' : 'rac-dialog__scrim'
            )}>
              {this.dialogBodyElement}
            </div>
          </div>,
          this.anchorElement
        )
      )
    );
  }

  /**
   * @stable [06.01.2020]
   * @param {IActivateDialogConfigEntity} payload
   */
  public activate(payload?: IActivateDialogConfigEntity): void {
    this.setState({opened: true}, () => {
      const {
        onActivate,
        onDeactivate,
      } = payload || {} as IActivateDialogConfigEntity;

      if (isFn(onDeactivate)) {
        this.onDeactivateCallback = onDeactivate;
      }
      if (isFn(onActivate)) {
        onActivate.call(this);
      }
      const props = this.props;
      if (isFn(props.onActivate)) {
        props.onActivate();
      }
    });
  }

  /**
   * @stable [06.01.2020]
   */
  public accept(): void {
    this.onAcceptClick();
  }

  /**
   * @stable [05.01.2020]
   * @returns {string}
   */
  protected getDialogClassName(): string {
    return joinClassName('rac-dialog', this.props.className);
  }

  /**
   * @stable [06.01.2020]
   */
  protected onAcceptClick(): void {
    const props = this.props;

    this.doClose(() => {
      if (isFn(props.onAccept)) {
        props.onAccept();
      }
    });
  }

  /**
   * @stable [05.01.2020]
   */
  private onCloseClick(): void {
    const props = this.props;

    this.doClose(() => {
      if (isFn(props.onClose)) {
        props.onClose();
      }
    });
  }

  /**
   * @stable [05.01.2020]
   */
  private onDialogScrimClick(): void {
    this.doClose();
  }

  /**
   * @stable [05.01.2020]
   * @param {() => void} callback
   */
  private doClose(callback?: () => void): void {
    const props = this.props;

    this.setState({opened: false}, () => {
      if (isFn(this.onDeactivateCallback)) {
        this.onDeactivateCallback.call(this);
        this.onDeactivateCallback = null;
      }
      if (isFn(props.onDeactivate)) {
        props.onDeactivate();
      }
      if (isFn(callback)) {
        callback.call(this);
      }
    });
  }

  /**
   * @stable [24.03.2019]
   * @returns {JSX.Element}
   */
  private get footerElement(): JSX.Element {
    const props = this.props;
    return (
      orNull(
        this.closable || this.acceptable,
        () => (
          <div className='rac-dialog__actions'>
            {
              orNull(
                this.closable,
                () => (
                  <Button
                    icon='close'
                    full={true}
                    disabled={this.isCloseButtonDisabled}
                    onClick={this.onCloseClick}>
                    {this.t(props.closeText || this.settings.messages.DIALOG_CANCEL)}
                  </Button>
                )
              )
            }
            {
              orNull(
                this.acceptable,
                () => (
                  <Button
                    icon='ok-filled'
                    full={true}
                    raised={true}
                    disabled={this.isAcceptButtonDisabled}
                    onClick={this.onAcceptClick}>
                    {this.t(props.acceptText || this.settings.messages.DIALOG_ACCEPT)}
                  </Button>
                )
              )
            }
          </div>
        )
      )
    );
  }

  /**
   * @stable [05.01.2020]
   * @returns {JSX.Element}
   */
  private get dialogBodyElement(): JSX.Element {
    return (
      <div className='rac-dialog__body'>
        {this.bodyElement}
        {this.footerElement}
      </div>
    );
  }

  /**
   * @stable [06.01.2020]
   * @returns {JSX.Element}
   */
  private get bodyElement(): JSX.Element {
    const props = this.props;
    return (
      <React.Fragment>
        {
          props.title && (
            <div className='rac-dialog__body-title'>
              {this.t(props.title)}
            </div>
          )
        }
        {
          props.children && (
            <BasicComponent
              className='rac-dialog__body-content'
              plugins={PerfectScrollPlugin}>
              {props.children}
            </BasicComponent>
          )
        }
      </React.Fragment>
    );
  }

  /**
   * @stable [06.01.2020]
   * @returns {boolean}
   */
  private get acceptable(): boolean {
    return this.props.acceptable !== false;
  }

  /**
   * @stable [06.01.2020]
   * @returns {boolean}
   */
  private get closable(): boolean {
    return this.props.closable !== false;
  }

  /**
   * @stable [06.01.2020]
   * @returns {boolean}
   */
  private get isCloseButtonDisabled(): boolean {
    return this.props.closeDisabled === true;
  }

  /**
   * @stable [06.01.2020]
   * @returns {boolean}
   */
  private get isAcceptButtonDisabled(): boolean {
    return this.props.acceptDisabled === true;
  }

  /**
   * @stable [15.01.2020]
   * @returns {Element}
   */
  private get anchorElement(): Element {
    return this.domAccessor.getDocumentBodyElement();
  }
}
