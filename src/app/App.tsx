import React from 'react';

import { CycleGame } from '../game';

export class App extends React.Component {
    private static GAME_HTML_ELEMENT = 'cycleCanvas';

    private game: CycleGame;

    constructor(props) {
        super(props);
        this.game = new CycleGame(App.GAME_HTML_ELEMENT);
    }

    componentDidMount(): void {
        this.game.start();
    }

    render() {
        const style = {
            width: `${this.game.baseSize}px`,
            height: `${this.game.baseSize}px`,
            margin: 'auto',
        };

        return <div id={App.GAME_HTML_ELEMENT} style={style}></div>;
    }
}
