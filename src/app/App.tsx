import React, { Component } from 'react';

import { TheGame } from './the-game';
import { Language, LanguageSelector } from './language-selector';
import { isEmpty } from 'lodash';

type AppProps = {};

type AppState = {
    selectedLanguage: string;
    availableLanguages: Language[];
};

export class App extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);

        this.state = {
            selectedLanguage: '',
            availableLanguages: [{ code: 'en', name: 'English' }, { code: 'fr', name: 'Français' }],
        };
    }

    render() {
        let component = (
            <LanguageSelector
                languages={this.state.availableLanguages}
                setActiveLanguage={l => this.setState({ ...this.state, selectedLanguage: l })}
            />
        );

        if (!isEmpty(this.state.selectedLanguage)) {
            component = <TheGame language={this.state.selectedLanguage}/>;
        }

        return <div>{component}</div>;
    }
}
