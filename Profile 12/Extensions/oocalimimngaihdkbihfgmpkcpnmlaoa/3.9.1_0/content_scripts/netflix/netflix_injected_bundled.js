/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 478:
/***/ (function() {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const getVideoPlayer = () => {
    var e = window.netflix.appContext.state.playerApp.getAPI().videoPlayer;
    var playerSessionIds = e.getAllPlayerSessionIds();
    var t = playerSessionIds.find((val) => { return val.includes("watch"); });
    return e.getVideoPlayerBySessionId(t);
};
const getPlayerApi = () => {
    try {
        return getReactInternals(document.querySelector('.watch-video')).return.stateNode;
    }
    catch (e) {
        return undefined;
    }
};
const getCurrentMetaData = () => {
    try {
        return getWrapperStateNode().state.activeVideoMetadata._metadata._metadata.video;
    }
    catch (error) {
        return undefined;
    }
};
const delay = (milliseconds) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, milliseconds);
    });
});
// returns an action which waits until the condition thunk returns true,
// rejecting if maxDelay time is exceeded
const delayUntil = (condition, maxDelay, delayStep = 250) => {
    return function () {
        const startTime = (new Date()).getTime();
        const checkForCondition = function () {
            if (condition()) {
                return Promise.resolve();
            }
            if (maxDelay !== null && (new Date()).getTime() - startTime > maxDelay) {
                return Promise.reject(new Error('delayUntil timed out' + condition));
            }
            return delay(delayStep).then(checkForCondition);
        };
        return checkForCondition();
    };
};
const checkSkipSupplemental = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield delayUntil(() => {
            try {
                return getWrapperStateNode().state.activeVideoMetadata._video != undefined;
            }
            catch (e) {
                return false;
            }
        }, 5000)();
        if (getWrapperStateNode().state.activeVideoMetadata._video.type == "supplemental") {
            console.log("SKIPPING SUPPLEMENTAL");
            getWrapperStateNode().handleFinishPrePlay();
            yield delayUntil(() => {
                try {
                    return getWrapperStateNode().state.activeVideoMetadata._video.type != "supplemental";
                }
                catch (e) {
                    return false;
                }
            }, Infinity)();
            console.log("DOne Skip");
        }
    }
    catch (e) {
        console.log(e);
    }
});
const getEpisodeInformation = () => {
    const title = getWrapperStateNode().state.activeVideoMetadata._video.title;
    const episodeNum = getWrapperStateNode().state.activeVideoMetadata._video.seq;
    const seasonNum = getWrapperStateNode().state.activeVideoMetadata._season._season.seq;
    const episodeData = {
        title: title,
        seasonNum: seasonNum,
        episodeNum: episodeNum
    };
    return episodeData;
};
const getWrapperStateNode = () => {
    const watchVideoWrapper = document.querySelector('.watch-video');
    if (watchVideoWrapper) {
        const internals = getReactInternals(watchVideoWrapper);
        if (internals) {
            return internals.return.stateNode;
        }
    }
    return null;
};
const isMovie = () => {
    try {
        const wrapperStateNode = getWrapperStateNode();
        if (wrapperStateNode) {
            return wrapperStateNode.state.playableData.summary.type === "movie";
        }
        else {
            return false;
        }
    }
    catch (error) {
        // Default assume it's an episode?
        return false;
    }
};
const tryDisablePostPlay = () => {
    if (isMovie()) {
        const wrapperStateNode = getWrapperStateNode();
        if (wrapperStateNode) {
            window.oldHasPostPlay = wrapperStateNode.hasPostPlay;
            wrapperStateNode.hasPostPlay = () => { return false; };
            console.log("DISABLED POST PLAY FOR MOVIE");
        }
    }
};
const teardownFixPostPlay = () => {
    const wrapperStateNode = getWrapperStateNode();
    if (wrapperStateNode) {
        if (window.oldHasPostPlay) {
            wrapperStateNode.hasPostPlay = window.oldHasPostPlay;
        }
    }
};
const getPlayerWrapper = () => {
    try {
        const selectorList = [
            document.querySelector('div[data-uia="player"]'),
            document.querySelector('div[data-videoid]'),
            document.querySelector('div .ltr-fntwn3'),
            document.querySelector('.active'),
            document.querySelector('.inactive'),
            document.querySelector('.passive'),
            document.querySelector('.watch-video--player-view').children[0],
        ];
        for (var i = 0; i < selectorList.length; i++) {
            try {
                if (selectorList[i]) {
                    return selectorList[i];
                }
            }
            catch (error) {
                // no-op
            }
        }
        return null;
    }
    catch (error) {
        return null;
    }
};
const getReactInternals = (root) => {
    if (root == null) {
        return null;
    }
    var keys = Object.keys(root);
    var key = null;
    for (var i = 0; i < keys.length; i++) {
        if (keys[i].startsWith('__reactInternalInstance')) {
            key = keys[i];
            break;
        }
    }
    return key ? root[key] : null;
};
const showControlsAsync = () => __awaiter(void 0, void 0, void 0, function* () {
    const wrapper = getPlayerWrapper();
    if (wrapper) {
        const reactInstance = getReactInternals(wrapper);
        if (reactInstance) {
            reactInstance.memoizedProps.onPointerMoveCapture({
                stopPropagation: () => { },
                preventDefault: () => { }
            });
            yield delay(2);
        }
    }
});
const changeEpisodeFallback = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var fakeEvent = {
            stopPropagation: () => { }
        };
        const api = getPlayerApi();
        api.handleSelectorEpisodePlay(fakeEvent, id);
    }
    catch (error) {
        console.log(error);
    }
});
const findProp = (e, prop) => {
    console.log(e);
    if (e == undefined) {
        return undefined;
    }
    const keys = Object.getOwnPropertyNames(e);
    let nest = [];
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        if (key === prop) {
            return e;
        }
        else if (typeof e[key] === 'object') {
            nest.push(e[key]);
        }
    }
    for (let i = 0; i < nest.length; i++) {
        let currentObj = nest[i];
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const res = findProp(currentObj, prop);
        if (res !== undefined) {
            return res;
        }
    }
    return undefined;
};
var seekInteraction = function (e) {
    try {
        if (e.source == window) {
            if (e.data.type && e.data.type === "SEEK") {
                if (e.data.time >= getVideoPlayer().duration) {
                    getVideoPlayer().pause();
                    getVideoPlayer().seek(getVideoPlayer().duration - 100);
                }
                else {
                    getVideoPlayer().seek(e.data.time);
                }
            }
            else if (e.data.type && e.data.type === "PAUSE") {
                getVideoPlayer().pause();
            }
            else if (e.data.type && e.data.type === "FIX_POST_PLAY") {
                tryDisablePostPlay();
            }
            else if (e.data.type && e.data.type === "PLAY") {
                if (isMovie() && "chrome" === "edge" && 0) {}
                getVideoPlayer().play();
            }
            else if (e.data.type && e.data.type === "IsPaused") {
                const paused = getVideoPlayer().isPaused();
                let evt = new CustomEvent('FromNode', { detail: { type: 'IsPaused', paused: paused, updatedAt: Date.now() } });
                window.dispatchEvent(evt);
            }
            else if (e.data.type && e.data.type === "GetCurrentTime") {
                const time = getVideoPlayer().getCurrentTime();
                let evt = new CustomEvent('FromNode', { detail: { type: 'CurrentTime', time, updatedAt: Date.now() } });
                window.dispatchEvent(evt);
            }
            else if (e.data.type && "teardown" == e.data.type) {
                teardownFixPostPlay();
                window.removeEventListener("message", seekInteraction, !1);
                window.injectScriptLoaded = false;
            }
            else if (e.data.type && "NEXT_EPISODE" == e.data.type) {
                try {
                    changeEpisodeFallback(e.data.videoId);
                }
                catch (error) {
                    console.log("Caught Error in React Next Episode " + error);
                }
            }
            else if (e.data.type && "GetState" == e.data.type) {
                const player = getVideoPlayer();
                if (isMovie() && "chrome" === "edge" && 0) {}
                if (player) {
                    const paused = player.isPaused();
                    const time = player.getCurrentTime();
                    const loading = player.getBusy() !== null;
                    let evt = new CustomEvent('FromNode', { detail: { type: 'UpdateState', time, paused, loading, updatedAt: Date.now() } });
                    window.dispatchEvent(evt);
                }
            }
            else if (e.data.type && e.data.type === "ShowControls") {
                showControlsAsync();
            }
            else if (e.data.type && e.data.type === "CheckSkipSupplemental") {
                checkSkipSupplemental().then(() => {
                    var evt = new CustomEvent('FromNode', { detail: { type: 'CheckSkipSupplemental', updatedAt: Date.now() } });
                    window.dispatchEvent(evt);
                });
            }
            else if (e.data.type && e.data.type === "GetPageTitle") {
                try {
                    const pageTitle = getCurrentMetaData().title;
                    let evt = new CustomEvent('FromNode', { detail: { type: 'GetTitle', pageTitle, updatedAt: Date.now() } });
                    window.dispatchEvent(evt);
                }
                catch (e) {
                    //
                }
            }
            else if (e.data.type && e.data.type === "GetVideoType") {
                let VideoType = "Episode";
                if (isMovie()) {
                    VideoType = "Movie";
                }
                let evt = new CustomEvent('FromNode', { detail: { type: 'GetType', VideoType, updatedAt: Date.now() } });
                window.dispatchEvent(evt);
            }
            else if (e.data.type && e.data.type === "GetEpisodeData") {
                let episodeData = undefined;
                try {
                    episodeData = getEpisodeInformation();
                    let evt = new CustomEvent('FromNode', { detail: { type: 'GetEpData', episodeData, updatedAt: Date.now() } });
                    window.dispatchEvent(evt);
                }
                catch (error) {
                    //
                }
            }
        }
    }
    catch (error) {
        console.log(error);
    }
};
if (!window.injectScriptLoaded) {
    window.injectScriptLoaded = true;
    console.log("Loaded TP Netflix Injected");
    checkSkipSupplemental();
    window.addEventListener("message", seekInteraction, !1);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__[478]();
/******/ 	
/******/ })()
;