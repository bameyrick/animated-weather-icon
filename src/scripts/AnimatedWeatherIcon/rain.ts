import RainAbstract from './rain-abstract';
import { AnimatedWeatherTypes } from './weather-types';

export default class Rain extends RainAbstract {
  protected baseClass: string = 'Rain';

  protected lightTypes: AnimatedWeatherTypes[] = [
    AnimatedWeatherTypes.LightRain,
    AnimatedWeatherTypes.LightRainShowers,
    AnimatedWeatherTypes.ThunderStormLightRain,
  ];

  protected mediumTypes: AnimatedWeatherTypes[] = [
    AnimatedWeatherTypes.Rain,
    AnimatedWeatherTypes.RainShowers,
    AnimatedWeatherTypes.ThunderStormRain,
  ];

  protected heavyTypes: AnimatedWeatherTypes[] = [
    AnimatedWeatherTypes.HeavyRain,
    AnimatedWeatherTypes.HeavyRainShowers,
    AnimatedWeatherTypes.ThunderStormHeavyRain,
  ];

  protected types = [...this.lightTypes, ...this.mediumTypes, ...this.heavyTypes];

  constructor(protected iconContext: HTMLElement) {
    super();
    this.initialise();
  }
}
