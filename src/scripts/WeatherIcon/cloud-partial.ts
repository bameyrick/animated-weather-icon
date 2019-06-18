import CloudAbstract from './cloud-abstract';
import { WeatherTypes } from './weather-types';

export default class CloudFull extends CloudAbstract {
  protected typeClass: string = 'partial';
  protected types: WeatherTypes[] = [
    WeatherTypes.LightDrizzle,
    WeatherTypes.Drizzle,
    WeatherTypes.HeavyDrizzle,
    WeatherTypes.LightDrizzleShowers,
    WeatherTypes.DrizzleShowers,
    WeatherTypes.HeavyDrizzleShowers,
    WeatherTypes.LightRain,
    WeatherTypes.Rain,
    WeatherTypes.HeavyRain,
    WeatherTypes.LightRainShowers,
    WeatherTypes.RainShowers,
    WeatherTypes.HeavyRainShowers,
    WeatherTypes.ThunderStorm,
    WeatherTypes.ThunderStormLightRain,
    WeatherTypes.ThunderStormRain,
    WeatherTypes.ThunderStormHeavyRain,
    WeatherTypes.ThunderStormLightDrizzle,
    WeatherTypes.ThunderStormDrizzle,
    WeatherTypes.ThunderStormHeavyDrizzle,
    WeatherTypes.Hail,
    WeatherTypes.Sleet,
    WeatherTypes.SleetShowers,
    WeatherTypes.LightSnow,
    WeatherTypes.Snow,
    WeatherTypes.HeavySnow,
    WeatherTypes.LightSnowShowers,
    WeatherTypes.SnowShowers,
    WeatherTypes.HeavySnowShowers,
  ];
}
