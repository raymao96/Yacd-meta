import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

const allLocales = {
  zh_tw: import('~/i18n/zh-tw'),
  en: import('~/i18n/en'),
};

type BackendRequestCallback = (err: null, result: { status: number; data: any }) => void;

i18next
  .use(HttpBackend)
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    debug: import.meta.env.DEV,
    // resources,
    backend: {
      loadPath: '/__{{lng}}/{{ns}}.json',
      request: function (
        _options: any,
        url: string,
        _payload: any,
        callback: BackendRequestCallback,
      ) {
        let p: PromiseLike<{ data: any }>;

        switch (url) {
          case '/__zh-TW/translation.json':
            p = allLocales.zh_tw;
            break;
          case '/__en/translation.json':
            p = allLocales.en;
            break;
          default:
            p = allLocales.en;
            break;
        }

        if (p) {
          p.then((mod) => {
            callback(null, { status: 200, data: mod.data });
          });
        }
      },
    },
    supportedLngs: ['zh-TW', 'en'],
    load: 'currentOnly',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

if (import.meta.env.DEV) {
  window.i18n = i18next;
}

export default i18next;
