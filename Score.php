<?php

function softify($input) {
    if (is_array($input)) {
        foreach($input as $key => $val) {
        
            if (is_array($val))
                $input[$key] = softify($val);
            else
                $input[$key] = htmlspecialchars($val);
        
        }
    }
    else
        $input = htmlspecialchars($input);
        
    return $input;
}

$input = softify($_GET);

if ( !(isset($input['pseudo'])
&& isset($input['lvl'])
&& isset($input['diff'])
&& isset($input['score'])
&& isset($input['langue'])) )
    die('Petit chenapan !');

$scores = new SimpleXMLElement(file_get_contents('BDD/Highscores.xml'));
foreach($scores->score as $value) {
    if ($input['pseudo'] == $value->pseudo
    && $input['lvl'] == $value->lvl
    && $input['diff'] == $value->diff
    && $input['score'] == $value->score)
        $final = array($value->pseudo,
            $value->lvl,
            $value->diff,
            $value->score,
            $input['langue']);
}

if ( !isset($final) )
    die('Petit chenapan !');

$contenu = [];

if ($final[4] == "en") {
    switch($final[2]) {
        case 0: $diff = "Easy"; break;
        case 1: $diff = "Normal"; break;
        case 2: $diff = "Hard"; break;
        default: $diff = "Nightmare";
    }
    $contenu['titre'] = $final[3].' by '.$final[0].' on Cycle';
    $contenu['description'] = $final[3].' points in '.$final[1].' levels on Cycle, '.$diff.' mode.';
    $contenu['tryit'] = $final[0].' made '.$final[3].' points in '.$final[1].' level. Could you do less ?'."<br/>\n".'<a href="/">Try now !</a>';
}
else {
    switch($final[2]) {
        case 0: $diff = "Facile"; break;
        case 1: $diff = "Normal"; break;
        case 2: $diff = "Difficile"; break;
        default: $diff = "Cauchemardesque";
    }
    $contenu['titre'] = $final[3].' par '.$final[0].' sur Cycle';
    $contenu['description'] = $final[3].' points en '.$final[1].' niveaux sur Cycle, version '.$diff.'.';
    $contenu['tryit'] = $final[0].' a fait '.$final[3].' points en '.$final[1].' niveaux. Saurez-vous faire moins ?'."<br/>\n".'<a href="/">Essayez dès maintenant !</a>';
}

?><!doctype html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title><?php echo $contenu['titre']; ?></title>
    <meta property="og:title" content="<?php echo $contenu['titre']; ?>" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="http://cycle.ppersonne.fr<?php echo $_SERVER['REQUEST_URI']; ?>" />
    <meta property="og:image" content="http://cycle.ppersonne.fr/Ressources/Facebook/Logo_For_Fb.png" />
    <meta property="og:description" content="<?php echo $contenu['description']; ?>"/>

    <style>
        body {
            background-color:#fbf3b4;
        }
        p {
            display:block;
            margin:1em auto;
            width:50%;
            min-width:450px;
            color:#040c4b;
            font-size:2.5em;
            text-align:center;
        }
        a {
			display:inline-block;
			padding:.3em;
			background-color:#fbf3b4;
			color:#040c4b;
		}
		a:hover {
			background-color:#040c4b;
			color:#fbf3b4;
		}
    </style>
</head>

<body>
    <p><?php echo $contenu['tryit']; ?></p>
</body>
</html>
