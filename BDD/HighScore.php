<?php
// ---------------------------------------------------------------------
if (!empty($_SERVER['HTTP_REFERER']) && ($_SERVER['HTTP_REFERER'] == 'http://cycle.ppersonne.fr/' || $_SERVER['HTTP_REFERER'] == 'http://cycle.ppersonne.fr/index.php') ) {
// ---------------------------------------------------------------------
$scores = new SimpleXMLElement(file_get_contents('Highscores.xml'));

if(!isset($_POST['lvl'])
&& !isset($_POST['score'])
&& !isset($_POST['pseudo'])
&& !isset($_POST['diff']) ) {
    
    $array = array(array(), array(), array(), array());
    
    foreach($scores->score as $value)
    {
        $pseudo = (String) $value->pseudo;
        $lvl = (String) $value->lvl;
        $score = (String) $value->score;
        $diff = (String) $value->diff;
        $classement = $score - ($lvl*750);
        
/*        if (isset($array[$diff][$pseudo.$lvl])) {
            if ($array[$diff][$pseudo.$lvl]['score'] > $score)
                $array[$diff][$pseudo.$lvl] = array('pseudo' => $pseudo,
                    'lvl' => $lvl,
                    'score' => $score,
                    'diff' => $diff,
                    'classement' => $classement
                    );
        }
        else*/
            $array[$diff][/*$pseudo.$lvl*/] = array('pseudo' => $pseudo,
                    'lvl' => $lvl,
                    'score' => $score,
                    'diff' => $diff,
                    'classement' => $classement
                    );
    }
    
    // Trie
    foreach ($array as $key => $val) {
        
        if(count($val) > 0) {
            usort($array[$key], function($a, $b) {return $b['classement'] < $a['classement'];});

            // 15 premiers
            $array[$key] = array_splice($array[$key], 0, 15);
        }
    }
    
    foreach($array as $diff) {
        foreach($diff as $value) {
            echo $value['score'].'::'.$value['pseudo'].'::'.$value['lvl']."><";
        }
        echo '|||';
    }
    
}

else if (isset($_POST['lvl'])
&& isset($_POST['score'])
&& isset($_POST['pseudo'])
&& isset($_POST['diff'])) {
    
    if ( !is_numeric($_POST['lvl'])
    || !is_numeric($_POST['score'])
    || !is_string($_POST['pseudo'])
    || $_POST['score'] == 0
    || !is_numeric($_POST['diff']))
        die('Petit chenapan !');
    
    $score = $scores->addChild('score');
    
    $score->addChild('pseudo', $_POST['pseudo']);
    $score->addChild('lvl', $_POST['lvl']);
    $score->addChild('score', $_POST['score']);
    $score->addChild('diff', $_POST['diff']);
    
    file_put_contents('Highscores.xml', $scores->asXML());
    
}

// ---------------------------------------------------------------------
} else echo 'Petit chenapan !';
// ---------------------------------------------------------------------
?>
