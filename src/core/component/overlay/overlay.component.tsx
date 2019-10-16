import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { BaseComponent } from '../base';
import { IOverlayProps } from './overlay.interface';
import { FlexLayout } from '../layout';
import { toClassName, isString, isFn, orNull } from '../../util';
import { UNI_CODES } from '../../definitions.interface';

export class Overlay extends BaseComponent<IOverlayProps> {

  /**
   * @stable [13.01.2019]
   * @returns {React.ReactNode}
   */
  public render(): React.ReactNode {
    const props = this.props;
    return ReactDOM.createPortal(
      <FlexLayout
        row={true}
        className={toClassName('rac-overlay rac-absolute-full', props.className)}
        onClick={props.onClick}
      >
        {props.children || UNI_CODES.noBreakSpace}
        {props.progress && (
          <FlexLayout
            fullSize={true}
            alignItemsCenter={true}
            justifyContentCenter={true}
            className='rac-overlay-progress'>
            {this.uiFactory.makeIcon({type: 'spinner', className: 'rac-overlay-progress-icon'})}
          </FlexLayout>
        )}
        {orNull<JSX.Element>(
          isFn(props.onClose),
          () => (
            this.uiFactory.makeIcon({
              type: 'close',
              className: 'rac-overlay-close-action',
              onClick: props.onClose,
            })
          )
        )}
      </FlexLayout>,
      this.domAccessor.getDocumentBodyElement()
    );
  }

  /**
   * @stable [13.01.2019]
   */
  public componentDidMount(): void {
    super.componentDidMount();
    this.setOverlayBackgroundClassName(true);
  }

  /**
   * @stable [13.01.2019]
   */
  public componentWillUnmount(): void {
    super.componentWillUnmount();
    this.setOverlayBackgroundClassName(false);
  }

  /**
   * @stable [13.01.2019]
   * @param {boolean} add
   */
  private setOverlayBackgroundClassName(add: boolean): void {
    const overlayBackgroundClassName = this.props.overlayBackgroundClassName;
    if (isString(overlayBackgroundClassName)) {
      if (add) {
        this.domAccessor.addClassNames(this.domAccessor.getRootElement(), overlayBackgroundClassName);
      } else {
        this.domAccessor.removeClassNames(this.domAccessor.getRootElement(), overlayBackgroundClassName);
      }
    }
  }
}
