import { BLUE, BASE_SIZE, platformSizeInPx } from './variables';
import { lang } from './i18n';
import { lang as selectedLang } from './states/langue';

export function sociaux(Stats, pseudo, lng) {
    // Social network pre-share
}

export function save(Stats) {
    // Save score
}

export function toHigh(Stats, pseudo) {
    // Save high score
}

export function scores() {
    // fetch scores
    return (
        'player1_easy::20::2' +
        '><' +
        'player2_easy::15::2' +
        '><' +
        'player3_easy::10::2' +
        '|||' +
        'player1_normal::30::3' +
        '><' +
        'player2_normal::20::3' +
        '><' +
        'player3_normal::10::3' +
        '|||' +
        'player1_hard::31::1' +
        '><' +
        'player2_hard::16::1' +
        '><' +
        'player3_hard::11::1' +
        '|||' +
        'player1_insane::30::1' +
        '><' +
        'player2_insane::15::1' +
        '><' +
        'player2_insane::10::1' +
        '|||'
    );
}

// Average d'un tableau
export function average(tableau) {
    var sum = 0;

    for (var x = 0; x < tableau.length; x++) {
        sum += tableau[x];
    }

    return sum / tableau.length;
}

// Création d'un texte cliquable (ou non)
export function cliquable(x, y, text, taille, anchor_x, anchor_y, delay, speed, onDown, context) {
    // Label
    var toReturn = context.game.add.text(x, y, text, { font: taille + 'px Arial', fill: '#' + BLUE, align: 'center' });
    toReturn.anchor.setTo(anchor_x, anchor_y);
    toReturn.alpha = 0;

    // Animation
    if (speed != null)
        context.game.add
            .tween(toReturn)
            .delay(delay)
            .to({ alpha: 1 }, speed)
            .start();

    var test = 2;

    // Inputs
    if (onDown != null) {
        toReturn.inputEnabled = true;
        toReturn.input.useHandCursor = true;
        toReturn.events.onInputDown.add(onDown, context);
    }

    return toReturn;
}

export function reset(Stats) {
    Stats.level = 0;
    Stats.score = 0;
    Stats.diff = 1;
}

export function ecart(nombre, marge) {
    var plan = BASE_SIZE - 2 * marge;

    var ecart = Math.round(plan / (nombre - 1));

    return ecart;
}

// Choix de la difficulté
export function difficultes(contexte, Stats) {
    // Mise en place des difficultés
    var marge = 100;
    var espace = ecart(lang[selectedLang].Difficultes.length, marge);

    contexte.Stats = Stats;

    for (var i = 0; i < lang[selectedLang].Difficultes.length; i++) {
        contexte.choix_diff[i] = cliquable(
            marge + espace * i,
            BASE_SIZE - platformSizeInPx,
            lang[selectedLang].Difficultes[i],
            25,
            0.5,
            0.5,
            0,
            500,
            choix,
            contexte,
        );
        contexte.choix_diff[i].difficulty = i;
    }
}

export function choix(sprite) {
    if (!isNaN(sprite)) {
        if (sprite >= 0 && sprite < lang[selectedLang].Difficultes.length) {
            this.souligne(this.choix_diff[sprite]);
        }

        return;
    }

    this.souligne(sprite);
}
