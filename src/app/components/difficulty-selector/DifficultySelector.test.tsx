import React from 'react';
import { DifficultySelector } from './DifficultySelector';
import { difficulties, easy, nightmare } from '../../models';
import { shallow } from 'enzyme';

describe('DifficultySelector', () => {
    describe('selectDifficulty', () => {
        it('should call `onDifficultySelected` with selected difficulty', () => {
            const onDifficultySelected = jest.fn();

            const wrapper = shallow<DifficultySelector, DifficultySelector['props'], DifficultySelector['state']>(
                <DifficultySelector difficulties={difficulties} onDifficultySelected={onDifficultySelected} />,
            );

            wrapper.instance().selectDifficulty(easy);
            expect(onDifficultySelected).toHaveBeenCalledWith(easy);
        });

        it('should not call `onDifficultySelected` if clicked difficulty is already selected', () => {
            const onDifficultySelected = jest.fn();

            const wrapper = shallow<DifficultySelector, DifficultySelector['props'], DifficultySelector['state']>(
                <DifficultySelector difficulties={difficulties} onDifficultySelected={onDifficultySelected} />,
            );

            wrapper.instance().setState({ selectedDifficulty: nightmare });
            wrapper.instance().selectDifficulty(nightmare);
            expect(onDifficultySelected).not.toHaveBeenCalledWith(nightmare);
        });

        it('should set `selectedDifficulty` property of the state', () => {
            const wrapper = shallow<DifficultySelector, DifficultySelector['props'], DifficultySelector['state']>(
                <DifficultySelector difficulties={difficulties} onDifficultySelected={jest.fn()} />,
            );

            wrapper.instance().selectDifficulty(nightmare);
            expect(wrapper.state().selectedDifficulty).toEqual(nightmare);
        });
    });

    describe('isCurrentlySelectedDifficulty', () => {
        it('should return true when input difficulty is the state selected difficulty', () => {
            const wrapper = shallow<DifficultySelector, DifficultySelector['props'], DifficultySelector['state']>(
                <DifficultySelector difficulties={difficulties} onDifficultySelected={jest.fn()} />,
            );

            wrapper.instance().setState({ selectedDifficulty: nightmare });
            expect(wrapper.instance().isCurrentlySelectedDifficulty(nightmare)).toEqual(true);
        });

        it('should return false when input difficulty is not the state selected difficulty', () => {
            const wrapper = shallow<DifficultySelector, DifficultySelector['props'], DifficultySelector['state']>(
                <DifficultySelector difficulties={difficulties} onDifficultySelected={jest.fn()} />,
            );

            wrapper.instance().setState({ selectedDifficulty: nightmare });
            expect(wrapper.instance().isCurrentlySelectedDifficulty(easy)).toEqual(false);
        });
    });
});
