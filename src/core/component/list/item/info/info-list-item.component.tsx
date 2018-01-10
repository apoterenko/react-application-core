import * as React from 'react';

import { orNull } from '../../../../util';
import { BaseComponent } from '../../../../component/base';
import { SimpleListItem } from '../simple';
import { ListItemGraphic } from '../graphic';
import { ListItemText } from '../text';
import { ListItemSecondaryText } from '../secondary-text';
import { IInfoListItemInternalProps } from './info-list-item.interface';

export class InfoListItem extends BaseComponent<InfoListItem, IInfoListItemInternalProps, {}> {

  public render(): JSX.Element {
    const props = this.props;

    return (
        <SimpleListItem {...props}>
          {orNull(
              props.graphicContent, () => (
                  <ListItemGraphic>
                    {props.graphicContent}
                  </ListItemGraphic>
              ))
          }
          <ListItemText>
            {props.children}
            {orNull(
                props.secondaryTextContent, () => (
                    <ListItemSecondaryText>
                      {props.secondaryTextContent}
                    </ListItemSecondaryText>
                ))
            }
          </ListItemText>
        </SimpleListItem>
    );
  }
}
