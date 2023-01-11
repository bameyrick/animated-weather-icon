# Animated Weather Icon

Demo: <https://animated-weather-icon.netlify.com/>

[![GitHub release](https://img.shields.io/github/release/bameyrick/animated-weather-icon.svg)](https://github.com/bameyrick/animated-weather-icon/releases)
[![Travis tests](https://img.shields.io/travis/bameyrick/animated-weather-icon.svg)](https://travis-ci.com/bameyrick/animated-weather-icon)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/6a28e8cbf2ce44049ad20da76b1f68e3)](https://www.codacy.com/app/bameyrick/animated-weather-icon)
[![GitHub issues](https://img.shields.io/github/issues/bameyrick/animated-weather-icon)](https://github.com/bameyrick/animated-weather-icon/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr-raw/bameyrick/animated-weather-icon.svg)](https://github.com/bameyrick/animated-weather-icon/pulls)
[![Github last commit](https://img.shields.io/github/last-commit/bameyrick/animated-weather-icon.svg)](https://github.com/bameyrick/animated-weather-icon/commits)

## Install

You can install via npm or yarn.

### npm

```bash
npm install --save animated-weather-icon
```

### yarn

```bash
yarn add animated-weather-icon
```

## Usage

### Importing

You can import using ES6 imports.

```javascript
import { AnimatedWeatherIcon } from 'animated-weather-icon';
```

### Initialisation

To use the animated weather icon, you must create a new instance of the icon and provide it with a render target.

```javascript
import { AnimatedWeatherIcon } from 'animated-weather-icon';

const renderTarget = document.querySelector('.my-render-target');

const icon = new AnimatedWeatherIcon(renderTarget);
```

### Displaying a weather type

To display a weather type you must call `setType` on your icon instance.

The `setType` method takes three arguments `type`, and **optionally** `time` and `disableAnimations`. It returns a Promise that resolves when the icon finished animating in.

If using TypeScript you can import enums for the `type` and `time` and pass them as arguments like so:

```typescript
import { AnimatedWeatherIcon, AnimatedWeatherTypes, AnimatedWeatherTimes } from 'animated-weather-icon';

const icon = new AnimatedWeatherIcon(renderTarget);

icon.setType(AnimatedWeatherTypes.Clear, AnimatedWeatherTimes.Day);
```

#### AnimatedWeatherTypes

| TypeScript enum            | Vanilla JS string               |
| -------------------------- | ------------------------------- |
| `Clear`                    | `'Clear'`                       |
| `Overcast`                 | `'Overcast'`                    |
| `BrokenClouds`             | `'Broken Clouds'`               |
| `Cloudy`                   | `'Cloudy'`                      |
| `Fog`                      | `'Fog'`                         |
| `LightDrizzle`             | `'Light Drizzle'`               |
| `Drizzle`                  | `'Drizzle'`                     |
| `HeavyDrizzle`             | `'Heavy Drizzle'`               |
| `LightDrizzleShowers`      | `'Light Drizzle Showers'`       |
| `DrizzleShowers`           | `'Drizzle Showers'`             |
| `HeavyDrizzleShowers`      | `'Heavy Drizzle Showers'`       |
| `LightRain`                | `'Light Rain'`                  |
| `Rain`                     | `'Rain'`                        |
| `HeavyRain`                | `'Heavy Rain'`                  |
| `LightRainShowers`         | `'Light Rain Showers'`          |
| `RainShowers`              | `'Rain Showers'`                |
| `HeavyRainShowers`         | `'Heavy Rain Showers'`          |
| `ThunderStorm`             | `'Thunder Storm'`               |
| `ThunderStormLightRain`    | `'Thunder Storm Light Rain'`    |
| `ThunderStormRain`         | `'Thunder Storm Rain'`          |
| `ThunderStormHeavyRain`    | `'Thunder Storm Heavy Rain'`    |
| `ThunderStormLightDrizzle` | `'Thunder Storm Light Drizzle'` |
| `ThunderStormDrizzle`      | `'Thunder Storm Drizzle'`       |
| `ThunderStormHeavyDrizzle` | `'Thunder Storm Heavy Drizzle'` |
| `Hail`                     | `'Hail'`                        |
| `Sleet`                    | `'Sleet'`                       |
| `SleetShowers`             | `'Sleet Showers'`               |
| `LightSnow`                | `'Light Snow'`                  |
| `Snow`                     | `'Snow'`                        |
| `HeavySnow`                | `'Heavy Snow'`                  |
| `LightSnowShowers`         | `'Light Snow Showers'`          |
| `SnowShowers`              | `'Snow Showers'`                |
| `HeavySnowShowers`         | `'Heavy Snow Showers'`          |

#### AnimatedWeatherTimes

| TypeScript enum | Vanilla JS string |
| --------------- | ----------------- |
| `Day`           | `'Day'`           |
| `Night`         | `'Night'`         |

### Hiding the weather icon

To display a hide then weather icon you need to call `unsetIcon` on your icon instance.

The `unsetIcon` method returns a Promise that resolves when the icon finished animating out.

In this example we will wrap our calls in an async function so we can use await on the promise instances that `setType` and `unsetIcon` return. We can use this to wait for the `setType` animation to finish, wait for 2 seconds, and then hide the icon using `unsetIcon`.

```typescript
import { AnimatedWeatherIcon, AnimatedWeatherTypes, AnimatedWeatherTimes } from 'animated-weather-icon';

async function myFunction() {
  const icon = new AnimatedWeatherIcon(renderTarget);

  await icon.setType(AnimatedWeatherTypes.Clear, AnimatedWeatherTimes.Day);

  setTimeout(async () => {
    await icon.unsetIcon();

    // do something
  }, 2000);
}

myFunction();
```

### Changing the weather icon after one has been set

You can change the weather type after it has been set, as if the icon knows it already has a different icon set, it will call `unsetIcon` for you.

```typescript
import { AnimatedWeatherIcon, AnimatedWeatherTypes, AnimatedWeatherTimes } from 'animated-weather-icon';

async function myFunction() {
  const icon = new AnimatedWeatherIcon(renderTarget);

  await icon.setType(AnimatedWeatherTypes.Clear, AnimatedWeatherTimes.Day);

  setTimeout(() => {
    icon.setType(AnimatedWeatherTypes.Overcast, AnimatedWeatherTimes.Day);
  }, 2000);
}

myFunction();
```

### Forcing icons to remove immediately

The `unsetIcon` method has an optional `force` argument that you can pass to force the icon to hide immediately without animating out.

```typescript
import { AnimatedWeatherIcon, AnimatedWeatherTypes, AnimatedWeatherTimes } from 'animated-weather-icon';

async function myFunction() {
  const icon = new AnimatedWeatherIcon(renderTarget);

  await icon.setType(AnimatedWeatherTypes.Clear, AnimatedWeatherTimes.Day);

  setTimeout(() => {
    void icon.unsetIcon(true);

    // do something
  }, 2000);
}

myFunction();
```

### Disabling animations

You can disable animations by passing `true` as the third argument to `setType`.

```typescript
import { AnimatedWeatherIcon, AnimatedWeatherTypes, AnimatedWeatherTimes } from 'animated-weather-icon';

async function myFunction() {
  const icon = new AnimatedWeatherIcon(renderTarget);

  await icon.setType(AnimatedWeatherTypes.Clear, AnimatedWeatherTimes.Day, true);

  // do something
}
```
