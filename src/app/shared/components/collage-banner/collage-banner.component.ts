import { Component } from '@angular/core';

@Component({
  selector: 'app-collage-banner',
  standalone: true,
  template: `
    <section class="collage-banner-section overflow-hidden" aria-hidden="true">
      <div class="banner-image-container">
        <!-- Panoramic composite image banner -->
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80"
          alt=""
          class="banner-img"
          loading="lazy"
        />
        <!-- Subtle dark navy overlay to match brand tone -->
        <div class="banner-overlay"></div>
      </div>
    </section>
  `,
  styles: [`
    .collage-banner-section {
      width: 100%;
      height: 180px;
      position: relative;
    }
    @media (min-width: 768px) {
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
      object-position: center 40%;
      display: block;
    }
    .banner-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        to bottom,
        rgba(11, 12, 78, 0.4) 0%,
        rgba(11, 12, 78, 0.25) 50%,
        rgba(11, 12, 78, 0.45) 100%
      );
      pointer-events: none;
    }
  `]
})
export class CollageBannerComponent {}
