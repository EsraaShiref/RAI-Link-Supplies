/**
 * A "01 / 02 / 03" block used by Goals, Who We Serve and the process timeline.
 * `title` is optional because Goals has numbers and bodies only.
 */
export interface NumberedItem {
  readonly number: string;
  readonly title?: string;
  readonly body: string;
}
