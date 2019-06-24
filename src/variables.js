export const c = 600; // Sera la variable de base, mais on dézoomera dans certains niveau
export const sound = true;
export const dead = 0;
export const bleu = '040c4b';
export const jaune = 0xfbf3b4;
export const lang = {};

// -- \\

export const hauteur = 10;

export const alph = 0.5;
export const inac = 0.05;
export const type = 'plat';
export const invert_redim = 1;

export const pi180 = Math.PI / 180;
export const pi180_invers = 1 / pi180;

export const edited_lvl = {};

// -- \\

// Level actuel
export const Stats = { level: 0, score: 0, diff: 1 };
// 4 types de difficultés :
// _ 0 = facile
// _ 1 = normal
// _ 2 = difficile
// _ 3 = inhumain

export let nb_tours = 0;
export const nb_etoiles = 0;

export const cplan = c / 1.8;
/* Positions des plateformes
// (taille de la planête = c/3)
export const c_gen = ( (cplan - c/6) / 4 );
export const c1 = c_gen * 3;
export const c2 = c_gen * 2;
export const c3 = c_gen * 1;
*/
// Vitesse de rotation
export const rotat = 2;
export let nuit_rotat = 1.3;
export const nuit_rotat_diff = [0.9, 1.1, 1.3];
export const nuit_depart = -10;
//export const vrotate = 1.5;
//export const pre_calcul_dplct = (vrotate * 360) / 2 * Math.PI;
// Scale
export const s = 1;
export const s_invers = 1 / s;

// Taille des plateformes
export const plataille = 20;

// FPS
export const fps_adapt = 1;
export const fps_array = [];

// Animation de fin et de début
export const anim = true;

//export const enregistrement = false;

// -- \\

export const pseudo = '';
