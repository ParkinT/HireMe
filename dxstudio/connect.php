<?php

/**
 * DX Studio Online Highscore Helper
 * ~connect.php~
 * dave leibhold ~ JimmDaBimm
 */
	
  error_reporting(E_ALL);

  define ('MYSQL_HOST'	,	'mysql.websembly.com');
  define ('MYSQL_USER'	,	'amanrahscore');
  define ('MYSQL_PASS'	,	'H1gh$c0r3');
  define ('MYSQL_DATABASE',	'amanrah');

  mysql_connect(MYSQL_HOST, MYSQL_USER, MYSQL_PASS);
  mysql_select_db(MYSQL_DATABASE);

?>