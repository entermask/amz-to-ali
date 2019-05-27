
chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
	switch(message.type) {
		case 'update':
		chrome.storage.sync.get(['copied'], (r) => { 
			let g = JSON.parse(r.copied);
			document.querySelectorAll('li b')[0].innerHTML = (g.vname);
			document.querySelectorAll('li b')[1].innerHTML = (g.vstreet);
			document.querySelectorAll('li b')[2].innerHTML = (g.vcity);
			document.querySelectorAll('li b')[3].innerHTML = (g.vphone);
			document.querySelectorAll('li b')[4].innerHTML = (g.vzipcode);
			document.querySelectorAll('li b')[5].innerHTML = (g.vstate);
		});
		break;
	}
});

(function(){
	chrome.storage.sync.get(['copied'], (r) => { 
		if (r.copied)
		{
			let g = JSON.parse(r.copied);
			document.querySelectorAll('li b')[0].innerHTML = (g.vname);
			document.querySelectorAll('li b')[1].innerHTML = (g.vstreet);
			document.querySelectorAll('li b')[2].innerHTML = (g.vcity);
			document.querySelectorAll('li b')[3].innerHTML = (g.vphone);
			document.querySelectorAll('li b')[4].innerHTML = (g.vzipcode);
			document.querySelectorAll('li b')[5].innerHTML = (g.vstate);
		}
	});
})();