import * as React from 'react';
import * as R from 'ramda';

import { FunctionT, isFn, isPrimitive, uuid } from '../util';
import { ReactElementT } from '../definitions.interface';

/**
 * @stable [14.06.2018]
 * @param {T} o
 * @returns {T}
 */
export const clone = <T>(o: T): T => R.clone<T>(o);

export type RenderPredicateT = (child: ReactElementT) => boolean;
export type ClonedComponentT = ReactElementT | React.Component;

export function cloneNodes<TProps>(component: ClonedComponentT,
                                   mergedProps: TProps|((component: ClonedComponentT) => TProps),
                                   mergePropsPredicate: RenderPredicateT,
                                   childrenMap?: Map<ReactElementT, string>,
                                   renderPredicate?: RenderPredicateT): React.ReactChild[]  {
  return React.Children.map<React.ReactChild>(component.props.children, (child: React.ReactChild) => {
        if (R.isNil(child)) {
          return null;
        } else if (isPrimitive(child)) {
          return child;
        } else {
          const reactChild = child as ReactElementT;
          const uuidRef = uuid();
          const canMergeProps = mergePropsPredicate(reactChild);

          const canRender = renderPredicate ? renderPredicate(reactChild) : true;
          if (!R.isNil(canRender) && !canRender) {
            return null;
          }

          const clonedChild = React.cloneElement<{ children: React.ReactChild[] }>(
              reactChild,
              {
                ...(canMergeProps
                      ? {
                          ref: uuidRef,
                          ...(
                              isFn(mergedProps)
                                  ? (mergedProps as FunctionT)(reactChild)
                                  : mergedProps
                          ),
                        }
                      : {}
                ),
                children: cloneNodes<TProps>(
                    reactChild,
                    mergedProps,
                    mergePropsPredicate,
                    childrenMap,
                    renderPredicate),
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
