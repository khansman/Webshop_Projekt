var timeout;
//localStorage.clear();
//array = [Vor-und Nachname,Matrikelnummer,Fachsemester,Studiengang,email,telefon,NachhilfeBekommen,NachhilfeAnbieten,Passwort,Info,Fächer,Buchungen,Zeiten];
lehrer1 = ["Max Schulze","123456","5","Ingenieurinformatik",,,false,true,"lehrer","Hallo, ich bin Max, bin 22 Jahre alt und studiere Ingeneurinformatik im 5.Semester. Ich erkläre sehr oft Kommilitonen die Übungsaufgaben und würde mich freuen auch euch helfen zu können. Egal ob Übungsaufgaben, Vorlesungsstoff oder Klausurvorbereitung, kommt gerne zu mir. Ich bin geduldig und erkläre euch alles in dem Tempo, wie es für euch am Besten ist.","Einführung in die Informatik/Computernetze/Bauelemente der Leistungselektronik/Technische Aspekte der IT-Sicherheit","Buchungen","Montag 13:00#Dienstag 15:00#Mittwoch 11:00#Donnerstag 13:00#Freitag 11:00#Freitag 13:00"];
lehrer2 = ["Anna Meier","654321","3","Wirtschaftsinformatik",,,false,true,"lehrer","Hi, ich bin Anna und studiere Wirtschaftsinformatik im 3.Semester. Ich finde das Konzept dieser Plattform sehr gut und möchte daher meine Hilfe anbieten. Da icg mich selbst im 3.Semester befinde, kann ich mich somit sehr gut in eure Situation hineinversetzen und kan mich auch noch gut an die Lehrinhalte erinnern. Ich würde mich freuen, wenn ihre meine Hilfe in Anspruch nehmt! :)","Mathematik 1/Mathematik 2/Einführung in die Informatik/Theoretische Informatik","Buchungen","Montag 11:00#Montag 15:00#Dienstag 17:00#Mittwoch 11:00#Donnerstag 15:00#Freitag 13:00"];
lehrer3 = ["Luisa Klein","135246","4","Computervisualistik",,,false,true,"lehrer","Hallo, ich bin Lisa, bin 25 Jahre alt und studiere Computervisualistik im 4.Semester. Ich bin ein sehr positiver, motivierter und hilfsbereiter Mensch und komme mit jedem zurecht, egal ob du alles von Anfang an erklärt haben musst oder du nur einen kleinen Denkanstoß brauchst. Mir haben die oben genannten Fächer sehr viel Spaß gemacht und ich hoffe ich kann euch ein wenig motivieren und euch mit meiner positiven Art anstecken. Ich freue mich, wenn ich euch helfen kann!","Mathematik 1/Mathematik 2/Medizinische Bildverarbeitung/Logik","Buchungen","Montag 15:00#Dienstag 15:00#Mittwoch 11:00#Mittwoch 17:00#Donnerstag 9:00#Freitag 11:00"];
lehrer4 = ["Julius Hoffmann","642531","5","Informatik",,,false,true,"lehrer","Hey, ich bin Julius und studiere seit 5 Semestern Informatik. Ich habe diverse Kenntnisse im Bereich der Informatik und habe neben dem Studium auch in meiner Freizeit viel mit den Themen zu tun. Ich würde gerne mein Wissen mit euch teilen und gerne dazu beitragen, euer Studium etwas angenehmer und verständlicher zu gestalten.","Einführung in die Informatik/Mathematik 2/Bioinformatik/Data Mining - Einführung in Data Mining 2/Human Learner-Interaction","Buchungen","Montag 11:00#Montag 15:00#Dienstag 11:00#Donnerstag 9:00#Donnerstag 13:00#Freitag 13:00"];
localStorage.setItem("123456",lehrer1.join("$"));
localStorage.setItem("654321",lehrer2.join("$"));
localStorage.setItem("135246",lehrer3.join("$"));
localStorage.setItem("642531",lehrer4.join("$"));
matrikelPrüfung("123456");
matrikelPrüfung("654321");
matrikelPrüfung("135246");
matrikelPrüfung("642531");


window.addEventListener( "pageshow", function ( event ) {
  var historyTraversal = event.persisted || 
                         ( typeof window.performance != "undefined" && 
                              window.performance.navigation.type === 2 );
  if ( historyTraversal ) {
    // Handle page restore.
    window.location.reload();
  }
});



function matrikelPrüfung(matrikel){
if(localStorage.getItem("matrikelnummern")!=null)
{
	var mn = localStorage.getItem("matrikelnummern").split("$");
	if(mn.indexOf(matrikel)==(-1))
	{
	mn.push(matrikel);
	localStorage.setItem("matrikelnummern",mn.join("$"));
	}
	else{
		return false;
	}
}
else{
	var mn = [matrikel];
	localStorage.setItem("matrikelnummern",mn.join("$"));
}

}

function menuEinblenden(){
	document.getElementById("subNav").classList.toggle("animationStart",true);
	clearTimeout(timeout);
	document.getElementById("subNav").style.display="block";
}

function menuAusblenden(){
	timeout = setTimeout(menuAusblendenAnimate,2000);
}

function menuAusblendenAnimate(){
	document.getElementById("subNav").classList.remove("animationStart");
	document.getElementById("subNav").classList.toggle("animationEnd",true);
	setTimeout(menu,450);
	
}

function menu(){
	document.getElementById("subNav").classList.remove("animationEnd");
	document.getElementById("subNav").style.display='none';
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
		//window.alert(matrikeln);
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
		sessionStorage.removeItem("warenkorbInhalt");
		sessionStorage.removeItem("warenkorbFaecher");
		sessionStorage.setItem("counter",0);
		//sessionStorage Element zum Abfragen, ob in dieser Session schon eingeloggt wurde
		sessionStorage.setItem("login","true,"+nameReg);
		sessionStorage.setItem("counter",'0');
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
	
	var counter;
	sessionStorage.getItem('counter')!=null? counter=sessionStorage.getItem("counter") : counter=0;
	document.getElementById("warenNr").innerHTML = counter+"/3";
}


//Auslesen des localStorage
function getStorage(name){
	var daten = localStorage.getItem(name);
	daten==null ? daten="false" : daten = daten.split("$");
	return daten;
}






