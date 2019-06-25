import { jaune } from '../variables';
import { game } from './game';

export const Boot = {
    preload: () => {
        // Couleur de fond
        game.stage.setBackgroundColor(jaune);

        // Images pour le loader
        game.load.image('load_plein', 'Ressources/Phaser/LoaderPlein.png');
        game.load.image('load_vide', 'Ressources/Phaser/LoaderVide.png');
    },
    create: () => {
        // On passe à l'état de chargement
        game.state.start('Load');
    },
};
