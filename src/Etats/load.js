import { c, jaune } from '../variables';
import { en, fr } from './levels';

// Variable globale
export let preloading2;
export let preloading1;

// Création de l'objet boot contenant les méthodes par défaut de Phaser

// On utilise la propriété prototype pour remplir notre GameState.Boot
// On aurait pu faire une variable : var blabla = { preload:function(){} }
export const Boot = {
    preload: function() {
        // Couleur de fond
        this.game.stage.setBackgroundColor(jaune);

        // Images pour le loader
        this.game.load.image('load_plein', 'Ressources/Phaser/LoaderPlein.png');
        this.game.load.image('load_vide', 'Ressources/Phaser/LoaderVide.png');
    },
    create: function() {
        // On passe à l'état de chargement
        this.game.state.start('Load');
    },
};

// L'état où le loader se lohad.
export const Load = {
    preload: function() {
        // Ici on crée deux sprites, un en fond et un au dessus
        preloading2 = this.game.add.sprite(0, 0, 'load_plein');
        preloading1 = this.game.add.sprite(0, 0, 'load_vide');

        // Celui du dessus sera révélé petit à petit
        this.game.load.setPreloadSprite(preloading1);

        // Et pendant se temps on charge toutes les ressources !

        this.game.load.image('dude', 'Ressources/Phaser/Dude.png');
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

export let lang;

export const Langue = {
    create: function() {
        lang = this.game.add.sprite(0, 0, 'lang');

        // Handcursor
        lang.inputEnabled = true;
        lang.input.useHandCursor = true;

        this.cache = this.game.add.sprite(0, 0, 'cache');
        this.cache.blendMode = PIXI.blendModes.DIFFERENCE;

        //this.fs = this.game.add.sprite(c/2, c/2, 'fs');
        //this.fs.blendMode = PIXI.blendModes.DIFFERENCE;

        //this.game.input.onDown.add(this.clickGeneral, this);
    },

    update: function() {
        // Position de la souris
        var x_pointer = this.game.input.x;
        var y_pointer = this.game.input.y;

        // Changement de position du cache (inversant les couleurs)
        if (x_pointer <= c / 2) this.cache.x = 0;
        else this.cache.x = c / 2;

        // Au clique ...
        if (this.game.input.mousePointer.isDown) {
            if (x_pointer <= c / 2) lang = fr;
            else lang = en;

            this.game.state.start('Menu');
        }

        //this.fs.x = x_pointer - 50;
        //this.fs.y = y_pointer - 50;
    },
};
