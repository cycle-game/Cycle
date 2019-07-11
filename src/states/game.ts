import Phaser from 'phaser-ce';

import { BASE_SIZE } from '../variables';
import { Victoire } from './victoire';
import { Load } from './load';
import { Menu } from './menu';
import { Editor } from './editor';
import { Scores } from './scores';
import { Play } from './play';
import { Boot } from './boot';
import { Langue } from './langue';
import { ExplainState } from './explain';

// Variable de jeu
export const game = new Phaser.Game(BASE_SIZE, BASE_SIZE, Phaser.CANVAS, 'cycleCanvas');

// Les états du jeu
game.state.add(Boot.NAME, new Boot());
game.state.add(Load.NAME, new Load());
game.state.add(Menu.NAME, new Menu());
game.state.add(ExplainState.NAME, new ExplainState());
game.state.add('Editor', Editor);
game.state.add('Play', Play);
game.state.add(Victoire.NAME, new Victoire());
game.state.add('Scores', Scores);
game.state.add(Langue.NAME, new Langue());

// Lancement
game.state.start(Boot.NAME);
