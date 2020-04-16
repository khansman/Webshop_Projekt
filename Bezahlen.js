//Ausklappen des Untermenüs für Studiengänge --> STARTSEITE.html + IMPRESSUM.html + UEBER_UNS.html
function menuDrop(){
		document.getElementById('subNav').style.display = 'block';
		document.getElementById('studyB').disabled=true;
		window.setTimeout('ausblenden()',6000);
}

//Einklappen des Untermenüs für Studiengänge --> STARTSEITE.html + IMPRESSUM.html + UEBER_UNS.html
function ausblenden(){
	document.getElementById('subNav').style.display = 'none';
	document.getElementById('studyB').disabled=false;
}

//Login-Funktion --> STARTSEITE.html + IMPRESSUM.html + UEBER_UNS.html
function logIn(){
	var nameL = document.getElementById("benutzer").value;
	var passwortL = document.getElementById("passwort").value;
	//Auslesen localStorage-Element mit Namen "regDaten"
	var matrikeln;
	var regdaten;
	var passwortReg;
	var nameReg=false;
	//kein localStorage-Element vorhanden --> setzen von Default-Daten
	if(getStorage("matrikelnummern") == "false"){
		document.getElementById("passwort").style.border="2px solid red";
		document.getElementById("benutzer").style.border="2px solid red";
		window.alert("Matrikelnummer oder Passwort falsch / Array leer!");
		return false;
	}
	//wenn Element vorhanden --> Auslesen von Matrikelnummer und Passwort aus Array
	else{
		matrikeln = getStorage("matrikelnummern");
		window.alert(matrikeln);
		var ind = matrikeln.indexOf(nameL);
		if(ind== -1)
		{
			document.getElementById("passwort").style.border="2px solid red";
		    document.getElementById("benutzer").style.border="2px solid red";
			window.alert("Matrikelnummer oder Passwort falsch!");
			document.getElementById("benutzer").value="";
			document.getElementById("passwort").value="";
			return false;
		}
		else{
			nameReg = matrikeln[ind];
		}
	}
	
	regdaten = getStorage(nameReg);
	passwortReg = regdaten[8];
	
	//Wenn eingegebenen Daten mit den Daten der Registrierung übereinstimmen
	if(passwortL == passwortReg){
		//sessionStorage Element zum Abfragen, ob in dieser Session schon eingeloggt wurde
		sessionStorage.setItem("login","true,"+nameReg);
		//Einblenden der Nachricht zum erfolgreichen Login
		document.getElementById("logInAlert").style.display = "block";
		//Ausblenden des Anmeldebereiches
		document.getElementById("anmelden").style.display="none";
		//Einblenden des Warenkorbbereiches
		document.getElementById("warenkorb").style.display="block";
		//Ausblenden der Loginnachricht nach 3s
		window.setTimeout("document.getElementById('logInAlert').style.display='none'",3000)
	}
	//Wenn Daten nicht übereinstimmen
	else{
		document.getElementById("passwort").style.border="2px solid red";
		document.getElementById("benutzer").style.border="2px solid red";
		document.getElementById("benutzer").value="";
		document.getElementById("passwort").value="";
		window.alert("Matrikelnummer oder Passwort falsch!");
		//Einblenden der Login-Daten zur Vereinfachung während Entwicklung
		//window.alert("LogInDaten: \n"+nameReg+"\n"+passwortReg);
	}
}

//Abfrage, ob bereits ein login betätigt wurde --> Startseite, Impressum, Ueber_uns PRO SEITENAUFRUF
function logInAbfrage()
{
	//localStorage.clear(); //--> FALLS NOTWENDIG LOCALSTORAGE KOMPLETT LÖSCHEN
	//sessionStorage.clear(); //--> FALLS NOTWENDIG SESSIONSTORAGE KOMPLETT LÖSCHEN
	var login = sessionStorage.getItem("login");
	if(login == null)
	{
		login="false";
	}
	login = login.split(",");

	//Auslesen des sessionStorage-Elements mit Namen "login"
	switch(login[0]){
		case null || "false": 
			//Einblenden des Anmeldebereiches und Ausblenden des Warenkorbs
			document.querySelector("#anmelden").style.display="block";
			document.getElementById("warenkorb").style.display="none";
			break;
		case "true":
			//Einblenden Warenkorb und Ausblenden Anmeldebereich
			document.querySelector("#anmelden").style.display="none";
			document.getElementById("warenkorb").style.display="block";
			break;
		default:
			break;		
	}
}


//Auslesen des localStorage
function getStorage(name){
	var daten = localStorage.getItem(name);
	daten==null ? daten="false" : daten = daten.split(",");
	return daten;
}
