import WeatherPartAbstract from './weather-part-abstract';
import { WeatherTypes } from './weather-types';
import { WeatherTimes } from './weather-times';
import asyncForEach from './asyncForEach';
import delay from './delay';

export default class Sun extends WeatherPartAbstract {
  protected baseClass: string = 'Sun';

  private smallTypes: WeatherTypes[] = [
    WeatherTypes.BrokenClouds,
    WeatherTypes.LightSnowShowers,
    WeatherTypes.SnowShowers,
    WeatherTypes.HeavySnowShowers,
    WeatherTypes.LightDrizzleShowers,
    WeatherTypes.DrizzleShowers,
    WeatherTypes.HeavyDrizzleShowers,
    WeatherTypes.LightRainShowers,
    WeatherTypes.RainShowers,
    WeatherTypes.HeavyRainShowers,
    WeatherTypes.ThunderStormLightRain,
    WeatherTypes.SleetShowers,
  ];

  private circle: SVGPathElement;
  private raysContainer: SVGElement;
  private rays: SVGPathElement[];
  private moon: SVGPathElement;

  protected getElements(): void {
    this.types = [WeatherTypes.Clear, ...this.smallTypes];
    this.circle = <SVGPathElement>this.context.querySelector(`.${this.baseClass}__circle`);
    this.raysContainer = <SVGElement>this.context.querySelector(`.${this.baseClass}__rays`);
    this.rays = <SVGPathElement[]>[...(<any>this.context.querySelectorAll(`.${this.baseClass}__ray`))];
    this.moon = <SVGPathElement>this.context.querySelector(`.${this.baseClass}__night`);

    this.activationPaths = [this.circle, ...this.rays, this.moon];
  }

  protected renderIn(): Promise<void> {
    return new Promise(async resolve => {
      if (this.time === WeatherTimes.Day) {
        await this.renderInSun();
      } else {
        await this.renderMoon();
      }

      resolve();
    });
  }

  protected renderOut(): Promise<void> {
    return new Promise(async resolve => {
      if (this.time === WeatherTimes.Day) {
        await this.renderOutSun();
      } else {
        await this.renderMoon(false);
      }

      resolve();
    });
  }

  private renderInSun(): Promise<void> {
    return new Promise(async resolve => {
      await this.setActiveState(true);
      await this.activateRays(true);
      await delay(400);
      await this.animateRays(true);

      resolve();
    });
  }

  private renderOutSun(): Promise<void> {
    return new Promise(async resolve => {
      await this.activateRays(false);
      await this.animateRays(false);
      await this.setActiveState(false);
      await delay(500);

      resolve();
    });
  }

  private setActiveState(active: boolean): Promise<void> {
    return new Promise(async resolve => {
      const operator = active ? 'add' : 'remove';

      this.circle.classList[operator](`${this.baseClass}__circle--active`);
      this.raysContainer.classList[operator](`${this.baseClass}__rays--animate`);

      await this.setSmallClass(active);

      resolve();
    });
  }

  private setSmallClass(active: boolean): Promise<void> {
    return new Promise(async resolve => {
      if (this.smallTypes.includes(this.type)) {
        await delay(active ? 0 : 500);
        this.context.classList[active ? 'add' : 'remove'](`${this.baseClass}--small`);
      }

      resolve();
    });
  }

  private activateRays(animateIn: boolean = true): Promise<void> {
    return this.setRays(animateIn, `${this.baseClass}__ray--active`, 100);
  }

  private animateRays(animateIn: boolean): Promise<void> {
    return this.setRays(animateIn, `${this.baseClass}__ray--animate`);
  }

  private setRays(animateIn: boolean, cls: string, iterationDelay: number = 0): Promise<void> {
    return new Promise(async resolve => {
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

      resolve();
    });
  }

  private renderMoon(animateIn: boolean = true): Promise<void> {
    return new Promise(async resolve => {
      const operator = animateIn ? 'add' : 'remove';
      this.context.classList[operator](`${this.baseClass}--night`);
      this.setSmallClass(animateIn);
      this.moon.classList[operator](`${this.baseClass}__night--animate`);

      await delay(500);

      resolve();
    });
  }
}
