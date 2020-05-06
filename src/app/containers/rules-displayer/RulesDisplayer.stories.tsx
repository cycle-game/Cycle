import React from 'react';
import { RulesDisplayer } from './RulesDisplayer';
import { BrowserRouter } from 'react-router-dom';

export default {
    title: 'Rules Displayer',
};

export const Default = () => (
    <BrowserRouter>
        <RulesDisplayer />
    </BrowserRouter>
);
