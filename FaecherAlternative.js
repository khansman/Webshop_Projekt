//Einblenden der Wahlpflichtfächer
var timeout;

function wahlpflichtEinblenden(ele){

	document.getElementById("wahlpflicht"+ele).classList.toggle("animationStart",true);
	clearTimeout(timeout);
	document.getElementById("wahlpflicht"+ele).style.display="block";
}

function wahlpflichtAusblenden(ele){
	timeout = setTimeout(function(){wahlpflichtAusblendenAnimate(ele);},200);
}

function wahlpflichtAusblendenAnimate(tmp){
	document.getElementById("wahlpflicht"+tmp).classList.remove("animationStart");
	document.getElementById("wahlpflicht"+tmp).classList.toggle("animationEnd",true);
	setTimeout(function(){wahlpflicht(tmp);},450);
	
}

function wahlpflicht(ele){
	document.getElementById("wahlpflicht"+ele).classList.remove("animationEnd");
	document.getElementById("wahlpflicht"+ele).style.display='none';
}

//----------------------------------------------

//Änderung der Studienpläne je nach Auswahl
function studienfaecher(){
	var param = sessionStorage.getItem("study");
	document.getElementById(param+"L").style.textDecoration="underline";
	
	switch(param){
		case "wif": 
			document.getElementById("wif").style.display="block";
			document.getElementById("inf").style.display="none";
			document.getElementById("cv").style.display="none";
			document.getElementById("inginf").style.display="none";
			break;
		case "inf":
			document.getElementById("inf").style.display="block";
			document.getElementById("wif").style.display="none";
			document.getElementById("cv").style.display="none";
			document.getElementById("inginf").style.display="none";
			break;
		case "ingInf":
			document.getElementById("inginf").style.display="block";
			document.getElementById("inf").style.display="none";
			document.getElementById("cv").style.display="none";
			document.getElementById("wif").style.display="none";
			break;
		case "cv":
			document.getElementById("cv").style.display="block";
			document.getElementById("inf").style.display="none";
			document.getElementById("wif").style.display="none";
			document.getElementById("inginf").style.display="none";
			break;
	}
}


//Überprüfung auf Loginstatus und Freischalten/Blockieren der Links je nach Status
function buchungEnabled(){
	var login = sessionStorage.getItem("login");
	if(login==null) {login="false";}
	var elemente = document.querySelectorAll(".faecher");
	var wpfElemente = document.querySelectorAll(".wahlpflichtFaecher");
	var links = document.querySelectorAll(".link");
	if(login == "false")
	{
		document.getElementById("loginWarning").style.display="block";
		for(i=0;i<elemente.length;i++)
			{
				elemente[i].style.border="2px solid red";
				elemente[i].style.cursor="not-allowed";
				links[i].href="#";
				elemente[i].style.backgroundColor="red";
			}
		for(k=0;k<wpfElemente.length;k++)
		{	
			wpfElemente[k].disabled="true";
			wpfElemente[k].style.cursor="not-allowed";
			wpfElemente[k].style.textDecoration="none";
			wpfElemente[k].href="#";
		}
	}
	else{
		if((login[0]=="false") ||(login[0]==null)){
			document.getElementById("loginWarning").style.display="block";
		for(i=0;i<elemente.length;i++)
			{
				elemente[i].classList.remove("disabled");	
			}
		for(k=0;k<wpfElemente.length;k++)
		{
			wpfElemente[k].disabled="false";
			wpfElemente[k].style.cursor="pointer";
			wpfElemente[k].href="";
		}
	}
	}
}