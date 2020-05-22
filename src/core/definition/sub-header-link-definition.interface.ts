import * as React from 'react';

import { IGenericBaseComponentProps } from './generic-component-definition.interface';
import {
  IOnClickWrapper,
  ISeparatorWrapper,
  ITextWrapper,
} from '../definitions.interface';
import { IRouterStoreProxyFactoryConfigEntity } from './store-proxy-definition.interface';

/**
 * @presets-entity
 * @stable [22.05.2020]
 */
export interface IPresetsSubHeaderLinkEntity
  extends IRouterStoreProxyFactoryConfigEntity,
    IOnClickWrapper,
    ISeparatorWrapper<React.ReactNode>,
    ITextWrapper {
}

/**
 * @generic-entity
 * @stable [22.05.2020]
 */
export interface IGenericSubHeaderLinkEntity
  extends IPresetsSubHeaderLinkEntity {
}

/**
 * @props
 * @stable [22.05.2020]
 */
export interface ISubHeaderLinkProps
  extends IGenericBaseComponentProps,
    IGenericSubHeaderLinkEntity {
}

/**
 * @classes
 * @stable [22.05.2020]
 */
export enum SubHeaderLinkClasses {
  SUB_HEADER_LINK = 'rac-sub-header-link',
  SUB_HEADER_LINK_ACTIVE = 'rac-sub-header-link-active',
  SUB_HEADER_LINK_CONTENT = 'rac-sub-header-link__content',
}
