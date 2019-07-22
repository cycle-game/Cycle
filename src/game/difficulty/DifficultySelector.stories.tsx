import { storiesOf } from '@storybook/react';
import React from 'react';

import { DifficultySelector } from './DifficultySelector';
import { difficulties } from './Difficulty';
import { action } from '@storybook/addon-actions';

const stories = storiesOf('Components', module);

stories.add('DifficultySelector', () => (
    <DifficultySelector difficulties={difficulties} onDifficultySelected={action('onDifficultySelected')} />
));
