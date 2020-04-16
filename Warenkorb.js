
//Aktualisieren des Preises des jeweiligen Produkts
function actualPrice(number){
	document.getElementById("preis"+number).value=document.getElementById("Menge"+number).value*9.99;
} 

//Löschen eines Produktes	
function clear_element(number){
	var counter;
	sessionStorage.getItem('counter')!=null? counter=parseInt(sessionStorage.getItem("counter"))-1 : counter=0;
	document.getElementById("warenNr").innerHTML = counter+"/3";
	sessionStorage.setItem("counter",counter);
	
	var inhalt = sessionStorage.getItem("warenkorbInhalt").split("/");
	if(inhalt.length<=1){
		sessionStorage.removeItem("warenkorbInhalt");
	}
	else{
	inhalt.splice(number,1);
	sessionStorage.setItem("warenkorbInhalt",inhalt.join("/"));
	}
	
	
	document.getElementById("div"+number).style.display="none";
	
	var faecher = sessionStorage.getItem("warenkorbFaecher").split("/");
	if(faecher.length<=1){
		sessionStorage.removeItem("warenkorbFaecher");
	}
	else{
	faecher.splice(number,1);
	sessionStorage.setItem("warenkorbFaecher",faecher.join("/"));
	}
	
	location.reload();	
}

//Summe aller Einzelpreise
function summe(){
	var counter;
	sessionStorage.getItem('counter')!=null? counter=sessionStorage.getItem("counter") : counter=0;
	document.getElementById("warenNr").innerHTML = counter+"/3";
	
	var x = 0.00;
	var i = 0;
	while(i<counter){ /*Anzahl elemente auslesen aus der anzeige*/
		if(document.getElementById("div"+i).style.display != ""){
			x = x+parseFloat(document.getElementById("preis"+i).value); /*der mengen preis wird genommen*/
		}
		i = i+1;
	}
	if(x<1.00){
		document.getElementById("buchen").style.display="none";
		
	}
	else{
		document.getElementById("buchen").style.display="block";
	}
	document.getElementById("summe").innerHTML="Gesamtsumme: "+x.toFixed(2)+"€";
}
	
//Füllen des Warenkorb-Templates	
function fuellen(){
	var data = sessionStorage.getItem("warenkorbInhalt");
	if((data!="") && (data!=null)){
	data = data.split("/");
	for(i=0;i<data.length;i++){
		document.getElementById("div"+i).style.display = "block";
		var lehrerData = data[i].split("#");
		document.getElementById("name"+i).value = lehrerData[0];
		document.getElementById("fach"+i).value = lehrerData[3];
		document.getElementById("zeit"+i).value = lehrerData[2];
		document.getElementById("Ort"+i).value = lehrerData[1];
		
	}
	}
}

//Sicherheitsfrage an den Nutzer
function sicherung(){
	if(window.confirm("Sind Sie sicher? \n\n" +document.getElementById("summe").innerHTML))
	{
		window.location.href="Bezahlen.html";
	}
}

