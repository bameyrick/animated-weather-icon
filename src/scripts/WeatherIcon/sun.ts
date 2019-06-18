import WeatherPartAbstract from './weather-part-abstract';
import { WeatherTypes } from './weather-types';
import { WeatherTimes } from './weather-times';
import asyncForEach from './asyncForEach';
import delay from './delay';

export default class Sun extends WeatherPartAbstract {
  protected baseClass = 'Sun';
  protected type = WeatherTypes.Clear;

  private circle: SVGPathElement;
  private raysContainer: SVGElement;
  private rays: SVGPathElement[];

  protected getElements(): void {
    this.circle = <SVGPathElement>this.context.querySelector('.Sun__circle');
    this.raysContainer = <SVGElement>this.context.querySelector('.Sun__rays');
    this.rays = <SVGPathElement[]>[...<any>this.context.querySelectorAll('.Sun__ray')];

    this.activationPaths = [this.circle, ...this.rays];
  }

  protected renderIn(): Promise<void> {
    return new Promise(async resolve => {
      if (this.time === WeatherTimes.Day) {
        await this.renderInSun();

        resolve();
      }
    });
  }

  protected renderOut(): Promise<void> {
    return new Promise(async resolve => {
      if (this.time === WeatherTimes.Day) {
        await this.renderOutSun();

        resolve();
      }
    }); 
  }

  private renderInSun(): Promise<void> {
    return new Promise(async resolve => {
      this.setActiveState(true);
      await this.activateRays(true);
      await delay(400);
      await this.animateRays(true);

      resolve();
    });
  }

  private renderOutSun(): Promise<void> {
    return new Promise(async resolve => {
      await this.animateRays(false);
      await this.activateRays(false);
      this.setActiveState(false);

      resolve();
    });
  }

  private setActiveState(active: boolean): void {
    const setter = active ? 'add' : 'remove';

    this.circle.classList[setter]('Sun__circle--active');
    this.raysContainer.classList[setter]('Sun__rays--animate');
  }

  private activateRays(animateIn: boolean = true): Promise<void> {
    return this.setRays(animateIn, 'Sun__ray--active', 100);
  }

  private animateRays(animateIn: boolean): Promise<void> {
    return this.setRays(animateIn, 'Sun__ray--animate');
  }

  private setRays(animateIn: boolean, cls: string, delay: number = 0): Promise<void> {
    return new Promise(async resolve => {
      const setter = animateIn ? 'add' : 'remove'; 
      const rays = animateIn ? this.rays : this.rays.reverse();

      await asyncForEach(rays, ray => {
        return new Promise(resolve => {
          setTimeout(() => {
            ray.classList[setter](cls);

            resolve();
          }, delay);
        });
      });

      resolve();
    });
  }
}
