import { BLUE, BASE_SIZE, edited_lvl, pi180, plataille, Stats } from '../variables';
import { average, reset, save } from '../functions';
import { stages } from '../stages';
import Phaser from 'phaser';
import { game } from './game';
import { NIGHT_MASK, PLANET, PLATFORM, PLAYER, SELECTOR, STAR, TRAP } from '../resoucesNames';
import { lang } from '../i18n';
import { lang as selectedLang } from './langue';

const cplan = BASE_SIZE / 1.8;
let nb_tours = 0;
let nb_etoiles = 0;

// rotation speed
const rotat = 2;
let nuit_rotat = 1.3;
const nuit_rotat_diff = [0.9, 1.1, 1.3];
const nuit_depart = -10;

// Scale
let s = 1;
let s_invers = 1 / s;

// FPS
let fps_adapt = 1;
const fps_array = [];

let isLevelPlaying = false;

// Attention,  ici on a une grosse partie du jeu
// C'est l'état (state) où tout les niveaux seront
// mis en place.
export const Play = {
    create: function() {
        this.game.paused = true;
        // /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\
        // Il faut modifier phaser.js pour ajouter  \\
        // if (!this._bindings) return;                \\
        // Avant                                    \\
        // var n = this._bindings.length;            \\
        // /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\

        // ------------------------------------------------------------------ //
        // ------------------------------------------------------- Difficulté //

        if (Stats.diff < 3) {
            nuit_rotat = nuit_rotat_diff[Stats.diff];
        } else {
            nuit_rotat = nuit_rotat_diff[nuit_rotat_diff.length - 1];
        }

        // ------------------------------------------------------------------ //
        // ------------------------------------------------------------------ //
        // ------------------------------------------------------------------ //
        // --------------------------------------------------- Sauvegarde PHP //

        save(Stats);

        // ------------------------------------------------------------------ //
        // ------------------------------------------------------------------ //
        // ------------------------------------------------------------------ //
        // ------------------------------------------------------------ Pause //

        const pause = this.game.input.keyboard.addKey(Phaser.Keyboard.P);
        pause.onDown.add(function() {
            if (this.game.paused == true) this.game.paused = false;
            else this.game.paused = true;
        });

        // ------------------------------------------------------------------ //
        // ------------------------------------------------------------------ //
        // ------------------------------------------------------------------ //
        // ----------------------------------------- Comptabilisation des fps //

        this.game.time.advancedTiming = true;

        this.game.time.events.loop(Phaser.Timer.SECOND, this.fpsAdapt, this);

        if (Stats.diff >= 3) this.fps_moy = 2;
        else this.fps_moy = 10;

        // ------------------------------------------------------------------ //
        // ------------------------------------------------------------------ //
        // ------------------------------------------------------------------ //
        // ----------------------------------------- Lancement de la physique //

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // ------------------------------------------------------------------ //
        // ------------------------------------------------------------------ //
        // ------------------------------------------------------------------ //
        // ---------------------------------------- Ecouteur pour les touches //

        if (!this.space_key) {
            this.space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            this.gauche = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
            this.droite = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
            this.esc_key = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        }

        // ------------------------------------------------------------------ //
        // ------------------------------------------------------------------ //
        // ------------------------------------------------------------------ //
        // ------------------------- N-ième passage : suppression des sprites //

        nb_tours = 0;

        if (this.general) {
            for (let val in this.tweenTab) {
                this.tweenTab[val].stop();
            }

            this.general.destroy();
        }

        // ------------------------------------------------------------------ //
        // ------------------------------------------------------------------ //
        // ------------------------------------------------------------------ //
        // ---------------------------- On met en place un tableau des tweens //

        // Ceci afin de pouvoir stopper les tweens lors du restart
        this.tweenTab = [];

        // ------------------------------------------------------------------ //
        // ------------------------------------------------------------------ //
        // ------------------------------------------------------------------ //
        // ------------------------------------------------ Conteneur général //

        // this.game.world n'a aucun effet, tout comme this.game.camera
        // du coup on crée un groupe général pour pouvoir tout déplacer
        this.general = this.game.add.group();

        // Puisque tout est défini par rapport au centre, on applique le 0 à
        // la future position de la planête
        this.general.x = BASE_SIZE / 2;
        this.general.y = cplan;

        // Du coup on remplace tout les this.game.add.[..] par this.world.create

        // ------------------------------------------------------------------ //
        // ------------------------------------------------------------------ //
        // ------------------------------------------------------------------ //
        // ----------------------------------------------------------- Labels //

        this.label_lvl = this.game.add.text(
            0,
            -plataille,
            Stats.level + 1,
            {
                font: '30px Arial',
                fill: '#' + BLUE,
                align: 'center',
            },
            this.general,
        );
        this.label_lvl.anchor.setTo(0.5, 0.5);
        this.label_score = this.game.add.text(
            0,
            +plataille,
            Stats.score,
            {
                font: '20px Arial',
                fill: '#' + BLUE,
                align: 'center',
            },
            this.general,
        );
        this.label_score.anchor.setTo(0.5, 0.5);

        // ------------------------------------------------------------------ //
        // ------------------------------------------------------------------ //
        // ------------------------------------------------------------------ //
        // -------------------------------------- Sprites des éléments en mvt //

        // Groupe
        this.planete = this.game.add.group(this.general);
        //this.planete.x = BASE_SIZE/2; this.planete.y = cplan;

        // Le sprite de la planete
        this.plnte = this.planete.create(0, 0, PLANET);
        this.plnte.anchor.set(0.5);

        // Hey, j'ai entendu dire que t'aimais les groupes, donc j'ai mis
        // un groupe dans un groupe
        this.plateformes = this.game.add.group(this.planete);

        // On lance la fonction qui va créer les plateformes
        let maxPlat = this.makePlateformes();

        // Étoiles
        this.etoiles = this.game.add.group(this.planete);
        this.makeEtoiles();

        // Pièges
        this.pieges = this.game.add.group(this.planete);
        this.makePiegesMWAHAHAHAHA();

        // ------------------------------------------------------------------ //
        // ------------------------------------------------------------------ //
        // ------------------------------------------------------------------ //
        // ----------------------------------------------- Gestion de la nuit //

        // On met la nuit en dehors de la planete (rotation calculée by hand)
        //this.nuit = this.planete.create(0, 0, NIGHT_MASK);
        this.nuit = this.general.create(0, 0, NIGHT_MASK);
        this.nuit.anchor.set(0.5, 0);
        this.nuit.angle = nuit_depart; // Rotation de départ
        // @ts-ignore
        this.nuit.blendMode = PIXI.blendModes.DIFFERENCE; // Inverse les couleurs

        // ------------------------------------------------------------------ //
        // ------------------------------------------------------------------ //
        // ------------------------------------------------------------------ //
        // ------------------------------------------------------- Personnage //

        this.dude = this.general.create(0, -BASE_SIZE / 3, PLAYER);
        this.dude.anchor.set(0.5);

        // Ici on crée un groupe de test, pour prédir si le perso touchera une
        // plateforme à la prochaine rotation
        this.dudeTest = this.game.add.group(this.general);

        // Rotation gauche et droite
        const dudeT1 = this.dudeTest.create(0, 0, SELECTOR);
        const dudeT2 = this.dudeTest.create(0, 0, SELECTOR);

        // L'ancre est en haut au milieu, car le body du sprite 'dude' est placé
        // en haut à gauche (on s'intéresse pas à la position x)
        dudeT1.anchor.set(0.5, 0);
        dudeT1.alpha = 0;
        dudeT2.anchor.set(0.5, 0);
        dudeT2.alpha = 0;
        // La rotation est effectuée plus bas

        // ------------------------------------------------------------------ //
        // ------------------------------------------------------------------ //
        // ------------------------------------------------------------------ //
        // --------------------------------------------------------- Physique //

        this.game.physics.enable([this.dude, this.planete, this.dudeTest], Phaser.Physics.ARCADE);

        this.dude.body.gravity.y = 1000;
        //this.dude.body.collideWorldBounds = true;
        this.plnte.body.immovable = true;

        // Maintenant il faut que toutes les plateformes soient immobiles
        // (on a pas besoin de les activer en physique, car elle font partie
        // de this.planete)
        this.plateformes.forEachAlive(function(c) {
            c.body.immovable = true;
        }, this);

        this.etoiles.forEachAlive(function(c) {
            c.body.angularVelocity = Math.round(Math.random() * 400) + 100;
        }, this);

        // ------------------------------------------------------------------ //
        // ------------------------------------------------------------------ //
        // ------------------------------------------------------------------ //
        // -------------------------------------------------------- Animation //

        // Dans le cas où c'est le premier passage, petite animation posée
        if (!isLevelPlaying) {
            this.dude.scale = { x: 1, y: 0.01 };
            this.dude.body.gravity.y = 0;

            const t = this.game.add
                .tween(this.dude.scale)
                .to({ x: 1, y: 1 }, 350)
                .start();
            t.onComplete.add(function() {
                this.dude.body.gravity.y = 1000;
                isLevelPlaying = true;
            }, this);
        }

        // ------------------------------------------------------------------ //
        // ------------------------------------------------------------------ //
        // ------------------------------------------------------------------ //
        // ---------------------------------------- Prédictions de collisions //

        // On place les pivots des prédicteurs par rapport au perso
        dudeT1.pivot.y = cplan - this.dude.body.y;
        dudeT2.pivot.y = cplan - this.dude.body.y;

        /*dudeT1.angle = pre_calcul_dplct * (1/ (cplan - this.dude.body.y));
    dudeT2.angle = -pre_calcul_dplct * (1/ (cplan - this.dude.body.y));*/
        dudeT1.angle = rotat;
        dudeT2.angle = -rotat;

        // ------------------------------------------------------------------ //
        // ------------------------------------------------------------------ //
        // ------------------------------------------------------------------ //
        // ------------------------------------------------ Redimensionnement //

        maxPlat = (maxPlat + plataille + this.dude.body.height) * 2;

        if (maxPlat >= BASE_SIZE) this.redimensionne(BASE_SIZE / maxPlat);
        else this.redimensionne(1);

        // ------------------------------------------------------------------ //
        // ------------------------------------------------------------------ //
        // ------------------------------------------------------------------ //
        // ----------------------------------------------- Back to the editor //

        if (edited_lvl.edited) {
            this.goBack = game.add.text(plataille, plataille, lang[selectedLang].Retour);
            this.goBack.anchor.setTo(0, 0);

            this.goBack.inputEnabled = true;
            this.goBack.input.useHandCursor = true;
            this.goBack.events.onInputDown.add(function() {
                this.game.state.start('Edit');
            }, this);
        }

        // ------------------------------------------------------------------ //
        // ------------------------------------------------------------------ //
        // ------------------------------------------------------------------ //

        this.game.paused = false;
    },
    tours: function(angle) {
        // Comptabilisation du nombre de tour. Si on fait + %360°, le tour est
        // ajouté, et on ne peut plus redescendre.

        if (Math.round(-(angle - 180) / 360) > nb_tours) nb_tours = Math.round(-(angle - 180) / 360);

        return 20 * (nb_tours - 1);
    },
    fpsAdapt: function() {
        // Permet de ne pas ralentir le jeu (du moins, au minimum), lorsqu'il
        // y a une perte d'images par seconde

        let fps = this.game.time.fps;

        // Rajout d'une difficulté : en mode hardcore (3), on change la vitesse
        if (Stats.diff >= 3) fps += Math.round((Math.random() - 0.5) * 55);

        if (fps > 0) fps_array.push(fps);

        if (fps_array.length > this.fps_moy) fps_array.shift();

        if (fps_array.length > 1) fps_adapt = 60 / average(fps_array);

        //console.log(fps_array);
        console.log(fps_adapt);
    },
    update: function() {
        // ----------- Condition pour l'animation début-fin //
        if (isLevelPlaying) {
            // ------------------------------------------------ //

            // ------------------------------------------------------------------ //
            // ------------------------------------------------------------ Score //

            this.label_score.text = Math.round(Stats.score + this.tours(this.planete.angle));
            Stats.score += 0.05;

            // ------------------------------------------------------------------ //
            // ------------------------------------------------------------------ //
            // ------------------------------------------------------------------ //
            // ------------------------------------------- Collisions et overlaps //

            // Sur la planete
            /*var collid = */
            this.game.physics.arcade.collide(this.dude, this.plnte);
            // Sur la plateforme
            /*var onPlt = */
            this.game.physics.arcade.collide(this.dude, this.plateformes);

            // Overlap sur les plateformes avec les prédicteurs de position
            const overlap_right = this.game.physics.arcade.overlap(this.dudeTest.getAt(0), this.plateformes);
            const overlap_left = this.game.physics.arcade.overlap(this.dudeTest.getAt(1), this.plateformes);

            this.game.physics.arcade.overlap(this.dude, this.etoiles, this.takeEtoiles, null, this);

            // ------------------------------------------------------------------ //
            // ------------------------------------------------------------------ //
            // ------------------------------------------------------------------ //
            // --------------------------------------------------------- Rotation //

            if (this.gauche.isDown && !overlap_left) {
                //var tmp = pre_calcul_dplct * (1/ (cplan - this.dude.body.y));

                this.planete.angle += rotat * fps_adapt;
                this.dude.scale.x = -1;
                this.nuit.angle += (rotat + nuit_rotat) * fps_adapt;
            } else if (this.droite.isDown && !overlap_right) {
                //var tmp = pre_calcul_dplct * (1/ (cplan - this.dude.body.y));
                this.planete.angle -= rotat * fps_adapt;
                this.dude.scale.x = 1;
                this.nuit.angle += (-rotat + nuit_rotat) * fps_adapt;
            } else this.nuit.angle += nuit_rotat * fps_adapt;

            // ------------------------------------------------------------------ //
            // ------------------------------------------------------------------ //
            // ------------------------------------------------------------------ //
            // ------------------------------------------------------------- Saut //

            if (this.space_key.isDown && this.dude.body.touching.down) this.dude.body.velocity.y = -450;

            // ------------------------------------------------------------------ //
            // ------------------------------------------------------------------ //
            // ------------------------------------------------------------------ //
            // -------------------------------------- Déplacement des prédicteurs //

            this.dudeTest.forEachAlive(function(c) {
                // Impossible à faire marcher?!
                //BASE_SIZE.pivot.y = (cplan - (this.dude.body.y - this.dude.body.height * (s_invers)) );
                c.pivot.y = -this.dude.y + this.dude.height / 2;
            }, this);

            //console.log(this.dude.body.y+' '+this.dudeTest.getAt(0).pivot.y);

            // ------------------------------------------------------------------ //
            // ------------------------------------------------------------------ //
            // ------------------------------------------------------------------ //
            // ------------------------------------------- Collision avec la nuit //

            // Pas besoin de physique, on regarde l'angle
            if (this.nuit.angle >= 87 || this.nuit.angle <= -87) {
                // Rajouter le côté droit
                this.create();
                Stats.score += this.tours(this.planete.angle) + 50;
            }

            // ------------------------------------------------------------------ //
            // ------------------------------------------------------------------ //
            // ------------------------------------------------------------------ //
            // ---------------------------------------- Collision avec les pièges //

            if (this.game.physics.arcade.overlap(this.dude, this.pieges)) {
                this.create();
                Stats.score += this.tours(this.planete.angle) + 50;
            }

            // ------------------------------------------------------------------ //
            // ------------------------------------------------------------------ //
            // ------------------------------------------------------------------ //
            // --------------------------------------------------- Retour au menu //

            if (this.esc_key.isDown) {
                /*
        Stats.score += this.tours(this.planete.angle) + 50;
        save(Stats);*/

                this.redimensionne(1);
                this.game.state.start('Menu');
            }

            // ------------------------------------------------------------------ //
            // ------------------------------------------------------------------ //

            // ----------- Condition pour l'animation début-fin //
        }
        // ------------------------------------------------ //
    },
    takeEtoiles: function(dude, etoile) {
        /* *  http://www.lessmilk.com/games/10/ */
        /* */
        if (!etoile.alive) return;
        /* */
        /* */
        etoile.alive = false;
        /* */
        var t = this.game.add
            .tween(etoile.scale)
            .to({ x: 0, y: 0 }, 300)
            .start();
        /* */
        t.onComplete.add(function() {
            this.kill();
        }, etoile);

        // On rajoute le tween au tableau, histoire de pouvoir le stopper
        this.tweenTab.push(t);

        // Comptabilisation du nombre d'étoile restante
        nb_etoiles -= 1;

        if (nb_etoiles <= 0) {
            // Lorsqu'on a atteint 0, on revient à l'éditeur ou on passe
            // au niveau suivant/écran de victoire

            Stats.level += 1;

            // ------------- Animation de fin de niveau //
            this.dude.body.gravity.y = 0;
            isLevelPlaying = false;
            var t = this.game.add
                .tween(this.dude.scale)
                .to({ x: 1, y: 0.01 }, 200)
                .start();
            t.onComplete.add(function() {
                // ------------ ----- Changement d'état //
                if (edited_lvl.edited)
                    // On vient de l'editeur
                    this.game.state.start('Edit');
                else {
                    if (Stats.level >= stages.length) {
                        this.redimensionne(1);
                        this.game.state.start('Victoire');
                    } else this.game.state.start('Play');
                }
                // ------------ ----------------------- //
            }, this);
            // ---------------------------------------- //
        }
    },
    redimensionne: function(news) {
        // Redimensionnement en fonction de la hauteur du jeu (rayon)

        s = news;
        s_invers = 1 / s;

        // Malheureusement une grosse partie de la physique du jeu ne se
        // redimensionne pas toute seule :/

        this.game.camera.scale.y = s;
        this.game.camera.scale.x = s;

        // Pour des raisons inconnus, le dplct de la caméra ne fctne pas
        //this.game.camera.setPosition(100, 100);
        //this.game.camera.x = 300;
        //this.game.camera.y = 300;
        //this.game.camera.focusOnXY(300,300);
        // Du coup on met en place le supergroup this.general
        this.general.x += (BASE_SIZE * s_invers * (1 - s)) / 2;
        this.general.y += (BASE_SIZE * s_invers * (1 - s)) / 2;

        // Les corps ne sont pas à jour :(
        this.dude.body.setSize(this.dude.body.width * s, this.dude.body.height * s, 0, 0);
        this.plnte.body.setSize(this.plnte.body.width * s, this.plnte.body.height * s, 0, 0);

        this.plateformes.forEachAlive(function(c) {
            c.body.setSize(c.body.width * s, c.body.height * s, 0, 0);
        }, this);
        this.dudeTest.forEachAlive(function(c) {
            c.body.setSize(c.body.width * s, c.body.height * s, 0, 0);
        }, this);
    },
    makePlateformes: function() {
        // Création des sprites par rapport aux données des niveaux
        let plateformes;
        // En fonction on est en édition ou on est en jeu ..
        if (edited_lvl.edited) plateformes = edited_lvl.plateformes;
        else if (stages[Stats.level])
            // Vérification de l'existence du level
            plateformes = stages[Stats.level].plateformes;
        else {
            // S'il n'existe pas il y a une erreur; reboot du début
            plateformes = stages[0].plateformes;
            reset(Stats);
        }

        // Hauteur maximale des plateformes
        let maxPlat = 0;

        // Parcourt des plateformes
        for (let val in plateformes) {
            // On déplace une partie de la trigo ici (gain de temps)
            const cx = plateformes[val][1] * plataille;

            const rayon = BASE_SIZE / 6 + cx;

            // -------------------------------------------------------------- //
            /* -------- Ces calculs ont été déplacé dans l'éditeur de niveau

      var perimetre = rayon * Math.PI * 2;

      // On regarde combien on a de plateformes par tour de cercle
      var nbr_plat = Math.round(perimetre / plataille);

      // Ce qui donne un espacement en degrée de ...
      var deg = 360 / nbr_plat;

      // Parcourt de la distance début-fin pour une plateforme
      for (var i = plateformes[val][0]; i < plateformes[val][1]; i += deg) {
          var tmp = this.placement(i, rayon);

          var plt = this.plateformes.create(tmp[0], tmp[1], PLATFORM);
          plt.anchor.set(0.5, 1);
          plt.angle = tmp[2];
      }*/
            // -------------------------------------------------------------- //

            // Positionnement et rotation
            const tmp = this.placement(plateformes[val][0], rayon);

            // Création de la plateforme
            const plt = this.plateformes.create(tmp[0], tmp[1], PLATFORM);
            plt.anchor.set(0.5, 1);
            plt.angle = tmp[2];

            // Plateforme la plus haute
            if (plateformes[val][1] > maxPlat) maxPlat = plateformes[val][1];
        }

        return maxPlat * plataille + BASE_SIZE / 6;
    },
    makeEtoiles: function() {
        // Même principe que makePlateformes
        let etoiles;
        if (edited_lvl.edited) etoiles = edited_lvl.etoiles;
        else etoiles = stages[Stats.level].etoiles;

        for (let val in etoiles) {
            const rayon = BASE_SIZE / 6 + etoiles[val][1] * plataille + plataille / 2;

            const tmp = this.placement(etoiles[val][0], rayon);

            const et = this.etoiles.create(tmp[0], tmp[1], STAR);
            et.anchor.set(0.6);
            et.angle = tmp[2];
        }

        nb_etoiles = this.etoiles.countLiving();
    },
    makePiegesMWAHAHAHAHA: function() {
        let pieges;
        // Même principe que makePlateformes

        if (edited_lvl.edited) {
            pieges = edited_lvl.pieges;
        } else {
            pieges = stages[Stats.level].pieges;
        }

        for (let val in pieges) {
            const rayon = BASE_SIZE / 6 + pieges[val][1] * plataille;

            const tmp = this.placement(pieges[val][0], rayon);

            const plt = this.pieges.create(tmp[0], tmp[1], TRAP);
            plt.anchor.set(0.5, 1);
            plt.angle = tmp[2];
        }
    },
    placement: function(degrees, rayon) {
        // ------------------------------------------------------------------ \\
        // On aurait pu utiliser les pivots, mais le rendu est beaucoup moins
        // bien (pivots ==> sprite.pivot.x)

        // On commence le level en haut au milieu.
        // Et pusiqu'on donne la variable en degrée ...
        const radian = (degrees - 90) * pi180;

        // Ainsi on obtient miraculeusement les valeurs x/y
        const pos_x = rayon * Math.cos(radian);
        const pos_y = rayon * Math.sin(radian);

        // ------------------------------------------------------------------ //

        // Maintenant on place la plateforme (dans le groupe des plateformes)
        return [pos_x, pos_y, degrees];
    },
    render: function() {
        //game.debug.cameraInfo(game.camera, 32, 32);
        //game.debug.spriteInfo(this.plateformes.getFirstAlive(), 32, 32);
        //game.debug.body(this.plnte);
        //game.debug.body(this.nuit);
        //game.debug.body(this.dude);
        /*
    this.plateformes.forEachAlive(function(BASE_SIZE){
        game.debug.body(BASE_SIZE);
    });
    */
        /*
    this.dudeTest.forEachAlive(function(BASE_SIZE){
        game.debug.body(BASE_SIZE);
    });
    */
        //game.debug.spriteCoords(this.dudeTest.getAt(0), 32, 300);
        //game.debug.spriteCoords(this.dude, 32, 200);
    },
};
