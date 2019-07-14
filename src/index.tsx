import 'pixi';
import 'p2';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app/App';
import { CycleGame } from './game';

ReactDOM.render(<App />, document.getElementById('root'));

new CycleGame().start();
