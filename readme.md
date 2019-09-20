# Jeu de mémoire (memory)

Jeu développé dans le cadre d'un test technique Fullstack pour l'école O'Clock ✌️. 

## Pour commencer 🏁

Les instructions suivantes vont vous permettre de faire fonctionner une copie du jeu en local sur votre machine à l'aide de Docker.

### Prérequis 📄

Il faut avoir installé Docker sur sa machine ainsi que Docker Compose pour pouvoir lancer le jeu. 

Pour installer Docker, il faut suivre les instructions en fonction de son système d'exploitation dans la rubrique [Get Docker](https://docs.docker.com/install/) de la documentation de Docker.

Ensuite, il faut suivre les instructions d'installation de Docker Compose dans la rubrique [Install Docker Compose](https://docs.docker.com/compose/install/) de la documentation de Docker.

Pour tester si l'installation s'est bien passée, il est possible de taper dans le terminal :

        docker-compose --version

Et si tout fonctionne, il y aura la version de Docker compose qui s'affichera :

        docker-compose version: 1.24.1

### Installation 🚀

1. Éditer le fichier docker-compose.yml :

Il faut d'abord éditer le fichier docker-compose.yml au niveau de la ligne 20 afin de faire correspondre le chemin du répertoire de l'application `/chemin/vers/app/memory/www` avec celui où est situé l'application sur votre ordinateur (la zone à éditer est à gauche des ":") :

        - /chemin/vers/app/memory/www:/var/www/html/


2. Démarrer les conteneurs :
     
Il faut tout d'abord se placer avec le terminal à la racine du dossier du jeu où le fichier docker-compose.yml se trouve en tapant :

		$ cd /chemin/vers/app/memory

Pour build les éléments nécessaires au fonctionnement des conteneurs, il faut taper dans le terminal :

		$ docker-compose build

Pour ensuite démarrer les 3 conteneurs, il faut taper la ligne suivante dans le terminal :

		$ docker-compose up

Une fois démarrés, le jeu est accessible depuis votre hôte sur l’adresse [http://localhost/index.php](http://localhost/index.php) 😎

Pour visualiser la base de données, vous pouvez accéder à PhpMyAdmin via l’adresse [http://localhost:8080/index.php](http://localhost:8080/index.php)

3. Bonne partie 😀 

## Todo ✨

1. Il faudrait adapter la feuille de style ainsi que le js afin de de rendre le jeu agréable à jouer sur mobile et tablette.

1. Il faudrait styliser les fenêtres des alertes JS natives avec des fenêtres modales.

2. Il serait intéressant d'ajouter une fonctionnalité pour que le joueur puisse spécifié un pseudo pour son record.


## Développé avec ❤️ et :

* [jQuery](https://jquery.com/) - Un framework Javascript
* [Scout-App](https://scout-app.io/) - Une application pour compiler les fichiers Sass en CSS 
* [Docker](https://www.docker.com/) - Un outil de déploiement

## Inspiration 🙏 :

* [Memory Game de Nate Wiley sur Codepen.io](https://codepen.io/natewiley/pen/HBrbL) 

