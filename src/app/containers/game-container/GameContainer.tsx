import './GameContainer.scss';

import React, { Component } from 'react';
import { CycleGame } from '../../../game';
import { BASE_SIZE } from '../../../game/variables';

const CANVAS_ID = 'cycleCanvas';

const style = {
    width: `${BASE_SIZE}px`,
    height: `${BASE_SIZE}px`,
    margin: 'auto',
};

export class GameContainer extends Component<{}, {}> {
    componentDidMount() {
        new CycleGame(CANVAS_ID).start();
    }

    render() {
        return <div className="GameContainer" id={CANVAS_ID} style={style} />;
    }
}
