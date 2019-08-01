import React, { FunctionComponent } from 'react';
import { SupportedLocale } from '../../../i18n/I18nService';
import './LanguageSelector.scss';

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
    <div className="LanguageSelector">
        {languages.map(lang => (
            <div key={lang.code} className="option" onClick={() => setActiveLanguage(lang.code)}>
                <div> {lang.name}</div>
            </div>
        ))}
    </div>
);
