(function () {
	// Receives / sends port messages from background
	// Receives / sends window messages to SubStation - SubStation is either in the page or iframes
	if (!window.portConnection) {
		window.portConnection = new window.AST.PortConnection({name: 'levelaccessmainstation'});
		
		window.portConnection.port.onMessage.addListener(function (msg) {
			if (msg.command) {
				msg.command.source = 'mainstation';
				window.postMessage(msg, window.origin);
			} else if (msg.result && msg.destination === 'page') {
				if (msg.result.type === 'RECONNECTED') {
					window.postMessage(msg, window.origin);
				}
			}
		});
		
		window.addEventListener('message', function (event) {
			if (event.data.destination === 'ast' || event.data.destination === 'background') {
				window.portConnection.sendMessageToBackgroundPage(event.data);
			}
		}, false);
	}
})();