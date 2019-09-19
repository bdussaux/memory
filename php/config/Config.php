<?php

define('DB_SERVER', '172.20.0.1'); // Adresse IP/Hôte du serveur 
define('DB_DATABASE', 'memory'); // Nom de la base de données
define('DB_USERNAME', 'root'); // Nom d'utilisateur de la base de données
define('DB_PASSWORD', 'password'); // Mot de passe de l'utilisateur de la base de données
define('DEBUG', true); // Active l'affichage des erreurs

if(DEBUG){
	//Paramètres permettant d'afficher toutes les erreurs	
	error_reporting(E_ALL); 
	ini_set('display_errors', 1); 
}