
// Use the function... 
window.onscroll = scroll;
	
// JS scroll effects... 
// Called immediately		
function scroll () {
	
	var isScroll;
	
	if(window.pageYOffset>100){
			
		var element = document.getElementById('menuBar');
		element.style.opacity = "0.6";
		element.style.filter  = 'alpha(opacity=60)'; // IE fallback
		element.style.borderBottomWidth = "0px";	

		
		var elementLogo = document.getElementById('logoLink');
		elementLogo.style.borderLeftWidth = "0px";
		elementLogo.style.borderTopWidth = "0";
		isScroll = true;
		
	}
	else{
		var element = document.getElementById('menuBar');
		element.style.opacity = "1.0";
		element.style.filter  = 'alpha(opacity=100)'; // IE fallback
		element.style.borderBottomWidth = "11px";	
		
		var elementLogo = document.getElementById('logoLink');	
		elementLogo.style.borderLeftWidth = "5px";
		elementLogo.style.borderTopWidth = "3px";
		
		isScroll = false; 
		
	}
	
	return isScroll;
	
}

// Called on mouseover... 
function ifScrolledOpacityShift () {
	
	if(scroll()){
		var element = document.getElementById('menuBar');
		element.style.opacity = "1.0";
		element.style.filter  = 'alpha(opacity=100)'; // IE fallback
		element.style.borderBottomWidth = "11px";	
		
		var elementLogo = document.getElementById('logoLink');	
		elementLogo.style.borderLeftWidth = "5px";
		elementLogo.style.borderTopWidth = "3px";
		
	}
	else{
		scroll();
	}
	
}





