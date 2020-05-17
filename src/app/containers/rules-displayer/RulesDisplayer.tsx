import './RulesDisplayer.scss';
import React, { FunctionComponent, useState } from 'react';
import { DifficultySelector } from '../../components/difficulty-selector';
import { difficulties, Difficulty, normal } from '../../models';
import { i18nService } from '../../../i18n/I18nService';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { useHistory } from 'react-router-dom';

export const RulesDisplayer: FunctionComponent = () => {
    const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>(normal);

    const history = useHistory();

    const startGame = () => {
        history.replace('/game', { selectedDifficulty });
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
            <DifficultySelector
                difficulties={difficulties}
                initialDifficulty={selectedDifficulty}
                onDifficultySelected={difficulty => setSelectedDifficulty(difficulty)}
            />
            <KeyboardEventHandler handleKeys={['space']} onKeyEvent={startGame} />
        </div>
    );
};
