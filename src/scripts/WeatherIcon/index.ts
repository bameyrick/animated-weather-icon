import { WeatherTypes } from './weather-types';
import { WeatherTimes } from './weather-times';
import Sun from './sun';
import CloudFull from './cloud-full';
import CloudPartial from './cloud-partial';
import Rain from './rain';
import Drizzle from './drizzle';
import Snow from './snow';

const SVG = require('../../icon.svg');

export default class WeatherIcon {
  private currentType: WeatherTypes;
  private icon: HTMLElement;
  private sun: Sun;
  private cloudFull: CloudFull;
  private cloudPartial: CloudPartial;
  private rain: Rain;
  private drizzle: Drizzle;
  private snow: Snow;

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
    this.rain = new Rain(this.context);
    this.drizzle = new Drizzle(this.context);
    this.snow = new Snow(this.context);
  }

  public setType(type: WeatherTypes, time: WeatherTimes = WeatherTimes.Day): Promise<void> {
    return new Promise(async resolve => {
      this.currentType = type;

      await this.cloudFull.show(type, time);
      await this.cloudPartial.show(type, time);
      await this.rain.show(type, time);
      await this.drizzle.show(type, time);
      await this.snow.show(type, time);
      await this.sun.show(type, time);
      resolve();
    });
  }

  public unsetIcon(): Promise<void> {
    return new Promise(async resolve => {
      await this.sun.hide(this.currentType);
      await this.rain.hide(this.currentType);
      await this.drizzle.hide(this.currentType);
      await this.snow.hide(this.currentType);
      await this.cloudFull.hide(this.currentType);
      await this.cloudPartial.hide(this.currentType);

      resolve();
    });
  }
}
