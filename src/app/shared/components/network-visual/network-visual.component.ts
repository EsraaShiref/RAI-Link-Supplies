import { Component } from '@angular/core';
import { Boxes, Building2, Cpu, LucideAngularModule, Network, Truck, Users } from 'lucide-angular';

/**
 * Abstract "supplier network → RAI → client" diagram used as the supporting
 * visual on Home, About and Partners.
 *
 * Built from brand geometry and icons rather than photography: no stock imagery
 * has been licensed for this project, and generated placeholders would be worse
 * than an honest diagram. It is also weightless (no raster payload), theme-aware
 * and mirrors correctly in RTL because the layout is flex + logical properties.
 *
 * Decorative — hidden from assistive tech; nothing here carries information that
 * is not already in the surrounding copy.
 */
@Component({
  selector: 'app-network-visual',
  imports: [LucideAngularModule],
  host: { class: 'block', 'aria-hidden': 'true' },
  template: `
    <div
      class="border-border bg-bg-subtle relative overflow-hidden rounded-xl border p-6 sm:p-8"
    >
      <span
        class="bg-brand-gradient absolute inset-x-0 top-0 h-[3px]"
        aria-hidden="true"
      ></span>

      <div class="flex items-center justify-between gap-3 sm:gap-5">
        <!-- Supplier network -->
        <div class="flex flex-col gap-3">
          @for (icon of supplierIcons; track $index) {
            <span
              class="border-border bg-surface text-text-muted inline-flex size-11 items-center justify-center rounded-xl border sm:size-12"
            >
              <lucide-icon [img]="icon" [size]="18" aria-hidden="true" />
            </span>
          }
        </div>

        <span class="bg-brand-gradient h-[2px] flex-1 rounded-full" aria-hidden="true"></span>

        <!-- Hub -->
        <span
          class="bg-brand-gradient inline-flex size-16 shrink-0 items-center justify-center rounded-xl text-white shadow-lg sm:size-20"
        >
          <lucide-icon [img]="NetworkIcon" [size]="28" [strokeWidth]="1.75" aria-hidden="true" />
        </span>

        <span class="bg-brand-gradient h-[2px] flex-1 rounded-full" aria-hidden="true"></span>

        <!-- Clients served -->
        <div class="flex flex-col gap-3">
          @for (icon of clientIcons; track $index) {
            <span
              class="border-border bg-surface text-text-muted inline-flex size-11 items-center justify-center rounded-xl border sm:size-12"
            >
              <lucide-icon [img]="icon" [size]="18" aria-hidden="true" />
            </span>
          }
        </div>
      </div>

      <div class="mt-7 grid grid-cols-3 gap-2">
        @for (width of railWidths; track $index) {
          <span
            class="bg-brand-gradient h-1 rounded-full opacity-30"
            [style.width.%]="width"
          ></span>
        }
      </div>
    </div>
  `,
})
export class NetworkVisualComponent {
  protected readonly NetworkIcon = Network;
  protected readonly supplierIcons = [Boxes, Truck, Cpu];
  protected readonly clientIcons = [Building2, Users, Boxes];
  protected readonly railWidths = [100, 72, 45];
}
