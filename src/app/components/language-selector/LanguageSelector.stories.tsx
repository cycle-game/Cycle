import { action } from '@storybook/addon-actions';
import React from 'react';

import { Language, LanguageSelector } from './LanguageSelector';

export default {
    title: 'Language Selector',
};

const languages: Language[] = [{ code: 'en', name: 'English' }, { code: 'fr', name: 'Français' }];

export const Default = () => <LanguageSelector languages={languages} setActiveLanguage={action('setActiveLanguage')} />;
