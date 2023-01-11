import { AnimatedWeatherIcon, AnimatedWeatherTimes, AnimatedWeatherTypes } from './AnimatedWeatherIcon';

import { Dictionary } from '@qntm-code/utils';
import '../scss/example.scss';

class Example {
  private icon: AnimatedWeatherIcon;
  private typesSelect: HTMLSelectElement;
  private timesSelect: HTMLSelectElement;
  private disableCheckbox: HTMLInputElement;
  private readonly sessionStorageTypeKey: string = 'weather-type';
  private readonly sessionStorageTimeKey: string = 'weather-time';
  private readonly sessionStorageDisableAnimationKey: string = 'disable-animation';

  constructor() {
    this.icon = new AnimatedWeatherIcon(<HTMLElement>document.querySelector('.js-placeholder'));
    this.typesSelect = <HTMLSelectElement>document.querySelector('.js-weather-types');
    this.timesSelect = <HTMLSelectElement>document.querySelector('.js-weather-times');
    this.disableCheckbox = <HTMLInputElement>document.querySelector('.js-disable-animation');

    this.setTypes();
    this.setTimes();

    const storedType = sessionStorage.getItem(this.sessionStorageTypeKey);

    if (storedType) {
      this.typesSelect.value = storedType;
    }

    const storedTime = sessionStorage.getItem(this.sessionStorageTimeKey);

    if (storedTime) {
      this.timesSelect.value = storedTime;
    }

    const disableAnimation = sessionStorage.getItem(this.sessionStorageDisableAnimationKey);

    if (disableAnimation) {
      this.disableCheckbox.checked = disableAnimation === 'true';
    }

    this.typesSelect.addEventListener('change', () => void this.updateIcon());
    this.timesSelect.addEventListener('change', () => void this.updateIcon());
    this.disableCheckbox.addEventListener('input', () => void this.updateIcon());

    void this.updateIcon();
  }

  private setTypes(): void {
    this.setOptions(AnimatedWeatherTypes, this.typesSelect);
  }

  private setTimes(): void {
    this.setOptions(AnimatedWeatherTimes, this.timesSelect);
  }

  private setOptions(type: typeof AnimatedWeatherTypes | typeof AnimatedWeatherTimes, select: HTMLSelectElement): void {
    const options = Object.keys(type).map(key => {
      const value = (type as unknown as Dictionary<string>)[key];
      return `<option value="${value}">${value}</option>`;
    });

    select.innerHTML = options.join('');
  }

  private async updateIcon(): Promise<void> {
    this.typesSelect.setAttribute('disabled', '');
    this.timesSelect.setAttribute('disabled', '');
    this.disableCheckbox.setAttribute('disabled', '');

    sessionStorage.setItem(this.sessionStorageTypeKey, this.typesSelect.value);
    sessionStorage.setItem(this.sessionStorageTimeKey, this.timesSelect.value);
    sessionStorage.setItem(this.sessionStorageDisableAnimationKey, this.disableCheckbox.checked ? 'true' : 'false');

    await this.icon.setType(
      <AnimatedWeatherTypes>this.typesSelect.value,
      <AnimatedWeatherTimes>this.timesSelect.value,
      this.disableCheckbox.checked
    );

    this.typesSelect.removeAttribute('disabled');
    this.timesSelect.removeAttribute('disabled');
    this.disableCheckbox.removeAttribute('disabled');
  }
}

new Example();
