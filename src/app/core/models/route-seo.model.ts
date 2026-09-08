/**
 * Per-route SEO metadata attached via `Route.data`. Values are translation keys
 * rather than literal copy, so titles and descriptions re-render on language
 * change and no marketing copy lives outside the dictionaries (spec 5).
 */
export interface RouteSeoData {
  /** Key under `nav.*` used as the page title. */
  readonly titleKey: string;
  /** Keys whose resolved strings are joined to form the meta description. */
  readonly descriptionKeys: readonly string[];
  /** Home uses `brand.name — brand.tagline` instead of `page | brand`. */
  readonly rootTitle?: boolean;
}
