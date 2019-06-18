import WeatherIcon from './WeatherIcon';
import { WeatherTypes } from './WeatherIcon/weather-types';
import { WeatherTimes } from './WeatherIcon/weather-times';

class Example {
  private icon: WeatherIcon;
  private typesSelect: HTMLSelectElement;
  private timesSelect: HTMLSelectElement;


  constructor() {
    this.icon = new WeatherIcon(<HTMLElement>document.querySelector('.js-placeholder'));
    this.typesSelect = <HTMLSelectElement>document.querySelector('.js-weather-types');
    this.timesSelect = <HTMLSelectElement>document.querySelector('.js-weather-times');

    this.setTypes();
    this.setTimes();

    this.typesSelect.addEventListener('change', this.updateIcon.bind(this));
    this.timesSelect.addEventListener('change', this.updateIcon.bind(this));

    setTimeout(this.updateIcon.bind(this), 10);
  }

  private setTypes(): void {
    this.setOptions(WeatherTypes, this.typesSelect);
  }

  private setTimes(): void {
    this.setOptions(WeatherTimes, this.timesSelect);
  }

  private setOptions(type: typeof WeatherTypes | typeof WeatherTimes, select: HTMLSelectElement): void {
    const options = Object.keys(type).map(key => `<option value=${key}>${type[key]}</option>`);

    select.innerHTML = options.join('');
  }

  private async updateIcon(): Promise<void> {
    this.typesSelect.setAttribute('disabled', '');
    this.timesSelect.setAttribute('disabled', '');

    await this.icon.setType(<WeatherTypes>this.typesSelect.value, <WeatherTimes>this.timesSelect.value);
  
    this.typesSelect.removeAttribute('disabled');
    this.timesSelect.removeAttribute('disabled');
  }
}

new Example();
