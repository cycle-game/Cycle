import Phaser from 'phaser-ce';

import { BASE_SIZE } from '../variables';
import { Victoire } from './victoire';
import { Load } from './load';
import { Menu } from './menu';
import { Edit } from './edit';
import { Scores } from './scores';
import { Play } from './play';
import { Boot } from './boot';
import { Langue } from './langue';
import { ExplainState } from './explain';

// Variable de jeu
export const game = new Phaser.Game(BASE_SIZE, BASE_SIZE, Phaser.CANVAS, 'cycleCanvas');

// Les états du jeu
game.state.add(Boot.NAME, new Boot());
game.state.add('Load', Load);
game.state.add('Menu', Menu);
game.state.add('Explain', new ExplainState());
game.state.add('Edit', Edit);
game.state.add('Play', Play);
game.state.add('Victoire', Victoire);
game.state.add('Scores', Scores);
game.state.add('Langue', Langue);

// Lancement
game.state.start(Boot.NAME);
