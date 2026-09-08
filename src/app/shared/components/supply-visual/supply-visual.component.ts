import { Component } from '@angular/core';
import { Boxes, Headset, PackageCheck, LucideAngularModule, Truck } from 'lucide-angular';

/**
 * Abstract logistics/support illustration in the brand palette. It avoids stock
 * photography while still communicating supply flow, delivery, and service.
 */
@Component({
  selector: 'app-supply-visual',
  imports: [LucideAngularModule],
  host: { class: 'block max-sm:hidden', 'aria-hidden': 'true' },
  template: `
    <div class="border-border bg-bg-subtle relative overflow-hidden rounded-xl border p-6 sm:p-8">
      <span class="bg-brand-gradient absolute inset-x-0 top-0 h-[3px]" aria-hidden="true"></span>

      <div class="relative flex items-center justify-between gap-4 sm:gap-6">
        <div class="flex flex-col gap-3">
          <span class="border-border bg-surface text-text-muted inline-flex size-11 items-center justify-center rounded-xl border sm:size-12">
            <lucide-icon [img]="BoxesIcon" [size]="18" aria-hidden="true" />
          </span>
          <span class="border-border bg-surface text-text-muted inline-flex size-11 items-center justify-center rounded-xl border sm:size-12">
            <lucide-icon [img]="PackageCheckIcon" [size]="18" aria-hidden="true" />
          </span>
        </div>

        <div class="flex flex-1 flex-col items-center gap-3">
          <span class="bg-brand-gradient h-[2px] w-full rounded-full opacity-80" aria-hidden="true"></span>

          <span class="bg-brand-gradient inline-flex size-16 items-center justify-center rounded-2xl text-white shadow-lg sm:size-20">
            <lucide-icon [img]="TruckIcon" [size]="30" [strokeWidth]="1.75" aria-hidden="true" />
          </span>

          <span class="bg-brand-gradient h-[2px] w-full rounded-full opacity-80" aria-hidden="true"></span>
        </div>

        <div class="flex flex-col gap-3">
          <span class="border-border bg-surface text-text-muted inline-flex size-11 items-center justify-center rounded-xl border sm:size-12">
            <lucide-icon [img]="HeadsetIcon" [size]="18" aria-hidden="true" />
          </span>
          <span class="border-border bg-surface text-text-muted inline-flex size-11 items-center justify-center rounded-xl border sm:size-12">
            <lucide-icon [img]="BoxesIcon" [size]="18" aria-hidden="true" />
          </span>
        </div>
      </div>

      <div class="mt-7 grid grid-cols-3 gap-2">
        @for (width of railWidths; track $index) {
          <span class="bg-brand-gradient h-1 rounded-full opacity-30" [style.width.%]="width"></span>
        }
      </div>
    </div>
  `,
})
export class SupplyVisualComponent {
  protected readonly BoxesIcon = Boxes;
  protected readonly PackageCheckIcon = PackageCheck;
  protected readonly TruckIcon = Truck;
  protected readonly HeadsetIcon = Headset;
  protected readonly railWidths = [100, 72, 45];
}
