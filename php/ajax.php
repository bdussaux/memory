<?php
// On inclut les class nécessaires et le fichier de config 
require('config/Config.php');
require('class/Db.php');
require('class/RecordManager.php');

// On test si un paramètre record est bien posté dans la requête Ajax et si celui-ci est différent de vide
if(isset($_POST['record']) && $_POST['record'] != ""){

	// On récupère le paramètre posté et on le force en entier
	$record = (int)$_POST['record'];
	
	//On instancie RecordManager()
	$record_manager = new RecordManager();

	// On ajoute un record en base de données 
	$record_manager->addRecord($record);
	
	// Et on renvoie OK si tout s'est bien passé
	echo 'OK';

}else{

	// On renvoie NOK si pb
	echo 'NOK';

}

