import { YELLOW } from '../variables';
import { game } from './game';
import { LOADER_EMPTY, LOADER_FULL } from './resoucesNames';

export const Boot = {
    preload: () => {
        // Couleur de fond
        game.stage.setBackgroundColor(YELLOW);

        // Images pour le loader
        game.load.image(LOADER_FULL, 'Ressources/Phaser/loader-full.png');
        game.load.image(LOADER_EMPTY, 'Ressources/Phaser/loader-empty.png');
    },
    create: () => {
        // On passe à l'état de chargement
        game.state.start('Load');
    },
};
