import * as R from 'ramda';
import { MDCSnackbar } from '@material/snackbar';

import { DelayedTask } from '../../../util';
import { MaterialPlugin } from './material.plugin';
import { INativeMaterialSnackbarComponent } from '../material.interface';
import { Snackbar, ISnackbarConfiguration, ISnackbarProps } from '../../snackbar';

export class SnackbarMaterialPlugin extends MaterialPlugin<Snackbar, INativeMaterialSnackbarComponent> {

  private static DEFAULT_DELAY_BEFORE_SHOW = 100;

  private task: DelayedTask;

  /**
   * @stable [22.08.2018]
   * @param {Snackbar} tabPanel
   */
  constructor(tabPanel: Snackbar) {
    super(tabPanel, MDCSnackbar);

    this.task = new DelayedTask(this.refresh.bind(this), SnackbarMaterialPlugin.DEFAULT_DELAY_BEFORE_SHOW);
  }

  /**
   * @stable [22.08.2018]
   * @param {Readonly<ISnackbarProps>} prevProps
   * @param {{}} nextContext
   */
  public componentDidUpdate(prevProps: Readonly<ISnackbarProps>, nextContext: {}): void {
    this.task.start();
  }

  /**
   * @stable [22.08.2018]
   */
  public componentWillUnmount(): void {
    this.task.stop();
    super.componentWillUnmount();
  }

  /**
   * @stable [22.08.2018]
   */
  public componentDidMount(): void {
    super.componentDidMount();
    this.task.start();
  }

  /**
   * @stable [22.08.2018]
   * @param {ISnackbarConfiguration} options
   */
  private show(options: ISnackbarConfiguration): void {
    const props = this.component.props;

    if (props.error) {
      this.adapter.addClass('rac-snackbar-error');
    } else {
      this.adapter.removeClass('rac-snackbar-error');
    }

    this.mdc.show({
      timeout: props.timeout,
      actionText: this.t(props.actionText),
      actionHandler: props.actionHandler,
      ...options,
    });
  }

  /**
   * @stable [22.08.2018]
   */
  private refresh(): void {
    const props = this.component.props;
    const message = props.message;

    if (!R.isNil(message)) {
      this.show({message});

      if (props.afterShow) {
        props.afterShow();   // Flux lifecycle: destroy a message state
      }
    }
  }
}
