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

        // Et pendant ce temps on charge toutes les ressources !

        this.game.load.image(LANG, 'resources/tiles/lang.png');
        this.game.load.image(LOGO_C_MASK, 'resources/tiles/logo-c-mask.png');
        this.game.load.image(LOGO_WITHOUT_C, 'resources/tiles/logo-without-c.png');
        this.game.load.image(PLANET, 'resources/tiles/planet.svg');
        this.game.load.image(PLATFORM, 'resources/tiles/platform.png');
        this.game.load.image(TRAP, 'resources/tiles/trap.png');

        this.game.load.image(LANG_SELECTOR, 'resources/sprites/lang-selector.png');
        this.game.load.image(LOGO_C, 'resources/sprites/logo-c.png');
        this.game.load.image(NIGHT_MASK, 'resources/sprites/night-mask.png');
        this.game.load.image(PLAYER, 'resources/sprites/player.png');
        this.game.load.image(SELECTOR, 'resources/sprites/selector.png');
        this.game.load.image(STAR, 'resources/sprites/star.png');

        this.game.load.image(DEBUG_POINT, 'resources/sprites/debug-point.png');
    },
    create: function() {
        // Et on passe à la sélection de langue
        this.game.state.start('Langue');
    },
};
