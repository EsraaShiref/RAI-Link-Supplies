import { Component } from '@angular/core';

@Component({
  selector: 'app-collage-banner',
  standalone: true,
  template: `
    <section class="relative py-12 md:py-16 bg-navy overflow-hidden" aria-hidden="true">
      <!-- Background pattern overlay -->
      <div class="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="collage-grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="15" cy="15" r="1.5" fill="#FFFFFF" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#collage-grid)" />
        </svg>
      </div>

      <div class="container mx-auto px-4 max-w-7xl relative z-10">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 items-center">
          
          <!-- Collage Tile 1: Warehouse & Shelving Supply -->
          <div class="group relative rounded-xl overflow-hidden bg-white/5 border border-white/10 p-5 text-center transition-all duration-300 hover:border-orange hover:bg-white/10">
            <div class="w-12 h-12 mx-auto rounded-lg bg-orange/20 text-orange flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">
              🏬
            </div>
            <div class="text-xs uppercase font-bold tracking-wider text-white/70">
              Warehouse & Facilities
            </div>
          </div>

          <!-- Collage Tile 2: IT & Technology Equipment -->
          <div class="group relative rounded-xl overflow-hidden bg-white/5 border border-white/10 p-5 text-center transition-all duration-300 hover:border-orange hover:bg-white/10">
            <div class="w-12 h-12 mx-auto rounded-lg bg-orange/20 text-orange flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">
              💻
            </div>
            <div class="text-xs uppercase font-bold tracking-wider text-white/70">
              IT, Devices & Networks
            </div>
          </div>

          <!-- Collage Tile 3: Office & Workplace Staging -->
          <div class="group relative rounded-xl overflow-hidden bg-white/5 border border-white/10 p-5 text-center transition-all duration-300 hover:border-orange hover:bg-white/10">
            <div class="w-12 h-12 mx-auto rounded-lg bg-orange/20 text-orange flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">
              📋
            </div>
            <div class="text-xs uppercase font-bold tracking-wider text-white/70">
              Office & Paper Consumables
            </div>
          </div>

          <!-- Collage Tile 4: Delivery & Handoff Logistics -->
          <div class="group relative rounded-xl overflow-hidden bg-white/5 border border-white/10 p-5 text-center transition-all duration-300 hover:border-orange hover:bg-white/10">
            <div class="w-12 h-12 mx-auto rounded-lg bg-orange/20 text-orange flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">
              🚚
            </div>
            <div class="text-xs uppercase font-bold tracking-wider text-white/70">
              Timely Coordinated Logistics
            </div>
          </div>

        </div>
      </div>
    </section>
  `
})
export class CollageBannerComponent {}
