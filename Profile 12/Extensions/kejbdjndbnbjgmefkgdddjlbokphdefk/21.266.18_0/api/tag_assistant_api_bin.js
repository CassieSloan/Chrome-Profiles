(function(){/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
'use strict';var e=class{constructor(c){this.g=d;this.h=c;this.g.document.addEventListener("__TAG_ASSISTANT_API_MESSAGE",b=>{b=b.detail;var a;if(a=this.receiver){a:if(a=null===b||void 0===b?void 0:b.type,"string"!==typeof a)a=!1;else switch(a){case "PIPE_MESSAGE":case "DISCONNECT":case "API_INSTALLED":case "WINDOWS_CLOSED":a=!0;break a;default:a=!1}if(a)a:if(a=null===b||void 0===b?void 0:b.source,"string"!==typeof a)a=!1;else switch(a){case "PAGE":case "EXTENSION":a=!0;break a;default:a=!1}}a&&"PIPE_MESSAGE"===
b.type&&"EXTENSION"===b.source&&this.receiver(b.data,b.origin)});this.g.document.dispatchEvent(new CustomEvent("__TAG_ASSISTANT_API_MESSAGE",{detail:{type:"API_INSTALLED",source:"PAGE"}}))}setReceiver(c){this.receiver=c}sendMessage(c){this.g.document.dispatchEvent(new CustomEvent("__TAG_ASSISTANT_API_MESSAGE",{detail:{type:"PIPE_MESSAGE",source:"PAGE",data:c,origin:this.g.origin}}))}disconnect(){this.g.document.dispatchEvent(new CustomEvent("__TAG_ASSISTANT_API_MESSAGE",{detail:{type:"DISCONNECT",
source:"PAGE"}}));this.h()}};const d=window;d.__TAG_ASSISTANT_API=d.__TAG_ASSISTANT_API||new e(()=>{d.__TAG_ASSISTANT_API=void 0});}).call(this);
