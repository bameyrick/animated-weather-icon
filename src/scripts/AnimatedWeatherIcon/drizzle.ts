import RainAbstract from './rain-abstract';
import { AnimatedWeatherTypes } from './weather-types';

export default class Drizzle extends RainAbstract {
  protected baseClass: string = 'Drizzle';
  protected lightTypes: AnimatedWeatherTypes[] = [
    AnimatedWeatherTypes.LightDrizzle,
    AnimatedWeatherTypes.LightDrizzleShowers,
    AnimatedWeatherTypes.ThunderStormLightDrizzle,
  ];
  protected mediumTypes: AnimatedWeatherTypes[] = [
    AnimatedWeatherTypes.Drizzle,
    AnimatedWeatherTypes.DrizzleShowers,
    AnimatedWeatherTypes.ThunderStormDrizzle,
  ];
  protected heavyTypes: AnimatedWeatherTypes[] = [
    AnimatedWeatherTypes.HeavyDrizzle,
    AnimatedWeatherTypes.HeavyDrizzleShowers,
    AnimatedWeatherTypes.ThunderStormHeavyDrizzle,
  ];
}
