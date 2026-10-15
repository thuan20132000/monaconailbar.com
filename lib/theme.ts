export const SEASON_THEMES = ['default', 'autumn', 'summer', 'winter', 'spring'] as const

export type SeasonTheme = (typeof SEASON_THEMES)[number]

const KNOWN_THEMES = new Set<string>(SEASON_THEMES)

/** Unknown, missing, or unpublished settings use the black-and-gold palette. */
export function resolveTheme(value: string | null | undefined): SeasonTheme {
  if (value && KNOWN_THEMES.has(value)) return value as SeasonTheme
  return 'default'
}
