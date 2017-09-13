import * as React from 'react';

import { isPrimitive, uuid } from 'core/util';
import { AnyT, ReactElementT } from 'core/definition.interface';

export function clone<TObject>(o: TObject): TObject {
  return JSON.parse(JSON.stringify(o));
}

export function cloneNodes<TProps>(component: ReactElementT | React.PureComponent,
                                   mergedProps: TProps,
                                   predicate: (child: ReactElementT) => boolean,
                                   childrenMap?: Map<ReactElementT, string>): AnyT[]  {
  return React.Children.map(component.props.children, (child: React.ReactChild) => {
        if (isPrimitive(child)) {
          return child;
        } else {
          const reactChild = child as ReactElementT;
          const uuidRef = uuid();
          const isApplicable = predicate(reactChild);

          const clonedChild = React.cloneElement<{ children: React.ReactChild[] }, {}>(
              reactChild,
              {
                ...(isApplicable ? { ref: uuidRef, ...(mergedProps || {}) } : {}),
                children: cloneNodes<TProps>(reactChild, mergedProps, predicate, childrenMap),
              }
          );
          if (childrenMap && isApplicable) {
            childrenMap.set(clonedChild, uuidRef);
          }
          return clonedChild;
        }
      },
  );
}
