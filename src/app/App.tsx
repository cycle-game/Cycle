import React from 'react';

import { TheGame } from './the-game';

type AppProps = {};

type AppState = {};

export class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div>
                <TheGame />
            </div>
        );
    }
}
