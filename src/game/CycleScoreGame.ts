import Phaser from 'phaser-ce';
import { BASE_SIZE } from './variables';
import { Boot } from './states/boot';
import { Scores } from './states/scores';
import { Load } from './states/load';

export class CycleScoreGame {
    private game: Phaser.Game;

    constructor(private readonly htmlElement: string, public readonly baseSize = BASE_SIZE) {
        this.game = new Phaser.Game(this.baseSize, this.baseSize, Phaser.CANVAS, this.htmlElement);

        // Les états du jeu
        this.game.state.add(Boot.NAME, new Boot(Load.NAME));
        this.game.state.add(Load.NAME, new Load(Scores.NAME));
        this.game.state.add(Scores.NAME, new Scores());
    }

    start() {
        this.game.state.start(Boot.NAME);
    }

    stop() {
        this.game.destroy();
    }
}
