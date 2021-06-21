import CloudAbstract from './cloud-abstract';
import { AnimatedWeatherTypes } from './weather-types';

export default class CloudFull extends CloudAbstract {
  protected typeClass: string = 'partial';
  protected types: AnimatedWeatherTypes[] = [
    AnimatedWeatherTypes.LightDrizzle,
    AnimatedWeatherTypes.Drizzle,
    AnimatedWeatherTypes.HeavyDrizzle,
    AnimatedWeatherTypes.LightDrizzleShowers,
    AnimatedWeatherTypes.DrizzleShowers,
    AnimatedWeatherTypes.HeavyDrizzleShowers,
    AnimatedWeatherTypes.LightRain,
    AnimatedWeatherTypes.Rain,
    AnimatedWeatherTypes.HeavyRain,
    AnimatedWeatherTypes.LightRainShowers,
    AnimatedWeatherTypes.RainShowers,
    AnimatedWeatherTypes.HeavyRainShowers,
    AnimatedWeatherTypes.ThunderStorm,
    AnimatedWeatherTypes.ThunderStormLightRain,
    AnimatedWeatherTypes.ThunderStormRain,
    AnimatedWeatherTypes.ThunderStormHeavyRain,
    AnimatedWeatherTypes.ThunderStormLightDrizzle,
    AnimatedWeatherTypes.ThunderStormDrizzle,
    AnimatedWeatherTypes.ThunderStormHeavyDrizzle,
    AnimatedWeatherTypes.Hail,
    AnimatedWeatherTypes.Sleet,
    AnimatedWeatherTypes.SleetShowers,
    AnimatedWeatherTypes.LightSnow,
    AnimatedWeatherTypes.Snow,
    AnimatedWeatherTypes.HeavySnow,
    AnimatedWeatherTypes.LightSnowShowers,
    AnimatedWeatherTypes.SnowShowers,
    AnimatedWeatherTypes.HeavySnowShowers,
  ];

  constructor(protected iconContext: HTMLElement) {
    super();
    this.initialise();
  }
}
