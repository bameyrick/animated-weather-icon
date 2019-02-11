export default class Sun {
  private circle: SVGPathElement;
  private raysContainer: SVGElement;
  private rays: SVGPathElement[];

  constructor(private context: SVGElement, small: boolean) {
    this.circle = <SVGPathElement>this.context.querySelector('.Sun__circle');
    this.raysContainer = <SVGElement>this.context.querySelector('.Sun__rays');
    this.rays = [].slice.call(this.context.querySelectorAll('.Sun__ray'));

    if (small) {
      this.context.classList.add('Sun--small');
    }

    [this.circle, ...this.rays].forEach(path => path.classList.add('WeatherIcon__path--active'));
  }

  public Show(): void {
    this.circle.classList.add('Sun__circle--active');
    this.raysContainer.classList.add('Sun__rays--animate');

    setTimeout(() => {
      this.rays.forEach((ray, index) => {
        setTimeout(() => {
          ray.classList.add('Sun__ray--active');
        }, 100 * index);
      });

      setTimeout(() => {
        this.rays.forEach(ray => {
          ray.classList.add('Sun__ray--animate');
        });
      }, 1100);
    }, 500);
  }

  // private Hide(): void {
  //   this.rays.forEach(ray => {
  //     ray.classList.remove('Sun__ray--animate');
  //   });

  //   setTimeout(() => {
  //     this.rays.reverse().forEach((ray, index) => {
  //       setTimeout(() => {
  //         ray.classList.remove('Sun__ray--active');
  //       }, 100 * index);
  //     });

  //     setTimeout(() => {
  //       this.circle.classList.remove('Sun__circle--active');
  //       this.raysContainer.classList.remove('Sun__rays--animate');
  //     }, 1100);
  //   }, 500);
  // }
}
