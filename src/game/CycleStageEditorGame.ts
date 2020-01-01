import Phaser from 'phaser-ce';
import { BASE_SIZE } from './variables';
import { Boot } from './states/boot';
import { Load } from './states/load';
import { Editor } from './states/editor';
import { Play } from './states/play';

export class CycleStageEditorGame {
    private game: Phaser.Game;

    constructor(private readonly htmlElement: string, public readonly baseSize = BASE_SIZE) {
        this.game = new Phaser.Game(this.baseSize, this.baseSize, Phaser.CANVAS, this.htmlElement);

        // Les états du jeu
        this.game.state.add(Boot.NAME, new Boot(Load.NAME));
        this.game.state.add(Load.NAME, new Load(Editor.NAME));
        this.game.state.add(Editor.NAME, new Editor());
        this.game.state.add(Play.NAME, new Play());
    }

    start() {
        this.game.state.start(Boot.NAME);
    }

    stop() {
        this.game.destroy();
    }
}
