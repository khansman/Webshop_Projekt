window.onload = function() {
  //Auslesen der eingestellten files
  var audio = document.getElementById("audio");
  visualize();
}

  function visualize(){
	//Umwandeln der Files in blob-Objekt (Umwandeln in gültige URL)
	
	
	
   audio.src = "Bilder/inMyMind.mp3";	 

	
	  //document.getElementById("titel").value = audio.src.substring(audio.src.lastIndexOf("/")+1,audio.src.lastIndexOf("."));
    audio.load();
    audio.play();
	audio.volume =0.5;
	//Initialisieren einer neuen Audioschnittstelle
    var context = new AudioContext();
	//Anlegen neues Elementes zum Abspielen eines Mediums (Video, Audio)
    var src = context.createMediaElementSource(audio);
	//Anlegen eines Knotens zur Audioanalyse (Länge, Frequenz, etc);
    var analyser = context.createAnalyser();

	//Anpassen des Canvas-Elementes
    var canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
	//Rendering im 2D-Raum
    var ctx = canvas.getContext("2d");
	//Verbinden des Mediums mit dem Analyser
    src.connect(analyser);
	//Verbinden Analyser mit 	
    analyser.connect(context.destination);
	
	//FFT-Algorithmus --> Filtern der Frequenzen aus einer Audiospur --> Representieren der Fenstergröße(des Vektors) zur Darstellung als Funktion
    analyser.fftSize = 1024;
	
	//Hälfte der fft-Size --> letztendliche Zahl der Balken
    var bufferLength = analyser.frequencyBinCount;

	//Anlegen Datenarray mit Größe des Buffers / Hälfte fftSize
    var dataArray = new Uint8Array(bufferLength);

    var WIDTH = canvas.width;
    var HEIGHT = canvas.height;

	//Breite der einzelnen Balken = Fenstergröße/Buffergröße)*Faktor
    var barWidth = (WIDTH / bufferLength) * 2.5;
	//Balkenhöhe --> später dynamisch
    var barHeight;
    var x = 0;
	
	//Canvas-Zeichnen
    function renderFrame() {
	  //Informieren des Browsers über anstehende Animation --> Ausführen des Codes der renderframe-Funktion
      requestAnimationFrame(renderFrame);

      x = 0;
	  //Füllen des Datenarray mit momentanen Frequenzdaten
      analyser.getByteFrequencyData(dataArray);
	  //Canvas-Hintergund: schwarz
      ctx.fillStyle = "black";
	  //Füllen des Canvas-Rechteckes mit (x-Koordinate der oberen linken Ecke, y-Koordinate der oberen linken Ecke, Breite, Höhe) --> komplettes Fenster
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
	  //Über jeden Eintrag des Buffers iterieren --> "jeder Balken"
      for (var i = 0; i < bufferLength; i++) {
		//Anpassen der Höhe
        //barHeight = 2*dataArray[i]-50;
		barHeight = 3*dataArray[i]-200; //--> fullHeight
		//Farbwahl
        var r = 350 * (i/bufferLength);
        var g = barHeight + (50 * (i/bufferLength))-300;
        var b = 1000;
        //Füllen des Rechteckes mit den Farben
        ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
		//Position des Rechteckes (x,y,Breite,Höhe)
        ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
		//x-Position für nächster Balken = Balkenbreite + 1 Abstand
        x += barWidth + 1;
		//document.getElementById("titel").style.color="rgb("+r+","+g+","+b+")";	
      }
	 
    }

	//Audio abspielen und zeichnen
    audio.play();
    renderFrame();
  };

