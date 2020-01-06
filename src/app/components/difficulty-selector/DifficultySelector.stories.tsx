import { storiesOf } from '@storybook/react';
import React from 'react';

import { DifficultySelector } from './DifficultySelector';
import { action } from '@storybook/addon-actions';
import { difficulties, nightmare } from '../../models';

storiesOf('DifficultySelector', module)
    .add('With no initial difficulty', () => (
        <DifficultySelector difficulties={difficulties} onDifficultySelected={action('onDifficultySelected')} />
    ))
    .add('With `nightmare` difficulty selected', () => (
        <DifficultySelector
            difficulties={difficulties}
            onDifficultySelected={action('onDifficultySelected')}
            initialDifficulty={nightmare}
        />
    ));
