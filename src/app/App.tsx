import React from 'react';
import { useSelector } from 'react-redux';

import { TheGame } from './the-game';
import { SelectLanguage } from './containers';
import { isEmpty } from 'lodash';
import { i18nService } from '../i18n/I18nService';
import './App.scss';

export const App = () => {
    i18nService.init();

    const selectedLanguage = useSelector(state => state.language.selectedLanguage);

    let component = <SelectLanguage />;
    if (!isEmpty(selectedLanguage)) {
        component = <TheGame />;
    }

    return component;
};
