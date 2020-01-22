import React, { FunctionComponent, useEffect } from 'react';
import { BASE_SIZE } from '../../../game/variables';
import { CycleStageEditorGame } from '../../../game/CycleStageEditorGame';
import './StageEditor.scss';

const CANVAS_ID = 'cycleCanvas';
const style = {
    width: `${BASE_SIZE}px`,
    height: `${BASE_SIZE}px`,
    margin: 'auto',
};

export const StageEditor: FunctionComponent = () => {
    useEffect(() => {
        new CycleStageEditorGame(CANVAS_ID).start();
    }, []);

    return (
        <div className="StageEditor">
            <div id={CANVAS_ID} style={style} />
        </div>
    );
};
