import React, { FunctionComponent } from 'react';
import { Difficulty } from './Difficulty';

export type LanguageSelectorProps = {
    difficulties: Difficulty[];
    onDifficultySelected: (selectedDifficulty: Difficulty) => void;
};

export const DifficultySelector: FunctionComponent<LanguageSelectorProps> = ({
    difficulties,
    onDifficultySelected,
}) => (
    <ul className="selector">
        {difficulties.map(difficulty => (
            <li key={difficulty.level}>
                <button onClick={() => onDifficultySelected(difficulty)}>{difficulty.translationKey}</button>
            </li>
        ))}
    </ul>
);
