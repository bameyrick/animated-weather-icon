import { WeatherTypes } from './weather-types';
import { WeatherTimes } from './weather-times';
import Sun from './sun';

const SVG = require('../../icon.svg');

export default class WeatherIcon {
  private icon: HTMLElement;
  private sun: Sun;

  constructor(private context: HTMLElement) {
    this.initialiseIcon();
  }

  private initialiseIcon(): void {
    this.icon = document.createElement('div');
    this.icon.classList.add('WeatherIcon');
    this.icon.innerHTML = SVG;

    this.context.appendChild(this.icon);

    this.sun = new Sun(this.context);
  }

  public setType(type: WeatherTypes, time: WeatherTimes = WeatherTimes.Day): Promise<void> {
    return new Promise(resolve => {

      this.sun.setType(type, time);
      resolve();
    });
  }
}
