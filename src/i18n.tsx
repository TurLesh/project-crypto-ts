import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

// import enTranslation from './data/locales/en/translation';
// import plTranslation from './data/locales/pl/translation';
// import ruTranslation from './data/locales/ru/translation';
// import uaTranslation from './data/locales/ua/translation';

i18n.use(initReactI18next)
    .use(LanguageDetector)
    .use(HttpApi)
    .init({
        // resources: {
        //     en: {
        //         translation: enTranslation
        //     },
        //     ua: {
        //         translation: uaTranslation
        //     },
        //     pl: {
        //         translation: plTranslation
        //     },
        //     ru: {
        //         translation: ruTranslation
        //     }
        // },
        detection: {
            order: ['path', 'localStorage', 'navigator'],
            caches: ['localStorage']
        },
        backend: {
            loadPath: '/locales/{{lng}}/translation.json'
        },
        react: {
            useSuspense: false
        },
        supportedLngs: ['en', 'pl', 'ua', 'ru'],
        fallbackLng: 'en'
    });

export default i18n;
