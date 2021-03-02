import { AnimatedWeatherTypes } from './weather-types';
import { AnimatedWeatherTimes } from './weather-times';

export default class WeatherPartAbstract {
  protected baseClass: string;
  protected types: AnimatedWeatherTypes[];
  protected visible: boolean;
  protected time: AnimatedWeatherTimes;
  protected activationPaths: SVGPathElement[];
  protected type: AnimatedWeatherTypes;

  protected context: SVGElement;
  private paths: SVGPathElement[];

  constructor(private iconContext: HTMLElement) {
    setTimeout(this.initialise.bind(this));
  }

  public async show(type: AnimatedWeatherTypes, time: AnimatedWeatherTimes): Promise<void> {
    if (this.types.includes(type) && !this.visible) {
      this.type = type;
      this.time = time;

      await this.renderIn();

      this.visible = true;
    }
  }

  public async hide(type: AnimatedWeatherTypes): Promise<void> {
    if (this.types.includes(type) && this.visible) {
      await this.renderOut();

      this.visible = false;
    }
  }

  protected getElements(): void {}

  protected async renderIn(): Promise<void> {}

  protected async renderOut(): Promise<void> {}

  private initialise(): void {
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
    this.paths = <SVGPathElement[]>[...(<any>this.context.querySelectorAll(`.${this.baseClass}__path`))];
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
