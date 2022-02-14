import WeatherPartAbstract from './weather-part-abstract';
import { AnimatedWeatherTypes } from './weather-types';

export default abstract class RainAbstract extends WeatherPartAbstract {
  protected abstract lightTypes: AnimatedWeatherTypes[];
  protected abstract mediumTypes: AnimatedWeatherTypes[];
  protected abstract heavyTypes: AnimatedWeatherTypes[];
  protected drops: SVGPathElement[];

  protected getElements(): void {
    this.drops = [...(<never>this.context.querySelectorAll(`.${this.baseClass}__drop`))];

    this.activationPaths = this.drops;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  protected async renderIn(): Promise<void> {
    this.drops.forEach((drop) =>
      drop.classList.add(`${this.baseClass}__drop--animate`, `${this.baseClass}__drop--${this.getWeightModifier()}`)
    );
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  protected async renderOut(): Promise<void> {
    this.drops.forEach((drop) =>
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
