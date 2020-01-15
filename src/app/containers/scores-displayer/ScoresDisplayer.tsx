import React, { Component } from 'react';
import { DifficultySelector } from '../../components/difficulty-selector';
import { difficulties, Difficulty, normal } from '../../models';

import './ScoresDisplayer.scss';
import { i18nService } from '../../../i18n/I18nService';

interface Score {
    username: string;
    score: number;
    maxLevel: number;
}

interface ScoresDisplayerState {
    scoresToDisplay: Score[];
}

export class ScoresDisplayer extends Component<{}, ScoresDisplayerState> {
    state: ScoresDisplayerState = {
        scoresToDisplay: [],
    };

    constructor(props: {}) {
        super(props);
    }

    componentDidMount(): void {
        this.onDifficultySelected(normal);
    }

    //TODO: This function should make a call to an API where scores are saved
    // For now it just return a hardcoded object
    fetchScore(difficulty: Difficulty): Promise<Score[]> {
        return Promise.resolve([
            {
                username: 'John Rambo',
                score: 1258 + Math.round(Math.random() * 50),
                maxLevel: 10 + Math.round(Math.random() * 2),
            },
            {
                username: 'Bruce Wayne',
                score: 973 + Math.round(Math.random() * 50),
                maxLevel: 8 + Math.round(Math.random() * 2),
            },
            {
                username: 'Jasmine Morgan',
                score: 249 + Math.round(Math.random() * 50),
                maxLevel: 6 + Math.round(Math.random() * 2),
            },
        ]);
    }

    async onDifficultySelected(difficulty: Difficulty) {
        this.setState({
            scoresToDisplay: await this.fetchScore(difficulty),
        });
    }

    render() {
        return (
            <div className="ScoresDisplayer">
                <h1>{i18nService.translate('Scores')}</h1>
                <DifficultySelector
                    difficulties={difficulties}
                    initialDifficulty={normal}
                    onDifficultySelected={diff => this.onDifficultySelected(diff)}
                />

                <div>Username - Score - Max Level</div>
                <div>
                    {this.state.scoresToDisplay.map(score => {
                        return (
                            <div key={score.username}>
                                {score.username} - {score.score} - {score.maxLevel}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}
