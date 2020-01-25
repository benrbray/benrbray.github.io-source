"use strict";
importScripts("lib/complex.min.js");

var STATUS_PROGRESS = 0;
var STATUS_DONE = 1;
var DEFAULT_FUNC = function(z){ return z.rPow(2); };

self.onmessage = function(evt){
	var message = evt.data.message;
	var complexFunc = Complex.parseFunction(message.complexFunc,["z"]) || DEFAULT_FUNC;
	
	process(complexFunc, evt.data.sourceData, evt.data.targetData,
			message.repeatTexture, message.fadeTexture);
}

////////////////////////////////////////////////////////////////////////////////

function Rectangle(x, y, w, h){
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
}
Rectangle.prototype.contains = function(x,y){
	return (x > this.x && x < this.x+this.w) && (y > this.y && y < this.y+this.h);
}

function process(complexFunc, sourceData, targetData, repeatTexture, fadeTexture){
	// dimensions
	var sourceWidth = sourceData.width;
	var sourceHeight = sourceData.height;
	var targetWidth = targetData.width;
	var targetHeight = targetData.height;
	
	var source = sourceData.data;
	var target = targetData.data;
	
	var sourceRect = new Rectangle(0, 0, sourceWidth, sourceHeight);
	var screenRect = new Rectangle(0, 0, targetWidth, targetHeight);
	
	var r1 = 1;
	var screenDomain = new Rectangle(-r1, -r1, 2*r1, 2*r1);
	var r2 = 1;
	var sourceDomain = new Rectangle(-r2, -r2, 2*r2, 2*r2);
	
	// iterate screen pixels, map to complex plane, and determine colors
	for(var x = 0; x < targetWidth; x++){
		for(var y = 0; y < targetHeight; y++){
			// map screen coordinates to complex domain
			var before = mapRect(x, targetHeight-y, screenRect, screenDomain);
			
			// apply function
			var after = complexFunc(before);
			
			// map result to source image to get color
			var sourcePoint = mapRect(after.r, -after.i, sourceDomain, sourceRect);
			var sourceX = sourcePoint.r | 0;
			var sourceY = sourcePoint.i | 0;
			
			// if not tiling, skip drawing if point is outside texture
			var display = repeatTexture || sourceRect.contains(sourceX, sourceY);
			if(!display) continue;
			
			// tile
			var reps = 1; // repetitions
			if(repeatTexture){
				if(sourceX < 0) reps++;
				if(sourceY < 0) reps++;
				reps += Math.abs(sourceX/sourceWidth)|0 + Math.abs(sourceY/sourceHeight)|0;
				sourceX = mod(sourceX, sourceWidth);
				sourceY = mod(sourceY, sourceHeight);
			}
			
			// compute source/target image indices
			var sourceIdx = (sourceX + sourceY * sourceWidth) * 4;
			var targetIdx = (x + y * targetWidth) * 4;
			
			// copy rgb channels
			for(var c = 0; c < 3; c++){
				target[targetIdx + c] = source[sourceIdx + c] / (fadeTexture?reps:1);
			}
			
			// full alpha
			target[targetIdx+3] = 255;// / reps;
		}
	}
	
	// done; send ImageData back
	postMessage({
		"status": STATUS_DONE,
		"message" : {
			"imgData": targetData
		}
	});
}

// Helpers ---------------------------------------------------------------------

// computes a % b that works for negatives
function mod(a, b){
	return ((a%b)+b)%b;
}

// scale screen (canvas) coordinates to complex plane coordinates
function mapRect(x, y, sourceRect, targetRect){
	var cx = targetRect.x + (x - sourceRect.x) / sourceRect.w * targetRect.w;
	var cy = targetRect.y + (y - sourceRect.y) / sourceRect.h * targetRect.h;
	return Complex(cx, cy);
}