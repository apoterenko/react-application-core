import { Component, InputHTMLAttributes, ClassAttributes, TextareaHTMLAttributes, RefAttributes } from 'react';

import {
  IStringErrorWrapper,
  IKeyboardOpenWrapper,
  ICaretVisibilityWrapper,
  ICaretPositionWrapper,
} from '../../../definitions.interface';

/**
 * @stable [04.09.2018]
 */
export interface IUniversalFieldState extends IStringErrorWrapper,
                                              IKeyboardOpenWrapper,
                                              ICaretVisibilityWrapper,
                                              ICaretPositionWrapper {
  focused?: boolean; // TODO
}

/**
 * @stable [03.09.2018]
 */
export interface IField2State extends IUniversalFieldState {
}
