import React from 'react';

import { DifficultySelector } from './DifficultySelector';
import { action } from '@storybook/addon-actions';
import { difficulties, nightmare } from '../../models';

export default {
    title: 'Difficulty Selector',
};

export const WithNoInitialDifficulty = () => (
    <DifficultySelector difficulties={difficulties} onDifficultySelected={action('onDifficultySelected')} />
);

export const WithNightmareDifficultySelected = () => (
    <DifficultySelector
        difficulties={difficulties}
        onDifficultySelected={action('onDifficultySelected')}
        initialDifficulty={nightmare}
    />
);
