import WeatherPartAbstract from './weather-part-abstract';
import { WeatherTypes } from './weather-types';
import { delay } from 'q';

export default class Fog extends WeatherPartAbstract {
  protected baseClass: string = 'Fog';
  protected types: WeatherTypes[] = [WeatherTypes.Fog];

  private fogBars: SVGPathElement[];

  protected getElements(): void {
    this.fogBars = [...(<any>this.context.querySelectorAll(`.${this.baseClass}__bar`))];

    this.activationPaths = this.fogBars;
  }

  protected renderIn(): Promise<void> {
    return this.render();
  }

  protected renderOut(): Promise<void> {
    return this.render(false);
  }

  private render(animateIn: boolean = true): Promise<void> {
    return new Promise(async resolve => {
      this.fogBars.forEach(bar => bar.classList[animateIn ? 'add' : 'remove'](`${this.baseClass}__bar--animate`));

      await delay(500);

      resolve();
    });
  }
}
