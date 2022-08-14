(function () {
	var browserAPI = (typeof chrome === 'undefined' ? browser : chrome);
	
	window.AST = window.AST || {};
	
	if (!window.AST.PortConnection) {
		window.AST.PortConnection = function (c) {
			var config               = c || {};
			this.name                = config.name || 'port';
			this.unconfirmedMessages = [];
			this.responseListeners   = {};
			this.messageIdCount      = 0;
			this.useRuntimeMessaging = false;
			this.port                = null;
			this.timeoutLength       = c.timeoutLength || 5000;
			this.connectToBackgroundPage();
			this.setupMessageResponseListeners();
		};
		
		window.AST.PortConnection.prototype = {
			connectToBackgroundPage: function () {
				this.port = browserAPI.runtime.connect({name: this.name});
				this.sendMessageToBackgroundPage({hello: this.name});
			},
			
			sendMessageToBackgroundPage: function (msg) {
				var messageId;
				if (msg.messageId > 0) {
					messageId = msg.messageId;
				} else {
					this.messageIdCount = this.messageIdCount + 1;
					messageId           = this.messageIdCount;
					msg.messageId       = messageId;
					this.unconfirmedMessages.push(msg);
				}
				if (this.useRuntimeMessaging) {
					browserAPI.runtime.sendMessage(msg);
				} else {
					this.port.postMessage(msg);
				}
				
				this.responseListeners[messageId] = setTimeout(function () {
					for (var i = 0; i < this.unconfirmedMessages.length; i++) {
						if (this.unconfirmedMessages[i].messageId === messageId) {
							this.useRuntimeMessaging = true;
							this.sendMessageToBackgroundPage(this.unconfirmedMessages[i]);
						}
					}
				}.bind(this), this.timeoutLength);
			},
			
			setupMessageResponseListeners: function () {
				this.port.onMessage.addListener(function (msg) {
					if (msg.type === 'CONNECTION_RESPONSE') {
						this.unconfirmedMessages.forEach(function (message) {
							this.sendMessageToBackgroundPage(message);
						}.bind(this));
					}
					var messageId = msg.messageId;
					if (msg.type === 'MESSAGE_RESPONSE' && messageId) {
						for (var i = 0; i < this.unconfirmedMessages.length; i++) {
							if (this.unconfirmedMessages[i].messageId === messageId) {
								this.unconfirmedMessages.splice(i, 1);
								clearTimeout(this.responseListeners[messageId]);
								delete this.responseListeners[messageId];
							}
						}
					}
				}.bind(this));
			}
		};
	}
})();