// On crée l'état du menu
import { cliquable, reset } from '../functions';
import { BASE_SIZE, platformSizeInPx, Stats } from '../variables';
import { lang } from '../i18n';
import { selectedLang } from './langue';
import { LOGO_C, LOGO_C_MASK, LOGO_WITHOUT_C } from '../resoucesNames';
import { ExplainState } from './explain';

// Précédant les explications : choix entre editor et game
export class Menu extends Phaser.State {
    static NAME = Menu.prototype.constructor.name;

    private logo_c: Phaser.Sprite;

    create() {
        const play = cliquable(
            BASE_SIZE / 2,
            BASE_SIZE / 2.2,
            lang[selectedLang].Jeu,
            50,
            0.5,
            0.5,
            0,
            500,
            this.play,
            this,
        );
        const or = cliquable(BASE_SIZE / 2, BASE_SIZE / 1.5, lang[selectedLang].Ou, 23, 0.5, 0.5, 300, 500, null, this);
        const editor = cliquable(
            BASE_SIZE / 2,
            BASE_SIZE / 1.3,
            lang[selectedLang].Editeur,
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
            lang[selectedLang].HowToBack,
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
            lang[selectedLang].RaZ,
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
            lang[selectedLang].Scores,
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
        reset(Stats);
        this.game.state.start(Menu.NAME);
    }
    scores() {
        this.game.state.start('Scores');
    }
    play() {
        this.game.state.start(ExplainState.NAME);
    }
    editor() {
        this.game.state.start('Edit');
    }
    update() {
        // Animate logo
        this.logo_c.angle += 0.7;
    }
}
