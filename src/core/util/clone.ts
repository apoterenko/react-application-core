import * as React from 'react';
import * as R from 'ramda';

import {
  IEntity,
  UNDEF_SYMBOL,
} from '../definitions.interface';
import { CalcUtils } from './calc';
import { ConditionUtils } from './cond';
import { TypeUtils } from './type';
import { UuidUtils } from './uuid';

/**
 * @stable [29.08.2020]
 * @param entity
 */
const shallowClone = <TEntity extends IEntity>(entity: TEntity): TEntity => ConditionUtils.ifNotNilThanValue(
  entity,
  () => ({...entity as {}} as TEntity),
  UNDEF_SYMBOL
);

/**
 * @stable [29.08.2020]
 * @param o
 */
const clone = <TValue>(o: TValue): TValue => R.clone<TValue>(o);

export type RenderPredicateT = (child: JSX.Element) => boolean;

export const cloneReactNodes = <TProps>(component: JSX.Element | React.Component<{}>,
                                        mergedProps: TProps | ((component: JSX.Element | React.Component<{}>) => TProps),
                                        mergePropsPredicate: RenderPredicateT,
                                        renderPredicate?: RenderPredicateT): React.ReactNode[] =>
  React.Children.map<React.ReactNode, React.ReactNode>(
    component.props.children,
    (child) => {
      if (R.isNil(child)) {
        return null;
      } else if (TypeUtils.isPrimitive(child)) {
        return child;
      } else {
        const reactChild = child as React.FunctionComponentElement<{ children: React.ReactChild[] }>;
        const ref = reactChild.ref || UuidUtils.uuid();
        const canMergeProps = mergePropsPredicate(reactChild);

        const canRender = renderPredicate ? renderPredicate(reactChild) : true;
        if (!R.isNil(canRender) && !canRender) {
          return null;
        }
        return React.cloneElement<React.Props<TProps>>(
          reactChild,
          {
            ...(canMergeProps && {
              ref,
              ...CalcUtils.calc<TProps>(mergedProps, reactChild) as {},
            }),
            children: cloneReactNodes<TProps>(reactChild, mergedProps, mergePropsPredicate, renderPredicate),
          }
        );
      }
    },
  );

/**
 * @stable [18.07.2020]
 */
export class CloneUtils {
  public static readonly clone = clone;
  public static readonly shallowClone = shallowClone;
}
