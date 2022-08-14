/* global chrome, browser */
const AST_TITLE        = "Access Assistant";
const browserAPI       = (typeof chrome === 'undefined' ? browser : chrome);
const activeTabPorts   = {};
let popupWindowId      = null,
    popupTabId         = null,
    initialActiveTabId = null,
    activeTabId        = null,
    activeWindowId     = null,
    frozen             = false;

const checkRuntimeErrors = () => {
	const e = browserAPI.runtime.lastError;
	if (!(e === undefined || e === null)) {
		console.log('Encountered', e);
	}
};

const injectContentScripts = (tab, callback) => {
	if (!callback) {
		callback = () => {
		};
	}
	
	// Let AST know that the page is connected
	const connectedCallback = () => {
		sendConnectedMessage();
		callback();
		
		
	};
	
	// make sure each script is finished injecting prior to injecting the next one
	browserAPI.tabs.executeScript(tab.id, {
		file : 'PortConnection.js',
		runAt: 'document_end'
	}, () => {
		browserAPI.tabs.executeScript(tab.id, {
			file : 'MainStation.js',
			runAt: 'document_end'
		}, () => {
			browserAPI.tabs.executeScript(tab.id, {
				file     : 'ae_injector.js',
				runAt    : 'document_end',
				allFrames: true
			}, connectedCallback);
		});
	});
};

const getStoredValue = (key, defaultValue) => {
	if (window.localStorage.getItem(key) !== null) {
		return JSON.parse(window.localStorage.getItem(key));
	}
	
	return defaultValue;
};

const initializeAssistant = (tab) => {
	const windowSize     = getStoredValue('Level-Access-AST-window-size', {width: 800, height: 640});
	const windowPosition = getStoredValue('Level-Access-AST-window-position', {x: 0, y: 0});
	
	initialActiveTabId = tab.id;
	
	injectContentScripts(tab);
	
	browserAPI.windows.create({
		width : windowSize.width,
		height: windowSize.height,
		top   : windowPosition.y,
		left  : windowPosition.x,
		type  : 'popup',
		url   : 'popup.html'
	}, (popupWindow) => {
		popupWindowId = popupWindow.id;
		popupTabId    = popupWindow.tabs[0].id;
		setTimeout(() => {
			browserAPI.tabs.reload(popupWindow.tabs[0].id);
		}, 250);
		
		browserAPI.windows.onRemoved.addListener((windowId) => {
			if (windowId === popupWindowId) {
				popupWindowId      = null;
				popupTabId         = null;
				initialActiveTabId = null;
			}
		});
	});
};

const sendDisconnectedMessage = ({permissions}) => {
	const responsePayload = {
		source     : 'background',
		destination: 'ast',
		result     : {
			type       : 'DISCONNECTED',
			permissions: permissions
		}
	};
	
	window.port_levelaccesspopup.postMessage(responsePayload);
};

const sendConnectedMessage = () => {
	const responsePayload = {
		source     : 'background',
		destination: 'ast',
		result     : {
			type: 'HIDE_PERMISSIONS'
		}
	};
	
	try {
		window.port_levelaccesspopup.postMessage(responsePayload);
	} catch (e) {
		console.log(e);
	}
};

const requestPermission = (source, permissions) => {
	const responsePayload = {
		source     : 'background',
		destination: 'ast',
		result     : {
			type       : 'PERMISSIONS',
			source     : source,
			permissions: permissions
		}
	};
	
	try {
		window.port_levelaccesspopup.postMessage(responsePayload);
	} catch (e) {
		console.log(e);
	}
};

const handlePotentialTabChange = () => {
	if (!popupWindowId || !popupTabId) {
		// don't do anything if the AST extension window isn't open
		return;
	}
	
	// get the currently focused active tab, assuming there can only be one across all windows
	browserAPI.tabs.query({
		active       : true,
		currentWindow: true
	}, (tabs) => {
		if (tabs.length <= 0) {
			return;
		}
		
		const tab = tabs[0];
		if (!tab || tab.id <= 0) {
			// ignore invalid tabs
			return;
		}
		
		const windowId = tab.windowId;
		if (windowId <= 0) {
			// ignore tabs with invalid window IDs
			return;
		}
		
		if (!tab.url) {
			// ignore blank tabs
			return;
		}
		
		const urlObj = new URL(tab.url);
		if (['http:', 'https:', 'file:'].indexOf(urlObj.protocol) === -1) {
			// ignore N/A protocols for tab content
			return;
		}
		
		browserAPI.windows.get(windowId, (win) => {
			if (!win || win.id !== windowId) {
				// ignore invalid windows
				return;
			}
			
			// inject content scripts into page, requesting permission if necessary
			const permissions = {
				origins: [urlObj.protocol + '//' + urlObj.hostname + '/*']
			};
			browserAPI.permissions.contains(permissions, (hasPermission) => {
				if (hasPermission) {
					injectContentScripts(tab);
				} else {
					requestPermission('page', permissions);
				}
			});
			
			activeWindowId = win.id;
			activeTabId    = tab.id;
			
			MessageHandlers.tabCheck();
		});
	});
};

const reactivateAST = function () {
	browserAPI.tabs.query(
		{
			title: AST_TITLE + ' *'
		},
		(tabs) => {
			if (tabs.length > 0) {
				browserAPI.windows.update(tabs[0].windowId, {'focused': true});
			}
		}
	);
};

const reloadPageUnderTest = () => {
	// re-inject, re-connect
	browserAPI.tabs.get(activeTabId, (tab) => {
		injectContentScripts(tab, () => {
			browserAPI.tabs.executeScript(activeTabId, {
					code: '(function() {' +
					      'window.postMessage({destination: "background", command: {type: "RECONNECT"}}, window.origin);' +
					
					      // Satisfy the promise for FF
					      'return true;' +
					      '})();'
				},
				checkRuntimeErrors
			);
		});
	});
};

const respondToConnection = (connectedPort) => {
	connectedPort.postMessage({type: 'CONNECTION_RESPONSE'});
};

class MessageHandlers {
	// 'IFRAME_CHECK'
	static iframeCheck(payload) {
		const origins     = payload.command.origins;
		const permissions = {origins: origins};
		browserAPI.permissions.contains(permissions, (hasPermission) => {
			if (!hasPermission) {
				requestPermission('iframes', permissions);
			}
		});
	}
	
	// 'TAB_CHECK'
	static tabCheck() {
		const callback = () => {
			let override = false;
			const e      = browserAPI.runtime.lastError;
			if (!(e === undefined || e === null)) {
				override = true;
			}
			
			if (window.port_levelaccesspopup) {
				const responsePayload = {
					source     : 'background',
					destination: 'ast',
					result     : {
						type        : 'ACTIVE_TAB_CHANGE',
						initialTabId: initialActiveTabId,
						activeTabId : activeTabId,
						override    : override
					}
				};
				
				window.port_levelaccesspopup.postMessage(responsePayload);
			}
		};
		
		// See if AST has screenshot permission
		browserAPI.tabs.captureVisibleTab(activeWindowId, {}, callback);
	}
	
	// 'TO_EXTERNAL'
	static toExternal(payload) {
		if (payload.command.extension) {
			browserAPI.runtime.sendMessage(payload.command.extension, {
					from   : 'AST',
					payload: {
						action: payload.command.action,
						data  : payload.command.data
					}
				}
			);
		}
	}
	
	// 'RECONNECT':
	static reconnect() {
		window.port_levelaccessmainstation.postMessage({
			source     : 'background',
			destination: "page",
			result     : {type: "RECONNECTED"}
		});
	}
	
	// 'CONNECT':
	static connect(payload) {
		browserAPI.tabs.query(
			{
				active  : true,
				windowId: activeWindowId
			},
			function (url, tabs) {
				if (tabs[0].url === url) {
					return; // Tab is already active
				}
				
				// See if any other open tabs match
				browserAPI.tabs.query(
					{
						windowId: activeWindowId,
						url     : url
					},
					function (url, tabs) {
						if (tabs.length > 0) {
							browserAPI.tabs.update(tabs[0].id, {
								active: true
							});
							reactivateAST();
						} else {
							// No tabs match, open one.
							browserAPI.tabs.create({
									windowId: activeWindowId,
									url     : url
								},
								reactivateAST
							);
						}
					}.bind(window, url)
				);
			}.bind(window, payload.command.url)
		);
	}
	
	// 'LOAD_LOCAL_STORAGE':
	static loadLocalStorage() {
		let values = {}, // Notice change here
		    keys   = Object.keys(localStorage),
		    i      = keys.length;
		
		while (i--) {
			values[keys[i]] = JSON.parse(localStorage.getItem(keys[i]));
		}
		
		const responsePayload = {
			source     : 'background',
			destination: 'ast',
			result     : {
				type   : 'LOAD_LOCAL_STORAGE_RESPONSE',
				storage: values
			}
		};
		
		window.port_levelaccesspopup.postMessage(responsePayload);
	}
	
	// 'SET_LOCAL_STORAGE':
	static setLocalStorage(payload) {
		localStorage.setItem(payload.command.key, payload.command.value);
	}
	
	// 'SEND_REQUEST'
	static sendRequest(port, payload) {
		const ajax              = new XMLHttpRequest();
		ajax.onreadystatechange = function () {
			if (this.readyState === 4) {
				let data;
				if (this.status === 200) {
					if (this.responseText !== undefined && this.responseText.length > 0) {
						try {
							data             = JSON.parse(this.responseText);
							data.destination = 'ast';
							data.COMID       = payload.COMID;
							port.postMessage(data);
						} catch (error) {
							data       = {
								error      : true,
								code       : this.status,
								source     : 'background',
								destination: 'ast'
							};
							data.COMID = payload.COMID;
							port.postMessage(data);
						}
					}
				} else {
					data       = {
						error      : true,
						code       : this.status,
						source     : 'background',
						destination: 'ast'
					};
					data.COMID = payload.COMID;
					port.postMessage(data);
				}
			}
		};
		
		switch (payload.command.method) {
			case 'POST':
			case 'PUT':
				ajax.open(payload.command.method, payload.command.url, true);
				break;
			
			case 'DELETE':
			case 'GET':
				ajax.open(payload.command.method, payload.command.url + '?token=' + payload.command.data.token, true);
				break;
			
			default:
				port.postMessage({COMID: payload.COMID, error: true, code: 404});
				return;
		}
		
		ajax.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
		ajax.setRequestHeader('Level-Access-AST-Version', '8.10.0.11');
		ajax.send(JSON.stringify(payload.command.data));
	}
	
	// 'CAPTURE_THUMBNAIL'
	static captureThumbnail(port, payload) {
		// The screenshot taken by browserAPI.tabs.captureVisibleTab() may be of higher resolution thus it needs to be scaled to the window size using canvas
		const callback = function (dataUrl) {
			// Check if the call failed because of lack of activeTab permission
			const e = browserAPI.runtime.lastError;
			if (!(e === undefined || e === null)) { // undefined in chrome, null in firefox
				const retObj = {
					result     : {
						type   : 'CAPTURE_THUMBNAIL_RESPONSE',
						success: false
					},
					source     : 'background',
					destination: 'ast'
				};
				
				port.postMessage(retObj);
			}
			
			const img       = new Image();
			img.crossOrigin = 'Anonymous';
			img.onload      = function () {
				const canvas    = document.createElement('canvas');
				const imgHeight = img.height / payload.command.devicePixelRatio;
				const imgWidth  = img.width / payload.command.devicePixelRatio;
				canvas.height   = imgHeight;
				canvas.width    = imgWidth;
				canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
				const convertedDataURL = canvas.toDataURL('image/png');
				
				const retObj = {
					result     : {
						type     : 'CAPTURE_THUMBNAIL_RESPONSE',
						success  : true,
						dataUrl  : convertedDataURL,
						tabWidth : imgWidth,
						tabHeight: imgHeight
					},
					source     : 'background',
					destination: 'ast'
				};
				
				port.postMessage(retObj);
			};
			
			// Load image into the object
			img.src = dataUrl;
			
			// FIXME: Document what this does, need to talk to Alistair until then.
			if (img.complete || img.complete === undefined) {
				img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
				img.src = dataUrl;
			}
		};
		
		if (typeof chrome === 'undefined') {
			// FF
			const promise = browserAPI.tabs.captureVisibleTab(window.port_levelaccessmainstation.sender.tab.windowId, {});
			promise.then(callback, function () {
			});
		} else {
			// CH
			browserAPI.tabs.captureVisibleTab(window.port_levelaccessmainstation.sender.tab.windowId, {}, callback);
		}
	}
	
	// 'CHECK_SESSION'
	static checkSession(port, payload) {
		const ajax              = new XMLHttpRequest();
		ajax.onreadystatechange = function () {
			if (this.readyState === 4 && this.status === 200) {
				const responsePayload = {
					source     : 'background',
					destination: 'ast',
					result     : {
						type    : 'CHECK_SESSION_RESPONSE',
						response: this.responseText
					}
				};
				port.postMessage(responsePayload);
			}
			
			if (this.readyState === 4 && this.status === 500) {
				port.postMessage({
					source     : 'background',
					destination: 'ast',
					result     : {
						error: true,
						COMID: payload.COMID
					}
				});
			}
		};
		ajax.open('POST', 'https://' + payload.command.host + '/api/assistant/user/hasSession', true);
		ajax.send();
	}
}

const handlePortMessage = (port, payload) => {
	if (payload.messageId) {
		port.postMessage({type: 'MESSAGE_RESPONSE', messageId: payload.messageId});
	}
	
	if (port.name === 'levelaccesspopup') {
		window.port_levelaccesspopup = port;
	}
	if (port.name === 'levelaccessmainstation') {
		window.port_levelaccessmainstation = port;
	}
	
	if (!payload.destination) {
		return;
	}
	
	// Destination driven events
	if (payload.destination === 'background') {
		if (payload.command) {
			switch (payload.command.type) {
				case 'IFRAME_CHECK':
					MessageHandlers.iframeCheck(payload);
					break;
				
				case 'TAB_CHECK':
					MessageHandlers.tabCheck();
					break;
				
				case 'TO_EXTERNAL':
					MessageHandlers.toExternal(payload);
					break;
				
				case 'ACTIVATE_AST':
					reactivateAST();
					break;
				
				case 'RECONNECT':
					MessageHandlers.reconnect();
					break;
				
				case 'CONNECT':
					MessageHandlers.connect(payload);
					break;
				
				case 'LOAD_LOCAL_STORAGE':
					MessageHandlers.loadLocalStorage();
					break;
				
				case 'SET_LOCAL_STORAGE':
					MessageHandlers.setLocalStorage(payload);
					break;
				
				case 'SEND_REQUEST':
					MessageHandlers.sendRequest(port, payload);
					break;
				
				case 'CAPTURE_THUMBNAIL':
					MessageHandlers.captureThumbnail(port, payload);
					break;
				
				case 'CHECK_SESSION':
					MessageHandlers.checkSession(port, payload);
					break;
				
				case 'RELOAD':
					reloadPageUnderTest();
					break;
			}
		}
	} else {
		browserAPI.tabs.query({
			active  : true,
			windowId: activeWindowId,
			url     : '<all_urls>'
		}, function (tabs) {
			// different messages
			
			// we need to be able to fire different in page messages - which the MainStation will listen to; like
			// the mainStation then beams back the results of the request to here; which then beams it back to the popup
			// with each different message - you have to check if AccessEngine Full,  MainStation, and SubStation are all available
			// as iframes won't be injected if a person simply moves to an existing tab; we might have to instead update each tab which gains focus
			if (tabs.length === 1) {
				if (payload.destination === 'page') {
					try {
						window.port_levelaccessmainstation.postMessage(payload);
						
						browserAPI.tabs.update(tabs[0].id, {
							active: true
						});
					} catch (err) {
						console.error(err);
					}
				} else if (payload.destination === 'ast') {
					try {
						window.port_levelaccesspopup.postMessage(payload);
					} catch (err) {
						console.log(err);
					}
				}
			} else {
				sendDisconnectedMessage();
			}
		});
	}
};


/* ******************************************************************************** */
// Listeners
/* ******************************************************************************** */
(() => {
	browserAPI.browserAction.onClicked.addListener((tab) => {
		activeTabId    = tab.id;
		activeWindowId = tab.windowId;
		
		initializeAssistant(tab);
	});
	
	// handle user changing from one active tab to another
	browserAPI.tabs.onActivated.addListener(() => {
		handlePotentialTabChange();
	});
	
	// handle the current page changing in some way, e.g. navigating to a new page within a tab
	browserAPI.tabs.onUpdated.addListener((tabId, changeInfo) => {
		if (!changeInfo.status || changeInfo.status !== 'complete') {
			// ignore incomplete updates
			return;
		}
		
		handlePotentialTabChange();
	});
	
	// handle user changing from one active window to another
	browserAPI.windows.onFocusChanged.addListener(() => {
		handlePotentialTabChange();
	});
	
	browserAPI.runtime.onMessage.addListener(function (request, sender, sendResponse) {
		handlePortMessage.call(window, activeTabPorts[sender.tab.id], request);
		sendResponse({});
	});
	
	browserAPI.runtime.onMessageExternal.addListener((payload, sender) => {
		if (payload.from === 'FROM_EXTERNAL') {
			let responsePayload = {
				source     : 'background',
				destination: 'ast',
				result     : {
					type       : 'FROM_EXTERNAL',
					payload    : Object.assign({}, payload.payload),
					extensionId: sender.id
				}
			};
			
			window.port_levelaccesspopup.postMessage(responsePayload);
		}
	});
	
	browserAPI.runtime.onConnect.addListener(function (p) {
		let port = p;
		
		activeTabPorts[port.sender.tab.id] = port;
		
		// window needs to be used as the save point, otherwise the ports close
		switch (port.name) {
			case 'levelaccesspopup':
				port.onDisconnect.addListener(function () {
					window.port_levelaccesspopup = undefined;
				}.bind(window));
				
				window.port_levelaccesspopup = port;
				break;
			
			case 'levelaccessmainstation':
				port.onDisconnect.addListener(function () {
					delete activeTabPorts[port.sender.tab.id];
					if (port === window.port_levelaccessmainstation) {
						window.port_levelaccessmainstation = undefined;
					}
				}.bind(window));
				window.port_levelaccessmainstation = port;
				break;
		}
		
		port.onMessage.addListener(handlePortMessage.bind(window, port));
		
		respondToConnection(port);
	});
})();
/* ******************************************************************************** */


/* ******************************************************************************** */
// Freeze/Thaw Functionality
/* ******************************************************************************** */
const thawPage = (tab) => {
	if (typeof tab === 'object') {
		tab = tab.tabId;
	}
	
	if (frozen) {
		browserAPI.tabs.sendMessage(
			tab,
			{
				data: {
					type: 'THAW'
				}
			}
		);
	}
	
	frozen = false;
};

browserAPI.commands.onCommand.addListener(function (command) {
	if (command === 'freeze-thaw') {
		frozen = !frozen;
		browserAPI.tabs.query({active: true, currentWindow: true}, function (tabs) {
				browserAPI.tabs.executeScript(tabs[0].id, {
						code: '(function() {' +
						      'window.postMessage({destination: "page", command: {type: "' + (frozen ? 'freeze' : 'thaw') + '"}}, window.origin);' +
						
						      // Satisfy the promise for FF
						      'return true;' +
						      '})();'
					},
					checkRuntimeErrors
				);
			}
		);
	}
});

browserAPI.tabs.onActivated.addListener(thawPage);
browserAPI.tabs.onUpdated.addListener(thawPage);