//Auslesen der Daten aus den Textfelder + Überprüfung der Daten auf Korrektheit  --> REGISTRIERUNG.html
var zaehler=0;

function auslesen(){
	var name = document.getElementById('name').value;
	var matrikel = document.getElementById('matrikel').value;
	var fachsemester = document.getElementById('semester').value;
	var studiengang = document.getElementById('study').options[document.getElementById('study').selectedIndex].text;
	var elekmail = document.getElementById('email').value;
	var fachSelect = document.getElementById("fach");
	var faecher = [];
	var wochentage = [document.getElementById("Montag").checked,document.getElementById("Dienstag").checked,document.getElementById("Mittwoch").checked,document.getElementById("Donnerstag").checked,document.getElementById("Freitag").checked];
	var zeiten = [];
	var help=["Montag","Dienstag","Mittwoch","Donnerstag","Freitag"];
	var telefon = document.getElementById('tele').value;
	var nachhilfeBk = document.getElementById('sucher').checked;
	var nachhilfeAb = document.getElementById('anbieter').checked;
	var passwort = document.getElementById('passwort').value;
	var passwortB = document.getElementById('passwortB').value;
	var info = document.getElementById("info").value;
	
	var bool = true;
	for(var i=0,k=0;i<wochentage.length;i++){
		if(wochentage[i]==true){
				if((document.getElementById(help[i]+"1").value!="") && (document.getElementById(help[i]+"2").value!=""))
				{
				zeiten[k]=help[i]+" "+document.getElementById(help[i]+"1").value;
				zeiten[k+1]=help[i]+" "+document.getElementById(help[i]+"2").value;
				k+=2;
				}
				else{
				document.getElementById(help[i]+"1").style.border = "2px solid red";
				document.getElementById(help[i]+"2").style.border = "2px solid red";
				bool = false;
				}
			}
	}
	if(bool == false){
	window.alert("Bitte beide Textfelder für die Nachhilfezeiten ausfüllen!");		
	return false;
	}
	
	for(var i=0;i<fachSelect.options.length;i++)
	{
		var pos=fachSelect.options[i];
		if(pos.selected){
			faecher.push(pos.value);
		}
	}
	
	
	//Datenarray
	var regdaten = [name,matrikel,fachsemester,studiengang,elekmail,telefon,nachhilfeBk,nachhilfeAb,passwort,info,faecher.join("/"),"Buchungen",zeiten.join("#")];
	
	if(inputControl(name,matrikel,passwort,passwortB,nachhilfeAb,nachhilfeBk,telefon,faecher)==true){	
		//Speichern des Datenarrays als Zeichenkette im localStorage mit Namen "regDaten"
		localStorage.setItem(matrikel, regdaten.join("$"));
		//Ausgabe der Daten als Kontrolle
		//window.alert(getStorage(matrikel));		
		var matrikeln = getStorage("matrikelnummern");
		if(matrikeln!="false"){
			matrikeln.push(matrikel);
			localStorage.setItem("matrikelnummern",matrikeln.join("$"));
		}
		else{
			localStorage.setItem("matrikelnummern",matrikel);
		}
		
		//window.alert(getStorage("matrikelnummern"));
		window.document.location.href="RegistrierungErfolg.html";
	}
	
}



//Überprüfungsfunktion der ausgelesenen Daten
function inputControl(name,matrikel,passwort,passwortB,nachhilfeAb,nachhilfeBk,telefon,faecher){
	
	var passControl = false;
	var matrikelControl = false;
	var nameControl = false;
	var checkControl = false;
	//String zur Ausgabe der vorhandenen Fehler
	var fehler="Fehler: \n\n";
	var matrikeln = getStorage("matrikelnummern");
	var faecherControl=false;
	var matrikelnControl=false;
	var telefonControl=false;
	
	if(zaehler>=3){
		fehler+="- Zu viele Tage für die Nachhilfe ausgewählt! \n";
	}
	
	if(nachhilfeAb && faecher.length<1)
	{
		fehler+="- Es muss mindestens ein Fach für das Nachhilfeangebot ausgewählt werden!\n";
		document.getElementById("fach").style.border="2px solid red";
	}
	else{
		document.getElementById("fach").style.border="1px solid gray";
		faecherControl = true;
	}
	
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
		default:
			document.getElementById("matrikel").style.border="1px solid gray";
			matrikelControl = true;
	}
	
	if(matrikeln.length>=1)
	{
		var ind = matrikeln.indexOf(matrikel);
		if(ind == -1)
		{
			matrikelnControl = true;
		}
		else{
			matrikelnControl = false;
			document.getElementById("matrikel").style.border="2px solid red";
			fehler += "- Matrikelnummer ist schon registriert! \n";
		}
	}
	else{
		matrikelnControl = true;
	}
	
	
	//Übereinstimmung Passwort und Bestätigung
	if((passwort==passwortB) && (passwort!="")){ 
		passControl = true;
		document.getElementById("passwort").style.border="1px solid gray";
		document.getElementById("passwortB").style.border="1px solid gray";
	}
	else{
		fehler+= "- Passwörter stimmen nicht überein oder leer! \n";
		document.getElementById("passwort").style.border="2px solid red";
		document.getElementById("passwortB").style.border="2px solid red";
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
	
	//Telefonnummer leer
	switch(telefon){
		case '':
			document.getElementById("tele").style.border="1px solid gray";
			telefonControl=true;
			break;
		case isNaN(""+telefon):
			document.getElementById("tele").style.border="2px solid red";
			fehler += "- Telefonnummerformat falsch!";
			break;
		default:
			document.getElementById("tele").style.border="1px solid gray";
			telefonControl=true;
	}
	
	
	//Wenn alle Abfragen positiv --> Rückgabe "true" --> wenn nicht Fehlerausgabe
	if(passControl && matrikelControl && nameControl && checkControl && faecherControl && matrikelnControl && telefonControl){
		return true;
	}
	else{
		window.alert(fehler+"\n");
		return false;
	}
		
}

function zahl() {
	var param=""+document.getElementById("matrikel").value;
	
if (isNaN(param) ) {
	document.getElementById("matrikel").value = "";
	document.getElementById("matrikel").focus();
	return false;
	}
}

function showFaecher(){
	if(document.getElementById("anbieter").checked)
	{
		document.getElementById("fach").style.display="block";
		document.getElementById("fachL").style.display="block";
		document.getElementById("zeiten").style.display="block";
		document.getElementById("zeitenL").style.display="block";
	}
	else{
		document.getElementById("fach").style.display="none";
		document.getElementById("fachL").style.display="none";
		document.getElementById("zeiten").style.display="none";
		document.getElementById("zeitenL").style.display="none";
	}
}


function zeitenDisplay(wochentag){
	var haken=document.getElementById(wochentag).checked;
		switch(haken)
		{
			case true: 
				document.getElementById(wochentag+"1").style.display="block";
				document.getElementById(wochentag+"2").style.display="block";
				zaehler++;
				break;
			case false:
				document.getElementById(wochentag+"1").style.display="none";
				document.getElementById(wochentag+"2").style.display="none";
				zaehler--;
				break;
			default:
				break;
				
		}
	if(zaehler>=3){
		document.getElementById("zeiten").style.border="2px solid red";
	}
	else{
		document.getElementById("zeiten").style.border="none";
	}
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

//Ausgabe Benutzername(Matrikelnummer) und Passwort --> REGISTRIERUNGERFOLG.html
function zusammenfassung(){
	//Aufruf Auslesefunktion mit Namen des localStorage-Elements als Parameter
	var matrikeln = getStorage("matrikelnummern");
	var daten = getStorage(matrikeln[matrikeln.length-1]);
	//Ausgabe Matrikelnummer
	document.getElementById("benutzer").value = daten[1];
	//Ausgabe Passwort
	document.getElementById("passwort").value = daten[8];
}

//Umschalten Passwort und Klartext --> mehrere HTML-Seiten
function passwortSicht(name,nummer){
	document.getElementById(name).type=="text" ? document.getElementById(name).type="password" : document.getElementById(name).type="text";
}

//Auslesefunktion für localStorage + Aufsplitten in Array + Rückgabe des Arrays
function getStorage(name){
	var daten = localStorage.getItem(name);
	if(daten == null){
		return "false";
	}
	else{
		return daten.split("$");
	}
}









