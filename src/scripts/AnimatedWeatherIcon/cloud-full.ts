import CloudAbstract from './cloud-abstract';
import { AnimatedWeatherTypes } from './weather-types';

export default class CloudFull extends CloudAbstract {
  protected typeClass: string = 'full';
  protected types: AnimatedWeatherTypes[] = [AnimatedWeatherTypes.BrokenClouds, AnimatedWeatherTypes.Cloudy, AnimatedWeatherTypes.Overcast];

  constructor(protected iconContext: HTMLElement) {
    super();
    this.initialise();
  }
}
