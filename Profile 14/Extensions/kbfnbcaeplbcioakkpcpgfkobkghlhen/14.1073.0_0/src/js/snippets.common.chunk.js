(self.webpackChunk=self.webpackChunk||[]).push([[7717],{4557:(e,t,n)=>{n.d(t,{B:()=>s});var s,i=n(5114),p=n(95195);!function(e){e.NAME_LENGTH_LIMIT=30,e.CONTENT_LENGTH_LIMIT=1e3;e.validate=(t,n,s)=>{const r=((t,n)=>0===t.trim().length?i.some(n.nameEmpty):t.length>e.NAME_LENGTH_LIMIT?i.some(n.nameTooLong):i.none)(t,s),a=((t,n)=>0===t.trim().length?i.some(n.textEmpty):t.length>e.CONTENT_LENGTH_LIMIT?i.some(n.textTooLong):i.none)(n,s);return i.isNone(r)&&i.isNone(a)?p.F2(void 0):p.t$({nameError:r,contentError:a})}}(s||(s={}))},36089:(e,t,n)=>{n.r(t),n.d(t,{DEFAULT_CREATION_SHORTCUT:()=>i.Gx,DEFAULT_TRIGGER_SEQUENCE:()=>i.QQ,SnippetMatchLocation:()=>s.C2,SnippetsFeature:()=>s.EH,SnippetsProviderImpl:()=>i.Zm,SnippetsRpcClient:()=>g,SnippetsUIController:()=>C,processChanges:()=>s.pi});var s=n(40188),i=n(34541),p=n(27378),r=n(32952),a=n(2844),o=n(93508),l=n(28043),c=n(77176),d=n(25691),h=n(88434),_=n(71031),u=n(46777),m=n(38983);class C{constructor(e){this._gnar=e,this._hovered=new r.xQ,this._dismissed=new r.xQ,this.cardHovered=this._hovered.pipe((0,o.O)(!1),(0,l.x)()),this.cardDismissed=this._dismissed.pipe((0,l.x)()),this._activeCardModel=m.h.create(null),this.view=(0,a.aj)([this._activeCardModel]).pipe((0,c.U)((([e])=>{var t;let n;switch(null==e?void 0:e.mode){case"list":n=p.createElement(h.L,{matches:e.matches,applySnippet:e.applySnippet,selectSnippet:e.selectSnippet,activeSnippet:e.activeSnippet,triggerSequence:e.triggerSequence,creationShortcut:e.creationShortcut,onOpenLink:e=>this._onOpenLink(e)});break;case"shortcutPopup":n=p.createElement(h.O,{onShow:()=>this._onPopupShow(),openEditor:()=>this._openEditor(),creationShortcut:e.creationShortcut});break;case"editor":n=p.createElement(_.M,{content:null!==(t=e.content)&&void 0!==t?t:"",addSnippet:e.addSnippet,dismiss:this._dismiss.bind(this),triggerSequence:e.triggerSequence});break;default:return null}return e?p.createElement(u.q,null,p.createElement(d.W,{anchorRect:e.rect,anchorMargin:{top:0,left:-15,bottom:5,right:0},onHover:e=>this._hovered.next(e),onClickAway:e=>this._dismissed.next(e),partName:"snippets"},n)):null})))}_onOpenLink(e){this._gnar.snippetsLinkOpened(e)}_openEditor(){const e=this._activeCardModel.get();this._activeCardModel.set({...e,mode:"editor"})}_dismiss(){this._activeCardModel.set(null)}_onPopupShow(){this._gnar.snippetsPopupShow()}show(e){this._activeCardModel.set(e)}hide(){this._activeCardModel.set(null),this._hovered.next(!1)}isVisible(){return!!this._activeCardModel.get()}isShortcutPopupShown(){var e;return"shortcutPopup"===(null===(e=this._activeCardModel.get())||void 0===e?void 0:e.mode)}isEmptySnippetsListShown(){const e=this._activeCardModel.get();return e&&"list"===e.mode&&0===e.matches.length}dispose(){this.hide()}}class g{constructor(e){this._rpc=e,this.addSnippet=this._rpc.addSnippet,this.getSnippets=this._rpc.getSnippets}}},40188:(e,t,n)=>{n.d(t,{C2:()=>w,EH:()=>H,pi:()=>G});var s=n(22764),i=n(88661),p=n(40327),r=n(95300),a=n(18625),o=n(2844),l=n(24209),c=n(85985),d=n(77176),h=n(38194),_=n(93508),u=n(41398),m=n(17343),C=n(32281),g=n(62337),S=n(13116),E=n(24809).v.isRichText,v=n(55073),f=n(10789);function b(){return{items:[],children:new Map}}function x(e,t){return t&&0!==e.length?x(e.slice(1),t.children.get(e[0])||null):t}class L{constructor(e,t){this._root=b(),e.forEach((e=>{const n=e[t];if(!(0,f.HD)(n))throw new Error("Can't search for non-string attributes");n.toLowerCase().split("").reduce(((t,n)=>(t.items.push(e),t.children.has(n)||t.children.set(n,b()),t.children.get(n))),this._root).items.push(e)}))}search(e){const t=[];let n=null,s={node:this._root,depth:0};const i=[];for(;s;){n=x(e.toLowerCase(),s.node),n&&i.push({node:n,depth:s.depth});const p=s.node.children.values();let r=p.next();for(;!r.done;)t.push({node:r.value,depth:s.depth+1}),r=p.next();s=t.shift()||null}return Array.from(i.reduce(((t,n)=>(n.node.items.forEach((s=>{t.has(s)||t.set(s,{start:n.depth,end:n.depth+e.length})})),t)),new Map).entries()).map((([e,t])=>({item:e,range:t})))}}var w,y=n(90361),M=n(75420),N=n(74850),T=n(36991),I=n(84966),P=n(40018),A=n(15646),k=n(77610),B=n(35416),D=n(44586),O=n(14601),R=n(2834),Z=n(78674),F=n(83078),U=n(5114),q=n(34541);!function(e){e.name="name",e.content="content"}(w||(w={}));const W=/\s+$/;function G(e,t,n){if(!t){if(e.deltaChange.isEmpty)return null;{const t=e.deltaChange.delta.ops.slice(0);let s=t.pop();for(;t.length&&s&&!T.s.isInsertString(s);)s=t.pop();if(s&&T.s.isInsertString(s)&&!W.test(s.insert)){const t=e.deltaChange.delta.ops.reduce(((e,t)=>T.s.isInsertString(t)?e+t.insert.length:T.s.isRetain(t)?e+t.retain:e),0);return new RegExp(`^(.*\\s)?${(0,y.hr)(n)}(\\s.*)?$`).test((0,v.l)(e.deltaChange.delta,e.prevText).slice(Math.max(t-n.length-1,0),t+1))?{start:t-n.length,end:t}:null}return null}}{const{effectStartIndex:s,sizeDelta:i}=e.deltaChange.delta.ops.reduce(((e,t)=>(T.s.isRetain(t)?e.index+=t.retain:T.s.isDelete(t)?(e.effectStartIndex=Math.min(e.effectStartIndex,e.index),e.sizeDelta-=t.delete):T.s.isInsertString(t)?(e.effectStartIndex=Math.min(e.effectStartIndex,e.index),e.index+=t.insert.length,e.sizeDelta+=t.insert.length):T.s.isInsertEmbed(t)&&(e.effectStartIndex=Math.min(e.effectStartIndex,e.index),e.index+=1,e.sizeDelta+=1),e)),{index:0,effectStartIndex:1/0,sizeDelta:0});switch(!0){case s<t.start+n.length:case s>t.end:return null;default:return{...t,end:t.end+i}}}}class H{constructor(e,t,n,i,p,g,S,E,v,f,b,x,w,y,T,I,P,A,k=N.Y.create("Snippets")){var B,D;this._snippetsProvider=e,this._textObserver=t,this._replacementService=n,this._geometryProvider=i,this._geometryLayout=p,this._textFieldLayout=g,this._getCurrentTextMap=S,this._controller=E,this._keyDown=v,this._gnar=f,this._checkingService=b,this._selectionSource=x,this._state=w,this._updateSnippetsShortcutPopupCounter=y,this._isCurrentFieldFocused=T,this._events=I,this._alertStateService=P,this._experimentClient=A,this._log=k,this._subs=[],this._insertionRange=new r.X(null),this._activeSnippet=new r.X(null),this._selectionObservable=(0,a.P)((()=>this._selectionSource.data.changes.pipe((0,c.h)((e=>Boolean(e)))))),this._snippetsDataByName=new L([],"name"),this._snippetsDataByContent=new L([],"content"),this._triggerSequence=q.QQ,this._shortcutPopupSessionCounter=0,this._initialShortcutPopupCounter=0,this.addSnippetsTriggerToAlert=e=>({...e,extra_properties:{...e.extra_properties,snippet_trigger:this._triggerSequence}}),this._initialShortcutPopupCounter=null!==(D=null===(B=this._state.get())||void 0===B?void 0:B.page.snippetsShortcutPopupCounter)&&void 0!==D?D:0,this._snippetsModel=(0,o.aj)([this._insertionRange,this._activeSnippet,this._textFieldLayout.rect.behavior,this._snippetsProvider.snippetsAndSettings]).pipe((0,d.U)((([e,t,n,s])=>e?this._getModel("list",s,e,t):null)),(0,h.B)(),(0,_.O)(null)),this._shortcutPopupModel=this._selectionObservable.pipe((0,u.M)(this._snippetsProvider.snippetsAndSettings),(0,d.U)((([e,t])=>this._getModel("shortcutPopup",t,e))));const O=(new Date).getTime();let R=!0;this._subs.push(this._snippetsProvider.snippetsAndSettings.subscribe((e=>{this._triggerSequence=e.triggerSequence,this._snippetsDataByName=new L(e.snippets,"name"),this._snippetsDataByContent=new L(e.snippets,"content"),this._gnar.snippetsListLoaded(e.snippets.length,R?(new Date).getTime()-O:void 0),R=!1}))),this._subs.push((0,l.T)(this._snippetsModel,this._shortcutPopupModel.pipe((0,c.h)((e=>{var t;return"shortcutPopup"===(null===(t=this._currentModel)||void 0===t?void 0:t.mode)||Boolean(e)}))),this._events.pipe((0,u.M)(this._snippetsProvider.snippetsAndSettings),d.U((([{text:e,textRange:t,onCreate:n},s])=>this._getModel("editor",s,t,void 0,e,n)))),this._isCurrentFieldFocused.pipe((0,c.h)((e=>!e)),(0,m.h)(null)),this._snippetsProvider.snippetsEnabled.pipe((0,c.h)((e=>!e)),(0,m.h)(null))).subscribe((e=>{e?this._show(e):this._hide()}))),this._subs.push(this._textObserver.contentChanges.async.pipe((0,u.M)(this._insertionRange.pipe((0,_.O)(null)),this._snippetsProvider.snippetsAndSettings.pipe((0,_.O)(null)))).subscribe((([e,t,n])=>{if(n&&!n.enabled)return;const s=(null==n?void 0:n.triggerSequence)||q.QQ,i=G(e,t,s);this._insertionRange.next(i),n&&t&&null===i&&this._dismiss("edit"),null===t&&i&&(this._gnar.snippetsTriggerSequenceEntered(null!=n,s),n&&this._gnar.snippetsListPresented(s))}))),this._subs.push(this._keyDown.pipe((0,u.M)(this._insertionRange.pipe((0,_.O)(null)),this._snippetsModel,this._selectionObservable.pipe((0,_.O)(null)),this._isCurrentFieldFocused,this._snippetsProvider.snippetsAndSettings)).subscribe((([e,t,n,i,p,r])=>{if(!r.enabled)return;const a=(0,s.O)();if(p&&(e=>e.key.toLowerCase()===r.creationShortcut&&(a.config.systemInfo.os.isMac?e.ctrlKey&&!e.altKey&&!e.metaKey&&!e.shiftKey:e.altKey&&!e.ctrlKey&&!e.metaKey&&!e.shiftKey))(e)&&(!this._controller.isVisible()||this._controller.isShortcutPopupShown()&&i||this._controller.isEmptySnippetsListShown())){this._gnar.snippetsShortcutUsed();const t=this._getModel("editor",r,i);if(t)return this._updateSnippetsShortcutPopupCounter(-1),this._hide(),this._show(t),void e.preventDefault()}if(e.keyCode===M.VD.Escape)return this._dismiss("esc"),void e.stopPropagation();t&&(e.keyCode!==M.VD.Tab&&e.keyCode!==M.VD.RightArrow&&e.keyCode!==M.VD.Return||e.altKey||e.ctrlKey||e.shiftKey||e.metaKey?e.keyCode!==M.VD.UpArrow&&e.keyCode!==M.VD.DownArrow||(e.preventDefault(),e.stopPropagation(),this._shiftActiveSnippet(e.keyCode===M.VD.UpArrow,n)):t&&n&&n.activeSnippet&&(e.preventDefault(),e.stopPropagation(),this._applySnippet(n.activeSnippet.snippet,t,r.triggerSequence)))}))),this._subs.push(this._textFieldLayout.scroll.behavior.pipe((0,u.M)(this._snippetsModel),(0,c.h)((([e,t])=>!!t))).subscribe((()=>{this._dismiss("scroll")}))),this._subs.push(this._alertStateService.newlyHighlightedAlerts.pipe((0,u.M)(this._snippetsProvider.snippetsEnabled),c.h((([e,t])=>t&&C.S.isSuggestedSnippetAlert(e)))).subscribe((()=>{this._gnar.suggestedSnippetHighlightShow()}))),this._gnar.snippetsFeatureInit()}_applySnippet(e,t,n){const s=this._experimentClient.isGateEnabled(i.K.RtfSnippets)&&E(e.contentDelta),p=s?e.contentDelta:e.content;this._dismiss("apply"),this._gnar.snippetsSnippetApplied(s,t.end-t.start-n.length),this._replacementService.performReplacement(t,p,!1),this._checkingService&&this._checkingService.onSnippetFeedback({kind:I.JE.SNIPPET_ACCEPTED,snippetUuid:e.id})}_selectSnippet(e){this._activeSnippet.next(e)}_getSnippetsForText(e){return[...this._snippetsDataByName.search(e).map((e=>({snippet:e.item,range:e.range,location:w.name}))),...this._snippetsDataByContent.search(e).map((e=>({snippet:e.item,range:e.range,location:w.content})))].reduce(((e,t)=>(e.set.has(t.snippet.id)||e.result.push(t),e.set.add(t.snippet.id),e)),{set:new Set,result:new Array}).result}_shiftActiveSnippet(e,t){var n;if(t&&t.matches.length&&t.activeSnippet){const s=t.activeSnippet.index;s>-1?this._activeSnippet.next((null===(n=t.matches[Math.min(t.matches.length-1,Math.max(s+(e?-1:1),0))])||void 0===n?void 0:n.snippet)||null):this._activeSnippet.next(null)}else this._activeSnippet.next(null)}_dismiss(e){this._insertionRange.next(null),this._activeSnippet.next(null),"apply"!==e&&this._gnar.snippetsListDismissed(e)}_getModel(e,t,n,s,i,p){var r;const a=this._getCurrentTextMap(),o=n&&this._geometryProvider.create(n,a),l=o?this._geometryProvider.getClientRects(o):null,c=null!==(r=l&&l.length&&("list"===e?l[0]:l[l.length-1]))&&void 0!==r?r:null,d=c&&(0,S.Z)(g.UL.setPosition(this._geometryLayout.getApproximateConversionContext().clientToRelative(c),c),this._textFieldLayout.rect.getApproximate().client,this._textFieldLayout.scroll.getApproximate())||"editor"===e&&(h=this._textFieldLayout.rect.getApproximate().client,g.UL.setPosition(h,{height:1,width:1}));var h;if(!d)return null;if("shortcutPopup"===e){if(this._initialShortcutPopupCounter<0||this._initialShortcutPopupCounter>=3)return null;if(0===this._shortcutPopupSessionCounter&&this._updateSnippetsShortcutPopupCounter(this._initialShortcutPopupCounter+1),this._shortcutPopupSessionCounter%3!=0||this._shortcutPopupSessionCounter>6)return this._shortcutPopupSessionCounter++,null;this._shortcutPopupSessionCounter++}const _=n?this._getSnippetsForText(a.getPlainText().substring(n.start+t.triggerSequence.length,n.end)):[],u=n?n.end-n.start-t.triggerSequence.length:0,m=s?_.findIndex((e=>e.snippet.id===s.id)):-1;return{rect:d,matches:_,mode:e,applySnippet:e=>{const s=_.find((t=>t.snippet.id===e));n&&s&&this._applySnippet(s.snippet,n,t.triggerSequence)},selectSnippet:e=>{const t=_.find((t=>t.snippet.id===e));t&&this._selectSnippet(t.snippet)},addSnippet:async(e,t)=>{await this._snippetsProvider.addSnippet(e,t)&&p&&(p(),this._gnar.snippetsInlineSnippetCreated()),this._hide()},activeSnippet:_.length?s&&m>-1?{snippet:s,index:m}:{snippet:_[0].snippet,index:0}:null,matchLength:u,triggerSequence:t.triggerSequence,creationShortcut:t.creationShortcut,content:i||("list"!==e&&n?a.getPlainText().substring(n.start,n.end):"")}}_show(e){this._currentModel=e,this._controller.show(e)}_hide(){this._currentModel=null,this._controller.hide()}static _subscribeToMuteOrUndoMuteButtonClick(e,t,n,s,i){e.add(t.pipe(c.h(s),u.M(n),d.U((([e,t])=>B.nL.hasItems(t)?(0,p.pipe)(t.currentLens.items.get(e.id),U.fold((()=>null),(e=>e.value))):null)),c.h(y.fQ),c.h(k.C.isSuggestedSnippetItem)).subscribe(i))}dispose(){this._subs.forEach((e=>e.unsubscribe()))}initCardActionsProcessing(e,t,n,s){return new D.y((()=>{const i=new O.w;return i.add(e.pipe(c.h(A.lY.isCreateSnippetAction),R.b((()=>{this._gnar.suggestedSnippetCardAccept("assistant")}))).subscribe((({snippetName:e,snippetText:t})=>{this._snippetsProvider.addSnippet(e,t)}))),i.add(e.pipe(c.h(A.lY.isSuggestedSnippetSuccessDismissed)).subscribe((e=>{(0,p.pipe)(t.getById(e.alertId),U.chain(P.bZ.getRawId),U.fold((()=>this._log.error("Tried to acknowledge nonexistent snippet alert from the sidebar",{alertId:e.alertId})),(e=>{var t;return null===(t=this._checkingService)||void 0===t?void 0:t.onAlertAcknowledged(e,I.e3.Sidebar)})))}))),i.add(n.pipe(c.h(k.C.isSuggestedSnippetItem)).subscribe((()=>{this._gnar.suggestedSnippetMiniCardShow()}))),i.add(e.pipe(c.h(A.lY.isAlertCardShow),d.U((e=>e.alertId)),Z.b(300)).subscribe((e=>(0,p.pipe)(t.getById(e),U.filter(P.bZ.isSuggestedSnippet),F.bw((()=>{this._gnar.suggestedSnippetCardLook("assistant")})))))),i.add(e.pipe(c.h(A.lY.isAlertIgnoreAction)).subscribe((e=>(0,p.pipe)(t.getById(e.alertId),U.filter(P.bZ.isSuggestedSnippet),F.bw((()=>{this._gnar.suggestedSnippetCardDismiss("assistant")})))))),H._subscribeToMuteOrUndoMuteButtonClick(i,e,s,A.lY.isMuteCategoryAction,(()=>{this._gnar.suggestedSnippetCardDeactivate("assistant")})),H._subscribeToMuteOrUndoMuteButtonClick(i,e,s,A.lY.isUndoMuteCategoryAction,(()=>{this._gnar.suggestedSnippetCardUndoDeactivate("assistant")})),()=>i.unsubscribe()}))}}},88434:(e,t,n)=>{n.d(t,{L:()=>v,O:()=>L});var s=n(22764),i=n(92783),p=n(27378),r=n(40188),a=n(20855),o=n(12187),l=n(80584);const c=e=>{const t=(50-(e.range.end-e.range.start))/2-3;return e.location===r.C2.content?{prefix:d(e.snippet.content,e.range.start,t),content:e.snippet.content.slice(e.range.start,e.range.end),suffix:e.snippet.content.slice(e.range.end)}:{content:e.snippet.content}},d=(e,t,n=1/0)=>e.slice(0,t).split(" ").reduceRight(((e,t,s)=>{let i=e.text,p=e.wordsLeft;return p?(i.length+t.length<n&&(i=i?`${t} ${i}`:t||" "),t?p--:i=`${i}`,!p&&s&&(i=`...${i}`),{text:i,wordsLeft:p}):e}),{text:"",wordsLeft:2}).text,h=()=>(0,s.O)().config.systemInfo.os.isMac?"CONTROL":"ALT",_=()=>p.createElement("svg",{viewBox:"0 0 16 16",version:"1.1",xmlns:"http://www.w3.org/2000/svg"},p.createElement("path",{d:"M16,8C16,12.418 12.418,16 8,16C3.582,16 0,12.418 0,8C0,3.582 3.582,0 8,0C12.418,0 16,3.582 16,8Z",fill:"#9FA6BF"}),p.createElement("path",{d:"M9.045,9.727C9.093,9.989 9.339,10.169 9.605,10.169L10.443,10.169L10.929,10.1C10.152,11.241 8.802,11.766 7.326,11.534C6.125,11.346 5.093,10.533 4.657,9.397C3.669,6.82 5.551,4.36 8.003,4.36C9.282,4.36 10.403,5.128 11.046,6.031C11.217,6.277 11.554,6.348 11.801,6.177C12.034,6.015 12.102,5.707 11.962,5.465C11.073,4.077 9.475,3.189 7.679,3.309C5.34,3.466 3.447,5.38 3.312,7.721C3.156,10.444 5.316,12.668 8.003,12.668C9.415,12.668 10.678,12.054 11.539,11.059L11.437,11.63L11.437,12.145C11.437,12.411 11.617,12.657 11.878,12.705C12.222,12.767 12.522,12.504 12.522,12.171L12.522,9.084L9.578,9.084C9.246,9.084 8.983,9.384 9.045,9.727Z",fill:"white"})),u=()=>p.createElement("svg",{viewBox:"0 0 10 6",version:"1.1",xmlns:"http://www.w3.org/2000/svg"},p.createElement("path",{d:"M9.354,4.603L5,0.249L0.646,4.603C0.451,4.798 0.451,5.115 0.646,5.31C0.842,5.505 1.158,5.505 1.354,5.31L5,1.663C5,1.663 8.646,5.31 8.646,5.31C8.842,5.505 9.158,5.505 9.354,5.31C9.549,5.115 9.549,4.798 9.354,4.603Z"})),m=()=>p.createElement("svg",{viewBox:"0 0 10 6",version:"1.1",xmlns:"http://www.w3.org/2000/svg"},p.createElement("path",{d:"M0.646,1.183L5,5.536L9.354,1.183C9.549,0.988 9.549,0.671 9.354,0.476C9.158,0.28 8.842,0.28 8.646,0.476L5,4.122C5,4.122 1.354,0.476 1.354,0.476C1.158,0.28 0.842,0.28 0.646,0.476C0.451,0.671 0.451,0.988 0.646,1.183Z"})),C=()=>p.createElement("svg",{viewBox:"0 0 4 16",version:"1.1",xmlns:"http://www.w3.org/2000/svg"},p.createElement("path",{d:"M2,12C0.895,12 0,12.895 0,14C0,15.105 0.895,16 2,16C3.105,16 4,15.105 4,14C4,12.895 3.105,12 2,12ZM2,13C2.552,13 3,13.448 3,14C3,14.552 2.552,15 2,15C1.448,15 1,14.552 1,14C1,13.448 1.448,13 2,13ZM2,6C0.895,6 0,6.895 0,8C0,9.105 0.895,10 2,10C3.105,10 4,9.105 4,8C4,6.895 3.105,6 2,6ZM2,7C2.552,7 3,7.448 3,8C3,8.552 2.552,9 2,9C1.448,9 1,8.552 1,8C1,7.448 1.448,7 2,7ZM2,0C0.895,0 0,0.895 0,2C0,3.105 0.895,4 2,4C3.105,4 4,3.105 4,2C4,0.895 3.105,0 2,0ZM2,1C2.552,1 3,1.448 3,2C3,2.552 2.552,3 2,3C1.448,3 1,2.552 1,2C1,1.448 1.448,1 2,1Z"})),g=()=>p.createElement("svg",{viewBox:"0 0 32 32",version:"1.1",xmlns:"http://www.w3.org/2000/svg"},p.createElement("path",{d:"M25.5,16C25.5,10.753 21.247,6.5 16,6.5C10.753,6.5 6.5,10.753 6.5,16C6.5,21.247 10.753,25.5 16,25.5C21.247,25.5 25.5,21.247 25.5,16ZM24.5,16C24.5,20.694 20.694,24.5 16,24.5C11.306,24.5 7.5,20.694 7.5,16C7.5,11.306 11.306,7.5 16,7.5C20.694,7.5 24.5,11.306 24.5,16ZM15.5,15.5L11.5,15.5C11.224,15.5 11,15.724 11,16C11,16.276 11.224,16.5 11.5,16.5L15.5,16.5L15.5,20.5C15.5,20.776 15.724,21 16,21C16.276,21 16.5,20.776 16.5,20.5L16.5,16.5L20.5,16.5C20.776,16.5 21,16.276 21,16C21,15.724 20.776,15.5 20.5,15.5L16.5,15.5L16.5,11.5C16.5,11.224 16.276,11 16,11C15.724,11 15.5,11.224 15.5,11.5L15.5,15.5Z"})),S=()=>p.createElement("svg",{viewBox:"0 0 32 32",version:"1.1",xmlns:"http://www.w3.org/2000/svg"},p.createElement("path",{d:"M9,22.5C9,23.881 10.119,25 11.5,25L22.5,25C22.776,25 23,24.776 23,24.5C23,24.224 22.776,24 22.5,24L11.5,24C10.672,24 10,23.328 10,22.5C10,21.672 10.672,21 11.5,21L22.5,21C22.776,21 23,20.776 23,20.5L23,13.5C23,13.224 22.776,13 22.5,13C22.224,13 22,13.224 22,13.5L22,20C22,20 11.5,20 11.5,20C10.937,20 10.418,20.186 10,20.5L10,9.5C10,8.672 10.672,8 11.5,8C11.5,8 16.5,8 16.5,8C16.776,8 17,7.776 17,7.5C17,7.224 16.776,7 16.5,7L11.5,7C10.119,7 9,8.119 9,9.5L9,22.5ZM22.5,22L11.5,22C11.224,22 11,22.224 11,22.5C11,22.776 11.224,23 11.5,23L22.5,23C22.776,23 23,22.776 23,22.5C23,22.224 22.776,22 22.5,22ZM22,7L19.5,7C19.224,7 19,7.224 19,7.5C19,7.776 19.224,8 19.5,8L22,8L22,10.5C22,10.776 22.224,11 22.5,11C22.776,11 23,10.776 23,10.5L23,8L25.5,8C25.776,8 26,7.776 26,7.5C26,7.224 25.776,7 25.5,7L23,7L23,4.5C23,4.224 22.776,4 22.5,4C22.224,4 22,4.224 22,4.5L22,7Z"})),E=()=>p.createElement("svg",{viewBox:"0 0 32 32",version:"1.1",xmlns:"http://www.w3.org/2000/svg"},p.createElement("path",{d:"M24.5,23.5C24.776,23.5 25,23.724 25,24C25,24.276 24.776,24.5 24.5,24.5L7.5,24.5C7.224,24.5 7,24.276 7,24C7,23.724 7.224,23.5 7.5,23.5L24.5,23.5Z"}),p.createElement("path",{d:"M20.894,8.354L22.146,9.606C22.732,10.192 22.732,11.142 22.146,11.727L12.374,21.5L9,21.5L9,18.126L18.773,8.354C19.359,7.768 20.308,7.768 20.894,8.354ZM17.666,10.873L10,18.54L10,20.5L11.96,20.5L19.626,12.833L17.666,10.873ZM19.48,9.061L18.373,10.166L20.333,12.126L21.439,11.02C21.635,10.825 21.635,10.508 21.439,10.313L20.187,9.061C19.992,8.865 19.675,8.865 19.48,9.061Z"})),v=e=>{let t=!1;const n=p.useRef(null),[s,r]=p.useState({menuOpen:!1,visibleSnippetsAmount:30});p.useEffect((()=>a()));const a=()=>{const{activeSnippet:i}=e;if(i&&n.current){const e=58,p=n.current,r=p.scrollTop,a=i.index*e,o=Math.max(0,i.index*e-2*e),l=r+e/2<o?o:r-e/2>a?a:r;l!==r&&(t=!0,p.scrollTop=l,setTimeout((()=>{t=!1}),0));const c=(s.visibleSnippetsAmount-1)*e;r+p.offsetHeight>c&&d()}},d=()=>{r((e=>({...e,visibleSnippetsAmount:s.visibleSnippetsAmount+30})))},v=t=>{r((e=>({...e,menuOpen:!1}))),e.onOpenLink(t)};return p.createElement("div",{className:l.snippetsCard},e.matches.length?p.createElement("dl",{ref:n,className:l.snippetsCard__snippets},e.matches.slice(0,s.visibleSnippetsAmount).map((n=>{var s,i;return p.createElement("div",{...(0,o.Sh)(l.snippetsCard__snippet,n.snippet.id===(null===(i=null===(s=e.activeSnippet)||void 0===s?void 0:s.snippet)||void 0===i?void 0:i.id)?l.snippetsCard__snippet_active:null),key:n.snippet.id,onClick:()=>e.applySnippet(n.snippet.id),onMouseEnter:()=>{return s=n.snippet.id,void(t||e.selectSnippet(s));var s}},p.createElement(f,{match:n,triggerSequence:e.triggerSequence}),p.createElement(b,{match:n,content:c(n)}))}))):p.createElement(x,{creationShortcut:e.creationShortcut}),p.createElement("div",{className:l.snippetsCard__footer},p.createElement("div",{className:l["snippetsCard__footer-logo"]},p.createElement(_,null)),p.createElement("div",{className:l["snippetsCard__footer-hints"]},p.createElement("span",{className:l.buttonTip__group},"navigate"," ",p.createElement("span",{className:l.buttonTip},p.createElement(u,null))," ",p.createElement("span",{className:l.buttonTip},p.createElement(m,null))),p.createElement("span",{className:l.buttonTip__group},"select ",p.createElement("span",{className:l.buttonTip},"Enter")),p.createElement("span",{className:l.buttonTip__group},"cancel ",p.createElement("span",{className:l.buttonTip},"Esc"))),p.createElement("span",{...(0,o.Sh)(l["snippetsCard__footer-menuButton"],s.menuOpen?l["snippetsCard__footer-menuButton_active"]:null),onClick:()=>{r((e=>({...e,menuOpen:!s.menuOpen})))}},p.createElement(C,null)),s.menuOpen&&p.createElement("ul",{className:l["snippetsCard__footer-menu"]},p.createElement("li",{className:l["snippetsCard__footer-menuItem"]},p.createElement("a",{target:"_blank",rel:"noreferrer",href:(0,i.Um)().snippetsNew,onClick:()=>{v("new")}},p.createElement("span",{className:l["snippetsCard__footer-menuItem-icon"]},p.createElement(g,null)),p.createElement("span",{className:l["snippetsCard__footer-menuItem-textGroup"]},p.createElement("span",{className:l["snippetsCard__footer-menuItem-text"]},"Create snippet"),p.createElement("span",{className:l["snippetsCard__footer-shortcut"]},p.createElement("span",{className:l.buttonTip},h())," +"," ",p.createElement("span",{className:l.buttonTip},e.creationShortcut.toUpperCase()))))),p.createElement("li",{className:l["snippetsCard__footer-menuItem"]},p.createElement("a",{target:"_blank",rel:"noreferrer",href:(0,i.Um)().snippetsAdmin,onClick:()=>{v("library")}},p.createElement("span",{className:l["snippetsCard__footer-menuItem-icon"]},p.createElement(S,null)),p.createElement("span",{className:l["snippetsCard__footer-menuItem-textGroup"]},p.createElement("span",{className:l["snippetsCard__footer-menuItem-text"]},"Open library")))),p.createElement("li",{className:l["snippetsCard__footer-menuItem"]},p.createElement("a",{target:"_blank",rel:"noreferrer",href:(0,i.Um)().snippetsSettings,onClick:()=>{v("customize")}},p.createElement("span",{className:l["snippetsCard__footer-menuItem-icon"]},p.createElement(E,null)),p.createElement("span",{className:l["snippetsCard__footer-menuItem-textGroup"]},p.createElement("span",{className:l["snippetsCard__footer-menuItem-text"]},"Edit shortcut"),p.createElement("span",{className:l["snippetsCard__footer-shortcut"]},p.createElement("span",{...(0,o.Sh)(l.buttonTip,l["snippetsCard__footer-editShortcut"])},e.triggerSequence))))))))},f=e=>p.createElement("dt",{className:l["snippetsCard__snippet-name"]},p.createElement("span",{...(0,o.Sh)(l["snippetsCard__snippet-logo"],"PERSONAL"===e.match.snippet.hierarchy?l["snippetsCard__snippet-logo-personal"]:l["snippetsCard__snippet-logo-global"])}),p.createElement("span",{className:l["snippetsCard__snippet-name-match"]},e.triggerSequence),e.match.location===r.C2.name?p.createElement(p.Fragment,null,e.match.snippet.name.slice(0,e.match.range.start),p.createElement("span",{className:l["snippetsCard__snippet-name-match"]},e.match.snippet.name.slice(e.match.range.start,e.match.range.end)),e.match.snippet.name.slice(e.match.range.end)):p.createElement(p.Fragment,null,e.match.snippet.name)),b=e=>p.createElement("dd",{className:l["snippetsCard__snippet-content"]},e.match.location===r.C2.content?p.createElement(p.Fragment,null,e.content.prefix,p.createElement("span",{className:l["snippetsCard__snippet-content-match"]},e.content.content),e.content.suffix):p.createElement(p.Fragment,null,e.content.content)),x=e=>p.createElement("div",{className:l.snippetsCard__empty},p.createElement("div",{className:l["snippetsCard__empty-pic"]}),p.createElement("span",{className:l["snippetsCard__empty-title"]},"Your search did not match any snippets"),p.createElement("div",{className:l["snippetsCard__empty-shortcut"]},"To create one, press ",p.createElement("span",{...(0,o.Sh)(l.buttonTip)},h()),"+",p.createElement("span",{...(0,o.Sh)(l.buttonTip)},e.creationShortcut.toUpperCase()))),L=e=>(p.useEffect((()=>{e.onShow()}),[]),p.createElement("div",{className:l.snippetsCreateBtn},p.createElement("span",{className:l.snippetsCreateBtn__logo},p.createElement("svg",{viewBox:"0 0 22 22",version:"1.1",xmlns:"http://www.w3.org/2000/svg"},p.createElement("path",{d:"M10.97,0C4.912,0 0,4.91 0,10.968C0,17.026 4.912,21.938 10.97,21.938C17.03,21.938 21.94,17.026 21.94,10.968C21.94,4.91 17.03,0 10.97,0ZM17.133,16.713C17.133,17.169 16.748,17.529 16.276,17.443C15.916,17.379 15.696,17.041 15.696,16.677L15.696,15.97L15.821,15.188C14.601,16.595 12.827,17.401 10.965,17.394C7.281,17.394 4.315,14.344 4.528,10.612C4.713,7.402 7.308,4.746 10.514,4.532C12.978,4.366 15.166,5.609 16.384,7.454L16.38,7.454C16.572,7.864 16.484,8.24 16.163,8.464C16.038,8.552 15.889,8.599 15.736,8.599C15.494,8.599 15.267,8.48 15.128,8.282L15.128,8.274C14.246,7.044 12.708,6.007 10.956,6.007C7.593,6.007 5.012,9.377 6.368,12.912C6.965,14.468 8.38,15.582 10.028,15.84C12.051,16.158 13.902,15.462 14.968,13.898L14.302,14.015L13.152,14.015C12.788,14.015 12.45,13.795 12.385,13.435C12.3,12.965 12.66,12.58 13.115,12.58L17.133,12.58L17.133,16.713Z"}))),p.createElement("span",{className:l.snippetsCreateBtn__textGroup},p.createElement("span",{onClick:()=>e.openEditor(),className:l.snippetsCreateBtn__text},"Create a snippet"),p.createElement("span",{onClick:()=>e.openEditor(),className:l.snippetsCreateBtn__shortcut},p.createElement("span",{className:l.buttonTip},h())," +"," ",p.createElement("span",{className:l.buttonTip},e.creationShortcut.toUpperCase()))),p.createElement(a.u,{offset:{vertical:-12},message:"Turn highlighted text into a snippet to use it later.",showDelay:300},p.createElement("span",{className:l.snippetsCreateBtn__tooltip},"?"))))},71031:(e,t,n)=>{n.d(t,{M:()=>c});var s=n(57050),i=n(27378),p=n(80584),r=n(4557),a=n(95195),o=n(5114);const l={nameEmpty:"Name cannot be empty.",nameTooLong:"Snippet names cannot exceed 30 characters.",textEmpty:"Snippet cannot be empty.",textTooLong:"Snippets cannot exceed 1,000 characters."},c=e=>{const[t,n]=i.useState(""),[c,d]=i.useState(e.content),[h,_]=i.useState(""),[u,m]=i.useState(""),C=(t,n)=>{(0,s.zG)(r.B.validate(t,n,l),a.g_((e=>{(0,s.zG)(e.nameError,o.fold((()=>_("")),_)),(0,s.zG)(e.contentError,o.fold((()=>m("")),m))}),(()=>{e.addSnippet(t,n),_(""),m("")})))};return i.createElement("div",{className:p.snippetsEditor,onKeyUp:e=>{"Enter"===e.key&&C(t,c)}},i.createElement("div",{className:p.snippetsEditor__topWrapper},i.createElement("input",{onMouseDown:e=>e.stopPropagation(),onChange:e=>{const t=e.target;n(t.value)},autoFocus:!0,className:p.snippetsEditor__topWrapper_name,placeholder:"New snippet",name:"snippet-name-input"}),h.length?i.createElement("div",{className:p.snippetsEditor__topWrapper_nameError},h):null,i.createElement("textarea",{onMouseDown:e=>e.stopPropagation(),onChange:e=>{const t=e.target;d(t.value)},className:p.snippetsEditor__topWrapper_content,placeholder:"Write a snippet of text that can be used again and again.",value:c,name:"snippet-content-input"}),u.length?i.createElement("div",{className:p.snippetsEditor__topWrapper_contentError},u):null),i.createElement("div",{className:p.snippetsEditor__bottomWrapper},i.createElement("div",{className:p.snippetsEditor__bottomWrapper_logo},i.createElement("svg",{viewBox:"0 0 22 22",version:"1.1",xmlns:"http://www.w3.org/2000/svg"},i.createElement("path",{d:"M10.97,0C4.912,0 0,4.91 0,10.968C0,17.026 4.912,21.938 10.97,21.938C17.03,21.938 21.94,17.026 21.94,10.968C21.94,4.91 17.03,0 10.97,0ZM17.133,16.713C17.133,17.169 16.748,17.529 16.276,17.443C15.916,17.379 15.696,17.041 15.696,16.677L15.696,15.97L15.821,15.188C14.601,16.595 12.827,17.401 10.965,17.394C7.281,17.394 4.315,14.344 4.528,10.612C4.713,7.402 7.308,4.746 10.514,4.532C12.978,4.366 15.166,5.609 16.384,7.454L16.38,7.454C16.572,7.864 16.484,8.24 16.163,8.464C16.038,8.552 15.889,8.599 15.736,8.599C15.494,8.599 15.267,8.48 15.128,8.282L15.128,8.274C14.246,7.044 12.708,6.007 10.956,6.007C7.593,6.007 5.012,9.377 6.368,12.912C6.965,14.468 8.38,15.582 10.028,15.84C12.051,16.158 13.902,15.462 14.968,13.898L14.302,14.015L13.152,14.015C12.788,14.015 12.45,13.795 12.385,13.435C12.3,12.965 12.66,12.58 13.115,12.58L17.133,12.58L17.133,16.713Z"}))),i.createElement("div",{className:p.snippetsEditor__bottomWrapper_text},"This snippet will be added to your default collection. To use it later, type",i.createElement("span",{className:p.buttonTip},e.triggerSequence)),i.createElement("div",{className:p.snippetsEditor__bottomWrapper_buttons},i.createElement("div",{onClick:()=>e.dismiss(),className:p.snippetsEditor__bottomWrapper_cancelBtn,"data-name":"cancel-snippet-button"},"Cancel"),i.createElement("div",{onClick:()=>C(t,c),className:p.snippetsEditor__bottomWrapper_saveBtn,"data-name":"save-snippet-button"},"Save"))))}},46777:(e,t,n)=>{n.d(t,{q:()=>i});var s=n(27378);const i=e=>s.createElement("div",{onKeyDown:e=>e.stopPropagation(),onMouseDown:e=>e.stopPropagation()},e.children)},10789:(e,t,n)=>{function s(e){return Number.isFinite(e)||e===Number.NEGATIVE_INFINITY||e===Number.POSITIVE_INFINITY}function i(e){return"string"==typeof e}n.d(t,{HD:()=>i,hj:()=>s})},80584:e=>{e.exports={snippetsEditor:"_1QGZn",snippetsEditor__topWrapper:"_1mxO5",snippetsEditor__topWrapper_name:"_21OqE",snippetsEditor__topWrapper_nameError:"_3WrA4",snippetsEditor__topWrapper_content:"_2Osmi",snippetsEditor__topWrapper_contentError:"_32mdE",snippetsEditor__bottomWrapper:"ans9X",snippetsEditor__bottomWrapper_logo:"c0O33",snippetsEditor__bottomWrapper_text:"_2uzuH",snippetsEditor__bottomWrapper_buttons:"_21hJF",snippetsEditor__bottomWrapper_cancelBtn:"hQBPX",snippetsEditor__bottomWrapper_saveBtn:"_3QPmq",snippetsCreateBtn:"_1P42Q",snippetsCreateBtn__logo:"_2XGoR",snippetsCreateBtn__textGroup:"_2QONg",snippetsCreateBtn__text:"_11-LY",snippetsCreateBtn__shortcut:"_26xGk",snippetsCreateBtn__tooltip:"_2cqo9",snippetsCard:"_3dxQw",snippetsCard__snippets:"pURh0",snippetsCard__snippet:"_1GpcE",snippetsCard__snippet_active:"_1qQiP","snippetsCard__snippet-logo":"_2T6IO","snippetsCard__snippet-logo-personal":"ix5X4","snippetsCard__snippet-logo-global":"qrnjA","snippetsCard__snippet-name":"Q8VGy","snippetsCard__snippet-name-match":"guBYZ","snippetsCard__snippet-content":"_2mZiD","snippetsCard__snippet-content-match":"IniHV",snippetsCard__footer:"_2dtaG","snippetsCard__footer-logo":"_3gH2M","snippetsCard__footer-shortcut":"_1w9po","snippetsCard__footer-hints":"_484sZ","snippetsCard__footer-menuButton":"_1R0o-","snippetsCard__footer-menuButton_active":"_1HAga","snippetsCard__footer-editShortcut":"_2rv26","snippetsCard__footer-menu":"_3mLM-","snippetsCard__footer-menuItem":"_39MWm","snippetsCard__footer-menuItem-text":"_2RRzt","snippetsCard__footer-menuItem-icon":"_31HNb","snippetsCard__footer-menuItem-textGroup":"_1zFr2",snippetsCard__empty:"_1AZ3A","snippetsCard__empty-pic":"_3w1r-","snippetsCard__empty-title":"_3o-c8","snippetsCard__empty-shortcut":"Js6HX",buttonTip:"ImChS",buttonTip__group:"_1-RD5"}}}]);