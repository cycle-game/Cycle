import './GameContainer.scss';

import React, { FunctionComponent, useEffect } from 'react';
import { CycleGame } from '../../../game';
import { BASE_SIZE } from '../../../game/variables';

const CANVAS_ID = 'cycleCanvas';

const style = {
    width: `${BASE_SIZE}px`,
    height: `${BASE_SIZE}px`,
    margin: 'auto',
};

export const GameContainer: FunctionComponent = () => {
    useEffect(() => {
        const game = new CycleGame(CANVAS_ID);
        game.start();

        return () => game.stop();
    }, []);

    return <div className="GameContainer" id={CANVAS_ID} style={style} />;
};
