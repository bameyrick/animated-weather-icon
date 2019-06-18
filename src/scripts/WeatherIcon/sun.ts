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

  protected getElements(): void {
    this.types = [WeatherTypes.Clear, ...this.smallTypes];
    this.circle = <SVGPathElement>this.context.querySelector('.Sun__circle');
    this.raysContainer = <SVGElement>this.context.querySelector('.Sun__rays');
    this.rays = <SVGPathElement[]>[...(<any>this.context.querySelectorAll('.Sun__ray'))];

    this.activationPaths = [this.circle, ...this.rays];
  }

  protected renderIn(): Promise<void> {
    return new Promise(async resolve => {
      if (this.time === WeatherTimes.Day) {
        await this.renderInSun();
      }

      resolve();
    });
  }

  protected renderOut(): Promise<void> {
    return new Promise(async resolve => {
      if (this.time === WeatherTimes.Day) {
        await this.renderOutSun();
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

      this.circle.classList[operator]('Sun__circle--active');
      this.raysContainer.classList[operator]('Sun__rays--animate');

      if (this.smallTypes.includes(this.type)) {
        await delay(active ? 0 : 500);
        this.context.classList[operator]('Sun--small');
      }

      resolve();
    });
  }

  private activateRays(animateIn: boolean = true): Promise<void> {
    return this.setRays(animateIn, 'Sun__ray--active', 100);
  }

  private animateRays(animateIn: boolean): Promise<void> {
    return this.setRays(animateIn, 'Sun__ray--animate');
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
}
