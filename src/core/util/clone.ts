import * as React from 'react';
import * as R from 'ramda';

import { isPrimitive, uuid } from '../util';
import { AnyT, ReactElementT } from '../definition.interface';

export function clone<TObject>(o: TObject): TObject {
  return JSON.parse(JSON.stringify(o));
}

export function cloneNodes<TProps>(component: ReactElementT | React.PureComponent,
                                   mergedProps: TProps,
                                   canMergePropsPredicate: (child: ReactElementT) => boolean,
                                   childrenMap?: Map<ReactElementT, string>,
                                   renderConditionPredicate?: (child: ReactElementT) => boolean): AnyT[]  {
  return React.Children.map(component.props.children, (child: React.ReactChild) => {
        if (R.isNil(child)) {
          return null;
        } else if (isPrimitive(child)) {
          return child;
        } else {
          const reactChild = child as ReactElementT;
          const uuidRef = uuid();
          const canMergeProps = canMergePropsPredicate(reactChild);
          const canRender = renderConditionPredicate ? renderConditionPredicate(reactChild) : true;
          if (!R.isNil(canRender) && !canRender) {
            return null;
          }

          const clonedChild = React.cloneElement<{ children: React.ReactChild[] }, {}>(
              reactChild,
              {
                ...(canMergeProps ? {ref: uuidRef, ...(mergedProps || {})} : {}),
                children: cloneNodes<TProps>(
                    reactChild,
                    mergedProps,
                    canMergePropsPredicate,
                    childrenMap,
                    renderConditionPredicate),
              }
          );
          if (childrenMap && canMergeProps) {
            childrenMap.set(clonedChild, uuidRef);
          }
          return clonedChild;
        }
      },
  );
}
