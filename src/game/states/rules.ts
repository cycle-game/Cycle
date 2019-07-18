import Phaser from 'phaser-ce';
import { cliquable, difficultes, DifficultySelectorVM, reset } from '../functions';
import { BASE_SIZE, PlayerProgression } from '../variables';
import { lang } from '../i18n';
import { Menu } from './menu';

export class RulesState extends Phaser.State {
    static NAME = RulesState.prototype.constructor.name;

    choix_diff: DifficultySelectorVM;
    private space_key: Phaser.Key;
    private esc_key: Phaser.Key;
    Stats: typeof PlayerProgression = null;

    constructor(private readonly selectedLang: string) {
        super();
    }

    create(): void {
        // Un équivalent d'écouteur d'évènement (si on veut)
        this.space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        // Retour au menu avec Échap
        this.esc_key = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);

        // Présentation du jeu
        cliquable(
            BASE_SIZE / 2,
            BASE_SIZE / 2.5,
            lang[this.selectedLang].Presentation,
            25,
            0.5,
            0.5,
            0,
            500,
            null,
            this,
        );

        // Difficulté
        this.choix_diff = difficultes(this, lang[this.selectedLang].Difficultes);

        if (isNaN(PlayerProgression.difficulty)) PlayerProgression.difficulty = 1;

        this.choix_diff[PlayerProgression.difficulty].text.setShadow(0, 0, 'rgba(0, 0, 0, 1)', 5);
    }

    update(): void {
        // Retour au menu
        if (this.esc_key.isDown) this.game.state.start(Menu.NAME);

        // Démarrage du jeu
        if (this.space_key.isDown) this.game.state.start('Play');
    }

    choix(sprite) {
        if (!isNaN(sprite)) {
            if (sprite >= 0 && sprite < lang[this.selectedLang].Difficultes.length) {
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
