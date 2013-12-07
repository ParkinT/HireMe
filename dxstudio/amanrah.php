<?php

/**
 * DX Studio Online Highscore Helper
 * ~index.php~
 * dave leibhold - JimmDaBimm
 */
 //Highly customized by Thom Parkin - May 2009
 include 'connect.php';

if(isset($_POST['function']))
{
	if (!isset($_POST['uuid']))  //we cannot continue without a GUID
		if ((!isset($_POST['function'])) || ($_POST['function'] != "testconnection"))
			die("Required parameters missing!!!");
	
	switch($_POST['function'])
	{
		case "testconnection":
			$player = mysql_fetch_assoc(mysql_query("SELECT Player_Name from scores WHERE Player_UUID='" . $_POST['uuid'] . "'"));
			echo (null == $player) ? "NO USER" : $player;
		break;
		
		case "getHighscore":
		
			if(isset($_POST['max']))
			{
				$sql = 'SELECT * FROM scores ORDER BY Player_Score DESC LIMIT '.$_POST['max'].' ';	
			} else {
				$sql = "SELECT * FROM scores ORDER BY Player_Score DESC";	
			}
						
			$result = mysql_query($sql);
			
			while($score = mysql_fetch_assoc($result))
			{
				echo $score['Player_Name'];
				echo "-";
				echo $score['Player_Score'];
				echo "#";				
			}	
		break;
		
		case "addScore":
			if(isset($_POST['score'])) // && !empty(trim($_POST['uuid'])))
			{
				if(is_numeric($_POST['score']) && !empty($_POST['score']))
				{
					$uuid = mysql_real_escape_string(trim($_POST['uuid']));
					$name = mysql_real_escape_string(trim($_POST['name']));
					$score = mysql_real_escape_string(trim($_POST['score']));
					$sql = "INSERT INTO scores (Player_UUID, Player_Name, Player_Score)
							VALUES('" . $uuid . "', '" .$name."' , '".$score."')";
							
					// we don't want duplicate entries
					//if there is a mySQL result, an Array is returned otherwise null	
					if( null == mysql_fetch_assoc(mysql_query("SELECT * from scores WHERE Player_UUID='" . $uuid . "'")))
					{
						mysql_query($sql);
						echo "INSERT";
					}
				}
			}
		break;
		
		case "updateScore":
			if(isset($_POST['score'])) // && !empty(trim($_POST['uuid'])))
			{
				if(is_numeric($_POST['score']))
				{
					$uuid = mysql_real_escape_string(trim($_POST['uuid']));
					$name = mysql_real_escape_string(trim($_POST['name']));
					$score = mysql_real_escape_string(trim($_POST['score']));
					
					$sql = "UPDATE scores SET Player_Score = '" . $score . "' WHERE (Player_UUID='" . $uuid . "' AND Player_Score < '" . $score . "')";
					mysql_query($sql);
					echo "UPDATE";
				}
			}
		break;
	}
}

?>