"use strict";

/* DEMOLICIOUS.JS
 * Lightweight library to quickly demo small projects with minimal interaction.
 */

var STATUS_PROGRESS = 0;
var STATUS_DONE = 1;

////////////////////////////////////////////////////////////////////////////////

/* SIMPLEIMAGEPROCESSINGDEMO
 * 
 */
function SimpleImageProcessDemo(sourceCanvas, targetCanvas, demoPath){
	var demo = this;
	
	// canvas
	this.sourceCanvas = sourceCanvas;
	this.sourceContext = sourceCanvas.getContext("2d");
	this.targetCanvas = targetCanvas;
	this.targetContext = targetCanvas.getContext("2d");
	
	// dimensions
	this.width = this.sourceCanvas.width;
	this.height = this.sourceCanvas.height;
	
	// demo
	this.demoPath = demoPath;
	this.worker = null;
	
	/* PROCESS
	 * Runs the demo script and waits for completion, optionally updating the
	 * user interface when progress is reported.
	 */
	this.process = function(message){
		console.log("Demolicious: Processing...");
		
		// init webworker
		this.worker = new Worker(this.demoPath);
		this.worker.onmessage = function(evt){
			var message = evt.data.message;
			switch(evt.data.status){
				case STATUS_PROGRESS:
					break;
				case STATUS_DONE:
					demo.finished(message);
					break;
			}
		}
		
		// start webworker
		this.worker.postMessage({
			"sourceData": this.sourceContext.getImageData(0,0,this.width,this.height),
			"targetData": this.targetContext.createImageData(targetCanvas.width, targetCanvas.height),
			"message": message
		});
	}
	
	this.progress = function(message){
		
	}
	
	this.finished = function(message){
		console.log("Demolicious: Finished processing.");
		
		// check for ImageData
		if(message.imgData===undefined)
			console.error("STATUS_DONE: Expected message.imgData.");
		// draw to canvas
		this.targetCanvas.width = message.imgData.width;
		this.targetCanvas.height = message.imgData.height;
		this.targetContext.putImageData(message.imgData, 0, 0);
	}
}