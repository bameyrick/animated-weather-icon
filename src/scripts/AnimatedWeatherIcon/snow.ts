import RainAbstract from './rain-abstract';
import { AnimatedWeatherTypes } from './weather-types';

export default class Snow extends RainAbstract {
  protected baseClass: string = 'Snow';
  protected lightTypes: AnimatedWeatherTypes[] = [AnimatedWeatherTypes.LightSnow, AnimatedWeatherTypes.LightSnowShowers];
  protected mediumTypes: AnimatedWeatherTypes[] = [AnimatedWeatherTypes.Snow, AnimatedWeatherTypes.SnowShowers];
  protected heavyTypes: AnimatedWeatherTypes[] = [
    AnimatedWeatherTypes.HeavySnow,
    AnimatedWeatherTypes.HeavySnowShowers,
    AnimatedWeatherTypes.Sleet,
    AnimatedWeatherTypes.SleetShowers,
  ];
  protected types = [...this.lightTypes, ...this.mediumTypes, ...this.heavyTypes];
  private flake: SVGPathElement;

  constructor(protected iconContext: HTMLElement) {
    super();
    this.initialise();
  }

  protected override getElements(): void {
    super.getElements();

    this.flake = <SVGPathElement>this.context.querySelector(`.${this.baseClass}__flake`);
    this.activationPaths = [...this.activationPaths, this.flake];
  }

  public override async renderIn(): Promise<void> {
    await super.renderIn();

    if (this.disableAnimation) {
      this.flake.classList.add(`${this.baseClass}__flake--active`);
    }
  }

  public override async renderOut(): Promise<void> {
    if (this.disableAnimation) {
      this.flake.classList.remove(`${this.baseClass}__flake--active`);
    }

    await super.renderOut();
  }
}
