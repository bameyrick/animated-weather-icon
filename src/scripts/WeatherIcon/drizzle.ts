import RainAbstract from './rain-abstract';
import { WeatherTypes } from './weather-types';

export default class Drizzle extends RainAbstract {
  protected baseClass: string = 'Drizzle';
  protected lightTypes: WeatherTypes[] = [
    WeatherTypes.LightDrizzle,
    WeatherTypes.LightDrizzleShowers,
    WeatherTypes.ThunderStormLightDrizzle,
  ];
  protected mediumTypes: WeatherTypes[] = [WeatherTypes.Drizzle, WeatherTypes.DrizzleShowers, WeatherTypes.ThunderStormDrizzle];
  protected heavyTypes: WeatherTypes[] = [
    WeatherTypes.HeavyDrizzle,
    WeatherTypes.HeavyDrizzleShowers,
    WeatherTypes.ThunderStormHeavyDrizzle,
  ];
}
