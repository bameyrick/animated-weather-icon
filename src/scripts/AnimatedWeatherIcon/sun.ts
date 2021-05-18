import { delay, asyncForEach } from '@qntm-code/utils';
import WeatherPartAbstract from './weather-part-abstract';
import { AnimatedWeatherTypes } from './weather-types';
import { AnimatedWeatherTimes } from './weather-times';

const sunRayDelay = 50;

export default class Sun extends WeatherPartAbstract {
  protected baseClass: string = 'Sun';

  private smallTypes: AnimatedWeatherTypes[] = [
    AnimatedWeatherTypes.BrokenClouds,
    AnimatedWeatherTypes.LightSnowShowers,
    AnimatedWeatherTypes.SnowShowers,
    AnimatedWeatherTypes.HeavySnowShowers,
    AnimatedWeatherTypes.LightDrizzleShowers,
    AnimatedWeatherTypes.DrizzleShowers,
    AnimatedWeatherTypes.HeavyDrizzleShowers,
    AnimatedWeatherTypes.LightRainShowers,
    AnimatedWeatherTypes.RainShowers,
    AnimatedWeatherTypes.HeavyRainShowers,
    AnimatedWeatherTypes.ThunderStormLightRain,
    AnimatedWeatherTypes.SleetShowers,
  ];

  private circle: SVGPathElement;
  private raysContainer: SVGElement;
  private rays: SVGPathElement[];
  private moon: SVGPathElement;

  protected getElements(): void {
    this.types = [AnimatedWeatherTypes.Clear, ...this.smallTypes];
    this.circle = <SVGPathElement>this.context.querySelector(`.${this.baseClass}__circle`);
    this.raysContainer = <SVGElement>this.context.querySelector(`.${this.baseClass}__rays`);
    this.rays = <SVGPathElement[]>[...(<any>this.context.querySelectorAll(`.${this.baseClass}__ray`))];
    this.moon = <SVGPathElement>this.context.querySelector(`.${this.baseClass}__night`);

    this.activationPaths = [this.circle, ...this.rays, this.moon];
  }

  protected async renderIn(): Promise<void> {
    if (this.time === AnimatedWeatherTimes.Day) {
      await this.renderInSun();
    } else {
      await this.renderInMoon();
    }
  }

  protected async renderOut(): Promise<void> {
    if (this.time === AnimatedWeatherTimes.Day) {
      await this.renderOutSun();
    } else {
      await this.renderOutMoon();
    }
  }

  private async renderInSun(): Promise<void> {
    await this.setActiveState(true);
    await this.activateRays(true);
    await delay(500);
    await this.animateRays(true);
  }

  private async renderOutSun(): Promise<void> {
    await this.activateRays(false);
    await this.animateRays(false);
    await this.setActiveState(false);
    await delay(500);
  }

  private async setActiveState(active: boolean): Promise<void> {
    const operator = active ? 'add' : 'remove';

    this.circle.classList[operator](`${this.baseClass}__circle--active`);
    this.raysContainer.classList[operator](`${this.baseClass}__rays--animate`);

    await this.setSmallClass(active);
  }

  private async setSmallClass(active: boolean): Promise<void> {
    if (this.smallTypes.includes(this.type)) {
      await delay(active ? 0 : 500);
      this.context.classList[active ? 'add' : 'remove'](`${this.baseClass}--small`);
    }
  }

  private activateRays(animateIn: boolean = true): Promise<void> {
    return this.setRays(animateIn, `${this.baseClass}__ray--active`, sunRayDelay);
  }

  private animateRays(animateIn: boolean): Promise<void> {
    return this.setRays(animateIn, `${this.baseClass}__ray--animate`);
  }

  private async setRays(animateIn: boolean, cls: string, iterationDelay: number = 0): Promise<void> {
    const setter = animateIn ? 'add' : 'remove';
    const rays = animateIn ? this.rays : this.rays.reverse();

    await asyncForEach(rays, ray => {
      return new Promise(rayResolve => {
        setTimeout(() => {
          ray.classList[setter](cls);

          rayResolve();
        }, iterationDelay);
      });
    });
  }

  private async renderInMoon(): Promise<void> {
    this.context.classList.add(`${this.baseClass}--night`);
    this.setSmallClass(true);
    this.moon.classList.add(`${this.baseClass}__night--animate`);

    await delay(500);
  }

  private async renderOutMoon(): Promise<void> {
    this.moon.classList.remove(`${this.baseClass}__night--animate`);
    await delay(500);
    this.context.classList.remove(`${this.baseClass}--night`);
    this.setSmallClass(false);
  }
}
