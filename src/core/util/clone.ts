import * as React from 'react';
import * as R from 'ramda';

import { FunctionT, isFn, isPrimitive, uuid } from '../util';
import { AnyT, ReactElementT } from '../definition.interface';

export function clone<TObject>(o: TObject): TObject {
  return JSON.parse(JSON.stringify(o));
}

export type RenderPredicateT = (child: ReactElementT) => boolean;

export function cloneNodes<TProps>(component: ReactElementT | React.PureComponent,
                                   mergedProps: TProps|((component: ReactElementT) => TProps),
                                   mergePropsPredicate: RenderPredicateT,
                                   childrenMap?: Map<ReactElementT, string>,
                                   renderPredicate?: RenderPredicateT): AnyT[]  {
  return React.Children.map(component.props.children, (child: React.ReactChild) => {
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

          const clonedChild = React.cloneElement<{ children: React.ReactChild[] }, {}>(
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
