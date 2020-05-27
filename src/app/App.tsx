import React from 'react';
import { useSelector } from 'react-redux';

import { Home } from './home';
import { SelectLanguage } from './containers';
import { LanguageState } from './reducers';
import { isEmpty } from 'lodash';
import './App.scss';

export const App = () => {
    const selectedLanguage = useSelector((state: { language: LanguageState }) => state.language.selectedLanguage);

    let component = <SelectLanguage />;
    if (!isEmpty(selectedLanguage)) {
        component = <Home />;
    }

    return component;
};
