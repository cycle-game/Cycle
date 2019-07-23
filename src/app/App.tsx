import React, { Component } from 'react';

import { TheGame } from './the-game';
import { Language, LanguageSelector } from './language-selector';
import { isEmpty } from 'lodash';
import { i18nService, SupportedLocale } from '../i18n/I18nService';

type AppProps = {};

type AppState = {
    selectedLanguage: string;
    availableLanguages: Language[];
};

export class App extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);

        i18nService.init();

        this.state = {
            selectedLanguage: '',
            availableLanguages: [{ code: 'en', name: 'English' }, { code: 'fr', name: 'Français' }],
        };
    }

    setActiveLanguage(language: SupportedLocale) {
        this.setState({ ...this.state, selectedLanguage: language });
        return i18nService.setLanguage(language);
    }

    render() {
        let component = (
            <LanguageSelector
                languages={this.state.availableLanguages}
                setActiveLanguage={l => this.setActiveLanguage(l)}
            />
        );

        if (!isEmpty(this.state.selectedLanguage)) {
            component = <TheGame />;
        }

        return <div>{component}</div>;
    }
}
