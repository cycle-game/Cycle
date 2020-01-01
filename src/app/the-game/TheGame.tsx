import React, { Component } from 'react';

import { CycleGame } from '../../game';
import { BASE_SIZE } from '../../game/variables';
import { CycleStageEditorGame } from '../../game/CycleStageEditorGame';
import { CycleScoreGame } from '../../game/CycleScoreGame';
import { i18nService } from '../../i18n/I18nService';

type TheGameProps = {};

type TheGameState = {
    game?: CycleGame | CycleStageEditorGame | CycleScoreGame;
};

export class TheGame extends Component<TheGameProps, TheGameState> {
    private static CANVAS_ID = 'cycleCanvas';

    constructor(props: TheGameProps) {
        super(props);

        this.state = {};
    }

    componentDidMount(): void {}

    render() {
        const startGame = (game: CycleGame | CycleStageEditorGame | CycleScoreGame) => {
            if (this.state.game) {
                this.state.game.stop();
            }

            game.start();
            this.setState({ game });
        };

        const style = {
            width: `${BASE_SIZE}px`,
            height: `${BASE_SIZE}px`,
            margin: 'auto',
        };

        return (
            <div>
                <button onClick={() => startGame(new CycleStageEditorGame(TheGame.CANVAS_ID))}>
                    {i18nService.translate('Editeur')}
                </button>
                <button onClick={() => startGame(new CycleGame(TheGame.CANVAS_ID))}>
                    {i18nService.translate('Jeu')}
                </button>
                <button onClick={() => startGame(new CycleScoreGame(TheGame.CANVAS_ID))}>
                    {i18nService.translate('Scores')}
                </button>
                <div id={TheGame.CANVAS_ID} style={style} />
            </div>
        );
    }
}
