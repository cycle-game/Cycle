<?php

// Envoi de level

$class = 'hidden';
$lvl = '';
$enr = false;
$v = "2.21";

if (isset($_POST['pseudo']) && isset($_POST['lvl'])) {
    
    if (empty($_POST['pseudo'])) {
        $class = '';
        $lvl = htmlspecialchars($_POST['lvl']);
    }
    else {
        $lvl = new SimpleXMLElement(file_get_contents('./BDD/Levels.xml'));
        
        $new = $lvl->addChild('lvl');
        
        $new->addChild('pseudo', $_POST['pseudo']);
        $new->addChild('lvl', $_POST['lvl']);
        $new->addChild('web', $_POST['web']);
        $new->addChild('msg', $_POST['msg']);
        
        file_put_contents('./BDD/Levels.xml', $lvl->asXML());
        $enr = true;
    }
    
}

?><!DOCTYPE html>
<html>

<!--
 Cycle || CC BY-NC 2.0 FR Rémi Perrot 2014
 https://creativecommons.org/licenses/by-nc/2.0/fr/
-->
    
<head>
  <meta charset="utf-8" />
  <title>Cycle v<?php echo $v; ?> - [Insérer une catchphrase ici]</title>

  <link rel="stylesheet" href="style.css?<?php echo $v; ?>">

  <!--
      (Musique) :
      http://www.jamendo.com/fr/track/966939/happy-sinners
      http://www.jamendo.com/fr/track/7586/goof
  -->
  
  <link rel="shortcut icon" href="Ressources/favicon.ico?<?php echo $v; ?>">
  
</head>


<body>

  <p>Last MaJ (v<?php echo $v; ?>) : Style CSS / Animation fin&début de niveau</p>
  
  <p>Pour une expérience de jeu correcte, vous devez utiliser <a href="http://caniuse.com/canvas-blending">Firefox >= 20, Chrome >= 30, Safari >= 6.1, Opera >= 17</a></p>
  
    <div class="credits">
        <h3><a href="javascript:credit()">Crédits</a></h3>
        <ul id="Credits">
            <li>Par <a href="http://remiperrot.fr">Rémi Perrot</a></li>
            <li> Musique
                <ul>
                    <li>(WIP)</li>
                </ul>
            </li>
            <li> Niveaux
                <ul>
                    <li>Alexis Busin</li>
                    <li>Arnaud Thevenard</li>
                    <li><a href="http://www.humbertdany.com/">Dany Humbert</a></li>
                    <li><a href="http://raphaelrothmann.fr/">Raphaël Rothmann</a></li>
                </ul>
            </li>
            <li> Remerciements
                <ul>
                    <li><a href="http://fr.viadeo.com/fr/profile/loic.brunot">Loïc Brunot</a></li>
                    <li><a href="http://www.reddit.com/user/ekstrakt">ekstrakt</a></li>
                    <li><a href="http://lessmilk.com">Thomas Palef</a></li>
                    <li><a href="http://www.av-dev.com/">Aurélien Vercruysse</a></li>
                    <li>Felix Mulet</li>
                    <li><a href="http://www.reddit.com/user/HugeFish">HugeFish</a></li>
                    <li><a href="http://www.reddit.com/user/fazo96">fazo96</a></li>
                </ul>
            </li>
            <li> Créé avec
                <ul>
                    <li><a href="http://phaser.io/">Phaser</a></li>
                    <li><a href="http://brackets.io/">Brackets</a></li>
                    <li><a href="http://komodoide.com/komodo-edit/">Komodo Edit</a></li>
                </ul>
            </li>
            <li> Inspirations
                <ul>
                    <li><a href="http://blog.lessmilk.com/make-html5-games-with-phaser-1/">Lessmilk's Tutorials</a></li>
                    <li><a href="http://www.photonstorm.com/phaser/tutorial-making-your-first-phaser-game">Photon Storm</a></li>
                    <li><a href="http://www.lessmilk.com/games/9/">Lessmilk : game #9</a></li>
                </ul>
            </li>
            <hr class="clear"/>
        </ul>
    </div>

  <div id="JeuEtShare">
      
      <div id="cycleCanvas"></div>
      
      <p id="ScoreSharing" class="hidden">Partagez votre score :<br/>
      <a href="#" id="OnWall">sur votre mur Facebook</a><br/>
      <a href="#" id="ToFriends">à vos amis Facebook</a></p>
      
  </div>
  
  <iframe id="fbiframe" src="//www.facebook.com/plugins/likebox.php?href=https%3A%2F%2Fwww.facebook.com%2FCyclePhaser&amp;width=150&amp;height=62&amp;colorscheme=light&amp;show_faces=false&amp;header=false&amp;stream=false&amp;show_border=false&amp;appId=762573653764635" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:150px; height:62px;" allowTransparency="true"></iframe>
  <!--
  <div id="fb-root"></div>
  
  <div id="fbpage" class="fb-like-box"
    data-href="https://www.facebook.com/CyclePhaser"
    data-width="150"
    data-colorscheme="light"
    data-show-faces="false"
    data-header="false"
    data-stream="false"
    data-show-border="false"></div>
    -->

  <?php if ($enr) echo '<p>Enregistré!</p>'; ?>
  <div id="SendMeLvl" class="<?php echo $class; ?>">
      <form method="POST" action="#">
          <?php if ($class == '') echo '<p>Pseudo manquant.</p>'; ?>
          <input type="submit" value="Envoyer"/><br/>
          <p>(Attention, en validant vous rechargerez la page ...)</p>
          <label for="pseudo">Pseudo/Nom *</label><br/><input type="text" name="pseudo"/><br/>
          <label for="web">Site web</label><br/><input type="text" name="web"/><br/>
          <label for="msg">Message</label><br/><input type="text" name="msg"/><br/>
          <label for="lvl">Level *</label><br/><textarea id="export_lvl" name="lvl" readonly="readonly"><?php echo $lvl; ?></textarea><br/>
      </form>
  </div>
  
  <p>Envoyez-moi vos suggestions à <a href="mailto:cycle@ppersonne.fr">cycle@ppersonne.fr</a></p>

    <!-- Scripts -->

  <script type="text/javascript" src="http://div.ppersonne.fr/Cycle/phaser.min.js?<?php echo $v; ?>"></script>
  
  <script type="text/javascript" src="variables.js?<?php echo $v; ?>"></script>
  <script type="text/javascript" src="functions.js?<?php echo $v; ?>"></script>
  <script type="text/javascript" src="Etats/levels.js?<?php echo $v; ?>"></script>
  <script type="text/javascript" src="Etats/load.js?<?php echo $v; ?>"></script>
  <script type="text/javascript" src="Etats/menu.js?<?php echo $v; ?>"></script>
  <script type="text/javascript" src="Etats/edit.js?<?php echo $v; ?>"></script>
  <script type="text/javascript" src="Etats/play.js?<?php echo $v; ?>"></script>
  <script type="text/javascript" src="Etats/victoire.js?<?php echo $v; ?>"></script>
  <script type="text/javascript" src="Etats/scores.js?<?php echo $v; ?>"></script>
  <script type="text/javascript" src="Etats/game.js?<?php echo $v; ?>"></script>
  
  <script type="text/javascript">
      // -----------------------------------------------------------------------
      // ------------------------------------------------------ Fetch des scores
    var request = new XMLHttpRequest();
    request.open('POST', './BDD/Session.php', false); // Not asynchrone
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.onload = function() {
      if (request.status >= 200 && request.status < 400){
        // Success!
      console.log(request.response);
          if (request.response != "") {
            var tmp = request.response.split('|');
            Stats.level = parseFloat(tmp[0]);
            Stats.score = parseFloat(tmp[1]);
            Stats.diff = parseFloat(tmp[2]);
          }
      } else {
        // Error
          //console.log("erreur");
      }
    };
    request.send( null );
      // -----------------------------------------------------------------------
      // -----------------------------------------------------------------------
      // ---------------------------------------------------------- display/hide
      function credit() {
        if(window.document.getElementById("Credits").className != "heightnull")
            window.document.getElementById("Credits").className = "heightnull";
        else
            window.document.getElementById("Credits").className = "";
      }
      credit();
  </script>
</body>

</html>
