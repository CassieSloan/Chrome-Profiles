/*******************************************************
* Copyright (C) 2018-2022 WP Interactive Media, Inc. - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
*******************************************************/
(()=>{"use strict";const e="Service_Background",n="Popup",t="Content_Script";const o=chrome.runtime.id,s=[".hotstar.",".hbogola.",".hboespana."],i=[".netflix.",".disneyplus.",".hbomax.",".hulu.",".amazon.",".primevideo.",".youtube."],r="https://redirect.teleparty.com",c="Failed to read chrome storage. Please refresh the page and try again",u="An unexpected error occured. Please refresh the page and try again.";class a{constructor(e,n,t,o,s){this.requiredPermissions=e,this.serverName=t,this.name=o,this.contentScripts=n,this.syncFromEnd=s}urlWithSessionId(e){return`${r}/join/${e}`}}var d,l;function p(e){return e.includes("urn:hbo:feature")?l.HBO_FEATURE:e.includes("urn:hbo:episode")||e.includes("urn:hbo:page:")&&e.includes(":type:episode")?l.HBO_EPISODE:e.includes("urn:hbo:extra")?l.HBO_EXTRA:l.NONE}function h(e,n,t){const o="?"+e.split("?")[t];if(void 0===o)return;const s=n.replace(/[-/\\^$*+?.()|[\]{}]/g,"\\$&"),i=new RegExp("[?|&]"+s+"=([^&]*)(&|$)").exec(o);return null===i||i.length<2?void 0:decodeURIComponent(i[1])}!function(e){e.NETFLIX="NETFLIX",e.HULU="HULU",e.DISNEY_PLUS="DISNEY_PLUS",e.HBO_MAX="HBO_MAX",e.YOUTUBE="YOUTUBE",e.AMAZON="AMAZON"}(d||(d={})),function(e){e.HBO_EPISODE="episode",e.HBO_FEATURE="feature",e.HBO_EXTRA="extra",e.NONE="none"}(l||(l={}));const m=new class extends a{isValidUrl(e){return function(e){return e.hostname.includes(".netflix.")&&e.pathname.includes("/watch")}(e)}getVideoId(e){const n=e.pathname.match(/^.*\/([0-9]+)\??.*/);return n&&n.length>0?n[1]:void 0}getFullscreenScript(){return'\n            (function() {\n                var sizingWrapper = document.getElementsByClassName("sizing-wrapper")[0];\n                    if (sizingWrapper) {\n                        sizingWrapper.requestFullscreen = function() {}\n                        document.getElementsByClassName(\'button-nfplayerFullscreen\')[0].onclick = function() {\n                            var fullScreenWrapper = document.getElementsByClassName("nf-kb-nav-wrapper")[0];\n                            fullScreenWrapper.webkitRequestFullScreen(fullScreenWrapper.ALLOW_KEYBOARD_INPUT);\n                        }\n                    }\n            })();\n        '}}([],["content_scripts/netflix/netflix_content_bundled.js"],"netflix",d.NETFLIX,!1);Object.freeze(m);const f=m;const w=new class extends a{isValidUrl(e){return function(e){return e.hostname.includes(".hulu.")&&e.pathname.includes("/watch")}(e)}getVideoId(e){const n=e.pathname.match(/^.*\/([a-z\-0-9]+)\??.*/);return n&&n.length>0?n[1]:void 0}}([],["content_scripts/hulu/hulu_content_bundled.js"],"hulu",d.HULU,!1);Object.freeze(w);const v=w;const y=new class extends a{isValidUrl(e){return function(e){return e.hostname.includes(".disneyplus.")&&e.pathname.includes("/video")}(e)}getVideoId(e){const n=e.pathname.match(/^.*\/([a-z\-0-9]+)\??.*/);return n&&n.length>0?n[1]:void 0}}([],["content_scripts/disney/disney_content_bundled.js"],"disney",d.DISNEY_PLUS,!1);Object.freeze(y);const b=y;const g=new class extends a{isValidUrl(e){return function(e){return e.hostname.includes(".hbomax.")&&"none"!==p(e.pathname)||e.pathname.includes("urn:hbo:page")}(e)}getVideoId(e){const n="urn:hbo:"+p(e.pathname)+":",t=e.pathname.split(n);let o=null!=t&&t.length>1&&null!=t[1]?t[1].match(/^([a-zA-Z\-_0-9]+)\??.*/):null;const s=null!=o&&0!==o.length?t[1].match(/^([a-zA-Z\-_0-9]+)\??.*/):void 0;let i=s&&s.length>0?s[1]:void 0;return i||(o=e.pathname.match(/(page:)([a-zA-Z\-_0-9]+)\??.*/),i=null!=o&&3==o.length?o[2]:void 0),i}getVideoType(e){return p(e.pathname)}}([],["content_scripts/hbo_max/hbo_max_content_bundled.js"],"hbomax",d.HBO_MAX,!1);Object.freeze(g);const k=g;const _=new class extends a{isValidUrl(e){return function(e){return e.hostname.includes(".amazon.")||e.hostname.includes(".primevideo.")}(e)}getVideoId(e){const n=e.pathname.split("ref")[0].match(/^.*\/([a-z\-0-9.A-Z]+)(\?|\/ref)?.*/);return null!=n&&n.length>0?n[1]:void 0}}([],["content_scripts/amazon/amazon_content_bundled.js"],"amazon",d.AMAZON,!1);Object.freeze(_);const x=_;const S=new class extends a{isValidUrl(e){return function(e){return e.hostname.includes(".youtube.")}(e)}getVideoId(e){if(e.href.includes("watch?")||e.href.includes("/shorts/")){const n=/(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/gm.exec(e.href);return null!=n&&n.length>3&&n[3]?n[3]:void 0}return"browsing"}}([],["content_scripts/youtube/youtube_content_bundled.js"],"youtube",d.YOUTUBE,!1);Object.freeze(S);const P=S;class j{constructor(e,n){var t;this.id=n,this.videoId,this.url=e;const o=[f,v,b,k,x,P];for(const n of o)if(n.isValidUrl(this.url)){this.streamingService=n,this.serviceName=n.name,this.videoId=n.getVideoId(e);break}this.sessionIdFromUrl=null!==(t=h(this.url.href,"npSessionId",1))&&void 0!==t?t:void 0}urlWithSessionId(e){return this.streamingService?this.streamingService.urlWithSessionId(e):void 0}}var T;!function(e){e.CREATE_SESSION="createSession",e.RE_INJECT="reInject",e.GET_INIT_DATA="getInitData",e.IS_CONTENT_SCRIPT_READY="isContentScriptReady",e.SET_CHAT_VISIBLE="setChatVisible",e.DISCONNECT="teardown",e.CLOSE_POPUP="closePopup"}(T||(T={}));class I{constructor(e,n,t){this.sender=e,this.target=n,this.type=t}}class A extends I{constructor(e,n,t){super(e,n,t),this.type=t}}class O extends A{constructor(e,n,t){super(e,n,T.CREATE_SESSION),this.data=t}}var V=console.log.bind(window.console);const z=new class{addListener(e){chrome.runtime.onMessage.addListener(e)}removeListener(e){chrome.runtime.onMessage.removeListener(e)}sendMessageToTabAsync(e,n,t=2e4){return new Promise(((o,s)=>{const i=setTimeout((()=>{s()}),t);try{chrome.tabs.sendMessage(n,e,(n=>{chrome.runtime.lastError&&V(chrome.runtime.lastError.message+JSON.stringify(e)),clearTimeout(i),o(n)}))}catch(e){clearTimeout(i),s(e)}}))}t(e,n){return new Promise(((t,s)=>{let i=null;n&&(i=setTimeout((()=>{s({error:"Send Message Timeout"})}),n));try{chrome.runtime.sendMessage(o,e,(n=>{chrome.runtime.lastError&&console.log(chrome.runtime.lastError.message+JSON.stringify(e)),i&&clearTimeout(i),t(n)}))}catch(e){i&&clearTimeout(i),s(e)}}))}};class E extends A{constructor(e,n){super(e,n,T.GET_INIT_DATA)}}class N extends A{constructor(e,n){super(e,n,T.IS_CONTENT_SCRIPT_READY)}}class C extends A{constructor(e,n,t){super(e,n,T.SET_CHAT_VISIBLE),this.data=t}}class U extends I{constructor(e,n,t){super(e,n,t),this.type=t}}var L;!function(e){e.JOIN_SESSION="joinSession",e.GET_VIDEO_DATA="getVideoData",e.LOAD_SESSION="loadSession",e.NO_SESSION_DATA="noSessionData",e.TEARDOWN="teardown",e.ON_VIDEO_UPDATE="onVideoUpdate",e.SOCKET_LOST_CONNECTION="socketLostConnection",e.REBOOT="socketReconnect",e.LOG_EVENT="logEvent",e.LOG_EXPERIMENT="logExpirement",e.STAY_ALIVE="stayAlive",e.LOAD_CHAT_WINDOW="loadChatWindow",e.RESET_CHAT_WINDOW="resetChatWindow",e.HIDE_CHAT_WINDOW="hideChatWindow"}(L||(L={}));class W extends U{constructor(e,n,t){super(e,n,L.LOG_EVENT),this.data=t,this.sender=e,this.target=n}}class D extends A{constructor(e,n){super(e,n,T.DISCONNECT)}}const R=JSON.parse('{"dE":["tabs"],"$6":["*://*/*"]}');class $ extends U{constructor(e,n,t){super(e,n,L.LOG_EXPERIMENT),this.data=t}}var q=function(e,n,t,o){return new(t||(t=Promise))((function(s,i){function r(e){try{u(o.next(e))}catch(e){i(e)}}function c(e){try{u(o.throw(e))}catch(e){i(e)}}function u(e){var n;e.done?s(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(r,c)}u((o=o.apply(e,n||[])).next())}))};const B=new class{setItemsAsync(e){return q(this,void 0,void 0,(function*(){return new Promise(((n,t)=>{chrome.storage.local.set(e,(()=>{chrome.runtime.lastError?t(new Error("Failed to write to chrome storage. Please refresh the page and try again")):n()}))}))}))}};Object.freeze(B);const F=B;var M=function(e,n,t,o){return new(t||(t=Promise))((function(s,i){function r(e){try{u(o.next(e))}catch(e){i(e)}}function c(e){try{u(o.throw(e))}catch(e){i(e)}}function u(e){var n;e.done?s(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(r,c)}u((o=o.apply(e,n||[])).next())}))};const J=new class{getItemsAsync(e){return M(this,void 0,void 0,(function*(){return new Promise(((n,t)=>{chrome.storage.local.get(e,(e=>{chrome.runtime.lastError?t(new Error(c)):n(e)}))}))}))}getAllItemsAsync(){return M(this,void 0,void 0,(function*(){return new Promise(((e,n)=>{chrome.storage.local.get(null,(t=>{chrome.runtime.lastError?n(new Error(c)):e(t)}))}))}))}};Object.freeze(J);const Z=J,H="create-session-clickedchrome";var X=function(e,n,t,o){return new(t||(t=Promise))((function(s,i){function r(e){try{u(o.next(e))}catch(e){i(e)}}function c(e){try{u(o.throw(e))}catch(e){i(e)}}function u(e){var n;e.done?s(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(r,c)}u((o=o.apply(e,n||[])).next())}))};const Y=[];let K;Y.push(["_setAccount","UA-71812070-2"]),Y.push(["_trackPageview"]),function(){var e;const n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src="https://ssl.google-analytics.com/ga.js";const t=document.getElementsByTagName("script")[0];null===(e=t.parentNode)||void 0===e||e.insertBefore(n,t)}(),console.log("Popup Loaded"),function(){const t=new W(n,e,{name:"user_click",component:{name:"popup_open",type:"button",origin:"tp"}});z.t(t);const o=new W(n,e,{eventType:"popup-open-chrome"});z.t(o)}(),chrome.runtime.onUpdateAvailable.addListener((function(e){Y.push(["_trackEvent","auto-update ->"+e.version,"clicked"]),chrome.runtime.reload()})),chrome.storage.local.get(["userId"],(function(e){e.userId&&(K=e.userId)}));const Q=jQuery;function G(t,o=!0){const s=new W(n,e,{name:"error",action:{reason:t,description:"An error has occured"}});z.t(s),Q(".some-error").removeClass("hidden"),Q(".no-error").addClass("hidden"),Q("#error-msg").html(t),o?Q("#close-error").removeClass("hidden"):Q("#close-error").addClass("hidden")}function ee(){Q("#control-lock").prop("disabled",!0),Q("#create-session").prop("disabled",!0),Q("#leave-session").prop("disabled",!0),Q("#create-session").html('Loading <span class="ellipsis-anim"><span>.</span><span>.</span><span>.</span></span>')}function ne(){Q("#control-lock").prop("disabled",!1),Q("#create-session").prop("disabled",!1),Q("#leave-session").prop("disabled",!1),Q("#create-session").text("Start the party")}Q((function(){ee(),function(){return X(this,void 0,void 0,(function*(){return new Promise(((e,n)=>{chrome.tabs.query({active:!0,currentWindow:!0},(function(t){if(t.length>0){const n=t[0];if(n.id&&n.url)return void e({id:n.id,url:n.url})}n()}))}))}))}().then((o=>{let c;if(V("Setting up popup event listeners"),Q("#create-session").click(w),Q("#close-error").click(v),Q("#reviewLink").click(y),Q("#learn-more").click(k),Q("#learn-more-teleparty").click(_),Q("#leave-session").click(x),Q("#show-chat").change(S),Q("#share-url").click(g),Q("#copy-btn").click(b),Q("#service-netflix").on("click",p(d.NETFLIX)),Q("#service-hulu").on("click",p(d.HULU)),Q("#service-amazon").on("click",p(d.AMAZON)),Q("#service-hbomax").on("click",p(d.HBO_MAX)),Q("#service-disney").on("click",p(d.DISNEY_PLUS)),Q("#service-youtube").on("click",p(d.YOUTUBE)),!o.url||!o.id)return Q(".wrongSite").removeClass("hidden"),void Q(".disconnected").addClass("hidden");{const r=new URL(o.url);if(c=new j(r,o.id),!c.serviceName)return!function(e){return s.some((n=>e.hostname.includes(n)))}(r)?!function(e){return i.some((n=>e.hostname.includes(n)))}(r)?Q(".wrongSite").removeClass("hidden"):Q(".serviceSite").removeClass("hidden"):Q(".unsupportedSite").removeClass("hidden"),void Q(".disconnected").addClass("hidden");Q(".permissions").addClass("hidden"),z.addListener((function(t,o,s){t.sender==e&&t.target==n&&t.type==T.CLOSE_POPUP&&(s(),window.close());return!1})),function(){return X(this,void 0,void 0,(function*(){if(c.streamingService){const e=c.streamingService;yield new Promise((e=>{chrome.tabs.executeScript(c.id,{file:"lib/tp_libraries_min.js"},e)})),yield Promise.all(e.contentScripts.map((e=>new Promise((n=>{chrome.tabs.executeScript(c.id,{file:e},(()=>{n()}))}))))),console.log("Content Scripts ready")}}))}().then((function(){return X(this,void 0,void 0,(function*(){const e=new N(n,t),o=yield z.sendMessageToTabAsync(e,c.id);o?o.error?(G(o.error.message,o.error.showButton),ne()):(ne(),function(){var e;X(this,void 0,void 0,(function*(){ee();const o=new E(n,t),s=yield z.sendMessageToTabAsync(o,c.id);s.inSession&&s.partyUrl&&(l(s.partyUrl),Q(".popup-showchat-container").show(),Q("#show-chat").prop("checked",null!==(e=s.isChatVisible)&&void 0!==e&&e),s.showReviewMessage),ne()}))}(),V("Content Script Ready")):(G(u,!1),ne())}))}))}function a(e){e&&e.error?G(e.error,!1):G(u,!1)}function l(e){Q(".disconnected").addClass("hidden"),Q(".connected").removeClass("hidden"),Q("#show-chat").prop("checked",!0),Q("#share-url").val(e).focus().select()}function p(t){return()=>{const o=new W(n,e,{name:"user_click",action:{description:`popup_service-btn_${t}`}});switch(z.t(o),t){case d.NETFLIX:window.open("https://netflix.com");break;case d.DISNEY_PLUS:window.open("https://disneyplus.com");break;case d.AMAZON:window.open("https://www.amazon.com/Prime-Video/b?node=2676882011");break;case d.HBO_MAX:window.open("https://hbomax.com");break;case d.HULU:window.open("https://hulu.com");break;case d.YOUTUBE:window.open("https://www.youtube.com")}}}function m(){return X(this,void 0,void 0,(function*(){const t=(yield Z.getItemsAsync(["popupPermissionsRequestedDate"])).popupPermissionsRequestedDate;if(t)try{if(function(e){const n=new Date;return n.setHours(0,0,0,0),Math.abs(Number(n)-Number(e))<=3024e5}(new Date(t)))return void f()}catch(e){}return F.setItemsAsync({popupPermissionsRequestedDate:(new Date).toString()}),new Promise((t=>{chrome.permissions.contains({origins:R.$6,permissions:R.dE},(o=>{if(o)f(),t(!0);else{Q(".disconnected").addClass("hidden"),Q(".permissions").removeClass("hidden");let o=!1;Q("#accept-permissions").click((()=>{o||(o=!0,chrome.permissions.request({origins:R.$6,permissions:R.dE},(o=>X(this,void 0,void 0,(function*(){const s="all_sites-popup-chrome",i=new $(n,e,{experimentName:"permissions_request",experimentVersion:s,eventType:"permissions-prompted"});z.t(i);const r=new $(n,e,{experimentName:"permissions_request",experimentVersion:s,eventType:o?"permissions-granted":"permissions-denied"});z.t(r,2500),Q(".permissions").addClass("hidden"),Q(".disconnected").removeClass("hidden"),yield f(),t(o)})))))}))}}))}))}))}function f(){return X(this,void 0,void 0,(function*(){V("Sending create session");const t=new O(n,e,{createSettings:{controlLock:Q("#control-lock").is(":checked")},extensionTabData:c});try{const e=yield z.t(t);if(e&&e.sessionId){const n=e.sessionId,t=function(e){return`${r}/join/${e}`}(n);l(t),function(e){var n;Y.push(["_trackEvent","create-session","clicked",c.serviceName]),function(e,n,t){try{if(K){const o={userId:K,eventType:e,sessionId:n,serviceName:t};console.log("event: "+JSON.stringify(o));const s=new XMLHttpRequest;s.open("POST","https://data.netflixparty.com/log-event"),s.setRequestHeader("Content-Type","application/json"),s.send(JSON.stringify(o))}}catch(e){console.log("log event error")}}("create-session",e,null!==(n=c.serviceName)&&void 0!==n?n:"")}(n)}else a(e);ne()}catch(e){ne(),a(e)}}))}function w(){return X(this,void 0,void 0,(function*(){!function(){const t=new W(n,e,{name:"user_click",component:{name:"popup-create_session",type:"button",origin:"tp"}});z.t(t);const o=new W(n,e,{eventType:H});z.t(o)}(),ee(),yield m()}))}function v(){Q(".no-error").removeClass("hidden"),Q(".some-error").addClass("hidden")}function y(){window.open("https://chrome.google.com/webstore/detail/netflix-party-is-now-tele/oocalimimngaihdkbihfgmpkcpnmlaoa/reviews"),chrome.storage.local.set({reviewClicked:!0});const t=new W(n,e,{name:"review-clicked",action:{description:"review link was clicked"}});z.t(t);const o=new W(n,e,{eventType:"review-clicked-chrome"});z.t(o)}function b(e){console.log("click");const n=h(Q("#share-url").val(),"npSessionId",1);n&&l(n),e.stopPropagation(),e.preventDefault(),Q("#share-url").select(),document.execCommand("copy"),Q("#copy-btn").parent().css("background","#24D154"),Q("#copy-btn").text("Copied!")}function g(e){e.stopPropagation(),e.preventDefault(),Q("#share-url").select()}function k(){chrome.tabs.create({url:"https://www.netflixparty.com/support"})}function _(){chrome.tabs.create({url:"https://www.netflixparty.com/introducing-teleparty"})}function x(){return X(this,void 0,void 0,(function*(){const o=new W(n,e,{name:"user_click",component:{name:"popup-disconnect_session",type:"button",origin:"tp"}});z.t(o);const s=new D(n,t);yield z.sendMessageToTabAsync(s,c.id),window.close()}))}function S(){const e={visible:Q("#show-chat").is(":checked")},o=new C(n,t,e);z.sendMessageToTabAsync(o,c.id)}Q("#reviewLink").attr("href","https://chrome.google.com/webstore/detail/netflix-party-is-now-tele/oocalimimngaihdkbihfgmpkcpnmlaoa/reviews")})).catch((e=>{console.log(e)}))}))})();