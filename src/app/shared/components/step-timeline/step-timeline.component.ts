import { Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ProcessStep } from '../../../core/models/process-step.model';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-step-timeline',
  standalone: true,
  imports: [TranslatePipe, RevealOnScrollDirective],
  templateUrl: './step-timeline.component.html',
  styleUrls: ['./step-timeline.component.scss']
})
export class StepTimelineComponent {
  steps = input.required<ProcessStep[]>();
}
