import * as React from 'react';

import { AnyT, IKeyValue, ReactElementT } from 'core/definition.interface';
import { isPrimitive } from 'core/util';

export function clone<TObject>(o: TObject): TObject {
  return JSON.parse(JSON.stringify(o));
}

export function cloneNodes(component: ReactElementT | React.PureComponent,
                           mergedProps: IKeyValue,
                           predicate: (child: ReactElementT) => boolean) {
  return React.Children.map(component.props.children, (child: React.ReactChild) => {
        if (isPrimitive(child)) {
          return child;
        } else {
          const reactChild = child as ReactElementT;
          return React.cloneElement<{}, {}>(reactChild, {
            ...(predicate(reactChild) ? mergedProps : {}),
            ...{
              children: cloneNodes(reactChild, mergedProps, predicate),
            },
          });
        }
      }
  );
}
