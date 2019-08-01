import React, { FunctionComponent, useState } from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
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
    const totalLanguages = languages.length;
    const [hoveredLang, setHoveredLang] = useState(languages[0]);

    const scrollLanguages = (shift: number) => {
        const newIndex = languages.indexOf(hoveredLang) + shift;
        if (totalLanguages - 1 < newIndex) {
            setHoveredLang(languages[0]);
        } else if (0 > newIndex) {
            setHoveredLang(languages[totalLanguages - 1]);
        } else {
            setHoveredLang(languages[newIndex]);
        }
    }

    const classNameComputing = (element: Language) => 'option ' + (element.code === hoveredLang.code ? 'hovered' : '');

    const changeStateOnKeyEvent = (key) => {
        switch (key) {
            case 'left':
                scrollLanguages(-1);
                break;
            case 'right':
                scrollLanguages(1);
                break;
            case 'enter':
                setActiveLanguage(hoveredLang.code);
                break;
            default:
                throw new Error('LanguageSelector - This event is not managed');
        }
    };

    return <div className="LanguageSelector">
        {languages.map(lang => (
            <div key={lang.code}
                 className={classNameComputing(lang)}
                 onClick={() => setActiveLanguage(lang.code)}
                 onMouseOver={() => setHoveredLang(lang)}>
                <div>{lang.name}</div>
            </div>
        ))}
        <KeyboardEventHandler
            handleKeys={['left', 'right', 'enter']}
            onKeyEvent={(key, e) => changeStateOnKeyEvent(key)} />
    </div>
};
