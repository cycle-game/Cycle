import Phaser from 'phaser-ce';
import { BASE_SIZE } from './variables';
import { Boot } from './states/boot';
import { Load } from './states/load';
import { Play } from './states/play';

export class CycleGame {
    private game: Phaser.Game;

    constructor(
        private readonly htmlElement: string,
        public readonly baseSize = BASE_SIZE,
        private readonly onGameEnds: () => void,
    ) {
        this.game = new Phaser.Game(this.baseSize, this.baseSize, Phaser.CANVAS, this.htmlElement);

        // Les états du jeu
        this.game.state.add(Boot.NAME, new Boot(Load.NAME));
        this.game.state.add(Load.NAME, new Load(Play.NAME));
        this.game.state.add(Play.NAME, new Play(onGameEnds));
    }

    start() {
        this.game.state.start(Boot.NAME);
    }

    stop() {
        this.game.destroy();
    }
}
