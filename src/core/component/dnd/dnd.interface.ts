import { Component } from 'react';

import { IBaseComponent } from '../base';

export interface IDndInternalProps {
  onSelect?(files: File[]): void;
}

export interface INativeDropZone {
  open(): void;
}

export interface INativeDropZoneComponent extends Component<{}, {}>,
                                                  INativeDropZone {
}

export interface IDnd extends IBaseComponent<IDndInternalProps, {}>,
                              INativeDropZone {
}
