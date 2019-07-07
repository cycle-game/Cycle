import Phaser from 'phaser-ce';
import { cliquable, difficultes, reset } from '../functions';
import { BASE_SIZE, Stats } from '../variables';
import { lang } from '../i18n';
import { lang as selectedLang } from './langue';

export class ExplainState extends Phaser.State {
    choix_diff: (Phaser.Text & { difficulty: number })[];
    private space_key: Phaser.Key;
    private esc_key: Phaser.Key;
    Stats: typeof Stats = null;

    create(): void {
        // Un équivalent d'écouteur d'évènement (si on veut)
        this.space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        // Retour au menu avec Échap
        this.esc_key = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);

        // Présentation du jeu
        cliquable(BASE_SIZE / 2, BASE_SIZE / 2.5, lang[selectedLang].Presentation, 25, 0.5, 0.5, 0, 500, null, this);

        // Difficulté
        this.choix_diff = [];
        difficultes(this);

        if (isNaN(Stats.difficulty)) Stats.difficulty = 1;

        this.choix_diff[Stats.difficulty].setShadow(0, 0, 'rgba(0, 0, 0, 1)', 5);
    }

    update(): void {
        // Retour au menu
        if (this.esc_key.isDown) this.game.state.start('Menu');

        // Démarrage du jeu
        if (this.space_key.isDown) this.game.state.start('Play');
    }

    souligne(sprite: any): void {
        for (var val in this.choix_diff) {
            this.choix_diff[val].setShadow(0, 0, 'rgba(0, 0, 0, 0)', 5);
        }

        sprite.setShadow(0, 0, 'rgba(0, 0, 0, 1)', 5);

        reset(Stats);
        Stats.difficulty = sprite.difficulty;
    }
}
