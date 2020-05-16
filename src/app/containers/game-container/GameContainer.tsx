import './GameContainer.scss';

import React, { FunctionComponent, useEffect } from 'react';
import { CycleGame } from '../../../game';
import { BASE_SIZE } from '../../../game/variables';
import { useHistory } from 'react-router-dom';
import KeyboardEventHandler from 'react-keyboard-event-handler';

const CANVAS_ID = 'cycleCanvas';

const style = {
    width: `${BASE_SIZE}px`,
    height: `${BASE_SIZE}px`,
    margin: 'auto',
};

export const GameContainer: FunctionComponent = () => {
    const history = useHistory();
    const goToHome = () => history.replace('/victory');

    useEffect(() => {
        const game = new CycleGame(CANVAS_ID, BASE_SIZE, () => {
            goToHome();
        });
        game.start();

        return () => game.stop();
    }, []);

    return (
        <div>
            <div className="GameContainer" id={CANVAS_ID} style={style} />
            <KeyboardEventHandler handleKeys={['esc']} onKeyEvent={goToHome} />
        </div>
    );
};
