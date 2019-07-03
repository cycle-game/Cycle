// Variable globale
import {
    DEBUG_POINT,
    LANG,
    LANG_SELECTOR,
    LOADER_EMPTY,
    LOADER_FULL,
    LOGO_C,
    LOGO_C_MASK,
    LOGO_WITHOUT_C,
    NIGHT_MASK,
    PLANET,
    PLATFORM,
    PLAYER,
    SELECTOR,
    STAR,
    TRAP,
} from '../resoucesNames';

export let preloading2;
export let preloading1;

// L'état où le loader se lohad.
export const Load = {
    preload: function() {
        // Ici on crée deux sprites, un en fond et un au dessus
        preloading2 = this.game.add.sprite(0, 0, LOADER_FULL);
        preloading1 = this.game.add.sprite(0, 0, LOADER_EMPTY);

        // Celui du dessus sera révélé petit à petit
        this.game.load.setPreloadSprite(preloading1);

        // Et pendant se temps on charge toutes les ressources !

        this.game.load.image(PLAYER, 'resources/Phaser/player.png');
        this.game.load.image(SELECTOR, 'resources/Phaser/selector.png');
        this.game.load.image(NIGHT_MASK, 'resources/Phaser/night-mask.png');
        this.game.load.image(PLANET, 'resources/Phaser/planet.svg');

        this.game.load.image(PLATFORM, 'resources/Phaser/platform.png');
        this.game.load.image(STAR, 'resources/Phaser/star.png');
        this.game.load.image(TRAP, 'resources/Phaser/trap.png');

        this.game.load.image(LANG, 'resources/Phaser/lang.png');
        this.game.load.image(LANG_SELECTOR, 'resources/Phaser/lang-selector.png');

        this.game.load.image(LOGO_WITHOUT_C, 'resources/Phaser/logo-without-c.png');
        this.game.load.image(LOGO_C, 'resources/Phaser/logo-c.png');
        this.game.load.image(LOGO_C_MASK, 'resources/Phaser/logo-c-mask.png');

        this.game.load.image(DEBUG_POINT, 'resources/Phaser/debug-point.png');
    },
    create: function() {
        // Et on passe à la sélection de langue
        this.game.state.start('Langue');
    },
};
