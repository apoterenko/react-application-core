import { Component } from 'react';

import { IComponentProps } from '../../definition';
import { IDisabledWrapper, IOnSelectWrapper, IOpenWrapper } from '../../definitions.interface';

/**
 * @stable [03.08.2018]
 */
export interface IDndProps extends IComponentProps,
                                   IDisabledWrapper,
                                   IOnSelectWrapper<File[]> {
}

/**
 * @stable [03.08.2018]
 */
export interface INativeDropZoneComponent extends Component,
                                                  IOpenWrapper<() => void> {
}
