import React, { FunctionComponent } from 'react';

export type Language = {
    /** Language name to display */
    name: string;
    /** Language code */
    code: string;
};

export type LanguageSelectorProps = {
    /** Available languages */
    languages: Language[];
    /** Select language handler */
    setActiveLanguage: Function;
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
