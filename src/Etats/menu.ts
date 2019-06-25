// On crée l'état du menu
import { cliquable, difficultes, reset } from '../functions';
import { c, plataille, Stats } from '../variables';
import { lang } from './load';
import Phaser from 'phaser';

export const Explain = {
    create: function() {
        // Un équivalent d'écouteur d'évènement (si on veut)
        this.space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        // Retour au menu avec Échap
        this.esc_key = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);

        // Présentation du jeu
        cliquable(c / 2, c / 2.5, lang.Presentation, 25, 0.5, 0.5, 0, 500, null, this);

        // Difficulté
        this.choix_diff = [];
        difficultes(this, null);

        if (isNaN(Stats.diff)) Stats.diff = 1;

        this.choix_diff[Stats.diff].setShadow(0, 0, 'rgba(0, 0, 0, 1)', 5);
    },
    souligne: function(sprite) {
        for (var val in this.choix_diff) {
            this.choix_diff[val].setShadow(0, 0, 'rgba(0, 0, 0, 0)', 5);
        }

        sprite.setShadow(0, 0, 'rgba(0, 0, 0, 1)', 5);

        reset(Stats);
        Stats.diff = sprite.diff;
    },
    update: function() {
        // Retour au menu
        if (this.esc_key.isDown) this.game.state.start('Menu');

        // Démarrage du jeu
        if (this.space_key.isDown) this.game.state.start('Play');
    },
};

// Précédant les explications : choix entre editor et game
export const Menu = {
    create: function() {
        // Tout les labels sont créés aec la fonction cliquable prenant en para:
        // x, y, text, size, anchor x, anchor y, delay, speed, onDown, context
        var play = cliquable(c / 2, c / 2.2, lang.Jeu, 50, 0.5, 0.5, 0, 500, this.play, this);
        var or = cliquable(c / 2, c / 1.5, lang.Ou, 23, 0.5, 0.5, 300, 500, null, this);
        var editor = cliquable(c / 2, c / 1.3, lang.Editeur, 30, 0.5, 0.5, 700, 500, this.editor, this);
        var come_back = cliquable(c / 2, c - plataille, lang.HowToBack, 18, 0.5, 1, 1500, 500, null, this);
        var raz = cliquable(c - plataille, plataille, lang.RaZ, 25, 1, 0, 200, 250, this.raz, this);
        var scores = cliquable(c / 2, c / 1.7, lang.Scores, 27, 0.5, 0.5, 200, 250, this.scores, this);

        // Logo + animation
        this.logo_c = this.game.add.sprite(c / 2 - 99, plataille + 80, 'logo_c');
        this.logo_c.anchor.setTo(0.5, 0.5);
        var logo_c_cache = this.game.add.sprite(c / 2 - 99, plataille + 5, 'logo_c_cache');
        logo_c_cache.anchor.setTo(0.5, 0);
        var logo = this.game.add.sprite(c / 2, plataille, 'logo');
        logo.anchor.setTo(0.5, 0);
    },
    raz: function() {
        // Remise à zero des scores
        reset(Stats);
        this.game.state.start('Menu');
    },
    scores: function() {
        this.game.state.start('Scores');
    },
    play: function() {
        this.game.state.start('Explain');
    },
    editor: function() {
        this.game.state.start('Edit');
    },
    update: function() {
        // Logo animé
        this.logo_c.angle += 0.7;
    },
};
