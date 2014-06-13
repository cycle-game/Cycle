<?php
// ---------------------------------------------------------------------
if (!empty($_SERVER['HTTP_REFERER']) && ($_SERVER['HTTP_REFERER'] == 'http://cycle.ppersonne.fr/' || $_SERVER['HTTP_REFERER'] == 'http://cycle.ppersonne.fr/index.php') ) {
// ---------------------------------------------------------------------
session_start();

if(!isset($_POST['lvl'])
&& !isset($_POST['score'])
&& !isset($_POST['diff'])
&& isset($_SESSION['lvl'])
&& isset($_SESSION['score'])
&& isset($_SESSION['diff']) ) {
	
	if (!is_numeric($_SESSION['lvl'])
    || !is_numeric($_SESSION['score'])
    || !is_numeric($_SESSION['diff'])) {
		$_SESSION['lvl'] = 0;
		$_SESSION['score'] = 0;
		$_SESSION['diff'] = 1;
	}
	else
		echo $_SESSION['lvl'].'|'.$_SESSION['score'].'|'.$_SESSION['diff'];
}

else if (isset($_POST['lvl']) && isset($_POST['score']) && isset($_POST['diff'])) {
	$_SESSION['lvl'] = $_POST['lvl'];
	$_SESSION['score'] = $_POST['score'];
	$_SESSION['diff'] = $_POST['diff'];
}

else
	echo '0|0|1';

// ---------------------------------------------------------------------
} else echo 'Petit chenapan !';
// ---------------------------------------------------------------------
?>
