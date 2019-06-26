// Variable globale
import { LOADER_EMPTY, LOADER_FULL, PLAYER } from './resoucesNames';

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
        this.game.load.image('predic', 'Ressources/Phaser/Predicteur.png');
        this.game.load.image('nuit', 'Ressources/Phaser/Nuit.png');
        this.game.load.image('planete', 'Ressources/Phaser/Terre.svg');

        this.game.load.image('plt', 'Ressources/Phaser/TheOne.png');
        this.game.load.image('et', 'Ressources/Phaser/Etoile.png');
        this.game.load.image('pie', 'Ressources/Phaser/Piege.png');

        this.game.load.image('lang', 'Ressources/Phaser/Lang.png');
        this.game.load.image('cache', 'Ressources/Phaser/Cache.png');
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
