import { AnimatedWeatherTypes } from './weather-types';
import { AnimatedWeatherTimes } from './weather-times';
import Sun from './sun';
import CloudFull from './cloud-full';
import CloudPartial from './cloud-partial';
import Rain from './rain';
import Drizzle from './drizzle';
import Snow from './snow';
import Lightning from './lightning';
import Hail from './hail';
import Fog from './fog';

import '../../scss/index.scss';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
const SVG: string = require('../../icon.svg');

export { AnimatedWeatherTypes } from './weather-types';
export { AnimatedWeatherTimes } from './weather-times';

export class AnimatedWeatherIcon {
  private currentType: AnimatedWeatherTypes;
  private currentTime: AnimatedWeatherTimes;
  private icon: HTMLElement;
  private sun: Sun;
  private cloudFull: CloudFull;
  private cloudPartial: CloudPartial;
  private rain: Rain;
  private drizzle: Drizzle;
  private snow: Snow;
  private lightning: Lightning;
  private hail: Hail;
  private fog: Fog;

  constructor(private context: HTMLElement) {
    this.initialiseIcon();
  }

  private initialiseIcon(): void {
    this.icon = document.createElement('div');
    this.icon.classList.add('AnimatedWeatherIcon');
    this.icon.innerHTML = SVG;

    this.context.appendChild(this.icon);

    this.sun = new Sun(this.context);
    this.cloudFull = new CloudFull(this.context);
    this.cloudPartial = new CloudPartial(this.context);
    this.rain = new Rain(this.context);
    this.drizzle = new Drizzle(this.context);
    this.snow = new Snow(this.context);
    this.lightning = new Lightning(this.context);
    this.hail = new Hail(this.context);
    this.fog = new Fog(this.context);
  }

  public async setType(type: AnimatedWeatherTypes, time: AnimatedWeatherTimes = AnimatedWeatherTimes.Day): Promise<void> {
    if (this.currentType && this.currentTime && (this.currentType !== type || this.currentTime !== time)) {
      await this.unsetIcon();
    }

    this.currentType = type;
    this.currentTime = time;

    await this.cloudFull.show(type, time);
    await this.cloudPartial.show(type, time);
    await this.rain.show(type, time);
    await this.drizzle.show(type, time);
    await this.snow.show(type, time);
    await this.hail.show(type, time);
    await this.lightning.show(type, time);
    await this.sun.show(type, time);
    await this.fog.show(type, time);
  }

  public async unsetIcon(): Promise<void> {
    await this.sun.hide(this.currentType);
    await this.lightning.hide(this.currentType);
    await this.rain.hide(this.currentType);
    await this.drizzle.hide(this.currentType);
    await this.snow.hide(this.currentType);
    await this.hail.hide(this.currentType);
    await this.cloudFull.hide(this.currentType);
    await this.cloudPartial.hide(this.currentType);
    await this.fog.hide(this.currentType);
  }
}
