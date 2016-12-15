# rpolygon
Draws a random pattern of random polygons to a canvas.

## Installation
`npm install rpolygon`

## Usage
Add this, or some variation, to your head tag and modify it for your use case: 
```
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/paper.js/0.10.2/paper-full.min.js"></script>
<script type="text/javascript" src="node_modules/rpolygon/rpolygon.js"></script>
<script type="text/javascript">
	window.onload = function() {

      // Get a reference to the canvas object
		var canvas = document.getElementById('rpolygonCanvas');

      fillCanvas(canvas, '#adeba8');

	}
</script>
```
