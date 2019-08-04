import { fr } from './fr';
import { en } from './en';
import i18next from 'i18next';

export type SupportedLocale = 'fr' | 'en';

class I18nService {
    constructor() {
        i18next.init({
            lng: 'en',
            fallbackLng: 'en',
            resources: {
                en: {
                    translation: en,
                },
                fr: {
                    translation: fr,
                },
            },
        });
    }

    setLanguage(locale: SupportedLocale) {
        return i18next.changeLanguage(locale);
    }

    translate(key: string) {
        return i18next.t(key);
    }
}

export const i18nService = new I18nService();
