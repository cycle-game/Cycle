import { BASE_SIZE, BLUE, platformSizeInPx } from './variables';
import Phaser from 'phaser-ce';

export function sociaux(Stats, pseudo, lng) {
    // Social network pre-share
}

export function save(Stats) {
    // Save score
}

export function toHigh(Stats, pseudo) {
    // Save high score
}

// Création d'un texte cliquable (ou non)
export function cliquable(
    x: number,
    y: number,
    text: string,
    taille: number,
    anchor_x: number,
    anchor_y: number,
    delay: number,
    speed: number,
    onDown: any,
    context: any,
): Phaser.Text {
    // Label
    const toReturn = (context.game as Phaser.Game).add.text(x, y, text, {
        font: taille + 'px Arial',
        fill: '#' + BLUE,
        align: 'center',
    });
    toReturn.anchor.setTo(anchor_x, anchor_y);
    toReturn.alpha = 0;

    // Animation
    if (speed != null) context.game.add.tween(toReturn).delay(delay).to({ alpha: 1 }, speed).start();

    // Inputs
    if (onDown != null) {
        toReturn.inputEnabled = true;
        toReturn.input.useHandCursor = true;
        toReturn.events.onInputDown.add(onDown, context);
    }

    return toReturn;
}

export function reset(Stats) {
    Stats.stage = 0;
    Stats.score = 0;
    Stats.difficulty = 1;
}
