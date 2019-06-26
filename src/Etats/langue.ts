import { c } from '../variables';
import { en, fr } from './levels';
import { game } from './game';
import { LANG } from './resoucesNames';

export let lang;

export const Langue = {
    create: () => {
        lang = game.add.sprite(0, 0, LANG);

        // Handcursor
        lang.inputEnabled = true;
        lang.input.useHandCursor = true;

        this.cache = game.add.sprite(0, 0, 'cache');
        // @ts-ignore
        this.cache.blendMode = PIXI.blendModes.DIFFERENCE;

        //this.fs = game.add.sprite(c/2, c/2, 'fs');
        //this.fs.blendMode = PIXI.blendModes.DIFFERENCE;

        //game.input.onDown.add(this.clickGeneral, this);
    },

    update: () => {
        // Position de la souris
        var x_pointer = game.input.x;
        var y_pointer = game.input.y;

        // Changement de position du cache (inversant les couleurs)
        if (x_pointer <= c / 2) this.cache.x = 0;
        else this.cache.x = c / 2;

        // Au clique ...
        if (game.input.mousePointer.isDown) {
            if (x_pointer <= c / 2) lang = fr;
            else lang = en;

            game.state.start('Menu');
        }

        //this.fs.x = x_pointer - 50;
        //this.fs.y = y_pointer - 50;
    },
};
