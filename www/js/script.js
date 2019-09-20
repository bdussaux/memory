$('document').ready(function(){

	var Memory ={
		init : function(){
			var self = this;
			
			// On créé les variables des éléments de la DOM
			self.$containerBoard  = $("#container-board"); // Conteneur global
			self.$boardRecord     = $("#board-record"); // Conteneur qui affiche les records
			self.$boardGame       = $("#board-game"); // Conteneur qui va accueillir les cartes
			self.$timer           = $('#timer'); // Conteneur de compteur de temps
			self.$progressBar     = $("#progress-bar"); // Conteneur de la barre de progression
			self.$info            = $("#info"); // Conteneur qui va recevoir les messages retours de l'appel Ajax 
			
			// On créé les variables nécessaires au fonctionnement du jeu
			self.cardHeight       = 100; // Hauteur des visuels des cartes de jeu
			self.nbCard           = 28; // Nombre total de cartes
			self.cards            = []; // Tableau qui va contenir les cartes de jeu
			self.delay            = 12000; // Temps max pour une partie
			self.time             = 0; // Compteur temps qui va s'incrémenter
			self.cardClickCounter = 0; // Nombre de cartes qui ont été révélées 
			self.currentCards     = []; // Tableau qui va contenir les cartes retournées en cours 

			// Appel de la fonction pour initialiser l'événement sur le bouton « Start » du jeu
			this.manageButtonEvent();
		},
		newGame : function(){
			
			// Appel de la fonction qui affiche le plateau de jeu et masque les records
			this.prepareGame();

			// Appel de la fonction qui lance le chrono
			this.startChrono();

			// Appel de la fonction qui génère les cartes sur le plateau de jeu
			this.generateCards();

			// Appel de la fonction qui gère les événements sur les cartes
			this.manageCardsEvents(); 
		},
		prepareGame : function(){
			var self = this;

			// On masque le tableau des records 
			self.$boardRecord.fadeOut('slow');

			// On affiche le plateau de jeu
			self.$containerBoard.fadeIn('slow');

		},
		winGame : function(){

			// On stop le chrono 
			this.stopChrono();

			// On enregistre le record
			this.saveRecord();

			// On notifie l'internaute qu'il a gagné 
			alert('Vous avez gagnééééééé !');

			// On relance le jeu
			this.restartGame();
		},
		loseGame : function(){

			// On stop le chrono 
			this.stopChrono();

			// On notifie l'internaute qu'il a perdu
			alert('Vous avez perduuuuuu !');

			// On relance le jeu
			this.restartGame();
		},
		restartGame : function(){

			// Pour relancer le jeu, on fait un simple reload de la page
			window.location.reload();

		},
		saveRecord : function(){
			var self = this;

			//on prépare l'appel Ajax pour l'enregistrement du record
			$.ajax({
	            url: 'php/ajax.php', // Url du fichier ajax.php qui gère le traitement côté serveur
	            data: {record:self.time}, // Objet qui envoie le paramètre record
	            type: 'POST', // Méthode de l'envoi de la fonction Ajax
	            success: function(ajaxResponse){
	            	
	            	// Traitement de la réponse si succès de la requète Ajax (le fichier ajax.php renvoi « OK » si tout s'est bien passé)
	                if(ajaxResponse == 'OK'){
	                    self.$info.text('Votre record a été enregistré avec succès').fadeIn('slow').delay(3000).fadeOut('slow');
	                }else{
	                	self.$info.text('Oups ! Une erreur s\'est produite lors de l\'enregistrement de votre record...').fadeIn('slow').delay(3000).fadeOut('slow');
	                }

	            },
	            error: function(request, errorType, errorMessage){

	            	// Traitement de la réponse si erreur de la requète Ajax
	                self.$info.text('Oups ! Une erreur s\'est produite lors de l\'enregistrement de votre record...').fadeIn('slow').delay(3000).fadeOut('slow');
	            
	            }
        	});
		},
		generateCards : function(){

			// On créé les variables nécessaires à la fonction
			var self           = this;
			var cardsArray     = []; // Tableau temporaire qui va contenir les cartes sous forme {id:id,position:xxx}
			var templatesCards = []; // Tableau qui va contenir les cartes au format HTML
			var preparedHtml; // Variable temporaire qui va contenir une carte au format HTML

            //On créé à la volée un tableau sous la forme [{id:id,position:xxx},etc.] grâce à une boucle for
			for(i=0;i < self.nbCard/2;i++){
				var item = {id:i,position:i*self.cardHeight}; // On créé un objet item qui va contenir son identifiant ainsi que la position de son image dans le sprite images cards.png
				cardsArray.push(item); // On ajoute au tableau cardsArray les objets Item
		
			}

			// On utilise la fonction $.merge de jQuery pour fusionner deux fois le même tableau
			self.cards = $.merge(cardsArray, cardsArray);

			// On boucle le tableau cards afin de générer le HTML des cartes
			self.cards.forEach(function (card) {
                preparedHtml = self.buildHtmlCard(card); //On prépare le HTML de chaque carte à l'aide de la fonction buildHtmlCard()
                templatesCards.push(preparedHtml); // On ajoute le HTML dans le tableau templatesCards
            
            });

			// On mélange les cartes à l'aide de la fonction shuffleCards() qui retourne un tableau qui annule et remplace le tableau templatesCards 
			// On passe en paramètre de la fonction shuffleCards() le tableau templatesCards qui n'est pas encore mélangé
            templatesCards = self.shuffleCards(templatesCards);

            // On masque et je vide le container qui s'apprête à accueillir les cartes 
            self.$containerBoard.hide();
            self.$boardGame.empty();

            // On injecte toutes les cartes du tableau templatesCards au container en bouclant sur le tableau templatesCards
            templatesCards.forEach(function(card) {
                self.$boardGame.append(card);
            });

            // On affiche le container qui a accueilli les cartes
            self.$containerBoard.fadeIn('slow');

		},
		manageButtonEvent : function(){
			var self = this;

			 // On attache un événement « Click » au bouton #button-start
			self.$boardRecord.on('click', '#button-start', function() {
				self.newGame(); // On lance une nouvelle partie avec la fonction newGame()
			});

		},
		manageCardsEvents : function(){

			// On créé les variables nécessaires à la fonction
			var self = this;
			var check; // Variable qui va contenir le résultat si les cartes cliquées ont le même ID

			// On attache l'événement « click » aux cartes pour réaliser ensuite toutes les actions nécerraires au gameplay
			self.$boardGame.unbind().on('click', '.card', function() {

                var card = $(this);
                var idCard = card.data('id'); // On récupère l'ID de la carte grâce à l'attribut data-id
               
                // On test d'abord si la carte a déjà été retournée (test si la carte n'a pas la class « active »)
                if (!$(this).hasClass('active')) {

                	$(this).addClass('active'); // Si pas la class « Active » on lui ajoute la class à la carte
           		 	self.currentCards.push($(this)); // Et on ajoute la carte au tableau currentCards

           		 	// Si le tableau currentCards contient 2 cartes (soit 2 cartes retournées)
           		 	if (self.currentCards.length == 2) {

		                // On vérifie si les ID des 2 cartes retournées sont les mêmes
		                check = self.currentCards[0].data('id') == self.currentCards[1].data('id');

		                if(check === true){ 
		                	// Si les ID sont les mêmes on incrémente la variable cardClickCounter
		                	self.cardClickCounter++; 
		                	// On supprime l'événement « click » et on ajoute la class « cursor-default » aux 2 cartes
		                	self.currentCards[0].add(self.currentCards[1]).unbind().addClass('cursor-default'); 
		                	// On vide le tableau currentCards
		                	self.currentCards = []; 

		                	// Si toutes les cartes sont retournées, on lance la fonction winGame()
		                	if(self.cardClickCounter === (self.nbCard / 2)) {
			                    self.winGame();
		                	}
		                }else{
		                	// Si les ID ne sont pas les mêmes, on retourne les cartes qui viennent d'être retournées au bout d'une seconde
			                setTimeout(function(){

			                	// On boucle sur le tableau currentCards pour enlever la class « active » aux cartes qui sont dans le tableau currentCards
				                for(var i = 0; i < self.currentCards.length; i++) {
				                    self.currentCards[i].removeClass('active');
				                }
				                
				                // On vide le tableau currentCards
				                self.currentCards = [];

			            	},1000);
			            }
		            }
                }
            });
		},
		shuffleCards : function(templatesCards){

			// On créé les variables nécessaires à la fonction
			var currentIndex = templatesCards.length; // Longueur du tableau qui contient toutes les cartes
			var tempValue; // Variable temporaire pour le mélange
			var randomIndex; // Variable entier en random

			// On effectue une boucle tant que currentIndex n'est pas égale 0
	        while (0 !== currentIndex) {
	            randomIndex = Math.floor(Math.random() * currentIndex); // On génère un entier en random pour le mélange
	            currentIndex -= 1; // On décrémente currentIndex
	            tempValue = templatesCards[currentIndex]; // On stock la carte dans une variable temporaire

	            // Et on mélange en modifiant les index
	            templatesCards[currentIndex] = templatesCards[randomIndex]; 
	            templatesCards[randomIndex] = tempValue; 

	        }
	        // On retourne le tableau mélangé
	        return templatesCards;
    	},
		startChrono : function(){

			// On créé les variables nécessaires à la fonction
			var self   = this;
			var seconds; // Définiton de la variable secondes pour le chrono
			var minutes; // Définiton de la variable minutes pour le chrono
			var $clock = self.$timer.find('#clock'); // Conteneur pour le chrono

			// On lance un setTinterval qui va nous permettre d'appeler des fonctions toutes les secondes (notamment pour le Chrono)
			self.interval = setInterval( function() {
				                seconds = ++self.time % 60; // On récupère les secondes et on l'incrémente de 1
				                minutes = parseInt(self.time / 60, 10); // On calcule les minutes à partir des secondes
				                $clock.text(self.decorateNumber(minutes)+':'+self.decorateNumber(seconds)); // On injecte le texte du chrono dans la div #clock
				                self.updateProgressBar(); // On met à jour la barre de progression
				               
				               	// Si le temps est écoulé, on a perdu donc on lance la fonction loseGame(); 
				                if(self.time == self.delay/100){
				                	self.loseGame();
				                }

				            }, 1000);
		},
		stopChrono : function() {

			// On stop l'interval qui gère le chrono avec clearInterval() 
            clearInterval(this.interval);  
        
        },
        updateProgressBar : function(){
        	var self = this;
        	var $bar = self.$progressBar.find('#bar'); // Selecteur de la barre qui va s'animer

        	// On calcul le pourcentage de progression dans le jeu (progression du temps par rapport au temps total)
        	var percentage = (self.time)*100/(self.delay/100);

        	// On affiche et la barre de progression et modifie sa largeur à partir du pourcentage calculé précédemment
        	$bar.show().css('width',percentage+"%");
        },
        decorateNumber : function(value){

        	// On récupère la variable value qui contient des secondes ou des minutes
        	// On rajoute un 0 devant value quand value est inférieur à 10
        	return value > 9 ? value : '0' + value;

    	},
		buildHtmlCard : function(card){

			// On récupère l'objet card passée en paramètre qui contient son ID et sa position
			// On créé une variable qui contient le HTML d'une carte
			// L'attribut data-id permettra d'identifier l'ID de la carte et la position permettra d'afficher la bonne carte en se déplaçant dans le sprite CSS
			var html = 	'<div class="card" data-id="'+ card.id +'">\
							<div class="inside">\
								<div class="front"></div>\
								<div class="back" style="background-position: 0px -'+ card.position +'px"></div>\
							</div>\
						</div>';
			// On retourne le code HTML			
			return html;

		}

	};
	Memory.init();
});