import WeatherPartAbstract from './weather-part-abstract';
import { WeatherTypes } from './weather-types';

export default class CloudAbstract extends WeatherPartAbstract {
  protected baseClass: string = 'Cloud';
  protected typeClass: string;

  protected path: SVGPathElement;

  private dashArrayOffset: string;
  private animationDuration: number = 3000;

  protected getElements(): void {
    this.path = <SVGPathElement>this.context.querySelector(`.${this.baseClass}__path--${this.typeClass}`);
    this.dashArrayOffset = this.path.getTotalLength().toString();

    this.activationPaths = [];
  }

  protected renderIn(): Promise<void> {
    return new Promise(async resolve => {
      await this.setClasses();

      this.path.style.strokeDashoffset = '0';

      setTimeout(resolve, this.animationDuration);
    });
  }

  protected renderOut(): Promise<void> {
    return new Promise(async resolve => {
      this.path.style.strokeDashoffset = this.dashArrayOffset;

      setTimeout(() => {
        this.setClasses(true);

        resolve();
      }, this.animationDuration);
    });
  }

  private getColourModifier(): string {
    switch (this.type) {
      case WeatherTypes.Cloudy:
      case WeatherTypes.Sleet:
      case WeatherTypes.Drizzle:
      case WeatherTypes.DrizzleShowers:
      case WeatherTypes.Rain:
      case WeatherTypes.RainShowers:
      case WeatherTypes.ThunderStorm:
      case WeatherTypes.ThunderStormRain:
      case WeatherTypes.ThunderStormDrizzle:
      case WeatherTypes.Hail:
      case WeatherTypes.HeavySnow:
      case WeatherTypes.HeavySnowShowers: {
        return `medium`;
      }
      case WeatherTypes.Overcast:
      case WeatherTypes.HeavyDrizzle:
      case WeatherTypes.HeavyDrizzleShowers:
      case WeatherTypes.HeavyRain:
      case WeatherTypes.HeavyRainShowers:
      case WeatherTypes.ThunderStormHeavyDrizzle:
      case WeatherTypes.ThunderStormHeavyRain: {
        return 'dark';
      }
      default: {
        return '';
      }
    }
  }

  private setClasses(remove: boolean = false): Promise<void> {
    return new Promise(resolve => {
      const operator = remove ? 'remove' : 'add';

      this.path.classList[operator](`${this.baseClass}__path--active`, `${this.baseClass}__path--${this.getColourModifier()}`);

      setTimeout(resolve);
    });
  }
}
