import WeatherPartAbstract from './weather-part-abstract';
import { AnimatedWeatherTypes } from './weather-types';

export default abstract class RainAbstract extends WeatherPartAbstract {
  protected abstract lightTypes: AnimatedWeatherTypes[];
  protected abstract mediumTypes: AnimatedWeatherTypes[];
  protected abstract heavyTypes: AnimatedWeatherTypes[];
  protected drops: SVGPathElement[];

  protected initialise(): void {
    this.types = [...this.lightTypes, ...this.mediumTypes, ...this.heavyTypes];

    super.initialise();
  }

  protected getElements(): void {
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
