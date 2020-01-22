import React, { FunctionComponent, useEffect } from 'react';
import { BASE_SIZE } from '../../../game/variables';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { useHistory } from 'react-router-dom';
import { CycleStageEditorGame } from '../../../game/CycleStageEditorGame';
import './StageEditor.scss';

const CANVAS_ID = 'cycleCanvas';
const style = {
    width: `${BASE_SIZE}px`,
    height: `${BASE_SIZE}px`,
    margin: 'auto',
};

export const StageEditor: FunctionComponent = () => {
    const history = useHistory();

    useEffect(() => {
        new CycleStageEditorGame(CANVAS_ID).start();
    }, []);

    const backToMenu = () => {
        history.push('/');
    };

    return (
        <div className="StageEditor">
            <div id={CANVAS_ID} style={style} />
            <KeyboardEventHandler handleKeys={['esc']} onKeyEvent={backToMenu} isExclusive={true} />
        </div>
    );
};
