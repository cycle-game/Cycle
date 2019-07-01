import { BASE_SIZE } from '../variables';
import { game } from './game';
import { LANG, LANG_SELECTOR } from '../resoucesNames';

export let lang;

export const Langue = {
    create: () => {
        lang = game.add.sprite(0, 0, LANG);

        // Handcursor
        lang.inputEnabled = true;
        lang.input.useHandCursor = true;

        this.cache = game.add.sprite(0, 0, LANG_SELECTOR);
        // @ts-ignore
        this.cache.blendMode = PIXI.blendModes.DIFFERENCE;
    },

    update: () => {
        // Position de la souris
        var x_pointer = game.input.x;
        var y_pointer = game.input.y;

        // Changement de position du cache (inversant les couleurs)
        if (x_pointer <= BASE_SIZE / 2) this.cache.x = 0;
        else this.cache.x = BASE_SIZE / 2;

        // Au clique ...
        if (game.input.mousePointer.isDown) {
            if (x_pointer <= BASE_SIZE / 2) lang = 'fr';
            else lang = 'en';

            game.state.start('Menu');
        }
    },
};
