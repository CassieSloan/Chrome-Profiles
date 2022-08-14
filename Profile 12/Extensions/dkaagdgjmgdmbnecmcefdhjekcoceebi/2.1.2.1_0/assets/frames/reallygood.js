function getParameterByName(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var iframeMessagePrefix = getParameterByName('iframeMessagePrefix');
var configurationUrl = getParameterByName('configurationUrl');
var adLinkUrl = getParameterByName('adLinkUrl');
var configuration = undefined;

window.PP_postMessage = function(type, value) {
	parent.postMessage({ [iframeMessagePrefix + type]: value }, "*");
};

function linkClick() {
	window.PP_postMessage("action", { url: adLinkUrl });
	return false;
}

function showAd() {
	const linkElements = document.getElementsByTagName('a');
	for (let i = 0; i < linkElements.length; i++) {
		linkElements[i].addEventListener('click', linkClick);
	}

	document.getElementById('carbonads').style.display = 'block';
	window.PP_postMessage("ad_loaded", { url: adLinkUrl });
}

window.onload = function() {
	var script = document.createElement('script');
	script.id = '_reallygood_configuration_js';
	script.type = 'text/javascript';
	script.src = configurationUrl;
	script.onerror = function () {
		window.PP_postMessage("next_ad_provider", true);
	};
	script.onload = function () {
		const enabled = configuration.enabled;
		if (!enabled) {
			window.PP_postMessage("next_ad_provider", true);
			return;
		}
		showAd();
	}
	document.body.appendChild(script);
}
