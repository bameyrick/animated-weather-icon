import WeatherPartAbstract from './weather-part-abstract';
import { WeatherTypes } from './weather-types';

export default class Hail extends WeatherPartAbstract {
  protected baseClass: string = 'Hail';
  protected types: WeatherTypes[] = [WeatherTypes.Hail];

  private drops: SVGPathElement[];

  protected getElements(): void {
    this.drops = [...(<any>this.context.querySelectorAll(`.${this.baseClass}__drop`))];

    this.activationPaths = this.drops;
  }

  protected renderIn(): Promise<void> {
    return new Promise(async resolve => {
      this.drops.forEach(drop => drop.classList.add(`${this.baseClass}__drop--animate`));

      resolve();
    });
  }

  protected renderOut(): Promise<void> {
    return new Promise(async resolve => {
      this.drops.forEach(drop => drop.classList.remove(`${this.baseClass}__drop--animate`));

      resolve();
    });
  }
}
