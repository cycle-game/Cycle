import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';

import { Language, LanguageSelector } from './LanguageSelector';

const stories = storiesOf('Components', module);

const languages: Language[] = [{ code: 'en', name: 'English' }, { code: 'fr', name: 'Français' }];

stories.add(
    'LanguageSelector',
    () => <LanguageSelector languages={languages} setActiveLanguage={action('setActiveLanguage')} />,
    { info: { inline: true } },
);

