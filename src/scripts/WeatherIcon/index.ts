import { WeatherTypes } from './weather-types';
import { WeatherTimes } from './weather-times';
import Sun from './sun';
import CloudFull from './cloud-full';
import CloudPartial from './cloud-partial';

const SVG = require('../../icon.svg');

export default class WeatherIcon {
  private currentType: WeatherTypes;
  private icon: HTMLElement;
  private sun: Sun;
  private cloudFull: CloudFull;
  private cloudPartial: CloudPartial;

  constructor(private context: HTMLElement) {
    this.initialiseIcon();
  }

  private initialiseIcon(): void {
    this.icon = document.createElement('div');
    this.icon.classList.add('WeatherIcon');
    this.icon.innerHTML = SVG;

    this.context.appendChild(this.icon);

    this.sun = new Sun(this.context);
    this.cloudFull = new CloudFull(this.context);
    this.cloudPartial = new CloudPartial(this.context);
  }

  public setType(type: WeatherTypes, time: WeatherTimes = WeatherTimes.Day): Promise<void> {
    return new Promise(async resolve => {
      this.currentType = type;

      await this.cloudFull.show(type, time);
      await this.cloudPartial.show(type, time);
      await this.sun.show(type, time);
      resolve();
    });
  }

  public unsetIcon(): Promise<void> {
    return new Promise(async resolve => {
      await this.sun.hide(this.currentType);
      await this.cloudFull.hide(this.currentType);
      await this.cloudPartial.hide(this.currentType);

      resolve();
    });
  }
}
