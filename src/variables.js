var c = 600; // Sera la variable de base, mais on dézoomera dans certains niveau
var sound = true;
var dead = 0;
var bleu = "040c4b";
var jaune = 0Xfbf3b4;
var lang = {};

// -- \\

var hauteur = 10;

var alph = 0.5;
var inac = 0.05;
var type = "plat";
var invert_redim = 1;

var pi180 = Math.PI / 180;
var pi180_invers = 1 / pi180;

var edited_lvl = {};

// -- \\


// Level actuel
var Stats = {level: 0, score: 0, diff: 1};
// 4 types de difficultés :
// _ 0 = facile
// _ 1 = normal
// _ 2 = difficile
// _ 3 = inhumain

var nb_tours = 0;
var nb_etoiles = 0;

var cplan = c / 1.8;
/* Positions des plateformes
// (taille de la planête = c/3)
var c_gen = ( (cplan - c/6) / 4 );
var c1 = c_gen * 3;
var c2 = c_gen * 2;
var c3 = c_gen * 1;
*/
// Vitesse de rotation
var rotat = 2;
var nuit_rotat = 1.3;
var nuit_rotat_diff = [0.9, 1.1, 1.3];
var nuit_depart = -10;
//var vrotate = 1.5;
//var pre_calcul_dplct = (vrotate * 360) / 2 * Math.PI;
// Scale
var s = 1;
var s_invers = 1 / s;

// Taille des plateformes
var plataille = 20;

// FPS
var fps_adapt = 1;
var fps_array = [];

// Animation de fin et de début
var anim = true;

//var enregistrement = false;

// -- \\

var pseudo = "";
