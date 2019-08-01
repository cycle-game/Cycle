import React, { FunctionComponent, useState } from 'react';
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
export const LanguageSelector: FunctionComponent<LanguageSelectorProps> = ({ languages, setActiveLanguage }) => {
    const [hoveredLang, setHoveredLang] = useState(languages[0]);

    const classNameComputing = (element: Language) => 'option ' + (element.code === hoveredLang.code ? 'hovered' : '');

    return <div className="LanguageSelector" onClick={() => setActiveLanguage(hoveredLang.code)}>
        {languages.map(lang => (
            <div key={lang.code} className={classNameComputing(lang)} onMouseOver={() => setHoveredLang(lang)}>
                <div>{lang.name}</div>
            </div>
        ))}
    </div>
};
