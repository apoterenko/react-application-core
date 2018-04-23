import { Component } from 'react';

import { IComponent, IComponentProps } from '../../entities-definitions.interface';

export interface IDndInternalProps extends IComponentProps {
  onSelect?(files: File[]): void;
}

export interface INativeDropZone {
  open(): void;
}

export interface INativeDropZoneComponent extends Component<{}, {}>,
                                                  INativeDropZone {
}

export interface IDnd extends IComponent<IDndInternalProps, {}>,
                              INativeDropZone {
}
