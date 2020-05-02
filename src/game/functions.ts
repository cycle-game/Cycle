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
    if (speed != null)
        context.game.add
            .tween(toReturn)
            .delay(delay)
            .to({ alpha: 1 }, speed)
            .start();

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

export function ecart(nombre: number, margingInPx: number) {
    const gameWidthInPx = BASE_SIZE - 2 * margingInPx;
    return Math.round(gameWidthInPx / (nombre - 1));
}

export type DifficultySelectorVM = { text: Phaser.Text; difficulty: number }[];

// Choix de la difficulté
export function difficultes(contexte, labels: string[]): DifficultySelectorVM {
    // Mise en place des difficultés
    const margingInPx = 100;
    const elementWidthInPx = ecart(labels.length, margingInPx);

    return labels.map((difficulty, index) => {
        const difficultyTextSprite = cliquable(
            margingInPx + elementWidthInPx * index,
            BASE_SIZE - platformSizeInPx,
            difficulty,
            25,
            0.5,
            0.5,
            0,
            500,
            contexte.choix,
            contexte,
        );
        difficultyTextSprite.data.difficulty = index;

        return {
            text: difficultyTextSprite,
            difficulty: index,
        };
    });
}
