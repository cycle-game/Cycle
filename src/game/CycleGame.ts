import Phaser from 'phaser-ce';
import { BASE_SIZE } from './variables';
import { Boot } from './states/boot';
import { Load } from './states/load';
import { Menu } from './states/menu';
import { RulesState } from './states/rules';
import { Editor } from './states/editor';
import { Play } from './states/play';
import { Victory } from './states/victory';
import { Scores } from './states/scores';
import { Languages } from './states/languages';

export class CycleGame {
    private game: Phaser.Game;

    constructor(private readonly htmlElement: string, public readonly baseSize = BASE_SIZE) {
        this.game = new Phaser.Game(this.baseSize, this.baseSize, Phaser.CANVAS, this.htmlElement);

        // Les états du jeu
        this.game.state.add(Boot.NAME, new Boot());
        this.game.state.add(Load.NAME, new Load());
        this.game.state.add(Menu.NAME, new Menu());
        this.game.state.add(RulesState.NAME, new RulesState());
        this.game.state.add(Editor.NAME, new Editor());
        this.game.state.add(Play.NAME, new Play());
        this.game.state.add(Victory.NAME, new Victory());
        this.game.state.add('Scores', Scores);
        this.game.state.add(Languages.NAME, new Languages());
    }

    start() {
        this.game.state.start(Boot.NAME);
    }
}
