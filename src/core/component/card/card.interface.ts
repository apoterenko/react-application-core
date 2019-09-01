import { ICardConfiguration } from '../../configurations-definitions.interface';
import { IRippledWrapper } from '../../definitions.interface';

export interface ICardProps
  extends IRippledWrapper, ICardConfiguration {
}
