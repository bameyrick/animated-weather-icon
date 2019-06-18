import WeatherPartAbstract from './weather-part-abstract';
import { WeatherTypes } from './weather-types';

export default class RainAbstract extends WeatherPartAbstract {
  protected lightTypes: WeatherTypes[] = [];
  protected mediumTypes: WeatherTypes[] = [];
  protected heavyTypes: WeatherTypes[] = [];

  protected drops: SVGPathElement[];

  protected getElements(): void {
    this.types = [...this.lightTypes, ...this.mediumTypes, ...this.heavyTypes];
    this.drops = [...(<any>this.context.querySelectorAll(`.${this.baseClass}__drop`))];

    this.activationPaths = this.drops;
  }

  protected renderIn(): Promise<void> {
    return new Promise(async resolve => {
      this.drops.forEach(drop =>
        drop.classList.add(`${this.baseClass}__drop--animate`, `${this.baseClass}__drop--${this.getWeightModifier()}`)
      );

      resolve();
    });
  }

  protected renderOut(): Promise<void> {
    return new Promise(async resolve => {
      this.drops.forEach(drop =>
        drop.classList.remove(`${this.baseClass}__drop--animate`, `${this.baseClass}__drop--${this.getWeightModifier()}`)
      );

      resolve();
    });
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
