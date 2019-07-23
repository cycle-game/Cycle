import React, { FunctionComponent } from 'react';
import { SupportedLocale } from '../../i18n/I18nService';

export type Language = {
    /** Language name to display */
    name: string;
    /** Language code */
    code: SupportedLocale;
};

export type LanguageSelectorProps = {
    /** Available languages */
    languages: Language[];
    /** Select language handler */
    setActiveLanguage: (language: SupportedLocale) => void;
};

/**
 * Language selector
 */
export const LanguageSelector: FunctionComponent<LanguageSelectorProps> = ({ languages, setActiveLanguage }) => (
    <ul className="selector">
        {languages.map(lang => (
            <li key={lang.code}>
                <button onClick={() => setActiveLanguage(lang.code)}>{lang.name}</button>
            </li>
        ))}
    </ul>
);
