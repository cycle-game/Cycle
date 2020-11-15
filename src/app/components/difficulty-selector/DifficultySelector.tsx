import React, { Component } from 'react';
import { Difficulty, normal } from '../../models';
import './DifficultySelector.scss';
import { i18nService } from '../../../i18n/I18nService';

type DifficultySelectorProps = {
    difficulties: Difficulty[];
    initialDifficulty?: Difficulty;
    onDifficultySelected: (selectedDifficulty: Difficulty) => void;
};

type DifficultySelectorState = {
    selectedDifficulty?: Difficulty;
};

export class DifficultySelector extends Component<DifficultySelectorProps, DifficultySelectorState> {
    constructor(props) {
        super(props);
        this.state = { selectedDifficulty: props.initialDifficulty || normal };
    }

    selectDifficulty(clickedDifficulty: Difficulty) {
        let { selectedDifficulty } = this.state;
        if (clickedDifficulty.level === selectedDifficulty.level) {
            return;
        }

        let { onDifficultySelected } = this.props;

        onDifficultySelected(clickedDifficulty);

        this.setState({ selectedDifficulty: clickedDifficulty });
    }

    isCurrentlySelectedDifficulty(difficulty: Difficulty) {
        let { selectedDifficulty } = this.state;

        return selectedDifficulty.level === difficulty.level;
    }

    render() {
        let { difficulties } = this.props;
        return (
            <div className="DifficultySelector">
                {difficulties.map(difficulty => (
                    <div
                        data-testid={`option-${difficulty.translationKey}`}
                        key={difficulty.level}
                        className="option"
                        onClick={() => this.selectDifficulty(difficulty)}
                        style={
                            this.isCurrentlySelectedDifficulty(difficulty)
                                ? { fontWeight: 'bold' }
                                : { fontWeight: 'normal' }
                        }
                    >
                        {i18nService.translate('Difficultes.' + difficulty.translationKey)}
                    </div>
                ))}
            </div>
        );
    }
}
