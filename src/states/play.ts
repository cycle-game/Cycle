import { BLUE, BASE_SIZE, edited_lvl, platformSizeInPx, Stats } from '../variables';
import { reset, save } from '../functions';
import { stages } from '../stages';
import Phaser from 'phaser-ce';
import { game } from './game';
import { NIGHT_MASK, PLANET, PLATFORM, PLAYER, SELECTOR, STAR, TRAP } from '../resoucesNames';
import { lang } from '../i18n';
import { lang as selectedLang } from './langue';
import { polarToCartesian } from '../utils/CoordonateSystem';
import { StageDefinition } from '../stages/StageDefinition';

import { mean } from 'lodash';

const cplan = BASE_SIZE / 1.8;
let nb_tours = 0;
let nb_etoiles = 0;

// rotation speed
const rotat = 2;
let nuit_rotat = 1.3;
const nuit_rotat_diff = [0.9, 1.1, 1.3];
const nuit_depart = -10;

// Scale
let zoom = 1;

// FPS
let fps_adapt = 1;
const fps_array = [];

let isLevelPlaying = false;

let currentStage: StageDefinition;

let trapsGroup: any;
let starsGroup: any;
// Attention,  ici on a une grosse partie du jeu
// C'est l'état (state) où tout les niveaux seront
// mis en place.
export const Play = {
    create: function() {
        if (edited_lvl.edited) {
            currentStage = edited_lvl;
        } else {
            currentStage = stages[Stats.stage];
        }

        currentStage = stages[Stats.stage];
        this.game.paused = true;
        // /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\
        // Il faut modifier phaser.js pour ajouter  \\
        // if (!this._bindings) return;                \\
        // Avant                                    \\
        // var n = this._bindings.length;            \\
        // /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\

        // ------------------------------------------------------------------ //
        // ------------------------------------------------------- Difficulté //

        if (Stats.difficulty < 3) {
            nuit_rotat = nuit_rotat_diff[Stats.difficulty];
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

        if (Stats.difficulty >= 3) this.fps_moy = 2;
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
            -platformSizeInPx,
            Stats.stage + 1,
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
            +platformSizeInPx,
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
        this.platforms = this.game.add.group(this.planete);

        // On lance la fonction qui va créer les plateformes
        let maxPlat = this.makePlateformes();

        // Étoiles
        starsGroup = this.game.add.group(this.planete);
        this.createAndDisplayStars();

        // Pièges
        trapsGroup = this.game.add.group(this.planete);
        this.createAndDisplayTraps();

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

        // Maintenant il faut que toutes les platforms soient immobiles
        // (on a pas besoin de les activer en physique, car elle font partie
        // de this.planete)
        this.platforms.forEachAlive(function(c) {
            c.body.immovable = true;
        }, this);

        starsGroup.forEachAlive(function(c) {
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

        maxPlat = (maxPlat + platformSizeInPx + this.dude.body.height) * 2;

        if (maxPlat >= BASE_SIZE) this.zoom(BASE_SIZE / maxPlat);
        else this.zoom(1);

        // ------------------------------------------------------------------ //
        // ------------------------------------------------------------------ //
        // ------------------------------------------------------------------ //
        // ----------------------------------------------- Back to the editor //

        if (edited_lvl.edited) {
            this.goBack = game.add.text(platformSizeInPx, platformSizeInPx, lang[selectedLang].Retour);
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
        if (Stats.difficulty >= 3) fps += Math.round((Math.random() - 0.5) * 55);

        if (fps > 0) fps_array.push(fps);

        if (fps_array.length > this.fps_moy) fps_array.shift();

        if (fps_array.length > 1) fps_adapt = 60 / mean(fps_array);

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
            this.game.physics.arcade.collide(this.dude, this.platforms);

            // Overlap sur les plateformes avec les prédicteurs de position
            const overlap_right = this.game.physics.arcade.overlap(this.dudeTest.getAt(0), this.platforms);
            const overlap_left = this.game.physics.arcade.overlap(this.dudeTest.getAt(1), this.platforms);

            this.game.physics.arcade.overlap(this.dude, starsGroup, this.takeEtoiles, null, this);

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

            if (this.game.physics.arcade.overlap(this.dude, trapsGroup)) {
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

                this.zoom(1);
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

            Stats.stage += 1;

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
                    if (Stats.stage >= stages.length) {
                        this.zoom(1);
                        this.game.state.start('Victoire');
                    } else this.game.state.start('Play');
                }
                // ------------ ----------------------- //
            }, this);
            // ---------------------------------------- //
        }
    },
    zoom: function(zoomFactor) {
        // Scale the game canvas according to game height (radius)
        // /!\ this function must be called only one time, as it computes
        //     size according to object width and height, and changes them

        zoom = zoomFactor;
        const multiplier = 1 / zoom;

        // Graphical zoom
        this.game.camera.scale.y = zoom;
        this.game.camera.scale.x = zoom;

        // Centering
        this.general.x += (BASE_SIZE * multiplier * (1 - zoom)) / 2;
        this.general.y += (BASE_SIZE * multiplier * (1 - zoom)) / 2;

        // Physical zoom
        // Bodies keep their size as if camera.scale had no effect. It has
        // to be computed manually
        this.setBodySize(this.dude, zoom);
        this.setBodySize(this.plnte, zoom);
        this.platforms.forEachAlive(platform => this.setBodySize(platform, zoom), this);
        this.dudeTest.forEachAlive(dudeT => this.setBodySize(dudeT, zoom, null, 0), this);
    },
    setBodySize: function(sprite, zoomFactor: number, xOff: number = null, yOff: number = null) {
        const bodyWidth = sprite.body.width * zoomFactor;
        const bodyHeight = sprite.body.height * zoomFactor;

        const xOffset = xOff === null ? (sprite.body.width - bodyWidth) / 2 : xOff;
        const yOffset = yOff === null ? (sprite.body.height - bodyHeight) / 2 : yOff;

        sprite.body.setSize(bodyWidth, bodyHeight, xOffset, yOffset);
    },
    makePlateformes: function() {
        // Création des sprites par rapport aux données des niveaux
        let plateformes;
        // En fonction on est en édition ou on est en jeu ..
        if (edited_lvl.edited) plateformes = edited_lvl.platforms;
        else if (stages[Stats.stage])
            // Vérification de l'existence du level
            plateformes = stages[Stats.stage].platforms;
        else {
            // S'il n'existe pas il y a une erreur; reboot du début
            plateformes = stages[0].platforms;
            reset(Stats);
        }

        // Hauteur maximale des plateformes
        let maxPlat = 0;

        // Parcourt des plateformes
        for (let val in plateformes) {
            // On déplace une partie de la trigo ici (gain de temps)
            const cx = plateformes[val][1] * platformSizeInPx;

            const rayon = BASE_SIZE / 6 + cx;

            // -------------------------------------------------------------- //
            /* -------- Ces calculs ont été déplacé dans l'éditeur de niveau

      var perimetre = rayon * Math.PI * 2;

      // On regarde combien on a de plateformes par tour de cercle
      var nbr_plat = Math.round(perimetre / platformSizeInPx);

      // Ce qui donne un espacement en degrée de ...
      var deg = 360 / nbr_plat;

      // Parcourt de la distance début-fin pour une plateforme
      for (var i = plateformes[val][0]; i < plateformes[val][1]; i += deg) {
          var tmp = polarToCartesian(i, rayon);

          var plt = this.plateformes.create(tmp[0], tmp[1], PLATFORM);
          plt.anchor.set(0.5, 1);
          plt.angle = tmp[2];
      }*/
            // -------------------------------------------------------------- //

            // Positionnement et rotation
            const tmp = polarToCartesian(plateformes[val][0], rayon);

            // Création de la plateforme
            const plt = this.platforms.create(tmp[0], tmp[1], PLATFORM);
            plt.anchor.set(0.5, 1);
            plt.angle = plateformes[val][0];

            // Plateforme la plus haute
            if (plateformes[val][1] > maxPlat) maxPlat = plateformes[val][1];
        }

        return maxPlat * platformSizeInPx + BASE_SIZE / 6;
    },
    createAndDisplayStars: () => {
        currentStage.stars.forEach(star => {
            const angle = star[0];
            const radius = BASE_SIZE / 6 + star[1] * platformSizeInPx + platformSizeInPx / 2;

            const cartesianPosition = polarToCartesian(angle, radius);

            const starVM = starsGroup.create(cartesianPosition[0], cartesianPosition[1], STAR);
            starVM.anchor.set(0.6);
            starVM.angle = star[0];
        });

        nb_etoiles = starsGroup.countLiving();
    },
    createAndDisplayTraps: () => {
        currentStage.traps.forEach(trap => {
            const angle = trap[0];
            const radius = BASE_SIZE / 6 + trap[1] * platformSizeInPx;

            const cartesianPosition = polarToCartesian(angle, radius);

            const trapVM = trapsGroup.create(cartesianPosition[0], cartesianPosition[1], TRAP);
            trapVM.anchor.set(0.5, 1);
            trapVM.angle = trap[0];
        });
    },

    render: function() {
        // this.game.debug.spriteBounds(this.dude);
        // game.debug.body(this.plnte);
        // game.debug.body(this.nuit);
        // game.debug.body(this.dude);
        // this.platforms.forEachAlive((platform) =>
        //     game.debug.body(platform)
        // );
        // this.dudeTest.forEachAlive((dudeT) =>
        //     game.debug.body(dudeT)
        // );
        // game.debug.cameraInfo(game.camera, 32, 32);
        // game.debug.spriteInfo(this.platforms.getFirstAlive(), 32, 32);
        // game.debug.spriteCoords(this.dudeTest.getAt(0), 32, 300);
        // game.debug.spriteCoords(this.dude, 32, 200);
    },
};
