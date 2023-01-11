import { delay } from '@qntm-code/utils';
import { AnimatedWeatherTimes } from './weather-times';
import { AnimatedWeatherTypes } from './weather-types';

export default abstract class WeatherPartAbstract {
  protected abstract iconContext: HTMLElement;
  protected abstract baseClass: string;
  protected abstract types: AnimatedWeatherTypes[];
  protected visible: boolean;
  protected time: AnimatedWeatherTimes;
  protected activationPaths: SVGPathElement[];
  protected type: AnimatedWeatherTypes;

  protected context: SVGElement;
  private paths: SVGPathElement[];

  protected disableAnimation = false;

  public async show(type: AnimatedWeatherTypes, time: AnimatedWeatherTimes, disableAnimation: boolean): Promise<void> {
    this.disableAnimation = disableAnimation;

    if (this.disableAnimation) {
      this.context.classList.add(`${this.baseClass}--no-animation`);
    }

    if (this.types.includes(type) && !this.visible) {
      this.type = type;
      this.time = time;

      await this.renderIn();

      this.visible = true;
    }
  }

  public async hide(type: AnimatedWeatherTypes, force: boolean): Promise<void> {
    if (this.types.includes(type) && this.visible) {
      await this.renderOut(force || this.disableAnimation);

      this.visible = false;
    }

    await delay();

    this.context.classList.remove(`${this.baseClass}--no-animation`);
  }

  protected abstract getElements(): void;

  protected abstract renderIn(): Promise<void>;

  protected abstract renderOut(force: boolean): Promise<void>;

  protected initialise(): void {
    this.getContext();
    this.getPaths();
    this.setOffsets();
    this.getElements();
    this.activatePaths();
  }

  private getContext(): void {
    this.context = <SVGElement>this.iconContext.querySelector(`.${this.baseClass}`);
  }

  private getPaths(): void {
    this.paths = <SVGPathElement[]>[...(<never>this.context.querySelectorAll(`.${this.baseClass}__path`))];
  }

  private setOffsets(): void {
    this.paths.forEach(path => {
      const length = path.getTotalLength().toString();

      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
    });
  }

  private activatePaths(): void {
    this.activationPaths.forEach(path => path.classList.add('AnimatedWeatherIcon__path--active'));
  }
}
