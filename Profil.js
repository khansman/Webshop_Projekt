//Auslesen der Registrierungsdaten und Füllen der Textfelder
function profilFuellen(){
	//Daten aus localStorage auslesen
	var logindaten = sessionStorage.getItem("login");
	logindaten = logindaten.split(",");
	var daten = localStorage.getItem(logindaten[1]).split("$");
	var anbieterStatus;
	var sucherStatus;
	//Abfrage, welche Checkbox(en) angeklickt wurde(n)
	daten[6] == "true" ? sucherStatus=true : sucherStatus=false;
	daten[7] == "true" ? anbieterStatus=true : anbieterStatus=false;
	//localStorage-Element, welches beschreibt, ob man Daten bearbeiten kann oder nicht
	localStorage.setItem("bearbeitung","false");
	//Füllen der Daten in die Textfelder
	document.getElementById("name").value = daten[0];
	document.getElementById("matrikel").value = daten[1];
	document.getElementById("semester").value = daten[2];
	document.getElementById("study").value = daten[3];
	document.getElementById("email").value = daten[4];
	document.getElementById("tele").value = daten[5];
	document.getElementById("sucher").checked = sucherStatus;
	document.getElementById("anbieter").checked = anbieterStatus;
	document.getElementById("passwort").value = daten[8];
	document.getElementById("info").value=daten[9];
	document.getElementById("study").disabled = true;
	if(anbieterStatus){
		var faecher = daten[10].split("/");
		newFaecherOptions();
		
		for(var i=0;i<document.getElementById("fach").options.length;i++)
		{
		for(var k=0;k<faecher.length;k++)
		{
			if(document.getElementById("fach").options[i].text == faecher[k])
			{
				document.getElementById("fach").options[i].selected = true;
			}
		}
		}
	
		var zeiten = daten[12].split("#");
		for(var i=0;i<zeiten.length;i++)
		{
		document.getElementById("zeitenProfil").value+="\n"+zeiten[i]+" Uhr";
		}
	
		document.getElementById("fach").style.display="block";
		document.getElementById("fachL").style.display="block";
		document.getElementById("zeitenProfilL").style.display="block";
		document.getElementById("zeitenProfil").style.display="block";
	}
		else{
		document.getElementById("fach").style.display="none";
		document.getElementById("fachL").style.display="none";
		}
	
	
	//window.alert(daten[10]);
	
}

function newFaecherOptions(){
	var studiengang = document.getElementById('study').options[document.getElementById('study').selectedIndex].text;
	switch(studiengang){
		case "Informatik": 
			document.getElementById("fach").options[3].text="Bioinformatik";
			document.getElementById("fach").options[4].text="Data Mining - Einführung in Data Mining 2";
			document.getElementById("fach").options[5].text="Human-Learner-Interaction";
			break;
		case "Wirtschaftsinformatik":
			document.getElementById("fach").options[3].text="Theoretische Informatik";
			document.getElementById("fach").options[4].text="Technische Aspekte der IT-Sicherheit";
			document.getElementById("fach").options[5].text="Logik";
			break;
		case "Computervisualistik":
			document.getElementById("fach").options[3].text="Medizinische Bildverarbeitung";
			document.getElementById("fach").options[4].text="Mesh Processing";
			document.getElementById("fach").options[5].text="Technische Aspekte der IT-Sicherheit";
			break;
		case "Ingenieurinformatik":
			document.getElementById("fach").options[3].text="Technische Aspekte der IT-Sicherheit";
			document.getElementById("fach").options[4].text="Computernetze";
			document.getElementById("fach").options[5].text="Bauelemente der Leistungselektronik";
			break;
		default:
			break;
								
	}
}


//Bearbeiten von Daten
function bearbeiten(){
	//Abfrage des localStorage-Elementes
	//Wenn man vorher nicht bearbeiten konnte --> Freischalten aller Elemente zum Schreiben/Anklicken
	//Umbennen des Buttons in "Speichern"
	var logindaten = sessionStorage.getItem("login");
	logindaten = logindaten.split(",");
	var daten = getStorage(logindaten[1]);
	if(localStorage.getItem("bearbeitung") == "false"){
		localStorage.setItem("bearbeitung","true");
		document.getElementById("logout_Bild").style.display="none";
		document.querySelector("#profilL").style.border="none";
		document.getElementById("regButton").value="Speichern";
		document.getElementById("bearbeitungsmodus").style.display="block";
		document.getElementById("name").readOnly=false;
		document.getElementById("semester").type="number";
		document.getElementById("semester").readOnly=false;
		document.getElementById("study").disabled=false;
		document.getElementById("email").readOnly=false;
		document.getElementById("tele").readOnly=false;
		document.getElementById("sucher").onclick = function(){return false;};
		document.getElementById("anbieter").onclick = function(){return false;};
		document.getElementById("passwort").readOnly=false;
		document.getElementById("fach").disabled=false;
	}
	//Wenn man bereits bearbeiten konnte --> Auslesen der neuen Daten, Überprüfen auf Korrektheit und Überschreiben des localStorage
	//Setzen des Buttons auf "Bearbeiten"
	//Neuladen der Seite zum Aktualisieren
	else{
		localStorage.setItem("bearbeitung","false");
		var name = document.getElementById('name').value;
		var matrikel = document.getElementById('matrikel').value;
		var fachsemester = document.getElementById('semester').value;
		var studiengang = document.getElementById('study').value;
		var elekmail = document.getElementById('email').value;
		var telefon = document.getElementById('tele').value;
		var fachSelect = document.getElementById("fach");
		var faecher= [];
		var nachhilfeBk = document.getElementById('sucher').checked;
		var nachhilfeAb = document.getElementById('anbieter').checked;
		var passwort = document.getElementById('passwort').value;
		var info = document.getElementById("info").value;
		if(nachhilfeAb){
		for(var i=0;i<fachSelect.options.length;i++)
		{
			var pos=fachSelect.options[i];
			if(pos.selected){
				faecher.push(pos.value);
			}
		}
		}
		var regdaten = [name,matrikel,fachsemester,studiengang,elekmail,telefon,nachhilfeBk,nachhilfeAb,passwort,info,faecher.join("/"),"buchungen",daten[12]];
		if(inputControl(name,studiengang,matrikel,passwort,nachhilfeAb,nachhilfeBk,telefon,faecher)==true){	
			window.localStorage.setItem(matrikel, regdaten.join("$"));
			//window.alert(getStorage(matrikel));
			window.location.reload();
		}
		
	}
}

function profil_Orders(){
	if(document.getElementById("bestellungen").classList.contains("inactive"))
	{
	document.getElementById("bestellungen").classList.remove("inactive");
	document.getElementById("bestellungen").style.textDecoration="underline";
	document.getElementById("profil").classList.add("inactive");
	document.getElementById("profil").style.textDecoration="none";
	document.getElementById("profilL").style.display="none";
	}
	else if(document.getElementById("profil").classList.contains("inactive")){
	document.getElementById("profil").classList.remove("inactive");
	document.getElementById("profil").style.textDecoration="underline";
	document.getElementById("bestellungen").classList.add("inactive");
	document.getElementById("bestellungen").style.textDecoration="none";
	document.getElementById("profilL").style.display="block";
	}
}

function showFaecher(){
	if(document.getElementById("anbieter").checked)
	{
		document.getElementById("fach").style.display="block";
		document.getElementById("fachL").style.display="block";
		//document.getElementById("zeitenProfil").style.display="block";
		//document.getElementById("zeitenProfilL").style.display="block";
	}
	else{
		document.getElementById("fach").style.display="none";
		document.getElementById("fachL").style.display="none";
		//document.getElementById("zeitenProfilL").style.display="none";
		//document.getElementById("zeitenProfil").style.display="none";
	}
}

//Löschen der Registrierungsdaten aus dem localStorage
function löschen(){
	
	 if(window.confirm("Möchten Sie Ihr Profil wirklich löschen?")){
		 var loginMatrikel = sessionStorage.getItem("login").split(",");
		 loginMatrikel = loginMatrikel[1];
		 var matrikeln = getStorage("matrikelnummern");
		 var actualMatrikelIndex=matrikeln.indexOf(loginMatrikel);
		 matrikeln.splice(actualMatrikelIndex,1);
		 window.localStorage.setItem("matrikelnummern",matrikeln.join("$"));
		 localStorage.removeItem(loginMatrikel);
		 sessionStorage.setItem("login","false");
		 window.location.href="Startseite.html";
	 }
}
//Überprüfungsfunktion der Eingabedaten
function inputControl(name, studiengang, matrikel, passwort, nachhilfeAb, nachhilfeBk,telefon,faecher){
	var passControl = false;
	var matrikelControl = false;
	var nameControl = false;
	var studyControl = false;
	var checkControl = false;
	var telefonControl = false;
	var fehler="Fehler: \n\n";
	var matrikeln = getStorage("matrikelnummern");
	var faecherControl = false;
	
	if(nachhilfeAb && faecher.length<1)
	{
		fehler+="Es muss mindendest ein Fach für das Nachhilfeangebot ausgewählt werden!\n";
		document.getElementById("fach").style.border="2px solid red";
	}
	else{
		document.getElementById("fach").style.border="1px solid gray";
		faecherControl = true;
	}

	if(studiengang != ("Informatik" || "Computervisualistik" || "Wirtschaftsinformatik" || "Ingenieurinformatik"));
	
	
	//Name nicht leer
	if(name != ""){
		document.getElementById("name").style.border="1px solid gray";
		nameControl=true;
	}
	else{
		fehler += "- Name leer! \n";
		document.getElementById("name").style.border="2px solid red";
	}
	
	switch(matrikel){
		case('' || matrikel.length<6):
			fehler += "- Matrikelnummer leer oder zu kurz!\n";
			document.getElementById("matrikel").style.border="2px solid red";
			break;
		case (isNaN(Number(matrikel))):
			fehler += "- Matrikelnummer ist nicht numerisch! \n";
			document.getElementById("matrikel").style.border="2px solid red";
			break;
		default:
			document.getElementById("matrikel").style.border="1px solid gray";
			matrikelControl = true;
	}
	
	
	
	//Übereinstimmung Passwort und Bestätigung
	if(passwort!=""){ 
		passControl = true;
		document.getElementById("passwort").style.border="1px solid gray";
	}
	else{
		fehler+= "- Passwörter stimmen nicht überein oder leer! \n";
		document.getElementById("passwort").style.border="2px solid red";
	}
	
	
	//Eine der Checkboxen bestätigt
	if(nachhilfeAb || nachhilfeBk){
		document.getElementById("nh").style.border="1px solid gray";
		checkControl = true;
	}
	else{
		fehler+= "- Keine Checkbox ausgewählt! \n";
		document.getElementById("nh").style.border="2px solid red";
	}
	
	
	switch(telefon){
		case '':
			document.getElementById("tele").style.border="1px solid gray";
			checkControl=true;
			break;
		case isNaN(Number(telefon)):
			document.getElementById("tele").style.border="2px solid red";
			fehler += "- Telefonnummerformat falsch!";
			break;
		default:
			document.getElementById("tele").style.border="1px solid gray";
			telefonControl=true;
	}
			
			
	//Wenn alle Abfragen positiv --> Rückgabe "true --> wenn nicht Fehlerausgabe
	if(passControl && matrikelControl && nameControl && checkControl && faecherControl){
		return true;
	}
	else{
		window.alert(fehler+"\n");
		return false;
	}
		
}
	
//logout-Funktion
//Bestätigungsanfrage
//Setzen des sessionStorage-Elementes "login" auf false
//Weiterleiten auf Startseite
function logout(){ 
	if(window.confirm("Sind Sie sich sicher?")){
		sessionStorage.setItem('login','false'); 
		window.location.href='Startseite.html';
	}
}

//Auslesen des localStorage
function getStorage(name){
	var daten = localStorage.getItem(name);
	daten = daten.split("$");
	return daten;
}


//Umschalten zwischen Klartext und Passwort
function passwortSicht(name){
	document.getElementById(name).type=="text" ? document.getElementById(name).type="password" : document.getElementById(name).type="text";
}