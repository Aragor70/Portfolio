export const availableLanguages = ['en-GB'] as const;

export type Language = typeof availableLanguages[number];

export const defaultLanguage: Language = 'en-GB';
