/**
 * One node of the six-step "How We Work" timeline. Materialised from
 * `howWeWork.steps` in the active dictionary, so the copy stays in i18n.
 */
export interface ProcessStep {
  readonly number: string;
  readonly title: string;
  readonly body: string;
}
