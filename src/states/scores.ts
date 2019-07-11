import { BASE_SIZE, platformSizeInPx, Stats } from '../variables';
import { cliquable, difficultes, ecart, scores } from '../functions';
import Phaser from 'phaser-ce';
import { lang } from '../i18n';
import { selectedLang } from './languages';
import { Menu } from './menu';

export const Scores = {
    create: function() {
        const highscores = scores().split('|||');

        // Screen title
        cliquable(BASE_SIZE / 2, platformSizeInPx, lang[selectedLang].UnSeul, 22, 0.5, 0.5, 0, 700, null, this);

        // ESC to return to menu
        this.esc_key = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);

        // Difficulty
        this.choix_diff = difficultes(this);
        this.Stats = null;

        if (isNaN(Stats.difficulty)) Stats.difficulty = 1;

        this.difficulty = Stats.difficulty;

        // Scores display
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

            if (val == this.difficulty) this.scores[val].alpha = 1;
            else this.scores[val].alpha = 0;
        }

        this.choix_diff[Stats.difficulty].text.setShadow(0, 0, 'rgba(0, 0, 0, 1)', 5);
    },
    souligne: function(sprite) {
        // Selection
        for (let val in this.choix_diff) {
            this.choix_diff[val].text.setShadow(0, 0, 'rgba(0, 0, 0, 0)', 5);
            this.scores[val].alpha = 0;
        }

        sprite.setShadow(0, 0, 'rgba(0, 0, 0, 1)', 5);
        this.difficulty = sprite.difficulty;
        this.scores[this.difficulty].alpha = 1;
    },
    update: function() {
        if (this.esc_key.isDown) this.game.state.start(Menu.NAME);
    },
};
