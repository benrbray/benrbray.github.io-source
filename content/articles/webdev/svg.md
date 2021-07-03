Title:  SVG
Date:  03 March 2020
unpublished: True
Category: articles
tags: svg, drawing
tools: svg, typescript
Summary:  What I've learned about the Scalable Vector Graphics (SVG) format.

# Guides

* Joni Trythall, [SVG Pocket Guide](https://svgpocketguide.com/book/)

# Libraries

### [`SVG.js`](https://svgjs.com/docs/3.0/)

<div id="container-svgjs"></div>
<script src="https://cdn.jsdelivr.net/npm/@svgdotjs/svg.js@3.0/dist/svg.min.js"></script>
<script type="module">
let container = document.getElementById("container-svgjs");
var draw = SVG().addTo(container).size(300, 300)
var rect = draw.rect(100, 100).attr({ fill: '#f06' })
</script>


### [`Raphael`](http://raphaeljs.com/)

Example:

<div id="container"></div>
<script src="http://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js"> </script> 
<script> 
let container = document.getElementById("container");
var paper = Raphael(container, 500, 300); 
var dot = paper.circle(250, 150, 30).attr({ 
fill: "#FFF", 
stroke: "#000", 
"stroke-width": 1 
}); 
</script>

### `Paper.js`

* The "swiss army knife" of Vector Graphics Scripting
* Runs on top of HTML5 Canvas
* Scene Graph / Document Object Model for vector graphics: Work with nested layers, groups, paths, compound paths, rasters, symbols etc.

### [`Snap.svg`](http://snapsvg.io/)

# Neat Examples

* Here Dragons Abound, [Pencil Effect in SVG](https://heredragonsabound.blogspot.com/2020/02/creating-pencil-effect-in-svg.html)
* Choc, [Traceable Programming](https://www.newline.co/choc/)