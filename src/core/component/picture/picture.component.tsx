import * as React from 'react';

import { toClassName } from '../../util';
import { BaseComponent } from '../base';
import { IPictureInternalProps } from './picture.interface';

export class Picture extends BaseComponent<Picture, IPictureInternalProps, {}> {

  public static defaultProps: IPictureInternalProps = {
    defaultScr: 'media/no_picture.jpg',
  };

  public render(): JSX.Element {
    const props = this.props;
    return (
      <img className={toClassName(
              !props.src && 'rac-picture-empty',
              props.src && 'rac-picture'
           )}
           style={props.style}
           src={props.src || props.defaultScr}/>
    );
  }
}
