import CloudAbstract from "./cloud-abstract";
import { WeatherTypes } from './weather-types';


export default class CloudFull extends CloudAbstract {
  protected typeClass = 'full';
  protected types = [
    WeatherTypes.BrokenClouds,
    WeatherTypes.Cloudy,
    WeatherTypes.Overcast,
  ];
}
