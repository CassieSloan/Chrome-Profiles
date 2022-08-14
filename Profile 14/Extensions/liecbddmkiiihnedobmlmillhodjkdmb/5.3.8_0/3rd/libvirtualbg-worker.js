var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __reExport = (target, module, desc) => {
  if (module && typeof module === "object" || typeof module === "function") {
    for (let key of __getOwnPropNames(module))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module) => {
  return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
};

// src/tflite/tflite.js
var require_tflite = __commonJS({
  "src/tflite/tflite.js"(exports, module) {
    var createTFLiteModule2 = function() {
      var _scriptDir = typeof document !== "undefined" && document.currentScript ? document.currentScript.src : void 0;
      return function(createTFLiteModule3) {
        createTFLiteModule3 = createTFLiteModule3 || {};
        var Module = typeof createTFLiteModule3 !== "undefined" ? createTFLiteModule3 : {};
        var readyPromiseResolve, readyPromiseReject;
        Module["ready"] = new Promise(function(resolve, reject) {
          readyPromiseResolve = resolve;
          readyPromiseReject = reject;
        });
        var moduleOverrides = {};
        var key;
        for (key in Module) {
          if (Module.hasOwnProperty(key)) {
            moduleOverrides[key] = Module[key];
          }
        }
        var arguments_ = [];
        var thisProgram = "./this.program";
        var quit_ = function(status, toThrow) {
          throw toThrow;
        };
        var ENVIRONMENT_IS_WEB = true;
        var ENVIRONMENT_IS_WORKER = false;
        var scriptDirectory = "";
        function locateFile(path) {
          if (Module["locateFile"]) {
            return Module["locateFile"](path, scriptDirectory);
          }
          return scriptDirectory + path;
        }
        var read_, readAsync, readBinary, setWindowTitle;
        if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
          if (ENVIRONMENT_IS_WORKER) {
            scriptDirectory = self.location.href;
          } else if (typeof document !== "undefined" && document.currentScript) {
            scriptDirectory = document.currentScript.src;
          }
          if (_scriptDir) {
            scriptDirectory = _scriptDir;
          }
          if (scriptDirectory.indexOf("blob:") !== 0) {
            scriptDirectory = scriptDirectory.substr(0, scriptDirectory.lastIndexOf("/") + 1);
          } else {
            scriptDirectory = "";
          }
          {
            read_ = function(url) {
              var xhr = new XMLHttpRequest();
              xhr.open("GET", url, false);
              xhr.send(null);
              return xhr.responseText;
            };
            if (ENVIRONMENT_IS_WORKER) {
              readBinary = function(url) {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", url, false);
                xhr.responseType = "arraybuffer";
                xhr.send(null);
                return new Uint8Array(xhr.response);
              };
            }
            readAsync = function(url, onload, onerror) {
              var xhr = new XMLHttpRequest();
              xhr.open("GET", url, true);
              xhr.responseType = "arraybuffer";
              xhr.onload = function() {
                if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
                  onload(xhr.response);
                  return;
                }
                onerror();
              };
              xhr.onerror = onerror;
              xhr.send(null);
            };
          }
          setWindowTitle = function(title) {
            document.title = title;
          };
        } else {
        }
        var out = Module["print"] || console.log.bind(console);
        var err = Module["printErr"] || console.warn.bind(console);
        for (key in moduleOverrides) {
          if (moduleOverrides.hasOwnProperty(key)) {
            Module[key] = moduleOverrides[key];
          }
        }
        moduleOverrides = null;
        if (Module["arguments"])
          arguments_ = Module["arguments"];
        if (Module["thisProgram"])
          thisProgram = Module["thisProgram"];
        if (Module["quit"])
          quit_ = Module["quit"];
        var wasmBinary;
        if (Module["wasmBinary"])
          wasmBinary = Module["wasmBinary"];
        var noExitRuntime = Module["noExitRuntime"] || true;
        if (typeof WebAssembly !== "object") {
          abort("no native wasm support detected");
        }
        var wasmMemory;
        var ABORT = false;
        var EXITSTATUS;
        var UTF8Decoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf8") : void 0;
        function UTF8ArrayToString(heap, idx, maxBytesToRead) {
          var endIdx = idx + maxBytesToRead;
          var endPtr = idx;
          while (heap[endPtr] && !(endPtr >= endIdx))
            ++endPtr;
          if (endPtr - idx > 16 && heap.subarray && UTF8Decoder) {
            return UTF8Decoder.decode(heap.subarray(idx, endPtr));
          } else {
            var str = "";
            while (idx < endPtr) {
              var u0 = heap[idx++];
              if (!(u0 & 128)) {
                str += String.fromCharCode(u0);
                continue;
              }
              var u1 = heap[idx++] & 63;
              if ((u0 & 224) == 192) {
                str += String.fromCharCode((u0 & 31) << 6 | u1);
                continue;
              }
              var u2 = heap[idx++] & 63;
              if ((u0 & 240) == 224) {
                u0 = (u0 & 15) << 12 | u1 << 6 | u2;
              } else {
                u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | heap[idx++] & 63;
              }
              if (u0 < 65536) {
                str += String.fromCharCode(u0);
              } else {
                var ch = u0 - 65536;
                str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
              }
            }
          }
          return str;
        }
        function UTF8ToString(ptr, maxBytesToRead) {
          return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : "";
        }
        function writeAsciiToMemory(str, buffer2, dontAddNull) {
          for (var i = 0; i < str.length; ++i) {
            HEAP8[buffer2++ >> 0] = str.charCodeAt(i);
          }
          if (!dontAddNull)
            HEAP8[buffer2 >> 0] = 0;
        }
        function alignUp(x, multiple) {
          if (x % multiple > 0) {
            x += multiple - x % multiple;
          }
          return x;
        }
        var buffer, HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;
        function updateGlobalBufferAndViews(buf) {
          buffer = buf;
          Module["HEAP8"] = HEAP8 = new Int8Array(buf);
          Module["HEAP16"] = HEAP16 = new Int16Array(buf);
          Module["HEAP32"] = HEAP32 = new Int32Array(buf);
          Module["HEAPU8"] = HEAPU8 = new Uint8Array(buf);
          Module["HEAPU16"] = HEAPU16 = new Uint16Array(buf);
          Module["HEAPU32"] = HEAPU32 = new Uint32Array(buf);
          Module["HEAPF32"] = HEAPF32 = new Float32Array(buf);
          Module["HEAPF64"] = HEAPF64 = new Float64Array(buf);
        }
        var INITIAL_MEMORY = Module["INITIAL_MEMORY"] || 16777216;
        var wasmTable;
        var __ATPRERUN__ = [];
        var __ATINIT__ = [];
        var __ATMAIN__ = [];
        var __ATPOSTRUN__ = [];
        var runtimeInitialized = false;
        var runtimeExited = false;
        __ATINIT__.push({ func: function() {
          ___wasm_call_ctors();
        } });
        function preRun() {
          if (Module["preRun"]) {
            if (typeof Module["preRun"] == "function")
              Module["preRun"] = [Module["preRun"]];
            while (Module["preRun"].length) {
              addOnPreRun(Module["preRun"].shift());
            }
          }
          callRuntimeCallbacks(__ATPRERUN__);
        }
        function initRuntime() {
          runtimeInitialized = true;
          callRuntimeCallbacks(__ATINIT__);
        }
        function preMain() {
          callRuntimeCallbacks(__ATMAIN__);
        }
        function exitRuntime() {
          runtimeExited = true;
        }
        function postRun() {
          if (Module["postRun"]) {
            if (typeof Module["postRun"] == "function")
              Module["postRun"] = [Module["postRun"]];
            while (Module["postRun"].length) {
              addOnPostRun(Module["postRun"].shift());
            }
          }
          callRuntimeCallbacks(__ATPOSTRUN__);
        }
        function addOnPreRun(cb) {
          __ATPRERUN__.unshift(cb);
        }
        function addOnPostRun(cb) {
          __ATPOSTRUN__.unshift(cb);
        }
        var runDependencies = 0;
        var runDependencyWatcher = null;
        var dependenciesFulfilled = null;
        function addRunDependency(id) {
          runDependencies++;
          if (Module["monitorRunDependencies"]) {
            Module["monitorRunDependencies"](runDependencies);
          }
        }
        function removeRunDependency(id) {
          runDependencies--;
          if (Module["monitorRunDependencies"]) {
            Module["monitorRunDependencies"](runDependencies);
          }
          if (runDependencies == 0) {
            if (runDependencyWatcher !== null) {
              clearInterval(runDependencyWatcher);
              runDependencyWatcher = null;
            }
            if (dependenciesFulfilled) {
              var callback = dependenciesFulfilled;
              dependenciesFulfilled = null;
              callback();
            }
          }
        }
        Module["preloadedImages"] = {};
        Module["preloadedAudios"] = {};
        function abort(what) {
          if (Module["onAbort"]) {
            Module["onAbort"](what);
          }
          what += "";
          err(what);
          ABORT = true;
          EXITSTATUS = 1;
          what = "abort(" + what + "). Build with -s ASSERTIONS=1 for more info.";
          var e = new WebAssembly.RuntimeError(what);
          readyPromiseReject(e);
          throw e;
        }
        function hasPrefix(str, prefix) {
          return String.prototype.startsWith ? str.startsWith(prefix) : str.indexOf(prefix) === 0;
        }
        var dataURIPrefix = "data:application/octet-stream;base64,";
        function isDataURI(filename) {
          return hasPrefix(filename, dataURIPrefix);
        }
        var wasmBinaryFile = "tflite.wasm";
        if (!isDataURI(wasmBinaryFile)) {
          wasmBinaryFile = locateFile(wasmBinaryFile);
        }
        function getBinary(file) {
          try {
            if (file == wasmBinaryFile && wasmBinary) {
              return new Uint8Array(wasmBinary);
            }
            if (readBinary) {
              return readBinary(file);
            } else {
              throw "both async and sync fetching of the wasm failed";
            }
          } catch (err2) {
            abort(err2);
          }
        }
        function getBinaryPromise() {
          if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER)) {
            if (typeof fetch === "function") {
              return fetch(wasmBinaryFile, { credentials: "same-origin" }).then(function(response) {
                if (!response["ok"]) {
                  throw "failed to load wasm binary file at '" + wasmBinaryFile + "'";
                }
                return response["arrayBuffer"]();
              }).catch(function() {
                return getBinary(wasmBinaryFile);
              });
            }
          }
          return Promise.resolve().then(function() {
            return getBinary(wasmBinaryFile);
          });
        }
        function createWasm() {
          var info = { "a": asmLibraryArg };
          function receiveInstance(instance, module2) {
            var exports3 = instance.exports;
            Module["asm"] = exports3;
            wasmMemory = Module["asm"]["q"];
            updateGlobalBufferAndViews(wasmMemory.buffer);
            wasmTable = Module["asm"]["D"];
            removeRunDependency("wasm-instantiate");
          }
          addRunDependency("wasm-instantiate");
          function receiveInstantiatedSource(output) {
            receiveInstance(output["instance"]);
          }
          function instantiateArrayBuffer(receiver) {
            return getBinaryPromise().then(function(binary) {
              return WebAssembly.instantiate(binary, info);
            }).then(receiver, function(reason) {
              err("failed to asynchronously prepare wasm: " + reason);
              abort(reason);
            });
          }
          function instantiateAsync() {
            if (!wasmBinary && typeof WebAssembly.instantiateStreaming === "function" && !isDataURI(wasmBinaryFile) && typeof fetch === "function") {
              return fetch(wasmBinaryFile, { credentials: "same-origin" }).then(function(response) {
                var result = WebAssembly.instantiateStreaming(response, info);
                return result.then(receiveInstantiatedSource, function(reason) {
                  err("wasm streaming compile failed: " + reason);
                  err("falling back to ArrayBuffer instantiation");
                  return instantiateArrayBuffer(receiveInstantiatedSource);
                });
              });
            } else {
              return instantiateArrayBuffer(receiveInstantiatedSource);
            }
          }
          if (Module["instantiateWasm"]) {
            try {
              var exports2 = Module["instantiateWasm"](info, receiveInstance);
              return exports2;
            } catch (e) {
              err("Module.instantiateWasm callback failed with error: " + e);
              return false;
            }
          }
          instantiateAsync().catch(readyPromiseReject);
          return {};
        }
        function callRuntimeCallbacks(callbacks) {
          while (callbacks.length > 0) {
            var callback = callbacks.shift();
            if (typeof callback == "function") {
              callback(Module);
              continue;
            }
            var func = callback.func;
            if (typeof func === "number") {
              if (callback.arg === void 0) {
                wasmTable.get(func)();
              } else {
                wasmTable.get(func)(callback.arg);
              }
            } else {
              func(callback.arg === void 0 ? null : callback.arg);
            }
          }
        }
        function _abort() {
          abort();
        }
        var _emscripten_get_now;
        _emscripten_get_now = function() {
          return performance.now();
        };
        var _emscripten_get_now_is_monotonic = true;
        function setErrNo(value) {
          HEAP32[___errno_location() >> 2] = value;
          return value;
        }
        function _clock_gettime(clk_id, tp) {
          var now;
          if (clk_id === 0) {
            now = Date.now();
          } else if ((clk_id === 1 || clk_id === 4) && _emscripten_get_now_is_monotonic) {
            now = _emscripten_get_now();
          } else {
            setErrNo(28);
            return -1;
          }
          HEAP32[tp >> 2] = now / 1e3 | 0;
          HEAP32[tp + 4 >> 2] = now % 1e3 * 1e3 * 1e3 | 0;
          return 0;
        }
        function _dlopen(filename, flag) {
          abort("To use dlopen, you need to use Emscripten's linking support, see https://github.com/emscripten-core/emscripten/wiki/Linking");
        }
        function _dlsym(handle, symbol) {
          abort("To use dlopen, you need to use Emscripten's linking support, see https://github.com/emscripten-core/emscripten/wiki/Linking");
        }
        function _emscripten_memcpy_big(dest, src, num) {
          HEAPU8.copyWithin(dest, src, src + num);
        }
        function _emscripten_get_heap_size() {
          return HEAPU8.length;
        }
        function emscripten_realloc_buffer(size) {
          try {
            wasmMemory.grow(size - buffer.byteLength + 65535 >>> 16);
            updateGlobalBufferAndViews(wasmMemory.buffer);
            return 1;
          } catch (e) {
          }
        }
        function _emscripten_resize_heap(requestedSize) {
          var oldSize = _emscripten_get_heap_size();
          var maxHeapSize = 2147483648;
          if (requestedSize > maxHeapSize) {
            return false;
          }
          for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
            var overGrownHeapSize = oldSize * (1 + 0.2 / cutDown);
            overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
            var newSize = Math.min(maxHeapSize, alignUp(Math.max(requestedSize, overGrownHeapSize), 65536));
            var replacement = emscripten_realloc_buffer(newSize);
            if (replacement) {
              return true;
            }
          }
          return false;
        }
        function _emscripten_thread_sleep(msecs) {
          var start = _emscripten_get_now();
          while (_emscripten_get_now() - start < msecs) {
          }
        }
        var ENV = {};
        function getExecutableName() {
          return thisProgram || "./this.program";
        }
        function getEnvStrings() {
          if (!getEnvStrings.strings) {
            var lang = (typeof navigator === "object" && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8";
            var env = { "USER": "web_user", "LOGNAME": "web_user", "PATH": "/", "PWD": "/", "HOME": "/home/web_user", "LANG": lang, "_": getExecutableName() };
            for (var x in ENV) {
              env[x] = ENV[x];
            }
            var strings = [];
            for (var x in env) {
              strings.push(x + "=" + env[x]);
            }
            getEnvStrings.strings = strings;
          }
          return getEnvStrings.strings;
        }
        var SYSCALLS = { mappings: {}, buffers: [null, [], []], printChar: function(stream, curr) {
          var buffer2 = SYSCALLS.buffers[stream];
          if (curr === 0 || curr === 10) {
            (stream === 1 ? out : err)(UTF8ArrayToString(buffer2, 0));
            buffer2.length = 0;
          } else {
            buffer2.push(curr);
          }
        }, varargs: void 0, get: function() {
          SYSCALLS.varargs += 4;
          var ret = HEAP32[SYSCALLS.varargs - 4 >> 2];
          return ret;
        }, getStr: function(ptr) {
          var ret = UTF8ToString(ptr);
          return ret;
        }, get64: function(low, high) {
          return low;
        } };
        function _environ_get(__environ, environ_buf) {
          var bufSize = 0;
          getEnvStrings().forEach(function(string, i) {
            var ptr = environ_buf + bufSize;
            HEAP32[__environ + i * 4 >> 2] = ptr;
            writeAsciiToMemory(string, ptr);
            bufSize += string.length + 1;
          });
          return 0;
        }
        function _environ_sizes_get(penviron_count, penviron_buf_size) {
          var strings = getEnvStrings();
          HEAP32[penviron_count >> 2] = strings.length;
          var bufSize = 0;
          strings.forEach(function(string) {
            bufSize += string.length + 1;
          });
          HEAP32[penviron_buf_size >> 2] = bufSize;
          return 0;
        }
        function _exit(status) {
          exit(status);
        }
        function _fd_close(fd) {
          return 0;
        }
        function _fd_seek(fd, offset_low, offset_high, whence, newOffset) {
        }
        function _fd_write(fd, iov, iovcnt, pnum) {
          var num = 0;
          for (var i = 0; i < iovcnt; i++) {
            var ptr = HEAP32[iov + i * 8 >> 2];
            var len = HEAP32[iov + (i * 8 + 4) >> 2];
            for (var j = 0; j < len; j++) {
              SYSCALLS.printChar(fd, HEAPU8[ptr + j]);
            }
            num += len;
          }
          HEAP32[pnum >> 2] = num;
          return 0;
        }
        function _pthread_create() {
          return 6;
        }
        function _pthread_join() {
          return 28;
        }
        function _sysconf(name) {
          switch (name) {
            case 30:
              return 16384;
            case 85:
              var maxHeapSize = 2147483648;
              return maxHeapSize / 16384;
            case 132:
            case 133:
            case 12:
            case 137:
            case 138:
            case 15:
            case 235:
            case 16:
            case 17:
            case 18:
            case 19:
            case 20:
            case 149:
            case 13:
            case 10:
            case 236:
            case 153:
            case 9:
            case 21:
            case 22:
            case 159:
            case 154:
            case 14:
            case 77:
            case 78:
            case 139:
            case 82:
            case 68:
            case 67:
            case 164:
            case 11:
            case 29:
            case 47:
            case 48:
            case 95:
            case 52:
            case 51:
            case 46:
              return 200809;
            case 27:
            case 246:
            case 127:
            case 128:
            case 23:
            case 24:
            case 160:
            case 161:
            case 181:
            case 182:
            case 242:
            case 183:
            case 184:
            case 243:
            case 244:
            case 245:
            case 165:
            case 178:
            case 179:
            case 49:
            case 50:
            case 168:
            case 169:
            case 175:
            case 170:
            case 171:
            case 172:
            case 97:
            case 76:
            case 32:
            case 173:
            case 35:
            case 80:
            case 81:
            case 79:
              return -1;
            case 176:
            case 177:
            case 7:
            case 155:
            case 8:
            case 157:
            case 125:
            case 126:
            case 92:
            case 93:
            case 129:
            case 130:
            case 131:
            case 94:
            case 91:
              return 1;
            case 74:
            case 60:
            case 69:
            case 70:
            case 4:
              return 1024;
            case 31:
            case 42:
            case 72:
              return 32;
            case 87:
            case 26:
            case 33:
              return 2147483647;
            case 34:
            case 1:
              return 47839;
            case 38:
            case 36:
              return 99;
            case 43:
            case 37:
              return 2048;
            case 0:
              return 2097152;
            case 3:
              return 65536;
            case 28:
              return 32768;
            case 44:
              return 32767;
            case 75:
              return 16384;
            case 39:
              return 1e3;
            case 89:
              return 700;
            case 71:
              return 256;
            case 40:
              return 255;
            case 2:
              return 100;
            case 180:
              return 64;
            case 25:
              return 20;
            case 5:
              return 16;
            case 6:
              return 6;
            case 73:
              return 4;
            case 84: {
              if (typeof navigator === "object")
                return navigator["hardwareConcurrency"] || 1;
              return 1;
            }
          }
          setErrNo(28);
          return -1;
        }
        var asmLibraryArg = { "a": _abort, "n": _clock_gettime, "i": _dlopen, "e": _dlsym, "l": _emscripten_memcpy_big, "m": _emscripten_resize_heap, "o": _emscripten_thread_sleep, "p": _environ_get, "g": _environ_sizes_get, "j": _exit, "h": _fd_close, "k": _fd_seek, "c": _fd_write, "d": _pthread_create, "f": _pthread_join, "b": _sysconf };
        var asm = createWasm();
        var ___wasm_call_ctors = Module["___wasm_call_ctors"] = function() {
          return (___wasm_call_ctors = Module["___wasm_call_ctors"] = Module["asm"]["r"]).apply(null, arguments);
        };
        var _getModelBufferMemoryOffset = Module["_getModelBufferMemoryOffset"] = function() {
          return (_getModelBufferMemoryOffset = Module["_getModelBufferMemoryOffset"] = Module["asm"]["s"]).apply(null, arguments);
        };
        var _getInputMemoryOffset = Module["_getInputMemoryOffset"] = function() {
          return (_getInputMemoryOffset = Module["_getInputMemoryOffset"] = Module["asm"]["t"]).apply(null, arguments);
        };
        var _getInputHeight = Module["_getInputHeight"] = function() {
          return (_getInputHeight = Module["_getInputHeight"] = Module["asm"]["u"]).apply(null, arguments);
        };
        var _getInputWidth = Module["_getInputWidth"] = function() {
          return (_getInputWidth = Module["_getInputWidth"] = Module["asm"]["v"]).apply(null, arguments);
        };
        var _getInputChannelCount = Module["_getInputChannelCount"] = function() {
          return (_getInputChannelCount = Module["_getInputChannelCount"] = Module["asm"]["w"]).apply(null, arguments);
        };
        var _getOutputMemoryOffset = Module["_getOutputMemoryOffset"] = function() {
          return (_getOutputMemoryOffset = Module["_getOutputMemoryOffset"] = Module["asm"]["x"]).apply(null, arguments);
        };
        var _getOutputHeight = Module["_getOutputHeight"] = function() {
          return (_getOutputHeight = Module["_getOutputHeight"] = Module["asm"]["y"]).apply(null, arguments);
        };
        var _getOutputWidth = Module["_getOutputWidth"] = function() {
          return (_getOutputWidth = Module["_getOutputWidth"] = Module["asm"]["z"]).apply(null, arguments);
        };
        var _getOutputChannelCount = Module["_getOutputChannelCount"] = function() {
          return (_getOutputChannelCount = Module["_getOutputChannelCount"] = Module["asm"]["A"]).apply(null, arguments);
        };
        var _loadModel = Module["_loadModel"] = function() {
          return (_loadModel = Module["_loadModel"] = Module["asm"]["B"]).apply(null, arguments);
        };
        var _runInference = Module["_runInference"] = function() {
          return (_runInference = Module["_runInference"] = Module["asm"]["C"]).apply(null, arguments);
        };
        var ___errno_location = Module["___errno_location"] = function() {
          return (___errno_location = Module["___errno_location"] = Module["asm"]["E"]).apply(null, arguments);
        };
        var calledRun;
        function ExitStatus(status) {
          this.name = "ExitStatus";
          this.message = "Program terminated with exit(" + status + ")";
          this.status = status;
        }
        dependenciesFulfilled = function runCaller() {
          if (!calledRun)
            run();
          if (!calledRun)
            dependenciesFulfilled = runCaller;
        };
        function run(args) {
          args = args || arguments_;
          if (runDependencies > 0) {
            return;
          }
          preRun();
          if (runDependencies > 0) {
            return;
          }
          function doRun() {
            if (calledRun)
              return;
            calledRun = true;
            Module["calledRun"] = true;
            if (ABORT)
              return;
            initRuntime();
            preMain();
            readyPromiseResolve(Module);
            if (Module["onRuntimeInitialized"])
              Module["onRuntimeInitialized"]();
            postRun();
          }
          if (Module["setStatus"]) {
            Module["setStatus"]("Running...");
            setTimeout(function() {
              setTimeout(function() {
                Module["setStatus"]("");
              }, 1);
              doRun();
            }, 1);
          } else {
            doRun();
          }
        }
        Module["run"] = run;
        function exit(status, implicit) {
          if (implicit && noExitRuntime && status === 0) {
            return;
          }
          if (noExitRuntime) {
          } else {
            EXITSTATUS = status;
            exitRuntime();
            if (Module["onExit"])
              Module["onExit"](status);
            ABORT = true;
          }
          quit_(status, new ExitStatus(status));
        }
        if (Module["preInit"]) {
          if (typeof Module["preInit"] == "function")
            Module["preInit"] = [Module["preInit"]];
          while (Module["preInit"].length > 0) {
            Module["preInit"].pop()();
          }
        }
        run();
        return createTFLiteModule3.ready;
      };
    }();
    if (typeof exports === "object" && typeof module === "object")
      module.exports = createTFLiteModule2;
    else if (typeof define === "function" && define["amd"])
      define([], function() {
        return createTFLiteModule2;
      });
    else if (typeof exports === "object")
      exports["createTFLiteModule"] = createTFLiteModule2;
  }
});

// src/tflite/tflite-simd.js
var require_tflite_simd = __commonJS({
  "src/tflite/tflite-simd.js"(exports, module) {
    var createTFLiteSIMDModule2 = function() {
      var _scriptDir = typeof document !== "undefined" && document.currentScript ? document.currentScript.src : void 0;
      return function(createTFLiteSIMDModule3) {
        createTFLiteSIMDModule3 = createTFLiteSIMDModule3 || {};
        var Module = typeof createTFLiteSIMDModule3 !== "undefined" ? createTFLiteSIMDModule3 : {};
        var readyPromiseResolve, readyPromiseReject;
        Module["ready"] = new Promise(function(resolve, reject) {
          readyPromiseResolve = resolve;
          readyPromiseReject = reject;
        });
        var moduleOverrides = {};
        var key;
        for (key in Module) {
          if (Module.hasOwnProperty(key)) {
            moduleOverrides[key] = Module[key];
          }
        }
        var arguments_ = [];
        var thisProgram = "./this.program";
        var quit_ = function(status, toThrow) {
          throw toThrow;
        };
        var ENVIRONMENT_IS_WEB = true;
        var ENVIRONMENT_IS_WORKER = false;
        var scriptDirectory = "";
        function locateFile(path) {
          if (Module["locateFile"]) {
            return Module["locateFile"](path, scriptDirectory);
          }
          return scriptDirectory + path;
        }
        var read_, readAsync, readBinary, setWindowTitle;
        if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
          if (ENVIRONMENT_IS_WORKER) {
            scriptDirectory = self.location.href;
          } else if (typeof document !== "undefined" && document.currentScript) {
            scriptDirectory = document.currentScript.src;
          }
          if (_scriptDir) {
            scriptDirectory = _scriptDir;
          }
          if (scriptDirectory.indexOf("blob:") !== 0) {
            scriptDirectory = scriptDirectory.substr(0, scriptDirectory.lastIndexOf("/") + 1);
          } else {
            scriptDirectory = "";
          }
          {
            read_ = function(url) {
              var xhr = new XMLHttpRequest();
              xhr.open("GET", url, false);
              xhr.send(null);
              return xhr.responseText;
            };
            if (ENVIRONMENT_IS_WORKER) {
              readBinary = function(url) {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", url, false);
                xhr.responseType = "arraybuffer";
                xhr.send(null);
                return new Uint8Array(xhr.response);
              };
            }
            readAsync = function(url, onload, onerror) {
              var xhr = new XMLHttpRequest();
              xhr.open("GET", url, true);
              xhr.responseType = "arraybuffer";
              xhr.onload = function() {
                if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
                  onload(xhr.response);
                  return;
                }
                onerror();
              };
              xhr.onerror = onerror;
              xhr.send(null);
            };
          }
          setWindowTitle = function(title) {
            document.title = title;
          };
        } else {
        }
        var out = Module["print"] || console.log.bind(console);
        var err = Module["printErr"] || console.warn.bind(console);
        for (key in moduleOverrides) {
          if (moduleOverrides.hasOwnProperty(key)) {
            Module[key] = moduleOverrides[key];
          }
        }
        moduleOverrides = null;
        if (Module["arguments"])
          arguments_ = Module["arguments"];
        if (Module["thisProgram"])
          thisProgram = Module["thisProgram"];
        if (Module["quit"])
          quit_ = Module["quit"];
        var wasmBinary;
        if (Module["wasmBinary"])
          wasmBinary = Module["wasmBinary"];
        var noExitRuntime = Module["noExitRuntime"] || true;
        if (typeof WebAssembly !== "object") {
          abort("no native wasm support detected");
        }
        var wasmMemory;
        var ABORT = false;
        var EXITSTATUS;
        var UTF8Decoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf8") : void 0;
        function UTF8ArrayToString(heap, idx, maxBytesToRead) {
          var endIdx = idx + maxBytesToRead;
          var endPtr = idx;
          while (heap[endPtr] && !(endPtr >= endIdx))
            ++endPtr;
          if (endPtr - idx > 16 && heap.subarray && UTF8Decoder) {
            return UTF8Decoder.decode(heap.subarray(idx, endPtr));
          } else {
            var str = "";
            while (idx < endPtr) {
              var u0 = heap[idx++];
              if (!(u0 & 128)) {
                str += String.fromCharCode(u0);
                continue;
              }
              var u1 = heap[idx++] & 63;
              if ((u0 & 224) == 192) {
                str += String.fromCharCode((u0 & 31) << 6 | u1);
                continue;
              }
              var u2 = heap[idx++] & 63;
              if ((u0 & 240) == 224) {
                u0 = (u0 & 15) << 12 | u1 << 6 | u2;
              } else {
                u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | heap[idx++] & 63;
              }
              if (u0 < 65536) {
                str += String.fromCharCode(u0);
              } else {
                var ch = u0 - 65536;
                str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
              }
            }
          }
          return str;
        }
        function UTF8ToString(ptr, maxBytesToRead) {
          return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : "";
        }
        function writeAsciiToMemory(str, buffer2, dontAddNull) {
          for (var i = 0; i < str.length; ++i) {
            HEAP8[buffer2++ >> 0] = str.charCodeAt(i);
          }
          if (!dontAddNull)
            HEAP8[buffer2 >> 0] = 0;
        }
        function alignUp(x, multiple) {
          if (x % multiple > 0) {
            x += multiple - x % multiple;
          }
          return x;
        }
        var buffer, HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;
        function updateGlobalBufferAndViews(buf) {
          buffer = buf;
          Module["HEAP8"] = HEAP8 = new Int8Array(buf);
          Module["HEAP16"] = HEAP16 = new Int16Array(buf);
          Module["HEAP32"] = HEAP32 = new Int32Array(buf);
          Module["HEAPU8"] = HEAPU8 = new Uint8Array(buf);
          Module["HEAPU16"] = HEAPU16 = new Uint16Array(buf);
          Module["HEAPU32"] = HEAPU32 = new Uint32Array(buf);
          Module["HEAPF32"] = HEAPF32 = new Float32Array(buf);
          Module["HEAPF64"] = HEAPF64 = new Float64Array(buf);
        }
        var INITIAL_MEMORY = Module["INITIAL_MEMORY"] || 16777216;
        var wasmTable;
        var __ATPRERUN__ = [];
        var __ATINIT__ = [];
        var __ATMAIN__ = [];
        var __ATPOSTRUN__ = [];
        var runtimeInitialized = false;
        var runtimeExited = false;
        __ATINIT__.push({ func: function() {
          ___wasm_call_ctors();
        } });
        function preRun() {
          if (Module["preRun"]) {
            if (typeof Module["preRun"] == "function")
              Module["preRun"] = [Module["preRun"]];
            while (Module["preRun"].length) {
              addOnPreRun(Module["preRun"].shift());
            }
          }
          callRuntimeCallbacks(__ATPRERUN__);
        }
        function initRuntime() {
          runtimeInitialized = true;
          callRuntimeCallbacks(__ATINIT__);
        }
        function preMain() {
          callRuntimeCallbacks(__ATMAIN__);
        }
        function exitRuntime() {
          runtimeExited = true;
        }
        function postRun() {
          if (Module["postRun"]) {
            if (typeof Module["postRun"] == "function")
              Module["postRun"] = [Module["postRun"]];
            while (Module["postRun"].length) {
              addOnPostRun(Module["postRun"].shift());
            }
          }
          callRuntimeCallbacks(__ATPOSTRUN__);
        }
        function addOnPreRun(cb) {
          __ATPRERUN__.unshift(cb);
        }
        function addOnPostRun(cb) {
          __ATPOSTRUN__.unshift(cb);
        }
        var runDependencies = 0;
        var runDependencyWatcher = null;
        var dependenciesFulfilled = null;
        function addRunDependency(id) {
          runDependencies++;
          if (Module["monitorRunDependencies"]) {
            Module["monitorRunDependencies"](runDependencies);
          }
        }
        function removeRunDependency(id) {
          runDependencies--;
          if (Module["monitorRunDependencies"]) {
            Module["monitorRunDependencies"](runDependencies);
          }
          if (runDependencies == 0) {
            if (runDependencyWatcher !== null) {
              clearInterval(runDependencyWatcher);
              runDependencyWatcher = null;
            }
            if (dependenciesFulfilled) {
              var callback = dependenciesFulfilled;
              dependenciesFulfilled = null;
              callback();
            }
          }
        }
        Module["preloadedImages"] = {};
        Module["preloadedAudios"] = {};
        function abort(what) {
          if (Module["onAbort"]) {
            Module["onAbort"](what);
          }
          what += "";
          err(what);
          ABORT = true;
          EXITSTATUS = 1;
          what = "abort(" + what + "). Build with -s ASSERTIONS=1 for more info.";
          var e = new WebAssembly.RuntimeError(what);
          readyPromiseReject(e);
          throw e;
        }
        function hasPrefix(str, prefix) {
          return String.prototype.startsWith ? str.startsWith(prefix) : str.indexOf(prefix) === 0;
        }
        var dataURIPrefix = "data:application/octet-stream;base64,";
        function isDataURI(filename) {
          return hasPrefix(filename, dataURIPrefix);
        }
        var wasmBinaryFile = "tflite-simd.wasm";
        if (!isDataURI(wasmBinaryFile)) {
          wasmBinaryFile = locateFile(wasmBinaryFile);
        }
        function getBinary(file) {
          try {
            if (file == wasmBinaryFile && wasmBinary) {
              return new Uint8Array(wasmBinary);
            }
            if (readBinary) {
              return readBinary(file);
            } else {
              throw "both async and sync fetching of the wasm failed";
            }
          } catch (err2) {
            abort(err2);
          }
        }
        function getBinaryPromise() {
          if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER)) {
            if (typeof fetch === "function") {
              return fetch(wasmBinaryFile, { credentials: "same-origin" }).then(function(response) {
                if (!response["ok"]) {
                  throw "failed to load wasm binary file at '" + wasmBinaryFile + "'";
                }
                return response["arrayBuffer"]();
              }).catch(function() {
                return getBinary(wasmBinaryFile);
              });
            }
          }
          return Promise.resolve().then(function() {
            return getBinary(wasmBinaryFile);
          });
        }
        function createWasm() {
          var info = { "a": asmLibraryArg };
          function receiveInstance(instance, module2) {
            var exports3 = instance.exports;
            Module["asm"] = exports3;
            wasmMemory = Module["asm"]["q"];
            updateGlobalBufferAndViews(wasmMemory.buffer);
            wasmTable = Module["asm"]["D"];
            removeRunDependency("wasm-instantiate");
          }
          addRunDependency("wasm-instantiate");
          function receiveInstantiatedSource(output) {
            receiveInstance(output["instance"]);
          }
          function instantiateArrayBuffer(receiver) {
            return getBinaryPromise().then(function(binary) {
              return WebAssembly.instantiate(binary, info);
            }).then(receiver, function(reason) {
              err("failed to asynchronously prepare wasm: " + reason);
              abort(reason);
            });
          }
          function instantiateAsync() {
            if (!wasmBinary && typeof WebAssembly.instantiateStreaming === "function" && !isDataURI(wasmBinaryFile) && typeof fetch === "function") {
              return fetch(wasmBinaryFile, { credentials: "same-origin" }).then(function(response) {
                var result = WebAssembly.instantiateStreaming(response, info);
                return result.then(receiveInstantiatedSource, function(reason) {
                  err("wasm streaming compile failed: " + reason);
                  err("falling back to ArrayBuffer instantiation");
                  return instantiateArrayBuffer(receiveInstantiatedSource);
                });
              });
            } else {
              return instantiateArrayBuffer(receiveInstantiatedSource);
            }
          }
          if (Module["instantiateWasm"]) {
            try {
              var exports2 = Module["instantiateWasm"](info, receiveInstance);
              return exports2;
            } catch (e) {
              err("Module.instantiateWasm callback failed with error: " + e);
              return false;
            }
          }
          instantiateAsync().catch(readyPromiseReject);
          return {};
        }
        function callRuntimeCallbacks(callbacks) {
          while (callbacks.length > 0) {
            var callback = callbacks.shift();
            if (typeof callback == "function") {
              callback(Module);
              continue;
            }
            var func = callback.func;
            if (typeof func === "number") {
              if (callback.arg === void 0) {
                wasmTable.get(func)();
              } else {
                wasmTable.get(func)(callback.arg);
              }
            } else {
              func(callback.arg === void 0 ? null : callback.arg);
            }
          }
        }
        function _abort() {
          abort();
        }
        var _emscripten_get_now;
        _emscripten_get_now = function() {
          return performance.now();
        };
        var _emscripten_get_now_is_monotonic = true;
        function setErrNo(value) {
          HEAP32[___errno_location() >> 2] = value;
          return value;
        }
        function _clock_gettime(clk_id, tp) {
          var now;
          if (clk_id === 0) {
            now = Date.now();
          } else if ((clk_id === 1 || clk_id === 4) && _emscripten_get_now_is_monotonic) {
            now = _emscripten_get_now();
          } else {
            setErrNo(28);
            return -1;
          }
          HEAP32[tp >> 2] = now / 1e3 | 0;
          HEAP32[tp + 4 >> 2] = now % 1e3 * 1e3 * 1e3 | 0;
          return 0;
        }
        function _dlopen(filename, flag) {
          abort("To use dlopen, you need to use Emscripten's linking support, see https://github.com/emscripten-core/emscripten/wiki/Linking");
        }
        function _dlsym(handle, symbol) {
          abort("To use dlopen, you need to use Emscripten's linking support, see https://github.com/emscripten-core/emscripten/wiki/Linking");
        }
        function _emscripten_memcpy_big(dest, src, num) {
          HEAPU8.copyWithin(dest, src, src + num);
        }
        function _emscripten_get_heap_size() {
          return HEAPU8.length;
        }
        function emscripten_realloc_buffer(size) {
          try {
            wasmMemory.grow(size - buffer.byteLength + 65535 >>> 16);
            updateGlobalBufferAndViews(wasmMemory.buffer);
            return 1;
          } catch (e) {
          }
        }
        function _emscripten_resize_heap(requestedSize) {
          var oldSize = _emscripten_get_heap_size();
          var maxHeapSize = 2147483648;
          if (requestedSize > maxHeapSize) {
            return false;
          }
          for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
            var overGrownHeapSize = oldSize * (1 + 0.2 / cutDown);
            overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
            var newSize = Math.min(maxHeapSize, alignUp(Math.max(requestedSize, overGrownHeapSize), 65536));
            var replacement = emscripten_realloc_buffer(newSize);
            if (replacement) {
              return true;
            }
          }
          return false;
        }
        function _emscripten_thread_sleep(msecs) {
          var start = _emscripten_get_now();
          while (_emscripten_get_now() - start < msecs) {
          }
        }
        var ENV = {};
        function getExecutableName() {
          return thisProgram || "./this.program";
        }
        function getEnvStrings() {
          if (!getEnvStrings.strings) {
            var lang = (typeof navigator === "object" && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8";
            var env = { "USER": "web_user", "LOGNAME": "web_user", "PATH": "/", "PWD": "/", "HOME": "/home/web_user", "LANG": lang, "_": getExecutableName() };
            for (var x in ENV) {
              env[x] = ENV[x];
            }
            var strings = [];
            for (var x in env) {
              strings.push(x + "=" + env[x]);
            }
            getEnvStrings.strings = strings;
          }
          return getEnvStrings.strings;
        }
        var SYSCALLS = { mappings: {}, buffers: [null, [], []], printChar: function(stream, curr) {
          var buffer2 = SYSCALLS.buffers[stream];
          if (curr === 0 || curr === 10) {
            (stream === 1 ? out : err)(UTF8ArrayToString(buffer2, 0));
            buffer2.length = 0;
          } else {
            buffer2.push(curr);
          }
        }, varargs: void 0, get: function() {
          SYSCALLS.varargs += 4;
          var ret = HEAP32[SYSCALLS.varargs - 4 >> 2];
          return ret;
        }, getStr: function(ptr) {
          var ret = UTF8ToString(ptr);
          return ret;
        }, get64: function(low, high) {
          return low;
        } };
        function _environ_get(__environ, environ_buf) {
          var bufSize = 0;
          getEnvStrings().forEach(function(string, i) {
            var ptr = environ_buf + bufSize;
            HEAP32[__environ + i * 4 >> 2] = ptr;
            writeAsciiToMemory(string, ptr);
            bufSize += string.length + 1;
          });
          return 0;
        }
        function _environ_sizes_get(penviron_count, penviron_buf_size) {
          var strings = getEnvStrings();
          HEAP32[penviron_count >> 2] = strings.length;
          var bufSize = 0;
          strings.forEach(function(string) {
            bufSize += string.length + 1;
          });
          HEAP32[penviron_buf_size >> 2] = bufSize;
          return 0;
        }
        function _exit(status) {
          exit(status);
        }
        function _fd_close(fd) {
          return 0;
        }
        function _fd_seek(fd, offset_low, offset_high, whence, newOffset) {
        }
        function _fd_write(fd, iov, iovcnt, pnum) {
          var num = 0;
          for (var i = 0; i < iovcnt; i++) {
            var ptr = HEAP32[iov + i * 8 >> 2];
            var len = HEAP32[iov + (i * 8 + 4) >> 2];
            for (var j = 0; j < len; j++) {
              SYSCALLS.printChar(fd, HEAPU8[ptr + j]);
            }
            num += len;
          }
          HEAP32[pnum >> 2] = num;
          return 0;
        }
        function _pthread_create() {
          return 6;
        }
        function _pthread_join() {
          return 28;
        }
        function _sysconf(name) {
          switch (name) {
            case 30:
              return 16384;
            case 85:
              var maxHeapSize = 2147483648;
              return maxHeapSize / 16384;
            case 132:
            case 133:
            case 12:
            case 137:
            case 138:
            case 15:
            case 235:
            case 16:
            case 17:
            case 18:
            case 19:
            case 20:
            case 149:
            case 13:
            case 10:
            case 236:
            case 153:
            case 9:
            case 21:
            case 22:
            case 159:
            case 154:
            case 14:
            case 77:
            case 78:
            case 139:
            case 82:
            case 68:
            case 67:
            case 164:
            case 11:
            case 29:
            case 47:
            case 48:
            case 95:
            case 52:
            case 51:
            case 46:
              return 200809;
            case 27:
            case 246:
            case 127:
            case 128:
            case 23:
            case 24:
            case 160:
            case 161:
            case 181:
            case 182:
            case 242:
            case 183:
            case 184:
            case 243:
            case 244:
            case 245:
            case 165:
            case 178:
            case 179:
            case 49:
            case 50:
            case 168:
            case 169:
            case 175:
            case 170:
            case 171:
            case 172:
            case 97:
            case 76:
            case 32:
            case 173:
            case 35:
            case 80:
            case 81:
            case 79:
              return -1;
            case 176:
            case 177:
            case 7:
            case 155:
            case 8:
            case 157:
            case 125:
            case 126:
            case 92:
            case 93:
            case 129:
            case 130:
            case 131:
            case 94:
            case 91:
              return 1;
            case 74:
            case 60:
            case 69:
            case 70:
            case 4:
              return 1024;
            case 31:
            case 42:
            case 72:
              return 32;
            case 87:
            case 26:
            case 33:
              return 2147483647;
            case 34:
            case 1:
              return 47839;
            case 38:
            case 36:
              return 99;
            case 43:
            case 37:
              return 2048;
            case 0:
              return 2097152;
            case 3:
              return 65536;
            case 28:
              return 32768;
            case 44:
              return 32767;
            case 75:
              return 16384;
            case 39:
              return 1e3;
            case 89:
              return 700;
            case 71:
              return 256;
            case 40:
              return 255;
            case 2:
              return 100;
            case 180:
              return 64;
            case 25:
              return 20;
            case 5:
              return 16;
            case 6:
              return 6;
            case 73:
              return 4;
            case 84: {
              if (typeof navigator === "object")
                return navigator["hardwareConcurrency"] || 1;
              return 1;
            }
          }
          setErrNo(28);
          return -1;
        }
        var asmLibraryArg = { "a": _abort, "n": _clock_gettime, "i": _dlopen, "e": _dlsym, "l": _emscripten_memcpy_big, "m": _emscripten_resize_heap, "o": _emscripten_thread_sleep, "p": _environ_get, "g": _environ_sizes_get, "j": _exit, "h": _fd_close, "k": _fd_seek, "c": _fd_write, "d": _pthread_create, "f": _pthread_join, "b": _sysconf };
        var asm = createWasm();
        var ___wasm_call_ctors = Module["___wasm_call_ctors"] = function() {
          return (___wasm_call_ctors = Module["___wasm_call_ctors"] = Module["asm"]["r"]).apply(null, arguments);
        };
        var _getModelBufferMemoryOffset = Module["_getModelBufferMemoryOffset"] = function() {
          return (_getModelBufferMemoryOffset = Module["_getModelBufferMemoryOffset"] = Module["asm"]["s"]).apply(null, arguments);
        };
        var _getInputMemoryOffset = Module["_getInputMemoryOffset"] = function() {
          return (_getInputMemoryOffset = Module["_getInputMemoryOffset"] = Module["asm"]["t"]).apply(null, arguments);
        };
        var _getInputHeight = Module["_getInputHeight"] = function() {
          return (_getInputHeight = Module["_getInputHeight"] = Module["asm"]["u"]).apply(null, arguments);
        };
        var _getInputWidth = Module["_getInputWidth"] = function() {
          return (_getInputWidth = Module["_getInputWidth"] = Module["asm"]["v"]).apply(null, arguments);
        };
        var _getInputChannelCount = Module["_getInputChannelCount"] = function() {
          return (_getInputChannelCount = Module["_getInputChannelCount"] = Module["asm"]["w"]).apply(null, arguments);
        };
        var _getOutputMemoryOffset = Module["_getOutputMemoryOffset"] = function() {
          return (_getOutputMemoryOffset = Module["_getOutputMemoryOffset"] = Module["asm"]["x"]).apply(null, arguments);
        };
        var _getOutputHeight = Module["_getOutputHeight"] = function() {
          return (_getOutputHeight = Module["_getOutputHeight"] = Module["asm"]["y"]).apply(null, arguments);
        };
        var _getOutputWidth = Module["_getOutputWidth"] = function() {
          return (_getOutputWidth = Module["_getOutputWidth"] = Module["asm"]["z"]).apply(null, arguments);
        };
        var _getOutputChannelCount = Module["_getOutputChannelCount"] = function() {
          return (_getOutputChannelCount = Module["_getOutputChannelCount"] = Module["asm"]["A"]).apply(null, arguments);
        };
        var _loadModel = Module["_loadModel"] = function() {
          return (_loadModel = Module["_loadModel"] = Module["asm"]["B"]).apply(null, arguments);
        };
        var _runInference = Module["_runInference"] = function() {
          return (_runInference = Module["_runInference"] = Module["asm"]["C"]).apply(null, arguments);
        };
        var ___errno_location = Module["___errno_location"] = function() {
          return (___errno_location = Module["___errno_location"] = Module["asm"]["E"]).apply(null, arguments);
        };
        var calledRun;
        function ExitStatus(status) {
          this.name = "ExitStatus";
          this.message = "Program terminated with exit(" + status + ")";
          this.status = status;
        }
        dependenciesFulfilled = function runCaller() {
          if (!calledRun)
            run();
          if (!calledRun)
            dependenciesFulfilled = runCaller;
        };
        function run(args) {
          args = args || arguments_;
          if (runDependencies > 0) {
            return;
          }
          preRun();
          if (runDependencies > 0) {
            return;
          }
          function doRun() {
            if (calledRun)
              return;
            calledRun = true;
            Module["calledRun"] = true;
            if (ABORT)
              return;
            initRuntime();
            preMain();
            readyPromiseResolve(Module);
            if (Module["onRuntimeInitialized"])
              Module["onRuntimeInitialized"]();
            postRun();
          }
          if (Module["setStatus"]) {
            Module["setStatus"]("Running...");
            setTimeout(function() {
              setTimeout(function() {
                Module["setStatus"]("");
              }, 1);
              doRun();
            }, 1);
          } else {
            doRun();
          }
        }
        Module["run"] = run;
        function exit(status, implicit) {
          if (implicit && noExitRuntime && status === 0) {
            return;
          }
          if (noExitRuntime) {
          } else {
            EXITSTATUS = status;
            exitRuntime();
            if (Module["onExit"])
              Module["onExit"](status);
            ABORT = true;
          }
          quit_(status, new ExitStatus(status));
        }
        if (Module["preInit"]) {
          if (typeof Module["preInit"] == "function")
            Module["preInit"] = [Module["preInit"]];
          while (Module["preInit"].length > 0) {
            Module["preInit"].pop()();
          }
        }
        run();
        return createTFLiteSIMDModule3.ready;
      };
    }();
    if (typeof exports === "object" && typeof module === "object")
      module.exports = createTFLiteSIMDModule2;
    else if (typeof define === "function" && define["amd"])
      define([], function() {
        return createTFLiteSIMDModule2;
      });
    else if (typeof exports === "object")
      exports["createTFLiteSIMDModule"] = createTFLiteSIMDModule2;
  }
});

// src/core/helpers/lowLightAdjustmentsHelpers.ts
var BRIGHTNESS_ADJUSTMENT_VARIANCE = 10;
var LOW_LIGHT_TIMEOUT_MS = 250;
var BRIGHTNESS_TO_CONTRAST_RATIO = 2;
var PIXEL_SAMPLING_INCREMENT = 200;
function calculateBrightnessPercentage(pixelArrayData) {
  const length = pixelArrayData.length;
  const rgb = { r: 0, g: 0, b: 0 };
  for (let i = 0; i < length - 2; i += PIXEL_SAMPLING_INCREMENT) {
    rgb.r += pixelArrayData[i];
    rgb.g += pixelArrayData[i + 1];
    rgb.b += pixelArrayData[i + 2];
  }
  rgb.r = ~~(rgb.r / (length / PIXEL_SAMPLING_INCREMENT));
  rgb.g = ~~(rgb.g / (length / PIXEL_SAMPLING_INCREMENT));
  rgb.b = ~~(rgb.b / (length / PIXEL_SAMPLING_INCREMENT));
  const percentage = Math.round((0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b) / 255 * 100 * 100);
  return percentage / 100;
}
var BrightnessThresholdsKeys;
(function(BrightnessThresholdsKeys2) {
  BrightnessThresholdsKeys2[BrightnessThresholdsKeys2["minimumLow"] = 0] = "minimumLow";
  BrightnessThresholdsKeys2[BrightnessThresholdsKeys2["ultraLow"] = 1] = "ultraLow";
  BrightnessThresholdsKeys2[BrightnessThresholdsKeys2["low"] = 2] = "low";
  BrightnessThresholdsKeys2[BrightnessThresholdsKeys2["medium"] = 3] = "medium";
  BrightnessThresholdsKeys2[BrightnessThresholdsKeys2["high"] = 4] = "high";
  BrightnessThresholdsKeys2[BrightnessThresholdsKeys2["ultraHigh"] = 5] = "ultraHigh";
  BrightnessThresholdsKeys2[BrightnessThresholdsKeys2["maximumHigh"] = 6] = "maximumHigh";
})(BrightnessThresholdsKeys || (BrightnessThresholdsKeys = {}));
function getCurrentBrightnessAdjustment(brightnessPercentage, brightnessThresholds) {
  if (brightnessPercentage <= brightnessThresholds.minimumLow.threshold) {
    return brightnessThresholds.minimumLow;
  } else if (brightnessPercentage <= brightnessThresholds.ultraLow.threshold) {
    return brightnessThresholds.ultraLow;
  } else if (brightnessPercentage <= brightnessThresholds.low.threshold) {
    return brightnessThresholds.low;
  } else if (brightnessPercentage <= brightnessThresholds.medium.threshold) {
    return brightnessThresholds.medium;
  } else if (brightnessPercentage <= brightnessThresholds.high.threshold) {
    return brightnessThresholds.high;
  } else if (brightnessPercentage <= brightnessThresholds.ultraHigh.threshold) {
    return brightnessThresholds.ultraHigh;
  }
  return brightnessThresholds.maximumHigh;
}
function shouldUpdateBrightnessAdjustmentRelativeToLastUpdate(newBrightnessPercentage, previousBrightnessPercentage) {
  return newBrightnessPercentage < previousBrightnessPercentage - BRIGHTNESS_ADJUSTMENT_VARIANCE || newBrightnessPercentage > previousBrightnessPercentage + BRIGHTNESS_ADJUSTMENT_VARIANCE;
}

// src/core/helpers/segmentationHelper.ts
var import_tflite = __toModule(require_tflite());
var import_tflite_simd = __toModule(require_tflite_simd());
var DEFAULT_SEGMENTATION_CONFIG = {
  model: "meet-160x96",
  backend: "wasmSimd",
  pipeline: "webgl2",
  wasmFilePrefix: "https://camfort-tmp.s3-us-west-1.amazonaws.com/v2/"
};
var INPUT_RESOLUTION_PER_MODEL = {
  "meet-160x96": [160, 96],
  "meet-256x144": [256, 144],
  mlkit: [256, 256]
};
var buildSegmentationConfig = (attrs) => {
  return __spreadValues(__spreadValues({}, DEFAULT_SEGMENTATION_CONFIG), attrs);
};
function getTFLiteModelFileName(model) {
  switch (model) {
    case "meet-256x144":
      return "segm_full_v679";
    case "meet-160x96":
      return "segm_lite_v681";
    case "mlkit":
      return "selfiesegmentation_mlkit-256x256-2021_01_19-v1215.f16";
    default:
      throw new Error(`No TFLite file for this segmentation model: ${model}`);
  }
}
var buildTflite = async (config) => {
  const moduleConfig = {
    locateFile: (f) => `${config.wasmFilePrefix}${f}`.replace(/([a-z0-9])(\/+)/gi, "$1/")
  };
  if (config.backend === "wasmSimd") {
    try {
      return {
        tflite: await (0, import_tflite_simd.default)(moduleConfig),
        simd: true
      };
    } catch (error) {
      console.warn("Failed to create TFLite SIMD WebAssembly module.", error);
    }
  }
  return {
    tflite: await (0, import_tflite.default)(moduleConfig),
    simd: false
  };
};
var buildSegmenter = async (segmentationConfig) => {
  const tflite = (await buildTflite(segmentationConfig)).tflite;
  const PIXEL_SIZE = 4;
  await loadModel(tflite, segmentationConfig);
  return {
    write: (src) => {
      const tfliteInputMemoryOffset = tflite._getInputMemoryOffset() / 4;
      const inputPixels = new Uint8Array(src);
      for (let i = 0; i < inputPixels.byteLength / PIXEL_SIZE; i++) {
        const tfliteIndex = tfliteInputMemoryOffset + i * 3;
        const srcIndex = i * PIXEL_SIZE;
        tflite.HEAPF32[tfliteIndex] = inputPixels[srcIndex] / 255;
        tflite.HEAPF32[tfliteIndex + 1] = inputPixels[srcIndex + 1] / 255;
        tflite.HEAPF32[tfliteIndex + 2] = inputPixels[srcIndex + 2] / 255;
      }
    },
    read: () => {
      return tflite.HEAPF32.slice(tflite._getOutputMemoryOffset() / PIXEL_SIZE);
    },
    run() {
      tflite._runInference();
    }
  };
};
var loadModel = async (tflite, config) => {
  console.log("loading model");
  const modelFileName = getTFLiteModelFileName(config.model);
  console.log("Loading tflite model:", modelFileName);
  const modelResponse = await fetch(`https://camfort-tmp.s3-us-west-1.amazonaws.com/${modelFileName}.tflite`);
  const model = await modelResponse.arrayBuffer();
  console.log("Model buffer size:", model.byteLength);
  const modelBufferOffset = tflite._getModelBufferMemoryOffset();
  tflite.HEAPU8.set(new Uint8Array(model), modelBufferOffset);
  tflite._loadModel(model.byteLength);
};

// src/pipelines/helpers/webglHelper.ts
var glsl = String.raw;
function createPipelineStageProgram(gl, vertexShader, fragmentShader, positionBuffer, texCoordBuffer) {
  const program = createProgram(gl, vertexShader, fragmentShader);
  const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(positionAttributeLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);
  const texCoordAttributeLocation = gl.getAttribLocation(program, "a_texCoord");
  gl.enableVertexAttribArray(texCoordAttributeLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
  gl.vertexAttribPointer(texCoordAttributeLocation, 2, gl.FLOAT, false, 0, 0);
  return program;
}
function createProgram(gl, vertexShader, fragmentShader) {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(`Could not link WebGL program: ${gl.getProgramInfoLog(program)}`);
  }
  return program;
}
function compileShader(gl, shaderType, shaderSource) {
  const shader = gl.createShader(shaderType);
  gl.shaderSource(shader, shaderSource);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(`Could not compile shader: ${gl.getShaderInfoLog(shader)}`);
  }
  return shader;
}
function getAssignedLocationForPreviousResult(gl, location) {
  gl.uniform1i(location, 8);
}
function allocateUnitForPreviousTexture(gl, texture) {
  gl.activeTexture(gl.TEXTURE8);
  gl.bindTexture(gl.TEXTURE_2D, texture);
}
function createTexture(gl, internalformat, width, height, minFilter = gl.NEAREST, magFilter = gl.NEAREST) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minFilter);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magFilter);
  gl.texStorage2D(gl.TEXTURE_2D, 1, internalformat, width, height);
  return texture;
}
async function readPixelsAsync(gl, x, y, width, height, format, type, dest) {
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.PIXEL_PACK_BUFFER, buf);
  gl.bufferData(gl.PIXEL_PACK_BUFFER, dest.byteLength, gl.STREAM_READ);
  gl.readPixels(x, y, width, height, format, type, 0);
  gl.bindBuffer(gl.PIXEL_PACK_BUFFER, null);
  await getBufferSubDataAsync(gl, gl.PIXEL_PACK_BUFFER, buf, 0, dest);
  gl.deleteBuffer(buf);
  return dest;
}
async function getBufferSubDataAsync(gl, target, buffer, srcByteOffset, dstBuffer, dstOffset, length) {
  const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
  gl.flush();
  const res = await clientWaitAsync(gl, sync);
  gl.deleteSync(sync);
  if (res !== gl.WAIT_FAILED) {
    gl.bindBuffer(target, buffer);
    gl.getBufferSubData(target, srcByteOffset, dstBuffer, dstOffset, length);
    gl.bindBuffer(target, null);
  }
}
function clientWaitAsync(gl, sync) {
  return new Promise((resolve) => {
    function test() {
      const res = gl.clientWaitSync(sync, 0, 0);
      if (res === gl.WAIT_FAILED) {
        resolve(res);
        return;
      }
      if (res === gl.TIMEOUT_EXPIRED) {
        setTimeout(test, 0);
        return;
      }
      resolve(res);
    }
    setTimeout(test, 0);
  });
}

// src/pipelines/webgl2/backgroundBlurStage.ts
function buildBackgroundBlurStage(gl, vertexShader, positionBuffer, texCoordBuffer, personMaskTexture, canvas) {
  const blurPass = buildBlurPass(gl, vertexShader, positionBuffer, texCoordBuffer, personMaskTexture, canvas);
  const blendPass = buildBlendPass(gl, positionBuffer, texCoordBuffer, canvas);
  function render() {
    blurPass.render();
    blendPass.render();
  }
  function renderToTexture() {
    blurPass.renderFromPreviousStage();
    return blendPass.renderToTexture();
  }
  function updateCoverage(coverage) {
    blendPass.updateCoverage(coverage);
  }
  function cleanUp() {
    blendPass.cleanUp();
    blurPass.cleanUp();
  }
  return {
    render,
    renderToTexture,
    updateCoverage,
    cleanUp
  };
}
function buildBlurPass(gl, vertexShader, positionBuffer, texCoordBuffer, personMaskTexture, canvas) {
  const fragmentShaderSource = glsl`#version 300 es

    precision highp float;

    uniform sampler2D u_inputFrame;
    uniform sampler2D u_personMask;
    uniform vec2 u_texelSize;

    in vec2 v_texCoord;

    out vec4 outColor;

    const float offset[5] = float[](0.0, 1.0, 2.0, 3.0, 4.0);
    const float weight[5] = float[](0.2270270270, 0.1945945946, 0.1216216216,
      0.0540540541, 0.0162162162);

    void main() {
      vec4 centerColor = texture(u_inputFrame, v_texCoord);
      float personMask = texture(u_personMask, v_texCoord).a;

      vec4 frameColor = centerColor * weight[0] * (1.0 - personMask);

      for (int i = 1; i < 5; i++) {
        vec2 offset = vec2(offset[i]) * u_texelSize;

        vec2 texCoord = v_texCoord + offset;
        frameColor += texture(u_inputFrame, texCoord) * weight[i] *
          (1.0 - texture(u_personMask, texCoord).a);

        texCoord = v_texCoord - offset;
        frameColor += texture(u_inputFrame, texCoord) * weight[i] *
          (1.0 - texture(u_personMask, texCoord).a);
      }
      outColor = vec4(frameColor.rgb + (1.0 - frameColor.a) * centerColor.rgb, 1.0);
    }
  `;
  const scale = 0.5;
  const outputWidth = canvas.width * scale;
  const outputHeight = canvas.height * scale;
  const texelWidth = 1 / outputWidth;
  const texelHeight = 1 / outputHeight;
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
  const program = createPipelineStageProgram(gl, vertexShader, fragmentShader, positionBuffer, texCoordBuffer);
  const inputFrameLocation = gl.getUniformLocation(program, "u_inputFrame");
  const personMaskLocation = gl.getUniformLocation(program, "u_personMask");
  const texelSizeLocation = gl.getUniformLocation(program, "u_texelSize");
  const texture1 = createTexture(gl, gl.RGBA8, outputWidth, outputHeight, gl.NEAREST, gl.LINEAR);
  const texture2 = createTexture(gl, gl.RGBA8, outputWidth, outputHeight, gl.NEAREST, gl.LINEAR);
  const frameBuffer1 = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer1);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture1, 0);
  const frameBuffer2 = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer2);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture2, 0);
  gl.useProgram(program);
  gl.uniform1i(personMaskLocation, 1);
  function render() {
    gl.viewport(0, 0, outputWidth, outputHeight);
    gl.useProgram(program);
    gl.uniform1i(inputFrameLocation, 0);
    renderHelper();
  }
  function renderFromPreviousStage() {
    gl.viewport(0, 0, outputWidth, outputHeight);
    gl.useProgram(program);
    getAssignedLocationForPreviousResult(gl, inputFrameLocation);
    renderHelper();
  }
  function renderHelper() {
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, personMaskTexture);
    for (let i = 0; i < 3; i++) {
      gl.uniform2f(texelSizeLocation, 0, texelHeight);
      gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer1);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      gl.activeTexture(gl.TEXTURE2);
      gl.bindTexture(gl.TEXTURE_2D, texture1);
      gl.uniform1i(inputFrameLocation, 2);
      gl.uniform2f(texelSizeLocation, texelWidth, 0);
      gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer2);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      gl.bindTexture(gl.TEXTURE_2D, texture2);
    }
  }
  function cleanUp() {
    gl.deleteFramebuffer(frameBuffer2);
    gl.deleteFramebuffer(frameBuffer1);
    gl.deleteTexture(texture2);
    gl.deleteTexture(texture1);
    gl.deleteProgram(program);
    gl.deleteShader(fragmentShader);
  }
  return {
    render,
    renderFromPreviousStage,
    cleanUp
  };
}
function buildBlendPass(gl, positionBuffer, texCoordBuffer, canvas) {
  const vertexShaderSource = glsl`#version 300 es

    in vec2 a_position;
    in vec2 a_texCoord;

    out vec2 v_texCoord;

    void main() {
      // Flipping Y is required when rendering to canvas
      gl_Position = vec4(a_position * vec2(1.0, -1.0), 0.0, 1.0);
      v_texCoord = a_texCoord;
    }
  `;
  const fragmentShaderSource = glsl`#version 300 es

    precision highp float;

    uniform sampler2D u_inputFrame;
    uniform sampler2D u_personMask;
    uniform sampler2D u_blurredInputFrame;
    uniform vec2 u_coverage;

    in vec2 v_texCoord;

    out vec4 outColor;

    void main() {
      vec3 color = texture(u_inputFrame, v_texCoord).rgb;
      vec3 blurredColor = texture(u_blurredInputFrame, v_texCoord).rgb;
      float personMask = texture(u_personMask, v_texCoord).a;
      personMask = smoothstep(u_coverage.x, u_coverage.y, personMask);
      outColor = vec4(mix(blurredColor, color, personMask), 1.0);
    }
  `;
  const { width: outputWidth, height: outputHeight } = canvas;
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
  const program = createPipelineStageProgram(gl, vertexShader, fragmentShader, positionBuffer, texCoordBuffer);
  const inputFrameLocation = gl.getUniformLocation(program, "u_inputFrame");
  const personMaskLocation = gl.getUniformLocation(program, "u_personMask");
  const blurredInputFrame = gl.getUniformLocation(program, "u_blurredInputFrame");
  const coverageLocation = gl.getUniformLocation(program, "u_coverage");
  gl.useProgram(program);
  gl.uniform1i(inputFrameLocation, 0);
  gl.uniform1i(personMaskLocation, 1);
  gl.uniform1i(blurredInputFrame, 2);
  gl.uniform2f(coverageLocation, 0, 1);
  const outFrameBuffer = gl.createFramebuffer();
  const resultTexture = createTexture(gl, gl.RGBA8, outputWidth, outputHeight);
  gl.bindFramebuffer(gl.FRAMEBUFFER, outFrameBuffer);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, resultTexture, 0);
  function render() {
    gl.viewport(0, 0, outputWidth, outputHeight);
    gl.useProgram(program);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
  function renderToTexture() {
    gl.viewport(0, 0, outputWidth, outputHeight);
    gl.useProgram(program);
    gl.activeTexture(gl.TEXTURE8);
    getAssignedLocationForPreviousResult(gl, inputFrameLocation);
    gl.bindFramebuffer(gl.FRAMEBUFFER, outFrameBuffer);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    return resultTexture;
  }
  function updateCoverage(coverage) {
    gl.useProgram(program);
    gl.uniform2f(coverageLocation, coverage[0], coverage[1]);
  }
  function cleanUp() {
    gl.deleteTexture(resultTexture);
    gl.deleteProgram(program);
    gl.deleteFramebuffer(outFrameBuffer);
    gl.deleteShader(fragmentShader);
    gl.deleteShader(vertexShader);
  }
  return {
    render,
    renderToTexture,
    updateCoverage,
    cleanUp
  };
}

// src/pipelines/webgl2/backgroundImageStage.ts
async function loadImage(url) {
  return createImageBitmap(await (await fetch(url)).blob());
}
function buildBackgroundImageStage(gl, positionBuffer, texCoordBuffer, personMaskTexture, backgroundUrl, canvas) {
  const vertexShaderSource = glsl`#version 300 es

    uniform vec2 u_backgroundScale;
    uniform vec2 u_backgroundOffset;

    in vec2 a_position;
    in vec2 a_texCoord;

    out vec2 v_texCoord;
    out vec2 v_backgroundCoord;

    void main() {
      // Flipping Y is required when rendering to canvas
      gl_Position = vec4(a_position * vec2(1.0, -1.0), 0.0, 1.0);
      v_texCoord = a_texCoord;
      v_backgroundCoord = a_texCoord * u_backgroundScale + u_backgroundOffset;
    }
  `;
  const fragmentShaderSource = glsl`#version 300 es

    precision highp float;

    uniform sampler2D u_inputFrame;
    uniform sampler2D u_personMask;
    uniform sampler2D u_background;
    uniform vec2 u_coverage;
    uniform float u_lightWrapping;
    uniform float u_blendMode;

    in vec2 v_texCoord;
    in vec2 v_backgroundCoord;

    out vec4 outColor;

    vec3 screen(vec3 a, vec3 b) {
      return 1.0 - (1.0 - a) * (1.0 - b);
    }

    vec3 linearDodge(vec3 a, vec3 b) {
      return a + b;
    }

    void main() {
      vec3 frameColor = texture(u_inputFrame, v_texCoord).rgb;
      vec3 backgroundColor = texture(u_background, v_backgroundCoord).rgb;
      float personMask = texture(u_personMask, v_texCoord).a;
      float lightWrapMask = 1.0 - max(0.0, personMask - u_coverage.y) / (1.0 - u_coverage.y);
      vec3 lightWrap = u_lightWrapping * lightWrapMask * backgroundColor;
      frameColor = u_blendMode * linearDodge(frameColor, lightWrap) +
        (1.0 - u_blendMode) * screen(frameColor, lightWrap);
      personMask = smoothstep(u_coverage.x, u_coverage.y, personMask);
      outColor = vec4(frameColor * personMask + backgroundColor * (1.0 - personMask), 1.0);
    }
  `;
  const { width: outputWidth, height: outputHeight } = canvas;
  const outputRatio = outputWidth / outputHeight;
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
  const program = createPipelineStageProgram(gl, vertexShader, fragmentShader, positionBuffer, texCoordBuffer);
  const backgroundScaleLocation = gl.getUniformLocation(program, "u_backgroundScale");
  const backgroundOffsetLocation = gl.getUniformLocation(program, "u_backgroundOffset");
  const inputFrameLocation = gl.getUniformLocation(program, "u_inputFrame");
  const personMaskLocation = gl.getUniformLocation(program, "u_personMask");
  const backgroundLocation = gl.getUniformLocation(program, "u_background");
  const coverageLocation = gl.getUniformLocation(program, "u_coverage");
  const lightWrappingLocation = gl.getUniformLocation(program, "u_lightWrapping");
  const blendModeLocation = gl.getUniformLocation(program, "u_blendMode");
  gl.useProgram(program);
  gl.uniform2f(backgroundScaleLocation, 1, 1);
  gl.uniform2f(backgroundOffsetLocation, 0, 0);
  gl.uniform1i(personMaskLocation, 1);
  gl.uniform2f(coverageLocation, 0, 1);
  gl.uniform1f(lightWrappingLocation, 0);
  gl.uniform1f(blendModeLocation, 0);
  let backgroundTexture = null;
  if (backgroundUrl) {
    loadImage(backgroundUrl).then((image) => {
      updateBackgroundImage(image);
    });
  }
  const outFrameBuffer = gl.createFramebuffer();
  const resultTexture = createTexture(gl, gl.RGBA8, outputWidth, outputHeight);
  gl.bindFramebuffer(gl.FRAMEBUFFER, outFrameBuffer);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, resultTexture, 0);
  function render() {
    gl.viewport(0, 0, outputWidth, outputHeight);
    gl.useProgram(program);
    gl.activeTexture(gl.TEXTURE0);
    gl.uniform1i(inputFrameLocation, 0);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, personMaskTexture);
    if (backgroundTexture !== null) {
      gl.activeTexture(gl.TEXTURE2);
      gl.bindTexture(gl.TEXTURE_2D, backgroundTexture);
      gl.uniform1i(backgroundLocation, 2);
    }
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
  function renderToTexture() {
    gl.viewport(0, 0, outputWidth, outputHeight);
    gl.useProgram(program);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, personMaskTexture);
    gl.activeTexture(gl.TEXTURE8);
    getAssignedLocationForPreviousResult(gl, inputFrameLocation);
    if (backgroundTexture !== null) {
      gl.activeTexture(gl.TEXTURE2);
      gl.bindTexture(gl.TEXTURE_2D, backgroundTexture);
      gl.uniform1i(backgroundLocation, 2);
    } else {
      getAssignedLocationForPreviousResult(gl, backgroundLocation);
    }
    gl.bindFramebuffer(gl.FRAMEBUFFER, outFrameBuffer);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    return resultTexture;
  }
  function updateBackgroundImage(backgroundImage) {
    backgroundTexture = createTexture(gl, gl.RGBA8, backgroundImage.width, backgroundImage.height, gl.LINEAR, gl.LINEAR);
    gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, backgroundImage.width, backgroundImage.height, gl.RGBA, gl.UNSIGNED_BYTE, backgroundImage);
    let xOffset = 0;
    let yOffset = 0;
    let backgroundWidth = backgroundImage.width;
    let backgroundHeight = backgroundImage.height;
    const backgroundRatio = backgroundWidth / backgroundHeight;
    if (backgroundRatio < outputRatio) {
      backgroundHeight = backgroundWidth / outputRatio;
      yOffset = (backgroundImage.height - backgroundHeight) / 2;
    } else {
      backgroundWidth = backgroundHeight * outputRatio;
      xOffset = (backgroundImage.width - backgroundWidth) / 2;
    }
    const xScale = backgroundWidth / backgroundImage.width;
    const yScale = backgroundHeight / backgroundImage.height;
    xOffset /= backgroundImage.width;
    yOffset /= backgroundImage.height;
    gl.uniform2f(backgroundScaleLocation, xScale, yScale);
    gl.uniform2f(backgroundOffsetLocation, xOffset, yOffset);
  }
  function updateCoverage(coverage) {
    gl.useProgram(program);
    gl.uniform2f(coverageLocation, coverage[0], coverage[1]);
  }
  function updateLightWrapping(lightWrapping) {
    gl.useProgram(program);
    gl.uniform1f(lightWrappingLocation, lightWrapping);
  }
  function updateBlendMode(blendMode) {
    gl.useProgram(program);
    gl.uniform1f(blendModeLocation, blendMode === "screen" ? 0 : 1);
  }
  function cleanUp() {
    gl.deleteFramebuffer(outFrameBuffer);
    gl.deleteTexture(resultTexture);
    gl.deleteTexture(backgroundTexture);
    gl.deleteProgram(program);
    gl.deleteShader(fragmentShader);
    gl.deleteShader(vertexShader);
  }
  return {
    render,
    renderToTexture,
    updateCoverage,
    updateLightWrapping,
    updateBlendMode,
    cleanUp
  };
}

// src/pipelines/webgl2/buildBlemishSmoothingStage.ts
var RADIUS = 3;
function buildBlemishSmoothingStage(gl, positionBuffer, texCoordBuffer, personMaskTexture, canvas, segmentationConfig) {
  const vertexShaderSource = glsl`#version 300 es
          in vec2 a_position;
          in vec2 a_texCoord;
  
          out vec2 v_texCoord;
  
          void main() {
              // Flipping Y is required when rendering to canvas
              gl_Position = vec4(a_position, 0.0, 1.0);
              // gl_Position = vec4(a_position, 0.0, 1.0);
              v_texCoord = a_texCoord;
          }
      `;
  const fragmentShaderSource = glsl`#version 300 es
          precision highp float;

          // Input frame is from the previous step
          uniform sampler2D u_inputFrame;
          uniform sampler2D u_personMask;
  
          uniform vec2 u_texelSize;
          uniform float u_step;
          uniform float u_radius;
          uniform float u_sigmaTexel;
          uniform float u_sigmaColor;
  
          in vec2 v_texCoord;
  
          out vec4 outColor;
  
          float gaussian(float x, float sigma) {
              float coeff = -0.5 / (sigma * sigma * 4.0 + 1.0e-6);
              return exp((x * x) * coeff);
          }
  
          void main() {
              vec2 centerCoord = v_texCoord;
              vec3 centerColor = texture(u_inputFrame, centerCoord).rgb;
  
              float personMask = texture(u_personMask, v_texCoord).a;
  
              float spaceWeight = 0.0;
              float colorWeight = 0.0;
              float totalWeight = 0.0;
              vec3 newVal = vec3(0.0,0.0,0.0);
  
              // Subsample kernel space
              for (float i = -u_radius; i <= u_radius; i += u_step) {
                  for (float j = -u_radius; j <= u_radius; j += u_step) {
                      vec2 shift = vec2(j, i) * u_texelSize;
                      vec2 coord = centerCoord + shift;
                      vec3 frameColor = texture(u_inputFrame, coord).rgb;
          
                      spaceWeight = gaussian(distance(centerCoord, coord), u_sigmaTexel);
                      colorWeight = gaussian(distance(centerColor, frameColor), u_sigmaColor);
                      totalWeight += spaceWeight * colorWeight;
          
                      newVal += spaceWeight * colorWeight * frameColor;
                  }
              }
              
              newVal /= totalWeight;
              outColor = vec4(centerColor * (1.0 - personMask) + newVal * personMask, 1.0);
          }
      `;
  const [segmentationWidth, segmentationHeight] = INPUT_RESOLUTION_PER_MODEL[segmentationConfig.model];
  const { width: outputWidth, height: outputHeight } = canvas;
  const texelHeight = 1 / outputHeight;
  const texelWidth = 1 / outputWidth;
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
  const program = createPipelineStageProgram(gl, vertexShader, fragmentShader, positionBuffer, texCoordBuffer);
  const inputFrameLocation = gl.getUniformLocation(program, "u_inputFrame");
  const personMaskLocation = gl.getUniformLocation(program, "u_personMask");
  const texelSizeLocation = gl.getUniformLocation(program, "u_texelSize");
  const stepLocation = gl.getUniformLocation(program, "u_step");
  const radiusLocation = gl.getUniformLocation(program, "u_radius");
  const sigmaTexelLocation = gl.getUniformLocation(program, "u_sigmaTexel");
  const sigmaColorLocation = gl.getUniformLocation(program, "u_sigmaColor");
  const outFrameBuffer = gl.createFramebuffer();
  const resultTexture = createTexture(gl, gl.RGBA8, outputWidth, outputHeight);
  gl.bindFramebuffer(gl.FRAMEBUFFER, outFrameBuffer);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, resultTexture, 0);
  gl.useProgram(program);
  gl.uniform1i(personMaskLocation, 1);
  gl.uniform2f(texelSizeLocation, texelWidth, texelHeight);
  updateSigmaSpace(0);
  updateSigmaColor(0);
  updateRadius(RADIUS);
  function render() {
    gl.viewport(0, 0, outputWidth, outputHeight);
    gl.useProgram(program);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, personMaskTexture);
    getAssignedLocationForPreviousResult(gl, inputFrameLocation);
    gl.bindFramebuffer(gl.FRAMEBUFFER, outFrameBuffer);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    return resultTexture;
  }
  function updateSigmaSpace(input) {
    const sigmaSpace = input * Math.max(outputWidth / segmentationWidth, outputHeight / segmentationHeight);
    const sigmaTexel = Math.max(texelWidth, texelHeight) * sigmaSpace;
    gl.useProgram(program);
    gl.uniform1f(sigmaTexelLocation, sigmaTexel);
  }
  function updateSigmaColor(sigmaColor) {
    gl.useProgram(program);
    gl.uniform1f(sigmaColorLocation, sigmaColor);
  }
  function updateRadius(input) {
    const radius = input * Math.max(outputWidth / segmentationWidth, outputHeight / segmentationHeight);
    const sampleSize = 5;
    const step = radius / sampleSize;
    gl.useProgram(program);
    gl.uniform1f(radiusLocation, radius);
    gl.uniform1f(stepLocation, step);
  }
  function cleanUp() {
    gl.deleteTexture(resultTexture);
    gl.deleteFramebuffer(outFrameBuffer);
    gl.deleteProgram(program);
    gl.deleteShader(fragmentShader);
  }
  return { render, updateSigmaSpace, updateSigmaColor, updateRadius, cleanUp };
}

// src/pipelines/webgl2/contrastAdjustmentsStage.ts
function buildContrastAdjustmentsStage(gl, vertexShader, positionBuffer, texCoordBuffer, canvas) {
  const fragmentShaderSource = glsl`#version 300 es

    precision highp float;

    uniform sampler2D u_inputFrame;
    uniform float u_contrastAdjustment;

    in vec2 v_texCoord;

    out vec4 outColor;

    vec3 adjustColorContrast(vec3 frameColor, float contrastAdjustment) {
      return 0.5 + (1.0 + contrastAdjustment) * (frameColor - 0.5);
    }
    
    void main() {
      vec4 frameColor = texture(u_inputFrame, v_texCoord);
      float frameAlpha = frameColor.a;
      
      vec3 updatedFrameContrastColor = adjustColorContrast(frameColor.rgb, u_contrastAdjustment);

      outColor = vec4(updatedFrameContrastColor, frameAlpha);
    }
  `;
  const { width: outputWidth, height: outputHeight } = canvas;
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
  const program = createPipelineStageProgram(gl, vertexShader, fragmentShader, positionBuffer, texCoordBuffer);
  const inputFrameLocation = gl.getUniformLocation(program, "u_inputFrame");
  const contrastAdjustmentLocation = gl.getUniformLocation(program, "u_contrastAdjustment");
  gl.useProgram(program);
  gl.uniform1i(inputFrameLocation, 8);
  const outFrameBuffer = gl.createFramebuffer();
  const resultTexture = createTexture(gl, gl.RGBA8, outputWidth, outputHeight);
  gl.bindFramebuffer(gl.FRAMEBUFFER, outFrameBuffer);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, resultTexture, 0);
  updateContrastAdjustment(0);
  function render() {
    gl.viewport(0, 0, outputWidth, outputHeight);
    gl.useProgram(program);
    gl.bindFramebuffer(gl.FRAMEBUFFER, outFrameBuffer);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    return resultTexture;
  }
  function updateContrastAdjustment(newContrastAdjustment) {
    gl.useProgram(program);
    gl.uniform1f(contrastAdjustmentLocation, newContrastAdjustment);
  }
  function cleanUp() {
    gl.deleteFramebuffer(outFrameBuffer);
    gl.deleteProgram(program);
    gl.deleteShader(fragmentShader);
    gl.deleteShader(vertexShader);
  }
  return {
    cleanUp,
    render,
    updateContrastAdjustment
  };
}

// src/pipelines/webgl2/jointBilateralFilterStage.ts
function buildJointBilateralFilterStage(gl, vertexShader, positionBuffer, texCoordBuffer, inputTexture, segmentationConfig, outputTexture, canvas) {
  const fragmentShaderSource = glsl`#version 300 es

    precision highp float;

    uniform sampler2D u_inputFrame;
    uniform sampler2D u_segmentationMask;
    uniform vec2 u_texelSize;
    uniform float u_step;
    uniform float u_radius;
    uniform float u_offset;
    uniform float u_sigmaTexel;
    uniform float u_sigmaColor;

    in vec2 v_texCoord;

    out vec4 outColor;

    float gaussian(float x, float sigma) {
      float coeff = -0.5 / (sigma * sigma * 4.0 + 1.0e-6);
      return exp((x * x) * coeff);
    }

    void main() {
      vec2 centerCoord = v_texCoord;
      vec3 centerColor = texture(u_inputFrame, centerCoord).rgb;
      float newVal = 0.0;

      float spaceWeight = 0.0;
      float colorWeight = 0.0;
      float totalWeight = 0.0;

      // Subsample kernel space.
      for (float i = -u_radius + u_offset; i <= u_radius; i += u_step) {
        for (float j = -u_radius + u_offset; j <= u_radius; j += u_step) {
          vec2 shift = vec2(j, i) * u_texelSize;
          vec2 coord = vec2(centerCoord + shift);
          vec3 frameColor = texture(u_inputFrame, coord).rgb;
          float outVal = texture(u_segmentationMask, coord).a;

          spaceWeight = gaussian(distance(centerCoord, coord), u_sigmaTexel);
          colorWeight = gaussian(distance(centerColor, frameColor), u_sigmaColor);
          totalWeight += spaceWeight * colorWeight;

          newVal += spaceWeight * colorWeight * outVal;
        }
      }
      newVal /= totalWeight;

      outColor = vec4(vec3(0.0), newVal);
    }
  `;
  const [segmentationWidth, segmentationHeight] = INPUT_RESOLUTION_PER_MODEL[segmentationConfig.model];
  const { width: outputWidth, height: outputHeight } = canvas;
  const texelWidth = 1 / outputWidth;
  const texelHeight = 1 / outputHeight;
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
  const program = createPipelineStageProgram(gl, vertexShader, fragmentShader, positionBuffer, texCoordBuffer);
  const inputFrameLocation = gl.getUniformLocation(program, "u_inputFrame");
  const segmentationMaskLocation = gl.getUniformLocation(program, "u_segmentationMask");
  const texelSizeLocation = gl.getUniformLocation(program, "u_texelSize");
  const stepLocation = gl.getUniformLocation(program, "u_step");
  const radiusLocation = gl.getUniformLocation(program, "u_radius");
  const offsetLocation = gl.getUniformLocation(program, "u_offset");
  const sigmaTexelLocation = gl.getUniformLocation(program, "u_sigmaTexel");
  const sigmaColorLocation = gl.getUniformLocation(program, "u_sigmaColor");
  const frameBuffer = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, outputTexture, 0);
  gl.useProgram(program);
  gl.uniform1i(inputFrameLocation, 0);
  gl.uniform1i(segmentationMaskLocation, 1);
  gl.uniform2f(texelSizeLocation, texelWidth, texelHeight);
  updateSigmaSpace(0);
  updateSigmaColor(0);
  function render() {
    gl.viewport(0, 0, outputWidth, outputHeight);
    gl.useProgram(program);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, inputTexture);
    gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
  function updateSigmaSpace(sigmaSpace) {
    sigmaSpace *= Math.max(outputWidth / segmentationWidth, outputHeight / segmentationHeight);
    const kSparsityFactor = 0.66;
    const step = Math.max(1, Math.sqrt(sigmaSpace) * kSparsityFactor);
    const radius = sigmaSpace;
    const offset = step > 1 ? step * 0.5 : 0;
    const sigmaTexel = Math.max(texelWidth, texelHeight) * sigmaSpace;
    gl.useProgram(program);
    gl.uniform1f(stepLocation, step);
    gl.uniform1f(radiusLocation, radius);
    gl.uniform1f(offsetLocation, offset);
    gl.uniform1f(sigmaTexelLocation, sigmaTexel);
  }
  function updateSigmaColor(sigmaColor) {
    gl.useProgram(program);
    gl.uniform1f(sigmaColorLocation, sigmaColor);
  }
  function cleanUp() {
    gl.deleteFramebuffer(frameBuffer);
    gl.deleteProgram(program);
    gl.deleteShader(fragmentShader);
  }
  return { render, updateSigmaSpace, updateSigmaColor, cleanUp };
}

// src/pipelines/webgl2/loadSegmentationStage.ts
function buildLoadSegmentationStage(gl, vertexShader, positionBuffer, texCoordBuffer, segmentationConfig, segmenter2, outputTexture) {
  const fragmentShaderSource = glsl`#version 300 es

    precision highp float;

    uniform sampler2D u_inputSegmentation;

    in vec2 v_texCoord;

    out vec4 outColor;

    void main() {
      float segmentation = texture(u_inputSegmentation, v_texCoord).r;
      outColor = vec4(vec3(0.0), segmentation);
    }
  `;
  const [segmentationWidth, segmentationHeight] = INPUT_RESOLUTION_PER_MODEL[segmentationConfig.model];
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
  const program = createPipelineStageProgram(gl, vertexShader, fragmentShader, positionBuffer, texCoordBuffer);
  const inputLocation = gl.getUniformLocation(program, "u_inputSegmentation");
  const inputTexture = createTexture(gl, gl.R32F, segmentationWidth, segmentationHeight);
  const frameBuffer = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, outputTexture, 0);
  gl.useProgram(program);
  gl.uniform1i(inputLocation, 1);
  function render() {
    gl.viewport(0, 0, segmentationWidth, segmentationHeight);
    gl.useProgram(program);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, inputTexture);
    gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, segmentationWidth, segmentationHeight, gl.RED, gl.FLOAT, new Float32Array(segmenter2.read()));
    gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
  function cleanUp() {
    gl.deleteFramebuffer(frameBuffer);
    gl.deleteTexture(inputTexture);
    gl.deleteProgram(program);
    gl.deleteShader(fragmentShader);
  }
  return { render, cleanUp };
}

// src/pipelines/webgl2/lowLightAdjustmentsStage.ts
function buildLowLightAdjustmentsStage(gl, vertexShader, positionBuffer, texCoordBuffer, canvas) {
  const fragmentShaderSource = glsl`#version 300 es

    precision highp float;

    uniform sampler2D u_inputFrame;
    uniform float u_brightnessAdjustment;

    in vec2 v_texCoord;

    out vec4 outColor;

    vec3 adjustColorBrightness(vec3 frameColor, float brightnessAdjustment) {
      return frameColor + brightnessAdjustment;
    }
    
    void main() {
      vec4 frameColor = texture(u_inputFrame, v_texCoord);
      float frameAlpha = frameColor.a;

      vec3 updatedFrameBrightnessColor = adjustColorBrightness(frameColor.rgb, u_brightnessAdjustment);

      outColor = vec4(updatedFrameBrightnessColor, frameAlpha);
    }
  `;
  const { width: outputWidth, height: outputHeight } = canvas;
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
  const program = createPipelineStageProgram(gl, vertexShader, fragmentShader, positionBuffer, texCoordBuffer);
  const inputFrameLocation = gl.getUniformLocation(program, "u_inputFrame");
  const brightnessAdjustmentLocation = gl.getUniformLocation(program, "u_brightnessAdjustment");
  gl.useProgram(program);
  gl.uniform1i(inputFrameLocation, 8);
  const outFrameBuffer = gl.createFramebuffer();
  const resultTexture = createTexture(gl, gl.RGBA8, outputWidth, outputHeight);
  gl.bindFramebuffer(gl.FRAMEBUFFER, outFrameBuffer);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, resultTexture, 0);
  updateBrightnessAdjustment(0);
  function render() {
    gl.viewport(0, 0, outputWidth, outputHeight);
    gl.useProgram(program);
    gl.bindFramebuffer(gl.FRAMEBUFFER, outFrameBuffer);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    return resultTexture;
  }
  function updateBrightnessAdjustment(newBrightnessAdjustment) {
    gl.useProgram(program);
    gl.uniform1f(brightnessAdjustmentLocation, newBrightnessAdjustment);
  }
  function cleanUp() {
    gl.deleteFramebuffer(outFrameBuffer);
    gl.deleteProgram(program);
    gl.deleteShader(fragmentShader);
    gl.deleteShader(vertexShader);
  }
  return {
    cleanUp,
    render,
    updateBrightnessAdjustment
  };
}

// src/pipelines/webgl2/resizingStage.ts
function buildResizingStage(gl, vertexShader, positionBuffer, texCoordBuffer, segmentationConfig, segmenter2) {
  const fragmentShaderSource = glsl`#version 300 es

    precision highp float;

    uniform sampler2D u_inputFrame;

    in vec2 v_texCoord;

    out vec4 outColor;

    void main() {
      outColor = texture(u_inputFrame, v_texCoord);
    }
  `;
  const [outputWidth, outputHeight] = INPUT_RESOLUTION_PER_MODEL[segmentationConfig.model];
  const outputPixelCount = outputWidth * outputHeight;
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
  const program = createPipelineStageProgram(gl, vertexShader, fragmentShader, positionBuffer, texCoordBuffer);
  const inputFrameLocation = gl.getUniformLocation(program, "u_inputFrame");
  const outputTexture = createTexture(gl, gl.RGBA8, outputWidth, outputHeight);
  const frameBuffer = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, outputTexture, 0);
  const outputPixels = new Uint8Array(outputPixelCount * 4);
  gl.useProgram(program);
  gl.uniform1i(inputFrameLocation, 0);
  async function render() {
    gl.viewport(0, 0, outputWidth, outputHeight);
    gl.useProgram(program);
    gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    await readPixelsAsync(gl, 0, 0, outputWidth, outputHeight, gl.RGBA, gl.UNSIGNED_BYTE, outputPixels);
    segmenter2.write(outputPixels);
  }
  function cleanUp() {
    gl.deleteFramebuffer(frameBuffer);
    gl.deleteTexture(outputTexture);
    gl.deleteProgram(program);
    gl.deleteShader(fragmentShader);
  }
  return { render, cleanUp };
}

// src/pipelines/webgl2/softmaxStage.ts
function buildSoftmaxStage(gl, vertexShader, positionBuffer, texCoordBuffer, segmentationConfig, segmenter2, outputTexture) {
  const fragmentShaderSource = glsl`#version 300 es

    precision highp float;

    uniform sampler2D u_inputSegmentation;

    in vec2 v_texCoord;

    out vec4 outColor;

    void main() {
      vec2 segmentation = texture(u_inputSegmentation, v_texCoord).rg;
      float shift = max(segmentation.r, segmentation.g);
      float backgroundExp = exp(segmentation.r - shift);
      float personExp = exp(segmentation.g - shift);
      outColor = vec4(vec3(0.0), personExp / (backgroundExp + personExp));
    }
  `;
  const [segmentationWidth, segmentationHeight] = INPUT_RESOLUTION_PER_MODEL[segmentationConfig.model];
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
  const program = createPipelineStageProgram(gl, vertexShader, fragmentShader, positionBuffer, texCoordBuffer);
  const inputLocation = gl.getUniformLocation(program, "u_inputSegmentation");
  const inputTexture = createTexture(gl, gl.RG32F, segmentationWidth, segmentationHeight);
  const frameBuffer = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, outputTexture, 0);
  gl.useProgram(program);
  gl.uniform1i(inputLocation, 1);
  function render() {
    gl.viewport(0, 0, segmentationWidth, segmentationHeight);
    gl.useProgram(program);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, inputTexture);
    gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, segmentationWidth, segmentationHeight, gl.RG, gl.FLOAT, new Float32Array(segmenter2.read()));
    gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
  function cleanUp() {
    gl.deleteFramebuffer(frameBuffer);
    gl.deleteTexture(inputTexture);
    gl.deleteProgram(program);
    gl.deleteShader(fragmentShader);
  }
  return { render, cleanUp };
}

// src/pipelines/webgl2/writeTextureToCanvasStage.ts
function writeTextureToCanvasStage(gl, positionBuffer, texCoordBuffer, canvas) {
  const vertexShaderSource = glsl`#version 300 es
        in vec2 a_position;
        in vec2 a_texCoord;

        out vec2 v_texCoord;

        void main() {
            // Flipping Y is required when rendering to canvas
            // TODO: Revert this comment when we completely move over to the V2 pipeline.
            // Background image stage for the old version already flips it
            // gl_Position = vec4(a_position * vec2(1.0, -1.0), 0.0, 1.0);
            gl_Position = vec4(a_position, 0.0, 1.0);
            v_texCoord = a_texCoord;
        }
    `;
  const fragmentShaderSource = glsl`#version 300 es
        precision highp float;

        uniform sampler2D u_previousResult;
        in vec2 v_texCoord;

        out vec4 outColor;

        void main() {
            outColor = texture(u_previousResult, v_texCoord).rgba;
        }
    `;
  const { width: outputWidth, height: outputHeight } = canvas;
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
  const program = createPipelineStageProgram(gl, vertexShader, fragmentShader, positionBuffer, texCoordBuffer);
  const previousLocation = gl.getUniformLocation(program, "u_previousResult");
  function render() {
    gl.viewport(0, 0, outputWidth, outputHeight);
    gl.useProgram(program);
    getAssignedLocationForPreviousResult(gl, previousLocation);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    return null;
  }
  function cleanUp() {
    gl.deleteProgram(program);
    gl.deleteShader(fragmentShader);
  }
  return { render, cleanUp };
}

// src/pipelines/webgl2/webgl2PipelineSequential.ts
function buildWebGL2PipelineSequentialStaging(frameProvider, backgroundConfig, segmentationConfig, canvas, segmenter2, addFrameEvent, withBlemishSmoothing, withLowLightAdjustments, withContrastAdjustments) {
  const stagesToExecute = [];
  const frontCanvas = canvas.getContext("2d");
  const backCanvas = new OffscreenCanvas(canvas.width, canvas.height);
  const vertexShaderSource = glsl`#version 300 es

    in vec2 a_position;
    in vec2 a_texCoord;

    out vec2 v_texCoord;

    void main() {
      gl_Position = vec4(a_position, 0.0, 1.0);
      v_texCoord = a_texCoord;
    }
  `;
  const { width: frameWidth, height: frameHeight } = frameProvider;
  const [segmentationWidth, segmentationHeight] = INPUT_RESOLUTION_PER_MODEL[segmentationConfig.model];
  const gl = backCanvas.getContext("webgl2");
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const vertexArray = gl.createVertexArray();
  gl.bindVertexArray(vertexArray);
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const texCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]), gl.STATIC_DRAW);
  const inputFrameTexture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, inputFrameTexture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  const segmentationTexture = createTexture(gl, gl.RGBA8, segmentationWidth, segmentationHeight);
  const personMaskTexture = createTexture(gl, gl.RGBA8, frameWidth, frameHeight);
  let partialStageResult;
  const resizingStage = buildResizingStage(gl, vertexShader, positionBuffer, texCoordBuffer, segmentationConfig, segmenter2);
  const loadSegmentationStage = segmentationConfig.model.startsWith("meet") ? buildSoftmaxStage(gl, vertexShader, positionBuffer, texCoordBuffer, segmentationConfig, segmenter2, segmentationTexture) : buildLoadSegmentationStage(gl, vertexShader, positionBuffer, texCoordBuffer, segmentationConfig, segmenter2, segmentationTexture);
  const jointBilateralFilterStage = buildJointBilateralFilterStage(gl, vertexShader, positionBuffer, texCoordBuffer, segmentationTexture, segmentationConfig, personMaskTexture, backCanvas);
  const backgroundStage = backgroundConfig.type === "blur" ? buildBackgroundBlurStage(gl, vertexShader, positionBuffer, texCoordBuffer, personMaskTexture, backCanvas) : buildBackgroundImageStage(gl, positionBuffer, texCoordBuffer, personMaskTexture, backgroundConfig.url || null, backCanvas);
  const lowLightAdjustmentsStage = withLowLightAdjustments ? buildLowLightAdjustmentsStage(gl, vertexShader, positionBuffer, texCoordBuffer, backCanvas) : null;
  const contrastAdjustmentsStage = withContrastAdjustments ? buildContrastAdjustmentsStage(gl, vertexShader, positionBuffer, texCoordBuffer, backCanvas) : null;
  const blemishSmoothingStage = withBlemishSmoothing ? buildBlemishSmoothingStage(gl, positionBuffer, texCoordBuffer, personMaskTexture, backCanvas, segmentationConfig) : null;
  stagesToExecute.push(...[
    lowLightAdjustmentsStage,
    contrastAdjustmentsStage,
    blemishSmoothingStage,
    {
      render: backgroundStage.renderToTexture,
      cleanUp: backgroundStage.cleanUp
    },
    writeTextureToCanvasStage(gl, positionBuffer, texCoordBuffer, canvas)
  ]);
  async function render() {
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, inputFrameTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, await frameProvider.readBitmap());
    gl.bindVertexArray(vertexArray);
    await resizingStage.render();
    addFrameEvent();
    segmenter2.run();
    addFrameEvent();
    loadSegmentationStage.render();
    jointBilateralFilterStage.render();
    allocateUnitForPreviousTexture(gl, inputFrameTexture);
    stagesToExecute.forEach((stage) => {
      partialStageResult = stage == null ? void 0 : stage.render();
      if (partialStageResult) {
        allocateUnitForPreviousTexture(gl, partialStageResult);
      }
    });
    frontCanvas.drawImage(backCanvas, 0, 0);
  }
  function updatePostProcessingConfig(postProcessingConfig) {
    var _a, _b;
    jointBilateralFilterStage.updateSigmaSpace(postProcessingConfig.jointBilateralFilter.sigmaSpace);
    jointBilateralFilterStage.updateSigmaColor(postProcessingConfig.jointBilateralFilter.sigmaColor);
    (_a = blemishSmoothingStage == null ? void 0 : blemishSmoothingStage.updateSigmaSpace) == null ? void 0 : _a.call(blemishSmoothingStage, postProcessingConfig.blemishSmoothingFilter.sigmaSpace);
    (_b = blemishSmoothingStage == null ? void 0 : blemishSmoothingStage.updateSigmaColor) == null ? void 0 : _b.call(blemishSmoothingStage, postProcessingConfig.blemishSmoothingFilter.sigmaColor);
    if (backgroundConfig.type === "image") {
      const backgroundImageStage = backgroundStage;
      backgroundImageStage.updateCoverage(postProcessingConfig.coverage);
      backgroundImageStage.updateLightWrapping(postProcessingConfig.lightWrapping);
      backgroundImageStage.updateBlendMode(postProcessingConfig.blendMode);
    } else if (backgroundConfig.type === "blur") {
      const backgroundBlurStage = backgroundStage;
      backgroundBlurStage.updateCoverage(postProcessingConfig.coverage);
    } else {
      const backgroundImageStage = backgroundStage;
      backgroundImageStage.updateCoverage([0, 0.9999]);
      backgroundImageStage.updateLightWrapping(0);
    }
  }
  function updateBrightnessAdjustment(brightnessAdjustment) {
    var _a, _b;
    if (withLowLightAdjustments) {
      (_a = lowLightAdjustmentsStage == null ? void 0 : lowLightAdjustmentsStage.updateBrightnessAdjustment) == null ? void 0 : _a.call(lowLightAdjustmentsStage, brightnessAdjustment);
    }
    if (withContrastAdjustments) {
      (_b = contrastAdjustmentsStage == null ? void 0 : contrastAdjustmentsStage.updateContrastAdjustment) == null ? void 0 : _b.call(contrastAdjustmentsStage, BRIGHTNESS_TO_CONTRAST_RATIO * brightnessAdjustment);
    }
  }
  function cleanUp() {
    stagesToExecute.forEach((stage) => stage == null ? void 0 : stage.cleanUp());
    jointBilateralFilterStage.cleanUp();
    loadSegmentationStage.cleanUp();
    resizingStage.cleanUp();
    gl.deleteTexture(personMaskTexture);
    gl.deleteTexture(segmentationTexture);
    gl.deleteTexture(inputFrameTexture);
    partialStageResult && gl.deleteTexture(partialStageResult);
    gl.deleteBuffer(texCoordBuffer);
    gl.deleteBuffer(positionBuffer);
    gl.deleteVertexArray(vertexArray);
    gl.deleteShader(vertexShader);
  }
  return {
    render,
    updateBrightnessAdjustment,
    updatePostProcessingConfig,
    cleanUp
  };
}

// src/pipelines/webgl2/webgl2Pipeline.ts
function buildWebGL2Pipeline(frameProvider, backgroundConfig, segmentationConfig, canvas, segmenter2, addFrameEvent) {
  const frontCanvas = canvas.getContext("2d");
  const backCanvas = new OffscreenCanvas(canvas.width, canvas.height);
  const vertexShaderSource = glsl`#version 300 es

    in vec2 a_position;
    in vec2 a_texCoord;

    out vec2 v_texCoord;

    void main() {
      gl_Position = vec4(a_position, 0.0, 1.0);
      v_texCoord = a_texCoord;
    }
  `;
  const { width: frameWidth, height: frameHeight } = frameProvider;
  const [segmentationWidth, segmentationHeight] = INPUT_RESOLUTION_PER_MODEL[segmentationConfig.model];
  const gl = backCanvas.getContext("webgl2");
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const vertexArray = gl.createVertexArray();
  gl.bindVertexArray(vertexArray);
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const texCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]), gl.STATIC_DRAW);
  const inputFrameTexture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, inputFrameTexture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  const segmentationTexture = createTexture(gl, gl.RGBA8, segmentationWidth, segmentationHeight);
  const personMaskTexture = createTexture(gl, gl.RGBA8, frameWidth, frameHeight);
  const resizingStage = buildResizingStage(gl, vertexShader, positionBuffer, texCoordBuffer, segmentationConfig, segmenter2);
  const loadSegmentationStage = segmentationConfig.model.startsWith("meet") ? buildSoftmaxStage(gl, vertexShader, positionBuffer, texCoordBuffer, segmentationConfig, segmenter2, segmentationTexture) : buildLoadSegmentationStage(gl, vertexShader, positionBuffer, texCoordBuffer, segmentationConfig, segmenter2, segmentationTexture);
  const jointBilateralFilterStage = buildJointBilateralFilterStage(gl, vertexShader, positionBuffer, texCoordBuffer, segmentationTexture, segmentationConfig, personMaskTexture, backCanvas);
  const backgroundStage = backgroundConfig.type === "blur" ? buildBackgroundBlurStage(gl, vertexShader, positionBuffer, texCoordBuffer, personMaskTexture, backCanvas) : buildBackgroundImageStage(gl, positionBuffer, texCoordBuffer, personMaskTexture, backgroundConfig.url || null, backCanvas);
  async function render() {
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, inputFrameTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, await frameProvider.readBitmap());
    gl.bindVertexArray(vertexArray);
    await resizingStage.render();
    addFrameEvent();
    segmenter2.run();
    addFrameEvent();
    loadSegmentationStage.render();
    jointBilateralFilterStage.render();
    backgroundStage.render();
    frontCanvas.drawImage(backCanvas, 0, 0);
  }
  function updatePostProcessingConfig(postProcessingConfig) {
    jointBilateralFilterStage.updateSigmaSpace(postProcessingConfig.jointBilateralFilter.sigmaSpace);
    jointBilateralFilterStage.updateSigmaColor(postProcessingConfig.jointBilateralFilter.sigmaColor);
    if (backgroundConfig.type === "image") {
      const backgroundImageStage = backgroundStage;
      backgroundImageStage.updateCoverage(postProcessingConfig.coverage);
      backgroundImageStage.updateLightWrapping(postProcessingConfig.lightWrapping);
      backgroundImageStage.updateBlendMode(postProcessingConfig.blendMode);
    } else if (backgroundConfig.type === "blur") {
      const backgroundBlurStage = backgroundStage;
      backgroundBlurStage.updateCoverage(postProcessingConfig.coverage);
    } else {
      const backgroundImageStage = backgroundStage;
      backgroundImageStage.updateCoverage([0, 0.9999]);
      backgroundImageStage.updateLightWrapping(0);
    }
  }
  function cleanUp() {
    backgroundStage.cleanUp();
    jointBilateralFilterStage.cleanUp();
    loadSegmentationStage.cleanUp();
    resizingStage.cleanUp();
    gl.deleteTexture(personMaskTexture);
    gl.deleteTexture(segmentationTexture);
    gl.deleteTexture(inputFrameTexture);
    gl.deleteBuffer(texCoordBuffer);
    gl.deleteBuffer(positionBuffer);
    gl.deleteVertexArray(vertexArray);
    gl.deleteShader(vertexShader);
  }
  return { render, updatePostProcessingConfig, cleanUp };
}

// src/core/helpers/backgroundHelper.ts
var createPixelGif = (() => {
  const keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  return function createPixelGIF(hexColor) {
    return "data:image/gif;base64,R0lGODlhAQABAPAA" + encodeHex(hexColor) + "/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==";
  };
  function encodeHex(hexColor) {
    let s = hexColor.substring(1, 7);
    if (s.length < 6) {
      s = s[0] + s[0] + s[1] + s[1] + s[2] + s[2];
    }
    const rgb = [
      parseInt(s[0] + s[1], 16),
      parseInt(s[2] + s[3], 16),
      parseInt(s[4] + s[5], 16)
    ];
    return encodeRGB(rgb[0], rgb[1], rgb[2]);
  }
  function encodeRGB(r, g, b) {
    return encode_triplet(0, r, g) + encode_triplet(b, 255, 255);
  }
  function encode_triplet(e1, e2, e3) {
    const enc1 = e1 >> 2;
    const enc2 = (e1 & 3) << 4 | e2 >> 4;
    const enc3 = (e2 & 15) << 2 | e3 >> 6;
    const enc4 = e3 & 63;
    return keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
  }
})();
function toBackgroundConfig(background, customSettings) {
  if (!background || background.type === "none") {
    return { type: "none" };
  }
  const imageUrl = (customSettings == null ? void 0 : customSettings.bgUrl) || (background == null ? void 0 : background.url);
  if (background.type === "image" && imageUrl) {
    return {
      type: "image",
      url: imageUrl
    };
  }
  const bgColor = (customSettings == null ? void 0 : customSettings.bgColor) || (background == null ? void 0 : background.color);
  if (background.type === "color" && bgColor) {
    return {
      type: "image",
      url: createPixelGif(bgColor)
    };
  }
  if (background.type === "blur") {
    return {
      type: "blur"
    };
  }
  return { type: "none" };
}

// src/worker/server.ts
var FPS_REPORT_INTERVAL_MS = 1e3;
var MAX_FPS_CAP = 30;
var RequestChannel = class {
  constructor(port) {
    this.port = port;
    this.pendingRequests = {};
    this.requestCb = {};
    port.onmessage = (event) => {
      const maybeCb = this.requestCb[event.data.type];
      if (maybeCb) {
        maybeCb(event.data);
      }
      this.fulfillPendingRequest(event);
    };
  }
  on(type, cb) {
    this.requestCb[type] = cb;
  }
  send(args) {
    const maybeAlreadyPending = args.responseType && this.pendingRequests[args.responseType];
    if (maybeAlreadyPending) {
      return maybeAlreadyPending.promise;
    }
    this.port.postMessage(__spreadValues({
      type: args.requestType
    }, typeof args.data === "object" ? args.data : {}));
    const self2 = this;
    let pendingResolve;
    let pendingReject;
    const pending = new Promise((resolve, reject) => {
      pendingResolve = resolve;
      pendingReject = reject;
    });
    if (args.responseType) {
      self2.pendingRequests[args.responseType] = {
        promise: pending,
        resolve: pendingResolve,
        reject: pendingReject
      };
    }
    return pending;
  }
  fulfillPendingRequest(event) {
    const type = event.data.type;
    const pendingRequest = this.pendingRequests[type];
    if (!pendingRequest) {
      return;
    }
    pendingRequest.resolve(event.data);
    this.pendingRequests[type] = void 0;
  }
};
var RenderingLoop = class {
  constructor(pipeline, requestChannel) {
    this.pipeline = pipeline;
    this.requestChannel = requestChannel;
    this.frameCount = 0;
    this.previousTimeMs = Date.now();
    this.stopped = false;
  }
  start() {
    this.render();
  }
  stop() {
    this.stopped = true;
    this.pipeline.cleanUp();
  }
  updateBrightnessAdjustment(brightnessAdjustment) {
    var _a, _b;
    (_b = (_a = this.pipeline) == null ? void 0 : _a.updateBrightnessAdjustment) == null ? void 0 : _b.call(_a, brightnessAdjustment);
  }
  endFrame() {
    const time = Date.now();
    this.frameCount++;
    if (time >= this.previousTimeMs + FPS_REPORT_INTERVAL_MS) {
      const fps = Math.round(this.frameCount * FPS_REPORT_INTERVAL_MS / (time - this.previousTimeMs));
      this.requestChannel.send({
        requestType: "report-fps",
        data: {
          fps
        }
      });
      this.previousTimeMs = time;
      this.frameCount = 0;
    }
  }
  async render() {
    if (this.stopped) {
      return;
    }
    let delayMs = Math.round(1e3 / MAX_FPS_CAP);
    const start = performance.now();
    await this.pipeline.render();
    this.endFrame();
    delayMs = Math.max(0, delayMs - (performance.now() - start));
    setTimeout(async () => {
      await this.render();
    }, delayMs);
  }
};
var WorkerServer = class {
  constructor(args) {
    this.args = args;
    this.adjustmentIntervalId = null;
    this.brightnessAdjustment = 0;
    this.previousBrightnessPercentage = -Infinity;
    const {
      background,
      segmentationConfig,
      postProcessingConfig,
      segmenter: segmenter2,
      renderTarget,
      requestChannel,
      sourceInfo,
      useV2SequentialPipeline,
      withContrastAdjustments,
      withLowLightAdjustments
    } = args;
    const frameProvider = this.createFrameProvider(sourceInfo);
    const pipeline = useV2SequentialPipeline ? buildWebGL2PipelineSequentialStaging(frameProvider, toBackgroundConfig(background), segmentationConfig, renderTarget, segmenter2, () => {
    }, false, withLowLightAdjustments, withContrastAdjustments) : buildWebGL2Pipeline(frameProvider, toBackgroundConfig(background), segmentationConfig, renderTarget, segmenter2, () => {
    });
    pipeline.updatePostProcessingConfig(postProcessingConfig);
    this.requestChannel = requestChannel;
    this.renderingLoop = new RenderingLoop(pipeline, this.requestChannel);
    this.requestChannel.on("stop", this.stop.bind(this));
    if (withLowLightAdjustments) {
      this.createAdjustmentIntervalId(frameProvider, postProcessingConfig.brightnessThresholds);
    }
  }
  start() {
    this.renderingLoop.start();
  }
  stop() {
    this.renderingLoop.stop();
  }
  rebuild(args) {
    const {
      background,
      postProcessingConfig,
      useV2SequentialPipeline,
      withContrastAdjustments,
      withLowLightAdjustments
    } = args;
    this.stop();
    this.clearAdjustmentInterval();
    return new WorkerServer(__spreadProps(__spreadValues({}, this.args), {
      background: background || this.args.background,
      postProcessingConfig: postProcessingConfig || this.args.postProcessingConfig,
      useV2SequentialPipeline: typeof useV2SequentialPipeline === "boolean" ? useV2SequentialPipeline : this.args.useV2SequentialPipeline,
      withContrastAdjustments: typeof withContrastAdjustments === "boolean" ? withContrastAdjustments : this.args.withContrastAdjustments,
      withLowLightAdjustments: typeof withLowLightAdjustments === "boolean" ? withLowLightAdjustments : this.args.withLowLightAdjustments
    }));
  }
  clearAdjustmentInterval() {
    if (this.adjustmentIntervalId) {
      clearInterval(this.adjustmentIntervalId);
      this.adjustmentIntervalId = null;
      this.previousBrightnessPercentage = -Infinity;
      this.brightnessAdjustment = 0;
    }
  }
  createAdjustmentIntervalId(frameProvider, brightnessThresholds) {
    this.clearAdjustmentInterval();
    const adjustmentIntervalId = setInterval(async () => {
      const frame = await frameProvider.readArrayBuffer();
      const newBrightnessPercentage = calculateBrightnessPercentage(frame);
      const { increment: newBrightnessAdjustment } = getCurrentBrightnessAdjustment(newBrightnessPercentage, brightnessThresholds);
      if (newBrightnessAdjustment !== this.brightnessAdjustment && shouldUpdateBrightnessAdjustmentRelativeToLastUpdate(newBrightnessPercentage, this.previousBrightnessPercentage)) {
        this.previousBrightnessPercentage = newBrightnessPercentage;
        this.brightnessAdjustment = newBrightnessAdjustment;
        this.renderingLoop.updateBrightnessAdjustment(newBrightnessAdjustment);
      }
    }, LOW_LIGHT_TIMEOUT_MS);
    this.adjustmentIntervalId = adjustmentIntervalId;
  }
  createFrameProvider(sourceInfo) {
    return {
      readBitmap: async () => {
        return (await this.requestChannel.send({
          requestType: "pull-frame-bitmap",
          responseType: "push-frame-bitmap",
          onReject: (e) => {
            this.requestChannel.send({
              requestType: "error",
              data: { error: e }
            });
            this.stop();
            return createImageBitmap(new ImageData(sourceInfo.width, sourceInfo.height));
          }
        })).frame;
      },
      readArrayBuffer: async () => {
        return new Uint8ClampedArray((await this.requestChannel.send({
          requestType: "pull-frame-array-buffer",
          responseType: "push-frame-array-buffer",
          onReject: (e) => {
            this.requestChannel.send({
              requestType: "error",
              data: { error: e }
            });
            this.stop();
            return new Uint8ClampedArray(sourceInfo.width * sourceInfo.height * 4);
          }
        })).frame);
      },
      width: sourceInfo.width,
      height: sourceInfo.height
    };
  }
};
var segmenter = null;
var server = null;
self.onconnect = function(event) {
  let lastSegmentationConfig = buildSegmentationConfig({});
  segmenter = segmenter != null ? segmenter : buildSegmenter(lastSegmentationConfig);
  const port = event.ports[0];
  const requestChannel = new RequestChannel(port);
  requestChannel.on("set-render-target", async (args) => {
    if (!segmenter) {
      throw new Error("failed to create segmenter");
    }
    if (JSON.stringify(lastSegmentationConfig) !== JSON.stringify(args.background.segmentationConfig)) {
      lastSegmentationConfig = args.background.segmentationConfig;
      segmenter = buildSegmenter(lastSegmentationConfig);
    }
    server && server.clearAdjustmentInterval();
    server && server.stop();
    server = new WorkerServer({
      background: args.background.selected,
      segmentationConfig: args.background.segmentationConfig,
      postProcessingConfig: args.background.postProcessingConfig,
      segmenter: await segmenter,
      renderTarget: args.renderTarget,
      requestChannel,
      sourceInfo: args.sourceInfo,
      withContrastAdjustments: args.featureFlags.withContrastAdjustments,
      withLowLightAdjustments: args.featureFlags.withLowLightAdjustments,
      useV2SequentialPipeline: args.featureFlags.useV2SequentialPipeline
    });
    server.start();
  });
  requestChannel.on("set-background-settings", (args) => {
    if (!server) {
      requestChannel.send({
        requestType: "error",
        data: {
          message: "Invalid request, server hasn't been initialized yet"
        }
      });
      return;
    }
    server = server.rebuild(args);
    server.start();
  });
  requestChannel.on("set-post-processing-config", (args) => {
    if (!server) {
      requestChannel.send({
        requestType: "error",
        data: {
          message: "Invalid request, server hasn't been initialized yet"
        }
      });
      return;
    }
    server = server.rebuild(args);
    server.start();
  });
  requestChannel.on("set-worker-state", (args) => {
    if (!server) {
      requestChannel.send({
        requestType: "error",
        data: {
          message: "Invalid request, server hasn't been initialized yet"
        }
      });
      return;
    }
    server = server.rebuild(args);
    server.start();
  });
};
//# sourceMappingURL=server.js.map
