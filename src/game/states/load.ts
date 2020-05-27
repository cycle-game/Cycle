import {
    DEBUG_POINT,
    LOADER_EMPTY,
    LOADER_FULL,
    NIGHT_MASK,
    PLANET,
    PLATFORM,
    PLAYER,
    SELECTOR,
    STAR,
    TRAP,
} from '../resoucesNames';
import { Play } from './play';

export class Load extends Phaser.State {
    static NAME = Load.prototype.constructor.name;

    constructor(private readonly nextStateName: string = Play.NAME) {
        super();
    }

    preload() {
        // Ici on crée deux sprites, un en fond et un au dessus
        this.game.add.sprite(0, 0, LOADER_FULL);
        const preloading1 = this.game.add.sprite(0, 0, LOADER_EMPTY);

        // Celui du dessus sera révélé petit à petit
        this.game.load.setPreloadSprite(preloading1);

        // Et pendant ce temps on charge toutes les ressources !

        this.game.load.image(PLANET, 'resources/tiles/planet.svg');
        this.game.load.image(PLATFORM, 'resources/tiles/platform.png');
        this.game.load.image(TRAP, 'resources/tiles/trap.png');

        this.game.load.image(NIGHT_MASK, 'resources/sprites/night-mask.png');
        this.game.load.image(PLAYER, 'resources/sprites/player.png');
        this.game.load.image(SELECTOR, 'resources/sprites/selector.png');
        this.game.load.image(STAR, 'resources/sprites/star.png');

        this.game.load.image(DEBUG_POINT, 'resources/sprites/debug-point.png');
    }

    create() {
        this.game.state.start(this.nextStateName);
    }
}
