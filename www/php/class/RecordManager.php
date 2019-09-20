<?php

class RecordManager {

	private $_bdd;

    // Constructeur qui initialise la base de données
	public function __construct() {
		 $this->setDb();
	}

    // Méthode permettant d'insérer en BDD un record
    // En paramètre le record en seconde
	public function addRecord($time_record) {
        $req = $this->_bdd->prepare('INSERT INTO records SET time_record = '.$time_record); // On prépare la requête
        $req->execute(); // On execute la requête
        $req->closeCursor(); // On ferme la requête
    }

    // Méthode qui retourne un tableau contient tous les 10 meilleurs records
    public function getListRecord() {
        $records = []; // On créé un tableau vide
        
        $req = $this->_bdd->query('SELECT * FROM records ORDER BY time_record ASC LIMIT 0,10'); // On exécute la requête
       
        // On boucle sur les résultats de la requête
        while ($datas = $req->fetch(PDO::FETCH_ASSOC)) { 
            
            $minutes = gmdate("i", $datas["time_record"]); // On récupère que les minutes à partir des secondes
            $secondes = gmdate("s", $datas["time_record"]); // On récupère que les secondes

            $records[] = $minutes.'min'.$secondes.'sec'; // On ajoute les records « formatés » au tableau
        }

        //On retoure le tableau records
        return $records;
        
        $req->closeCursor(); // On ferme la requête
    }

    //Métode permettant de setter la connexion à la base de données à l'attribut $_bdd
    public function setDb() {
    	$bdd = new Db();
        $this->_bdd = $bdd->getConnection();
    }

}