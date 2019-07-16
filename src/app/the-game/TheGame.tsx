import React, { Component } from 'react';

import { CycleGame } from '../../game';

type TheGameProps = {};

type TheGameState = {
    game: CycleGame;
};

export class TheGame extends Component<TheGameProps, TheGameState> {
    private static CANVAS_ID = 'cycleCanvas';

    constructor(props: TheGameProps) {
        super(props);

        this.state = {
            game: new CycleGame('fr', TheGame.CANVAS_ID),
        };
    }

    componentDidMount(): void {
        this.state.game.start();
    }

    render() {
        const style = {
            width: `${this.state.game.baseSize}px`,
            height: `${this.state.game.baseSize}px`,
            margin: 'auto',
        };

        return <div id={TheGame.CANVAS_ID} style={style} />;
    }
}
