import { SupportedLocale } from '../../i18n/I18nService';

export const SELECT_LANGUAGE = 'SELECT_LANGUAGE';

export type SelectLanguageAction = {
    type: typeof SELECT_LANGUAGE;
    payload: SupportedLocale;
};

export type LanguageActionTypes = SelectLanguageAction;

export function selectLanguage(language: SupportedLocale): SelectLanguageAction {
    return {
        type: SELECT_LANGUAGE,
        payload: language,
    };
}
