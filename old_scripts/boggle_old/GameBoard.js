function GameBoard(size){
	// Properties --------------------------------------------------------------
	
	this.size = size;
	this.board = board;
	
	// Randomization -----------------------------------------------------------
	
	// Helpers -----------------------------------------------------------------
}

//// MISC //////////////////////////////////////////////////////////////////////

// Return a letter uniformly at random
function getRandomLetterUniform(){
	return ALPHABET[int(Math.random()*ALPHABET.length)];
}

// Return a random letter based on English word frequencies
function getRandomLetterEnglish(){
	var rnd = Math.random();
	for(var i=0; i < ALPHABET.length; i++){
		if(rnd < LETTER_FREQ[i]) return ALPHABET[i];
	}
	console.error("No random letter returned! Frequencies don't sum to 1.");
}

// English Letter Frequencies --------------------------------------------------

// Raw relative frequencies from Wikipedia
var LETTER_FREQ = [
	0.0816,  0.0149,  0.0278,  0.0425,  0.127 ,  0.0223,  0.0202,
	0.0609,  0.0697,  0.0015,  0.0072,  0.0403,  0.0241,  0.0675,
	0.0751,  0.0193,  0.0013,  0.0599,  0.0633,  0.0901,  0.0276,
	0.0098,  0.024 ,  0.0015,  0.0198,  0.0008
];

// Cumulative Sum
for(var i=1; i < LETTER_FREQ.length; i++){ LETTER_FREQ[i] += LETTER_FREQ[i-1]; }
// Normalize, just in case!
var freqSum = LETTER_FREQ[LETTER_FREQ.length-1];
for(var i=1; i < LETTER_FREQ.length; i++){ LETTER_FREQ[i] /= freqSum; }

