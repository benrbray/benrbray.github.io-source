// Game Parameters
var BOARD_SIZE = 4;
var MIN_WORD_LENGTH = 3;
var ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Game Display State
var boardElement = null; // table#board
var solutionsElement = null;
var tileElements = null; // 2d array of tiles on board

// Game Logic State
var boardLetters = null; // 2d array of random letters

// Solver State
var wordTrie = null;

//// GAME LOGIC ////////////////////////////////////////////////////////////////

function gameInit(){
	console.log("GAME INIT");
	boardElement = document.getElementById("board");
	solutionsElement = document.getElementById("solutions");
	// Initialize board
	buildBoard();
	// Build word trie
	wordTrie = new WordTrie(wordList, MIN_WORD_LENGTH);
	// Start Game
	gameReset();
}

function gameReset(){
	console.log("GAME RESET");
	// Generate board
	boardLetters = ["GAHT","LERS", "SETE", "ARCI"];
	for(var i = 0; i < boardLetters.length; i++){
		boardLetters[i] = boardLetters[i].split("");
	}
	
	//boardLetters = getRandomBoard();
	
	
	showBoardLetters();
	// Solve board
	solveBoard();
}

function solveBoard(){
	// Get list of paths
	boardPathList = getBoardPaths(boardLetters);
	boardPathList = boardPathList.sort(function(a,b){
		return getPathWord(boardLetters, b).length - 
			   getPathWord(boardLetters, a).length;
	})
	
	// Remove all previous solutions
	while (solutionsElement.firstChild) {
		solutionsElement.removeChild(solutionsElement.firstChild);
	}
	
	// Display
	for(var i = 0; i < boardPathList.length; i++){
		var path = boardPathList[i];
		var word = getPathWord(boardLetters, path);
		
		// Create Element
		var li = document.createElement("li");
		li.innerHTML = word;
		li.onmouseover = function(){ showPath(path); }
		solutionsElement.appendChild(li);
	}
}

// Solver ----------------------------------------------------------------------

function getBoardPaths(boardLetters){
	console.log("SOLVING BOARD");
	
	// Iterate over all possible word starting points, searching for solutions
	var pathList = [];
	for(var x = 0; x < BOARD_SIZE; x++){
		for(var y = 0; y < BOARD_SIZE; y++){
			trieSearch(wordTrie.tree, boardLetters, [], x, y, pathList);
		}
	}
		
	return pathList;
}

function trieSearch(subtrie, board, path, x, y, pathList){
	// check for words at this depth
	if(subtrie.hasOwnProperty("*")){
		pathList.push(path.slice());
	}
	
	// 8-neighborhood bounds
	var left  = (x <= 0) ? 0 : -1;
	var right = (x >= BOARD_SIZE-1) ? 0 : +1;
	var up    = (y <= 0) ? 0 : -1;
	var down  = (y >= BOARD_SIZE-1) ? 0 : +1;
	
	// iterate neighborhood, excluding center point
	for(var dx = left; dx <= right; dx++){
		for(var dy = up; dy <= down; dy++){
			if(dx==0 && dy==0) continue;
			// get neighbor x and y
			var nx = x + dx;
			var ny = y + dy;
			var letter = board[nx][ny];
			
			var spaces = "";
			for(var i=0;i<path.length;i++){ spaces+=" "; };
			
			// skip if neighbor letter not in trie
			if(subtrie.hasOwnProperty(letter)===false) continue;
			// skip if neighbor already in path
			if(pathContains(path, nx, ny)) continue;
			
			// otherwise continue down trie
			var newPath = path.slice();
			newPath.push({x:nx, y:ny});
			trieSearch(subtrie[letter], board, newPath, nx, ny, pathList);
		}
	}
}

function getPathWord(board, path){
	var word = "";
	for(var i = 0; i < path.length; i++){
		var p = path[i];
		word += board[p.x][p.y];
	}
	return word;
}

// Checks if the point (x,y) is contained in an array of point objects {x:#,y:#}
function pathContains(path, x, y){
	for(var i = 0; i < path.length; i++){
		var p = path[i];
		if(p.x == x && p.y == y) return true;
	}
	return false;
}

// Randomization ---------------------------------------------------------------

// Returns 2D square array of random letters
function getRandomBoard(){
	var board = [];
	for(var x = 0; x < BOARD_SIZE; x++){
		var row = [];
		for(var y = 0; y < BOARD_SIZE; y++){
			row.push(getRandomLetterEnglish());
		}
		board.push(row);
	}
	return board;
}

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

//// VISUALS ///////////////////////////////////////////////////////////////////

// adds HTML elements for board pieces
function buildBoard(){
	boardElement = document.getElementById("board");
	tileElements = [];
	for(var x = 0; x < BOARD_SIZE; x++){
		var boardRow = [];
		var tableRow = document.createElement("tr");
		for(var y = 0; y < BOARD_SIZE; y++){
			// create tile
			var tile = document.createElement("td");
			tile.classList.add("tile"); // html5
			tile.style.width = tile.style.height = (100/BOARD_SIZE) + "%";
			tableRow.appendChild(tile);
			// create tile label
			var label = document.createElement("span");
			label.classList.add("label");
			label.innerHTML = x + "," + y;
			tile.appendChild(label);
			tile.label = label;
			// add to row
			boardRow.push(tile);
		}
		tileElements.push(boardRow);
		boardElement.appendChild(tableRow);
	}
}

function showBoardLetters(){
	for(var x = 0; x < BOARD_SIZE; x++){
		for(var y = 0; y < BOARD_SIZE; y++){
			tileElements[x][y].label.innerHTML = boardLetters[x][y];
		}
	}
}

function showPath(path){
	
}

//// MISC //////////////////////////////////////////////////////////////////////

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