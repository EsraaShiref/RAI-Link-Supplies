import { Component } from '@angular/core';

@Component({
  selector: 'app-collage-banner',
  standalone: true,
  template: `
    <section class="collage-banner-section overflow-hidden" aria-hidden="true">
      <div class="banner-image-container">
        <!-- Panoramic composite image banner using placed afterabout.jpg -->
        <img
          src="/assets/images/afterabout.jpg"
          alt=""
          class="banner-img"
          loading="lazy"
        />
      </div>
    </section>
  `,
  styles: [`
    .collage-banner-section {
      width: 100%;
      height: 140px;
      position: relative;
      background-color: #ffffff;
    }
    @media (min-width: 640px) {
      .collage-banner-section {
        height: 180px;
      }
    }
    @media (min-width: 1024px) {
      .collage-banner-section {
        height: 220px;
      }
    }
    .banner-image-container {
      width: 100%;
      height: 100%;
      position: relative;
    }
    .banner-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center center;
      display: block;
    }
  `]
})
export class CollageBannerComponent {}
