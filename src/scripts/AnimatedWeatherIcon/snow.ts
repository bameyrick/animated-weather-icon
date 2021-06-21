import RainAbstract from './rain-abstract';
import { AnimatedWeatherTypes } from './weather-types';

export default class Snow extends RainAbstract {
  protected baseClass: string = 'Snow';
  protected lightTypes: AnimatedWeatherTypes[] = [AnimatedWeatherTypes.LightSnow, AnimatedWeatherTypes.LightSnowShowers];
  protected mediumTypes: AnimatedWeatherTypes[] = [AnimatedWeatherTypes.Snow, AnimatedWeatherTypes.SnowShowers];
  protected heavyTypes: AnimatedWeatherTypes[] = [
    AnimatedWeatherTypes.HeavySnow,
    AnimatedWeatherTypes.HeavySnowShowers,
    AnimatedWeatherTypes.Sleet,
    AnimatedWeatherTypes.SleetShowers,
  ];
  protected types = [...this.lightTypes, ...this.mediumTypes, ...this.heavyTypes];

  constructor(protected iconContext: HTMLElement) {
    super();
    this.initialise();
  }
}
