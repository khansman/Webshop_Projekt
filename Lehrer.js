 //Ausklappen des Info-Teils des jeweiligen Nachhilfelehrers
 function ausklappen(nummer){
	 
	if(document.getElementById("info"+nummer).style.display=="block"){		
		document.getElementById("info"+nummer).style.display="none";
		document.getElementById("infoL"+nummer).style.display="none";
		var zahl = document.querySelectorAll(".zeichen");
		zahl[nummer].innerHTML="&#9660";
	}
	else{
		document.getElementById("infoL"+nummer).style.display="block";
		var zahl = document.querySelectorAll(".zeichen");
		zahl[nummer].innerHTML="&#9650";
		document.getElementById("info"+nummer).style.display="block";
	}
		 
}

//Füllen des Lehrer-Templates
function fuellen(){
	
	var counter;
	sessionStorage.getItem('counter')!=null ? counter=sessionStorage.getItem("counter") : counter=0;
	document.getElementById("warenNr").innerHTML = counter+"/3";
	
	var fach = sessionStorage.getItem("fach");
	var matrikeln = localStorage.getItem("matrikelnummern").split("$");
	var data = [];
	for(i=0;i<matrikeln.length;i++)
	{
		var daten = localStorage.getItem(matrikeln[i]).split("$");
		var faecher = daten[10].split("/");
		for(k=0,h=0;k<faecher.length;k++){
			if(fach==faecher[k]){
				data.push(daten.join("$"));
				break;
			}
		}
	}
	var container = document.querySelectorAll(".container");
	for(i=0;i<data.length;i++){
		var regData = data[i].split("$");
		container[i].style.display="block";
		document.getElementById('name'+i).value = regData[0];
		document.getElementById('ort'+i).value='Fakultät für Informatik';
		document.getElementById('info'+i).value=regData[9];
		var zeiten = regData[regData.length-1].split("#");
		for(k=0;k<zeiten.length;k++)
		{
			var options = document.createElement("option");
			options.text=zeiten[k]+" Uhr bis "+(parseInt(zeiten[k].substring(zeiten[k].lastIndexOf(" ")+1,zeiten[k].lastIndexOf(":")))+2)+":00 Uhr";
			document.getElementById('zeit'+i).add(options);
		}
		
	}
}

//Speichern des Nachhilfelehres, wenn in Warenkorb legen
function buchung(nummer){

  if(fachZeitMengePrüfung(nummer) == "false"){
	  return false;
  }
  else{
	var counter = Math.min(parseInt(sessionStorage.getItem("counter"))+1,3);	
	
	var message = "";
	var warenkorb;
	sessionStorage.getItem("warenkorbInhalt")!=null ? warenkorb = sessionStorage.getItem("warenkorbInhalt").split("/") : warenkorb = [];
	var name = document.getElementById("name"+nummer).value;
	var ort  = document.getElementById("ort"+nummer).value;
	var zeitSelect = document.getElementById("zeit"+nummer);
   
	for(var i=0;i<zeitSelect.options.length;i++){
		var pos=zeitSelect.options[i];
		if(pos.selected){
			message += pos.value + "\n";
			zeiten = pos.value;
			break;
		}
	}
	var data = [name,ort,zeiten,sessionStorage.getItem("fach")];
	warenkorb.push(data.join("#"));
	//window.alert(warenkorb);
	sessionStorage.setItem("warenkorbInhalt",warenkorb.join("/"));
	sessionStorage.setItem("counter",counter);
	document.getElementById('warenNr').innerHTML = counter+"/3";
	warenkorbInhalt();

  }
}

//Füllen der Warenkorbübersicht
function warenkorbInhalt(){
	if(sessionStorage.getItem("warenkorbInhalt")!=null)
	{
		document.getElementById("warenkorbAlert").style.display="block";
		var texts= "";
		var warenkorb = sessionStorage.getItem("warenkorbInhalt").split("/");
		for(i=0;i<warenkorb.length;i++){
			var data = warenkorb[i].split("#");
			//window.alert(data);
			texts +=  "Fach: " + data[3] + "\n Name: " + data[0] + "\n Zeit: " + data[2] + "\n Ort: "+data[1]+"\n\n\n\n";	
		}
		document.getElementById('inhalt').innerHTML = texts.replace(/\n/g, '<br />');
	}
	else{
		document.getElementById("inhalt").innerHTML = "Der Warenkorb ist leer!"
	}
	
}


//Datenprüfungsfunktion
function fachZeitMengePrüfung(nummer){	
	
  var zeiten = "leer";
  var zeitSelect = document.getElementById("zeit"+nummer);
  
  for(var i=0;i<zeitSelect.options.length;i++){
		var pos=zeitSelect.options[i];
		if(pos.selected){
			zeiten = pos.value;
			break;
		}
	}
  
	if(zeiten == "leer"){
		window.alert("Bitte wählen Sie eine Zeit aus!");
		return "false";
	}
	
  var fach = sessionStorage.getItem("fach");
  var warenkorb = [];
  if(sessionStorage.getItem("warenkorbFaecher")==null){
	warenkorb.push(fach);
	sessionStorage.setItem("warenkorbFaecher",warenkorb.join("/"));
  }
  else{
	  warenkorb = sessionStorage.getItem("warenkorbFaecher").split("/");
	  if(warenkorb.length<3){
	  for(i=0;i<warenkorb.length;i++){
		  if(warenkorb[i]==fach){
			  window.alert("Nachhilfelehrer für dieses Fach bereits im Warenkorb!");
			  return "false";
		  }
	  }
	  warenkorb.push(fach);
	  sessionStorage.setItem("warenkorbFaecher",warenkorb.join("/"));
	  }
	  else{
	  window.alert("Warenkorbkapazität erreicht!");
	  return "false";
	  } 
  }  
}

//Animation zum Ein-/Ausblenden der Warenkorbübersicht
function aus_einblenden(){
	
	if(document.getElementById("warenkorbAlert").classList.length == 0){
		document.getElementById("warenkorbAlert").classList.remove("animationStart");
		document.getElementById("warenkorbAlert").classList.toggle("animationEnd",true);
		document.getElementById("pfeil").classList.remove("animationStart");
		document.getElementById("pfeil").classList.toggle("animationEnd",true);
		document.getElementById("pfeil").innerHTML = "&#9654";
	}
	else if(document.getElementById("warenkorbAlert").classList.contains("animationStart")){
		document.getElementById("warenkorbAlert").classList.remove("animationStart");
		document.getElementById("warenkorbAlert").classList.toggle("animationEnd",true);
		document.getElementById("pfeil").classList.remove("animationStart");
		document.getElementById("pfeil").classList.toggle("animationEnd",true);
		document.getElementById("pfeil").innerHTML = "&#9654";
	}
	else{
		document.getElementById("warenkorbAlert").classList.remove("animationEnd");
		document.getElementById("warenkorbAlert").classList.toggle("animationStart",true);
		document.getElementById("pfeil").classList.remove("animationEnd");
		document.getElementById("pfeil").classList.toggle("animationStart",true);
		document.getElementById("pfeil").innerHTML = "&#9664";
	}
}