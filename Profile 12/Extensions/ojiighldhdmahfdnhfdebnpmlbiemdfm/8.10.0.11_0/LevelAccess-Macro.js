var LevelAccess = LevelAccess || {};

(function () {
	/**
	 * @param {{}} message
	 * @param {boolean?} usePromises
	 * @param {boolean?} ignoreBlockedIframes
	 */
	LevelAccess.relayToIframes = async function (message, usePromises = false, ignoreBlockedIframes = false) {
		// relay message to lower layers
		const results        = [];
		const blockedIframes = [];
		const iframes        = document.querySelectorAll('iframe');
		
		/**
		 * @param {HTMLIFrameElement} iframe
		 * @return {string}
		 */
		const getIframeIdentifier = (iframe) => {
			if (iframe.src) {
				return iframe.src;
			} else if (iframe.title) {
				return iframe.title;
			} else {
				return iframe.outerHTML;
			}
		};
		
		for (let i = 0; i < iframes.length; i++) {
			const style = getComputedStyle(iframes[i]);
			const isAriaHidden = iframes[i].hasAttribute('aria-hidden') && iframes[i].getAttribute('aria-hidden') === 'true';
			
			// Ignore hidden iframes
			if (style.display !== 'none' && style.visibility === 'visible' && !isAriaHidden) {
				const iframe = iframes[i];
				
				if (!usePromises) {
					try {
						iframe.contentWindow.postMessage(message, iframe.contentWindow.origin);
					} catch (e) {
						if ((e instanceof DOMException || e.constructor.name === 'DOMException')
						    && [DOMException.SECURITY_ERR, DOMException.DATA_CLONE_ERR].indexOf(e.code) !== -1) {
							blockedIframes.push({origin: getIframeIdentifier(iframes[i]), code: 'blocked'});
						} else {
							console.error(e);
							throw e;
						}
					}
				} else {
					const {id, messageId, ...forwardMessage} = message;
					const result                             = await LevelAccess.sendMessagePromise(forwardMessage, iframe.contentWindow)
					                                                            .catch(e => {
						                                                            if ((e instanceof DOMException || e.constructor.name === 'DOMException')
						                                                                && [DOMException.SECURITY_ERR, DOMException.DATA_CLONE_ERR].indexOf(e.code) !== -1) {
							                                                            blockedIframes.push({origin: getIframeIdentifier(iframes[i]), code: 'blocked'});
						                                                            } else if (e.error === 'Timeout') {
							                                                            blockedIframes.push({origin: getIframeIdentifier(iframes[i]), code: 'timeout'});
						                                                            } else {
							                                                            console.error(e);
						                                                            }
						
						                                                            return [];
					                                                            });
					results.push(result);
				}
			}
		}
		
		if (!ignoreBlockedIframes && blockedIframes.length) {
			window.postMessage({
				source     : 'page',
				destination: 'ast',
				result     : {
					type   : 'IFRAMES_BLOCKED',
					origins: blockedIframes
				}
			}, window.origin);
		}
		
		return results;
	};
	
	/**
	 * @param {{}} message
	 * @param {Window?} context
	 * @param {boolean?} expectResponse
	 * @param {number?} timeout
	 * @return {Promise<unknown>}
	 */
	LevelAccess.sendMessagePromise = function (message, context = window, expectResponse = true, timeout = 30) {
		return new Promise((resolve, reject) => {
			const id        = `${Date.now()}-${Math.floor(Math.random() * Date.now())}`;
			const timeoutId = setTimeout(() => reject({error: 'Timeout'}), timeout * 1000);
			
			try {
				if (expectResponse) {
					const responseMessageListener = (responseMessage) => {
						// Listen for responses explicitly for this message ID.
						const response = responseMessage.data;
						
						if (response.id === id && response.isResponse) {
							context.removeEventListener('message', responseMessageListener);
							if (response.error) {
								clearTimeout(timeoutId);
								reject({error: response.error});
							} else {
								clearTimeout(timeoutId);
								resolve(response);
							}
						}
					};
					
					context.addEventListener('message', responseMessageListener);
				}
				
				context.postMessage({
					id: id,
					...message
				}, context.origin);
				
				if (!expectResponse) {
					clearTimeout(timeoutId);
					resolve(true);
				}
			} catch (error) {
				clearTimeout(timeoutId);
				reject(error);
			}
		});
	};
	
	/**
	 * @param {*} originalMessage
	 * @param {*} response
	 * @param {Window?} context
	 */
	LevelAccess.sendMessageResponse = function (originalMessage, response, context = window) {
		context.postMessage({
			...originalMessage,
			result     : response,
			source     : originalMessage.destination,
			destination: originalMessage.source,
			isResponse : true
		});
	};
})();
(function () {
	if (LevelAccess.MacroRecorder) {
		return;
	}
	
	LevelAccess.MacroRecorder = function () {
	};
	
	LevelAccess.MacroRecorder.prototype = {
		/**
		 * @type {Array}
		 */
		elementsAttachedToListeners: [],
		
		/**
		 * @type {{selectedIndex: String, checked: boolean, value: String}}
		 */
		currentEl: {
			'selectedIndex': null,
			'checked'      : null,
			'value'        : ''
		},
		
		/**
		 * @param {String} command
		 * @param {Node|String} target
		 * @param {String} value
		 */
		addLine: function (command, target, value) {
			window.postMessage({
				source     : 'page',
				destination: 'ast',
				result     : {
					type    : 'MACRO_RECORDER_LINE',
					command : command,
					selector: target,
					value   : value
				}
			}, window.origin);
		},
		
		/**
		 *
		 */
		startRecording: function () {
			// why do we need to create the open page command
			// this.addLine('open');
			
			// for form controls
			this.decorateFormControls();
			
			// use click on BODY
			this.decorateBody();
			
			// DOM Mutation Observer - to check for more forms
			// would be way to handle single page application
			this.decorateForms();
		},
		
		/**
		 *
		 * @param {String} event
		 * @param {Function} listener
		 * @param {Node} el
		 */
		addListener: function (event, listener, el) {
			this.elementsAttachedToListeners.push({
				event   : event,
				listener: listener,
				el      : el
			});
			
			el.addEventListener(event, listener, false);
		},
		
		/**
		 *
		 * @param {String} event
		 * @param {Function} listener
		 * @param {Node} el
		 */
		removeListener: function (event, listener, el) {
			el.removeEventListener(event, listener);
		},
		
		/**
		 *
		 */
		decorateFormControls: function () {
			var formControls = window.document.querySelectorAll('input:not([type=submit]):not([type=reset]):not([type=button]):not([type=image]), select, textarea');
			
			for (var i = 0; i < formControls.length; i++) {
				var formControl = formControls[i];
				this.addListener('focus', this.focusGetState.bind(this), formControl);
				this.addListener('change', this.changeListenerSelenium.bind(this), formControl);
			}
		},
		
		/**
		 *
		 */
		decorateBody: function () {
			this.addListener('click', this.clickListenerSelenium.bind(this), window.document.body);
		},
		
		/**
		 *
		 */
		decorateForms: function () {
			var forms = window.document.querySelectorAll('form');
			for (var i = 0; i < forms.length; i++) {
				this.addListener('submit', this.handleStopRecording.bind(this), forms[i]);
			}
		},
		
		/**
		 *
		 * @param {Event} ev
		 */
		handleStopRecording: function (ev) {
			ev.preventDefault();
			this.stopRecording();
		},
		
		/**
		 *
		 * @param {Event} ev
		 */
		focusGetState: function (ev) {
			var field                    = ev.target;
			this.currentEl.selectedIndex = field.selectedIndex; // could be number or undefined
			this.currentEl.checked       = field.checked; // could be true / false or undefined
			this.currentEl.value         = field.value; // could be ''; or a value
		},
		
		/**
		 *
		 * @param {Event}  ev
		 */
		changeListenerSelenium: function (ev) {
			var field = ev.target;
			if (field.selectedIndex !== this.currentEl.selectedIndex) {
				this.addLine('select', window.LevelAccess_AccessEngine.uelAccurate_FromRoot(field), field.value);
			} else if (field.checked !== this.currentEl.checked) {
				this.addLine('click', window.LevelAccess_AccessEngine.uelAccurate_FromRoot(field));
			} else if (field.value !== this.currentEl.value) {
				if (field.getAttribute('type') === 'password') {
					this.addLine('password', window.LevelAccess_AccessEngine.uelAccurate_FromRoot(field), field.value);
				} else {
					this.addLine('text', window.LevelAccess_AccessEngine.uelAccurate_FromRoot(field), field.value);
				}
			}
		},
		
		/**
		 *
		 * @param {Event} ev
		 */
		clickListenerSelenium: function (ev) {
			var button = ev.target;
			this.addLine('click', window.LevelAccess_AccessEngine.uelAccurate_FromRoot(button), null);
		},
		
		/**
		 *
		 */
		stopRecording: function () {
			for (var i = 0; i < this.elementsAttachedToListeners.length; i++) {
				var listenerInfo = this.elementsAttachedToListeners[i];
				this.removeListener(listenerInfo.event, listenerInfo.listener, listenerInfo.el);
			}
			
			this.elementsAttachedToListeners = [];
		}
	};
	
	LevelAccess.macroRecorder = new LevelAccess.MacroRecorder();
	
	// Message Listeners
	window.addEventListener('message', function (event) {
		if (event.data.destination === 'page' && event.data.command) {
			switch (event.data.command.type) {
				case 'MACRO_RECORDING_START':
					LevelAccess.macroRecorder.startRecording();
					break;
				
				case 'MACRO_RECORDING_STOP':
					LevelAccess.macroRecorder.stopRecording();
					break;
			}
		}
	}, false);
})();