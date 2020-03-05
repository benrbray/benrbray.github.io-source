var headings = [];

function buildTableOfContents(tocElement){
	// get document headings
	var pageContent = document.getElementById("post-body");
	var headingTags = ["h1", "h2", "h3", "h4", "h5", "h6"];
	var headings = getElementsByTagNames(pageContent, headingTags);
	var headingData = [];
	
	// process headings
	for(var k = 0; k < headings.length; k++){
		// get heading data
		var elem = headings[k];
		var title = elem.innerText;
		var id =  (k+1) + "-" + title.toLowerCase().replace(/\W+/g, "-");
		var depth = parseInt(elem.tagName.substr(1));
		
		headingData.push({
			url: "#" + id,
			title: title,
			depth: depth
		})
		
		// set heading ids
		elem.id = id;
	};

	// quit if no headings found
	if(headingData.length < 1){
		return;
	}

	// build table of contents
	var toc = document.createElement("ol");
	tocElement.innerHTML = "";
	tocElement.appendChild(toc);
	tocElement.className = "";

	// queue of <ol> elements (length represents current depth)
	var queue = [toc];

	for(var k = 0; k < headingData.length; k++){
		let heading = headingData[k];
		
		// pop the queue as needed
		while(heading.depth < queue.length){
			let last = queue.pop();
			queue[queue.length-1].appendChild(last);
		}

		// create new <ol> as needed
		while(heading.depth > queue.length){
			let nested = document.createElement("ol");
			queue.push(nested);
		}

		// add <li> for this heading
		let listItem = document.createElement("li");
		let linkElem = document.createElement("a");
		linkElem.textContent = heading.title;
		linkElem.setAttribute("href", heading.url);
		listItem.appendChild(linkElem);
		queue[queue.length-1].appendChild(listItem);
	}

	while(queue.length > 1){
		let last = queue.pop();
		queue[queue.length-1].appendChild(last);
	}

	// when finished, should have queue == [tocElement]
	tocElement.style.opacity = 1;
	tocElement.style.height = toc.offsetHeight + "px";
}

/* GETELEMENTSBYTAGNAMES
 * Returns all children of `parentElement` with any of the provided tags, in
 * document order.
 */
function getElementsByTagNames(parentElement, tagNames){
	// get all tags
	var elements = [];
	tagNames.forEach(function(tag){
		var result = parentElement.getElementsByTagName(tag);
		elements = elements.concat([].slice.call(result));
	});
	
	// sort elements in document order
	return elements.sort(documentOrderComparator);
}

/* DOCUMENTORDERCOMPARATOR
 * Returns +1 if `a` follows `b`, -1 if `a` precedes `b`, or 0 otherwise.
 */
function documentOrderComparator(a, b){
	// identity check
	if(a == b) return 0;
	// compare positions
	var position = a.compareDocumentPosition(b);
	if(position & 20) return -1;
	if(position & 10) return 1;
	return 0;
}