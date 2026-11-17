import type { Locale } from 'date-fns';
import { enUS, zhTW } from 'date-fns/locale';

/** getDateFnsLocale maps an i18next language code to the date-fns locale, falling back to en-US. */
export function getDateFnsLocale(language: string): Locale {
  if (language === 'zh-TW') return zhTW;
  return enUS;
}
