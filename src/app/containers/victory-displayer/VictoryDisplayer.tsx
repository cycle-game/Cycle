import './VictoryDisplayer.scss';
import React, { FunctionComponent } from 'react';
import { i18nService } from '../../../i18n/I18nService';
import { useHistory } from 'react-router-dom';
import { reset } from '../../../game/functions';
import { PlayerProgression } from '../../../game/variables';

type VictoryDisplayerProps = { score: number };

export const VictoryDisplayer: FunctionComponent<VictoryDisplayerProps> = props => {
    const history = useHistory();

    return (
        <div className="VictoryDisplayer">
            <div>{i18nService.translate('Victoire')}</div>
            <div className="score">
                {props.score} {i18nService.translate('points')}
            </div>
            <div>{i18nService.translate('Pseudo')}</div>
            <button
                onClick={() => {
                    reset(PlayerProgression);
                    history.replace('/');
                }}
            >
                {i18nService.translate('backToMenu')}
            </button>
        </div>
    );
};
