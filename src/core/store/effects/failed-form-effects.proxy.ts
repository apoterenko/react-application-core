import { FormActionBuilder } from '../../component/form';
import { makeFailedEffectsProxy } from './failed-effects.proxy';

export function makeFailedFormEffectsProxy(section: string): () => void {
  return makeFailedEffectsProxy(FormActionBuilder.buildSubmitErrorActionType(section));
}
