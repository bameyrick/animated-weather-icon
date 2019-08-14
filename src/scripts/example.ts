import { AnimatedWeatherIcon, AnimatedWeatherTypes, AnimatedWeatherTimes } from './AnimatedWeatherIcon';

import '../scss/example.scss';

class Example {
  private icon: AnimatedWeatherIcon;
  private typesSelect: HTMLSelectElement;
  private timesSelect: HTMLSelectElement;

  constructor() {
    this.icon = new AnimatedWeatherIcon(<HTMLElement>document.querySelector('.js-placeholder'));
    this.typesSelect = <HTMLSelectElement>document.querySelector('.js-weather-types');
    this.timesSelect = <HTMLSelectElement>document.querySelector('.js-weather-times');

    this.setTypes();
    this.setTimes();

    this.typesSelect.addEventListener('change', this.updateIcon.bind(this));
    this.timesSelect.addEventListener('change', this.updateIcon.bind(this));

    setTimeout(this.updateIcon.bind(this), 10);
  }

  private setTypes(): void {
    this.setOptions(AnimatedWeatherTypes, this.typesSelect);
  }

  private setTimes(): void {
    this.setOptions(AnimatedWeatherTimes, this.timesSelect);
  }

  private setOptions(type: typeof AnimatedWeatherTypes | typeof AnimatedWeatherTimes, select: HTMLSelectElement): void {
    const options = Object.keys(type).map(key => `<option value="${type[key]}">${type[key]}</option>`);

    select.innerHTML = options.join('');
  }

  private async updateIcon(): Promise<void> {
    this.typesSelect.setAttribute('disabled', '');
    this.timesSelect.setAttribute('disabled', '');

    await this.icon.unsetIcon();
    await this.icon.setType(<AnimatedWeatherTypes>this.typesSelect.value, <AnimatedWeatherTimes>this.timesSelect.value);

    this.typesSelect.removeAttribute('disabled');
    this.timesSelect.removeAttribute('disabled');
  }
}

new Example();
