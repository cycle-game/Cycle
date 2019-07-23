// On crée l'état du menu
import { cliquable, reset } from '../functions';
import { BASE_SIZE, platformSizeInPx, PlayerProgression } from '../variables';
import { LOGO_C, LOGO_C_MASK, LOGO_WITHOUT_C } from '../resoucesNames';
import { RulesState } from './rules';
import { i18nService } from '../../i18n/I18nService';

// Précédant les explications : choix entre editor et game
export class Menu extends Phaser.State {
    static NAME = Menu.prototype.constructor.name;

    private logo_c: Phaser.Sprite;

    constructor() {
        super();
    }

    create() {
        const play = cliquable(
            BASE_SIZE / 2,
            BASE_SIZE / 2.2,
            i18nService.translate('Jeu'),
            50,
            0.5,
            0.5,
            0,
            500,
            this.play,
            this,
        );
        const or = cliquable(
            BASE_SIZE / 2,
            BASE_SIZE / 1.5,
            i18nService.translate('Ou'),
            23,
            0.5,
            0.5,
            300,
            500,
            null,
            this,
        );
        const editor = cliquable(
            BASE_SIZE / 2,
            BASE_SIZE / 1.3,
            i18nService.translate('Editeur'),
            30,
            0.5,
            0.5,
            700,
            500,
            this.editor,
            this,
        );
        const come_back = cliquable(
            BASE_SIZE / 2,
            BASE_SIZE - platformSizeInPx,
            i18nService.translate('HowToBack'),
            18,
            0.5,
            1,
            1500,
            500,
            null,
            this,
        );
        const raz = cliquable(
            BASE_SIZE - platformSizeInPx,
            platformSizeInPx,
            i18nService.translate('RaZ'),
            25,
            1,
            0,
            200,
            250,
            this.raz,
            this,
        );
        const scores = cliquable(
            BASE_SIZE / 2,
            BASE_SIZE / 1.7,
            i18nService.translate('Scores'),
            27,
            0.5,
            0.5,
            200,
            250,
            this.scores,
            this,
        );

        this.logo_c = this.game.add.sprite(BASE_SIZE / 2 - 99, platformSizeInPx + 80, LOGO_C);
        this.logo_c.anchor.setTo(0.5, 0.5);
        const logo_c_cache = this.game.add.sprite(BASE_SIZE / 2 - 99, platformSizeInPx + 5, LOGO_C_MASK);
        logo_c_cache.anchor.setTo(0.5, 0);
        const logo = this.game.add.sprite(BASE_SIZE / 2, platformSizeInPx, LOGO_WITHOUT_C);
        logo.anchor.setTo(0.5, 0);
    }
    raz() {
        reset(PlayerProgression);
        this.game.state.start(Menu.NAME);
    }
    scores() {
        this.game.state.start('Scores');
    }
    play() {
        this.game.state.start(RulesState.NAME);
    }
    editor() {
        this.game.state.start('Editor');
    }
    update() {
        // Animate logo
        this.logo_c.angle += 0.7;
    }
}
