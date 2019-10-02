import { Component } from 'react';

import { IComponentProps, IComponent } from '../../definition';
import { IDisabledWrapper, IOnSelectWrapper, IOpenWrapper } from '../../definitions.interface';

/**
 * @stable [03.08.2018]
 */
export interface IDndProps extends IComponentProps,
                                   IDisabledWrapper,
                                   IOnSelectWrapper<(item: File[]) => void> {
}

/**
 * @stable [03.08.2018]
 */
export interface INativeDropZoneComponent extends Component,
                                                  IOpenWrapper<() => void> {
}

/**
 * @stable [03.08.2018]
 */
export interface IDnd extends IComponent<IDndProps>,
                              IOpenWrapper<() => void> {
}
