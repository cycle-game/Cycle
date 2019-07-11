import Phaser from 'phaser-ce';

import { BASE_SIZE } from '../variables';
import { Victory } from './victory';
import { Load } from './load';
import { Menu } from './menu';
import { Editor } from './editor';
import { Scores } from './scores';
import { Play } from './play';
import { Boot } from './boot';
import { Languages } from './languages';
import { RulesState } from './rules';

// Variable de jeu
export const game = new Phaser.Game(BASE_SIZE, BASE_SIZE, Phaser.CANVAS, 'cycleCanvas');

// Les états du jeu
game.state.add(Boot.NAME, new Boot());
game.state.add(Load.NAME, new Load());
game.state.add(Menu.NAME, new Menu());
game.state.add(RulesState.NAME, new RulesState());
game.state.add('Editor', Editor);
game.state.add('Play', Play);
game.state.add(Victory.NAME, new Victory());
game.state.add('Scores', Scores);
game.state.add(Languages.NAME, new Languages());

// Lancement
game.state.start(Boot.NAME);
