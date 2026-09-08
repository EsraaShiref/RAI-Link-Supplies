/** A primary navigation entry, shared by the header and the footer. */
export interface NavItem {
  /** Router path, absolute from the app root. */
  readonly path: string;
  /** Key under `nav.*`. */
  readonly labelKey: string;
}
