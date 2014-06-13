// Cycle || CC BY-NC 2.0 FR Rémi Perrot 2014
// https://creativecommons.org/licenses/by-nc/2.0/fr/

// Variable de jeu
var game = new Phaser.Game(c, c, Phaser.CANVAS, 'AinsiVientLeJeu');

// Les états du jeu
game.state.add('Boot', GameState.Boot);
game.state.add('Load', GameState.Load);
game.state.add('Menu', GameState.Menu);
game.state.add('Explain', GameState.Explain);
game.state.add('Edit', GameState.Edit);
game.state.add('Play', GameState.Play);
game.state.add('Victoire', GameState.Victoire);
game.state.add('Scores', GameState.Scores);
game.state.add('Langue', GameState.Langue);

// Lancement
game.state.start('Boot');
