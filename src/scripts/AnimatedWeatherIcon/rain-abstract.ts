import WeatherPartAbstract from './weather-part-abstract';
import { AnimatedWeatherTypes } from './weather-types';

export default class RainAbstract extends WeatherPartAbstract {
  protected lightTypes: AnimatedWeatherTypes[] = [];
  protected mediumTypes: AnimatedWeatherTypes[] = [];
  protected heavyTypes: AnimatedWeatherTypes[] = [];

  protected drops: SVGPathElement[];

  protected getElements(): void {
    this.types = [...this.lightTypes, ...this.mediumTypes, ...this.heavyTypes];
    this.drops = [...(<any>this.context.querySelectorAll(`.${this.baseClass}__drop`))];

    this.activationPaths = this.drops;
  }

  protected async renderIn(): Promise<void> {
    this.drops.forEach(drop =>
      drop.classList.add(`${this.baseClass}__drop--animate`, `${this.baseClass}__drop--${this.getWeightModifier()}`)
    );
  }

  protected async renderOut(): Promise<void> {
    this.drops.forEach(drop =>
      drop.classList.remove(`${this.baseClass}__drop--animate`, `${this.baseClass}__drop--${this.getWeightModifier()}`)
    );
  }

  private getWeightModifier(): string {
    if (this.mediumTypes.includes(this.type)) {
      return 'medium';
    }

    if (this.heavyTypes.includes(this.type)) {
      return 'heavy';
    }

    return '';
  }
}
