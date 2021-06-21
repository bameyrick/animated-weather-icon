import WeatherPartAbstract from './weather-part-abstract';
import { AnimatedWeatherTypes } from './weather-types';

export default class Hail extends WeatherPartAbstract {
  protected baseClass: string = 'Hail';
  protected types: AnimatedWeatherTypes[] = [AnimatedWeatherTypes.Hail];

  private drops: SVGPathElement[];

  constructor(protected iconContext: HTMLElement) {
    super();
    this.initialise();
  }

  protected getElements(): void {
    this.drops = [...(<any>this.context.querySelectorAll(`.${this.baseClass}__drop`))];

    this.activationPaths = this.drops;
  }

  protected renderIn(): Promise<void> {
    return this.render();
  }

  protected renderOut(): Promise<void> {
    return this.render(false);
  }

  private async render(animateIn: boolean = true): Promise<void> {
    this.drops.forEach(drop => drop.classList[animateIn ? 'add' : 'remove'](`${this.baseClass}__drop--animate`));
  }
}
