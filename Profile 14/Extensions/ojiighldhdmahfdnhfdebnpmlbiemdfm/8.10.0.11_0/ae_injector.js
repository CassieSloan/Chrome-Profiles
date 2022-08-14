(() => {
	const browserAPI = (typeof chrome === 'undefined' ? browser : chrome);
	const injector   = (theWindow, isIframe = false) => {
		// skip if document is editable
		if (theWindow.document.body.isContentEditable || theWindow.document.designMode.toLowerCase() === 'on') {
			return;
		}
		
		const scripts = [
			{
				id       : 'levelaccess-engine',
				url      : browserAPI.extension.getURL('AccessEngine.professional.js'),
				forIframe: true
			},
			{
				id       : 'levelaccess-ast-js',
				url      : browserAPI.extension.getURL('LevelAccess-AST.js'),
				forIframe: true
			},
			{
				id       : 'levelaccess-ast-css',
				url      : browserAPI.extension.getURL('LevelAccess-AST.css'),
				forIframe: true
			},
			{
				id       : 'levelaccess-macro-recorder',
				url      : browserAPI.extension.getURL('LevelAccess-Macro.js'),
				forIframe: false
			}
		];
		
		for (let j = 0; j < scripts.length; j++) {
			const scriptInfo = scripts[j];
			const exists     = (theWindow.document.querySelector('[data-la-injected="' + scriptInfo.id + '"]') !== null);
			if (exists) {
				continue;
			}
			
			if (scriptInfo.forIframe === false) {
				if (isIframe || theWindow.top !== theWindow.self) {
					continue;
				}
			}
			
			try {
				if (scriptInfo.url.indexOf('.css') === -1) {
					const script = theWindow.document.createElement('script');
					script.setAttribute('src', scriptInfo.url);
					script.setAttribute('data-la-injected', scriptInfo.id);
					script.setAttribute('data-ae_invis', 'true');
					theWindow.document.head.appendChild(script);
				} else {
					const style = theWindow.document.createElement('link');
					style.setAttribute('rel', 'stylesheet');
					style.setAttribute('href', scriptInfo.url);
					style.setAttribute('data-la-injected', scriptInfo.id);
					style.setAttribute('data-ae_invis', 'true');
					theWindow.document.head.appendChild(style);
				}
			} catch (e) {
				//console.log('[level access]', e);
			}
		}
	};
	
	const checkIframePermissions = () => {
		if (!window.portConnection) {
			return;
		}
		
		const origins = [];
		const iframes = document.querySelectorAll('iframe[src]');
		for (let i = 0; i < iframes.length; i++) {
			const style        = getComputedStyle(iframes[i]);
			const src          = iframes[i].getAttribute('src');
			const isAriaHidden = iframes[i].hasAttribute('aria-hidden') && iframes[i].getAttribute('aria-hidden') === 'true';
			
			// Ignore hidden iframes and N/A protocols for tab content
			if (src && style.display !== 'none' && style.visibility === 'visible' && !isAriaHidden) {
				const url = new URL(iframes[i].src);
				if (['http:', 'https:', 'file:'].indexOf(url.protocol) !== -1) {
					origins.push(url.protocol + '//' + url.hostname + '/*');
				}
			}
		}
		
		window.portConnection.sendMessageToBackgroundPage({
			source     : 'page',
			destination: 'background',
			command    : {
				type   : 'IFRAME_CHECK',
				origins: origins
			}
		});
	};
	
	setTimeout(injector.bind(window, window, false), 200);
	setTimeout(checkIframePermissions, 2000);
})();