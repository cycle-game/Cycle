import './TheGame.scss';
import React, { Component } from 'react';

import { PlayerProgression } from '../../game/variables';
import { i18nService } from '../../i18n/I18nService';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { reset } from '../../game/functions';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { ScoresDisplayer } from '../containers';
import { StageEditor } from '../containers/stage-editor/StageEditor';
import { GameContainer } from '../containers/game-container';

export class TheGame extends Component<{}, {}> {
    render() {
        return (
            <div className="TheGame">
                <BrowserRouter>
                    <Switch>
                        <Route path="/scores">
                            <ScoresDisplayer />
                        </Route>
                        <Route path="/stage-editor">
                            <StageEditor />
                        </Route>
                        <Route path="/game">
                            <GameContainer />
                        </Route>
                        <Route path="/">
                            <div className="menu">
                                <img className="logo" src="resources/tiles/logo-without-c.png" />
                                <Link to="/game" style={{ textDecoration: 'none' }}>
                                    <div className="item">{i18nService.translate('Jeu')}</div>
                                </Link>

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
                <KeyboardEventHandler handleKeys={['esc']} onKeyEvent={console.log('esc clicked!')} />
            </div>
        );
    }
}
