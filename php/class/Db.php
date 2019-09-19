<?php

class Db{
    
    public $connection;

    // Constructeur qui initialise une connexion à la base de données
    function __construct() {

		// On essaie de se connecter à la base
		try
        {
            // On utilise PDO pour se connecter à la base de données
			$bdd = 	new PDO('mysql:host='. DB_SERVER .';dbname='. DB_DATABASE, DB_USERNAME, DB_PASSWORD, 
								array(
									PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, // Affichage message précis si erreur
	                                PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"
								)
							);
            // On set l'attribut $connection avec l'instance PDO
	        $this->connection = $bdd;
	    }
        catch (Exception $e) {
            // On retourne les erreurs si la connexion ne fonctionne pas
        	if(DEBUG){
            	echo 'Erreur : ' . $e->getMessage();
            	die();
        	}
        }
    	
    }
    // Méthode permettant de récupérer la connexion
    public function getConnection(){
        return $this->connection;
    }
} 