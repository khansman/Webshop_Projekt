
function readData(){
	var file = document.getElementById("thefile");
	var audio = document.getElementById("audio");

	file.onchange = initializeAudio();
}

function initializeAudio(){
	//Auslesen der ausgewählten Files;
	var files = this.files;
	//Audioquelle = erstes ausgewähltes Element --> im URL-Format (absolut[Website] oder relative[File])
	audio.src = URL.createObjectURL(files[0]);
    audio.load();
    audio.play();
	//Initialisieren einer neuen Audioschnittstelle
    var context = new AudioContext();
	//Anlegen neues Elementes zum Abspielen eines Mediums (Video, Audio
    var src = context.createMediaElementSource(audio);
	//Anlegen eines Knotens zur Audioanalyse (Länge, Frequenz, etc);
    var analyser = context.createAnalyser();
	
	setCanvas();
}


function setCanvas(){
	var canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var ctx = canvas.getContext("2d");
}