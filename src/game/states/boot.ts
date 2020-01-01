import { YELLOW } from '../variables';
import { LOADER_EMPTY, LOADER_FULL } from '../resoucesNames';
import { Load } from './load';

export class Boot extends Phaser.State {
    static NAME = Boot.prototype.constructor.name;

    constructor(private readonly nextStateName: string = Load.NAME) {
        super();
    }

    preload() {
        this.game.stage.setBackgroundColor(YELLOW);

        this.game.load.image(LOADER_FULL, 'resources/tiles/loader-full.png');
        this.game.load.image(LOADER_EMPTY, 'resources/tiles/loader-empty.png');
    }

    create() {
        this.game.state.start(this.nextStateName);
    }
}
