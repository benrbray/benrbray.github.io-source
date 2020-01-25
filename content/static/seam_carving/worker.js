var primes = [];

search: for(var n = 1; n < 1000; n++){
	for(var i = 2; i <= Math.sqrt(n); i+= 1)
		if(n % i == 0) continue search;
	primes.push(n)
	postMessage({
		status : "WORKING",
		message : primes
	});
}

postMessage({
	status : "DONE",
	message : "ASDFASDFASDF"
});

self.close();