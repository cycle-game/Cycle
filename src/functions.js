/*facebook_share = function() {};

window.fbAsyncInit = function() {
FB.init({
  appId      : '762573653764635',
  xfbml      : true,
  version    : 'v2.0'
});

    facebook_share = function() {
         FB.ui(
              {
               method: 'share_open_graph',
                action_type: 'og.likes',
               name: 'And the amaaaziiiing name',
               caption: 'This is the amazing caption',
  action_properties: JSON.stringify({
      object:'http://cycle.ppersonne.fr/ScoreTest.php',
  }),
               description: (
                  'A small JavaScript library that allows you to harness ' +
                  'the power of Facebook, bringing the user\'s identity, ' +
                  'AMAZIIING.'
               ),
               link: 'http://cycle.ppersonne.fr',
               picture: 'http://cycle.ppersonne.fr/Ressources/Facebook/Logo_only.png'
              },
              function(response) {
                if (response && response.post_id) {
                  //alert('Post was published.');
                } else {
                  //alert('Post was not published.');
                }
              }
            );
        };
    
facebook_share();
    
};


(function(d, s, id){
 var js, fjs = d.getElementsByTagName(s)[0];
 if (d.getElementById(id)) {return;}
 js = d.createElement(s); js.id = id;
 js.src = "//connect.facebook.net/fr_FR/sdk.js";
 fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
*/

import { bleu, c, plataille } from './variables';
import { lang } from './Etats/load';

//http://forum.webrankinfo.com/equivalent-urlencode-javascript-t51434.html
export function urlencode(str) {
  return escape(str.replace(/%/g, '%25').replace(/\+/g, '%2B')).replace(/%25/g, '%');
}

// Pré-partage pour les réseaux sociaux
export function sociaux(Stats, pseudo, lng) {

  var url = 'http://cycle.ppersonne.fr/Score.php?pseudo=' + pseudo +
    '&lvl=' + Stats.level +
    '&score=' + Math.round(Stats.score) +
    '&diff=' + Stats.diff +
    '&langue=' + lng.Lang;

  document.getElementById('OnWall').setAttribute('href',
    'https://www.facebook.com/sharer/sharer.php?u=' + urlencode(url) +
    '&redirect_uri=http://cycle.ppersonne.fr');
  document.getElementById('ToFriends').setAttribute('href',
    'http://www.facebook.com/dialog/send?app_id=762573653764635&link=' +
    urlencode(url) + '&redirect_uri=http://cycle.ppersonne.fr');

  document.getElementById('ScoreSharing').className = "";
}

// Sauvegarde des scores
export function save(Stats) {

  var data = "lvl=" + Stats.level + "&score=" + Stats.score + "&diff=" + Stats.diff;

  var request = new XMLHttpRequest();
  request.open('POST', './BDD/Session.php', true);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      // Success!
    } else {
      // Error
    }
  };
  request.send(data);
}

// Sauvegarde du (high)score
export function toHigh(Stats, pseudo) {

  var data = "lvl=" + Stats.level + "&score=" + Math.round(Stats.score) + "&pseudo=" + pseudo + "&diff=" + Stats.diff;

  var request = new XMLHttpRequest();
  request.open('POST', './BDD/HighScore.php', false);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      // Success!
      console.log(request)
    } else {
      // Error
    }
  };
  request.send(data);

}

export function scores() {

  var request = new XMLHttpRequest();
  request.open('POST', './BDD/HighScore.php', false);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      // Success!
    } else {
      return null;
    }
  };
  request.send();
  // On peut retourner ça grâce à la désactivation de l'asynchrone
  return request.response;
}

// Average d'un tableau
export function average(tableau) {

  var sum = 0;

  for (var x = 0; x < tableau.length; x++) {
    sum += tableau[x];
  }

  return (sum / tableau.length);
}

// Création d'un texte cliquable (ou non)
export function cliquable(x, y, text, taille, anchor_x, anchor_y, delay, speed, onDown, context) {

  // Label
  var toReturn = context.game.add.text(x, y, text,
    {font: taille + 'px Arial', fill: '#' + bleu, align: 'center'});
  toReturn.anchor.setTo(anchor_x, anchor_y);
  toReturn.alpha = 0;

  // Animation
  if (speed != null)
    context.game.add.tween(toReturn).delay(delay).to({alpha: 1}, speed).start();

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

  var plan = c - 2 * marge;

  var ecart = Math.round(plan / (nombre - 1));

  return ecart;

}

// Choix de la difficulté
export function difficultes(contexte, Stats) {

  // Mise en place des difficultés
  var marge = 100;
  var espace = ecart(lang.Difficultes.length, marge);

  contexte.Stats = Stats;

  for (var i = 0; i < lang.Difficultes.length; i++) {
    contexte.choix_diff[i] = cliquable(marge + espace * i, c - plataille, lang.Difficultes[i], 25, 0.5, 0.5, 0, 500, choix, contexte);
    contexte.choix_diff[i].diff = i;
  }

}

export function choix(sprite) {

  if (!isNaN(sprite)) {

    if (sprite >= 0 && sprite < lang.Difficultes.length) {
      this.souligne(this.choix_diff[sprite]);
    }

    return;
  }

  this.souligne(sprite);
}
