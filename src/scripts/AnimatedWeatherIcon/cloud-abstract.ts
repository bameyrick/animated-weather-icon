import WeatherPartAbstract from './weather-part-abstract';
import { AnimatedWeatherTypes } from './weather-types';

export default abstract class CloudAbstract extends WeatherPartAbstract {
  protected baseClass: string = 'Cloud';
  protected typeClass: string;

  protected path: SVGPathElement;

  private dashArrayOffset: string;
  private animationDuration: number = 1000;

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
      case AnimatedWeatherTypes.Cloudy:
      case AnimatedWeatherTypes.Sleet:
      case AnimatedWeatherTypes.Drizzle:
      case AnimatedWeatherTypes.DrizzleShowers:
      case AnimatedWeatherTypes.Rain:
      case AnimatedWeatherTypes.RainShowers:
      case AnimatedWeatherTypes.ThunderStorm:
      case AnimatedWeatherTypes.ThunderStormRain:
      case AnimatedWeatherTypes.ThunderStormDrizzle:
      case AnimatedWeatherTypes.Hail:
      case AnimatedWeatherTypes.HeavySnow:
      case AnimatedWeatherTypes.HeavySnowShowers: {
        return `medium`;
      }
      case AnimatedWeatherTypes.Overcast:
      case AnimatedWeatherTypes.HeavyDrizzle:
      case AnimatedWeatherTypes.HeavyDrizzleShowers:
      case AnimatedWeatherTypes.HeavyRain:
      case AnimatedWeatherTypes.HeavyRainShowers:
      case AnimatedWeatherTypes.ThunderStormHeavyDrizzle:
      case AnimatedWeatherTypes.ThunderStormHeavyRain: {
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
