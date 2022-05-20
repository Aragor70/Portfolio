export const availableLanguages = ['en-GB', 'pl'] as const;

export type Language = typeof availableLanguages[number];

export const defaultLanguage: Language = 'en-GB';
