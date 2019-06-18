import { WeatherTypes } from "./weather-types";
import { WeatherTimes } from "./weather-times";

export default class WeatherPartAbstract {
  protected baseClass: string;
  protected type: WeatherTypes;
  protected visible: boolean;
  protected time: WeatherTimes;
  protected activationPaths: SVGPathElement[];

  protected context: SVGElement;
  private paths: SVGPathElement[];

  constructor(private iconContext: HTMLElement) {
    setTimeout(this.initialise.bind(this));
  }

  public show(type: WeatherTypes, time: WeatherTimes): Promise<void> {
    return new Promise(async resolve => {
      if (type === this.type && !this.visible) {
        this.time = time;

        await this.renderIn();

        this.visible = true;

        resolve();
      } else {
        resolve();
      }
    });
  }

  public hide(type: WeatherTypes): Promise<void> {
    return new Promise(async resolve => {
      if (type === this.type && this.visible) {
        await this.renderOut();

        this.visible = false;

        resolve();
      } else {
        resolve();
      }
    });
  }

  protected getElements(): void {}

  protected renderIn(): Promise<void> {
    return new Promise(resolve => resolve);
  }

  protected renderOut(): Promise<void> {
    return new Promise(resolve => resolve);
  }

  private initialise(): void  {
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
    this.paths = <SVGPathElement[]>[...<any>this.context.querySelectorAll(`.${this.baseClass}__path`)];
  } 

  private setOffsets(): void {
    this.paths.forEach(path => {
      const length = path.getTotalLength().toString();

      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = `-${length}`;
    });
  }

  private activatePaths(): void {
    this.activationPaths.forEach(path => path.classList.add('WeatherIcon__path--active'));
  }
}
