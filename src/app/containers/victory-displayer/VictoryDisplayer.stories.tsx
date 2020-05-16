import React from 'react';
import { VictoryDisplayer } from './VictoryDisplayer';
import { BrowserRouter } from 'react-router-dom';

export default {
    title: 'Victory Displayer',
};

export const Default = () => (
    <BrowserRouter>
        <VictoryDisplayer score={5369} />;
    </BrowserRouter>
);
