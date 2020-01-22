import React, { Component } from 'react';

import { CycleGame } from '../../game';
import { BASE_SIZE, PlayerProgression } from '../../game/variables';
import { CycleStageEditorGame } from '../../game/CycleStageEditorGame';
import { i18nService } from '../../i18n/I18nService';
import './TheGame.scss';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { reset } from '../../game/functions';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import { ScoresDisplayer } from '../containers';
import { StageEditor } from '../containers/stage-editor/StageEditor';

type TheGameProps = {};

type TheGameState = {
    game?: CycleGame | CycleStageEditorGame;
    displayMenu: boolean;
};

export class TheGame extends Component<TheGameProps, TheGameState> {
    private static CANVAS_ID = 'cycleCanvas';

    constructor(props: TheGameProps) {
        super(props);

        this.state = {
            displayMenu: true,
        };
    }

    componentDidMount(): void {}

    render() {
        const { game, displayMenu } = this.state;

        const startGame = (game: CycleGame | CycleStageEditorGame) => {
            if (this.state.game) {
                this.state.game.stop();
            }

            game.start();
            this.setState({ game, displayMenu: false });
        };

        // TODO: Extract this menu in a new component
        const menu = (
            <BrowserRouter>
                <Switch>
                    <Route path="/scores">
                        <ScoresDisplayer />
                    </Route>
                    <Route path="/stage-editor">
                        <StageEditor />
                    </Route>
                    <Route path="/">
                        <div className="menu">
                            <img className="logo" src="resources/tiles/logo-without-c.png" />
                            <div className="item game-item" onClick={() => startGame(new CycleGame(TheGame.CANVAS_ID))}>
                                {i18nService.translate('Jeu')}
                            </div>
                            <Link to="/scores" style={{ textDecoration: 'none' }}>
                                <div className="item">{i18nService.translate('Scores')}</div>
                            </Link>

                            <Link to="/stage-editor" style={{ textDecoration: 'none' }}>
                                <div className="item">{i18nService.translate('Editeur')}</div>
                            </Link>
                            <div
                                className="item"
                                onClick={() => {
                                    reset(PlayerProgression);
                                }}
                            >
                                {i18nService.translate('RaZ')}
                            </div>
                        </div>
                    </Route>
                </Switch>
            </BrowserRouter>
        );

        const style = {
            width: `${BASE_SIZE}px`,
            height: `${BASE_SIZE}px`,
            margin: 'auto',
        };

        const backToMenu = () => {
            if (game) {
                game.stop();
            }
            this.setState({ displayMenu: true, game: null });
        };

        return (
            <div className="TheGame">
                {displayMenu ? menu : <div></div>}
                <div id={TheGame.CANVAS_ID} style={style} />
                <KeyboardEventHandler handleKeys={['esc']} onKeyEvent={backToMenu} />
            </div>
        );
    }
}
