import { delay } from '@qntm-code/utils';
import WeatherPartAbstract from './weather-part-abstract';
import { AnimatedWeatherTypes } from './weather-types';

export default class Fog extends WeatherPartAbstract {
  protected baseClass: string = 'Fog';
  protected types: AnimatedWeatherTypes[] = [AnimatedWeatherTypes.Fog];

  private fogBars: SVGPathElement[];

  constructor(protected iconContext: HTMLElement) {
    super();
    this.initialise();
  }

  protected getElements(): void {
    this.fogBars = [...(<never>this.context.querySelectorAll(`.${this.baseClass}__bar`))];

    this.activationPaths = this.fogBars;
  }

  protected renderIn(): Promise<void> {
    return this.render();
  }

  protected renderOut(force: boolean): Promise<void> {
    return this.render(false, force);
  }

  private async render(animateIn: boolean = true, force = false): Promise<void> {
    this.fogBars.forEach(bar => bar.classList[animateIn ? 'add' : 'remove'](`${this.baseClass}__bar--animate`));

    if (!force && !this.disableAnimation) {
      await delay(500);
    }
  }
}
