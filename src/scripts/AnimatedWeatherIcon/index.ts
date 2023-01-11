import { v4 as uuid } from 'uuid';
import CloudFull from './cloud-full';
import CloudPartial from './cloud-partial';
import Drizzle from './drizzle';
import Fog from './fog';
import Hail from './hail';
import Lightning from './lightning';
import Rain from './rain';
import Snow from './snow';
import Sun from './sun';
import { AnimatedWeatherTimes } from './weather-times';
import { AnimatedWeatherTypes } from './weather-types';

import '../../scss/index.scss';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
const SVG: string = require('../../icon.svg');

export { AnimatedWeatherTimes } from './weather-times';
export { AnimatedWeatherTypes } from './weather-types';

export class AnimatedWeatherIcon {
  private currentType: AnimatedWeatherTypes;
  private currentTime: AnimatedWeatherTimes;
  private icon: HTMLElement;
  private sunMask: Sun;
  private sun: Sun;
  private cloudFull: CloudFull;
  private cloudPartial: CloudPartial;
  private cloudFullMask: CloudFull;
  private cloudPartialMask: CloudPartial;
  private rain: Rain;
  private drizzle: Drizzle;
  private snow: Snow;
  private lightning: Lightning;
  private hail: Hail;
  private fog: Fog;

  private readonly id = uuid();

  private disableAnimation = false;

  constructor(private readonly context: HTMLElement) {
    this.initialiseIcon();
  }

  private initialiseIcon(): void {
    this.icon = document.createElement('div');
    this.icon.classList.add('AnimatedWeatherIcon');
    this.icon.innerHTML = SVG;

    this.context.appendChild(this.icon);

    const cloudMaskID = `cloud-mask-${this.id}`;

    this.context.querySelector('.CloudMask')?.setAttribute('id', cloudMaskID);
    this.context.querySelector('.AnimatedWeatherIcon__sun-mask')?.setAttribute('mask', `url(#${cloudMaskID})`);

    const sunMaskID = `sun-mask-${this.id}`;

    this.context.querySelector('.SunMask')?.setAttribute('id', sunMaskID);
    this.context.querySelector('.AnimatedWeatherIcon__rays-mask')?.setAttribute('mask', `url(#${sunMaskID})`);

    this.sunMask = new Sun(this.context, true);
    this.sun = new Sun(this.context);
    this.cloudFull = new CloudFull(this.context);
    this.cloudPartial = new CloudPartial(this.context);
    this.cloudFullMask = new CloudFull(this.context, true);
    this.cloudPartialMask = new CloudPartial(this.context, true);
    this.rain = new Rain(this.context);
    this.drizzle = new Drizzle(this.context);
    this.snow = new Snow(this.context);
    this.lightning = new Lightning(this.context);
    this.hail = new Hail(this.context);
    this.fog = new Fog(this.context);
  }

  public async setType(
    type: AnimatedWeatherTypes,
    time: AnimatedWeatherTimes = AnimatedWeatherTimes.Day,
    disableAnimation = false
  ): Promise<void> {
    if (
      this.currentType &&
      this.currentTime &&
      (this.currentType !== type || this.currentTime !== time || this.disableAnimation !== disableAnimation)
    ) {
      await this.unsetIcon(this.disableAnimation);
    }
    this.disableAnimation = disableAnimation;

    this.currentType = type;
    this.currentTime = time;

    void this.cloudFullMask.show(type, time, disableAnimation);
    await this.cloudFull.show(type, time, disableAnimation);
    void this.cloudPartialMask.show(type, time, disableAnimation);
    await this.cloudPartial.show(type, time, disableAnimation);
    await this.rain.show(type, time, disableAnimation);
    await this.drizzle.show(type, time, disableAnimation);
    await this.snow.show(type, time, disableAnimation);
    await this.hail.show(type, time, disableAnimation);
    await this.lightning.show(type, time, disableAnimation);
    void this.sunMask.show(type, time, disableAnimation);
    await this.sun.show(type, time, disableAnimation);
    await this.fog.show(type, time, disableAnimation);
  }

  public async unsetIcon(force = false): Promise<void> {
    await this.sun.hide(this.currentType, force);
    void this.sunMask.hide(this.currentType, force);
    await this.lightning.hide(this.currentType, force);
    await this.rain.hide(this.currentType, force);
    await this.drizzle.hide(this.currentType, force);
    await this.snow.hide(this.currentType, force);
    await this.hail.hide(this.currentType, force);
    await this.cloudFull.hide(this.currentType, force);
    void this.cloudFullMask.hide(this.currentType, force);
    await this.cloudPartial.hide(this.currentType, force);
    void this.cloudPartialMask.hide(this.currentType, force);
    await this.fog.hide(this.currentType, force);
  }
}
