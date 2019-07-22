import 'pixi';
import 'p2';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { App } from './app/App';
import { store } from './app/app.store';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'),
);
