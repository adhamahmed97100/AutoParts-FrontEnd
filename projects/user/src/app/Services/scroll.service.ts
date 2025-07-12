import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  private animationFrameId: number | null = null;
  private isScrolling = false;

  constructor() {
    window.addEventListener('wheel', this.stopScroll.bind(this), {
      passive: true,
    });
    window.addEventListener('touchstart', this.stopScroll.bind(this), {
      passive: true,
    });
    window.addEventListener('keydown', this.stopScroll.bind(this), {
      passive: true,
    });
  }

  smoothScroll(duration: number = 1000) {
    this.stopScroll();

    const start = window.pageYOffset;
    const startTime =
      'now' in window.performance ? performance.now() : new Date().getTime();

    const scroll = () => {
      const now =
        'now' in window.performance ? performance.now() : new Date().getTime();
      const time = Math.min(1, (now - startTime) / duration);
      const timeFunction = (t: number): number => t * (2 - t); // easeOutQuad
      window.scrollTo(0, Math.ceil(timeFunction(time) * (0 - start) + start));

      if (time < 1 && this.animationFrameId !== null) {
        this.animationFrameId = requestAnimationFrame(scroll);
      } else {
        this.animationFrameId = null;
        this.isScrolling = false;
      }
    };

    this.isScrolling = true;
    this.animationFrameId = requestAnimationFrame(scroll);
  }

  stopScroll() {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
      this.isScrolling = false;
    }
  }
}
