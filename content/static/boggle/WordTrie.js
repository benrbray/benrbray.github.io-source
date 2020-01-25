function WordTrie(wordList, minWordLength){
	// Build Trie --------------------------------------------------------------
	
	this.tree = {};
	
	// Access ------------------------------------------------------------------
	
	// Insert a word into the trie -- O(n)
	this.insert = function(word){
		word = word.toUpperCase();
		// Add characters in word to trie
		var subtrie = this.tree;
		for(var j = 0; j < word.length; j++){
			// otherwise continue down trie
			var letter = word[j];
			if(subtrie.hasOwnProperty(letter) === false){ subtrie[letter] = {} };
			subtrie = subtrie[letter];
		}
		// finished iterating over word, add star at this depth
		subtrie["*"] = true;
	}
	
	// Check if a word is in the trie -- O(
	this.contains = function(word){
		word = word.toUpperCase();
		var subtrie = this.tree;
		
		// traverse trie, following characters in word
		for(var j=0; j < word.length; j++){
			var letter = word[j];
			if(subtrie.hasOwnProperty(letter)===true){
				subtrie = subtrie[letter];
			}
			else return false;
		}
		
		// check if a word ends here
		return subtrie.hasOwnProperty("*")===true;
	}
	
	// Build Trie --------------------------------------------------------------
	
	// Iterate over word list
	for(var i = 0; i < wordList.length; i++){
		var word = wordList[i];
		if(word.length >= minWordLength) this.insert(word);
	}
}