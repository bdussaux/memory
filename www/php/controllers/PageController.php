<?php
// On inclut les class nécessaires et le fichier de config 
require('php/config/Config.php');
require('php/class/Db.php');
require('php/class/RecordManager.php');

class PageController {
	
	public $record_manager;

	// Contructeur qui initialise la gestion des records ainsi que l'affichage du template
	public function __construct(){ 
		$this->setRecordManager();
		$this->display();		
	}

	// Méthode permettant la récupération de tous les records
	public function getAllRecords(){
		return $this->record_manager->getListRecord();
	}

	// Methode pour setter la gestion des records à l'attribut $record_manager
	public function setRecordManager(){
		$this->record_manager = new RecordManager();
	}

	// Méthode pour afficher le template
	public function display(){

		//on récupère les records
		$records = $this->getAllRecords();

		// On affiche le template
		include('php/views/game.php'); 

	}
}