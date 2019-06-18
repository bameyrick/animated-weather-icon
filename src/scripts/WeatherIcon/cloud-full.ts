import CloudAbstract from './cloud-abstract';
import { WeatherTypes } from './weather-types';

export default class CloudFull extends CloudAbstract {
  protected typeClass: string = 'full';
  protected types: WeatherTypes[] = [WeatherTypes.BrokenClouds, WeatherTypes.Cloudy, WeatherTypes.Overcast];
}
