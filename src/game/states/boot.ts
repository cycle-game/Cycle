import { YELLOW } from '../variables';
import { LOADER_EMPTY, LOADER_FULL } from '../resoucesNames';
import { Load } from './load';

export class Boot extends Phaser.State {
    static NAME = Boot.prototype.constructor.name;

    preload() {
        this.game.stage.setBackgroundColor(YELLOW);

        this.game.load.image(LOADER_FULL, 'resources/tiles/loader-full.png');
        this.game.load.image(LOADER_EMPTY, 'resources/tiles/loader-empty.png');
    }

    create() {
        this.game.state.start(Load.NAME);
    }
}
