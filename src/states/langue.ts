import { BASE_SIZE } from '../variables';
import { game } from './game';
import { LANG, LANG_SELECTOR } from '../resoucesNames';
import { EN, FR } from '../i18n';
import { Menu } from './menu';

export let selectedLang;

export class Langue extends Phaser.State {
    static NAME = Langue.prototype.constructor.name;

    private langSelector: Phaser.Sprite;

    create() {
        const langSprite = game.add.sprite(0, 0, LANG);
        langSprite.inputEnabled = true;
        langSprite.input.useHandCursor = true;

        this.langSelector = game.add.sprite(0, 0, LANG_SELECTOR);
        this.langSelector.blendMode = PIXI.blendModes.DIFFERENCE;
    }

    update() {
        const x_pointer = game.input.x;

        if (x_pointer <= BASE_SIZE / 2) this.langSelector.x = 0;
        else this.langSelector.x = BASE_SIZE / 2;

        if (game.input.mousePointer.isDown) {
            if (x_pointer <= BASE_SIZE / 2) selectedLang = FR;
            else selectedLang = EN;

            game.state.start(Menu.NAME);
        }
    }
}
