import * as React from 'react';

import { Field } from 'core/component/field';
import { AnyT, IKeyValue } from 'core/definition.interface';
import { isPrimitive } from 'core/util';

export function clone<TObject>(o: TObject): TObject {
  return JSON.parse(JSON.stringify(o));
}

export type ReactElementT = React.ReactElement<{ children: React.ReactChild[], type: AnyT }>;

export function cloneNodes(component: ReactElementT | React.PureComponent, mergedProps: IKeyValue) {
  return React.Children.map(component.props.children, (child: React.ReactChild) => {
        if (isPrimitive(child)) {
          return child;
        } else {
          const reactChild = child as ReactElementT;
          return React.cloneElement<{}, {}>(reactChild, {
            ...(Field.isPrototypeOf(reactChild.type) ? mergedProps : {}),
            ...{
              children: cloneNodes(reactChild, mergedProps),
            },
          });
        }
      }
  );
}
