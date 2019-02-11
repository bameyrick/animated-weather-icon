import Sun from './Sun';

const SVG = require('../icon.svg');

export enum WeatherIconType {
  Clear,
  Overcast,
  BrokenClouds,
  Cloudy,
  Fog,
  LightDrizzle,
  Drizzle,
  HeavyDrizzle,
  LightDrizzleShowers,
  DrizzleShowers,
  HeavyDrizzleShowers,
  LightRain,
  Rain,
  HeavyRain,
  LightRainShowers,
  RainShowers,
  HeavyRainShowers,
  ThunderStorm,
  ThunderStormLightRain,
  ThunderStormRain,
  ThunderStormHeavyRain,
  ThunderStormLightDrizzle,
  ThunderStormDrizzle,
  ThunderStormHeavyDrizzle,
  Hail,
  Sleet,
  LightSnow,
  Snow,
  HeavySnow,
  LightSnowShowers,
  SnowShowers,
  HeavySnowShowers,
}

export enum WeatherIconTime {
  Day,
  Night
}

const activePathClass = 'WeatherIcon__path--active';

const fullCloudTypes = [
  WeatherIconType.BrokenClouds,
  WeatherIconType.Cloudy,
  WeatherIconType.Overcast,
];

const cloudTypes = [
  WeatherIconType.LightDrizzle,
  WeatherIconType.Drizzle,
  WeatherIconType.HeavyDrizzle,
  WeatherIconType.LightDrizzleShowers,
  WeatherIconType.DrizzleShowers,
  WeatherIconType.HeavyDrizzleShowers,,
  WeatherIconType.LightRain,
  WeatherIconType.Rain,
  WeatherIconType.HeavyRain,
  WeatherIconType.LightRainShowers,
  WeatherIconType.RainShowers,
  WeatherIconType.HeavyRainShowers,
  WeatherIconType.ThunderStorm,
  WeatherIconType.ThunderStormLightRain,
  WeatherIconType.ThunderStormRain,
  WeatherIconType.ThunderStormHeavyRain,
  WeatherIconType.ThunderStormLightDrizzle,
  WeatherIconType.ThunderStormDrizzle,
  WeatherIconType.ThunderStormHeavyDrizzle,
  WeatherIconType.Hail,
  WeatherIconType.Sleet,
  WeatherIconType.LightSnow,
  WeatherIconType.Snow,
  WeatherIconType.HeavySnow,
  WeatherIconType.LightSnowShowers,
  WeatherIconType.SnowShowers,
  WeatherIconType.HeavySnowShowers
];

const allCloudTypes = [...fullCloudTypes, ...cloudTypes];

const lightRainTypes = [
  WeatherIconType.LightRain,
  WeatherIconType.LightRainShowers,
  WeatherIconType.ThunderStormLightRain
];

const rainTypes = [
  WeatherIconType.Rain,
  WeatherIconType.RainShowers,
  WeatherIconType.ThunderStormRain
];

const heavyRainTypes = [
  WeatherIconType.HeavyRain,
  WeatherIconType.HeavyRainShowers,
  WeatherIconType.ThunderStormHeavyRain
];

const allRainTypes = [
  ...lightRainTypes,
  ...rainTypes,
  ...heavyRainTypes
];

const lightDrizzleTypes = [
  WeatherIconType.LightDrizzle,
  WeatherIconType.LightDrizzleShowers,
  WeatherIconType.ThunderStormLightDrizzle
];

const drizzleTypes = [
  WeatherIconType.Drizzle,
  WeatherIconType.DrizzleShowers,
  WeatherIconType.ThunderStormDrizzle
];

const heavyDrizzleTypes = [
  WeatherIconType.HeavyDrizzle,
  WeatherIconType.HeavyDrizzleShowers,
  WeatherIconType.ThunderStormHeavyDrizzle
];

const allDrizzleTypes = [
  ...lightDrizzleTypes,
  ...drizzleTypes,
  ...heavyDrizzleTypes
];

const allMediumRainTypes = [
  ...rainTypes,
  ...drizzleTypes
];

const allHeavyRainTypes = [
  ...heavyRainTypes,
  ...heavyDrizzleTypes
];

export default class WeatherIcon {
  private icon: HTMLElement;
  private sun: Sun;
  private cloudPath: SVGPathElement;
  private rainDrops: SVGPathElement[];
  private rainClass: string;
  private lightningPath: SVGPathElement;
  private hailDrops: SVGPathElement[];

  constructor(context: HTMLElement, private type: WeatherIconType, private time: WeatherIconTime = WeatherIconTime.Day) {
    this.icon = document.createElement('div');
    this.icon.innerHTML = SVG;
    this.icon.classList.add('WeatherIcon');

    this.setOffsets();
    this.setSunPath();
    this.setCloudPath();
    this.setRainPath();
    this.setLightningPath();
    this.setHailPath();

    this.icon.classList.add('WeatherIcon--initialised');

    context.appendChild(this.icon);
  }

  private setOffsets(): void {
    const paths: SVGPathElement[] = [].slice.call(this.icon.querySelectorAll('.WeatherIcon__path'));

    paths.forEach(path => {
      const length = path.getTotalLength().toString();

      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = `-${length}`;
    });
  }

  private setSunPath(): void {
    const sunTypes = [
      WeatherIconType.BrokenClouds,
      WeatherIconType.LightSnowShowers,
      WeatherIconType.SnowShowers,
      WeatherIconType.HeavySnowShowers,
      WeatherIconType.LightDrizzleShowers,
      WeatherIconType.DrizzleShowers,
      WeatherIconType.HeavyDrizzleShowers,
      WeatherIconType.LightRainShowers,
      WeatherIconType.RainShowers,
      WeatherIconType.HeavyRainShowers,
      WeatherIconType.ThunderStormLightRain
    ];

    const allSunTypes = [WeatherIconType.Clear, ...sunTypes];

    if (allSunTypes.includes(this.type)) {
      if (this.time === WeatherIconTime.Day) {
        this.sun = new Sun(<SVGElement>this.icon.querySelector('.WeatherIcon__sun'), sunTypes.includes(this.type));
      }
    }
  }

  private setCloudPath(): void {
    let cls;

    if (fullCloudTypes.includes(this.type)) {
      cls = 'WeatherIcon__cloud-full-path';    
    } else if(cloudTypes.includes(this.type)) {
      cls = 'WeatherIcon__cloud-path';
    }

    if (cls) {
      this.cloudPath = <SVGPathElement>this.icon.querySelector(`.${cls}`);
      this.cloudPath.classList.add(activePathClass);

      switch(this.type) {
        case WeatherIconType.Cloudy:
        case WeatherIconType.Snow:
        case WeatherIconType.SnowShowers:
        case WeatherIconType.Sleet:
        case WeatherIconType.Drizzle:
        case WeatherIconType.DrizzleShowers:
        case WeatherIconType.Rain:
        case WeatherIconType.RainShowers:
        case WeatherIconType.ThunderStorm:
        case WeatherIconType.ThunderStormRain:
        case WeatherIconType.ThunderStormDrizzle:
        case WeatherIconType.Hail: {
          this.cloudPath.classList.add(`${cls}--medium`);
          break;
        }
        case WeatherIconType.Overcast:
        case WeatherIconType.HeavySnow:
        case WeatherIconType.HeavySnowShowers:
        case WeatherIconType.HeavyDrizzle:
        case WeatherIconType.HeavyDrizzleShowers:
        case WeatherIconType.HeavyRain:
        case WeatherIconType.HeavyRainShowers:
        case WeatherIconType.ThunderStormHeavyDrizzle:
        case WeatherIconType.ThunderStormHeavyRain: {
          this.cloudPath.classList.add(`${cls}--dark`);
        }
      }
    }
  }

  private setRainPath(): void {
    if (allRainTypes.includes(this.type)) {
      this.rainClass = 'Rain';
    } else if (allDrizzleTypes.includes(this.type)) {
      this.rainClass = 'Drizzle';
    }

    if (this.rainClass) {
      this.rainDrops = [].slice.call(this.icon.querySelectorAll(`.${this.rainClass}__drop`));

      this.rainDrops.forEach(drop => drop.classList.add(activePathClass));

      if (allMediumRainTypes.includes(this.type)) {
        this.rainDrops.forEach(drop => drop.classList.add(`${this.rainClass}__drop--medium`));
      } else if (allHeavyRainTypes.includes(this.type)) {
        this.rainDrops.forEach(drop => drop.classList.add(`${this.rainClass}__drop--heavy`));
      }
    }
  }

  private setLightningPath(): void {
    const lightningTypes = [
      WeatherIconType.ThunderStorm,
      WeatherIconType.ThunderStormLightRain,
      WeatherIconType.ThunderStormRain,
      WeatherIconType.ThunderStormHeavyRain,
      WeatherIconType.ThunderStormLightDrizzle,
      WeatherIconType.ThunderStormDrizzle,
      WeatherIconType.ThunderStormHeavyDrizzle
    ];

    if (lightningTypes.includes(this.type)) {
      this.lightningPath = <SVGPathElement>this.icon.querySelector('.WeatherIcon__lightning');
      this.lightningPath.classList.add(activePathClass);
    }
  }

  private setHailPath(): void {
    if (this.type === WeatherIconType.Hail) {
      this.hailDrops = [].slice.call(this.icon.querySelectorAll('.Hail__drop'));

      this.hailDrops.forEach(drop => drop.classList.add(activePathClass));
    }
  }

  public Show(): void {
    if (this.type === WeatherIconType.Clear) {
      if (this.time === WeatherIconTime.Day) {
        this.sun.Show();
      }
    } else if (allCloudTypes.includes(this.type)) {
      this.cloudPath.style.strokeDashoffset = '0';
      this.cloudPath.classList.add(`${this.cloudPath.classList[1]}--active`);
      
      setTimeout(() => {
        if (this.sun) {
          this.sun.Show(); 
        }

        if (this.rainClass) {
          this.rainDrops.forEach(drop => drop.classList.add(`${this.rainClass}__drop--animate`));
        }

        if (this.lightningPath) {
          this.lightningPath.classList.add('WeatherIcon__lightning--animate');
        }

        if (this.hailDrops) {
          this.hailDrops.forEach(drop => drop.classList.add(`Hail__drop--animate`));
        }
      }, 1500);
    }
  }
}
