import { cliquable, reset, save, sociaux, toHigh } from '../functions';
import { BASE_SIZE, pseudo as pseudoVar, Stats } from '../variables';
import Phaser from 'phaser';
import { lang } from '../i18n';
import { lang as selectedLang } from './langue';

let pseudo = pseudoVar;

export const Victoire = {
    create: function() {
        var label = cliquable(
            BASE_SIZE / 2,
            BASE_SIZE / 4,
            lang[selectedLang].Victoire + '\n\n' + Math.round(Stats.score),
            25,
            0.5,
            0.5,
            0,
            500,
            null,
            this,
        );

        var enter_pseudo = cliquable(
            BASE_SIZE / 2,
            BASE_SIZE / 2,
            lang[selectedLang].Pseudo,
            25,
            0.5,
            0.5,
            300,
            500,
            null,
            this,
        );

        this.pseudo = cliquable(BASE_SIZE / 2, (BASE_SIZE / 4) * 3, pseudo + '_', 25, 0.5, 0.5, 0, 500, null, this);

        // Retour au menu
        this.esc_key = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);

        // Clavier
        this.game.input.keyboard.addCallbacks(this, this.tape);

        // Retourw
        var back = this.game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);

        save({ level: 0, score: 0, diff: Stats.diff });
    },
    addToPseudo: function(letter) {
        // Écriture du pseudo

        if (pseudo.length <= 16) pseudo = pseudo + letter;

        if (pseudo.length < 16) this.pseudo.text = pseudo + '_';
        else this.pseudo.text = pseudo;
    },
    tape: function(evt) {
        if (evt.which == Phaser.Keyboard.BACKSPACE) {
            // deleteToPseudo
            if (pseudo.length > 0) {
                pseudo = pseudo.slice(0, -1);
                this.pseudo.text = pseudo + '_';
            }

            return;
        }

        if (evt.which == Phaser.Keyboard.ENTER) {
            if (pseudo.length > 0) {
                toHigh(Stats, pseudo);
                sociaux(Stats, pseudo, lang);
                reset(Stats);
                this.game.state.start('Scores');
            }

            return;
        }

        // http://www.html5gamedevs.com/topic/4068-text-input-from-users-in-phaser/
        if (evt.which < 'A'.charCodeAt(0) || evt.which > 'Z'.charCodeAt(0)) {
            //console.log( "Not a letter: ", evt.which );
            return;
        }

        var letter = String.fromCharCode(evt.which);
        if (!evt.shiftKey) letter = letter.toLowerCase();

        this.addToPseudo(letter);
    },
    update: function() {
        // Retour au menu
        if (this.esc_key.isDown) {
            reset(Stats);
            this.game.state.start('Menu');
        }
    },
};
