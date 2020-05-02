import { LanguageActionTypes } from './language.action';
import { Language } from '../components/language-selector';

export type LanguageState = {
    availableLanguages: Language[];
    selectedLanguage: string;
};

const INITIAL_STATE: LanguageState = {
    availableLanguages: [
        { code: 'en', name: 'English' },
        { code: 'fr', name: 'Français' },
    ],
    selectedLanguage: '',
};

export const languageReducer = (state = INITIAL_STATE, action: LanguageActionTypes) => {
    switch (action.type) {
        case 'SELECT_LANGUAGE':
            return {
                ...state,
                selectedLanguage: action.payload,
            };

        default:
            return state;
    }
};
