import RainAbstract from './rain-abstract';
import { WeatherTypes } from './weather-types';

export default class Snow extends RainAbstract {
  protected baseClass: string = 'Snow';
  protected lightTypes: WeatherTypes[] = [WeatherTypes.LightSnow, WeatherTypes.LightSnowShowers];
  protected mediumTypes: WeatherTypes[] = [WeatherTypes.Snow, WeatherTypes.SnowShowers];
  protected heavyTypes: WeatherTypes[] = [
    WeatherTypes.HeavySnow,
    WeatherTypes.HeavySnowShowers,
    WeatherTypes.Sleet,
    WeatherTypes.SleetShowers,
  ];
}
