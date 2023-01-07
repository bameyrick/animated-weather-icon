import { asyncForEach, delay } from '@qntm-code/utils';
import WeatherPartAbstract from './weather-part-abstract';
import { AnimatedWeatherTimes } from './weather-times';
import { AnimatedWeatherTypes } from './weather-types';

const sunRayDelay = 50;

export default class Sun extends WeatherPartAbstract {
  protected baseClass: string = this.mask ? 'SunMask' : 'Sun';

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

  protected types = [AnimatedWeatherTypes.Clear, ...this.smallTypes];

  private circle: SVGPathElement;
  private raysContainer: SVGElement;
  private rays: SVGPathElement[];
  private moon: SVGPathElement;

  constructor(protected iconContext: HTMLElement, private readonly mask?: boolean) {
    super();
    this.initialise();
  }

  protected getElements(): void {
    this.circle = <SVGPathElement>this.context.querySelector(`.${this.baseClass}__circle`);
    this.raysContainer = <SVGElement>this.context.querySelector(`.${this.baseClass}__rays`);
    this.rays = <SVGPathElement[]>[...(<never>this.context.querySelectorAll(`.${this.baseClass}__ray`))];
    this.moon = <SVGPathElement>this.context.querySelector(`.${this.baseClass}__night`);

    this.activationPaths = [this.circle];
    if (!this.mask) {
      this.activationPaths = [...this.activationPaths, ...this.rays, this.moon];
    }
  }

  protected async renderIn(): Promise<void> {
    if (this.time === AnimatedWeatherTimes.Day) {
      await this.renderInSun();
    } else {
      await this.renderInMoon();
    }
  }

  protected async renderOut(force: boolean): Promise<void> {
    if (this.time === AnimatedWeatherTimes.Day) {
      await this.renderOutSun(force);
    } else {
      await this.renderOutMoon(force);
    }
  }

  private async renderInSun(): Promise<void> {
    await this.setActiveState(true);
    await this.activateRays(true);
    await delay(500);
    await this.animateRays(true);
  }

  private async renderOutSun(force): Promise<void> {
    if (force) {
      void this.animateRays(false, true);
      void this.activateRays(false, true);
      void this.setActiveState(false);
    } else {
      await this.animateRays(false);
      await this.activateRays(false);
      await this.setActiveState(false);
      await delay(500);
    }
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

  private activateRays(animateIn: boolean = true, force = false): Promise<void> {
    return this.setRays(animateIn, `${this.baseClass}__ray--active`, force, sunRayDelay);
  }

  private animateRays(animateIn: boolean, force = false): Promise<void> {
    return this.setRays(animateIn, `${this.baseClass}__ray--animate`, force);
  }

  private async setRays(animateIn: boolean, cls: string, force = false, iterationDelay: number = 0): Promise<void> {
    const setter = animateIn ? 'add' : 'remove';
    const rays = animateIn ? this.rays : this.rays.reverse();

    if (force) {
      rays.forEach(ray => ray.classList[setter](cls));
    } else {
      await asyncForEach(rays, ray => {
        return new Promise<void>(resolve => {
          setTimeout(() => {
            ray.classList[setter](cls);

            resolve();
          }, iterationDelay);
        });
      });
    }
  }

  private async renderInMoon(): Promise<void> {
    this.context.classList.add(`${this.baseClass}--night`);
    void this.setSmallClass(true);
    this.moon.classList.add(`${this.baseClass}__night--animate`);

    await delay(500);
  }

  private async renderOutMoon(force: boolean): Promise<void> {
    this.moon.classList.remove(`${this.baseClass}__night--animate`);

    if (!force) {
      await delay(500);
    }

    this.context.classList.remove(`${this.baseClass}--night`);
    void this.setSmallClass(false);
  }
}
