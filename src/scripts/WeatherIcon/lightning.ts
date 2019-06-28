import WeatherPartAbstract from './weather-part-abstract';
import { WeatherTypes } from './weather-types';

export default class Lightning extends WeatherPartAbstract {
  protected baseClass: string = 'Lightning';
  protected types: WeatherTypes[] = [
    WeatherTypes.ThunderStorm,
    WeatherTypes.ThunderStormLightRain,
    WeatherTypes.ThunderStormRain,
    WeatherTypes.ThunderStormHeavyRain,
    WeatherTypes.ThunderStormLightDrizzle,
    WeatherTypes.ThunderStormDrizzle,
    WeatherTypes.ThunderStormHeavyDrizzle,
  ];

  private lightningPath: SVGPathElement;

  protected getElements(): void {
    this.lightningPath = <SVGPathElement>this.context.querySelector(`.${this.baseClass}__path`);

    this.activationPaths = [this.lightningPath];
  }

  protected renderIn(): Promise<void> {
    return this.render();
  }

  protected renderOut(): Promise<void> {
    return this.render(false);
  }

  private async render(animateIn: boolean = true): Promise<void> {
    this.lightningPath.classList[animateIn ? 'add' : 'remove'](`${this.baseClass}__path--animate`);
  }
}
