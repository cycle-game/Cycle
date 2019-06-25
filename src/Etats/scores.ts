import { c, plataille, Stats } from '../variables';
import { cliquable, difficultes, ecart, scores } from '../functions';
import { fr as lang } from './levels';
import Phaser from 'phaser';

export const Scores = {
    create: function() {
        const highscores = scores().split('|||');

        const label = cliquable(c / 2, plataille, lang.UnSeul, 22, 0.5, 0.5, 0, 700, null, this);

        // Retour au menu
        this.esc_key = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);

        // Difficulté
        this.choix_diff = [];
        difficultes(this, null);

        if (isNaN(Stats.diff)) Stats.diff = 1;

        this.diff = Stats.diff;

        // Affichage des scores
        this.scores = [];
        const margey = 70;
        const margex = 150;

        for (let val in this.choix_diff) {
            this.scores[val] = this.game.add.group();

            const specific_highscores = highscores[val].split('><');
            const espace_y = ecart(specific_highscores.length, margey);

            // Parcourt en y
            for (let i = 0; i < specific_highscores.length; i++) {
                const specific_player = specific_highscores[i].split('::');
                const espace_x = ecart(specific_player.length, margex);

                // Parcourt en x
                for (let j = 0; j < specific_highscores.length; j++) {
                    const tmp = cliquable(
                        margex + j * espace_x,
                        margey + i * espace_y,
                        specific_player[j],
                        25,
                        0.5,
                        0.5,
                        0,
                        null,
                        null,
                        this,
                    );
                    tmp.alpha = 1;
                    this.scores[val].add(tmp);
                }
            }

            //this.scores[val] = cliquable(c/2, c/2, highscores[val], 25, 0.5, 0.5, 0, null, null, this);

            if (val == this.diff) this.scores[val].alpha = 1;
            else this.scores[val].alpha = 0;
        }

        this.choix_diff[Stats.diff].setShadow(0, 0, 'rgba(0, 0, 0, 1)', 5);
    },
    souligne: function(sprite) {
        // Selection
        for (let val in this.choix_diff) {
            this.choix_diff[val].setShadow(0, 0, 'rgba(0, 0, 0, 0)', 5);
            this.scores[val].alpha = 0;
        }

        sprite.setShadow(0, 0, 'rgba(0, 0, 0, 1)', 5);
        this.diff = sprite.diff;
        this.scores[this.diff].alpha = 1;
    },
    update: function() {
        // Retour au menu
        if (this.esc_key.isDown) this.game.state.start('Menu');
    },
};
