import { UniversalApplicationEffects } from './universal-application.effects';
import { appContainer } from '../di';

appContainer.bind(UniversalApplicationEffects).to(UniversalApplicationEffects).inSingletonScope();
