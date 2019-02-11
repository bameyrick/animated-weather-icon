import WeatherIcon, { WeatherIconType } from './index';

const placeholder = <HTMLElement>document.querySelector('.Example');

const icon = new WeatherIcon(placeholder, WeatherIconType.Hail);

setTimeout(() => icon.Show(), 100);
