import './RulesDisplayer.scss';
import React, { FunctionComponent } from 'react';
import { DifficultySelector } from '../../components/difficulty-selector';
import { difficulties, Difficulty } from '../../models';
import { i18nService } from '../../../i18n/I18nService';
import { PlayerProgression } from '../../../game/variables';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { useHistory } from 'react-router-dom';

export const RulesDisplayer: FunctionComponent = () => {
    const selectDifficulty = (selectedDifficulty: Difficulty) => {
        PlayerProgression.difficulty = selectedDifficulty.level;
    };

    const history = useHistory();

    const startGame = () => {
        history.replace('/game');
    };

    return (
        <div className="RulesDisplayer">
            <div className="information">
                <div>{i18nService.translate('rules.welcome')}</div>
                <div>{i18nService.translate('rules.howTo')}</div>
                <div>{i18nService.translate('rules.end')}</div>
                <div>{i18nService.translate('rules.start')}</div>
                <div>{i18nService.translate('rules.runAway')}</div>
            </div>
            <DifficultySelector difficulties={difficulties} onDifficultySelected={selectDifficulty} />
            <KeyboardEventHandler handleKeys={['space']} onKeyEvent={startGame} />
        </div>
    );
};
