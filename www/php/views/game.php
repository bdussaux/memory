<!doctype html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Memory</title>

		<!-- Google Font -->	
		<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap">
		
		<!-- Style CSS -->	
		<link rel="stylesheet" href="css/style.css">
	
	</head>
	<body>
		<!-- Début header -->
		<header>
			<h1>Jeu de mémoire</h1>
		</header>
		<!-- Fin header -->

		<!-- Début #main-container -->
		<div id="main-container">

			<!-- Début #board -->
			<div id="board">

				<!-- Début #board-record -->
				<div id="board-record">
					<h2>Meilleurs temps</h2>

					<!-- Début #record-game -->
					<ul id="record-game">
						<!-- Code pour boucler sur le tableau records et les afficher -->
						<?php foreach ($records as $record){ ?>
						<li><?php echo $record; ?></li>
						<?php } ?>
						<!-- Fin du code -->
					</ul>
					<!-- Fin #record-game -->

					<a href="#" id="button-start">Commencer une partie</a>

				</div>
				<!-- Fin #board-record -->

				<!-- Début #container-board -->
				<div id="container-board">

					<!-- Début #timer -->
					<div id="timer">
							<div class="sep">⏱</div>
							<div id="clock">00:00</div>
							<div id="sep"> / 02:00</div>
					</div>
					<!-- Fin #timer -->

					<div id="board-game"></div>

					<!-- Début #progress-bar -->
					<div id="progress-bar">
						<div id="bar"></div>
					</div>
					<!-- Fin #progress-bar -->

				</div>
				<!-- Fin #container-board -->
				
			</div>
			<!-- Fin #board -->
			
			<div id="info"></div>

		</div>
		<!-- Fin #main-container -->

		<!-- Début scripts JS -->		
		<script src="js/jquery-3.4.1.min.js"></script>
		<script src="js/script.js"></script>
		<!-- Fin scripts JS -->
	</body>
</html>