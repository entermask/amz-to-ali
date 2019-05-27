
var _DataState = {
	AL : "Alabama",
	AK : "Alaska",
	AZ : "Arizona",
	AR : "Arkansas",
	AA : "Armed Forces America",
	AE : "Armed Forces Europe",
	AP : "Armed Forces Pacific",
	CA : "California",
	CO : "Colorado",
	CT : "Connecticut",
	DE : "Delaware",
	DC : "District of Columbia",
	FL : "Florida",
	GA : "Georgia",
	HI : "Hawaii",
	ID : "Idaho",
	IL : "Illinois",
	IN : "Indiana",
	IA : "Iowa",
	KS : "Kansas",
	KY : "Kentucky",
	LA : "Louisiana",
	ME : "Maine",
	MD : "Maryland",
	MA : "Massachusetts",
	MI : "Michigan",
	MN : "Minnesota",
	MS : "Mississippi",
	MO : "Missouri",
	MT : "Montana",
	NE : "Nebraska",
	NV : "Nevada",
	NH : "New Hampshire",
	NJ : "New Jersey",
	NM : "New Mexico",
	NY : "New York",
	NC : "North Carolina",
	ND : "North Dakota",
	OH : "Ohio",
	OK : "Oklahoma",
	OR : "Oregon",
	PA : "Pennsylvania",
	RI : "Rhode Island",
	SC : "South Carolina",
	SD : "South Dakota",
	TN : "Tennessee",
	TX : "Texas",
	UT : "Utah",
	VT : "Vermont",
	VA : "Virginia",
	WA : "Washington",
	WV : "West Virginia",
	WI : "Wisconsin",
	WY : "Wyoming"
};

(function(){
	document.querySelector('body').innerHTML = '<div class="valert"></div> '+document.querySelector('body').innerHTML;
})();

var c;

window.onkeyup = function(e) { 
	e = e || event;
	if(e.key == 'v')
	{
		if(location.href.search('shoppingcart.aliexpress.com') != -1)
		{
			chrome.storage.sync.get(['copied'], (r) => { 
				if (r.copied) { 
					var _paste = JSON.parse(r.copied); 
					document.querySelector('select[name=country]').value = "US";
					document.querySelector('input[name=contactPerson]').value = _paste.vname;
					document.querySelector('input[name=address]').value = _paste.vstreet;
					document.querySelector('input[name=zip]').value = _paste.vzipcode;
					document.querySelector('input[name=mobileNo]').value = _paste.vphone ? _paste.vphone : 2553553555;
					document.querySelector('input[name=province]').value = eval('_DataState.'+_paste.vstate);
					document.querySelector('input[name=province] ~ select').value = eval('_DataState.'+_paste.vstate);
					document.querySelector('input[name=province] ~ select').dispatchEvent(new Event('change'));
					setTimeout(function(){
						for (var i = 0; i < document.querySelectorAll('input[name=city] ~ select option').length; i++)
						{
							if (_paste.vcity.toUpperCase() == document.querySelectorAll('input[name=city] ~ select option')[i].value.toUpperCase())
							{
								document.querySelector('input[name=city]').value = document.querySelectorAll('input[name=city] ~ select option')[i].value;
								document.querySelector('input[name=city] ~ select').value = document.querySelectorAll('input[name=city] ~ select option')[i].value;
								break;
							}
						}
						console.log('Vivoo Pasted !!!');
						document.querySelector('.valert').innerHTML = 'Paste thành công !!!';
						document.querySelector('.valert').style.display = 'none';
						document.querySelector('.valert').style.display = 'block';
						document.querySelector('.valert').style.opacity = 1;
						document.querySelector('.valert').setAttribute('class', 'valert vivoo');

						if(c)
							clearTimeout(c);
						c = setTimeout(function(){
							document.querySelector('.valert').style.opacity = 0;
							document.querySelector('.valert').setAttribute('class', 'valert');
							document.querySelector('.ui-button.ui-button-primary.ui-button-medium.sa-confirm').click();
						}, 1500);

					}, 500);
				} 
			});
		} else {
			console.log('Vivoo Copied !!!');
			document.querySelector('.valert').innerHTML = 'Copy thành công !!!';
			document.querySelector('.valert').style.display = 'none';
			document.querySelector('.valert').style.display = 'block';
			document.querySelector('.valert').style.opacity = 1;
			document.querySelector('.valert').setAttribute('class', 'valert vivoo');

			if(c)
				clearTimeout(c);
			c = setTimeout(function(){
				document.querySelector('.valert').style.opacity = 0;
				document.querySelector('.valert').setAttribute('class', 'valert');
			}, 1500);
			var _copy = {
				vname : document.querySelectorAll('[data-test-id=shipping-section-buyer-address] span')[0].innerHTML.replace('<br>',''),
				vstreet : document.querySelectorAll('[data-test-id=shipping-section-buyer-address] span')[1].innerHTML.replace('<br>',''),
				vcity : document.querySelectorAll('[data-test-id=shipping-section-buyer-address] span')[2].innerHTML.replace(',<span>&nbsp;</span>',''),
				vstate : document.querySelectorAll('[data-test-id=shipping-section-buyer-address] span')[4].innerHTML.replace('<span>&nbsp;</span>',''),
				vzipcode : document.querySelectorAll('[data-test-id=shipping-section-buyer-address] span')[6].innerHTML,
				vphone : document.querySelector('[data-test-id=shipping-section-phone]').innerHTML.replace('+1','').replace(/-|\s/g,'').replace(/\)/g,'').replace(/\(/g,'')
			}
			chrome.storage.sync.set({ copied : JSON.stringify(_copy) });
			chrome.extension.sendMessage({
				type: "update"
			});
		}
	}
}