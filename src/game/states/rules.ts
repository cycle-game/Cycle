import Phaser from 'phaser-ce';
import { cliquable, difficultes, DifficultySelectorVM, reset } from '../functions';
import { BASE_SIZE, PlayerProgression } from '../variables';
import { i18nService } from '../../i18n/I18nService';

export class RulesState extends Phaser.State {
    static NAME = RulesState.prototype.constructor.name;

    choix_diff: DifficultySelectorVM;
    private space_key: Phaser.Key;
    Stats: typeof PlayerProgression = null;

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

    create(): void {
        // Un équivalent d'écouteur d'évènement (si on veut)
        this.space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        // Présentation du jeu
        cliquable(
            BASE_SIZE / 2,
            BASE_SIZE / 2.5,
            i18nService.translate('Presentation'),
            25,
            0.5,
            0.5,
            0,
            500,
            null,
            this,
        );

        // Difficulté
        this.choix_diff = difficultes(this, this.difficultyLabels);

        if (isNaN(PlayerProgression.difficulty)) PlayerProgression.difficulty = 1;

        this.choix_diff[PlayerProgression.difficulty].text.setShadow(0, 0, 'rgba(0, 0, 0, 1)', 5);
    }

    update(): void {
        // Démarrage du jeu
        if (this.space_key.isDown) this.game.state.start('Play');
    }

    choix(sprite) {
        if (!isNaN(sprite)) {
            if (sprite >= 0 && sprite < this.difficultyLabels.length) {
                this.souligne(this.choix_diff[sprite]);
            }

            return;
        }

        this.souligne(sprite);
    }

    private souligne(sprite: any): void {
        for (var val in this.choix_diff) {
            this.choix_diff[val].text.setShadow(0, 0, 'rgba(0, 0, 0, 0)', 5);
        }

        sprite.setShadow(0, 0, 'rgba(0, 0, 0, 1)', 5);

        reset(PlayerProgression);
        PlayerProgression.difficulty = sprite.data.difficulty;
    }
}
