import { ListActionBuilder } from '../../component/list';
import { makeFailedEffectsProxy } from './failed-effects.proxy';

export function makeFailedListEffectsProxy(section: string): () => void {
  return makeFailedEffectsProxy(ListActionBuilder.buildLoadErrorActionType(section));
}
