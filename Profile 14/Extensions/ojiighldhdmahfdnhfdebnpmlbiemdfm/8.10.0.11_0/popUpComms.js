try {
	window.addEventListener('load', function () {
		var portConnection = new AST.PortConnection({name: 'levelaccesspopup'});
		
		portConnection.port.onMessage.addListener(function(msg){
			if (msg.destination === 'ast') {
				window.postMessage(msg, window.origin);
			}
		});
		
		window.addEventListener('message', function (event) {
			try {
				if (event.data.command && event.data.command.source !== 'mainstation') {
					portConnection.sendMessageToBackgroundPage(event.data);
				}
			} catch (e) {
				// ignore other events
			}
		}, false);
	}, false);
}
catch (e) {
	console.log('AST', e);
}