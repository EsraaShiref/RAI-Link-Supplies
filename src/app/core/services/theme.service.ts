import { DOCUMENT } from '@angular/common';
import { computed, effect, inject, Injectable, signal } from '@angular/core';

import { DEFAULT_THEME, isAppTheme, type AppTheme } from '../models';

const THEME_STORAGE_KEY = 'rai-theme';

/** Browser chrome colour, kept in step with the active theme. */
const THEME_COLORS: Record<AppTheme, string> = {
  light: '#0A1C44',
  dark: '#0B1220',
};

/**
 * Colour-scheme store.
 *
 * Light is the default; the OS preference is ignored unless the visitor has
 * explicitly chosen a theme. The same resolution runs in the
 * pre-paint script in `index.html`, so the first paint already matches and the
 * effect below is a no-op on load rather than a visible repaint.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);

  readonly currentTheme = signal<AppTheme>(resolveInitialTheme());

  readonly isDark = computed(() => this.currentTheme() === 'dark');

  constructor() {
    effect(() => {
      const theme = this.currentTheme();
      const root = this.document.documentElement;

      root.classList.toggle('dark', theme === 'dark');

      this.document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute('content', THEME_COLORS[theme]);
    });
  }

  setTheme(theme: AppTheme): void {
    if (theme === this.currentTheme()) {
      return;
    }
    this.currentTheme.set(theme);
    persistTheme(theme);
  }

  toggle(): void {
    this.setTheme(this.currentTheme() === 'dark' ? 'light' : 'dark');
  }
}

function resolveInitialTheme(): AppTheme {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (isAppTheme(stored)) {
      return stored;
    }
  } catch {
    return DEFAULT_THEME;
  }

  return DEFAULT_THEME;
}

function persistTheme(theme: AppTheme): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    /* storage unavailable — theme still applies for this session */
  }
}
