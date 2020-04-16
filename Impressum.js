//Einblenden Text für Impressum
function impShow(){
	var status = document.getElementById("imp").style.display;	
	status=="none" ? document.getElementById("imp").style.display="block" : document.getElementById("imp").style.display="none";
	status=="none" ? document.getElementById("impL").style.textDecoration="underline" : document.getElementById("impL").style.textDecoration="none";
}

//Einblenden Text für Disclaimer
function disclaimerShow(){
	var status = document.getElementById("disclaimer").style.display;
	status=="none" ? document.getElementById("disclaimer").style.display="block" : document.getElementById("disclaimer").style.display="none";
	status=="none" ? document.getElementById("disclaimerL").style.textDecoration="underline" : document.getElementById("disclaimerL").style.textDecoration="none";
}

//Einblenden Text für Links
function linksShow(){
	var status = document.getElementById("links").style.display;
	status=="none" ? document.getElementById("links").style.display="block" : document.getElementById("links").style.display="none";
	status=="none" ? document.getElementById("linksL").style.textDecoration="underline" : document.getElementById("linksL").style.textDecoration="none";
}

//Einblenden Text für Urheber- und Kennzeichenrecht
function urheberShow(){
	var status = document.getElementById("urheber").style.display;
	status=="none" ? document.getElementById("urheber").style.display="block" : document.getElementById("urheber").style.display="none";
	status=="none" ? document.getElementById("urheberL").style.textDecoration="underline" : document.getElementById("urheberL").style.textDecoration="none";
}