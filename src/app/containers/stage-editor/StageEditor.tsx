import React, { Component } from 'react';
import { BASE_SIZE } from '../../../game/variables';
import { CycleStageEditorGame } from '../../../game/CycleStageEditorGame';
import './StageEditor.scss';

export class StageEditor extends Component<{}, {}> {
    private static CANVAS_ID = 'cycleCanvas';

    componentDidMount(): void {
        new CycleStageEditorGame(StageEditor.CANVAS_ID).start();
    }

    render() {
        const style = {
            width: `${BASE_SIZE}px`,
            height: `${BASE_SIZE}px`,
            margin: 'auto',
        };

        return (
            <div className="StageEditor">
                <div id={StageEditor.CANVAS_ID} style={style} />
            </div>
        );
    }
}
