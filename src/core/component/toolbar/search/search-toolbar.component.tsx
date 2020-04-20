import * as React from 'react';

import { joinClassName, calc } from '../../../util';
import { TextField } from '../../field';
import { ISearchToolbarProps } from './search-toolbar.interface';
import { UniversalSearchToolbar } from './universal-search-toolbar.component';
import { FlexLayout } from '../../layout/flex';
import { Button } from '../../button';

export class SearchToolbar<TProps extends ISearchToolbarProps = ISearchToolbarProps,
                           TState = {}>
  extends UniversalSearchToolbar<TProps, TState> {
}
