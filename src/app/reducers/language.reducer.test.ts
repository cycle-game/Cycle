import { selectLanguage } from './language.action';
import { languageReducer } from './language.reducer';

describe('Language reducer', () => {
    it('provides an initial state', () => {
        expect(languageReducer(undefined, {} as any)).toEqual({
            availableLanguages: [
                { code: 'en', name: 'English' },
                { code: 'fr', name: 'Français' },
            ],
            selectedLanguage: '',
        });
    });

    it('set the languageReducer on SELECT_LANGUAGE', () => {
        expect(languageReducer(undefined, selectLanguage('fr'))).toEqual({
            availableLanguages: [
                { code: 'en', name: 'English' },
                { code: 'fr', name: 'Français' },
            ],
            selectedLanguage: 'fr',
        });
    });
});
