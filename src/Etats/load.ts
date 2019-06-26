// Variable globale
import {
    LANG,
    LANG_SELECTOR,
    LOADER_EMPTY,
    LOADER_FULL,
    NIGHT_MASK,
    PLANET,
    PLATFORM,
    PLAYER,
    SELECTOR,
    STAR,
    TRAP,
} from './resoucesNames';

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

        this.game.load.image(PLAYER, 'Ressources/Phaser/player.png');
        this.game.load.image(SELECTOR, 'Ressources/Phaser/selector.png');
        this.game.load.image(NIGHT_MASK, 'Ressources/Phaser/night-mask.png');
        this.game.load.image(PLANET, 'Ressources/Phaser/planet.svg');

        this.game.load.image(PLATFORM, 'Ressources/Phaser/platform.png');
        this.game.load.image(STAR, 'Ressources/Phaser/star.png');
        this.game.load.image(TRAP, 'Ressources/Phaser/trap.png');

        this.game.load.image(LANG, 'Ressources/Phaser/lang.png');
        this.game.load.image(LANG_SELECTOR, 'Ressources/Phaser/lang-selector.png');
        this.game.load.image('fs', 'Ressources/Phaser/Follow_Souris.png');

        this.game.load.image('logo', 'Ressources/Phaser/Logo_sans_c.png');
        this.game.load.image('logo_c', 'Ressources/Phaser/Logo_c.png');
        this.game.load.image('logo_c_cache', 'Ressources/Phaser/Logo_c_cache.png');
        this.game.load.image('debug_point', 'Ressources/Phaser/Point.png');
    },
    create: function() {
        // Et on passe à la sélection de langue
        this.game.state.start('Langue');
    },
};
