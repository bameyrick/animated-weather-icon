import RainAbstract from './rain-abstract';
import { WeatherTypes } from './weather-types';

export default class Rain extends RainAbstract {
  protected baseClass: string = 'Rain';
  protected lightTypes: WeatherTypes[] = [WeatherTypes.LightRain, WeatherTypes.LightRainShowers, WeatherTypes.ThunderStormLightRain];
  protected mediumTypes: WeatherTypes[] = [WeatherTypes.Rain, WeatherTypes.RainShowers, WeatherTypes.ThunderStormRain];
  protected heavyTypes: WeatherTypes[] = [WeatherTypes.HeavyRain, WeatherTypes.HeavyRainShowers, WeatherTypes.ThunderStormHeavyRain];
}
