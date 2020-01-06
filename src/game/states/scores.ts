import { BASE_SIZE, platformSizeInPx, PlayerProgression } from '../variables';
import { cliquable, difficultes, DifficultySelectorVM, ecart, scores } from '../functions';
import Phaser from 'phaser-ce';
import { i18nService } from '../../i18n/I18nService';

export class Scores extends Phaser.State {
    static NAME = Scores.prototype.constructor.name;

    private choix_diff: DifficultySelectorVM;
    private difficulty: number;

    private scores: Phaser.Group[];
    private readonly difficultyLabels: string[];

    constructor() {
        super();
        this.difficultyLabels = [
            i18nService.translate('Difficultes.easy'),
            i18nService.translate('Difficultes.normal'),
            i18nService.translate('Difficultes.hard'),
            i18nService.translate('Difficultes.nightmare'),
        ];
    }

    create() {
        const highscores = scores().split('|||');

        // Screen title
        cliquable(BASE_SIZE / 2, platformSizeInPx, i18nService.translate('UnSeul'), 22, 0.5, 0.5, 0, 700, null, this);

        // Difficulty
        this.choix_diff = difficultes(this, this.difficultyLabels);

        if (isNaN(PlayerProgression.difficulty)) PlayerProgression.difficulty = 1;

        this.difficulty = PlayerProgression.difficulty;

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

            if (this.choix_diff[val].difficulty === this.difficulty) this.scores[val].alpha = 1;
            else this.scores[val].alpha = 0;
        }

        this.choix_diff[PlayerProgression.difficulty].text.setShadow(0, 0, 'rgba(0, 0, 0, 1)', 5);
    }

    update() {}

    choix(sprite) {
        if (!isNaN(sprite)) {
            if (sprite >= 0 && sprite < this.difficultyLabels.length) {
                this.souligne(this.choix_diff[sprite]);
            }

            return;
        }

        this.souligne(sprite);
    }

    private souligne(sprite) {
        // Selection
        for (let val in this.choix_diff) {
            this.choix_diff[val].text.setShadow(0, 0, 'rgba(0, 0, 0, 0)', 5);
            this.scores[val].alpha = 0;
        }

        sprite.setShadow(0, 0, 'rgba(0, 0, 0, 1)', 5);
        this.difficulty = sprite.data.difficulty;
        this.scores[this.difficulty].alpha = 1;
    }
}
