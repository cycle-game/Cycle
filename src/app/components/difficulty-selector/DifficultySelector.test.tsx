import React from 'react';
import { DifficultySelector } from './DifficultySelector';
import { difficulties, easy, hard, nightmare } from '../../models';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('DifficultySelector', () => {
    it('should call `onDifficultySelected` when selecting a difficulty', () => {
        const onDifficultySelected = jest.fn();

        render(<DifficultySelector difficulties={difficulties} onDifficultySelected={onDifficultySelected} />);

        userEvent.click(screen.getByTestId('option-easy'));
        userEvent.click(screen.getByTestId('option-hard'));
        expect(onDifficultySelected).nthCalledWith(1, easy);
        expect(onDifficultySelected).nthCalledWith(2, hard);
    });

    it('should not call `onDifficultySelected` when selecting difficulty already selected', () => {
        const onDifficultySelected = jest.fn();

        render(
            <DifficultySelector
                difficulties={difficulties}
                onDifficultySelected={onDifficultySelected}
                initialDifficulty={nightmare}
            />,
        );

        userEvent.click(screen.getByTestId('option-nightmare'));

        expect(onDifficultySelected).not.toHaveBeenCalledWith(nightmare);
    });

    it('should set text of selected option to bold', () => {
        render(
            <DifficultySelector
                difficulties={difficulties}
                onDifficultySelected={jest.fn()}
                initialDifficulty={easy}
            />,
        );

        expect(screen.getByTestId('option-nightmare')).toHaveStyle({
            fontWeight: 'normal',
        });

        userEvent.click(screen.getByTestId('option-nightmare'));

        expect(screen.getByTestId('option-nightmare')).toHaveStyle({
            fontWeight: 'bold',
        });
    });
});
