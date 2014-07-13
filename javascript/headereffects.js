window.onscroll = scroll;
	
// JS scroll effects... 		
function scroll () {
	
	var isScroll;
	
	if(window.pageYOffset>100){
			
		var element = document.getElementById('menuBar');
		element.style.opacity = "0.6";
		element.style.filter  = 'alpha(opacity=60)'; // IE fallback
		element.style.borderBottomWidth = "0px";	
		isScroll = true;
		
	}
	else{
		var element = document.getElementById('menuBar');
		element.style.opacity = "1.0";
		element.style.filter  = 'alpha(opacity=100)'; // IE fallback
		element.style.borderBottomWidth = "10px";	
		
		isScroll = false; 
		
	}
	
	return isScroll;
	
}

function ifScrolledOpacityShift () {
	
	if(scroll()){
		var element = document.getElementById('menuBar');
		element.style.opacity = "1.0";
		element.style.filter  = 'alpha(opacity=100)'; // IE fallback
		element.style.borderBottomWidth = "10px";	
	}
	else{
		scroll();
	}
	
}





