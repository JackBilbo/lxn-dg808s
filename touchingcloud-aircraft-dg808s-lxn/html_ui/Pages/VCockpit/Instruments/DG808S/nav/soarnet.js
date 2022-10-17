"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e103) { throw _e103; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e104) { didErr = true; err = _e104; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

/*! For license information please see main.js.LICENSE.txt */
(function () {
  "use strict";

  var _M, _se;

  !function () {
    if ("object" == (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis))) return globalThis;

    try {
      this || new Function("return this")();
    } catch (e) {
      if ("object" == (typeof window === "undefined" ? "undefined" : _typeof(window))) return window;
    }
  }();

  var e = function e(_e2, n) {
    if (!_e2) throw t(n);
  },
      t = function t(e) {
    return new Error("Firebase Database (${JSCORE_VERSION}) INTERNAL ASSERT FAILED: " + e);
  },
      n = function n(e) {
    var t = [];
    var n = 0;

    for (var _i2 = 0; _i2 < e.length; _i2++) {
      var _s2 = e.charCodeAt(_i2);

      _s2 < 128 ? t[n++] = _s2 : _s2 < 2048 ? (t[n++] = _s2 >> 6 | 192, t[n++] = 63 & _s2 | 128) : 55296 == (64512 & _s2) && _i2 + 1 < e.length && 56320 == (64512 & e.charCodeAt(_i2 + 1)) ? (_s2 = 65536 + ((1023 & _s2) << 10) + (1023 & e.charCodeAt(++_i2)), t[n++] = _s2 >> 18 | 240, t[n++] = _s2 >> 12 & 63 | 128, t[n++] = _s2 >> 6 & 63 | 128, t[n++] = 63 & _s2 | 128) : (t[n++] = _s2 >> 12 | 224, t[n++] = _s2 >> 6 & 63 | 128, t[n++] = 63 & _s2 | 128);
    }

    return t;
  },
      i = {
    byteToCharMap_: null,
    charToByteMap_: null,
    byteToCharMapWebSafe_: null,
    charToByteMapWebSafe_: null,
    ENCODED_VALS_BASE: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",

    get ENCODED_VALS() {
      return this.ENCODED_VALS_BASE + "+/=";
    },

    get ENCODED_VALS_WEBSAFE() {
      return this.ENCODED_VALS_BASE + "-_.";
    },

    HAS_NATIVE_SUPPORT: "function" == typeof atob,
    encodeByteArray: function encodeByteArray(e, t) {
      if (!Array.isArray(e)) throw Error("encodeByteArray takes an array as a parameter");
      this.init_();
      var n = t ? this.byteToCharMapWebSafe_ : this.byteToCharMap_,
          i = [];

      for (var _t2 = 0; _t2 < e.length; _t2 += 3) {
        var _s3 = e[_t2],
            _r2 = _t2 + 1 < e.length,
            _o = _r2 ? e[_t2 + 1] : 0,
            _a = _t2 + 2 < e.length,
            _l = _a ? e[_t2 + 2] : 0,
            _h = _s3 >> 2,
            _c = (3 & _s3) << 4 | _o >> 4;

        var _u = (15 & _o) << 2 | _l >> 6,
            _d = 63 & _l;

        _a || (_d = 64, _r2 || (_u = 64)), i.push(n[_h], n[_c], n[_u], n[_d]);
      }

      return i.join("");
    },
    encodeString: function encodeString(e, t) {
      return this.HAS_NATIVE_SUPPORT && !t ? btoa(e) : this.encodeByteArray(n(e), t);
    },
    decodeString: function decodeString(e, t) {
      return this.HAS_NATIVE_SUPPORT && !t ? atob(e) : function (e) {
        var t = [];
        var n = 0,
            i = 0;

        for (; n < e.length;) {
          var _s4 = e[n++];
          if (_s4 < 128) t[i++] = String.fromCharCode(_s4);else if (_s4 > 191 && _s4 < 224) {
            var _r3 = e[n++];
            t[i++] = String.fromCharCode((31 & _s4) << 6 | 63 & _r3);
          } else if (_s4 > 239 && _s4 < 365) {
            var _r4 = ((7 & _s4) << 18 | (63 & e[n++]) << 12 | (63 & e[n++]) << 6 | 63 & e[n++]) - 65536;

            t[i++] = String.fromCharCode(55296 + (_r4 >> 10)), t[i++] = String.fromCharCode(56320 + (1023 & _r4));
          } else {
            var _r5 = e[n++],
                _o2 = e[n++];
            t[i++] = String.fromCharCode((15 & _s4) << 12 | (63 & _r5) << 6 | 63 & _o2);
          }
        }

        return t.join("");
      }(this.decodeStringToByteArray(e, t));
    },
    decodeStringToByteArray: function decodeStringToByteArray(e, t) {
      this.init_();
      var n = t ? this.charToByteMapWebSafe_ : this.charToByteMap_,
          i = [];

      for (var _t3 = 0; _t3 < e.length;) {
        var _s5 = n[e.charAt(_t3++)],
            _r6 = _t3 < e.length ? n[e.charAt(_t3)] : 0;

        ++_t3;

        var _o3 = _t3 < e.length ? n[e.charAt(_t3)] : 64;

        ++_t3;

        var _a2 = _t3 < e.length ? n[e.charAt(_t3)] : 64;

        if (++_t3, null == _s5 || null == _r6 || null == _o3 || null == _a2) throw Error();

        var _l2 = _s5 << 2 | _r6 >> 4;

        if (i.push(_l2), 64 !== _o3) {
          var _e3 = _r6 << 4 & 240 | _o3 >> 2;

          if (i.push(_e3), 64 !== _a2) {
            var _e4 = _o3 << 6 & 192 | _a2;

            i.push(_e4);
          }
        }
      }

      return i;
    },
    init_: function init_() {
      if (!this.byteToCharMap_) {
        this.byteToCharMap_ = {}, this.charToByteMap_ = {}, this.byteToCharMapWebSafe_ = {}, this.charToByteMapWebSafe_ = {};

        for (var _e5 = 0; _e5 < this.ENCODED_VALS.length; _e5++) {
          this.byteToCharMap_[_e5] = this.ENCODED_VALS.charAt(_e5), this.charToByteMap_[this.byteToCharMap_[_e5]] = _e5, this.byteToCharMapWebSafe_[_e5] = this.ENCODED_VALS_WEBSAFE.charAt(_e5), this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[_e5]] = _e5, _e5 >= this.ENCODED_VALS_BASE.length && (this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(_e5)] = _e5, this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(_e5)] = _e5);
        }
      }
    }
  },
      s = function s(e) {
    var t = n(e);
    return i.encodeByteArray(t, !0);
  },
      r = function r(e) {
    return s(e).replace(/\./g, "");
  },
      o = function o(e) {
    try {
      return i.decodeString(e, !0);
    } catch (e) {
      console.error("base64Decode failed: ", e);
    }

    return null;
  };

  function a(e) {
    return l(void 0, e);
  }

  function l(e, t) {
    if (!(t instanceof Object)) return t;

    switch (t.constructor) {
      case Date:
        return new Date(t.getTime());

      case Object:
        void 0 === e && (e = {});
        break;

      case Array:
        e = [];
        break;

      default:
        return t;
    }

    for (var _n2 in t) {
      t.hasOwnProperty(_n2) && "__proto__" !== _n2 && (e[_n2] = l(e[_n2], t[_n2]));
    }

    return e;
  }

  var h = /*#__PURE__*/function () {
    function h() {
      var _this = this;

      _classCallCheck(this, h);

      this.reject = function () {}, this.resolve = function () {}, this.promise = new Promise(function (e, t) {
        _this.resolve = e, _this.reject = t;
      });
    }

    _createClass(h, [{
      key: "wrapCallback",
      value: function wrapCallback(e) {
        var _this2 = this;

        return function (t, n) {
          t ? _this2.reject(t) : _this2.resolve(n), "function" == typeof e && (_this2.promise["catch"](function () {}), 1 === e.length ? e(t) : e(t, n));
        };
      }
    }]);

    return h;
  }();

  function c() {
    return "undefined" != typeof window && !!(window.cordova || window.phonegap || window.PhoneGap) && /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test("undefined" != typeof navigator && "string" == typeof navigator.userAgent ? navigator.userAgent : "");
  }

  var u = /*#__PURE__*/function (_Error) {
    _inherits(u, _Error);

    var _super = _createSuper(u);

    function u(e, t, n) {
      var _this3;

      _classCallCheck(this, u);

      _this3 = _super.call(this, t), _this3.code = e, _this3.customData = n, _this3.name = "FirebaseError", Object.setPrototypeOf(_assertThisInitialized(_this3), u.prototype), Error.captureStackTrace && Error.captureStackTrace(_assertThisInitialized(_this3), d.prototype.create);
      return _this3;
    }

    return _createClass(u);
  }( /*#__PURE__*/_wrapNativeSuper(Error));

  var d = /*#__PURE__*/function () {
    function d(e, t, n) {
      _classCallCheck(this, d);

      this.service = e, this.serviceName = t, this.errors = n;
    }

    _createClass(d, [{
      key: "create",
      value: function create(e) {
        var n = (arguments.length <= 1 ? undefined : arguments[1]) || {},
            i = "".concat(this.service, "/").concat(e),
            s = this.errors[e],
            r = s ? function (e, t) {
          return e.replace(p, function (e, n) {
            var i = t[n];
            return null != i ? String(i) : "<".concat(n, "?>");
          });
        }(s, n) : "Error",
            o = "".concat(this.serviceName, ": ").concat(r, " (").concat(i, ").");
        return new u(i, o, n);
      }
    }]);

    return d;
  }();

  var p = /\{\$([^}]+)}/g;

  function _(e) {
    return JSON.parse(e);
  }

  function f(e) {
    return JSON.stringify(e);
  }

  var g = function g(e) {
    var t = {},
        n = {},
        i = {},
        s = "";

    try {
      var _r7 = e.split(".");

      t = _(o(_r7[0]) || ""), n = _(o(_r7[1]) || ""), s = _r7[2], i = n.d || {}, delete n.d;
    } catch (e) {}

    return {
      header: t,
      claims: n,
      data: i,
      signature: s
    };
  };

  function m(e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }

  function y(e, t) {
    return Object.prototype.hasOwnProperty.call(e, t) ? e[t] : void 0;
  }

  function v(e) {
    for (var _t4 in e) {
      if (Object.prototype.hasOwnProperty.call(e, _t4)) return !1;
    }

    return !0;
  }

  function C(e, t, n) {
    var i = {};

    for (var _s6 in e) {
      Object.prototype.hasOwnProperty.call(e, _s6) && (i[_s6] = t.call(n, e[_s6], _s6, e));
    }

    return i;
  }

  function w(e, t) {
    if (e === t) return !0;
    var n = Object.keys(e),
        i = Object.keys(t);

    for (var _i3 = 0, _n3 = n; _i3 < _n3.length; _i3++) {
      var _s7 = _n3[_i3];
      if (!i.includes(_s7)) return !1;
      var _n4 = e[_s7],
          _r8 = t[_s7];

      if (b(_n4) && b(_r8)) {
        if (!w(_n4, _r8)) return !1;
      } else if (_n4 !== _r8) return !1;
    }

    for (var _i5 = 0, _i4 = i; _i5 < _i4.length; _i5++) {
      var _e6 = _i4[_i5];
      if (!n.includes(_e6)) return !1;
    }

    return !0;
  }

  function b(e) {
    return null !== e && "object" == _typeof(e);
  }

  var I = /*#__PURE__*/function () {
    function I() {
      _classCallCheck(this, I);

      this.chain_ = [], this.buf_ = [], this.W_ = [], this.pad_ = [], this.inbuf_ = 0, this.total_ = 0, this.blockSize = 64, this.pad_[0] = 128;

      for (var _e7 = 1; _e7 < this.blockSize; ++_e7) {
        this.pad_[_e7] = 0;
      }

      this.reset();
    }

    _createClass(I, [{
      key: "reset",
      value: function reset() {
        this.chain_[0] = 1732584193, this.chain_[1] = 4023233417, this.chain_[2] = 2562383102, this.chain_[3] = 271733878, this.chain_[4] = 3285377520, this.inbuf_ = 0, this.total_ = 0;
      }
    }, {
      key: "compress_",
      value: function compress_(e, t) {
        t || (t = 0);
        var n = this.W_;
        if ("string" == typeof e) for (var _i6 = 0; _i6 < 16; _i6++) {
          n[_i6] = e.charCodeAt(t) << 24 | e.charCodeAt(t + 1) << 16 | e.charCodeAt(t + 2) << 8 | e.charCodeAt(t + 3), t += 4;
        } else for (var _i7 = 0; _i7 < 16; _i7++) {
          n[_i7] = e[t] << 24 | e[t + 1] << 16 | e[t + 2] << 8 | e[t + 3], t += 4;
        }

        for (var _e8 = 16; _e8 < 80; _e8++) {
          var _t5 = n[_e8 - 3] ^ n[_e8 - 8] ^ n[_e8 - 14] ^ n[_e8 - 16];

          n[_e8] = 4294967295 & (_t5 << 1 | _t5 >>> 31);
        }

        var i,
            s,
            r = this.chain_[0],
            o = this.chain_[1],
            a = this.chain_[2],
            l = this.chain_[3],
            h = this.chain_[4];

        for (var _e9 = 0; _e9 < 80; _e9++) {
          _e9 < 40 ? _e9 < 20 ? (i = l ^ o & (a ^ l), s = 1518500249) : (i = o ^ a ^ l, s = 1859775393) : _e9 < 60 ? (i = o & a | l & (o | a), s = 2400959708) : (i = o ^ a ^ l, s = 3395469782);

          var _t6 = (r << 5 | r >>> 27) + i + h + s + n[_e9] & 4294967295;

          h = l, l = a, a = 4294967295 & (o << 30 | o >>> 2), o = r, r = _t6;
        }

        this.chain_[0] = this.chain_[0] + r & 4294967295, this.chain_[1] = this.chain_[1] + o & 4294967295, this.chain_[2] = this.chain_[2] + a & 4294967295, this.chain_[3] = this.chain_[3] + l & 4294967295, this.chain_[4] = this.chain_[4] + h & 4294967295;
      }
    }, {
      key: "update",
      value: function update(e, t) {
        if (null == e) return;
        void 0 === t && (t = e.length);
        var n = t - this.blockSize;
        var i = 0;
        var s = this.buf_;
        var r = this.inbuf_;

        for (; i < t;) {
          if (0 === r) for (; i <= n;) {
            this.compress_(e, i), i += this.blockSize;
          }

          if ("string" == typeof e) {
            for (; i < t;) {
              if (s[r] = e.charCodeAt(i), ++r, ++i, r === this.blockSize) {
                this.compress_(s), r = 0;
                break;
              }
            }
          } else for (; i < t;) {
            if (s[r] = e[i], ++r, ++i, r === this.blockSize) {
              this.compress_(s), r = 0;
              break;
            }
          }
        }

        this.inbuf_ = r, this.total_ += t;
      }
    }, {
      key: "digest",
      value: function digest() {
        var e = [];
        var t = 8 * this.total_;
        this.inbuf_ < 56 ? this.update(this.pad_, 56 - this.inbuf_) : this.update(this.pad_, this.blockSize - (this.inbuf_ - 56));

        for (var _e10 = this.blockSize - 1; _e10 >= 56; _e10--) {
          this.buf_[_e10] = 255 & t, t /= 256;
        }

        this.compress_(this.buf_);
        var n = 0;

        for (var _t7 = 0; _t7 < 5; _t7++) {
          for (var _i8 = 24; _i8 >= 0; _i8 -= 8) {
            e[n] = this.chain_[_t7] >> _i8 & 255, ++n;
          }
        }

        return e;
      }
    }]);

    return I;
  }();

  function E(e, t) {
    return "".concat(e, " failed: ").concat(t, " argument ");
  }

  var T = function T(e) {
    var t = 0;

    for (var _n5 = 0; _n5 < e.length; _n5++) {
      var _i9 = e.charCodeAt(_n5);

      _i9 < 128 ? t++ : _i9 < 2048 ? t += 2 : _i9 >= 55296 && _i9 <= 56319 ? (t += 4, _n5++) : t += 3;
    }

    return t;
  };

  function S(e) {
    return e && e._delegate ? e._delegate : e;
  }

  var k = /*#__PURE__*/function () {
    function k(e, t, n) {
      _classCallCheck(this, k);

      this.name = e, this.instanceFactory = t, this.type = n, this.multipleInstances = !1, this.serviceProps = {}, this.instantiationMode = "LAZY", this.onInstanceCreated = null;
    }

    _createClass(k, [{
      key: "setInstantiationMode",
      value: function setInstantiationMode(e) {
        return this.instantiationMode = e, this;
      }
    }, {
      key: "setMultipleInstances",
      value: function setMultipleInstances(e) {
        return this.multipleInstances = e, this;
      }
    }, {
      key: "setServiceProps",
      value: function setServiceProps(e) {
        return this.serviceProps = e, this;
      }
    }, {
      key: "setInstanceCreatedCallback",
      value: function setInstanceCreatedCallback(e) {
        return this.onInstanceCreated = e, this;
      }
    }]);

    return k;
  }();

  var N = "[DEFAULT]";

  var P = /*#__PURE__*/function () {
    function P(e, t) {
      _classCallCheck(this, P);

      this.name = e, this.container = t, this.component = null, this.instances = new Map(), this.instancesDeferred = new Map(), this.instancesOptions = new Map(), this.onInitCallbacks = new Map();
    }

    _createClass(P, [{
      key: "get",
      value: function get(e) {
        var t = this.normalizeInstanceIdentifier(e);

        if (!this.instancesDeferred.has(t)) {
          var _e11 = new h();

          if (this.instancesDeferred.set(t, _e11), this.isInitialized(t) || this.shouldAutoInitialize()) try {
            var _n6 = this.getOrInitializeService({
              instanceIdentifier: t
            });

            _n6 && _e11.resolve(_n6);
          } catch (e) {}
        }

        return this.instancesDeferred.get(t).promise;
      }
    }, {
      key: "getImmediate",
      value: function getImmediate(e) {
        var t;
        var n = this.normalizeInstanceIdentifier(null == e ? void 0 : e.identifier),
            i = null !== (t = null == e ? void 0 : e.optional) && void 0 !== t && t;

        if (!this.isInitialized(n) && !this.shouldAutoInitialize()) {
          if (i) return null;
          throw Error("Service ".concat(this.name, " is not available"));
        }

        try {
          return this.getOrInitializeService({
            instanceIdentifier: n
          });
        } catch (e) {
          if (i) return null;
          throw e;
        }
      }
    }, {
      key: "getComponent",
      value: function getComponent() {
        return this.component;
      }
    }, {
      key: "setComponent",
      value: function setComponent(e) {
        if (e.name !== this.name) throw Error("Mismatching Component ".concat(e.name, " for Provider ").concat(this.name, "."));
        if (this.component) throw Error("Component for ".concat(this.name, " has already been provided"));

        if (this.component = e, this.shouldAutoInitialize()) {
          if (function (e) {
            return "EAGER" === e.instantiationMode;
          }(e)) try {
            this.getOrInitializeService({
              instanceIdentifier: N
            });
          } catch (e) {}

          var _iterator = _createForOfIteratorHelper(this.instancesDeferred.entries()),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var _step$value = _slicedToArray(_step.value, 2),
                  _e12 = _step$value[0],
                  _t8 = _step$value[1];

              var _n7 = this.normalizeInstanceIdentifier(_e12);

              try {
                var _e13 = this.getOrInitializeService({
                  instanceIdentifier: _n7
                });

                _t8.resolve(_e13);
              } catch (e) {}
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }
      }
    }, {
      key: "clearInstance",
      value: function clearInstance() {
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "[DEFAULT]";
        this.instancesDeferred["delete"](e), this.instancesOptions["delete"](e), this.instances["delete"](e);
      }
    }, {
      key: "delete",
      value: function () {
        var _delete2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          var e;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  e = Array.from(this.instances.values());
                  _context.next = 3;
                  return Promise.all([].concat(_toConsumableArray(e.filter(function (e) {
                    return "INTERNAL" in e;
                  }).map(function (e) {
                    return e.INTERNAL["delete"]();
                  })), _toConsumableArray(e.filter(function (e) {
                    return "_delete" in e;
                  }).map(function (e) {
                    return e._delete();
                  }))));

                case 3:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function _delete() {
          return _delete2.apply(this, arguments);
        }

        return _delete;
      }()
    }, {
      key: "isComponentSet",
      value: function isComponentSet() {
        return null != this.component;
      }
    }, {
      key: "isInitialized",
      value: function isInitialized() {
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "[DEFAULT]";
        return this.instances.has(e);
      }
    }, {
      key: "getOptions",
      value: function getOptions() {
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "[DEFAULT]";
        return this.instancesOptions.get(e) || {};
      }
    }, {
      key: "initialize",
      value: function initialize() {
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var _e$options = e.options,
            t = _e$options === void 0 ? {} : _e$options,
            n = this.normalizeInstanceIdentifier(e.instanceIdentifier);
        if (this.isInitialized(n)) throw Error("".concat(this.name, "(").concat(n, ") has already been initialized"));
        if (!this.isComponentSet()) throw Error("Component ".concat(this.name, " has not been registered yet"));
        var i = this.getOrInitializeService({
          instanceIdentifier: n,
          options: t
        });

        var _iterator2 = _createForOfIteratorHelper(this.instancesDeferred.entries()),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var _step2$value = _slicedToArray(_step2.value, 2),
                _e14 = _step2$value[0],
                _t9 = _step2$value[1];

            n === this.normalizeInstanceIdentifier(_e14) && _t9.resolve(i);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        return i;
      }
    }, {
      key: "onInit",
      value: function onInit(e, t) {
        var n;
        var i = this.normalizeInstanceIdentifier(t),
            s = null !== (n = this.onInitCallbacks.get(i)) && void 0 !== n ? n : new Set();
        s.add(e), this.onInitCallbacks.set(i, s);
        var r = this.instances.get(i);
        return r && e(r, i), function () {
          s["delete"](e);
        };
      }
    }, {
      key: "invokeOnInitCallbacks",
      value: function invokeOnInitCallbacks(e, t) {
        var n = this.onInitCallbacks.get(t);

        if (n) {
          var _iterator3 = _createForOfIteratorHelper(n),
              _step3;

          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var _i10 = _step3.value;

              try {
                _i10(e, t);
              } catch (e) {}
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
        }
      }
    }, {
      key: "getOrInitializeService",
      value: function getOrInitializeService(_ref) {
        var e = _ref.instanceIdentifier,
            _ref$options = _ref.options,
            t = _ref$options === void 0 ? {} : _ref$options;
        var n = this.instances.get(e);
        if (!n && this.component && (n = this.component.instanceFactory(this.container, {
          instanceIdentifier: (i = e, i === N ? void 0 : i),
          options: t
        }), this.instances.set(e, n), this.instancesOptions.set(e, t), this.invokeOnInitCallbacks(n, e), this.component.onInstanceCreated)) try {
          this.component.onInstanceCreated(this.container, e, n);
        } catch (e) {}
        var i;
        return n || null;
      }
    }, {
      key: "normalizeInstanceIdentifier",
      value: function normalizeInstanceIdentifier() {
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "[DEFAULT]";
        return this.component ? this.component.multipleInstances ? e : N : e;
      }
    }, {
      key: "shouldAutoInitialize",
      value: function shouldAutoInitialize() {
        return !!this.component && "EXPLICIT" !== this.component.instantiationMode;
      }
    }]);

    return P;
  }();

  var R = /*#__PURE__*/function () {
    function R(e) {
      _classCallCheck(this, R);

      this.name = e, this.providers = new Map();
    }

    _createClass(R, [{
      key: "addComponent",
      value: function addComponent(e) {
        var t = this.getProvider(e.name);
        if (t.isComponentSet()) throw new Error("Component ".concat(e.name, " has already been registered with ").concat(this.name));
        t.setComponent(e);
      }
    }, {
      key: "addOrOverwriteComponent",
      value: function addOrOverwriteComponent(e) {
        this.getProvider(e.name).isComponentSet() && this.providers["delete"](e.name), this.addComponent(e);
      }
    }, {
      key: "getProvider",
      value: function getProvider(e) {
        if (this.providers.has(e)) return this.providers.get(e);
        var t = new P(e, this);
        return this.providers.set(e, t), t;
      }
    }, {
      key: "getProviders",
      value: function getProviders() {
        return Array.from(this.providers.values());
      }
    }]);

    return R;
  }();

  var x = [];
  var D;
  !function (e) {
    e[e.DEBUG = 0] = "DEBUG", e[e.VERBOSE = 1] = "VERBOSE", e[e.INFO = 2] = "INFO", e[e.WARN = 3] = "WARN", e[e.ERROR = 4] = "ERROR", e[e.SILENT = 5] = "SILENT";
  }(D || (D = {}));

  var A = {
    debug: D.DEBUG,
    verbose: D.VERBOSE,
    info: D.INFO,
    warn: D.WARN,
    error: D.ERROR,
    silent: D.SILENT
  },
      O = D.INFO,
      M = (_M = {}, _defineProperty(_M, D.DEBUG, "log"), _defineProperty(_M, D.VERBOSE, "log"), _defineProperty(_M, D.INFO, "info"), _defineProperty(_M, D.WARN, "warn"), _defineProperty(_M, D.ERROR, "error"), _M),
      L = function L(e, t) {
    var _console;

    if (t < e.logLevel) return;
    var i = new Date().toISOString(),
        s = M[t];
    if (!s) throw new Error("Attempted to log a message with an invalid logType (value: ".concat(t, ")"));

    for (var _len = arguments.length, n = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      n[_key - 2] = arguments[_key];
    }

    (_console = console)[s].apply(_console, ["[".concat(i, "]  ").concat(e.name, ":")].concat(n));
  };

  var F = /*#__PURE__*/function () {
    function F(e) {
      _classCallCheck(this, F);

      this.name = e, this._logLevel = O, this._logHandler = L, this._userLogHandler = null, x.push(this);
    }

    _createClass(F, [{
      key: "logLevel",
      get: function get() {
        return this._logLevel;
      },
      set: function set(e) {
        if (!(e in D)) throw new TypeError("Invalid value \"".concat(e, "\" assigned to `logLevel`"));
        this._logLevel = e;
      }
    }, {
      key: "setLogLevel",
      value: function setLogLevel(e) {
        this._logLevel = "string" == typeof e ? A[e] : e;
      }
    }, {
      key: "logHandler",
      get: function get() {
        return this._logHandler;
      },
      set: function set(e) {
        if ("function" != typeof e) throw new TypeError("Value assigned to `logHandler` must be a function");
        this._logHandler = e;
      }
    }, {
      key: "userLogHandler",
      get: function get() {
        return this._userLogHandler;
      },
      set: function set(e) {
        this._userLogHandler = e;
      }
    }, {
      key: "debug",
      value: function debug() {
        for (var _len2 = arguments.length, e = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          e[_key2] = arguments[_key2];
        }

        this._userLogHandler && this._userLogHandler.apply(this, [this, D.DEBUG].concat(e)), this._logHandler.apply(this, [this, D.DEBUG].concat(e));
      }
    }, {
      key: "log",
      value: function log() {
        for (var _len3 = arguments.length, e = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          e[_key3] = arguments[_key3];
        }

        this._userLogHandler && this._userLogHandler.apply(this, [this, D.VERBOSE].concat(e)), this._logHandler.apply(this, [this, D.VERBOSE].concat(e));
      }
    }, {
      key: "info",
      value: function info() {
        for (var _len4 = arguments.length, e = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          e[_key4] = arguments[_key4];
        }

        this._userLogHandler && this._userLogHandler.apply(this, [this, D.INFO].concat(e)), this._logHandler.apply(this, [this, D.INFO].concat(e));
      }
    }, {
      key: "warn",
      value: function warn() {
        for (var _len5 = arguments.length, e = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
          e[_key5] = arguments[_key5];
        }

        this._userLogHandler && this._userLogHandler.apply(this, [this, D.WARN].concat(e)), this._logHandler.apply(this, [this, D.WARN].concat(e));
      }
    }, {
      key: "error",
      value: function error() {
        for (var _len6 = arguments.length, e = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
          e[_key6] = arguments[_key6];
        }

        this._userLogHandler && this._userLogHandler.apply(this, [this, D.ERROR].concat(e)), this._logHandler.apply(this, [this, D.ERROR].concat(e));
      }
    }]);

    return F;
  }();

  var q, W;
  var U = new WeakMap(),
      j = new WeakMap(),
      B = new WeakMap(),
      H = new WeakMap(),
      z = new WeakMap();
  var V = {
    get: function get(e, t, n) {
      if (e instanceof IDBTransaction) {
        if ("done" === t) return j.get(e);
        if ("objectStoreNames" === t) return e.objectStoreNames || B.get(e);
        if ("store" === t) return n.objectStoreNames[1] ? void 0 : n.objectStore(n.objectStoreNames[0]);
      }

      return Y(e[t]);
    },
    set: function set(e, t, n) {
      return e[t] = n, !0;
    },
    has: function has(e, t) {
      return e instanceof IDBTransaction && ("done" === t || "store" === t) || t in e;
    }
  };

  function $(e) {
    return "function" == typeof e ? (t = e) !== IDBDatabase.prototype.transaction || "objectStoreNames" in IDBTransaction.prototype ? (W || (W = [IDBCursor.prototype.advance, IDBCursor.prototype["continue"], IDBCursor.prototype.continuePrimaryKey])).includes(t) ? function () {
      for (var _len7 = arguments.length, e = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        e[_key7] = arguments[_key7];
      }

      return t.apply(K(this), e), Y(U.get(this));
    } : function () {
      for (var _len8 = arguments.length, e = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        e[_key8] = arguments[_key8];
      }

      return Y(t.apply(K(this), e));
    } : function (e) {
      var _t10;

      for (var _len9 = arguments.length, n = new Array(_len9 > 1 ? _len9 - 1 : 0), _key9 = 1; _key9 < _len9; _key9++) {
        n[_key9 - 1] = arguments[_key9];
      }

      var i = (_t10 = t).call.apply(_t10, [K(this), e].concat(n));

      return B.set(i, e.sort ? e.sort() : [e]), Y(i);
    } : (e instanceof IDBTransaction && function (e) {
      if (j.has(e)) return;
      var t = new Promise(function (t, n) {
        var i = function i() {
          e.removeEventListener("complete", s), e.removeEventListener("error", r), e.removeEventListener("abort", r);
        },
            s = function s() {
          t(), i();
        },
            r = function r() {
          n(e.error || new DOMException("AbortError", "AbortError")), i();
        };

        e.addEventListener("complete", s), e.addEventListener("error", r), e.addEventListener("abort", r);
      });
      j.set(e, t);
    }(e), n = e, (q || (q = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction])).some(function (e) {
      return n instanceof e;
    }) ? new Proxy(e, V) : e);
    var t, n;
  }

  function Y(e) {
    if (e instanceof IDBRequest) return function (e) {
      var t = new Promise(function (t, n) {
        var i = function i() {
          e.removeEventListener("success", s), e.removeEventListener("error", r);
        },
            s = function s() {
          t(Y(e.result)), i();
        },
            r = function r() {
          n(e.error), i();
        };

        e.addEventListener("success", s), e.addEventListener("error", r);
      });
      return t.then(function (t) {
        t instanceof IDBCursor && U.set(t, e);
      })["catch"](function () {}), z.set(t, e), t;
    }(e);
    if (H.has(e)) return H.get(e);
    var t = $(e);
    return t !== e && (H.set(e, t), z.set(t, e)), t;
  }

  var K = function K(e) {
    return z.get(e);
  },
      G = ["get", "getKey", "getAll", "getAllKeys", "count"],
      Q = ["put", "add", "delete", "clear"],
      J = new Map();

  function X(e, t) {
    if (!(e instanceof IDBDatabase) || t in e || "string" != typeof t) return;
    if (J.get(t)) return J.get(t);
    var n = t.replace(/FromIndex$/, ""),
        i = t !== n,
        s = Q.includes(n);
    if (!(n in (i ? IDBIndex : IDBObjectStore).prototype) || !s && !G.includes(n)) return;

    var r = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(e) {
        var _o4;

        var r,
            o,
            _len10,
            t,
            _key10,
            _args2 = arguments;

        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                r = this.transaction(e, s ? "readwrite" : "readonly");
                o = r.store;

                for (_len10 = _args2.length, t = new Array(_len10 > 1 ? _len10 - 1 : 0), _key10 = 1; _key10 < _len10; _key10++) {
                  t[_key10 - 1] = _args2[_key10];
                }

                i && (o = o.index(t.shift()));
                _context2.next = 6;
                return Promise.all([(_o4 = o)[n].apply(_o4, t), s && r.done]);

              case 6:
                return _context2.abrupt("return", _context2.sent[0]);

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function r(_x) {
        return _ref2.apply(this, arguments);
      };
    }();

    return J.set(t, r), r;
  }

  var Z;
  Z = V, V = _objectSpread(_objectSpread({}, Z), {}, {
    get: function get(e, t, n) {
      return X(e, t) || Z.get(e, t, n);
    },
    has: function has(e, t) {
      return !!X(e, t) || Z.has(e, t);
    }
  });

  var ee = /*#__PURE__*/function () {
    function ee(e) {
      _classCallCheck(this, ee);

      this.container = e;
    }

    _createClass(ee, [{
      key: "getPlatformInfoString",
      value: function getPlatformInfoString() {
        return this.container.getProviders().map(function (e) {
          if (function (e) {
            var t = e.getComponent();
            return "VERSION" === (null == t ? void 0 : t.type);
          }(e)) {
            var _t11 = e.getImmediate();

            return "".concat(_t11.library, "/").concat(_t11.version);
          }

          return null;
        }).filter(function (e) {
          return e;
        }).join(" ");
      }
    }]);

    return ee;
  }();

  var te = "@firebase/app",
      ne = "0.7.33",
      ie = new F("@firebase/app"),
      se = (_se = {}, _defineProperty(_se, te, "fire-core"), _defineProperty(_se, "@firebase/app-compat", "fire-core-compat"), _defineProperty(_se, "@firebase/analytics", "fire-analytics"), _defineProperty(_se, "@firebase/analytics-compat", "fire-analytics-compat"), _defineProperty(_se, "@firebase/app-check", "fire-app-check"), _defineProperty(_se, "@firebase/app-check-compat", "fire-app-check-compat"), _defineProperty(_se, "@firebase/auth", "fire-auth"), _defineProperty(_se, "@firebase/auth-compat", "fire-auth-compat"), _defineProperty(_se, "@firebase/database", "fire-rtdb"), _defineProperty(_se, "@firebase/database-compat", "fire-rtdb-compat"), _defineProperty(_se, "@firebase/functions", "fire-fn"), _defineProperty(_se, "@firebase/functions-compat", "fire-fn-compat"), _defineProperty(_se, "@firebase/installations", "fire-iid"), _defineProperty(_se, "@firebase/installations-compat", "fire-iid-compat"), _defineProperty(_se, "@firebase/messaging", "fire-fcm"), _defineProperty(_se, "@firebase/messaging-compat", "fire-fcm-compat"), _defineProperty(_se, "@firebase/performance", "fire-perf"), _defineProperty(_se, "@firebase/performance-compat", "fire-perf-compat"), _defineProperty(_se, "@firebase/remote-config", "fire-rc"), _defineProperty(_se, "@firebase/remote-config-compat", "fire-rc-compat"), _defineProperty(_se, "@firebase/storage", "fire-gcs"), _defineProperty(_se, "@firebase/storage-compat", "fire-gcs-compat"), _defineProperty(_se, "@firebase/firestore", "fire-fst"), _defineProperty(_se, "@firebase/firestore-compat", "fire-fst-compat"), _defineProperty(_se, "fire-js", "fire-js"), _defineProperty(_se, "firebase", "fire-js-all"), _se),
      re = new Map(),
      oe = new Map();

  function ae(e, t) {
    try {
      e.container.addComponent(t);
    } catch (n) {
      ie.debug("Component ".concat(t.name, " failed to register with FirebaseApp ").concat(e.name), n);
    }
  }

  function le(e) {
    var t = e.name;
    if (oe.has(t)) return ie.debug("There were multiple attempts to register component ".concat(t, ".")), !1;
    oe.set(t, e);

    var _iterator4 = _createForOfIteratorHelper(re.values()),
        _step4;

    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var _t12 = _step4.value;
        ae(_t12, e);
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }

    return !0;
  }

  var he = new d("app", "Firebase", {
    "no-app": "No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()",
    "bad-app-name": "Illegal App name: '{$appName}",
    "duplicate-app": "Firebase App named '{$appName}' already exists with different options or config",
    "app-deleted": "Firebase App named '{$appName}' already deleted",
    "invalid-app-argument": "firebase.{$appName}() takes either no argument or a Firebase App instance.",
    "invalid-log-argument": "First argument to `onLog` must be null or a function.",
    "idb-open": "Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.",
    "idb-get": "Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.",
    "idb-set": "Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.",
    "idb-delete": "Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}."
  });

  var ce = /*#__PURE__*/function () {
    function ce(e, t, n) {
      var _this4 = this;

      _classCallCheck(this, ce);

      this._isDeleted = !1, this._options = Object.assign({}, e), this._config = Object.assign({}, t), this._name = t.name, this._automaticDataCollectionEnabled = t.automaticDataCollectionEnabled, this._container = n, this.container.addComponent(new k("app", function () {
        return _this4;
      }, "PUBLIC"));
    }

    _createClass(ce, [{
      key: "automaticDataCollectionEnabled",
      get: function get() {
        return this.checkDestroyed(), this._automaticDataCollectionEnabled;
      },
      set: function set(e) {
        this.checkDestroyed(), this._automaticDataCollectionEnabled = e;
      }
    }, {
      key: "name",
      get: function get() {
        return this.checkDestroyed(), this._name;
      }
    }, {
      key: "options",
      get: function get() {
        return this.checkDestroyed(), this._options;
      }
    }, {
      key: "config",
      get: function get() {
        return this.checkDestroyed(), this._config;
      }
    }, {
      key: "container",
      get: function get() {
        return this._container;
      }
    }, {
      key: "isDeleted",
      get: function get() {
        return this._isDeleted;
      },
      set: function set(e) {
        this._isDeleted = e;
      }
    }, {
      key: "checkDestroyed",
      value: function checkDestroyed() {
        if (this.isDeleted) throw he.create("app-deleted", {
          appName: this._name
        });
      }
    }]);

    return ce;
  }();

  function ue(e, t, n) {
    var i;
    var s = null !== (i = se[e]) && void 0 !== i ? i : e;
    n && (s += "-".concat(n));
    var r = s.match(/\s|\//),
        o = t.match(/\s|\//);

    if (r || o) {
      var _e15 = ["Unable to register library \"".concat(s, "\" with version \"").concat(t, "\":")];
      return r && _e15.push("library name \"".concat(s, "\" contains illegal characters (whitespace or \"/\")")), r && o && _e15.push("and"), o && _e15.push("version name \"".concat(t, "\" contains illegal characters (whitespace or \"/\")")), void ie.warn(_e15.join(" "));
    }

    le(new k("".concat(s, "-version"), function () {
      return {
        library: s,
        version: t
      };
    }, "VERSION"));
  }

  var de = "firebase-heartbeat-store";
  var pe = null;

  function _e() {
    return pe || (pe = function (e, t) {
      var _ref3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
          n = _ref3.blocked,
          i = _ref3.upgrade,
          s = _ref3.blocking,
          r = _ref3.terminated;

      var o = indexedDB.open(e, t),
          a = Y(o);
      return i && o.addEventListener("upgradeneeded", function (e) {
        i(Y(o.result), e.oldVersion, e.newVersion, Y(o.transaction));
      }), n && o.addEventListener("blocked", function () {
        return n();
      }), a.then(function (e) {
        r && e.addEventListener("close", function () {
          return r();
        }), s && e.addEventListener("versionchange", function () {
          return s();
        });
      })["catch"](function () {}), a;
    }("firebase-heartbeat-database", 1, {
      upgrade: function upgrade(e, t) {
        0 === t && e.createObjectStore(de);
      }
    })["catch"](function (e) {
      throw he.create("idb-open", {
        originalErrorMessage: e.message
      });
    })), pe;
  }

  function fe(_x2, _x3) {
    return _fe.apply(this, arguments);
  }

  function _fe() {
    _fe = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(e, t) {
      var n, _n72, _i65, _t61;

      return _regeneratorRuntime().wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.prev = 0;
              _context11.next = 3;
              return _e();

            case 3:
              _n72 = _context11.sent.transaction(de, "readwrite");
              _i65 = _n72.objectStore(de);
              _context11.next = 7;
              return _i65.put(t, ge(e));

            case 7:
              return _context11.abrupt("return", _n72.done);

            case 10:
              _context11.prev = 10;
              _context11.t0 = _context11["catch"](0);
              if (_context11.t0 instanceof u) ie.warn(_context11.t0.message);else {
                _t61 = he.create("idb-set", {
                  originalErrorMessage: null === (n = _context11.t0) || void 0 === n ? void 0 : n.message
                });
                ie.warn(_t61.message);
              }

            case 13:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11, null, [[0, 10]]);
    }));
    return _fe.apply(this, arguments);
  }

  function ge(e) {
    return "".concat(e.name, "!").concat(e.options.appId);
  }

  var me = /*#__PURE__*/function () {
    function me(e) {
      var _this5 = this;

      _classCallCheck(this, me);

      this.container = e, this._heartbeatsCache = null;
      var t = this.container.getProvider("app").getImmediate();
      this._storage = new ve(t), this._heartbeatsCachePromise = this._storage.read().then(function (e) {
        return _this5._heartbeatsCache = e, e;
      });
    }

    _createClass(me, [{
      key: "triggerHeartbeat",
      value: function () {
        var _triggerHeartbeat = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
          var e, t;
          return _regeneratorRuntime().wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  e = this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(), t = ye();
                  _context3.t0 = null === this._heartbeatsCache;

                  if (!_context3.t0) {
                    _context3.next = 6;
                    break;
                  }

                  _context3.next = 5;
                  return this._heartbeatsCachePromise;

                case 5:
                  this._heartbeatsCache = _context3.sent;

                case 6:
                  if (!(this._heartbeatsCache.lastSentHeartbeatDate !== t && !this._heartbeatsCache.heartbeats.some(function (e) {
                    return e.date === t;
                  }))) {
                    _context3.next = 8;
                    break;
                  }

                  return _context3.abrupt("return", (this._heartbeatsCache.heartbeats.push({
                    date: t,
                    agent: e
                  }), this._heartbeatsCache.heartbeats = this._heartbeatsCache.heartbeats.filter(function (e) {
                    var t = new Date(e.date).valueOf();
                    return Date.now() - t <= 2592e6;
                  }), this._storage.overwrite(this._heartbeatsCache)));

                case 8:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }));

        function triggerHeartbeat() {
          return _triggerHeartbeat.apply(this, arguments);
        }

        return triggerHeartbeat;
      }()
    }, {
      key: "getHeartbeatsHeader",
      value: function () {
        var _getHeartbeatsHeader = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
          var e, _ref4, t, n, i;

          return _regeneratorRuntime().wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.t0 = null === this._heartbeatsCache;

                  if (!_context4.t0) {
                    _context4.next = 4;
                    break;
                  }

                  _context4.next = 4;
                  return this._heartbeatsCachePromise;

                case 4:
                  if (!(null === this._heartbeatsCache || 0 === this._heartbeatsCache.heartbeats.length)) {
                    _context4.next = 6;
                    break;
                  }

                  return _context4.abrupt("return", "");

                case 6:
                  e = ye(), _ref4 = function (e) {
                    var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1024;
                    var n = [];
                    var i = e.slice();

                    var _iterator5 = _createForOfIteratorHelper(e),
                        _step5;

                    try {
                      var _loop = function _loop() {
                        var s = _step5.value;
                        var e = n.find(function (e) {
                          return e.agent === s.agent;
                        });

                        if (e) {
                          if (e.dates.push(s.date), Ce(n) > t) {
                            e.dates.pop();
                            return "break";
                          }
                        } else if (n.push({
                          agent: s.agent,
                          dates: [s.date]
                        }), Ce(n) > t) {
                          n.pop();
                          return "break";
                        }

                        i = i.slice(1);
                      };

                      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                        var _ret = _loop();

                        if (_ret === "break") break;
                      }
                    } catch (err) {
                      _iterator5.e(err);
                    } finally {
                      _iterator5.f();
                    }

                    return {
                      heartbeatsToSend: n,
                      unsentEntries: i
                    };
                  }(this._heartbeatsCache.heartbeats), t = _ref4.heartbeatsToSend, n = _ref4.unsentEntries, i = r(JSON.stringify({
                    version: 2,
                    heartbeats: t
                  }));
                  this._heartbeatsCache.lastSentHeartbeatDate = e;

                  if (!(n.length > 0)) {
                    _context4.next = 14;
                    break;
                  }

                  this._heartbeatsCache.heartbeats = n;
                  _context4.next = 12;
                  return this._storage.overwrite(this._heartbeatsCache);

                case 12:
                  _context4.next = 15;
                  break;

                case 14:
                  this._heartbeatsCache.heartbeats = [], this._storage.overwrite(this._heartbeatsCache);

                case 15:
                  return _context4.abrupt("return", i);

                case 16:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4, this);
        }));

        function getHeartbeatsHeader() {
          return _getHeartbeatsHeader.apply(this, arguments);
        }

        return getHeartbeatsHeader;
      }()
    }]);

    return me;
  }();

  function ye() {
    return new Date().toISOString().substring(0, 10);
  }

  var ve = /*#__PURE__*/function () {
    function ve(e) {
      _classCallCheck(this, ve);

      this.app = e, this._canUseIndexedDBPromise = this.runIndexedDBEnvironmentCheck();
    }

    _createClass(ve, [{
      key: "runIndexedDBEnvironmentCheck",
      value: function () {
        var _runIndexedDBEnvironmentCheck = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
          return _regeneratorRuntime().wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  return _context5.abrupt("return", "object" == (typeof indexedDB === "undefined" ? "undefined" : _typeof(indexedDB)) && new Promise(function (e, t) {
                    try {
                      var _n8 = !0;

                      var _i11 = "validate-browser-context-for-indexeddb-analytics-module",
                          _s8 = self.indexedDB.open(_i11);

                      _s8.onsuccess = function () {
                        _s8.result.close(), _n8 || self.indexedDB.deleteDatabase(_i11), e(!0);
                      }, _s8.onupgradeneeded = function () {
                        _n8 = !1;
                      }, _s8.onerror = function () {
                        var e;
                        t((null === (e = _s8.error) || void 0 === e ? void 0 : e.message) || "");
                      };
                    } catch (e) {
                      t(e);
                    }
                  }).then(function () {
                    return !0;
                  })["catch"](function () {
                    return !1;
                  }));

                case 1:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5);
        }));

        function runIndexedDBEnvironmentCheck() {
          return _runIndexedDBEnvironmentCheck.apply(this, arguments);
        }

        return runIndexedDBEnvironmentCheck;
      }()
    }, {
      key: "read",
      value: function () {
        var _read = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
          return _regeneratorRuntime().wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  _context7.next = 2;
                  return this._canUseIndexedDBPromise;

                case 2:
                  _context7.t1 = _context7.sent;

                  if (!_context7.t1) {
                    _context7.next = 7;
                    break;
                  }

                  _context7.next = 6;
                  return function () {
                    var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(e) {
                      var t, _n9;

                      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
                        while (1) {
                          switch (_context6.prev = _context6.next) {
                            case 0:
                              _context6.prev = 0;
                              _context6.next = 3;
                              return _e();

                            case 3:
                              return _context6.abrupt("return", _context6.sent.transaction(de).objectStore(de).get(ge(e)));

                            case 6:
                              _context6.prev = 6;
                              _context6.t0 = _context6["catch"](0);
                              if (_context6.t0 instanceof u) ie.warn(_context6.t0.message);else {
                                _n9 = he.create("idb-get", {
                                  originalErrorMessage: null === (t = _context6.t0) || void 0 === t ? void 0 : t.message
                                });
                                ie.warn(_n9.message);
                              }

                            case 9:
                            case "end":
                              return _context6.stop();
                          }
                        }
                      }, _callee6, null, [[0, 6]]);
                    }));

                    return function (_x4) {
                      return _ref5.apply(this, arguments);
                    };
                  }()(this.app);

                case 6:
                  _context7.t1 = _context7.sent;

                case 7:
                  _context7.t0 = _context7.t1;

                  if (_context7.t0) {
                    _context7.next = 10;
                    break;
                  }

                  _context7.t0 = {
                    heartbeats: []
                  };

                case 10:
                  return _context7.abrupt("return", _context7.t0);

                case 11:
                case "end":
                  return _context7.stop();
              }
            }
          }, _callee7, this);
        }));

        function read() {
          return _read.apply(this, arguments);
        }

        return read;
      }()
    }, {
      key: "overwrite",
      value: function () {
        var _overwrite = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(e) {
          var t, _n10;

          return _regeneratorRuntime().wrap(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  _context8.next = 2;
                  return this._canUseIndexedDBPromise;

                case 2:
                  if (!_context8.sent) {
                    _context8.next = 7;
                    break;
                  }

                  _context8.next = 5;
                  return this.read();

                case 5:
                  _n10 = _context8.sent;
                  return _context8.abrupt("return", fe(this.app, {
                    lastSentHeartbeatDate: null !== (t = e.lastSentHeartbeatDate) && void 0 !== t ? t : _n10.lastSentHeartbeatDate,
                    heartbeats: e.heartbeats
                  }));

                case 7:
                case "end":
                  return _context8.stop();
              }
            }
          }, _callee8, this);
        }));

        function overwrite(_x5) {
          return _overwrite.apply(this, arguments);
        }

        return overwrite;
      }()
    }, {
      key: "add",
      value: function () {
        var _add = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(e) {
          var t, _n11;

          return _regeneratorRuntime().wrap(function _callee9$(_context9) {
            while (1) {
              switch (_context9.prev = _context9.next) {
                case 0:
                  _context9.next = 2;
                  return this._canUseIndexedDBPromise;

                case 2:
                  if (!_context9.sent) {
                    _context9.next = 7;
                    break;
                  }

                  _context9.next = 5;
                  return this.read();

                case 5:
                  _n11 = _context9.sent;
                  return _context9.abrupt("return", fe(this.app, {
                    lastSentHeartbeatDate: null !== (t = e.lastSentHeartbeatDate) && void 0 !== t ? t : _n11.lastSentHeartbeatDate,
                    heartbeats: [].concat(_toConsumableArray(_n11.heartbeats), _toConsumableArray(e.heartbeats))
                  }));

                case 7:
                case "end":
                  return _context9.stop();
              }
            }
          }, _callee9, this);
        }));

        function add(_x6) {
          return _add.apply(this, arguments);
        }

        return add;
      }()
    }]);

    return ve;
  }();

  function Ce(e) {
    return r(JSON.stringify({
      version: 2,
      heartbeats: e
    })).length;
  }

  le(new k("platform-logger", function (e) {
    return new ee(e);
  }, "PRIVATE")), le(new k("heartbeat", function (e) {
    return new me(e);
  }, "PRIVATE")), ue(te, ne, ""), ue(te, ne, "esm2017"), ue("fire-js", ""), ue("firebase", "9.10.0", "app");
  var we = "@firebase/database",
      be = "0.13.6";
  var Ie = "";

  var Ee = /*#__PURE__*/function () {
    function Ee(e) {
      _classCallCheck(this, Ee);

      this.domStorage_ = e, this.prefix_ = "firebase:";
    }

    _createClass(Ee, [{
      key: "set",
      value: function set(e, t) {
        null == t ? this.domStorage_.removeItem(this.prefixedName_(e)) : this.domStorage_.setItem(this.prefixedName_(e), f(t));
      }
    }, {
      key: "get",
      value: function get(e) {
        var t = this.domStorage_.getItem(this.prefixedName_(e));
        return null == t ? null : _(t);
      }
    }, {
      key: "remove",
      value: function remove(e) {
        this.domStorage_.removeItem(this.prefixedName_(e));
      }
    }, {
      key: "prefixedName_",
      value: function prefixedName_(e) {
        return this.prefix_ + e;
      }
    }, {
      key: "toString",
      value: function toString() {
        return this.domStorage_.toString();
      }
    }]);

    return Ee;
  }();

  var Te = /*#__PURE__*/function () {
    function Te() {
      _classCallCheck(this, Te);

      this.cache_ = {}, this.isInMemoryStorage = !0;
    }

    _createClass(Te, [{
      key: "set",
      value: function set(e, t) {
        null == t ? delete this.cache_[e] : this.cache_[e] = t;
      }
    }, {
      key: "get",
      value: function get(e) {
        return m(this.cache_, e) ? this.cache_[e] : null;
      }
    }, {
      key: "remove",
      value: function remove(e) {
        delete this.cache_[e];
      }
    }]);

    return Te;
  }();

  var Se = function Se(e) {
    try {
      if ("undefined" != typeof window && void 0 !== window[e]) {
        var t = window[e];
        return t.setItem("firebase:sentinel", "cache"), t.removeItem("firebase:sentinel"), new Ee(t);
      }
    } catch (e) {}

    return new Te();
  },
      ke = Se("localStorage"),
      Ne = Se("sessionStorage"),
      Pe = new F("@firebase/database"),
      Re = function () {
    var e = 1;
    return function () {
      return e++;
    };
  }(),
      xe = function xe(t) {
    var n = function (t) {
      var n = [];
      var i = 0;

      for (var _s9 = 0; _s9 < t.length; _s9++) {
        var _r9 = t.charCodeAt(_s9);

        if (_r9 >= 55296 && _r9 <= 56319) {
          var _n12 = _r9 - 55296;

          _s9++, e(_s9 < t.length, "Surrogate pair missing trail surrogate."), _r9 = 65536 + (_n12 << 10) + (t.charCodeAt(_s9) - 56320);
        }

        _r9 < 128 ? n[i++] = _r9 : _r9 < 2048 ? (n[i++] = _r9 >> 6 | 192, n[i++] = 63 & _r9 | 128) : _r9 < 65536 ? (n[i++] = _r9 >> 12 | 224, n[i++] = _r9 >> 6 & 63 | 128, n[i++] = 63 & _r9 | 128) : (n[i++] = _r9 >> 18 | 240, n[i++] = _r9 >> 12 & 63 | 128, n[i++] = _r9 >> 6 & 63 | 128, n[i++] = 63 & _r9 | 128);
      }

      return n;
    }(t),
        s = new I();

    s.update(n);
    var r = s.digest();
    return i.encodeByteArray(r);
  },
      De = function De() {
    var t = "";

    for (var _n13 = 0; _n13 < arguments.length; _n13++) {
      var _i12 = _n13 < 0 || arguments.length <= _n13 ? undefined : arguments[_n13];

      Array.isArray(_i12) || _i12 && "object" == _typeof(_i12) && "number" == typeof _i12.length ? t += De.apply(null, _i12) : t += "object" == _typeof(_i12) ? f(_i12) : _i12, t += " ";
    }

    return t;
  };

  var Ae = null,
      Oe = !0;

  var Me = function Me() {
    if (!0 === Oe && (Oe = !1, null === Ae && !0 === Ne.get("logging_enabled") && (n = !0, e(!i || !0 === n || !1 === n, "Can't turn on custom loggers persistently."), !0 === n ? (Pe.logLevel = D.VERBOSE, Ae = Pe.log.bind(Pe), i && Ne.set("logging_enabled", !0)) : "function" == typeof n ? Ae = n : (Ae = null, Ne.remove("logging_enabled")))), Ae) {
      for (var _len11 = arguments.length, t = new Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
        t[_key11] = arguments[_key11];
      }

      var _e16 = De.apply(null, t);

      Ae(_e16);
    }

    var n, i;
  },
      Le = function Le(e) {
    return function () {
      for (var _len12 = arguments.length, t = new Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
        t[_key12] = arguments[_key12];
      }

      Me.apply(void 0, [e].concat(t));
    };
  },
      Fe = function Fe() {
    var t = "FIREBASE INTERNAL ERROR: " + De.apply(void 0, arguments);
    Pe.error(t);
  },
      qe = function qe() {
    var t = "FIREBASE FATAL ERROR: ".concat(De.apply(void 0, arguments));
    throw Pe.error(t), new Error(t);
  },
      We = function We() {
    var t = "FIREBASE WARNING: " + De.apply(void 0, arguments);
    Pe.warn(t);
  },
      Ue = function Ue(e) {
    return "number" == typeof e && (e != e || e === Number.POSITIVE_INFINITY || e === Number.NEGATIVE_INFINITY);
  },
      je = "[MIN_NAME]",
      Be = "[MAX_NAME]",
      He = function He(e, t) {
    if (e === t) return 0;
    if (e === je || t === Be) return -1;
    if (t === je || e === Be) return 1;
    {
      var _n14 = Je(e),
          _i13 = Je(t);

      return null !== _n14 ? null !== _i13 ? _n14 - _i13 == 0 ? e.length - t.length : _n14 - _i13 : -1 : null !== _i13 ? 1 : e < t ? -1 : 1;
    }
  },
      ze = function ze(e, t) {
    return e === t ? 0 : e < t ? -1 : 1;
  },
      Ve = function Ve(e, t) {
    if (t && e in t) return t[e];
    throw new Error("Missing required key (" + e + ") in object: " + f(t));
  },
      $e = function $e(e) {
    if ("object" != _typeof(e) || null === e) return f(e);
    var t = [];

    for (var _n15 in e) {
      t.push(_n15);
    }

    t.sort();
    var n = "{";

    for (var _i14 = 0; _i14 < t.length; _i14++) {
      0 !== _i14 && (n += ","), n += f(t[_i14]), n += ":", n += $e(e[t[_i14]]);
    }

    return n += "}", n;
  },
      Ye = function Ye(e, t) {
    var n = e.length;
    if (n <= t) return [e];
    var i = [];

    for (var _s10 = 0; _s10 < n; _s10 += t) {
      _s10 + t > n ? i.push(e.substring(_s10, n)) : i.push(e.substring(_s10, _s10 + t));
    }

    return i;
  };

  function Ke(e, t) {
    for (var _n16 in e) {
      e.hasOwnProperty(_n16) && t(_n16, e[_n16]);
    }
  }

  var Ge = function Ge(t) {
    e(!Ue(t), "Invalid JSON number");
    var n, i, s, r, o;
    0 === t ? (i = 0, s = 0, n = 1 / t == -1 / 0 ? 1 : 0) : (n = t < 0, (t = Math.abs(t)) >= Math.pow(2, -1022) ? (r = Math.min(Math.floor(Math.log(t) / Math.LN2), 1023), i = r + 1023, s = Math.round(t * Math.pow(2, 52 - r) - Math.pow(2, 52))) : (i = 0, s = Math.round(t / Math.pow(2, -1074))));
    var a = [];

    for (o = 52; o; o -= 1) {
      a.push(s % 2 ? 1 : 0), s = Math.floor(s / 2);
    }

    for (o = 11; o; o -= 1) {
      a.push(i % 2 ? 1 : 0), i = Math.floor(i / 2);
    }

    a.push(n ? 1 : 0), a.reverse();
    var l = a.join("");
    var h = "";

    for (o = 0; o < 64; o += 8) {
      var _e17 = parseInt(l.substr(o, 8), 2).toString(16);

      1 === _e17.length && (_e17 = "0" + _e17), h += _e17;
    }

    return h.toLowerCase();
  },
      Qe = new RegExp("^-?(0*)\\d{1,10}$"),
      Je = function Je(e) {
    if (Qe.test(e)) {
      var t = Number(e);
      if (t >= -2147483648 && t <= 2147483647) return t;
    }

    return null;
  },
      Xe = function Xe(e) {
    try {
      e();
    } catch (e) {
      setTimeout(function () {
        var t = e.stack || "";
        throw We("Exception was thrown by user callback.", t), e;
      }, Math.floor(0));
    }
  },
      Ze = function Ze(e, t) {
    var n = setTimeout(e, t);
    return "number" == typeof n && "undefined" != typeof Deno && Deno.unrefTimer ? Deno.unrefTimer(n) : "object" == _typeof(n) && n.unref && n.unref(), n;
  };

  var et = /*#__PURE__*/function () {
    function et(e, t) {
      var _this6 = this;

      _classCallCheck(this, et);

      this.appName_ = e, this.appCheckProvider = t, this.appCheck = null == t ? void 0 : t.getImmediate({
        optional: !0
      }), this.appCheck || null == t || t.get().then(function (e) {
        return _this6.appCheck = e;
      });
    }

    _createClass(et, [{
      key: "getToken",
      value: function getToken(e) {
        var _this7 = this;

        return this.appCheck ? this.appCheck.getToken(e) : new Promise(function (t, n) {
          setTimeout(function () {
            _this7.appCheck ? _this7.getToken(e).then(t, n) : t(null);
          }, 0);
        });
      }
    }, {
      key: "addTokenChangeListener",
      value: function addTokenChangeListener(e) {
        var t;
        null === (t = this.appCheckProvider) || void 0 === t || t.get().then(function (t) {
          return t.addTokenListener(e);
        });
      }
    }, {
      key: "notifyForInvalidToken",
      value: function notifyForInvalidToken() {
        We("Provided AppCheck credentials for the app named \"".concat(this.appName_, "\" are invalid. This usually indicates your app was not initialized correctly."));
      }
    }]);

    return et;
  }();

  var tt = /*#__PURE__*/function () {
    function tt(e, t, n) {
      var _this8 = this;

      _classCallCheck(this, tt);

      this.appName_ = e, this.firebaseOptions_ = t, this.authProvider_ = n, this.auth_ = null, this.auth_ = n.getImmediate({
        optional: !0
      }), this.auth_ || n.onInit(function (e) {
        return _this8.auth_ = e;
      });
    }

    _createClass(tt, [{
      key: "getToken",
      value: function getToken(e) {
        var _this9 = this;

        return this.auth_ ? this.auth_.getToken(e)["catch"](function (e) {
          return e && "auth/token-not-initialized" === e.code ? (Me("Got auth/token-not-initialized error.  Treating as null token."), null) : Promise.reject(e);
        }) : new Promise(function (t, n) {
          setTimeout(function () {
            _this9.auth_ ? _this9.getToken(e).then(t, n) : t(null);
          }, 0);
        });
      }
    }, {
      key: "addTokenChangeListener",
      value: function addTokenChangeListener(e) {
        this.auth_ ? this.auth_.addAuthTokenListener(e) : this.authProvider_.get().then(function (t) {
          return t.addAuthTokenListener(e);
        });
      }
    }, {
      key: "removeTokenChangeListener",
      value: function removeTokenChangeListener(e) {
        this.authProvider_.get().then(function (t) {
          return t.removeAuthTokenListener(e);
        });
      }
    }, {
      key: "notifyForInvalidToken",
      value: function notifyForInvalidToken() {
        var e = 'Provided authentication credentials for the app named "' + this.appName_ + '" are invalid. This usually indicates your app was not initialized correctly. ';
        "credential" in this.firebaseOptions_ ? e += 'Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.' : "serviceAccount" in this.firebaseOptions_ ? e += 'Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.' : e += 'Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.', We(e);
      }
    }]);

    return tt;
  }();

  var nt = /*#__PURE__*/function () {
    function nt(e) {
      _classCallCheck(this, nt);

      this.accessToken = e;
    }

    _createClass(nt, [{
      key: "getToken",
      value: function getToken(e) {
        return Promise.resolve({
          accessToken: this.accessToken
        });
      }
    }, {
      key: "addTokenChangeListener",
      value: function addTokenChangeListener(e) {
        e(this.accessToken);
      }
    }, {
      key: "removeTokenChangeListener",
      value: function removeTokenChangeListener(e) {}
    }, {
      key: "notifyForInvalidToken",
      value: function notifyForInvalidToken() {}
    }]);

    return nt;
  }();

  nt.OWNER = "owner";
  var it = /(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,
      st = "websocket",
      rt = "long_polling";

  var ot = /*#__PURE__*/function () {
    function ot(e, t, n, i) {
      var s = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : !1;
      var r = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "";
      var o = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : !1;

      _classCallCheck(this, ot);

      this.secure = t, this.namespace = n, this.webSocketOnly = i, this.nodeAdmin = s, this.persistenceKey = r, this.includeNamespaceInQueryParams = o, this._host = e.toLowerCase(), this._domain = this._host.substr(this._host.indexOf(".") + 1), this.internalHost = ke.get("host:" + e) || this._host;
    }

    _createClass(ot, [{
      key: "isCacheableHost",
      value: function isCacheableHost() {
        return "s-" === this.internalHost.substr(0, 2);
      }
    }, {
      key: "isCustomHost",
      value: function isCustomHost() {
        return "firebaseio.com" !== this._domain && "firebaseio-demo.com" !== this._domain;
      }
    }, {
      key: "host",
      get: function get() {
        return this._host;
      },
      set: function set(e) {
        e !== this.internalHost && (this.internalHost = e, this.isCacheableHost() && ke.set("host:" + this._host, this.internalHost));
      }
    }, {
      key: "toString",
      value: function toString() {
        var e = this.toURLString();
        return this.persistenceKey && (e += "<" + this.persistenceKey + ">"), e;
      }
    }, {
      key: "toURLString",
      value: function toURLString() {
        var e = this.secure ? "https://" : "http://",
            t = this.includeNamespaceInQueryParams ? "?ns=".concat(this.namespace) : "";
        return "".concat(e).concat(this.host, "/").concat(t);
      }
    }]);

    return ot;
  }();

  function at(t, n, i) {
    var s;
    if (e("string" == typeof n, "typeof type must == string"), e("object" == _typeof(i), "typeof params must == object"), n === st) s = (t.secure ? "wss://" : "ws://") + t.internalHost + "/.ws?";else {
      if (n !== rt) throw new Error("Unknown connection type: " + n);
      s = (t.secure ? "https://" : "http://") + t.internalHost + "/.lp?";
    }
    (function (e) {
      return e.host !== e.internalHost || e.isCustomHost() || e.includeNamespaceInQueryParams;
    })(t) && (i.ns = t.namespace);
    var r = [];
    return Ke(i, function (e, t) {
      r.push(e + "=" + t);
    }), s + r.join("&");
  }

  var lt = /*#__PURE__*/function () {
    function lt() {
      _classCallCheck(this, lt);

      this.counters_ = {};
    }

    _createClass(lt, [{
      key: "incrementCounter",
      value: function incrementCounter(e) {
        var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
        m(this.counters_, e) || (this.counters_[e] = 0), this.counters_[e] += t;
      }
    }, {
      key: "get",
      value: function get() {
        return a(this.counters_);
      }
    }]);

    return lt;
  }();

  var ht = {},
      ct = {};

  function ut(e) {
    var t = e.toString();
    return ht[t] || (ht[t] = new lt()), ht[t];
  }

  var dt = /*#__PURE__*/function () {
    function dt(e) {
      _classCallCheck(this, dt);

      this.onMessage_ = e, this.pendingResponses = [], this.currentResponseNum = 0, this.closeAfterResponse = -1, this.onClose = null;
    }

    _createClass(dt, [{
      key: "closeAfter",
      value: function closeAfter(e, t) {
        this.closeAfterResponse = e, this.onClose = t, this.closeAfterResponse < this.currentResponseNum && (this.onClose(), this.onClose = null);
      }
    }, {
      key: "handleResponse",
      value: function handleResponse(e, t) {
        var _this10 = this;

        var _loop2 = function _loop2() {
          var e = _this10.pendingResponses[_this10.currentResponseNum];
          delete _this10.pendingResponses[_this10.currentResponseNum];

          var _loop3 = function _loop3(_t13) {
            e[_t13] && Xe(function () {
              _this10.onMessage_(e[_t13]);
            });
          };

          for (var _t13 = 0; _t13 < e.length; ++_t13) {
            _loop3(_t13);
          }

          if (_this10.currentResponseNum === _this10.closeAfterResponse) {
            _this10.onClose && (_this10.onClose(), _this10.onClose = null);
            return "break";
          }

          _this10.currentResponseNum++;
        };

        for (this.pendingResponses[e] = t; this.pendingResponses[this.currentResponseNum];) {
          var _ret2 = _loop2();

          if (_ret2 === "break") break;
        }
      }
    }]);

    return dt;
  }();

  var pt = /*#__PURE__*/function () {
    function pt(e, t, n, i, s, r, o) {
      var _this11 = this;

      _classCallCheck(this, pt);

      this.connId = e, this.repoInfo = t, this.applicationId = n, this.appCheckToken = i, this.authToken = s, this.transportSessionId = r, this.lastSessionId = o, this.bytesSent = 0, this.bytesReceived = 0, this.everConnected_ = !1, this.log_ = Le(e), this.stats_ = ut(t), this.urlFn = function (e) {
        return _this11.appCheckToken && (e.ac = _this11.appCheckToken), at(t, rt, e);
      };
    }

    _createClass(pt, [{
      key: "open",
      value: function open(e, t) {
        var _this12 = this;

        this.curSegmentNum = 0, this.onDisconnect_ = t, this.myPacketOrderer = new dt(e), this.isClosed_ = !1, this.connectTimeoutTimer_ = setTimeout(function () {
          _this12.log_("Timed out trying to connect."), _this12.onClosed_(), _this12.connectTimeoutTimer_ = null;
        }, Math.floor(3e4)), function (e) {
          if ("complete" === document.readyState) e();else {
            var _t14 = !1;

            var _n17 = function _n17() {
              document.body ? _t14 || (_t14 = !0, e()) : setTimeout(_n17, Math.floor(10));
            };

            document.addEventListener ? (document.addEventListener("DOMContentLoaded", _n17, !1), window.addEventListener("load", _n17, !1)) : document.attachEvent && (document.attachEvent("onreadystatechange", function () {
              "complete" === document.readyState && _n17();
            }), window.attachEvent("onload", _n17));
          }
        }(function () {
          if (_this12.isClosed_) return;
          _this12.scriptTagHolder = new _t(function () {
            for (var _len13 = arguments.length, e = new Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
              e[_key13] = arguments[_key13];
            }

            var t = e[0],
                n = e[1],
                i = e[2],
                s = e[3],
                r = e[4];
            if (_this12.incrementIncomingBytes_(e), _this12.scriptTagHolder) if (_this12.connectTimeoutTimer_ && (clearTimeout(_this12.connectTimeoutTimer_), _this12.connectTimeoutTimer_ = null), _this12.everConnected_ = !0, "start" === t) _this12.id = n, _this12.password = i;else {
              if ("close" !== t) throw new Error("Unrecognized command received: " + t);
              n ? (_this12.scriptTagHolder.sendNewPolls = !1, _this12.myPacketOrderer.closeAfter(n, function () {
                _this12.onClosed_();
              })) : _this12.onClosed_();
            }
          }, function () {
            for (var _len14 = arguments.length, e = new Array(_len14), _key14 = 0; _key14 < _len14; _key14++) {
              e[_key14] = arguments[_key14];
            }

            var t = e[0],
                n = e[1];
            _this12.incrementIncomingBytes_(e), _this12.myPacketOrderer.handleResponse(t, n);
          }, function () {
            _this12.onClosed_();
          }, _this12.urlFn);
          var e = {
            start: "t"
          };
          e.ser = Math.floor(1e8 * Math.random()), _this12.scriptTagHolder.uniqueCallbackIdentifier && (e.cb = _this12.scriptTagHolder.uniqueCallbackIdentifier), e.v = "5", _this12.transportSessionId && (e.s = _this12.transportSessionId), _this12.lastSessionId && (e.ls = _this12.lastSessionId), _this12.applicationId && (e.p = _this12.applicationId), _this12.appCheckToken && (e.ac = _this12.appCheckToken), "undefined" != typeof location && location.hostname && it.test(location.hostname) && (e.r = "f");

          var t = _this12.urlFn(e);

          _this12.log_("Connecting via long-poll to " + t), _this12.scriptTagHolder.addTag(t, function () {});
        });
      }
    }, {
      key: "start",
      value: function start() {
        this.scriptTagHolder.startLongPoll(this.id, this.password), this.addDisconnectPingFrame(this.id, this.password);
      }
    }, {
      key: "markConnectionHealthy",
      value: function markConnectionHealthy() {}
    }, {
      key: "shutdown_",
      value: function shutdown_() {
        this.isClosed_ = !0, this.scriptTagHolder && (this.scriptTagHolder.close(), this.scriptTagHolder = null), this.myDisconnFrame && (document.body.removeChild(this.myDisconnFrame), this.myDisconnFrame = null), this.connectTimeoutTimer_ && (clearTimeout(this.connectTimeoutTimer_), this.connectTimeoutTimer_ = null);
      }
    }, {
      key: "onClosed_",
      value: function onClosed_() {
        this.isClosed_ || (this.log_("Longpoll is closing itself"), this.shutdown_(), this.onDisconnect_ && (this.onDisconnect_(this.everConnected_), this.onDisconnect_ = null));
      }
    }, {
      key: "close",
      value: function close() {
        this.isClosed_ || (this.log_("Longpoll is being closed."), this.shutdown_());
      }
    }, {
      key: "send",
      value: function send(e) {
        var t = f(e);
        this.bytesSent += t.length, this.stats_.incrementCounter("bytes_sent", t.length);
        var n = s(t),
            i = Ye(n, 1840);

        for (var _e18 = 0; _e18 < i.length; _e18++) {
          this.scriptTagHolder.enqueueSegment(this.curSegmentNum, i.length, i[_e18]), this.curSegmentNum++;
        }
      }
    }, {
      key: "addDisconnectPingFrame",
      value: function addDisconnectPingFrame(e, t) {
        this.myDisconnFrame = document.createElement("iframe");
        var n = {
          dframe: "t"
        };
        n.id = e, n.pw = t, this.myDisconnFrame.src = this.urlFn(n), this.myDisconnFrame.style.display = "none", document.body.appendChild(this.myDisconnFrame);
      }
    }, {
      key: "incrementIncomingBytes_",
      value: function incrementIncomingBytes_(e) {
        var t = f(e).length;
        this.bytesReceived += t, this.stats_.incrementCounter("bytes_received", t);
      }
    }], [{
      key: "forceAllow",
      value: function forceAllow() {
        pt.forceAllow_ = !0;
      }
    }, {
      key: "forceDisallow",
      value: function forceDisallow() {
        pt.forceDisallow_ = !0;
      }
    }, {
      key: "isAvailable",
      value: function isAvailable() {
        return !(!pt.forceAllow_ && (pt.forceDisallow_ || "undefined" == typeof document || null == document.createElement || "object" == (typeof window === "undefined" ? "undefined" : _typeof(window)) && window.chrome && window.chrome.extension && !/^chrome/.test(window.location.href) || "object" == (typeof Windows === "undefined" ? "undefined" : _typeof(Windows)) && "object" == _typeof(Windows.UI)));
      }
    }]);

    return pt;
  }();

  var _t = /*#__PURE__*/function () {
    function _t(e, t, n, i) {
      _classCallCheck(this, _t);

      this.onDisconnect = n, this.urlFn = i, this.outstandingRequests = new Set(), this.pendingSegs = [], this.currentSerial = Math.floor(1e8 * Math.random()), this.sendNewPolls = !0;
      {
        this.uniqueCallbackIdentifier = Re(), window["pLPCommand" + this.uniqueCallbackIdentifier] = e, window["pRTLPCB" + this.uniqueCallbackIdentifier] = t, this.myIFrame = _t.createIFrame_();
        var _n18 = "";
        this.myIFrame.src && "javascript:" === this.myIFrame.src.substr(0, "javascript:".length) && (_n18 = '<script>document.domain="' + document.domain + '";<\/script>');

        var _i15 = "<html><body>" + _n18 + "</body></html>";

        try {
          this.myIFrame.doc.open(), this.myIFrame.doc.write(_i15), this.myIFrame.doc.close();
        } catch (e) {
          Me("frame writing exception"), e.stack && Me(e.stack), Me(e);
        }
      }
    }

    _createClass(_t, [{
      key: "close",
      value: function close() {
        var _this13 = this;

        this.alive = !1, this.myIFrame && (this.myIFrame.doc.body.innerHTML = "", setTimeout(function () {
          null !== _this13.myIFrame && (document.body.removeChild(_this13.myIFrame), _this13.myIFrame = null);
        }, Math.floor(0)));
        var e = this.onDisconnect;
        e && (this.onDisconnect = null, e());
      }
    }, {
      key: "startLongPoll",
      value: function startLongPoll(e, t) {
        for (this.myID = e, this.myPW = t, this.alive = !0; this.newRequest_();) {
          ;
        }
      }
    }, {
      key: "newRequest_",
      value: function newRequest_() {
        if (this.alive && this.sendNewPolls && this.outstandingRequests.size < (this.pendingSegs.length > 0 ? 2 : 1)) {
          this.currentSerial++;
          var _e19 = {};
          _e19.id = this.myID, _e19.pw = this.myPW, _e19.ser = this.currentSerial;
          var t = this.urlFn(_e19),
              _n19 = "",
              _i16 = 0;

          for (; this.pendingSegs.length > 0 && this.pendingSegs[0].d.length + 30 + _n19.length <= 1870;) {
            var _e20 = this.pendingSegs.shift();

            _n19 = _n19 + "&seg" + _i16 + "=" + _e20.seg + "&ts" + _i16 + "=" + _e20.ts + "&d" + _i16 + "=" + _e20.d, _i16++;
          }

          return t += _n19, this.addLongPollTag_(t, this.currentSerial), !0;
        }

        return !1;
      }
    }, {
      key: "enqueueSegment",
      value: function enqueueSegment(e, t, n) {
        this.pendingSegs.push({
          seg: e,
          ts: t,
          d: n
        }), this.alive && this.newRequest_();
      }
    }, {
      key: "addLongPollTag_",
      value: function addLongPollTag_(e, t) {
        var _this14 = this;

        this.outstandingRequests.add(t);

        var n = function n() {
          _this14.outstandingRequests["delete"](t), _this14.newRequest_();
        },
            i = setTimeout(n, Math.floor(25e3));

        this.addTag(e, function () {
          clearTimeout(i), n();
        });
      }
    }, {
      key: "addTag",
      value: function addTag(e, t) {
        var _this15 = this;

        setTimeout(function () {
          try {
            if (!_this15.sendNewPolls) return;

            var _n20 = _this15.myIFrame.doc.createElement("script");

            _n20.type = "text/javascript", _n20.async = !0, _n20.src = e, _n20.onload = _n20.onreadystatechange = function () {
              var e = _n20.readyState;
              e && "loaded" !== e && "complete" !== e || (_n20.onload = _n20.onreadystatechange = null, _n20.parentNode && _n20.parentNode.removeChild(_n20), t());
            }, _n20.onerror = function () {
              Me("Long-poll script failed to load: " + e), _this15.sendNewPolls = !1, _this15.close();
            }, _this15.myIFrame.doc.body.appendChild(_n20);
          } catch (e) {}
        }, Math.floor(1));
      }
    }], [{
      key: "createIFrame_",
      value: function createIFrame_() {
        var e = document.createElement("iframe");
        if (e.style.display = "none", !document.body) throw "Document body has not initialized. Wait to initialize Firebase until after the document is ready.";
        document.body.appendChild(e);

        try {
          e.contentWindow.document || Me("No IE domain setting required");
        } catch (t) {
          var _n21 = document.domain;
          e.src = "javascript:void((function(){document.open();document.domain='" + _n21 + "';document.close();})())";
        }

        return e.contentDocument ? e.doc = e.contentDocument : e.contentWindow ? e.doc = e.contentWindow.document : e.document && (e.doc = e.document), e;
      }
    }]);

    return _t;
  }();

  var ft = null;
  "undefined" != typeof MozWebSocket ? ft = MozWebSocket : "undefined" != typeof WebSocket && (ft = WebSocket);

  var gt = /*#__PURE__*/function () {
    function gt(e, t, n, i, s, r, o) {
      _classCallCheck(this, gt);

      this.connId = e, this.applicationId = n, this.appCheckToken = i, this.authToken = s, this.keepaliveTimer = null, this.frames = null, this.totalFrames = 0, this.bytesSent = 0, this.bytesReceived = 0, this.log_ = Le(this.connId), this.stats_ = ut(t), this.connURL = gt.connectionURL_(t, r, o, i, n), this.nodeAdmin = t.nodeAdmin;
    }

    _createClass(gt, [{
      key: "open",
      value: function open(e, t) {
        var _this16 = this;

        this.onDisconnect = t, this.onMessage = e, this.log_("Websocket connecting to " + this.connURL), this.everConnected_ = !1, ke.set("previous_websocket_failure", !0);

        try {
          var _e21;

          0, this.mySock = new ft(this.connURL, [], _e21);
        } catch (e) {
          this.log_("Error instantiating WebSocket.");

          var _t15 = e.message || e.data;

          return _t15 && this.log_(_t15), void this.onClosed_();
        }

        this.mySock.onopen = function () {
          _this16.log_("Websocket connected."), _this16.everConnected_ = !0;
        }, this.mySock.onclose = function () {
          _this16.log_("Websocket connection was disconnected."), _this16.mySock = null, _this16.onClosed_();
        }, this.mySock.onmessage = function (e) {
          _this16.handleIncomingFrame(e);
        }, this.mySock.onerror = function (e) {
          _this16.log_("WebSocket error.  Closing connection.");

          var t = e.message || e.data;
          t && _this16.log_(t), _this16.onClosed_();
        };
      }
    }, {
      key: "start",
      value: function start() {}
    }, {
      key: "markConnectionHealthy",
      value: function markConnectionHealthy() {
        ke.remove("previous_websocket_failure");
      }
    }, {
      key: "appendFrame_",
      value: function appendFrame_(e) {
        if (this.frames.push(e), this.frames.length === this.totalFrames) {
          var _e22 = this.frames.join("");

          this.frames = null;

          var t = _(_e22);

          this.onMessage(t);
        }
      }
    }, {
      key: "handleNewFrameCount_",
      value: function handleNewFrameCount_(e) {
        this.totalFrames = e, this.frames = [];
      }
    }, {
      key: "extractFrameCount_",
      value: function extractFrameCount_(t) {
        if (e(null === this.frames, "We already have a frame buffer"), t.length <= 6) {
          var _e23 = Number(t);

          if (!isNaN(_e23)) return this.handleNewFrameCount_(_e23), null;
        }

        return this.handleNewFrameCount_(1), t;
      }
    }, {
      key: "handleIncomingFrame",
      value: function handleIncomingFrame(e) {
        if (null === this.mySock) return;
        var t = e.data;
        if (this.bytesReceived += t.length, this.stats_.incrementCounter("bytes_received", t.length), this.resetKeepAlive(), null !== this.frames) this.appendFrame_(t);else {
          var _e24 = this.extractFrameCount_(t);

          null !== _e24 && this.appendFrame_(_e24);
        }
      }
    }, {
      key: "send",
      value: function send(e) {
        this.resetKeepAlive();
        var t = f(e);
        this.bytesSent += t.length, this.stats_.incrementCounter("bytes_sent", t.length);
        var n = Ye(t, 16384);
        n.length > 1 && this.sendString_(String(n.length));

        for (var _e25 = 0; _e25 < n.length; _e25++) {
          this.sendString_(n[_e25]);
        }
      }
    }, {
      key: "shutdown_",
      value: function shutdown_() {
        this.isClosed_ = !0, this.keepaliveTimer && (clearInterval(this.keepaliveTimer), this.keepaliveTimer = null), this.mySock && (this.mySock.close(), this.mySock = null);
      }
    }, {
      key: "onClosed_",
      value: function onClosed_() {
        this.isClosed_ || (this.log_("WebSocket is closing itself"), this.shutdown_(), this.onDisconnect && (this.onDisconnect(this.everConnected_), this.onDisconnect = null));
      }
    }, {
      key: "close",
      value: function close() {
        this.isClosed_ || (this.log_("WebSocket is being closed"), this.shutdown_());
      }
    }, {
      key: "resetKeepAlive",
      value: function resetKeepAlive() {
        var _this17 = this;

        clearInterval(this.keepaliveTimer), this.keepaliveTimer = setInterval(function () {
          _this17.mySock && _this17.sendString_("0"), _this17.resetKeepAlive();
        }, Math.floor(45e3));
      }
    }, {
      key: "sendString_",
      value: function sendString_(e) {
        try {
          this.mySock.send(e);
        } catch (e) {
          this.log_("Exception thrown from WebSocket.send():", e.message || e.data, "Closing connection."), setTimeout(this.onClosed_.bind(this), 0);
        }
      }
    }], [{
      key: "connectionURL_",
      value: function connectionURL_(e, t, n, i, s) {
        var r = {
          v: "5"
        };
        return "undefined" != typeof location && location.hostname && it.test(location.hostname) && (r.r = "f"), t && (r.s = t), n && (r.ls = n), i && (r.ac = i), s && (r.p = s), at(e, st, r);
      }
    }, {
      key: "forceDisallow",
      value: function forceDisallow() {
        gt.forceDisallow_ = !0;
      }
    }, {
      key: "isAvailable",
      value: function isAvailable() {
        var e = !1;

        if ("undefined" != typeof navigator && navigator.userAgent) {
          var t = /Android ([0-9]{0,}\.[0-9]{0,})/,
              _n22 = navigator.userAgent.match(t);

          _n22 && _n22.length > 1 && parseFloat(_n22[1]) < 4.4 && (e = !0);
        }

        return !e && null !== ft && !gt.forceDisallow_;
      }
    }, {
      key: "previouslyFailed",
      value: function previouslyFailed() {
        return ke.isInMemoryStorage || !0 === ke.get("previous_websocket_failure");
      }
    }]);

    return gt;
  }();

  gt.responsesRequiredToBeHealthy = 2, gt.healthyTimeout = 3e4;

  var mt = /*#__PURE__*/function () {
    function mt(e) {
      _classCallCheck(this, mt);

      this.initTransports_(e);
    }

    _createClass(mt, [{
      key: "initTransports_",
      value: function initTransports_(e) {
        var t = gt && gt.isAvailable();
        var n = t && !gt.previouslyFailed();
        if (e.webSocketOnly && (t || We("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."), n = !0), n) this.transports_ = [gt];else {
          var _e26 = this.transports_ = [];

          var _iterator6 = _createForOfIteratorHelper(mt.ALL_TRANSPORTS),
              _step6;

          try {
            for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
              var _t16 = _step6.value;
              _t16 && _t16.isAvailable() && _e26.push(_t16);
            }
          } catch (err) {
            _iterator6.e(err);
          } finally {
            _iterator6.f();
          }

          mt.globalTransportInitialized_ = !0;
        }
      }
    }, {
      key: "initialTransport",
      value: function initialTransport() {
        if (this.transports_.length > 0) return this.transports_[0];
        throw new Error("No transports available");
      }
    }, {
      key: "upgradeTransport",
      value: function upgradeTransport() {
        return this.transports_.length > 1 ? this.transports_[1] : null;
      }
    }], [{
      key: "ALL_TRANSPORTS",
      get: function get() {
        return [pt, gt];
      }
    }, {
      key: "IS_TRANSPORT_INITIALIZED",
      get: function get() {
        return this.globalTransportInitialized_;
      }
    }]);

    return mt;
  }();

  mt.globalTransportInitialized_ = !1;

  var yt = /*#__PURE__*/function () {
    function yt(e, t, n, i, s, r, o, a, l, h) {
      _classCallCheck(this, yt);

      this.id = e, this.repoInfo_ = t, this.applicationId_ = n, this.appCheckToken_ = i, this.authToken_ = s, this.onMessage_ = r, this.onReady_ = o, this.onDisconnect_ = a, this.onKill_ = l, this.lastSessionId = h, this.connectionCount = 0, this.pendingDataMessages = [], this.state_ = 0, this.log_ = Le("c:" + this.id + ":"), this.transportManager_ = new mt(t), this.log_("Connection created"), this.start_();
    }

    _createClass(yt, [{
      key: "start_",
      value: function start_() {
        var _this18 = this;

        var e = this.transportManager_.initialTransport();
        this.conn_ = new e(this.nextTransportId_(), this.repoInfo_, this.applicationId_, this.appCheckToken_, this.authToken_, null, this.lastSessionId), this.primaryResponsesRequired_ = e.responsesRequiredToBeHealthy || 0;
        var t = this.connReceiver_(this.conn_),
            n = this.disconnReceiver_(this.conn_);
        this.tx_ = this.conn_, this.rx_ = this.conn_, this.secondaryConn_ = null, this.isHealthy_ = !1, setTimeout(function () {
          _this18.conn_ && _this18.conn_.open(t, n);
        }, Math.floor(0));
        var i = e.healthyTimeout || 0;
        i > 0 && (this.healthyTimeout_ = Ze(function () {
          _this18.healthyTimeout_ = null, _this18.isHealthy_ || (_this18.conn_ && _this18.conn_.bytesReceived > 102400 ? (_this18.log_("Connection exceeded healthy timeout but has received " + _this18.conn_.bytesReceived + " bytes.  Marking connection healthy."), _this18.isHealthy_ = !0, _this18.conn_.markConnectionHealthy()) : _this18.conn_ && _this18.conn_.bytesSent > 10240 ? _this18.log_("Connection exceeded healthy timeout but has sent " + _this18.conn_.bytesSent + " bytes.  Leaving connection alive.") : (_this18.log_("Closing unhealthy connection after timeout."), _this18.close()));
        }, Math.floor(i)));
      }
    }, {
      key: "nextTransportId_",
      value: function nextTransportId_() {
        return "c:" + this.id + ":" + this.connectionCount++;
      }
    }, {
      key: "disconnReceiver_",
      value: function disconnReceiver_(e) {
        var _this19 = this;

        return function (t) {
          e === _this19.conn_ ? _this19.onConnectionLost_(t) : e === _this19.secondaryConn_ ? (_this19.log_("Secondary connection lost."), _this19.onSecondaryConnectionLost_()) : _this19.log_("closing an old connection");
        };
      }
    }, {
      key: "connReceiver_",
      value: function connReceiver_(e) {
        var _this20 = this;

        return function (t) {
          2 !== _this20.state_ && (e === _this20.rx_ ? _this20.onPrimaryMessageReceived_(t) : e === _this20.secondaryConn_ ? _this20.onSecondaryMessageReceived_(t) : _this20.log_("message on old connection"));
        };
      }
    }, {
      key: "sendRequest",
      value: function sendRequest(e) {
        var t = {
          t: "d",
          d: e
        };
        this.sendData_(t);
      }
    }, {
      key: "tryCleanupConnection",
      value: function tryCleanupConnection() {
        this.tx_ === this.secondaryConn_ && this.rx_ === this.secondaryConn_ && (this.log_("cleaning up and promoting a connection: " + this.secondaryConn_.connId), this.conn_ = this.secondaryConn_, this.secondaryConn_ = null);
      }
    }, {
      key: "onSecondaryControl_",
      value: function onSecondaryControl_(e) {
        if ("t" in e) {
          var t = e.t;
          "a" === t ? this.upgradeIfSecondaryHealthy_() : "r" === t ? (this.log_("Got a reset on secondary, closing it"), this.secondaryConn_.close(), this.tx_ !== this.secondaryConn_ && this.rx_ !== this.secondaryConn_ || this.close()) : "o" === t && (this.log_("got pong on secondary."), this.secondaryResponsesRequired_--, this.upgradeIfSecondaryHealthy_());
        }
      }
    }, {
      key: "onSecondaryMessageReceived_",
      value: function onSecondaryMessageReceived_(e) {
        var t = Ve("t", e),
            n = Ve("d", e);
        if ("c" === t) this.onSecondaryControl_(n);else {
          if ("d" !== t) throw new Error("Unknown protocol layer: " + t);
          this.pendingDataMessages.push(n);
        }
      }
    }, {
      key: "upgradeIfSecondaryHealthy_",
      value: function upgradeIfSecondaryHealthy_() {
        this.secondaryResponsesRequired_ <= 0 ? (this.log_("Secondary connection is healthy."), this.isHealthy_ = !0, this.secondaryConn_.markConnectionHealthy(), this.proceedWithUpgrade_()) : (this.log_("sending ping on secondary."), this.secondaryConn_.send({
          t: "c",
          d: {
            t: "p",
            d: {}
          }
        }));
      }
    }, {
      key: "proceedWithUpgrade_",
      value: function proceedWithUpgrade_() {
        this.secondaryConn_.start(), this.log_("sending client ack on secondary"), this.secondaryConn_.send({
          t: "c",
          d: {
            t: "a",
            d: {}
          }
        }), this.log_("Ending transmission on primary"), this.conn_.send({
          t: "c",
          d: {
            t: "n",
            d: {}
          }
        }), this.tx_ = this.secondaryConn_, this.tryCleanupConnection();
      }
    }, {
      key: "onPrimaryMessageReceived_",
      value: function onPrimaryMessageReceived_(e) {
        var t = Ve("t", e),
            n = Ve("d", e);
        "c" === t ? this.onControl_(n) : "d" === t && this.onDataMessage_(n);
      }
    }, {
      key: "onDataMessage_",
      value: function onDataMessage_(e) {
        this.onPrimaryResponse_(), this.onMessage_(e);
      }
    }, {
      key: "onPrimaryResponse_",
      value: function onPrimaryResponse_() {
        this.isHealthy_ || (this.primaryResponsesRequired_--, this.primaryResponsesRequired_ <= 0 && (this.log_("Primary connection is healthy."), this.isHealthy_ = !0, this.conn_.markConnectionHealthy()));
      }
    }, {
      key: "onControl_",
      value: function onControl_(e) {
        var t = Ve("t", e);

        if ("d" in e) {
          var _n23 = e.d;
          if ("h" === t) this.onHandshake_(_n23);else if ("n" === t) {
            this.log_("recvd end transmission on primary"), this.rx_ = this.secondaryConn_;

            for (var _e27 = 0; _e27 < this.pendingDataMessages.length; ++_e27) {
              this.onDataMessage_(this.pendingDataMessages[_e27]);
            }

            this.pendingDataMessages = [], this.tryCleanupConnection();
          } else "s" === t ? this.onConnectionShutdown_(_n23) : "r" === t ? this.onReset_(_n23) : "e" === t ? Fe("Server Error: " + _n23) : "o" === t ? (this.log_("got pong on primary."), this.onPrimaryResponse_(), this.sendPingOnPrimaryIfNecessary_()) : Fe("Unknown control packet command: " + t);
        }
      }
    }, {
      key: "onHandshake_",
      value: function onHandshake_(e) {
        var t = e.ts,
            n = e.v,
            i = e.h;
        this.sessionId = e.s, this.repoInfo_.host = i, 0 === this.state_ && (this.conn_.start(), this.onConnectionEstablished_(this.conn_, t), "5" !== n && We("Protocol version mismatch detected"), this.tryStartUpgrade_());
      }
    }, {
      key: "tryStartUpgrade_",
      value: function tryStartUpgrade_() {
        var e = this.transportManager_.upgradeTransport();
        e && this.startUpgrade_(e);
      }
    }, {
      key: "startUpgrade_",
      value: function startUpgrade_(e) {
        var _this21 = this;

        this.secondaryConn_ = new e(this.nextTransportId_(), this.repoInfo_, this.applicationId_, this.appCheckToken_, this.authToken_, this.sessionId), this.secondaryResponsesRequired_ = e.responsesRequiredToBeHealthy || 0;
        var t = this.connReceiver_(this.secondaryConn_),
            n = this.disconnReceiver_(this.secondaryConn_);
        this.secondaryConn_.open(t, n), Ze(function () {
          _this21.secondaryConn_ && (_this21.log_("Timed out trying to upgrade."), _this21.secondaryConn_.close());
        }, Math.floor(6e4));
      }
    }, {
      key: "onReset_",
      value: function onReset_(e) {
        this.log_("Reset packet received.  New host: " + e), this.repoInfo_.host = e, 1 === this.state_ ? this.close() : (this.closeConnections_(), this.start_());
      }
    }, {
      key: "onConnectionEstablished_",
      value: function onConnectionEstablished_(e, t) {
        var _this22 = this;

        this.log_("Realtime connection established."), this.conn_ = e, this.state_ = 1, this.onReady_ && (this.onReady_(t, this.sessionId), this.onReady_ = null), 0 === this.primaryResponsesRequired_ ? (this.log_("Primary connection is healthy."), this.isHealthy_ = !0) : Ze(function () {
          _this22.sendPingOnPrimaryIfNecessary_();
        }, Math.floor(5e3));
      }
    }, {
      key: "sendPingOnPrimaryIfNecessary_",
      value: function sendPingOnPrimaryIfNecessary_() {
        this.isHealthy_ || 1 !== this.state_ || (this.log_("sending ping on primary."), this.sendData_({
          t: "c",
          d: {
            t: "p",
            d: {}
          }
        }));
      }
    }, {
      key: "onSecondaryConnectionLost_",
      value: function onSecondaryConnectionLost_() {
        var e = this.secondaryConn_;
        this.secondaryConn_ = null, this.tx_ !== e && this.rx_ !== e || this.close();
      }
    }, {
      key: "onConnectionLost_",
      value: function onConnectionLost_(e) {
        this.conn_ = null, e || 0 !== this.state_ ? 1 === this.state_ && this.log_("Realtime connection lost.") : (this.log_("Realtime connection failed."), this.repoInfo_.isCacheableHost() && (ke.remove("host:" + this.repoInfo_.host), this.repoInfo_.internalHost = this.repoInfo_.host)), this.close();
      }
    }, {
      key: "onConnectionShutdown_",
      value: function onConnectionShutdown_(e) {
        this.log_("Connection shutdown command received. Shutting down..."), this.onKill_ && (this.onKill_(e), this.onKill_ = null), this.onDisconnect_ = null, this.close();
      }
    }, {
      key: "sendData_",
      value: function sendData_(e) {
        if (1 !== this.state_) throw "Connection is not connected";
        this.tx_.send(e);
      }
    }, {
      key: "close",
      value: function close() {
        2 !== this.state_ && (this.log_("Closing realtime connection."), this.state_ = 2, this.closeConnections_(), this.onDisconnect_ && (this.onDisconnect_(), this.onDisconnect_ = null));
      }
    }, {
      key: "closeConnections_",
      value: function closeConnections_() {
        this.log_("Shutting down all connections"), this.conn_ && (this.conn_.close(), this.conn_ = null), this.secondaryConn_ && (this.secondaryConn_.close(), this.secondaryConn_ = null), this.healthyTimeout_ && (clearTimeout(this.healthyTimeout_), this.healthyTimeout_ = null);
      }
    }]);

    return yt;
  }();

  var vt = /*#__PURE__*/function () {
    function vt() {
      _classCallCheck(this, vt);
    }

    _createClass(vt, [{
      key: "put",
      value: function put(e, t, n, i) {}
    }, {
      key: "merge",
      value: function merge(e, t, n, i) {}
    }, {
      key: "refreshAuthToken",
      value: function refreshAuthToken(e) {}
    }, {
      key: "refreshAppCheckToken",
      value: function refreshAppCheckToken(e) {}
    }, {
      key: "onDisconnectPut",
      value: function onDisconnectPut(e, t, n) {}
    }, {
      key: "onDisconnectMerge",
      value: function onDisconnectMerge(e, t, n) {}
    }, {
      key: "onDisconnectCancel",
      value: function onDisconnectCancel(e, t) {}
    }, {
      key: "reportStats",
      value: function reportStats(e) {}
    }]);

    return vt;
  }();

  var Ct = /*#__PURE__*/function () {
    function Ct(t) {
      _classCallCheck(this, Ct);

      this.allowedEvents_ = t, this.listeners_ = {}, e(Array.isArray(t) && t.length > 0, "Requires a non-empty array");
    }

    _createClass(Ct, [{
      key: "trigger",
      value: function trigger(e) {
        if (Array.isArray(this.listeners_[e])) {
          var _n24 = _toConsumableArray(this.listeners_[e]);

          for (var _len15 = arguments.length, t = new Array(_len15 > 1 ? _len15 - 1 : 0), _key15 = 1; _key15 < _len15; _key15++) {
            t[_key15 - 1] = arguments[_key15];
          }

          for (var _e28 = 0; _e28 < _n24.length; _e28++) {
            _n24[_e28].callback.apply(_n24[_e28].context, t);
          }
        }
      }
    }, {
      key: "on",
      value: function on(e, t, n) {
        this.validateEventType_(e), this.listeners_[e] = this.listeners_[e] || [], this.listeners_[e].push({
          callback: t,
          context: n
        });
        var i = this.getInitialEvent(e);
        i && t.apply(n, i);
      }
    }, {
      key: "off",
      value: function off(e, t, n) {
        this.validateEventType_(e);
        var i = this.listeners_[e] || [];

        for (var _e29 = 0; _e29 < i.length; _e29++) {
          if (i[_e29].callback === t && (!n || n === i[_e29].context)) return void i.splice(_e29, 1);
        }
      }
    }, {
      key: "validateEventType_",
      value: function validateEventType_(t) {
        e(this.allowedEvents_.find(function (e) {
          return e === t;
        }), "Unknown event: " + t);
      }
    }]);

    return Ct;
  }();

  var wt = /*#__PURE__*/function (_Ct) {
    _inherits(wt, _Ct);

    var _super2 = _createSuper(wt);

    function wt() {
      var _this23;

      _classCallCheck(this, wt);

      _this23 = _super2.call(this, ["online"]), _this23.online_ = !0, "undefined" == typeof window || void 0 === window.addEventListener || c() || (window.addEventListener("online", function () {
        _this23.online_ || (_this23.online_ = !0, _this23.trigger("online", !0));
      }, !1), window.addEventListener("offline", function () {
        _this23.online_ && (_this23.online_ = !1, _this23.trigger("online", !1));
      }, !1));
      return _this23;
    }

    _createClass(wt, [{
      key: "getInitialEvent",
      value: function getInitialEvent(t) {
        return e("online" === t, "Unknown event type: " + t), [this.online_];
      }
    }, {
      key: "currentlyOnline",
      value: function currentlyOnline() {
        return this.online_;
      }
    }], [{
      key: "getInstance",
      value: function getInstance() {
        return new wt();
      }
    }]);

    return wt;
  }(Ct);

  var bt = /*#__PURE__*/function () {
    function bt(e, t) {
      _classCallCheck(this, bt);

      if (void 0 === t) {
        this.pieces_ = e.split("/");
        var _t17 = 0;

        for (var _e30 = 0; _e30 < this.pieces_.length; _e30++) {
          this.pieces_[_e30].length > 0 && (this.pieces_[_t17] = this.pieces_[_e30], _t17++);
        }

        this.pieces_.length = _t17, this.pieceNum_ = 0;
      } else this.pieces_ = e, this.pieceNum_ = t;
    }

    _createClass(bt, [{
      key: "toString",
      value: function toString() {
        var e = "";

        for (var t = this.pieceNum_; t < this.pieces_.length; t++) {
          "" !== this.pieces_[t] && (e += "/" + this.pieces_[t]);
        }

        return e || "/";
      }
    }]);

    return bt;
  }();

  function It() {
    return new bt("");
  }

  function Et(e) {
    return e.pieceNum_ >= e.pieces_.length ? null : e.pieces_[e.pieceNum_];
  }

  function Tt(e) {
    return e.pieces_.length - e.pieceNum_;
  }

  function St(e) {
    var t = e.pieceNum_;
    return t < e.pieces_.length && t++, new bt(e.pieces_, t);
  }

  function kt(e) {
    return e.pieceNum_ < e.pieces_.length ? e.pieces_[e.pieces_.length - 1] : null;
  }

  function Nt(e) {
    var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    return e.pieces_.slice(e.pieceNum_ + t);
  }

  function Pt(e) {
    if (e.pieceNum_ >= e.pieces_.length) return null;
    var t = [];

    for (var _n25 = e.pieceNum_; _n25 < e.pieces_.length - 1; _n25++) {
      t.push(e.pieces_[_n25]);
    }

    return new bt(t, 0);
  }

  function Rt(e, t) {
    var n = [];

    for (var _t18 = e.pieceNum_; _t18 < e.pieces_.length; _t18++) {
      n.push(e.pieces_[_t18]);
    }

    if (t instanceof bt) for (var _e31 = t.pieceNum_; _e31 < t.pieces_.length; _e31++) {
      n.push(t.pieces_[_e31]);
    } else {
      var _e32 = t.split("/");

      for (var _t19 = 0; _t19 < _e32.length; _t19++) {
        _e32[_t19].length > 0 && n.push(_e32[_t19]);
      }
    }
    return new bt(n, 0);
  }

  function xt(e) {
    return e.pieceNum_ >= e.pieces_.length;
  }

  function Dt(e, t) {
    var n = Et(e),
        i = Et(t);
    if (null === n) return t;
    if (n === i) return Dt(St(e), St(t));
    throw new Error("INTERNAL ERROR: innerPath (" + t + ") is not within outerPath (" + e + ")");
  }

  function At(e, t) {
    var n = Nt(e, 0),
        i = Nt(t, 0);

    for (var _e33 = 0; _e33 < n.length && _e33 < i.length; _e33++) {
      var _t20 = He(n[_e33], i[_e33]);

      if (0 !== _t20) return _t20;
    }

    return n.length === i.length ? 0 : n.length < i.length ? -1 : 1;
  }

  function Ot(e, t) {
    if (Tt(e) !== Tt(t)) return !1;

    for (var _n26 = e.pieceNum_, _i17 = t.pieceNum_; _n26 <= e.pieces_.length; _n26++, _i17++) {
      if (e.pieces_[_n26] !== t.pieces_[_i17]) return !1;
    }

    return !0;
  }

  function Mt(e, t) {
    var n = e.pieceNum_,
        i = t.pieceNum_;
    if (Tt(e) > Tt(t)) return !1;

    for (; n < e.pieces_.length;) {
      if (e.pieces_[n] !== t.pieces_[i]) return !1;
      ++n, ++i;
    }

    return !0;
  }

  var Lt = /*#__PURE__*/_createClass(function Lt(e, t) {
    _classCallCheck(this, Lt);

    this.errorPrefix_ = t, this.parts_ = Nt(e, 0), this.byteLength_ = Math.max(1, this.parts_.length);

    for (var _e34 = 0; _e34 < this.parts_.length; _e34++) {
      this.byteLength_ += T(this.parts_[_e34]);
    }

    Ft(this);
  });

  function Ft(e) {
    if (e.byteLength_ > 768) throw new Error(e.errorPrefix_ + "has a key path longer than 768 bytes (" + e.byteLength_ + ").");
    if (e.parts_.length > 32) throw new Error(e.errorPrefix_ + "path specified exceeds the maximum depth that can be written (32) or object contains a cycle " + qt(e));
  }

  function qt(e) {
    return 0 === e.parts_.length ? "" : "in property '" + e.parts_.join(".") + "'";
  }

  var Wt = /*#__PURE__*/function (_Ct2) {
    _inherits(Wt, _Ct2);

    var _super3 = _createSuper(Wt);

    function Wt() {
      var _this24;

      _classCallCheck(this, Wt);

      var e, t;
      _this24 = _super3.call(this, ["visible"]), "undefined" != typeof document && void 0 !== document.addEventListener && (void 0 !== document.hidden ? (t = "visibilitychange", e = "hidden") : void 0 !== document.mozHidden ? (t = "mozvisibilitychange", e = "mozHidden") : void 0 !== document.msHidden ? (t = "msvisibilitychange", e = "msHidden") : void 0 !== document.webkitHidden && (t = "webkitvisibilitychange", e = "webkitHidden")), _this24.visible_ = !0, t && document.addEventListener(t, function () {
        var t = !document[e];
        t !== _this24.visible_ && (_this24.visible_ = t, _this24.trigger("visible", t));
      }, !1);
      return _this24;
    }

    _createClass(Wt, [{
      key: "getInitialEvent",
      value: function getInitialEvent(t) {
        return e("visible" === t, "Unknown event type: " + t), [this.visible_];
      }
    }], [{
      key: "getInstance",
      value: function getInstance() {
        return new Wt();
      }
    }]);

    return Wt;
  }(Ct);

  var Ut = 1e3;

  var jt = /*#__PURE__*/function (_vt) {
    _inherits(jt, _vt);

    var _super4 = _createSuper(jt);

    function jt(e, t, n, i, s, r, o, a) {
      var _this25;

      _classCallCheck(this, jt);

      if (_this25 = _super4.call(this), _this25.repoInfo_ = e, _this25.applicationId_ = t, _this25.onDataUpdate_ = n, _this25.onConnectStatus_ = i, _this25.onServerInfoUpdate_ = s, _this25.authTokenProvider_ = r, _this25.appCheckTokenProvider_ = o, _this25.authOverride_ = a, _this25.id = jt.nextPersistentConnectionId_++, _this25.log_ = Le("p:" + _this25.id + ":"), _this25.interruptReasons_ = {}, _this25.listens = new Map(), _this25.outstandingPuts_ = [], _this25.outstandingGets_ = [], _this25.outstandingPutCount_ = 0, _this25.outstandingGetCount_ = 0, _this25.onDisconnectRequestQueue_ = [], _this25.connected_ = !1, _this25.reconnectDelay_ = Ut, _this25.maxReconnectDelay_ = 3e5, _this25.securityDebugCallback_ = null, _this25.lastSessionId = null, _this25.establishConnectionTimer_ = null, _this25.visible_ = !1, _this25.requestCBHash_ = {}, _this25.requestNumber_ = 0, _this25.realtime_ = null, _this25.authToken_ = null, _this25.appCheckToken_ = null, _this25.forceTokenRefresh_ = !1, _this25.invalidAuthTokenCount_ = 0, _this25.invalidAppCheckTokenCount_ = 0, _this25.firstConnection_ = !0, _this25.lastConnectionAttemptTime_ = null, _this25.lastConnectionEstablishedTime_ = null, a) throw new Error("Auth override specified in options, but not supported on non Node.js platforms");
      Wt.getInstance().on("visible", _this25.onVisible_, _assertThisInitialized(_this25)), -1 === e.host.indexOf("fblocal") && wt.getInstance().on("online", _this25.onOnline_, _assertThisInitialized(_this25));
      return _possibleConstructorReturn(_this25);
    }

    _createClass(jt, [{
      key: "sendRequest",
      value: function sendRequest(t, n, i) {
        var s = ++this.requestNumber_,
            r = {
          r: s,
          a: t,
          b: n
        };
        this.log_(f(r)), e(this.connected_, "sendRequest call when we're not connected not allowed."), this.realtime_.sendRequest(r), i && (this.requestCBHash_[s] = i);
      }
    }, {
      key: "get",
      value: function get(e) {
        this.initConnection_();
        var t = new h(),
            n = {
          action: "g",
          request: {
            p: e._path.toString(),
            q: e._queryObject
          },
          onComplete: function onComplete(e) {
            var n = e.d;
            "ok" === e.s ? t.resolve(n) : t.reject(n);
          }
        };
        this.outstandingGets_.push(n), this.outstandingGetCount_++;
        var i = this.outstandingGets_.length - 1;
        return this.connected_ && this.sendGet_(i), t.promise;
      }
    }, {
      key: "listen",
      value: function listen(t, n, i, s) {
        this.initConnection_();

        var r = t._queryIdentifier,
            o = t._path.toString();

        this.log_("Listen called for " + o + " " + r), this.listens.has(o) || this.listens.set(o, new Map()), e(t._queryParams.isDefault() || !t._queryParams.loadsAllData(), "listen() called for non-default but complete query"), e(!this.listens.get(o).has(r), "listen() called twice for same path/queryId.");
        var a = {
          onComplete: s,
          hashFn: n,
          query: t,
          tag: i
        };
        this.listens.get(o).set(r, a), this.connected_ && this.sendListen_(a);
      }
    }, {
      key: "sendGet_",
      value: function sendGet_(e) {
        var _this26 = this;

        var t = this.outstandingGets_[e];
        this.sendRequest("g", t.request, function (n) {
          delete _this26.outstandingGets_[e], _this26.outstandingGetCount_--, 0 === _this26.outstandingGetCount_ && (_this26.outstandingGets_ = []), t.onComplete && t.onComplete(n);
        });
      }
    }, {
      key: "sendListen_",
      value: function sendListen_(e) {
        var _this27 = this;

        var t = e.query,
            n = t._path.toString(),
            i = t._queryIdentifier;

        this.log_("Listen on " + n + " for " + i);
        var s = {
          p: n
        };
        e.tag && (s.q = t._queryObject, s.t = e.tag), s.h = e.hashFn(), this.sendRequest("q", s, function (s) {
          var r = s.d,
              o = s.s;
          jt.warnOnListenWarnings_(r, t), (_this27.listens.get(n) && _this27.listens.get(n).get(i)) === e && (_this27.log_("listen response", s), "ok" !== o && _this27.removeListen_(n, i), e.onComplete && e.onComplete(o, r));
        });
      }
    }, {
      key: "refreshAuthToken",
      value: function refreshAuthToken(e) {
        this.authToken_ = e, this.log_("Auth token refreshed"), this.authToken_ ? this.tryAuth() : this.connected_ && this.sendRequest("unauth", {}, function () {}), this.reduceReconnectDelayIfAdminCredential_(e);
      }
    }, {
      key: "reduceReconnectDelayIfAdminCredential_",
      value: function reduceReconnectDelayIfAdminCredential_(e) {
        (e && 40 === e.length || function (e) {
          var t = g(e).claims;
          return "object" == _typeof(t) && !0 === t.admin;
        }(e)) && (this.log_("Admin auth credential detected.  Reducing max reconnect time."), this.maxReconnectDelay_ = 3e4);
      }
    }, {
      key: "refreshAppCheckToken",
      value: function refreshAppCheckToken(e) {
        this.appCheckToken_ = e, this.log_("App check token refreshed"), this.appCheckToken_ ? this.tryAppCheck() : this.connected_ && this.sendRequest("unappeck", {}, function () {});
      }
    }, {
      key: "tryAuth",
      value: function tryAuth() {
        var _this28 = this;

        if (this.connected_ && this.authToken_) {
          var _e35 = this.authToken_,
              t = function (e) {
            var t = g(e).claims;
            return !!t && "object" == _typeof(t) && t.hasOwnProperty("iat");
          }(_e35) ? "auth" : "gauth",
              _n27 = {
            cred: _e35
          };
          null === this.authOverride_ ? _n27.noauth = !0 : "object" == _typeof(this.authOverride_) && (_n27.authvar = this.authOverride_), this.sendRequest(t, _n27, function (t) {
            var n = t.s,
                i = t.d || "error";
            _this28.authToken_ === _e35 && ("ok" === n ? _this28.invalidAuthTokenCount_ = 0 : _this28.onAuthRevoked_(n, i));
          });
        }
      }
    }, {
      key: "tryAppCheck",
      value: function tryAppCheck() {
        var _this29 = this;

        this.connected_ && this.appCheckToken_ && this.sendRequest("appcheck", {
          token: this.appCheckToken_
        }, function (e) {
          var t = e.s,
              n = e.d || "error";
          "ok" === t ? _this29.invalidAppCheckTokenCount_ = 0 : _this29.onAppCheckRevoked_(t, n);
        });
      }
    }, {
      key: "unlisten",
      value: function unlisten(t, n) {
        var i = t._path.toString(),
            s = t._queryIdentifier;

        this.log_("Unlisten called for " + i + " " + s), e(t._queryParams.isDefault() || !t._queryParams.loadsAllData(), "unlisten() called for non-default but complete query"), this.removeListen_(i, s) && this.connected_ && this.sendUnlisten_(i, s, t._queryObject, n);
      }
    }, {
      key: "sendUnlisten_",
      value: function sendUnlisten_(e, t, n, i) {
        this.log_("Unlisten on " + e + " for " + t);
        var s = {
          p: e
        };
        i && (s.q = n, s.t = i), this.sendRequest("n", s);
      }
    }, {
      key: "onDisconnectPut",
      value: function onDisconnectPut(e, t, n) {
        this.initConnection_(), this.connected_ ? this.sendOnDisconnect_("o", e, t, n) : this.onDisconnectRequestQueue_.push({
          pathString: e,
          action: "o",
          data: t,
          onComplete: n
        });
      }
    }, {
      key: "onDisconnectMerge",
      value: function onDisconnectMerge(e, t, n) {
        this.initConnection_(), this.connected_ ? this.sendOnDisconnect_("om", e, t, n) : this.onDisconnectRequestQueue_.push({
          pathString: e,
          action: "om",
          data: t,
          onComplete: n
        });
      }
    }, {
      key: "onDisconnectCancel",
      value: function onDisconnectCancel(e, t) {
        this.initConnection_(), this.connected_ ? this.sendOnDisconnect_("oc", e, null, t) : this.onDisconnectRequestQueue_.push({
          pathString: e,
          action: "oc",
          data: null,
          onComplete: t
        });
      }
    }, {
      key: "sendOnDisconnect_",
      value: function sendOnDisconnect_(e, t, n, i) {
        var s = {
          p: t,
          d: n
        };
        this.log_("onDisconnect " + e, s), this.sendRequest(e, s, function (e) {
          i && setTimeout(function () {
            i(e.s, e.d);
          }, Math.floor(0));
        });
      }
    }, {
      key: "put",
      value: function put(e, t, n, i) {
        this.putInternal("p", e, t, n, i);
      }
    }, {
      key: "merge",
      value: function merge(e, t, n, i) {
        this.putInternal("m", e, t, n, i);
      }
    }, {
      key: "putInternal",
      value: function putInternal(e, t, n, i, s) {
        this.initConnection_();
        var r = {
          p: t,
          d: n
        };
        void 0 !== s && (r.h = s), this.outstandingPuts_.push({
          action: e,
          request: r,
          onComplete: i
        }), this.outstandingPutCount_++;
        var o = this.outstandingPuts_.length - 1;
        this.connected_ ? this.sendPut_(o) : this.log_("Buffering put: " + t);
      }
    }, {
      key: "sendPut_",
      value: function sendPut_(e) {
        var _this30 = this;

        var t = this.outstandingPuts_[e].action,
            n = this.outstandingPuts_[e].request,
            i = this.outstandingPuts_[e].onComplete;
        this.outstandingPuts_[e].queued = this.connected_, this.sendRequest(t, n, function (n) {
          _this30.log_(t + " response", n), delete _this30.outstandingPuts_[e], _this30.outstandingPutCount_--, 0 === _this30.outstandingPutCount_ && (_this30.outstandingPuts_ = []), i && i(n.s, n.d);
        });
      }
    }, {
      key: "reportStats",
      value: function reportStats(e) {
        var _this31 = this;

        if (this.connected_) {
          var t = {
            c: e
          };
          this.log_("reportStats", t), this.sendRequest("s", t, function (e) {
            if ("ok" !== e.s) {
              var _t21 = e.d;

              _this31.log_("reportStats", "Error sending stats: " + _t21);
            }
          });
        }
      }
    }, {
      key: "onDataMessage_",
      value: function onDataMessage_(e) {
        if ("r" in e) {
          this.log_("from server: " + f(e));
          var t = e.r,
              _n28 = this.requestCBHash_[t];
          _n28 && (delete this.requestCBHash_[t], _n28(e.b));
        } else {
          if ("error" in e) throw "A server-side error has occurred: " + e.error;
          "a" in e && this.onDataPush_(e.a, e.b);
        }
      }
    }, {
      key: "onDataPush_",
      value: function onDataPush_(e, t) {
        this.log_("handleServerMessage", e, t), "d" === e ? this.onDataUpdate_(t.p, t.d, !1, t.t) : "m" === e ? this.onDataUpdate_(t.p, t.d, !0, t.t) : "c" === e ? this.onListenRevoked_(t.p, t.q) : "ac" === e ? this.onAuthRevoked_(t.s, t.d) : "apc" === e ? this.onAppCheckRevoked_(t.s, t.d) : "sd" === e ? this.onSecurityDebugPacket_(t) : Fe("Unrecognized action received from server: " + f(e) + "\nAre you using the latest client?");
      }
    }, {
      key: "onReady_",
      value: function onReady_(e, t) {
        this.log_("connection ready"), this.connected_ = !0, this.lastConnectionEstablishedTime_ = new Date().getTime(), this.handleTimestamp_(e), this.lastSessionId = t, this.firstConnection_ && this.sendConnectStats_(), this.restoreState_(), this.firstConnection_ = !1, this.onConnectStatus_(!0);
      }
    }, {
      key: "scheduleConnect_",
      value: function scheduleConnect_(t) {
        var _this32 = this;

        e(!this.realtime_, "Scheduling a connect when we're already connected/ing?"), this.establishConnectionTimer_ && clearTimeout(this.establishConnectionTimer_), this.establishConnectionTimer_ = setTimeout(function () {
          _this32.establishConnectionTimer_ = null, _this32.establishConnection_();
        }, Math.floor(t));
      }
    }, {
      key: "initConnection_",
      value: function initConnection_() {
        !this.realtime_ && this.firstConnection_ && this.scheduleConnect_(0);
      }
    }, {
      key: "onVisible_",
      value: function onVisible_(e) {
        e && !this.visible_ && this.reconnectDelay_ === this.maxReconnectDelay_ && (this.log_("Window became visible.  Reducing delay."), this.reconnectDelay_ = Ut, this.realtime_ || this.scheduleConnect_(0)), this.visible_ = e;
      }
    }, {
      key: "onOnline_",
      value: function onOnline_(e) {
        e ? (this.log_("Browser went online."), this.reconnectDelay_ = Ut, this.realtime_ || this.scheduleConnect_(0)) : (this.log_("Browser went offline.  Killing connection."), this.realtime_ && this.realtime_.close());
      }
    }, {
      key: "onRealtimeDisconnect_",
      value: function onRealtimeDisconnect_() {
        if (this.log_("data client disconnected"), this.connected_ = !1, this.realtime_ = null, this.cancelSentTransactions_(), this.requestCBHash_ = {}, this.shouldReconnect_()) {
          this.visible_ ? this.lastConnectionEstablishedTime_ && (new Date().getTime() - this.lastConnectionEstablishedTime_ > 3e4 && (this.reconnectDelay_ = Ut), this.lastConnectionEstablishedTime_ = null) : (this.log_("Window isn't visible.  Delaying reconnect."), this.reconnectDelay_ = this.maxReconnectDelay_, this.lastConnectionAttemptTime_ = new Date().getTime());

          var _e36 = new Date().getTime() - this.lastConnectionAttemptTime_;

          var t = Math.max(0, this.reconnectDelay_ - _e36);
          t = Math.random() * t, this.log_("Trying to reconnect in " + t + "ms"), this.scheduleConnect_(t), this.reconnectDelay_ = Math.min(this.maxReconnectDelay_, 1.3 * this.reconnectDelay_);
        }

        this.onConnectStatus_(!1);
      }
    }, {
      key: "establishConnection_",
      value: function () {
        var _establishConnection_ = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
          var _this33 = this;

          var t, _n29, _i18, _s11, _r10, _o5, _a3, _l3, _h2, _c2, _yield$Promise$all, _yield$Promise$all2, _e37, _l4;

          return _regeneratorRuntime().wrap(function _callee10$(_context10) {
            while (1) {
              switch (_context10.prev = _context10.next) {
                case 0:
                  if (!this.shouldReconnect_()) {
                    _context10.next = 21;
                    break;
                  }

                  this.log_("Making a connection attempt"), this.lastConnectionAttemptTime_ = new Date().getTime(), this.lastConnectionEstablishedTime_ = null;
                  t = this.onDataMessage_.bind(this), _n29 = this.onReady_.bind(this), _i18 = this.onRealtimeDisconnect_.bind(this), _s11 = this.id + ":" + jt.nextConnectionId_++, _r10 = this.lastSessionId;
                  _o5 = !1, _a3 = null;
                  _l3 = function _l3() {
                    _a3 ? _a3.close() : (_o5 = !0, _i18());
                  }, _h2 = function _h2(t) {
                    e(_a3, "sendRequest call when we're not connected not allowed."), _a3.sendRequest(t);
                  };
                  this.realtime_ = {
                    close: _l3,
                    sendRequest: _h2
                  };
                  _c2 = this.forceTokenRefresh_;
                  this.forceTokenRefresh_ = !1;
                  _context10.prev = 8;
                  _context10.next = 11;
                  return Promise.all([this.authTokenProvider_.getToken(_c2), this.appCheckTokenProvider_.getToken(_c2)]);

                case 11:
                  _yield$Promise$all = _context10.sent;
                  _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
                  _e37 = _yield$Promise$all2[0];
                  _l4 = _yield$Promise$all2[1];
                  _o5 ? Me("getToken() completed but was canceled") : (Me("getToken() completed. Creating connection."), this.authToken_ = _e37 && _e37.accessToken, this.appCheckToken_ = _l4 && _l4.token, _a3 = new yt(_s11, this.repoInfo_, this.applicationId_, this.appCheckToken_, this.authToken_, t, _n29, _i18, function (e) {
                    We(e + " (" + _this33.repoInfo_.toString() + ")"), _this33.interrupt("server_kill");
                  }, _r10));
                  _context10.next = 21;
                  break;

                case 18:
                  _context10.prev = 18;
                  _context10.t0 = _context10["catch"](8);
                  this.log_("Failed to get token: " + _context10.t0), _o5 || (this.repoInfo_.nodeAdmin && We(_context10.t0), _l3());

                case 21:
                case "end":
                  return _context10.stop();
              }
            }
          }, _callee10, this, [[8, 18]]);
        }));

        function establishConnection_() {
          return _establishConnection_.apply(this, arguments);
        }

        return establishConnection_;
      }()
    }, {
      key: "interrupt",
      value: function interrupt(e) {
        Me("Interrupting connection for reason: " + e), this.interruptReasons_[e] = !0, this.realtime_ ? this.realtime_.close() : (this.establishConnectionTimer_ && (clearTimeout(this.establishConnectionTimer_), this.establishConnectionTimer_ = null), this.connected_ && this.onRealtimeDisconnect_());
      }
    }, {
      key: "resume",
      value: function resume(e) {
        Me("Resuming connection for reason: " + e), delete this.interruptReasons_[e], v(this.interruptReasons_) && (this.reconnectDelay_ = Ut, this.realtime_ || this.scheduleConnect_(0));
      }
    }, {
      key: "handleTimestamp_",
      value: function handleTimestamp_(e) {
        var t = e - new Date().getTime();
        this.onServerInfoUpdate_({
          serverTimeOffset: t
        });
      }
    }, {
      key: "cancelSentTransactions_",
      value: function cancelSentTransactions_() {
        for (var _e38 = 0; _e38 < this.outstandingPuts_.length; _e38++) {
          var t = this.outstandingPuts_[_e38];
          t && "h" in t.request && t.queued && (t.onComplete && t.onComplete("disconnect"), delete this.outstandingPuts_[_e38], this.outstandingPutCount_--);
        }

        0 === this.outstandingPutCount_ && (this.outstandingPuts_ = []);
      }
    }, {
      key: "onListenRevoked_",
      value: function onListenRevoked_(e, t) {
        var n;
        n = t ? t.map(function (e) {
          return $e(e);
        }).join("$") : "default";
        var i = this.removeListen_(e, n);
        i && i.onComplete && i.onComplete("permission_denied");
      }
    }, {
      key: "removeListen_",
      value: function removeListen_(e, t) {
        var n = new bt(e).toString();
        var i;

        if (this.listens.has(n)) {
          var _e39 = this.listens.get(n);

          i = _e39.get(t), _e39["delete"](t), 0 === _e39.size && this.listens["delete"](n);
        } else i = void 0;

        return i;
      }
    }, {
      key: "onAuthRevoked_",
      value: function onAuthRevoked_(e, t) {
        Me("Auth token revoked: " + e + "/" + t), this.authToken_ = null, this.forceTokenRefresh_ = !0, this.realtime_.close(), "invalid_token" !== e && "permission_denied" !== e || (this.invalidAuthTokenCount_++, this.invalidAuthTokenCount_ >= 3 && (this.reconnectDelay_ = 3e4, this.authTokenProvider_.notifyForInvalidToken()));
      }
    }, {
      key: "onAppCheckRevoked_",
      value: function onAppCheckRevoked_(e, t) {
        Me("App check token revoked: " + e + "/" + t), this.appCheckToken_ = null, this.forceTokenRefresh_ = !0, "invalid_token" !== e && "permission_denied" !== e || (this.invalidAppCheckTokenCount_++, this.invalidAppCheckTokenCount_ >= 3 && this.appCheckTokenProvider_.notifyForInvalidToken());
      }
    }, {
      key: "onSecurityDebugPacket_",
      value: function onSecurityDebugPacket_(e) {
        this.securityDebugCallback_ ? this.securityDebugCallback_(e) : "msg" in e && console.log("FIREBASE: " + e.msg.replace("\n", "\nFIREBASE: "));
      }
    }, {
      key: "restoreState_",
      value: function restoreState_() {
        this.tryAuth(), this.tryAppCheck();

        var _iterator7 = _createForOfIteratorHelper(this.listens.values()),
            _step7;

        try {
          for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
            var _e43 = _step7.value;

            var _iterator8 = _createForOfIteratorHelper(_e43.values()),
                _step8;

            try {
              for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
                var t = _step8.value;
                this.sendListen_(t);
              }
            } catch (err) {
              _iterator8.e(err);
            } finally {
              _iterator8.f();
            }
          }
        } catch (err) {
          _iterator7.e(err);
        } finally {
          _iterator7.f();
        }

        for (var _e40 = 0; _e40 < this.outstandingPuts_.length; _e40++) {
          this.outstandingPuts_[_e40] && this.sendPut_(_e40);
        }

        for (; this.onDisconnectRequestQueue_.length;) {
          var _e41 = this.onDisconnectRequestQueue_.shift();

          this.sendOnDisconnect_(_e41.action, _e41.pathString, _e41.data, _e41.onComplete);
        }

        for (var _e42 = 0; _e42 < this.outstandingGets_.length; _e42++) {
          this.outstandingGets_[_e42] && this.sendGet_(_e42);
        }
      }
    }, {
      key: "sendConnectStats_",
      value: function sendConnectStats_() {
        var e = {};
        var t = "js";
        e["sdk." + t + "." + Ie.replace(/\./g, "-")] = 1, c() ? e["framework.cordova"] = 1 : "object" == (typeof navigator === "undefined" ? "undefined" : _typeof(navigator)) && "ReactNative" === navigator.product && (e["framework.reactnative"] = 1), this.reportStats(e);
      }
    }, {
      key: "shouldReconnect_",
      value: function shouldReconnect_() {
        var e = wt.getInstance().currentlyOnline();
        return v(this.interruptReasons_) && e;
      }
    }], [{
      key: "warnOnListenWarnings_",
      value: function warnOnListenWarnings_(e, t) {
        if (e && "object" == _typeof(e) && m(e, "w")) {
          var _n30 = y(e, "w");

          if (Array.isArray(_n30) && ~_n30.indexOf("no_index")) {
            var _e44 = '".indexOn": "' + t._queryParams.getIndex().toString() + '"',
                _n31 = t._path.toString();

            We("Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ".concat(_e44, " at ").concat(_n31, " to your security rules for better performance."));
          }
        }
      }
    }]);

    return jt;
  }(vt);

  jt.nextPersistentConnectionId_ = 0, jt.nextConnectionId_ = 0;

  var Bt = /*#__PURE__*/function () {
    function Bt(e, t) {
      _classCallCheck(this, Bt);

      this.name = e, this.node = t;
    }

    _createClass(Bt, null, [{
      key: "Wrap",
      value: function Wrap(e, t) {
        return new Bt(e, t);
      }
    }]);

    return Bt;
  }();

  var Ht = /*#__PURE__*/function () {
    function Ht() {
      _classCallCheck(this, Ht);
    }

    _createClass(Ht, [{
      key: "getCompare",
      value: function getCompare() {
        return this.compare.bind(this);
      }
    }, {
      key: "indexedValueChanged",
      value: function indexedValueChanged(e, t) {
        var n = new Bt(je, e),
            i = new Bt(je, t);
        return 0 !== this.compare(n, i);
      }
    }, {
      key: "minPost",
      value: function minPost() {
        return Bt.MIN;
      }
    }]);

    return Ht;
  }();

  var zt;

  var Vt = /*#__PURE__*/function (_Ht) {
    _inherits(Vt, _Ht);

    var _super5 = _createSuper(Vt);

    function Vt() {
      _classCallCheck(this, Vt);

      return _super5.apply(this, arguments);
    }

    _createClass(Vt, [{
      key: "compare",
      value: function compare(e, t) {
        return He(e.name, t.name);
      }
    }, {
      key: "isDefinedOn",
      value: function isDefinedOn(e) {
        throw t("KeyIndex.isDefinedOn not expected to be called.");
      }
    }, {
      key: "indexedValueChanged",
      value: function indexedValueChanged(e, t) {
        return !1;
      }
    }, {
      key: "minPost",
      value: function minPost() {
        return Bt.MIN;
      }
    }, {
      key: "maxPost",
      value: function maxPost() {
        return new Bt(Be, zt);
      }
    }, {
      key: "makePost",
      value: function makePost(t, n) {
        return e("string" == typeof t, "KeyIndex indexValue must always be a string."), new Bt(t, zt);
      }
    }, {
      key: "toString",
      value: function toString() {
        return ".key";
      }
    }], [{
      key: "__EMPTY_NODE",
      get: function get() {
        return zt;
      },
      set: function set(e) {
        zt = e;
      }
    }]);

    return Vt;
  }(Ht);

  var $t = new Vt();

  var Yt = /*#__PURE__*/function () {
    function Yt(e, t, n, i) {
      var s = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

      _classCallCheck(this, Yt);

      this.isReverse_ = i, this.resultGenerator_ = s, this.nodeStack_ = [];
      var r = 1;

      for (; !e.isEmpty();) {
        if (r = t ? n(e.key, t) : 1, i && (r *= -1), r < 0) e = this.isReverse_ ? e.left : e.right;else {
          if (0 === r) {
            this.nodeStack_.push(e);
            break;
          }

          this.nodeStack_.push(e), e = this.isReverse_ ? e.right : e.left;
        }
      }
    }

    _createClass(Yt, [{
      key: "getNext",
      value: function getNext() {
        if (0 === this.nodeStack_.length) return null;
        var e,
            t = this.nodeStack_.pop();
        if (e = this.resultGenerator_ ? this.resultGenerator_(t.key, t.value) : {
          key: t.key,
          value: t.value
        }, this.isReverse_) for (t = t.left; !t.isEmpty();) {
          this.nodeStack_.push(t), t = t.right;
        } else for (t = t.right; !t.isEmpty();) {
          this.nodeStack_.push(t), t = t.left;
        }
        return e;
      }
    }, {
      key: "hasNext",
      value: function hasNext() {
        return this.nodeStack_.length > 0;
      }
    }, {
      key: "peek",
      value: function peek() {
        if (0 === this.nodeStack_.length) return null;
        var e = this.nodeStack_[this.nodeStack_.length - 1];
        return this.resultGenerator_ ? this.resultGenerator_(e.key, e.value) : {
          key: e.key,
          value: e.value
        };
      }
    }]);

    return Yt;
  }();

  var Kt = /*#__PURE__*/function () {
    function Kt(e, t, n, i, s) {
      _classCallCheck(this, Kt);

      this.key = e, this.value = t, this.color = null != n ? n : Kt.RED, this.left = null != i ? i : Gt.EMPTY_NODE, this.right = null != s ? s : Gt.EMPTY_NODE;
    }

    _createClass(Kt, [{
      key: "copy",
      value: function copy(e, t, n, i, s) {
        return new Kt(null != e ? e : this.key, null != t ? t : this.value, null != n ? n : this.color, null != i ? i : this.left, null != s ? s : this.right);
      }
    }, {
      key: "count",
      value: function count() {
        return this.left.count() + 1 + this.right.count();
      }
    }, {
      key: "isEmpty",
      value: function isEmpty() {
        return !1;
      }
    }, {
      key: "inorderTraversal",
      value: function inorderTraversal(e) {
        return this.left.inorderTraversal(e) || !!e(this.key, this.value) || this.right.inorderTraversal(e);
      }
    }, {
      key: "reverseTraversal",
      value: function reverseTraversal(e) {
        return this.right.reverseTraversal(e) || e(this.key, this.value) || this.left.reverseTraversal(e);
      }
    }, {
      key: "min_",
      value: function min_() {
        return this.left.isEmpty() ? this : this.left.min_();
      }
    }, {
      key: "minKey",
      value: function minKey() {
        return this.min_().key;
      }
    }, {
      key: "maxKey",
      value: function maxKey() {
        return this.right.isEmpty() ? this.key : this.right.maxKey();
      }
    }, {
      key: "insert",
      value: function insert(e, t, n) {
        var i = this;
        var s = n(e, i.key);
        return i = s < 0 ? i.copy(null, null, null, i.left.insert(e, t, n), null) : 0 === s ? i.copy(null, t, null, null, null) : i.copy(null, null, null, null, i.right.insert(e, t, n)), i.fixUp_();
      }
    }, {
      key: "removeMin_",
      value: function removeMin_() {
        if (this.left.isEmpty()) return Gt.EMPTY_NODE;
        var e = this;
        return e.left.isRed_() || e.left.left.isRed_() || (e = e.moveRedLeft_()), e = e.copy(null, null, null, e.left.removeMin_(), null), e.fixUp_();
      }
    }, {
      key: "remove",
      value: function remove(e, t) {
        var n, i;
        if (n = this, t(e, n.key) < 0) n.left.isEmpty() || n.left.isRed_() || n.left.left.isRed_() || (n = n.moveRedLeft_()), n = n.copy(null, null, null, n.left.remove(e, t), null);else {
          if (n.left.isRed_() && (n = n.rotateRight_()), n.right.isEmpty() || n.right.isRed_() || n.right.left.isRed_() || (n = n.moveRedRight_()), 0 === t(e, n.key)) {
            if (n.right.isEmpty()) return Gt.EMPTY_NODE;
            i = n.right.min_(), n = n.copy(i.key, i.value, null, null, n.right.removeMin_());
          }

          n = n.copy(null, null, null, null, n.right.remove(e, t));
        }
        return n.fixUp_();
      }
    }, {
      key: "isRed_",
      value: function isRed_() {
        return this.color;
      }
    }, {
      key: "fixUp_",
      value: function fixUp_() {
        var e = this;
        return e.right.isRed_() && !e.left.isRed_() && (e = e.rotateLeft_()), e.left.isRed_() && e.left.left.isRed_() && (e = e.rotateRight_()), e.left.isRed_() && e.right.isRed_() && (e = e.colorFlip_()), e;
      }
    }, {
      key: "moveRedLeft_",
      value: function moveRedLeft_() {
        var e = this.colorFlip_();
        return e.right.left.isRed_() && (e = e.copy(null, null, null, null, e.right.rotateRight_()), e = e.rotateLeft_(), e = e.colorFlip_()), e;
      }
    }, {
      key: "moveRedRight_",
      value: function moveRedRight_() {
        var e = this.colorFlip_();
        return e.left.left.isRed_() && (e = e.rotateRight_(), e = e.colorFlip_()), e;
      }
    }, {
      key: "rotateLeft_",
      value: function rotateLeft_() {
        var e = this.copy(null, null, Kt.RED, null, this.right.left);
        return this.right.copy(null, null, this.color, e, null);
      }
    }, {
      key: "rotateRight_",
      value: function rotateRight_() {
        var e = this.copy(null, null, Kt.RED, this.left.right, null);
        return this.left.copy(null, null, this.color, null, e);
      }
    }, {
      key: "colorFlip_",
      value: function colorFlip_() {
        var e = this.left.copy(null, null, !this.left.color, null, null),
            t = this.right.copy(null, null, !this.right.color, null, null);
        return this.copy(null, null, !this.color, e, t);
      }
    }, {
      key: "checkMaxDepth_",
      value: function checkMaxDepth_() {
        var e = this.check_();
        return Math.pow(2, e) <= this.count() + 1;
      }
    }, {
      key: "check_",
      value: function check_() {
        if (this.isRed_() && this.left.isRed_()) throw new Error("Red node has red child(" + this.key + "," + this.value + ")");
        if (this.right.isRed_()) throw new Error("Right child of (" + this.key + "," + this.value + ") is red");
        var e = this.left.check_();
        if (e !== this.right.check_()) throw new Error("Black depths differ");
        return e + (this.isRed_() ? 0 : 1);
      }
    }]);

    return Kt;
  }();

  Kt.RED = !0, Kt.BLACK = !1;

  var Gt = /*#__PURE__*/function () {
    function Gt(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Gt.EMPTY_NODE;

      _classCallCheck(this, Gt);

      this.comparator_ = e, this.root_ = t;
    }

    _createClass(Gt, [{
      key: "insert",
      value: function insert(e, t) {
        return new Gt(this.comparator_, this.root_.insert(e, t, this.comparator_).copy(null, null, Kt.BLACK, null, null));
      }
    }, {
      key: "remove",
      value: function remove(e) {
        return new Gt(this.comparator_, this.root_.remove(e, this.comparator_).copy(null, null, Kt.BLACK, null, null));
      }
    }, {
      key: "get",
      value: function get(e) {
        var t,
            n = this.root_;

        for (; !n.isEmpty();) {
          if (t = this.comparator_(e, n.key), 0 === t) return n.value;
          t < 0 ? n = n.left : t > 0 && (n = n.right);
        }

        return null;
      }
    }, {
      key: "getPredecessorKey",
      value: function getPredecessorKey(e) {
        var t,
            n = this.root_,
            i = null;

        for (; !n.isEmpty();) {
          if (t = this.comparator_(e, n.key), 0 === t) {
            if (n.left.isEmpty()) return i ? i.key : null;

            for (n = n.left; !n.right.isEmpty();) {
              n = n.right;
            }

            return n.key;
          }

          t < 0 ? n = n.left : t > 0 && (i = n, n = n.right);
        }

        throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?");
      }
    }, {
      key: "isEmpty",
      value: function isEmpty() {
        return this.root_.isEmpty();
      }
    }, {
      key: "count",
      value: function count() {
        return this.root_.count();
      }
    }, {
      key: "minKey",
      value: function minKey() {
        return this.root_.minKey();
      }
    }, {
      key: "maxKey",
      value: function maxKey() {
        return this.root_.maxKey();
      }
    }, {
      key: "inorderTraversal",
      value: function inorderTraversal(e) {
        return this.root_.inorderTraversal(e);
      }
    }, {
      key: "reverseTraversal",
      value: function reverseTraversal(e) {
        return this.root_.reverseTraversal(e);
      }
    }, {
      key: "getIterator",
      value: function getIterator(e) {
        return new Yt(this.root_, null, this.comparator_, !1, e);
      }
    }, {
      key: "getIteratorFrom",
      value: function getIteratorFrom(e, t) {
        return new Yt(this.root_, e, this.comparator_, !1, t);
      }
    }, {
      key: "getReverseIteratorFrom",
      value: function getReverseIteratorFrom(e, t) {
        return new Yt(this.root_, e, this.comparator_, !0, t);
      }
    }, {
      key: "getReverseIterator",
      value: function getReverseIterator(e) {
        return new Yt(this.root_, null, this.comparator_, !0, e);
      }
    }]);

    return Gt;
  }();

  function Qt(e, t) {
    return He(e.name, t.name);
  }

  function Jt(e, t) {
    return He(e, t);
  }

  var Xt;
  Gt.EMPTY_NODE = new ( /*#__PURE__*/function () {
    function _class() {
      _classCallCheck(this, _class);
    }

    _createClass(_class, [{
      key: "copy",
      value: function copy(e, t, n, i, s) {
        return this;
      }
    }, {
      key: "insert",
      value: function insert(e, t, n) {
        return new Kt(e, t, null);
      }
    }, {
      key: "remove",
      value: function remove(e, t) {
        return this;
      }
    }, {
      key: "count",
      value: function count() {
        return 0;
      }
    }, {
      key: "isEmpty",
      value: function isEmpty() {
        return !0;
      }
    }, {
      key: "inorderTraversal",
      value: function inorderTraversal(e) {
        return !1;
      }
    }, {
      key: "reverseTraversal",
      value: function reverseTraversal(e) {
        return !1;
      }
    }, {
      key: "minKey",
      value: function minKey() {
        return null;
      }
    }, {
      key: "maxKey",
      value: function maxKey() {
        return null;
      }
    }, {
      key: "check_",
      value: function check_() {
        return 0;
      }
    }, {
      key: "isRed_",
      value: function isRed_() {
        return !1;
      }
    }]);

    return _class;
  }())();

  var Zt = function Zt(e) {
    return "number" == typeof e ? "number:" + Ge(e) : "string:" + e;
  },
      en = function en(t) {
    if (t.isLeafNode()) {
      var _n32 = t.val();

      e("string" == typeof _n32 || "number" == typeof _n32 || "object" == _typeof(_n32) && m(_n32, ".sv"), "Priority must be a string or number.");
    } else e(t === Xt || t.isEmpty(), "priority of unexpected type.");

    e(t === Xt || t.getPriority().isEmpty(), "Priority nodes can't have a priority of their own.");
  };

  var tn, nn, sn;

  var rn = /*#__PURE__*/function () {
    function rn(t) {
      var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : rn.__childrenNodeConstructor.EMPTY_NODE;

      _classCallCheck(this, rn);

      this.value_ = t, this.priorityNode_ = n, this.lazyHash_ = null, e(void 0 !== this.value_ && null !== this.value_, "LeafNode shouldn't be created with null/undefined value."), en(this.priorityNode_);
    }

    _createClass(rn, [{
      key: "isLeafNode",
      value: function isLeafNode() {
        return !0;
      }
    }, {
      key: "getPriority",
      value: function getPriority() {
        return this.priorityNode_;
      }
    }, {
      key: "updatePriority",
      value: function updatePriority(e) {
        return new rn(this.value_, e);
      }
    }, {
      key: "getImmediateChild",
      value: function getImmediateChild(e) {
        return ".priority" === e ? this.priorityNode_ : rn.__childrenNodeConstructor.EMPTY_NODE;
      }
    }, {
      key: "getChild",
      value: function getChild(e) {
        return xt(e) ? this : ".priority" === Et(e) ? this.priorityNode_ : rn.__childrenNodeConstructor.EMPTY_NODE;
      }
    }, {
      key: "hasChild",
      value: function hasChild() {
        return !1;
      }
    }, {
      key: "getPredecessorChildName",
      value: function getPredecessorChildName(e, t) {
        return null;
      }
    }, {
      key: "updateImmediateChild",
      value: function updateImmediateChild(e, t) {
        return ".priority" === e ? this.updatePriority(t) : t.isEmpty() && ".priority" !== e ? this : rn.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e, t).updatePriority(this.priorityNode_);
      }
    }, {
      key: "updateChild",
      value: function updateChild(t, n) {
        var i = Et(t);
        return null === i ? n : n.isEmpty() && ".priority" !== i ? this : (e(".priority" !== i || 1 === Tt(t), ".priority must be the last token in a path"), this.updateImmediateChild(i, rn.__childrenNodeConstructor.EMPTY_NODE.updateChild(St(t), n)));
      }
    }, {
      key: "isEmpty",
      value: function isEmpty() {
        return !1;
      }
    }, {
      key: "numChildren",
      value: function numChildren() {
        return 0;
      }
    }, {
      key: "forEachChild",
      value: function forEachChild(e, t) {
        return !1;
      }
    }, {
      key: "val",
      value: function val(e) {
        return e && !this.getPriority().isEmpty() ? {
          ".value": this.getValue(),
          ".priority": this.getPriority().val()
        } : this.getValue();
      }
    }, {
      key: "hash",
      value: function hash() {
        if (null === this.lazyHash_) {
          var _e45 = "";
          this.priorityNode_.isEmpty() || (_e45 += "priority:" + Zt(this.priorityNode_.val()) + ":");

          var _t22 = _typeof(this.value_);

          _e45 += _t22 + ":", _e45 += "number" === _t22 ? Ge(this.value_) : this.value_, this.lazyHash_ = xe(_e45);
        }

        return this.lazyHash_;
      }
    }, {
      key: "getValue",
      value: function getValue() {
        return this.value_;
      }
    }, {
      key: "compareTo",
      value: function compareTo(t) {
        return t === rn.__childrenNodeConstructor.EMPTY_NODE ? 1 : t instanceof rn.__childrenNodeConstructor ? -1 : (e(t.isLeafNode(), "Unknown node type"), this.compareToLeafNode_(t));
      }
    }, {
      key: "compareToLeafNode_",
      value: function compareToLeafNode_(t) {
        var n = _typeof(t.value_),
            i = _typeof(this.value_),
            s = rn.VALUE_TYPE_ORDER.indexOf(n),
            r = rn.VALUE_TYPE_ORDER.indexOf(i);

        return e(s >= 0, "Unknown leaf type: " + n), e(r >= 0, "Unknown leaf type: " + i), s === r ? "object" === i ? 0 : this.value_ < t.value_ ? -1 : this.value_ === t.value_ ? 0 : 1 : r - s;
      }
    }, {
      key: "withIndex",
      value: function withIndex() {
        return this;
      }
    }, {
      key: "isIndexed",
      value: function isIndexed() {
        return !0;
      }
    }, {
      key: "equals",
      value: function equals(e) {
        if (e === this) return !0;

        if (e.isLeafNode()) {
          var _t23 = e;
          return this.value_ === _t23.value_ && this.priorityNode_.equals(_t23.priorityNode_);
        }

        return !1;
      }
    }], [{
      key: "__childrenNodeConstructor",
      get: function get() {
        return tn;
      },
      set: function set(e) {
        tn = e;
      }
    }]);

    return rn;
  }();

  rn.VALUE_TYPE_ORDER = ["object", "boolean", "number", "string"];
  var on = new ( /*#__PURE__*/function (_Ht2) {
    _inherits(_class2, _Ht2);

    var _super6 = _createSuper(_class2);

    function _class2() {
      _classCallCheck(this, _class2);

      return _super6.apply(this, arguments);
    }

    _createClass(_class2, [{
      key: "compare",
      value: function compare(e, t) {
        var n = e.node.getPriority(),
            i = t.node.getPriority(),
            s = n.compareTo(i);
        return 0 === s ? He(e.name, t.name) : s;
      }
    }, {
      key: "isDefinedOn",
      value: function isDefinedOn(e) {
        return !e.getPriority().isEmpty();
      }
    }, {
      key: "indexedValueChanged",
      value: function indexedValueChanged(e, t) {
        return !e.getPriority().equals(t.getPriority());
      }
    }, {
      key: "minPost",
      value: function minPost() {
        return Bt.MIN;
      }
    }, {
      key: "maxPost",
      value: function maxPost() {
        return new Bt(Be, new rn("[PRIORITY-POST]", sn));
      }
    }, {
      key: "makePost",
      value: function makePost(e, t) {
        var n = nn(e);
        return new Bt(t, new rn("[PRIORITY-POST]", n));
      }
    }, {
      key: "toString",
      value: function toString() {
        return ".priority";
      }
    }]);

    return _class2;
  }(Ht))(),
      an = Math.log(2);

  var ln = /*#__PURE__*/function () {
    function ln(e) {
      _classCallCheck(this, ln);

      var t;
      this.count = (t = e + 1, parseInt(Math.log(t) / an, 10)), this.current_ = this.count - 1;
      var n = (i = this.count, parseInt(Array(i + 1).join("1"), 2));
      var i;
      this.bits_ = e + 1 & n;
    }

    _createClass(ln, [{
      key: "nextBitIsOne",
      value: function nextBitIsOne() {
        var e = !(this.bits_ & 1 << this.current_);
        return this.current_--, e;
      }
    }]);

    return ln;
  }();

  var hn = function hn(e, t, n, i) {
    e.sort(t);

    var s = function s(t, i) {
      var r = i - t;
      var o, a;
      if (0 === r) return null;
      if (1 === r) return o = e[t], a = n ? n(o) : o, new Kt(a, o.node, Kt.BLACK, null, null);
      {
        var _l5 = parseInt(r / 2, 10) + t,
            _h3 = s(t, _l5),
            _c3 = s(_l5 + 1, i);

        return o = e[_l5], a = n ? n(o) : o, new Kt(a, o.node, Kt.BLACK, _h3, _c3);
      }
    },
        r = function (t) {
      var i = null,
          r = null,
          o = e.length;

      var a = function a(t, i) {
        var r = o - t,
            a = o;
        o -= t;
        var h = s(r + 1, a),
            c = e[r],
            u = n ? n(c) : c;
        l(new Kt(u, c.node, i, null, h));
      },
          l = function l(e) {
        i ? (i.left = e, i = e) : (r = e, i = e);
      };

      for (var _e46 = 0; _e46 < t.count; ++_e46) {
        var _n33 = t.nextBitIsOne(),
            _i19 = Math.pow(2, t.count - (_e46 + 1));

        _n33 ? a(_i19, Kt.BLACK) : (a(_i19, Kt.BLACK), a(_i19, Kt.RED));
      }

      return r;
    }(new ln(e.length));

    return new Gt(i || t, r);
  };

  var cn;
  var un = {};

  var dn = /*#__PURE__*/function () {
    function dn(e, t) {
      _classCallCheck(this, dn);

      this.indexes_ = e, this.indexSet_ = t;
    }

    _createClass(dn, [{
      key: "get",
      value: function get(e) {
        var t = y(this.indexes_, e);
        if (!t) throw new Error("No index defined for " + e);
        return t instanceof Gt ? t : null;
      }
    }, {
      key: "hasIndex",
      value: function hasIndex(e) {
        return m(this.indexSet_, e.toString());
      }
    }, {
      key: "addIndex",
      value: function addIndex(t, n) {
        e(t !== $t, "KeyIndex always exists and isn't meant to be added to the IndexMap.");
        var i = [];
        var s = !1;
        var r = n.getIterator(Bt.Wrap);
        var o,
            a = r.getNext();

        for (; a;) {
          s = s || t.isDefinedOn(a.node), i.push(a), a = r.getNext();
        }

        o = s ? hn(i, t.getCompare()) : un;
        var l = t.toString(),
            h = Object.assign({}, this.indexSet_);
        h[l] = t;
        var c = Object.assign({}, this.indexes_);
        return c[l] = o, new dn(c, h);
      }
    }, {
      key: "addToIndexes",
      value: function addToIndexes(t, n) {
        var _this34 = this;

        var i = C(this.indexes_, function (i, s) {
          var r = y(_this34.indexSet_, s);

          if (e(r, "Missing index implementation for " + s), i === un) {
            if (r.isDefinedOn(t.node)) {
              var _e47 = [],
                  _i20 = n.getIterator(Bt.Wrap);

              var _s12 = _i20.getNext();

              for (; _s12;) {
                _s12.name !== t.name && _e47.push(_s12), _s12 = _i20.getNext();
              }

              return _e47.push(t), hn(_e47, r.getCompare());
            }

            return un;
          }

          {
            var _e48 = n.get(t.name);

            var _s13 = i;
            return _e48 && (_s13 = _s13.remove(new Bt(t.name, _e48))), _s13.insert(t, t.node);
          }
        });
        return new dn(i, this.indexSet_);
      }
    }, {
      key: "removeFromIndexes",
      value: function removeFromIndexes(e, t) {
        var n = C(this.indexes_, function (n) {
          if (n === un) return n;
          {
            var _i21 = t.get(e.name);

            return _i21 ? n.remove(new Bt(e.name, _i21)) : n;
          }
        });
        return new dn(n, this.indexSet_);
      }
    }], [{
      key: "Default",
      get: function get() {
        return e(un && on, "ChildrenNode.ts has not been loaded"), cn = cn || new dn({
          ".priority": un
        }, {
          ".priority": on
        }), cn;
      }
    }]);

    return dn;
  }();

  var pn;

  var _n = /*#__PURE__*/function () {
    function _n(t, n, i) {
      _classCallCheck(this, _n);

      this.children_ = t, this.priorityNode_ = n, this.indexMap_ = i, this.lazyHash_ = null, this.priorityNode_ && en(this.priorityNode_), this.children_.isEmpty() && e(!this.priorityNode_ || this.priorityNode_.isEmpty(), "An empty node cannot have a priority");
    }

    _createClass(_n, [{
      key: "isLeafNode",
      value: function isLeafNode() {
        return !1;
      }
    }, {
      key: "getPriority",
      value: function getPriority() {
        return this.priorityNode_ || pn;
      }
    }, {
      key: "updatePriority",
      value: function updatePriority(e) {
        return this.children_.isEmpty() ? this : new _n(this.children_, e, this.indexMap_);
      }
    }, {
      key: "getImmediateChild",
      value: function getImmediateChild(e) {
        if (".priority" === e) return this.getPriority();
        {
          var _t24 = this.children_.get(e);

          return null === _t24 ? pn : _t24;
        }
      }
    }, {
      key: "getChild",
      value: function getChild(e) {
        var t = Et(e);
        return null === t ? this : this.getImmediateChild(t).getChild(St(e));
      }
    }, {
      key: "hasChild",
      value: function hasChild(e) {
        return null !== this.children_.get(e);
      }
    }, {
      key: "updateImmediateChild",
      value: function updateImmediateChild(t, n) {
        if (e(n, "We should always be passing snapshot nodes"), ".priority" === t) return this.updatePriority(n);
        {
          var _e49 = new Bt(t, n);

          var _i22, _s14;

          n.isEmpty() ? (_i22 = this.children_.remove(t), _s14 = this.indexMap_.removeFromIndexes(_e49, this.children_)) : (_i22 = this.children_.insert(t, n), _s14 = this.indexMap_.addToIndexes(_e49, this.children_));

          var _r11 = _i22.isEmpty() ? pn : this.priorityNode_;

          return new _n(_i22, _r11, _s14);
        }
      }
    }, {
      key: "updateChild",
      value: function updateChild(t, n) {
        var i = Et(t);
        if (null === i) return n;
        {
          e(".priority" !== Et(t) || 1 === Tt(t), ".priority must be the last token in a path");

          var _s15 = this.getImmediateChild(i).updateChild(St(t), n);

          return this.updateImmediateChild(i, _s15);
        }
      }
    }, {
      key: "isEmpty",
      value: function isEmpty() {
        return this.children_.isEmpty();
      }
    }, {
      key: "numChildren",
      value: function numChildren() {
        return this.children_.count();
      }
    }, {
      key: "val",
      value: function val(e) {
        if (this.isEmpty()) return null;
        var t = {};
        var n = 0,
            i = 0,
            s = !0;

        if (this.forEachChild(on, function (r, o) {
          t[r] = o.val(e), n++, s && _n.INTEGER_REGEXP_.test(r) ? i = Math.max(i, Number(r)) : s = !1;
        }), !e && s && i < 2 * n) {
          var _e50 = [];

          for (var _n34 in t) {
            _e50[_n34] = t[_n34];
          }

          return _e50;
        }

        return e && !this.getPriority().isEmpty() && (t[".priority"] = this.getPriority().val()), t;
      }
    }, {
      key: "hash",
      value: function hash() {
        if (null === this.lazyHash_) {
          var _e51 = "";
          this.getPriority().isEmpty() || (_e51 += "priority:" + Zt(this.getPriority().val()) + ":"), this.forEachChild(on, function (t, n) {
            var i = n.hash();
            "" !== i && (_e51 += ":" + t + ":" + i);
          }), this.lazyHash_ = "" === _e51 ? "" : xe(_e51);
        }

        return this.lazyHash_;
      }
    }, {
      key: "getPredecessorChildName",
      value: function getPredecessorChildName(e, t, n) {
        var i = this.resolveIndex_(n);

        if (i) {
          var _n35 = i.getPredecessorKey(new Bt(e, t));

          return _n35 ? _n35.name : null;
        }

        return this.children_.getPredecessorKey(e);
      }
    }, {
      key: "getFirstChildName",
      value: function getFirstChildName(e) {
        var t = this.resolveIndex_(e);

        if (t) {
          var _e52 = t.minKey();

          return _e52 && _e52.name;
        }

        return this.children_.minKey();
      }
    }, {
      key: "getFirstChild",
      value: function getFirstChild(e) {
        var t = this.getFirstChildName(e);
        return t ? new Bt(t, this.children_.get(t)) : null;
      }
    }, {
      key: "getLastChildName",
      value: function getLastChildName(e) {
        var t = this.resolveIndex_(e);

        if (t) {
          var _e53 = t.maxKey();

          return _e53 && _e53.name;
        }

        return this.children_.maxKey();
      }
    }, {
      key: "getLastChild",
      value: function getLastChild(e) {
        var t = this.getLastChildName(e);
        return t ? new Bt(t, this.children_.get(t)) : null;
      }
    }, {
      key: "forEachChild",
      value: function forEachChild(e, t) {
        var n = this.resolveIndex_(e);
        return n ? n.inorderTraversal(function (e) {
          return t(e.name, e.node);
        }) : this.children_.inorderTraversal(t);
      }
    }, {
      key: "getIterator",
      value: function getIterator(e) {
        return this.getIteratorFrom(e.minPost(), e);
      }
    }, {
      key: "getIteratorFrom",
      value: function getIteratorFrom(e, t) {
        var n = this.resolveIndex_(t);
        if (n) return n.getIteratorFrom(e, function (e) {
          return e;
        });
        {
          var _n36 = this.children_.getIteratorFrom(e.name, Bt.Wrap);

          var _i23 = _n36.peek();

          for (; null != _i23 && t.compare(_i23, e) < 0;) {
            _n36.getNext(), _i23 = _n36.peek();
          }

          return _n36;
        }
      }
    }, {
      key: "getReverseIterator",
      value: function getReverseIterator(e) {
        return this.getReverseIteratorFrom(e.maxPost(), e);
      }
    }, {
      key: "getReverseIteratorFrom",
      value: function getReverseIteratorFrom(e, t) {
        var n = this.resolveIndex_(t);
        if (n) return n.getReverseIteratorFrom(e, function (e) {
          return e;
        });
        {
          var _n37 = this.children_.getReverseIteratorFrom(e.name, Bt.Wrap);

          var _i24 = _n37.peek();

          for (; null != _i24 && t.compare(_i24, e) > 0;) {
            _n37.getNext(), _i24 = _n37.peek();
          }

          return _n37;
        }
      }
    }, {
      key: "compareTo",
      value: function compareTo(e) {
        return this.isEmpty() ? e.isEmpty() ? 0 : -1 : e.isLeafNode() || e.isEmpty() ? 1 : e === fn ? -1 : 0;
      }
    }, {
      key: "withIndex",
      value: function withIndex(e) {
        if (e === $t || this.indexMap_.hasIndex(e)) return this;
        {
          var _t25 = this.indexMap_.addIndex(e, this.children_);

          return new _n(this.children_, this.priorityNode_, _t25);
        }
      }
    }, {
      key: "isIndexed",
      value: function isIndexed(e) {
        return e === $t || this.indexMap_.hasIndex(e);
      }
    }, {
      key: "equals",
      value: function equals(e) {
        if (e === this) return !0;
        if (e.isLeafNode()) return !1;
        {
          var _t26 = e;

          if (this.getPriority().equals(_t26.getPriority())) {
            if (this.children_.count() === _t26.children_.count()) {
              var _e54 = this.getIterator(on),
                  _n38 = _t26.getIterator(on);

              var _i25 = _e54.getNext(),
                  _s16 = _n38.getNext();

              for (; _i25 && _s16;) {
                if (_i25.name !== _s16.name || !_i25.node.equals(_s16.node)) return !1;
                _i25 = _e54.getNext(), _s16 = _n38.getNext();
              }

              return null === _i25 && null === _s16;
            }

            return !1;
          }

          return !1;
        }
      }
    }, {
      key: "resolveIndex_",
      value: function resolveIndex_(e) {
        return e === $t ? null : this.indexMap_.get(e.toString());
      }
    }], [{
      key: "EMPTY_NODE",
      get: function get() {
        return pn || (pn = new _n(new Gt(Jt), null, dn.Default));
      }
    }]);

    return _n;
  }();

  _n.INTEGER_REGEXP_ = /^(0|[1-9]\d*)$/;
  var fn = new ( /*#__PURE__*/function (_n39) {
    _inherits(_class3, _n39);

    var _super7 = _createSuper(_class3);

    function _class3() {
      _classCallCheck(this, _class3);

      return _super7.call(this, new Gt(Jt), _n.EMPTY_NODE, dn.Default);
    }

    _createClass(_class3, [{
      key: "compareTo",
      value: function compareTo(e) {
        return e === this ? 0 : 1;
      }
    }, {
      key: "equals",
      value: function equals(e) {
        return e === this;
      }
    }, {
      key: "getPriority",
      value: function getPriority() {
        return this;
      }
    }, {
      key: "getImmediateChild",
      value: function getImmediateChild(e) {
        return _n.EMPTY_NODE;
      }
    }, {
      key: "isEmpty",
      value: function isEmpty() {
        return !1;
      }
    }]);

    return _class3;
  }(_n))();

  function gn(t) {
    var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    if (null === t) return _n.EMPTY_NODE;
    if ("object" == _typeof(t) && ".priority" in t && (n = t[".priority"]), e(null === n || "string" == typeof n || "number" == typeof n || "object" == _typeof(n) && ".sv" in n, "Invalid priority type found: " + _typeof(n)), "object" == _typeof(t) && ".value" in t && null !== t[".value"] && (t = t[".value"]), "object" != _typeof(t) || ".sv" in t) return new rn(t, gn(n));

    if (t instanceof Array) {
      var _e55 = _n.EMPTY_NODE;
      return Ke(t, function (n, i) {
        if (m(t, n) && "." !== n.substring(0, 1)) {
          var _t27 = gn(i);

          !_t27.isLeafNode() && _t27.isEmpty() || (_e55 = _e55.updateImmediateChild(n, _t27));
        }
      }), _e55.updatePriority(gn(n));
    }

    {
      var _e56 = [];

      var _i26 = !1;

      if (Ke(t, function (t, n) {
        if ("." !== t.substring(0, 1)) {
          var _s18 = gn(n);

          _s18.isEmpty() || (_i26 = _i26 || !_s18.getPriority().isEmpty(), _e56.push(new Bt(t, _s18)));
        }
      }), 0 === _e56.length) return _n.EMPTY_NODE;

      var _s17 = hn(_e56, Qt, function (e) {
        return e.name;
      }, Jt);

      if (_i26) {
        var _t28 = hn(_e56, on.getCompare());

        return new _n(_s17, gn(n), new dn({
          ".priority": _t28
        }, {
          ".priority": on
        }));
      }

      return new _n(_s17, gn(n), dn.Default);
    }
  }

  Object.defineProperties(Bt, {
    MIN: {
      value: new Bt(je, _n.EMPTY_NODE)
    },
    MAX: {
      value: new Bt(Be, fn)
    }
  }), Vt.__EMPTY_NODE = _n.EMPTY_NODE, rn.__childrenNodeConstructor = _n, Xt = fn, sn = fn, function (e) {
    nn = e;
  }(gn);

  var mn = /*#__PURE__*/function (_Ht3) {
    _inherits(mn, _Ht3);

    var _super8 = _createSuper(mn);

    function mn(t) {
      var _this35;

      _classCallCheck(this, mn);

      _this35 = _super8.call(this), _this35.indexPath_ = t, e(!xt(t) && ".priority" !== Et(t), "Can't create PathIndex with empty path or .priority key");
      return _this35;
    }

    _createClass(mn, [{
      key: "extractChild",
      value: function extractChild(e) {
        return e.getChild(this.indexPath_);
      }
    }, {
      key: "isDefinedOn",
      value: function isDefinedOn(e) {
        return !e.getChild(this.indexPath_).isEmpty();
      }
    }, {
      key: "compare",
      value: function compare(e, t) {
        var n = this.extractChild(e.node),
            i = this.extractChild(t.node),
            s = n.compareTo(i);
        return 0 === s ? He(e.name, t.name) : s;
      }
    }, {
      key: "makePost",
      value: function makePost(e, t) {
        var n = gn(e),
            i = _n.EMPTY_NODE.updateChild(this.indexPath_, n);

        return new Bt(t, i);
      }
    }, {
      key: "maxPost",
      value: function maxPost() {
        var e = _n.EMPTY_NODE.updateChild(this.indexPath_, fn);

        return new Bt(Be, e);
      }
    }, {
      key: "toString",
      value: function toString() {
        return Nt(this.indexPath_, 0).join("/");
      }
    }]);

    return mn;
  }(Ht);

  var yn = new ( /*#__PURE__*/function (_Ht4) {
    _inherits(_class4, _Ht4);

    var _super9 = _createSuper(_class4);

    function _class4() {
      _classCallCheck(this, _class4);

      return _super9.apply(this, arguments);
    }

    _createClass(_class4, [{
      key: "compare",
      value: function compare(e, t) {
        var n = e.node.compareTo(t.node);
        return 0 === n ? He(e.name, t.name) : n;
      }
    }, {
      key: "isDefinedOn",
      value: function isDefinedOn(e) {
        return !0;
      }
    }, {
      key: "indexedValueChanged",
      value: function indexedValueChanged(e, t) {
        return !e.equals(t);
      }
    }, {
      key: "minPost",
      value: function minPost() {
        return Bt.MIN;
      }
    }, {
      key: "maxPost",
      value: function maxPost() {
        return Bt.MAX;
      }
    }, {
      key: "makePost",
      value: function makePost(e, t) {
        var n = gn(e);
        return new Bt(t, n);
      }
    }, {
      key: "toString",
      value: function toString() {
        return ".value";
      }
    }]);

    return _class4;
  }(Ht))(),
      vn = "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",
      Cn = function () {
    var t = 0;
    var n = [];
    return function (i) {
      var s = i === t;
      var r;
      t = i;
      var o = new Array(8);

      for (r = 7; r >= 0; r--) {
        o[r] = vn.charAt(i % 64), i = Math.floor(i / 64);
      }

      e(0 === i, "Cannot push at time == 0");
      var a = o.join("");

      if (s) {
        for (r = 11; r >= 0 && 63 === n[r]; r--) {
          n[r] = 0;
        }

        n[r]++;
      } else for (r = 0; r < 12; r++) {
        n[r] = Math.floor(64 * Math.random());
      }

      for (r = 0; r < 12; r++) {
        a += vn.charAt(n[r]);
      }

      return e(20 === a.length, "nextPushId: Length should be 20."), a;
    };
  }();

  function wn(e) {
    return {
      type: "value",
      snapshotNode: e
    };
  }

  function bn(e, t) {
    return {
      type: "child_added",
      snapshotNode: t,
      childName: e
    };
  }

  function In(e, t) {
    return {
      type: "child_removed",
      snapshotNode: t,
      childName: e
    };
  }

  function En(e, t, n) {
    return {
      type: "child_changed",
      snapshotNode: t,
      childName: e,
      oldSnap: n
    };
  }

  var Tn = /*#__PURE__*/function () {
    function Tn(e) {
      _classCallCheck(this, Tn);

      this.index_ = e;
    }

    _createClass(Tn, [{
      key: "updateChild",
      value: function updateChild(t, n, i, s, r, o) {
        e(t.isIndexed(this.index_), "A node must be indexed if only a child is updated");
        var a = t.getImmediateChild(n);
        return a.getChild(s).equals(i.getChild(s)) && a.isEmpty() === i.isEmpty() ? t : (null != o && (i.isEmpty() ? t.hasChild(n) ? o.trackChildChange(In(n, a)) : e(t.isLeafNode(), "A child remove without an old child only makes sense on a leaf node") : a.isEmpty() ? o.trackChildChange(bn(n, i)) : o.trackChildChange(En(n, i, a))), t.isLeafNode() && i.isEmpty() ? t : t.updateImmediateChild(n, i).withIndex(this.index_));
      }
    }, {
      key: "updateFullNode",
      value: function updateFullNode(e, t, n) {
        return null != n && (e.isLeafNode() || e.forEachChild(on, function (e, i) {
          t.hasChild(e) || n.trackChildChange(In(e, i));
        }), t.isLeafNode() || t.forEachChild(on, function (t, i) {
          if (e.hasChild(t)) {
            var _s19 = e.getImmediateChild(t);

            _s19.equals(i) || n.trackChildChange(En(t, i, _s19));
          } else n.trackChildChange(bn(t, i));
        })), t.withIndex(this.index_);
      }
    }, {
      key: "updatePriority",
      value: function updatePriority(e, t) {
        return e.isEmpty() ? _n.EMPTY_NODE : e.updatePriority(t);
      }
    }, {
      key: "filtersNodes",
      value: function filtersNodes() {
        return !1;
      }
    }, {
      key: "getIndexedFilter",
      value: function getIndexedFilter() {
        return this;
      }
    }, {
      key: "getIndex",
      value: function getIndex() {
        return this.index_;
      }
    }]);

    return Tn;
  }();

  var Sn = /*#__PURE__*/function () {
    function Sn(e) {
      _classCallCheck(this, Sn);

      this.indexedFilter_ = new Tn(e.getIndex()), this.index_ = e.getIndex(), this.startPost_ = Sn.getStartPost_(e), this.endPost_ = Sn.getEndPost_(e);
    }

    _createClass(Sn, [{
      key: "getStartPost",
      value: function getStartPost() {
        return this.startPost_;
      }
    }, {
      key: "getEndPost",
      value: function getEndPost() {
        return this.endPost_;
      }
    }, {
      key: "matches",
      value: function matches(e) {
        return this.index_.compare(this.getStartPost(), e) <= 0 && this.index_.compare(e, this.getEndPost()) <= 0;
      }
    }, {
      key: "updateChild",
      value: function updateChild(e, t, n, i, s, r) {
        return this.matches(new Bt(t, n)) || (n = _n.EMPTY_NODE), this.indexedFilter_.updateChild(e, t, n, i, s, r);
      }
    }, {
      key: "updateFullNode",
      value: function updateFullNode(e, t, n) {
        t.isLeafNode() && (t = _n.EMPTY_NODE);
        var i = t.withIndex(this.index_);
        i = i.updatePriority(_n.EMPTY_NODE);
        var s = this;
        return t.forEachChild(on, function (e, t) {
          s.matches(new Bt(e, t)) || (i = i.updateImmediateChild(e, _n.EMPTY_NODE));
        }), this.indexedFilter_.updateFullNode(e, i, n);
      }
    }, {
      key: "updatePriority",
      value: function updatePriority(e, t) {
        return e;
      }
    }, {
      key: "filtersNodes",
      value: function filtersNodes() {
        return !0;
      }
    }, {
      key: "getIndexedFilter",
      value: function getIndexedFilter() {
        return this.indexedFilter_;
      }
    }, {
      key: "getIndex",
      value: function getIndex() {
        return this.index_;
      }
    }], [{
      key: "getStartPost_",
      value: function getStartPost_(e) {
        if (e.hasStart()) {
          var _t29 = e.getIndexStartName();

          return e.getIndex().makePost(e.getIndexStartValue(), _t29);
        }

        return e.getIndex().minPost();
      }
    }, {
      key: "getEndPost_",
      value: function getEndPost_(e) {
        if (e.hasEnd()) {
          var _t30 = e.getIndexEndName();

          return e.getIndex().makePost(e.getIndexEndValue(), _t30);
        }

        return e.getIndex().maxPost();
      }
    }]);

    return Sn;
  }();

  var kn = /*#__PURE__*/function () {
    function kn(e) {
      _classCallCheck(this, kn);

      this.rangedFilter_ = new Sn(e), this.index_ = e.getIndex(), this.limit_ = e.getLimit(), this.reverse_ = !e.isViewFromLeft();
    }

    _createClass(kn, [{
      key: "updateChild",
      value: function updateChild(e, t, n, i, s, r) {
        return this.rangedFilter_.matches(new Bt(t, n)) || (n = _n.EMPTY_NODE), e.getImmediateChild(t).equals(n) ? e : e.numChildren() < this.limit_ ? this.rangedFilter_.getIndexedFilter().updateChild(e, t, n, i, s, r) : this.fullLimitUpdateChild_(e, t, n, s, r);
      }
    }, {
      key: "updateFullNode",
      value: function updateFullNode(e, t, n) {
        var i;
        if (t.isLeafNode() || t.isEmpty()) i = _n.EMPTY_NODE.withIndex(this.index_);else if (2 * this.limit_ < t.numChildren() && t.isIndexed(this.index_)) {
          var _e57;

          i = _n.EMPTY_NODE.withIndex(this.index_), _e57 = this.reverse_ ? t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(), this.index_) : t.getIteratorFrom(this.rangedFilter_.getStartPost(), this.index_);
          var _n40 = 0;

          for (; _e57.hasNext() && _n40 < this.limit_;) {
            var _t31 = _e57.getNext();

            var _s20 = void 0;

            if (_s20 = this.reverse_ ? this.index_.compare(this.rangedFilter_.getStartPost(), _t31) <= 0 : this.index_.compare(_t31, this.rangedFilter_.getEndPost()) <= 0, !_s20) break;
            i = i.updateImmediateChild(_t31.name, _t31.node), _n40++;
          }
        } else {
          var _e58, _n41, _s21, _r12;

          if (i = t.withIndex(this.index_), i = i.updatePriority(_n.EMPTY_NODE), this.reverse_) {
            _r12 = i.getReverseIterator(this.index_), _e58 = this.rangedFilter_.getEndPost(), _n41 = this.rangedFilter_.getStartPost();

            var _t32 = this.index_.getCompare();

            _s21 = function _s21(e, n) {
              return _t32(n, e);
            };
          } else _r12 = i.getIterator(this.index_), _e58 = this.rangedFilter_.getStartPost(), _n41 = this.rangedFilter_.getEndPost(), _s21 = this.index_.getCompare();

          var _o6 = 0,
              _a4 = !1;

          for (; _r12.hasNext();) {
            var _t33 = _r12.getNext();

            !_a4 && _s21(_e58, _t33) <= 0 && (_a4 = !0), _a4 && _o6 < this.limit_ && _s21(_t33, _n41) <= 0 ? _o6++ : i = i.updateImmediateChild(_t33.name, _n.EMPTY_NODE);
          }
        }
        return this.rangedFilter_.getIndexedFilter().updateFullNode(e, i, n);
      }
    }, {
      key: "updatePriority",
      value: function updatePriority(e, t) {
        return e;
      }
    }, {
      key: "filtersNodes",
      value: function filtersNodes() {
        return !0;
      }
    }, {
      key: "getIndexedFilter",
      value: function getIndexedFilter() {
        return this.rangedFilter_.getIndexedFilter();
      }
    }, {
      key: "getIndex",
      value: function getIndex() {
        return this.index_;
      }
    }, {
      key: "fullLimitUpdateChild_",
      value: function fullLimitUpdateChild_(t, n, i, s, r) {
        var o;

        if (this.reverse_) {
          var _e59 = this.index_.getCompare();

          o = function o(t, n) {
            return _e59(n, t);
          };
        } else o = this.index_.getCompare();

        var a = t;
        e(a.numChildren() === this.limit_, "");
        var l = new Bt(n, i),
            h = this.reverse_ ? a.getFirstChild(this.index_) : a.getLastChild(this.index_),
            c = this.rangedFilter_.matches(l);

        if (a.hasChild(n)) {
          var _e60 = a.getImmediateChild(n);

          var _t34 = s.getChildAfterChild(this.index_, h, this.reverse_);

          for (; null != _t34 && (_t34.name === n || a.hasChild(_t34.name));) {
            _t34 = s.getChildAfterChild(this.index_, _t34, this.reverse_);
          }

          var _u2 = null == _t34 ? 1 : o(_t34, l);

          if (c && !i.isEmpty() && _u2 >= 0) return null != r && r.trackChildChange(En(n, i, _e60)), a.updateImmediateChild(n, i);
          {
            null != r && r.trackChildChange(In(n, _e60));

            var _i27 = a.updateImmediateChild(n, _n.EMPTY_NODE);

            return null != _t34 && this.rangedFilter_.matches(_t34) ? (null != r && r.trackChildChange(bn(_t34.name, _t34.node)), _i27.updateImmediateChild(_t34.name, _t34.node)) : _i27;
          }
        }

        return i.isEmpty() ? t : c && o(h, l) >= 0 ? (null != r && (r.trackChildChange(In(h.name, h.node)), r.trackChildChange(bn(n, i))), a.updateImmediateChild(n, i).updateImmediateChild(h.name, _n.EMPTY_NODE)) : t;
      }
    }]);

    return kn;
  }();

  var Nn = /*#__PURE__*/function () {
    function Nn() {
      _classCallCheck(this, Nn);

      this.limitSet_ = !1, this.startSet_ = !1, this.startNameSet_ = !1, this.startAfterSet_ = !1, this.endSet_ = !1, this.endNameSet_ = !1, this.endBeforeSet_ = !1, this.limit_ = 0, this.viewFrom_ = "", this.indexStartValue_ = null, this.indexStartName_ = "", this.indexEndValue_ = null, this.indexEndName_ = "", this.index_ = on;
    }

    _createClass(Nn, [{
      key: "hasStart",
      value: function hasStart() {
        return this.startSet_;
      }
    }, {
      key: "hasStartAfter",
      value: function hasStartAfter() {
        return this.startAfterSet_;
      }
    }, {
      key: "hasEndBefore",
      value: function hasEndBefore() {
        return this.endBeforeSet_;
      }
    }, {
      key: "isViewFromLeft",
      value: function isViewFromLeft() {
        return "" === this.viewFrom_ ? this.startSet_ : "l" === this.viewFrom_;
      }
    }, {
      key: "getIndexStartValue",
      value: function getIndexStartValue() {
        return e(this.startSet_, "Only valid if start has been set"), this.indexStartValue_;
      }
    }, {
      key: "getIndexStartName",
      value: function getIndexStartName() {
        return e(this.startSet_, "Only valid if start has been set"), this.startNameSet_ ? this.indexStartName_ : je;
      }
    }, {
      key: "hasEnd",
      value: function hasEnd() {
        return this.endSet_;
      }
    }, {
      key: "getIndexEndValue",
      value: function getIndexEndValue() {
        return e(this.endSet_, "Only valid if end has been set"), this.indexEndValue_;
      }
    }, {
      key: "getIndexEndName",
      value: function getIndexEndName() {
        return e(this.endSet_, "Only valid if end has been set"), this.endNameSet_ ? this.indexEndName_ : Be;
      }
    }, {
      key: "hasLimit",
      value: function hasLimit() {
        return this.limitSet_;
      }
    }, {
      key: "hasAnchoredLimit",
      value: function hasAnchoredLimit() {
        return this.limitSet_ && "" !== this.viewFrom_;
      }
    }, {
      key: "getLimit",
      value: function getLimit() {
        return e(this.limitSet_, "Only valid if limit has been set"), this.limit_;
      }
    }, {
      key: "getIndex",
      value: function getIndex() {
        return this.index_;
      }
    }, {
      key: "loadsAllData",
      value: function loadsAllData() {
        return !(this.startSet_ || this.endSet_ || this.limitSet_);
      }
    }, {
      key: "isDefault",
      value: function isDefault() {
        return this.loadsAllData() && this.index_ === on;
      }
    }, {
      key: "copy",
      value: function copy() {
        var e = new Nn();
        return e.limitSet_ = this.limitSet_, e.limit_ = this.limit_, e.startSet_ = this.startSet_, e.indexStartValue_ = this.indexStartValue_, e.startNameSet_ = this.startNameSet_, e.indexStartName_ = this.indexStartName_, e.endSet_ = this.endSet_, e.indexEndValue_ = this.indexEndValue_, e.endNameSet_ = this.endNameSet_, e.indexEndName_ = this.indexEndName_, e.index_ = this.index_, e.viewFrom_ = this.viewFrom_, e;
      }
    }]);

    return Nn;
  }();

  function Pn(t) {
    var n = {};
    if (t.isDefault()) return n;
    var i;
    return t.index_ === on ? i = "$priority" : t.index_ === yn ? i = "$value" : t.index_ === $t ? i = "$key" : (e(t.index_ instanceof mn, "Unrecognized index type!"), i = t.index_.toString()), n.orderBy = f(i), t.startSet_ && (n.startAt = f(t.indexStartValue_), t.startNameSet_ && (n.startAt += "," + f(t.indexStartName_))), t.endSet_ && (n.endAt = f(t.indexEndValue_), t.endNameSet_ && (n.endAt += "," + f(t.indexEndName_))), t.limitSet_ && (t.isViewFromLeft() ? n.limitToFirst = t.limit_ : n.limitToLast = t.limit_), n;
  }

  function Rn(e) {
    var t = {};

    if (e.startSet_ && (t.sp = e.indexStartValue_, e.startNameSet_ && (t.sn = e.indexStartName_)), e.endSet_ && (t.ep = e.indexEndValue_, e.endNameSet_ && (t.en = e.indexEndName_)), e.limitSet_) {
      t.l = e.limit_;
      var _n42 = e.viewFrom_;
      "" === _n42 && (_n42 = e.isViewFromLeft() ? "l" : "r"), t.vf = _n42;
    }

    return e.index_ !== on && (t.i = e.index_.toString()), t;
  }

  var xn = /*#__PURE__*/function (_vt2) {
    _inherits(xn, _vt2);

    var _super10 = _createSuper(xn);

    function xn(e, t, n, i) {
      var _this36;

      _classCallCheck(this, xn);

      _this36 = _super10.call(this), _this36.repoInfo_ = e, _this36.onDataUpdate_ = t, _this36.authTokenProvider_ = n, _this36.appCheckTokenProvider_ = i, _this36.log_ = Le("p:rest:"), _this36.listens_ = {};
      return _this36;
    }

    _createClass(xn, [{
      key: "reportStats",
      value: function reportStats(e) {
        throw new Error("Method not implemented.");
      }
    }, {
      key: "listen",
      value: function listen(e, t, n, i) {
        var _this37 = this;

        var s = e._path.toString();

        this.log_("Listen called for " + s + " " + e._queryIdentifier);
        var r = xn.getListenId_(e, n),
            o = {};
        this.listens_[r] = o;
        var a = Pn(e._queryParams);
        this.restRequest_(s + ".json", a, function (e, t) {
          var a = t;

          if (404 === e && (a = null, e = null), null === e && _this37.onDataUpdate_(s, a, !1, n), y(_this37.listens_, r) === o) {
            var _t35;

            _t35 = e ? 401 === e ? "permission_denied" : "rest_error:" + e : "ok", i(_t35, null);
          }
        });
      }
    }, {
      key: "unlisten",
      value: function unlisten(e, t) {
        var n = xn.getListenId_(e, t);
        delete this.listens_[n];
      }
    }, {
      key: "get",
      value: function get(e) {
        var _this38 = this;

        var t = Pn(e._queryParams),
            n = e._path.toString(),
            i = new h();

        return this.restRequest_(n + ".json", t, function (e, t) {
          var s = t;
          404 === e && (s = null, e = null), null === e ? (_this38.onDataUpdate_(n, s, !1, null), i.resolve(s)) : i.reject(new Error(s));
        }), i.promise;
      }
    }, {
      key: "refreshAuthToken",
      value: function refreshAuthToken(e) {}
    }, {
      key: "restRequest_",
      value: function restRequest_(e) {
        var _this39 = this;

        var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var n = arguments.length > 2 ? arguments[2] : undefined;
        return t.format = "export", Promise.all([this.authTokenProvider_.getToken(!1), this.appCheckTokenProvider_.getToken(!1)]).then(function (_ref6) {
          var _ref7 = _slicedToArray(_ref6, 2),
              i = _ref7[0],
              s = _ref7[1];

          i && i.accessToken && (t.auth = i.accessToken), s && s.token && (t.ac = s.token);

          var r = (_this39.repoInfo_.secure ? "https://" : "http://") + _this39.repoInfo_.host + e + "?ns=" + _this39.repoInfo_.namespace + function (e) {
            var t = [];

            var _loop4 = function _loop4() {
              var _Object$entries$_i = _slicedToArray(_Object$entries[_i28], 2),
                  n = _Object$entries$_i[0],
                  i = _Object$entries$_i[1];

              Array.isArray(i) ? i.forEach(function (e) {
                t.push(encodeURIComponent(n) + "=" + encodeURIComponent(e));
              }) : t.push(encodeURIComponent(n) + "=" + encodeURIComponent(i));
            };

            for (var _i28 = 0, _Object$entries = Object.entries(e); _i28 < _Object$entries.length; _i28++) {
              _loop4();
            }

            return t.length ? "&" + t.join("&") : "";
          }(t);

          _this39.log_("Sending REST request for " + r);

          var o = new XMLHttpRequest();
          o.onreadystatechange = function () {
            if (n && 4 === o.readyState) {
              _this39.log_("REST Response for " + r + " received. status:", o.status, "response:", o.responseText);

              var _e61 = null;

              if (o.status >= 200 && o.status < 300) {
                try {
                  _e61 = _(o.responseText);
                } catch (e) {
                  We("Failed to parse JSON response for " + r + ": " + o.responseText);
                }

                n(null, _e61);
              } else 401 !== o.status && 404 !== o.status && We("Got unsuccessful REST response for " + r + " Status: " + o.status), n(o.status);

              n = null;
            }
          }, o.open("GET", r, !0), o.send();
        });
      }
    }], [{
      key: "getListenId_",
      value: function getListenId_(t, n) {
        return void 0 !== n ? "tag$" + n : (e(t._queryParams.isDefault(), "should have a tag if it's not a default query."), t._path.toString());
      }
    }]);

    return xn;
  }(vt);

  var Dn = /*#__PURE__*/function () {
    function Dn() {
      _classCallCheck(this, Dn);

      this.rootNode_ = _n.EMPTY_NODE;
    }

    _createClass(Dn, [{
      key: "getNode",
      value: function getNode(e) {
        return this.rootNode_.getChild(e);
      }
    }, {
      key: "updateSnapshot",
      value: function updateSnapshot(e, t) {
        this.rootNode_ = this.rootNode_.updateChild(e, t);
      }
    }]);

    return Dn;
  }();

  function An() {
    return {
      value: null,
      children: new Map()
    };
  }

  function On(e, t, n) {
    if (xt(t)) e.value = n, e.children.clear();else if (null !== e.value) e.value = e.value.updateChild(t, n);else {
      var _i29 = Et(t);

      e.children.has(_i29) || e.children.set(_i29, An()), On(e.children.get(_i29), t = St(t), n);
    }
  }

  function Mn(e, t) {
    if (xt(t)) return e.value = null, e.children.clear(), !0;

    if (null !== e.value) {
      if (e.value.isLeafNode()) return !1;
      {
        var _n43 = e.value;
        return e.value = null, _n43.forEachChild(on, function (t, n) {
          On(e, new bt(t), n);
        }), Mn(e, t);
      }
    }

    if (e.children.size > 0) {
      var _n44 = Et(t);

      return t = St(t), e.children.has(_n44) && Mn(e.children.get(_n44), t) && e.children["delete"](_n44), 0 === e.children.size;
    }

    return !0;
  }

  function Ln(e, t, n) {
    null !== e.value ? n(t, e.value) : function (e, t) {
      e.children.forEach(function (e, n) {
        t(n, e);
      });
    }(e, function (e, i) {
      Ln(i, new bt(t.toString() + "/" + e), n);
    });
  }

  var Fn = /*#__PURE__*/function () {
    function Fn(e) {
      _classCallCheck(this, Fn);

      this.collection_ = e, this.last_ = null;
    }

    _createClass(Fn, [{
      key: "get",
      value: function get() {
        var e = this.collection_.get(),
            t = Object.assign({}, e);
        return this.last_ && Ke(this.last_, function (e, n) {
          t[e] = t[e] - n;
        }), this.last_ = e, t;
      }
    }]);

    return Fn;
  }();

  var qn = /*#__PURE__*/function () {
    function qn(e, t) {
      _classCallCheck(this, qn);

      this.server_ = t, this.statsToReport_ = {}, this.statsListener_ = new Fn(e);
      var n = 1e4 + 2e4 * Math.random();
      Ze(this.reportStats_.bind(this), Math.floor(n));
    }

    _createClass(qn, [{
      key: "reportStats_",
      value: function reportStats_() {
        var _this40 = this;

        var e = this.statsListener_.get(),
            t = {};
        var n = !1;
        Ke(e, function (e, i) {
          i > 0 && m(_this40.statsToReport_, e) && (t[e] = i, n = !0);
        }), n && this.server_.reportStats(t), Ze(this.reportStats_.bind(this), Math.floor(2 * Math.random() * 3e5));
      }
    }]);

    return qn;
  }();

  var Wn;

  function Un(e) {
    return {
      fromUser: !1,
      fromServer: !0,
      queryId: e,
      tagged: !0
    };
  }

  !function (e) {
    e[e.OVERWRITE = 0] = "OVERWRITE", e[e.MERGE = 1] = "MERGE", e[e.ACK_USER_WRITE = 2] = "ACK_USER_WRITE", e[e.LISTEN_COMPLETE = 3] = "LISTEN_COMPLETE";
  }(Wn || (Wn = {}));

  var jn = /*#__PURE__*/function () {
    function jn(e, t, n) {
      _classCallCheck(this, jn);

      this.path = e, this.affectedTree = t, this.revert = n, this.type = Wn.ACK_USER_WRITE, this.source = {
        fromUser: !0,
        fromServer: !1,
        queryId: null,
        tagged: !1
      };
    }

    _createClass(jn, [{
      key: "operationForChild",
      value: function operationForChild(t) {
        if (xt(this.path)) {
          if (null != this.affectedTree.value) return e(this.affectedTree.children.isEmpty(), "affectedTree should not have overlapping affected paths."), this;
          {
            var _e62 = this.affectedTree.subtree(new bt(t));

            return new jn(It(), _e62, this.revert);
          }
        }

        return e(Et(this.path) === t, "operationForChild called for unrelated child."), new jn(St(this.path), this.affectedTree, this.revert);
      }
    }]);

    return jn;
  }();

  var Bn = /*#__PURE__*/function () {
    function Bn(e, t) {
      _classCallCheck(this, Bn);

      this.source = e, this.path = t, this.type = Wn.LISTEN_COMPLETE;
    }

    _createClass(Bn, [{
      key: "operationForChild",
      value: function operationForChild(e) {
        return xt(this.path) ? new Bn(this.source, It()) : new Bn(this.source, St(this.path));
      }
    }]);

    return Bn;
  }();

  var Hn = /*#__PURE__*/function () {
    function Hn(e, t, n) {
      _classCallCheck(this, Hn);

      this.source = e, this.path = t, this.snap = n, this.type = Wn.OVERWRITE;
    }

    _createClass(Hn, [{
      key: "operationForChild",
      value: function operationForChild(e) {
        return xt(this.path) ? new Hn(this.source, It(), this.snap.getImmediateChild(e)) : new Hn(this.source, St(this.path), this.snap);
      }
    }]);

    return Hn;
  }();

  var zn = /*#__PURE__*/function () {
    function zn(e, t, n) {
      _classCallCheck(this, zn);

      this.source = e, this.path = t, this.children = n, this.type = Wn.MERGE;
    }

    _createClass(zn, [{
      key: "operationForChild",
      value: function operationForChild(t) {
        if (xt(this.path)) {
          var _e63 = this.children.subtree(new bt(t));

          return _e63.isEmpty() ? null : _e63.value ? new Hn(this.source, It(), _e63.value) : new zn(this.source, It(), _e63);
        }

        return e(Et(this.path) === t, "Can't get a merge for a child not on the path of the operation"), new zn(this.source, St(this.path), this.children);
      }
    }, {
      key: "toString",
      value: function toString() {
        return "Operation(" + this.path + ": " + this.source.toString() + " merge: " + this.children.toString() + ")";
      }
    }]);

    return zn;
  }();

  var Vn = /*#__PURE__*/function () {
    function Vn(e, t, n) {
      _classCallCheck(this, Vn);

      this.node_ = e, this.fullyInitialized_ = t, this.filtered_ = n;
    }

    _createClass(Vn, [{
      key: "isFullyInitialized",
      value: function isFullyInitialized() {
        return this.fullyInitialized_;
      }
    }, {
      key: "isFiltered",
      value: function isFiltered() {
        return this.filtered_;
      }
    }, {
      key: "isCompleteForPath",
      value: function isCompleteForPath(e) {
        if (xt(e)) return this.isFullyInitialized() && !this.filtered_;
        var t = Et(e);
        return this.isCompleteForChild(t);
      }
    }, {
      key: "isCompleteForChild",
      value: function isCompleteForChild(e) {
        return this.isFullyInitialized() && !this.filtered_ || this.node_.hasChild(e);
      }
    }, {
      key: "getNode",
      value: function getNode() {
        return this.node_;
      }
    }]);

    return Vn;
  }();

  var $n = /*#__PURE__*/_createClass(function $n(e) {
    _classCallCheck(this, $n);

    this.query_ = e, this.index_ = this.query_._queryParams.getIndex();
  });

  function Yn(e, n, i, s, r, o) {
    var a = s.filter(function (e) {
      return e.type === i;
    });
    a.sort(function (n, i) {
      return function (e, n, i) {
        if (null == n.childName || null == i.childName) throw t("Should only compare child_ events.");
        var s = new Bt(n.childName, n.snapshotNode),
            r = new Bt(i.childName, i.snapshotNode);
        return e.index_.compare(s, r);
      }(e, n, i);
    }), a.forEach(function (t) {
      var i = function (e, t, n) {
        return "value" === t.type || "child_removed" === t.type || (t.prevName = n.getPredecessorChildName(t.childName, t.snapshotNode, e.index_)), t;
      }(e, t, o);

      r.forEach(function (s) {
        s.respondsTo(t.type) && n.push(s.createEvent(i, e.query_));
      });
    });
  }

  function Kn(e, t) {
    return {
      eventCache: e,
      serverCache: t
    };
  }

  function Gn(e, t, n, i) {
    return Kn(new Vn(t, n, i), e.serverCache);
  }

  function Qn(e, t, n, i) {
    return Kn(e.eventCache, new Vn(t, n, i));
  }

  function Jn(e) {
    return e.eventCache.isFullyInitialized() ? e.eventCache.getNode() : null;
  }

  function Xn(e) {
    return e.serverCache.isFullyInitialized() ? e.serverCache.getNode() : null;
  }

  var Zn;

  var ei = /*#__PURE__*/function () {
    function ei(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
        return Zn || (Zn = new Gt(ze)), Zn;
      }();

      _classCallCheck(this, ei);

      this.value = e, this.children = t;
    }

    _createClass(ei, [{
      key: "isEmpty",
      value: function isEmpty() {
        return null === this.value && this.children.isEmpty();
      }
    }, {
      key: "findRootMostMatchingPathAndValue",
      value: function findRootMostMatchingPathAndValue(e, t) {
        if (null != this.value && t(this.value)) return {
          path: It(),
          value: this.value
        };
        if (xt(e)) return null;
        {
          var _n45 = Et(e),
              _i30 = this.children.get(_n45);

          if (null !== _i30) {
            var _s22 = _i30.findRootMostMatchingPathAndValue(St(e), t);

            return null != _s22 ? {
              path: Rt(new bt(_n45), _s22.path),
              value: _s22.value
            } : null;
          }

          return null;
        }
      }
    }, {
      key: "findRootMostValueAndPath",
      value: function findRootMostValueAndPath(e) {
        return this.findRootMostMatchingPathAndValue(e, function () {
          return !0;
        });
      }
    }, {
      key: "subtree",
      value: function subtree(e) {
        if (xt(e)) return this;
        {
          var _t36 = Et(e),
              _n46 = this.children.get(_t36);

          return null !== _n46 ? _n46.subtree(St(e)) : new ei(null);
        }
      }
    }, {
      key: "set",
      value: function set(e, t) {
        if (xt(e)) return new ei(t, this.children);
        {
          var _n47 = Et(e),
              _i31 = (this.children.get(_n47) || new ei(null)).set(St(e), t),
              _s23 = this.children.insert(_n47, _i31);

          return new ei(this.value, _s23);
        }
      }
    }, {
      key: "remove",
      value: function remove(e) {
        if (xt(e)) return this.children.isEmpty() ? new ei(null) : new ei(null, this.children);
        {
          var _t37 = Et(e),
              _n48 = this.children.get(_t37);

          if (_n48) {
            var _i32 = _n48.remove(St(e));

            var _s24;

            return _s24 = _i32.isEmpty() ? this.children.remove(_t37) : this.children.insert(_t37, _i32), null === this.value && _s24.isEmpty() ? new ei(null) : new ei(this.value, _s24);
          }

          return this;
        }
      }
    }, {
      key: "get",
      value: function get(e) {
        if (xt(e)) return this.value;
        {
          var _t38 = Et(e),
              _n49 = this.children.get(_t38);

          return _n49 ? _n49.get(St(e)) : null;
        }
      }
    }, {
      key: "setTree",
      value: function setTree(e, t) {
        if (xt(e)) return t;
        {
          var _n50 = Et(e),
              _i33 = (this.children.get(_n50) || new ei(null)).setTree(St(e), t);

          var _s25;

          return _s25 = _i33.isEmpty() ? this.children.remove(_n50) : this.children.insert(_n50, _i33), new ei(this.value, _s25);
        }
      }
    }, {
      key: "fold",
      value: function fold(e) {
        return this.fold_(It(), e);
      }
    }, {
      key: "fold_",
      value: function fold_(e, t) {
        var n = {};
        return this.children.inorderTraversal(function (i, s) {
          n[i] = s.fold_(Rt(e, i), t);
        }), t(e, this.value, n);
      }
    }, {
      key: "findOnPath",
      value: function findOnPath(e, t) {
        return this.findOnPath_(e, It(), t);
      }
    }, {
      key: "findOnPath_",
      value: function findOnPath_(e, t, n) {
        var i = !!this.value && n(t, this.value);
        if (i) return i;
        if (xt(e)) return null;
        {
          var _i34 = Et(e),
              _s26 = this.children.get(_i34);

          return _s26 ? _s26.findOnPath_(St(e), Rt(t, _i34), n) : null;
        }
      }
    }, {
      key: "foreachOnPath",
      value: function foreachOnPath(e, t) {
        return this.foreachOnPath_(e, It(), t);
      }
    }, {
      key: "foreachOnPath_",
      value: function foreachOnPath_(e, t, n) {
        if (xt(e)) return this;
        {
          this.value && n(t, this.value);

          var _i35 = Et(e),
              _s27 = this.children.get(_i35);

          return _s27 ? _s27.foreachOnPath_(St(e), Rt(t, _i35), n) : new ei(null);
        }
      }
    }, {
      key: "foreach",
      value: function foreach(e) {
        this.foreach_(It(), e);
      }
    }, {
      key: "foreach_",
      value: function foreach_(e, t) {
        this.children.inorderTraversal(function (n, i) {
          i.foreach_(Rt(e, n), t);
        }), this.value && t(e, this.value);
      }
    }, {
      key: "foreachChild",
      value: function foreachChild(e) {
        this.children.inorderTraversal(function (t, n) {
          n.value && e(t, n.value);
        });
      }
    }], [{
      key: "fromObject",
      value: function fromObject(e) {
        var t = new ei(null);
        return Ke(e, function (e, n) {
          t = t.set(new bt(e), n);
        }), t;
      }
    }]);

    return ei;
  }();

  var ti = /*#__PURE__*/function () {
    function ti(e) {
      _classCallCheck(this, ti);

      this.writeTree_ = e;
    }

    _createClass(ti, null, [{
      key: "empty",
      value: function empty() {
        return new ti(new ei(null));
      }
    }]);

    return ti;
  }();

  function ni(e, t, n) {
    if (xt(t)) return new ti(new ei(n));
    {
      var _i36 = e.writeTree_.findRootMostValueAndPath(t);

      if (null != _i36) {
        var _s28 = _i36.path;
        var _r13 = _i36.value;

        var _o7 = Dt(_s28, t);

        return _r13 = _r13.updateChild(_o7, n), new ti(e.writeTree_.set(_s28, _r13));
      }

      {
        var _i37 = new ei(n),
            _s29 = e.writeTree_.setTree(t, _i37);

        return new ti(_s29);
      }
    }
  }

  function ii(e, t, n) {
    var i = e;
    return Ke(n, function (e, n) {
      i = ni(i, Rt(t, e), n);
    }), i;
  }

  function si(e, t) {
    if (xt(t)) return ti.empty();
    {
      var _n51 = e.writeTree_.setTree(t, new ei(null));

      return new ti(_n51);
    }
  }

  function ri(e, t) {
    return null != oi(e, t);
  }

  function oi(e, t) {
    var n = e.writeTree_.findRootMostValueAndPath(t);
    return null != n ? e.writeTree_.get(n.path).getChild(Dt(n.path, t)) : null;
  }

  function ai(e) {
    var t = [],
        n = e.writeTree_.value;
    return null != n ? n.isLeafNode() || n.forEachChild(on, function (e, n) {
      t.push(new Bt(e, n));
    }) : e.writeTree_.children.inorderTraversal(function (e, n) {
      null != n.value && t.push(new Bt(e, n.value));
    }), t;
  }

  function li(e, t) {
    if (xt(t)) return e;
    {
      var _n52 = oi(e, t);

      return new ti(null != _n52 ? new ei(_n52) : e.writeTree_.subtree(t));
    }
  }

  function hi(e) {
    return e.writeTree_.isEmpty();
  }

  function ci(e, t) {
    return ui(It(), e.writeTree_, t);
  }

  function ui(t, n, i) {
    if (null != n.value) return i.updateChild(t, n.value);
    {
      var _s30 = null;
      return n.children.inorderTraversal(function (n, r) {
        ".priority" === n ? (e(null !== r.value, "Priority writes must always be leaf nodes"), _s30 = r.value) : i = ui(Rt(t, n), r, i);
      }), i.getChild(t).isEmpty() || null === _s30 || (i = i.updateChild(Rt(t, ".priority"), _s30)), i;
    }
  }

  function di(e, t) {
    return Ii(t, e);
  }

  function pi(e, t) {
    if (e.snap) return Mt(e.path, t);

    for (var _n53 in e.children) {
      if (e.children.hasOwnProperty(_n53) && Mt(Rt(e.path, _n53), t)) return !0;
    }

    return !1;
  }

  function _i(e) {
    return e.visible;
  }

  function fi(e, n, i) {
    var s = ti.empty();

    for (var _r14 = 0; _r14 < e.length; ++_r14) {
      var _o8 = e[_r14];

      if (n(_o8)) {
        var _e64 = _o8.path;

        var _n54 = void 0;

        if (_o8.snap) Mt(i, _e64) ? (_n54 = Dt(i, _e64), s = ni(s, _n54, _o8.snap)) : Mt(_e64, i) && (_n54 = Dt(_e64, i), s = ni(s, It(), _o8.snap.getChild(_n54)));else {
          if (!_o8.children) throw t("WriteRecord should have .snap or .children");
          if (Mt(i, _e64)) _n54 = Dt(i, _e64), s = ii(s, _n54, _o8.children);else if (Mt(_e64, i)) if (_n54 = Dt(_e64, i), xt(_n54)) s = ii(s, It(), _o8.children);else {
            var _e65 = y(_o8.children, Et(_n54));

            if (_e65) {
              var _t39 = _e65.getChild(St(_n54));

              s = ni(s, It(), _t39);
            }
          }
        }
      }
    }

    return s;
  }

  function gi(e, t, n, i, s) {
    if (i || s) {
      var _r15 = li(e.visibleWrites, t);

      if (!s && hi(_r15)) return n;

      if (s || null != n || ri(_r15, It())) {
        var _r16 = function _r16(e) {
          return (e.visible || s) && (!i || !~i.indexOf(e.writeId)) && (Mt(e.path, t) || Mt(t, e.path));
        };

        return ci(fi(e.allWrites, _r16, t), n || _n.EMPTY_NODE);
      }

      return null;
    }

    {
      var _i38 = oi(e.visibleWrites, t);

      if (null != _i38) return _i38;
      {
        var _i39 = li(e.visibleWrites, t);

        return hi(_i39) ? n : null != n || ri(_i39, It()) ? ci(_i39, n || _n.EMPTY_NODE) : null;
      }
    }
  }

  function mi(e, t, n, i) {
    return gi(e.writeTree, e.treePath, t, n, i);
  }

  function yi(e, t) {
    return function (e, t, n) {
      var i = _n.EMPTY_NODE;
      var s = oi(e.visibleWrites, t);
      if (s) return s.isLeafNode() || s.forEachChild(on, function (e, t) {
        i = i.updateImmediateChild(e, t);
      }), i;

      if (n) {
        var _s31 = li(e.visibleWrites, t);

        return n.forEachChild(on, function (e, t) {
          var n = ci(li(_s31, new bt(e)), t);
          i = i.updateImmediateChild(e, n);
        }), ai(_s31).forEach(function (e) {
          i = i.updateImmediateChild(e.name, e.node);
        }), i;
      }

      return ai(li(e.visibleWrites, t)).forEach(function (e) {
        i = i.updateImmediateChild(e.name, e.node);
      }), i;
    }(e.writeTree, e.treePath, t);
  }

  function vi(t, n, i, s) {
    return function (t, n, i, s, r) {
      e(s || r, "Either existingEventSnap or existingServerSnap must exist");
      var o = Rt(n, i);
      if (ri(t.visibleWrites, o)) return null;
      {
        var _e66 = li(t.visibleWrites, o);

        return hi(_e66) ? r.getChild(i) : ci(_e66, r.getChild(i));
      }
    }(t.writeTree, t.treePath, n, i, s);
  }

  function Ci(e, t) {
    return function (e, t) {
      return oi(e.visibleWrites, t);
    }(e.writeTree, Rt(e.treePath, t));
  }

  function wi(e, t, n) {
    return function (e, t, n, i) {
      var s = Rt(t, n),
          r = oi(e.visibleWrites, s);
      return null != r ? r : i.isCompleteForChild(n) ? ci(li(e.visibleWrites, s), i.getNode().getImmediateChild(n)) : null;
    }(e.writeTree, e.treePath, t, n);
  }

  function bi(e, t) {
    return Ii(Rt(e.treePath, t), e.writeTree);
  }

  function Ii(e, t) {
    return {
      treePath: e,
      writeTree: t
    };
  }

  var Ei = /*#__PURE__*/function () {
    function Ei() {
      _classCallCheck(this, Ei);

      this.changeMap = new Map();
    }

    _createClass(Ei, [{
      key: "trackChildChange",
      value: function trackChildChange(n) {
        var i = n.type,
            s = n.childName;
        e("child_added" === i || "child_changed" === i || "child_removed" === i, "Only child changes supported for tracking"), e(".priority" !== s, "Only non-priority child changes can be tracked.");
        var r = this.changeMap.get(s);

        if (r) {
          var _e67 = r.type;
          if ("child_added" === i && "child_removed" === _e67) this.changeMap.set(s, En(s, n.snapshotNode, r.snapshotNode));else if ("child_removed" === i && "child_added" === _e67) this.changeMap["delete"](s);else if ("child_removed" === i && "child_changed" === _e67) this.changeMap.set(s, In(s, r.oldSnap));else if ("child_changed" === i && "child_added" === _e67) this.changeMap.set(s, bn(s, n.snapshotNode));else {
            if ("child_changed" !== i || "child_changed" !== _e67) throw t("Illegal combination of changes: " + n + " occurred after " + r);
            this.changeMap.set(s, En(s, n.snapshotNode, r.oldSnap));
          }
        } else this.changeMap.set(s, n);
      }
    }, {
      key: "getChanges",
      value: function getChanges() {
        return Array.from(this.changeMap.values());
      }
    }]);

    return Ei;
  }();

  var Ti = new ( /*#__PURE__*/function () {
    function _class5() {
      _classCallCheck(this, _class5);
    }

    _createClass(_class5, [{
      key: "getCompleteChild",
      value: function getCompleteChild(e) {
        return null;
      }
    }, {
      key: "getChildAfterChild",
      value: function getChildAfterChild(e, t, n) {
        return null;
      }
    }]);

    return _class5;
  }())();

  var Si = /*#__PURE__*/function () {
    function Si(e, t) {
      var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      _classCallCheck(this, Si);

      this.writes_ = e, this.viewCache_ = t, this.optCompleteServerCache_ = n;
    }

    _createClass(Si, [{
      key: "getCompleteChild",
      value: function getCompleteChild(e) {
        var t = this.viewCache_.eventCache;
        if (t.isCompleteForChild(e)) return t.getNode().getImmediateChild(e);
        {
          var _t40 = null != this.optCompleteServerCache_ ? new Vn(this.optCompleteServerCache_, !0, !1) : this.viewCache_.serverCache;

          return wi(this.writes_, e, _t40);
        }
      }
    }, {
      key: "getChildAfterChild",
      value: function getChildAfterChild(e, t, n) {
        var i = null != this.optCompleteServerCache_ ? this.optCompleteServerCache_ : Xn(this.viewCache_),
            s = function (e, t, n, i, s, r) {
          return function (e, t, n, i, s, r, o) {
            var a;
            var l = li(e.visibleWrites, t),
                h = oi(l, It());
            if (null != h) a = h;else {
              if (null == n) return [];
              a = ci(l, n);
            }
            if (a = a.withIndex(o), a.isEmpty() || a.isLeafNode()) return [];
            {
              var _e68 = [],
                  _t41 = o.getCompare(),
                  _n55 = r ? a.getReverseIteratorFrom(i, o) : a.getIteratorFrom(i, o);

              var _l6 = _n55.getNext();

              for (; _l6 && _e68.length < s;) {
                0 !== _t41(_l6, i) && _e68.push(_l6), _l6 = _n55.getNext();
              }

              return _e68;
            }
          }(e.writeTree, e.treePath, t, n, i, s, r);
        }(this.writes_, i, t, 1, n, e);

        return 0 === s.length ? null : s[0];
      }
    }]);

    return Si;
  }();

  function ki(t, n, i, s, r, o) {
    var a = n.eventCache;
    if (null != Ci(s, i)) return n;
    {
      var _l7, _h4;

      if (xt(i)) {
        if (e(n.serverCache.isFullyInitialized(), "If change path is empty, we must have complete server data"), n.serverCache.isFiltered()) {
          var _e69 = Xn(n),
              _i40 = yi(s, _e69 instanceof _n ? _e69 : _n.EMPTY_NODE);

          _l7 = t.filter.updateFullNode(n.eventCache.getNode(), _i40, o);
        } else {
          var _e70 = mi(s, Xn(n));

          _l7 = t.filter.updateFullNode(n.eventCache.getNode(), _e70, o);
        }
      } else {
        var _c4 = Et(i);

        if (".priority" === _c4) {
          e(1 === Tt(i), "Can't have a priority with additional path components");

          var _r17 = a.getNode();

          _h4 = n.serverCache.getNode();

          var _o9 = vi(s, i, _r17, _h4);

          _l7 = null != _o9 ? t.filter.updatePriority(_r17, _o9) : a.getNode();
        } else {
          var _e71 = St(i);

          var _u3;

          if (a.isCompleteForChild(_c4)) {
            _h4 = n.serverCache.getNode();

            var _t42 = vi(s, i, a.getNode(), _h4);

            _u3 = null != _t42 ? a.getNode().getImmediateChild(_c4).updateChild(_e71, _t42) : a.getNode().getImmediateChild(_c4);
          } else _u3 = wi(s, _c4, n.serverCache);

          _l7 = null != _u3 ? t.filter.updateChild(a.getNode(), _c4, _u3, _e71, r, o) : a.getNode();
        }
      }
      return Gn(n, _l7, a.isFullyInitialized() || xt(i), t.filter.filtersNodes());
    }
  }

  function Ni(e, t, n, i, s, r, o, a) {
    var l = t.serverCache;
    var h;
    var c = o ? e.filter : e.filter.getIndexedFilter();
    if (xt(n)) h = c.updateFullNode(l.getNode(), i, null);else if (c.filtersNodes() && !l.isFiltered()) {
      var _e72 = l.getNode().updateChild(n, i);

      h = c.updateFullNode(l.getNode(), _e72, null);
    } else {
      var _e73 = Et(n);

      if (!l.isCompleteForPath(n) && Tt(n) > 1) return t;

      var _s32 = St(n),
          _r18 = l.getNode().getImmediateChild(_e73).updateChild(_s32, i);

      h = ".priority" === _e73 ? c.updatePriority(l.getNode(), _r18) : c.updateChild(l.getNode(), _e73, _r18, _s32, Ti, null);
    }
    var u = Qn(t, h, l.isFullyInitialized() || xt(n), c.filtersNodes());
    return ki(e, u, n, s, new Si(s, u, r), a);
  }

  function Pi(e, t, n, i, s, r, o) {
    var a = t.eventCache;
    var l, h;
    var c = new Si(s, t, r);
    if (xt(n)) h = e.filter.updateFullNode(t.eventCache.getNode(), i, o), l = Gn(t, h, !0, e.filter.filtersNodes());else {
      var _s33 = Et(n);

      if (".priority" === _s33) h = e.filter.updatePriority(t.eventCache.getNode(), i), l = Gn(t, h, a.isFullyInitialized(), a.isFiltered());else {
        var _r19 = St(n),
            _h5 = a.getNode().getImmediateChild(_s33);

        var _u4;

        if (xt(_r19)) _u4 = i;else {
          var _e74 = c.getCompleteChild(_s33);

          _u4 = null != _e74 ? ".priority" === kt(_r19) && _e74.getChild(Pt(_r19)).isEmpty() ? _e74 : _e74.updateChild(_r19, i) : _n.EMPTY_NODE;
        }
        l = _h5.equals(_u4) ? t : Gn(t, e.filter.updateChild(a.getNode(), _s33, _u4, _r19, c, o), a.isFullyInitialized(), e.filter.filtersNodes());
      }
    }
    return l;
  }

  function Ri(e, t) {
    return e.eventCache.isCompleteForChild(t);
  }

  function xi(e, t, n) {
    return n.foreach(function (e, n) {
      t = t.updateChild(e, n);
    }), t;
  }

  function Di(e, t, n, i, s, r, o, a) {
    if (t.serverCache.getNode().isEmpty() && !t.serverCache.isFullyInitialized()) return t;
    var l,
        h = t;
    l = xt(n) ? i : new ei(null).setTree(n, i);
    var c = t.serverCache.getNode();
    return l.children.inorderTraversal(function (n, i) {
      if (c.hasChild(n)) {
        var _l8 = xi(0, t.serverCache.getNode().getImmediateChild(n), i);

        h = Ni(e, h, new bt(n), _l8, s, r, o, a);
      }
    }), l.children.inorderTraversal(function (n, i) {
      var l = !t.serverCache.isCompleteForChild(n) && null === i.value;

      if (!c.hasChild(n) && !l) {
        var _l9 = xi(0, t.serverCache.getNode().getImmediateChild(n), i);

        h = Ni(e, h, new bt(n), _l9, s, r, o, a);
      }
    }), h;
  }

  var Ai = /*#__PURE__*/function () {
    function Ai(e, t) {
      _classCallCheck(this, Ai);

      this.query_ = e, this.eventRegistrations_ = [];
      var n = this.query_._queryParams,
          i = new Tn(n.getIndex()),
          s = (r = n).loadsAllData() ? new Tn(r.getIndex()) : r.hasLimit() ? new kn(r) : new Sn(r);
      var r;

      this.processor_ = function (e) {
        return {
          filter: e
        };
      }(s);

      var o = t.serverCache,
          a = t.eventCache,
          l = i.updateFullNode(_n.EMPTY_NODE, o.getNode(), null),
          h = s.updateFullNode(_n.EMPTY_NODE, a.getNode(), null),
          c = new Vn(l, o.isFullyInitialized(), i.filtersNodes()),
          u = new Vn(h, a.isFullyInitialized(), s.filtersNodes());
      this.viewCache_ = Kn(u, c), this.eventGenerator_ = new $n(this.query_);
    }

    _createClass(Ai, [{
      key: "query",
      get: function get() {
        return this.query_;
      }
    }]);

    return Ai;
  }();

  function Oi(e, t) {
    var n = Xn(e.viewCache_);
    return n && (e.query._queryParams.loadsAllData() || !xt(t) && !n.getImmediateChild(Et(t)).isEmpty()) ? n.getChild(t) : null;
  }

  function Mi(e) {
    return 0 === e.eventRegistrations_.length;
  }

  function Li(t, n, i) {
    var s = [];

    if (i) {
      e(null == n, "A cancel should cancel all event registrations.");
      var _r20 = t.query._path;
      t.eventRegistrations_.forEach(function (e) {
        var t = e.createCancelEvent(i, _r20);
        t && s.push(t);
      });
    }

    if (n) {
      var _e75 = [];

      for (var _i41 = 0; _i41 < t.eventRegistrations_.length; ++_i41) {
        var _s34 = t.eventRegistrations_[_i41];

        if (_s34.matches(n)) {
          if (n.hasAnyCallback()) {
            _e75 = _e75.concat(t.eventRegistrations_.slice(_i41 + 1));
            break;
          }
        } else _e75.push(_s34);
      }

      t.eventRegistrations_ = _e75;
    } else t.eventRegistrations_ = [];

    return s;
  }

  function Fi(n, i, s, r) {
    i.type === Wn.MERGE && null !== i.source.queryId && (e(Xn(n.viewCache_), "We should always have a full cache before handling merges"), e(Jn(n.viewCache_), "Missing event cache, even though we have a server cache"));

    var o = n.viewCache_,
        a = function (n, i, s, r, o) {
      var a = new Ei();
      var l, h;

      if (s.type === Wn.OVERWRITE) {
        var _t43 = s;
        _t43.source.fromUser ? l = Pi(n, i, _t43.path, _t43.snap, r, o, a) : (e(_t43.source.fromServer, "Unknown source."), h = _t43.source.tagged || i.serverCache.isFiltered() && !xt(_t43.path), l = Ni(n, i, _t43.path, _t43.snap, r, o, h, a));
      } else if (s.type === Wn.MERGE) {
        var _t44 = s;
        _t44.source.fromUser ? l = function (e, t, n, i, s, r, o) {
          var a = t;
          return i.foreach(function (i, l) {
            var h = Rt(n, i);
            Ri(t, Et(h)) && (a = Pi(e, a, h, l, s, r, o));
          }), i.foreach(function (i, l) {
            var h = Rt(n, i);
            Ri(t, Et(h)) || (a = Pi(e, a, h, l, s, r, o));
          }), a;
        }(n, i, _t44.path, _t44.children, r, o, a) : (e(_t44.source.fromServer, "Unknown source."), h = _t44.source.tagged || i.serverCache.isFiltered(), l = Di(n, i, _t44.path, _t44.children, r, o, h, a));
      } else if (s.type === Wn.ACK_USER_WRITE) {
        var _t45 = s;
        l = _t45.revert ? function (t, n, i, s, r, o) {
          var a;
          if (null != Ci(s, i)) return n;
          {
            var _l10 = new Si(s, n, r),
                _h6 = n.eventCache.getNode();

            var _c5;

            if (xt(i) || ".priority" === Et(i)) {
              var _i42;

              if (n.serverCache.isFullyInitialized()) _i42 = mi(s, Xn(n));else {
                var _t46 = n.serverCache.getNode();

                e(_t46 instanceof _n, "serverChildren would be complete if leaf node"), _i42 = yi(s, _t46);
              }
              _c5 = t.filter.updateFullNode(_h6, _i42, o);
            } else {
              var _e76 = Et(i);

              var _r21 = wi(s, _e76, n.serverCache);

              null == _r21 && n.serverCache.isCompleteForChild(_e76) && (_r21 = _h6.getImmediateChild(_e76)), _c5 = null != _r21 ? t.filter.updateChild(_h6, _e76, _r21, St(i), _l10, o) : n.eventCache.getNode().hasChild(_e76) ? t.filter.updateChild(_h6, _e76, _n.EMPTY_NODE, St(i), _l10, o) : _h6, _c5.isEmpty() && n.serverCache.isFullyInitialized() && (a = mi(s, Xn(n)), a.isLeafNode() && (_c5 = t.filter.updateFullNode(_c5, a, o)));
            }

            return a = n.serverCache.isFullyInitialized() || null != Ci(s, It()), Gn(n, _c5, a, t.filter.filtersNodes());
          }
        }(n, i, _t45.path, r, o, a) : function (e, t, n, i, s, r, o) {
          if (null != Ci(s, n)) return t;
          var a = t.serverCache.isFiltered(),
              l = t.serverCache;

          if (null != i.value) {
            if (xt(n) && l.isFullyInitialized() || l.isCompleteForPath(n)) return Ni(e, t, n, l.getNode().getChild(n), s, r, a, o);

            if (xt(n)) {
              var _i43 = new ei(null);

              return l.getNode().forEachChild($t, function (e, t) {
                _i43 = _i43.set(new bt(e), t);
              }), Di(e, t, n, _i43, s, r, a, o);
            }

            return t;
          }

          {
            var _h7 = new ei(null);

            return i.foreach(function (e, t) {
              var i = Rt(n, e);
              l.isCompleteForPath(i) && (_h7 = _h7.set(e, l.getNode().getChild(i)));
            }), Di(e, t, n, _h7, s, r, a, o);
          }
        }(n, i, _t45.path, _t45.affectedTree, r, o, a);
      } else {
        if (s.type !== Wn.LISTEN_COMPLETE) throw t("Unknown operation type: " + s.type);

        l = function (e, t, n, i, s) {
          var r = t.serverCache;
          return ki(e, Qn(t, r.getNode(), r.isFullyInitialized() || xt(n), r.isFiltered()), n, i, Ti, s);
        }(n, i, s.path, r, a);
      }

      var c = a.getChanges();
      return function (e, t, n) {
        var i = t.eventCache;

        if (i.isFullyInitialized()) {
          var _s35 = i.getNode().isLeafNode() || i.getNode().isEmpty(),
              _r22 = Jn(e);

          (n.length > 0 || !e.eventCache.isFullyInitialized() || _s35 && !i.getNode().equals(_r22) || !i.getNode().getPriority().equals(_r22.getPriority())) && n.push(wn(Jn(t)));
        }
      }(i, l, c), {
        viewCache: l,
        changes: c
      };
    }(n.processor_, o, i, s, r);

    var l, h;
    return l = n.processor_, h = a.viewCache, e(h.eventCache.getNode().isIndexed(l.filter.getIndex()), "Event snap not indexed"), e(h.serverCache.getNode().isIndexed(l.filter.getIndex()), "Server snap not indexed"), e(a.viewCache.serverCache.isFullyInitialized() || !o.serverCache.isFullyInitialized(), "Once a server snap is complete, it should never go back"), n.viewCache_ = a.viewCache, qi(n, a.changes, a.viewCache.eventCache.getNode(), null);
  }

  function qi(e, t, n, i) {
    var s = i ? [i] : e.eventRegistrations_;
    return function (e, t, n, i) {
      var s = [],
          r = [];
      return t.forEach(function (t) {
        var n;
        "child_changed" === t.type && e.index_.indexedValueChanged(t.oldSnap, t.snapshotNode) && r.push((n = t.childName, {
          type: "child_moved",
          snapshotNode: t.snapshotNode,
          childName: n
        }));
      }), Yn(e, s, "child_removed", t, i, n), Yn(e, s, "child_added", t, i, n), Yn(e, s, "child_moved", r, i, n), Yn(e, s, "child_changed", t, i, n), Yn(e, s, "value", t, i, n), s;
    }(e.eventGenerator_, t, n, s);
  }

  var Wi, Ui;

  var ji = /*#__PURE__*/_createClass(function ji() {
    _classCallCheck(this, ji);

    this.views = new Map();
  });

  function Bi(t, n, i, s) {
    var r = n.source.queryId;

    if (null !== r) {
      var _o10 = t.views.get(r);

      return e(null != _o10, "SyncTree gave us an op for an invalid query."), Fi(_o10, n, i, s);
    }

    {
      var _e77 = [];

      var _iterator9 = _createForOfIteratorHelper(t.views.values()),
          _step9;

      try {
        for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
          var _r23 = _step9.value;
          _e77 = _e77.concat(Fi(_r23, n, i, s));
        }
      } catch (err) {
        _iterator9.e(err);
      } finally {
        _iterator9.f();
      }

      return _e77;
    }
  }

  function Hi(e, t, n, i, s, r) {
    var o = function (e, t, n, i, s) {
      var r = t._queryIdentifier,
          o = e.views.get(r);

      if (!o) {
        var _e78 = mi(n, s ? i : null),
            _r24 = !1;

        _e78 ? _r24 = !0 : i instanceof _n ? (_e78 = yi(n, i), _r24 = !1) : (_e78 = _n.EMPTY_NODE, _r24 = !1);

        var _o11 = Kn(new Vn(_e78, _r24, !1), new Vn(i, s, !1));

        return new Ai(t, _o11);
      }

      return o;
    }(e, t, i, s, r);

    return e.views.has(t._queryIdentifier) || e.views.set(t._queryIdentifier, o), function (e, t) {
      e.eventRegistrations_.push(t);
    }(o, n), function (e, t) {
      var n = e.viewCache_.eventCache,
          i = [];
      return n.getNode().isLeafNode() || n.getNode().forEachChild(on, function (e, t) {
        i.push(bn(e, t));
      }), n.isFullyInitialized() && i.push(wn(n.getNode())), qi(e, i, n.getNode(), t);
    }(o, n);
  }

  function zi(e) {
    var t = [];

    var _iterator10 = _createForOfIteratorHelper(e.views.values()),
        _step10;

    try {
      for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
        var _n56 = _step10.value;
        _n56.query._queryParams.loadsAllData() || t.push(_n56);
      }
    } catch (err) {
      _iterator10.e(err);
    } finally {
      _iterator10.f();
    }

    return t;
  }

  function Vi(e, t) {
    var n = null;

    var _iterator11 = _createForOfIteratorHelper(e.views.values()),
        _step11;

    try {
      for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
        var _i44 = _step11.value;
        n = n || Oi(_i44, t);
      }
    } catch (err) {
      _iterator11.e(err);
    } finally {
      _iterator11.f();
    }

    return n;
  }

  function $i(e, t) {
    if (t._queryParams.loadsAllData()) return Gi(e);
    {
      var _n57 = t._queryIdentifier;
      return e.views.get(_n57);
    }
  }

  function Yi(e, t) {
    return null != $i(e, t);
  }

  function Ki(e) {
    return null != Gi(e);
  }

  function Gi(e) {
    var _iterator12 = _createForOfIteratorHelper(e.views.values()),
        _step12;

    try {
      for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
        var _t47 = _step12.value;
        if (_t47.query._queryParams.loadsAllData()) return _t47;
      }
    } catch (err) {
      _iterator12.e(err);
    } finally {
      _iterator12.f();
    }

    return null;
  }

  var Qi = 1;

  var Ji = /*#__PURE__*/_createClass(function Ji(e) {
    _classCallCheck(this, Ji);

    this.listenProvider_ = e, this.syncPointTree_ = new ei(null), this.pendingWriteTree_ = {
      visibleWrites: ti.empty(),
      allWrites: [],
      lastWriteId: -1
    }, this.tagToQueryMap = new Map(), this.queryToTagMap = new Map();
  });

  function Xi(t, n, i, s, r) {
    return function (t, n, i, s, r) {
      e(s > t.lastWriteId, "Stacking an older write on top of newer ones"), void 0 === r && (r = !0), t.allWrites.push({
        path: n,
        snap: i,
        writeId: s,
        visible: r
      }), r && (t.visibleWrites = ni(t.visibleWrites, n, i)), t.lastWriteId = s;
    }(t.pendingWriteTree_, n, i, s, r), r ? ss(t, new Hn({
      fromUser: !0,
      fromServer: !1,
      queryId: null,
      tagged: !1
    }, n, i)) : [];
  }

  function Zi(t, n) {
    var i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;

    var s = function (e, t) {
      for (var _n58 = 0; _n58 < e.allWrites.length; _n58++) {
        var _i45 = e.allWrites[_n58];
        if (_i45.writeId === t) return _i45;
      }

      return null;
    }(t.pendingWriteTree_, n);

    if (function (t, n) {
      var i = t.allWrites.findIndex(function (e) {
        return e.writeId === n;
      });
      e(i >= 0, "removeWrite called with nonexistent writeId.");
      var s = t.allWrites[i];
      t.allWrites.splice(i, 1);
      var r = s.visible,
          o = !1,
          a = t.allWrites.length - 1;

      for (; r && a >= 0;) {
        var _e79 = t.allWrites[a];
        _e79.visible && (a >= i && pi(_e79, s.path) ? r = !1 : Mt(s.path, _e79.path) && (o = !0)), a--;
      }

      return !!r && (o ? (function (e) {
        e.visibleWrites = fi(e.allWrites, _i, It()), e.allWrites.length > 0 ? e.lastWriteId = e.allWrites[e.allWrites.length - 1].writeId : e.lastWriteId = -1;
      }(t), !0) : (s.snap ? t.visibleWrites = si(t.visibleWrites, s.path) : Ke(s.children, function (e) {
        t.visibleWrites = si(t.visibleWrites, Rt(s.path, e));
      }), !0));
    }(t.pendingWriteTree_, n)) {
      var _e80 = new ei(null);

      return null != s.snap ? _e80 = _e80.set(It(), !0) : Ke(s.children, function (t) {
        _e80 = _e80.set(new bt(t), !0);
      }), ss(t, new jn(s.path, _e80, i));
    }

    return [];
  }

  function es(e, t, n) {
    return ss(e, new Hn({
      fromUser: !1,
      fromServer: !0,
      queryId: null,
      tagged: !1
    }, t, n));
  }

  function ts(t, n, i, s) {
    var r = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : !1;
    var o = n._path,
        a = t.syncPointTree_.get(o);
    var l = [];

    if (a && ("default" === n._queryIdentifier || Yi(a, n))) {
      var _h8 = function (t, n, i, s) {
        var r = n._queryIdentifier,
            o = [];
        var a = [];
        var l = Ki(t);

        if ("default" === r) {
          var _iterator13 = _createForOfIteratorHelper(t.views.entries()),
              _step13;

          try {
            for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
              var _step13$value = _slicedToArray(_step13.value, 2),
                  _e81 = _step13$value[0],
                  _n59 = _step13$value[1];

              a = a.concat(Li(_n59, i, s)), Mi(_n59) && (t.views["delete"](_e81), _n59.query._queryParams.loadsAllData() || o.push(_n59.query));
            }
          } catch (err) {
            _iterator13.e(err);
          } finally {
            _iterator13.f();
          }
        } else {
          var _e82 = t.views.get(r);

          _e82 && (a = a.concat(Li(_e82, i, s)), Mi(_e82) && (t.views["delete"](r), _e82.query._queryParams.loadsAllData() || o.push(_e82.query)));
        }

        return l && !Ki(t) && o.push(new (e(Wi, "Reference.ts has not been loaded"), Wi)(n._repo, n._path)), {
          removed: o,
          events: a
        };
      }(a, n, i, s);

      0 === a.views.size && (t.syncPointTree_ = t.syncPointTree_.remove(o));
      var _c6 = _h8.removed;

      if (l = _h8.events, !r) {
        var _e83 = -1 !== _c6.findIndex(function (e) {
          return e._queryParams.loadsAllData();
        }),
            _i46 = t.syncPointTree_.findOnPath(o, function (e, t) {
          return Ki(t);
        });

        if (_e83 && !_i46) {
          var _e84 = t.syncPointTree_.subtree(o);

          if (!_e84.isEmpty()) {
            var _n60 = function (e) {
              return e.fold(function (e, t, n) {
                if (t && Ki(t)) return [Gi(t)];
                {
                  var _e85 = [];
                  return t && (_e85 = zi(t)), Ke(n, function (t, n) {
                    _e85 = _e85.concat(n);
                  }), _e85;
                }
              });
            }(_e84);

            for (var _e86 = 0; _e86 < _n60.length; ++_e86) {
              var _i47 = _n60[_e86],
                  _s36 = _i47.query,
                  _r25 = as(t, _i47);

              t.listenProvider_.startListening(ps(_s36), ls(t, _s36), _r25.hashFn, _r25.onComplete);
            }
          }
        }

        if (!_i46 && _c6.length > 0 && !s) if (_e83) {
          var _e87 = null;
          t.listenProvider_.stopListening(ps(n), _e87);
        } else _c6.forEach(function (e) {
          var n = t.queryToTagMap.get(hs(e));
          t.listenProvider_.stopListening(ps(e), n);
        });
      }

      !function (e, t) {
        for (var _n61 = 0; _n61 < t.length; ++_n61) {
          var _i48 = t[_n61];

          if (!_i48._queryParams.loadsAllData()) {
            var _t48 = hs(_i48),
                _n62 = e.queryToTagMap.get(_t48);

            e.queryToTagMap["delete"](_t48), e.tagToQueryMap["delete"](_n62);
          }
        }
      }(t, _c6);
    }

    return l;
  }

  function ns(t, n, i) {
    var s = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !1;
    var r = n._path;
    var o = null,
        a = !1;
    t.syncPointTree_.foreachOnPath(r, function (e, t) {
      var n = Dt(e, r);
      o = o || Vi(t, n), a = a || Ki(t);
    });
    var l,
        h = t.syncPointTree_.get(r);
    h ? (a = a || Ki(h), o = o || Vi(h, It())) : (h = new ji(), t.syncPointTree_ = t.syncPointTree_.set(r, h)), null != o ? l = !0 : (l = !1, o = _n.EMPTY_NODE, t.syncPointTree_.subtree(r).foreachChild(function (e, t) {
      var n = Vi(t, It());
      n && (o = o.updateImmediateChild(e, n));
    }));
    var c = Yi(h, n);

    if (!c && !n._queryParams.loadsAllData()) {
      var _i49 = hs(n);

      e(!t.queryToTagMap.has(_i49), "View does not exist, but we have a tag");

      var _s37 = Qi++;

      t.queryToTagMap.set(_i49, _s37), t.tagToQueryMap.set(_s37, _i49);
    }

    var u = Hi(h, n, i, di(t.pendingWriteTree_, r), o, l);

    if (!c && !a && !s) {
      var _i50 = $i(h, n);

      u = u.concat(function (t, n, i) {
        var s = n._path,
            r = ls(t, n),
            o = as(t, i),
            a = t.listenProvider_.startListening(ps(n), r, o.hashFn, o.onComplete),
            l = t.syncPointTree_.subtree(s);
        if (r) e(!Ki(l.value), "If we're adding a query, it shouldn't be shadowed");else {
          var _e88 = l.fold(function (e, t, n) {
            if (!xt(e) && t && Ki(t)) return [Gi(t).query];
            {
              var _e89 = [];
              return t && (_e89 = _e89.concat(zi(t).map(function (e) {
                return e.query;
              }))), Ke(n, function (t, n) {
                _e89 = _e89.concat(n);
              }), _e89;
            }
          });

          for (var _n63 = 0; _n63 < _e88.length; ++_n63) {
            var _i51 = _e88[_n63];
            t.listenProvider_.stopListening(ps(_i51), ls(t, _i51));
          }
        }
        return a;
      }(t, n, _i50));
    }

    return u;
  }

  function is(e, t, n) {
    var i = e.pendingWriteTree_,
        s = e.syncPointTree_.findOnPath(t, function (e, n) {
      var i = Vi(n, Dt(e, t));
      if (i) return i;
    });
    return gi(i, t, s, n, !0);
  }

  function ss(e, t) {
    return rs(t, e.syncPointTree_, null, di(e.pendingWriteTree_, It()));
  }

  function rs(e, t, n, i) {
    if (xt(e.path)) return os(e, t, n, i);
    {
      var _s38 = t.get(It());

      null == n && null != _s38 && (n = Vi(_s38, It()));
      var _r26 = [];

      var _o12 = Et(e.path),
          _a5 = e.operationForChild(_o12),
          _l11 = t.children.get(_o12);

      if (_l11 && _a5) {
        var _e90 = n ? n.getImmediateChild(_o12) : null,
            _t49 = bi(i, _o12);

        _r26 = _r26.concat(rs(_a5, _l11, _e90, _t49));
      }

      return _s38 && (_r26 = _r26.concat(Bi(_s38, e, i, n))), _r26;
    }
  }

  function os(e, t, n, i) {
    var s = t.get(It());
    null == n && null != s && (n = Vi(s, It()));
    var r = [];
    return t.children.inorderTraversal(function (t, s) {
      var o = n ? n.getImmediateChild(t) : null,
          a = bi(i, t),
          l = e.operationForChild(t);
      l && (r = r.concat(os(l, s, o, a)));
    }), s && (r = r.concat(Bi(s, e, i, n))), r;
  }

  function as(e, t) {
    var n = t.query,
        i = ls(e, n);
    return {
      hashFn: function hashFn() {
        var e = function (e) {
          return e.viewCache_.serverCache.getNode();
        }(t) || _n.EMPTY_NODE;

        return e.hash();
      },
      onComplete: function onComplete(t) {
        if ("ok" === t) return i ? function (e, t, n) {
          var i = cs(e, n);

          if (i) {
            var _n64 = us(i),
                _s39 = _n64.path,
                _r27 = _n64.queryId,
                _o13 = Dt(_s39, t);

            return ds(e, _s39, new Bn(Un(_r27), _o13));
          }

          return [];
        }(e, n._path, i) : function (e, t) {
          return ss(e, new Bn({
            fromUser: !1,
            fromServer: !0,
            queryId: null,
            tagged: !1
          }, t));
        }(e, n._path);
        {
          var _i52 = function (e, t) {
            var n = "Unknown Error";
            "too_big" === e ? n = "The data requested exceeds the maximum size that can be accessed with a single request." : "permission_denied" === e ? n = "Client doesn't have permission to access the desired data." : "unavailable" === e && (n = "The service is unavailable");
            var i = new Error(e + " at " + t._path.toString() + ": " + n);
            return i.code = e.toUpperCase(), i;
          }(t, n);

          return ts(e, n, null, _i52);
        }
      }
    };
  }

  function ls(e, t) {
    var n = hs(t);
    return e.queryToTagMap.get(n);
  }

  function hs(e) {
    return e._path.toString() + "$" + e._queryIdentifier;
  }

  function cs(e, t) {
    return e.tagToQueryMap.get(t);
  }

  function us(t) {
    var n = t.indexOf("$");
    return e(-1 !== n && n < t.length - 1, "Bad queryKey."), {
      queryId: t.substr(n + 1),
      path: new bt(t.substr(0, n))
    };
  }

  function ds(t, n, i) {
    var s = t.syncPointTree_.get(n);
    return e(s, "Missing sync point for query tag that we're tracking"), Bi(s, i, di(t.pendingWriteTree_, n), null);
  }

  function ps(t) {
    return t._queryParams.loadsAllData() && !t._queryParams.isDefault() ? new (e(Ui, "Reference.ts has not been loaded"), Ui)(t._repo, t._path) : t;
  }

  var _s = /*#__PURE__*/function () {
    function _s(e) {
      _classCallCheck(this, _s);

      this.node_ = e;
    }

    _createClass(_s, [{
      key: "getImmediateChild",
      value: function getImmediateChild(e) {
        var t = this.node_.getImmediateChild(e);
        return new _s(t);
      }
    }, {
      key: "node",
      value: function node() {
        return this.node_;
      }
    }]);

    return _s;
  }();

  var fs = /*#__PURE__*/function () {
    function fs(e, t) {
      _classCallCheck(this, fs);

      this.syncTree_ = e, this.path_ = t;
    }

    _createClass(fs, [{
      key: "getImmediateChild",
      value: function getImmediateChild(e) {
        var t = Rt(this.path_, e);
        return new fs(this.syncTree_, t);
      }
    }, {
      key: "node",
      value: function node() {
        return is(this.syncTree_, this.path_);
      }
    }]);

    return fs;
  }();

  var gs = function gs(t, n, i) {
    return t && "object" == _typeof(t) ? (e(".sv" in t, "Unexpected leaf node or priority contents"), "string" == typeof t[".sv"] ? ms(t[".sv"], n, i) : "object" == _typeof(t[".sv"]) ? ys(t[".sv"], n) : void e(!1, "Unexpected server value: " + JSON.stringify(t, null, 2))) : t;
  },
      ms = function ms(t, n, i) {
    if ("timestamp" === t) return i.timestamp;
    e(!1, "Unexpected server value: " + t);
  },
      ys = function ys(t, n, i) {
    t.hasOwnProperty("increment") || e(!1, "Unexpected server value: " + JSON.stringify(t, null, 2));
    var s = t.increment;
    "number" != typeof s && e(!1, "Unexpected increment value: " + s);
    var r = n.node();
    if (e(null != r, "Expected ChildrenNode.EMPTY_NODE for nulls"), !r.isLeafNode()) return s;
    var o = r.getValue();
    return "number" != typeof o ? s : o + s;
  },
      vs = function vs(e, t, n) {
    return Cs(e, new _s(t), n);
  };

  function Cs(e, t, n) {
    var i = e.getPriority().val(),
        s = gs(i, t.getImmediateChild(".priority"), n);
    var r;

    if (e.isLeafNode()) {
      var _i53 = e,
          _r28 = gs(_i53.getValue(), t, n);

      return _r28 !== _i53.getValue() || s !== _i53.getPriority().val() ? new rn(_r28, gn(s)) : e;
    }

    {
      var _i54 = e;
      return r = _i54, s !== _i54.getPriority().val() && (r = r.updatePriority(new rn(s))), _i54.forEachChild(on, function (e, i) {
        var s = Cs(i, t.getImmediateChild(e), n);
        s !== i && (r = r.updateImmediateChild(e, s));
      }), r;
    }
  }

  var ws = /*#__PURE__*/_createClass(function ws() {
    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
      children: {},
      childCount: 0
    };

    _classCallCheck(this, ws);

    this.name = e, this.parent = t, this.node = n;
  });

  function bs(e, t) {
    var n = t instanceof bt ? t : new bt(t),
        i = e,
        s = Et(n);

    for (; null !== s;) {
      var _e91 = y(i.node.children, s) || {
        children: {},
        childCount: 0
      };

      i = new ws(s, i, _e91), n = St(n), s = Et(n);
    }

    return i;
  }

  function Is(e) {
    return e.node.value;
  }

  function Es(e, t) {
    e.node.value = t, Ps(e);
  }

  function Ts(e) {
    return e.node.childCount > 0;
  }

  function Ss(e, t) {
    Ke(e.node.children, function (n, i) {
      t(new ws(n, e, i));
    });
  }

  function ks(e, t, n, i) {
    n && !i && t(e), Ss(e, function (e) {
      ks(e, t, !0, i);
    }), n && i && t(e);
  }

  function Ns(e) {
    return new bt(null === e.parent ? e.name : Ns(e.parent) + "/" + e.name);
  }

  function Ps(e) {
    null !== e.parent && function (e, t, n) {
      var i = function (e) {
        return void 0 === Is(e) && !Ts(e);
      }(n),
          s = m(e.node.children, t);

      i && s ? (delete e.node.children[t], e.node.childCount--, Ps(e)) : i || s || (e.node.children[t] = n.node, e.node.childCount++, Ps(e));
    }(e.parent, e.name, e);
  }

  var Rs = /[\[\].#$\/\u0000-\u001F\u007F]/,
      xs = /[\[\].#$\u0000-\u001F\u007F]/,
      Ds = 10485760,
      As = function As(e) {
    return "string" == typeof e && 0 !== e.length && !Rs.test(e);
  },
      Os = function Os(e) {
    return "string" == typeof e && 0 !== e.length && !xs.test(e);
  },
      Ms = function Ms(e) {
    return null === e || "string" == typeof e || "number" == typeof e && !Ue(e) || e && "object" == _typeof(e) && m(e, ".sv");
  },
      Ls = function Ls(e, t, n, i) {
    i && void 0 === t || Fs(E(e, "value"), t, n);
  },
      Fs = function Fs(e, t, n) {
    var i = n instanceof bt ? new Lt(n, e) : n;
    if (void 0 === t) throw new Error(e + "contains undefined " + qt(i));
    if ("function" == typeof t) throw new Error(e + "contains a function " + qt(i) + " with contents = " + t.toString());
    if (Ue(t)) throw new Error(e + "contains " + t.toString() + " " + qt(i));
    if ("string" == typeof t && t.length > Ds / 3 && T(t) > Ds) throw new Error(e + "contains a string greater than 10485760 utf8 bytes " + qt(i) + " ('" + t.substring(0, 50) + "...')");

    if (t && "object" == _typeof(t)) {
      var _n65 = !1,
          _s40 = !1;

      if (Ke(t, function (t, r) {
        if (".value" === t) _n65 = !0;else if (".priority" !== t && ".sv" !== t && (_s40 = !0, !As(t))) throw new Error(e + " contains an invalid key (" + t + ") " + qt(i) + '.  Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');
        !function (e, t) {
          e.parts_.length > 0 && (e.byteLength_ += 1), e.parts_.push(t), e.byteLength_ += T(t), Ft(e);
        }(i, t), Fs(e, r, i), function (e) {
          var t = e.parts_.pop();
          e.byteLength_ -= T(t), e.parts_.length > 0 && (e.byteLength_ -= 1);
        }(i);
      }), _n65 && _s40) throw new Error(e + ' contains ".value" child ' + qt(i) + " in addition to actual children.");
    }
  },
      qs = function qs(e, t, n, i) {
    if (!(i && void 0 === n || Os(n))) throw new Error(E(e, t) + 'was an invalid path = "' + n + '". Paths must be non-empty strings and can\'t contain ".", "#", "$", "[", or "]"');
  },
      Ws = function Ws(e, t) {
    if (".info" === Et(t)) throw new Error(e + " failed = Can't modify data under /.info/");
  };

  var Us = /*#__PURE__*/_createClass(function Us() {
    _classCallCheck(this, Us);

    this.eventLists_ = [], this.recursionDepth_ = 0;
  });

  function js(e, t) {
    var n = null;

    for (var _i55 = 0; _i55 < t.length; _i55++) {
      var _s41 = t[_i55],
          _r29 = _s41.getPath();

      null === n || Ot(_r29, n.path) || (e.eventLists_.push(n), n = null), null === n && (n = {
        events: [],
        path: _r29
      }), n.events.push(_s41);
    }

    n && e.eventLists_.push(n);
  }

  function Bs(e, t, n) {
    js(e, n), zs(e, function (e) {
      return Ot(e, t);
    });
  }

  function Hs(e, t, n) {
    js(e, n), zs(e, function (e) {
      return Mt(e, t) || Mt(t, e);
    });
  }

  function zs(e, t) {
    e.recursionDepth_++;
    var n = !0;

    for (var _i56 = 0; _i56 < e.eventLists_.length; _i56++) {
      var _s42 = e.eventLists_[_i56];
      _s42 && (t(_s42.path) ? (Vs(e.eventLists_[_i56]), e.eventLists_[_i56] = null) : n = !1);
    }

    n && (e.eventLists_ = []), e.recursionDepth_--;
  }

  function Vs(e) {
    for (var _t50 = 0; _t50 < e.events.length; _t50++) {
      var _n66 = e.events[_t50];

      if (null !== _n66) {
        e.events[_t50] = null;

        var _i57 = _n66.getEventRunner();

        Ae && Me("event: " + _n66.toString()), Xe(_i57);
      }
    }
  }

  var $s = /*#__PURE__*/function () {
    function $s(e, t, n, i) {
      _classCallCheck(this, $s);

      this.repoInfo_ = e, this.forceRestClient_ = t, this.authTokenProvider_ = n, this.appCheckProvider_ = i, this.dataUpdateCount = 0, this.statsListener_ = null, this.eventQueue_ = new Us(), this.nextWriteId_ = 1, this.interceptServerDataCallback_ = null, this.onDisconnect_ = An(), this.transactionQueueTree_ = new ws(), this.persistentConnection_ = null, this.key = this.repoInfo_.toURLString();
    }

    _createClass($s, [{
      key: "toString",
      value: function toString() {
        return (this.repoInfo_.secure ? "https://" : "http://") + this.repoInfo_.host;
      }
    }]);

    return $s;
  }();

  function Ys(e, t, n) {
    if (e.stats_ = ut(e.repoInfo_), e.forceRestClient_ || ("object" == (typeof window === "undefined" ? "undefined" : _typeof(window)) && window.navigator && window.navigator.userAgent || "").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i) >= 0) e.server_ = new xn(e.repoInfo_, function (t, n, i, s) {
      Qs(e, t, n, i, s);
    }, e.authTokenProvider_, e.appCheckProvider_), setTimeout(function () {
      return Js(e, !0);
    }, 0);else {
      if (null != n) {
        if ("object" != _typeof(n)) throw new Error("Only objects are supported for option databaseAuthVariableOverride");

        try {
          f(n);
        } catch (e) {
          throw new Error("Invalid authOverride provided: " + e);
        }
      }

      e.persistentConnection_ = new jt(e.repoInfo_, t, function (t, n, i, s) {
        Qs(e, t, n, i, s);
      }, function (t) {
        Js(e, t);
      }, function (t) {
        !function (e, t) {
          Ke(t, function (t, n) {
            Xs(e, t, n);
          });
        }(e, t);
      }, e.authTokenProvider_, e.appCheckProvider_, n), e.server_ = e.persistentConnection_;
    }
    e.authTokenProvider_.addTokenChangeListener(function (t) {
      e.server_.refreshAuthToken(t);
    }), e.appCheckProvider_.addTokenChangeListener(function (t) {
      e.server_.refreshAppCheckToken(t.token);
    }), e.statsReporter_ = function (t, n) {
      var i = t.toString();
      return ct[i] || (ct[i] = new qn(e.stats_, e.server_)), ct[i];
    }(e.repoInfo_), e.infoData_ = new Dn(), e.infoSyncTree_ = new Ji({
      startListening: function startListening(t, n, i, s) {
        var r = [];
        var o = e.infoData_.getNode(t._path);
        return o.isEmpty() || (r = es(e.infoSyncTree_, t._path, o), setTimeout(function () {
          s("ok");
        }, 0)), r;
      },
      stopListening: function stopListening() {}
    }), Xs(e, "connected", !1), e.serverSyncTree_ = new Ji({
      startListening: function startListening(t, n, i, s) {
        return e.server_.listen(t, i, n, function (n, i) {
          var r = s(n, i);
          Hs(e.eventQueue_, t._path, r);
        }), [];
      },
      stopListening: function stopListening(t, n) {
        e.server_.unlisten(t, n);
      }
    });
  }

  function Ks(e) {
    var t = e.infoData_.getNode(new bt(".info/serverTimeOffset")).val() || 0;
    return new Date().getTime() + t;
  }

  function Gs(e) {
    return (t = (t = {
      timestamp: Ks(e)
    }) || {}).timestamp = t.timestamp || new Date().getTime(), t;
    var t;
  }

  function Qs(e, t, n, i, s) {
    e.dataUpdateCount++;
    var r = new bt(t);
    n = e.interceptServerDataCallback_ ? e.interceptServerDataCallback_(t, n) : n;
    var o = [];
    if (s) {
      if (i) {
        var _t51 = C(n, function (e) {
          return gn(e);
        });

        o = function (e, t, n, i) {
          var s = cs(e, i);

          if (s) {
            var _i58 = us(s),
                _r30 = _i58.path,
                _o14 = _i58.queryId,
                _a6 = Dt(_r30, t),
                _l12 = ei.fromObject(n);

            return ds(e, _r30, new zn(Un(_o14), _a6, _l12));
          }

          return [];
        }(e.serverSyncTree_, r, _t51, s);
      } else {
        var _t52 = gn(n);

        o = function (e, t, n, i) {
          var s = cs(e, i);

          if (null != s) {
            var _i59 = us(s),
                _r31 = _i59.path,
                _o15 = _i59.queryId,
                _a7 = Dt(_r31, t);

            return ds(e, _r31, new Hn(Un(_o15), _a7, n));
          }

          return [];
        }(e.serverSyncTree_, r, _t52, s);
      }
    } else if (i) {
      var _t53 = C(n, function (e) {
        return gn(e);
      });

      o = function (e, t, n) {
        var i = ei.fromObject(n);
        return ss(e, new zn({
          fromUser: !1,
          fromServer: !0,
          queryId: null,
          tagged: !1
        }, t, i));
      }(e.serverSyncTree_, r, _t53);
    } else {
      var _t54 = gn(n);

      o = es(e.serverSyncTree_, r, _t54);
    }
    var a = r;
    o.length > 0 && (a = ar(e, r)), Hs(e.eventQueue_, a, o);
  }

  function Js(e, t) {
    Xs(e, "connected", t), !1 === t && function (e) {
      ir(e, "onDisconnectEvents");
      var t = Gs(e),
          n = An();
      Ln(e.onDisconnect_, It(), function (i, s) {
        var r = function (e, t, n, i) {
          return Cs(t, new fs(n, e), i);
        }(i, s, e.serverSyncTree_, t);

        On(n, i, r);
      });
      var i = [];
      Ln(n, It(), function (t, n) {
        i = i.concat(es(e.serverSyncTree_, t, n));
        var s = dr(e, t);
        ar(e, s);
      }), e.onDisconnect_ = An(), Hs(e.eventQueue_, It(), i);
    }(e);
  }

  function Xs(e, t, n) {
    var i = new bt("/.info/" + t),
        s = gn(n);
    e.infoData_.updateSnapshot(i, s);
    var r = es(e.infoSyncTree_, i, s);
    Hs(e.eventQueue_, i, r);
  }

  function Zs(e) {
    return e.nextWriteId_++;
  }

  function er(e, t, n) {
    e.server_.onDisconnectCancel(t.toString(), function (i, s) {
      "ok" === i && Mn(e.onDisconnect_, t), sr(0, n, i, s);
    });
  }

  function tr(e, t, n, i) {
    var s = gn(n);
    e.server_.onDisconnectPut(t.toString(), s.val(!0), function (n, r) {
      "ok" === n && On(e.onDisconnect_, t, s), sr(0, i, n, r);
    });
  }

  function nr(e, t, n) {
    var i;
    i = ".info" === Et(t._path) ? ts(e.infoSyncTree_, t, n) : ts(e.serverSyncTree_, t, n), Bs(e.eventQueue_, t._path, i);
  }

  function ir(e) {
    var n = "";

    for (var _len16 = arguments.length, t = new Array(_len16 > 1 ? _len16 - 1 : 0), _key16 = 1; _key16 < _len16; _key16++) {
      t[_key16 - 1] = arguments[_key16];
    }

    e.persistentConnection_ && (n = e.persistentConnection_.id + ":"), Me.apply(void 0, [n].concat(t));
  }

  function sr(e, t, n, i) {
    t && Xe(function () {
      if ("ok" === n) t(null);else {
        var _e92 = (n || "error").toUpperCase();

        var _s43 = _e92;
        i && (_s43 += ": " + i);

        var _r32 = new Error(_s43);

        _r32.code = _e92, t(_r32);
      }
    });
  }

  function rr(e, t, n) {
    return is(e.serverSyncTree_, t, n) || _n.EMPTY_NODE;
  }

  function or(t) {
    var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : t.transactionQueueTree_;

    if (n || ur(t, n), Is(n)) {
      var _i60 = hr(t, n);

      e(_i60.length > 0, "Sending zero length transaction queue"), _i60.every(function (e) {
        return 0 === e.status;
      }) && function (t, n, i) {
        var s = i.map(function (e) {
          return e.currentWriteId;
        }),
            r = rr(t, n, s);
        var o = r;
        var a = r.hash();

        for (var _t55 = 0; _t55 < i.length; _t55++) {
          var _s44 = i[_t55];
          e(0 === _s44.status, "tryToSendTransactionQueue_: items in queue should all be run."), _s44.status = 1, _s44.retryCount++;

          var _r33 = Dt(n, _s44.path);

          o = o.updateChild(_r33, _s44.currentOutputSnapshotRaw);
        }

        var l = o.val(!0),
            h = n;
        t.server_.put(h.toString(), l, function (e) {
          ir(t, "transaction put response", {
            path: h.toString(),
            status: e
          });
          var s = [];

          if ("ok" === e) {
            var _e93 = [];

            var _loop5 = function _loop5(_n67) {
              i[_n67].status = 2, s = s.concat(Zi(t.serverSyncTree_, i[_n67].currentWriteId)), i[_n67].onComplete && _e93.push(function () {
                return i[_n67].onComplete(null, !0, i[_n67].currentOutputSnapshotResolved);
              }), i[_n67].unwatcher();
            };

            for (var _n67 = 0; _n67 < i.length; _n67++) {
              _loop5(_n67);
            }

            ur(t, bs(t.transactionQueueTree_, n)), or(t, t.transactionQueueTree_), Hs(t.eventQueue_, n, s);

            for (var _t56 = 0; _t56 < _e93.length; _t56++) {
              Xe(_e93[_t56]);
            }
          } else {
            if ("datastale" === e) for (var _e94 = 0; _e94 < i.length; _e94++) {
              3 === i[_e94].status ? i[_e94].status = 4 : i[_e94].status = 0;
            } else {
              We("transaction at " + h.toString() + " failed: " + e);

              for (var _t57 = 0; _t57 < i.length; _t57++) {
                i[_t57].status = 4, i[_t57].abortReason = e;
              }
            }
            ar(t, n);
          }
        }, a);
      }(t, Ns(n), _i60);
    } else Ts(n) && Ss(n, function (e) {
      or(t, e);
    });
  }

  function ar(t, n) {
    var i = lr(t, n),
        s = Ns(i);
    return function (t, n, i) {
      if (0 === n.length) return;
      var s = [];
      var r = [];
      var o = n.filter(function (e) {
        return 0 === e.status;
      }).map(function (e) {
        return e.currentWriteId;
      });

      var _loop6 = function _loop6(_l13) {
        var h = n[_l13],
            c = Dt(i, h.path);
        var u = void 0,
            d = !1;
        if (e(null !== c, "rerunTransactionsUnderNode_: relativePath should not be null."), 4 === h.status) d = !0, u = h.abortReason, r = r.concat(Zi(t.serverSyncTree_, h.currentWriteId, !0));else if (0 === h.status) if (h.retryCount >= 25) d = !0, u = "maxretry", r = r.concat(Zi(t.serverSyncTree_, h.currentWriteId, !0));else {
          var _e96 = rr(t, h.path, o);

          h.currentInputSnapshot = _e96;

          var _i61 = n[_l13].update(_e96.val());

          if (void 0 !== _i61) {
            Fs("transaction failed: Data returned ", _i61, h.path);

            var _n68 = gn(_i61);

            "object" == _typeof(_i61) && null != _i61 && m(_i61, ".priority") || (_n68 = _n68.updatePriority(_e96.getPriority()));

            var _s45 = h.currentWriteId,
                _a8 = Gs(t),
                _l14 = vs(_n68, _e96, _a8);

            h.currentOutputSnapshotRaw = _n68, h.currentOutputSnapshotResolved = _l14, h.currentWriteId = Zs(t), o.splice(o.indexOf(_s45), 1), r = r.concat(Xi(t.serverSyncTree_, h.path, _l14, h.currentWriteId, h.applyLocally)), r = r.concat(Zi(t.serverSyncTree_, _s45, !0));
          } else d = !0, u = "nodata", r = r.concat(Zi(t.serverSyncTree_, h.currentWriteId, !0));
        }
        Hs(t.eventQueue_, i, r), r = [], d && (n[_l13].status = 2, a = n[_l13].unwatcher, setTimeout(a, Math.floor(0)), n[_l13].onComplete && ("nodata" === u ? s.push(function () {
          return n[_l13].onComplete(null, !1, n[_l13].currentInputSnapshot);
        }) : s.push(function () {
          return n[_l13].onComplete(new Error(u), !1, null);
        })));
      };

      for (var _l13 = 0; _l13 < n.length; _l13++) {
        _loop6(_l13);
      }

      var a;
      ur(t, t.transactionQueueTree_);

      for (var _e95 = 0; _e95 < s.length; _e95++) {
        Xe(s[_e95]);
      }

      or(t, t.transactionQueueTree_);
    }(t, hr(t, i), s), s;
  }

  function lr(e, t) {
    var n,
        i = e.transactionQueueTree_;

    for (n = Et(t); null !== n && void 0 === Is(i);) {
      i = bs(i, n), n = Et(t = St(t));
    }

    return i;
  }

  function hr(e, t) {
    var n = [];
    return cr(e, t, n), n.sort(function (e, t) {
      return e.order - t.order;
    }), n;
  }

  function cr(e, t, n) {
    var i = Is(t);
    if (i) for (var _e97 = 0; _e97 < i.length; _e97++) {
      n.push(i[_e97]);
    }
    Ss(t, function (t) {
      cr(e, t, n);
    });
  }

  function ur(e, t) {
    var n = Is(t);

    if (n) {
      var _e98 = 0;

      for (var _t58 = 0; _t58 < n.length; _t58++) {
        2 !== n[_t58].status && (n[_e98] = n[_t58], _e98++);
      }

      n.length = _e98, Es(t, n.length > 0 ? n : void 0);
    }

    Ss(t, function (t) {
      ur(e, t);
    });
  }

  function dr(e, t) {
    var n = Ns(lr(e, t)),
        i = bs(e.transactionQueueTree_, t);
    return function (e, t, n) {
      var i = e.parent;

      for (; null !== i;) {
        if (t(i)) return !0;
        i = i.parent;
      }
    }(i, function (t) {
      pr(e, t);
    }), pr(e, i), ks(i, function (t) {
      pr(e, t);
    }), n;
  }

  function pr(t, n) {
    var i = Is(n);

    if (i) {
      var _s46 = [];

      var _r34 = [],
          _o16 = -1;

      for (var _n69 = 0; _n69 < i.length; _n69++) {
        3 === i[_n69].status || (1 === i[_n69].status ? (e(_o16 === _n69 - 1, "All SENT items should be at beginning of queue."), _o16 = _n69, i[_n69].status = 3, i[_n69].abortReason = "set") : (e(0 === i[_n69].status, "Unexpected transaction status in abort"), i[_n69].unwatcher(), _r34 = _r34.concat(Zi(t.serverSyncTree_, i[_n69].currentWriteId, !0)), i[_n69].onComplete && _s46.push(i[_n69].onComplete.bind(null, new Error("set"), !1, null))));
      }

      -1 === _o16 ? Es(n, void 0) : i.length = _o16 + 1, Hs(t.eventQueue_, Ns(n), _r34);

      for (var _e99 = 0; _e99 < _s46.length; _e99++) {
        Xe(_s46[_e99]);
      }
    }
  }

  var _r = function _r(e, t) {
    var n = fr(e),
        i = n.namespace;
    "firebase.com" === n.domain && qe(n.host + " is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"), i && "undefined" !== i || "localhost" === n.domain || qe("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"), n.secure || "undefined" != typeof window && window.location && window.location.protocol && -1 !== window.location.protocol.indexOf("https:") && We("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().");
    var s = "ws" === n.scheme || "wss" === n.scheme;
    return {
      repoInfo: new ot(n.host, n.secure, i, s, t, "", i !== n.subdomain),
      path: new bt(n.pathString)
    };
  },
      fr = function fr(e) {
    var t = "",
        n = "",
        i = "",
        s = "",
        r = "",
        o = !0,
        a = "https",
        l = 443;

    if ("string" == typeof e) {
      var _h9 = e.indexOf("//");

      _h9 >= 0 && (a = e.substring(0, _h9 - 1), e = e.substring(_h9 + 2));

      var _c7 = e.indexOf("/");

      -1 === _c7 && (_c7 = e.length);

      var _u5 = e.indexOf("?");

      -1 === _u5 && (_u5 = e.length), t = e.substring(0, Math.min(_c7, _u5)), _c7 < _u5 && (s = function (e) {
        var t = "";
        var n = e.split("/");

        for (var _e100 = 0; _e100 < n.length; _e100++) {
          if (n[_e100].length > 0) {
            var _i62 = n[_e100];

            try {
              _i62 = decodeURIComponent(_i62.replace(/\+/g, " "));
            } catch (e) {}

            t += "/" + _i62;
          }
        }

        return t;
      }(e.substring(_c7, _u5)));

      var _d2 = function (e) {
        var t = {};
        "?" === e.charAt(0) && (e = e.substring(1));

        var _iterator14 = _createForOfIteratorHelper(e.split("&")),
            _step14;

        try {
          for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
            var _n70 = _step14.value;
            if (0 === _n70.length) continue;

            var _i63 = _n70.split("=");

            2 === _i63.length ? t[decodeURIComponent(_i63[0])] = decodeURIComponent(_i63[1]) : We("Invalid query segment '".concat(_n70, "' in query '").concat(e, "'"));
          }
        } catch (err) {
          _iterator14.e(err);
        } finally {
          _iterator14.f();
        }

        return t;
      }(e.substring(Math.min(e.length, _u5)));

      _h9 = t.indexOf(":"), _h9 >= 0 ? (o = "https" === a || "wss" === a, l = parseInt(t.substring(_h9 + 1), 10)) : _h9 = t.length;

      var _p = t.slice(0, _h9);

      if ("localhost" === _p.toLowerCase()) n = "localhost";else if (_p.split(".").length <= 2) n = _p;else {
        var _e101 = t.indexOf(".");

        i = t.substring(0, _e101).toLowerCase(), n = t.substring(_e101 + 1), r = i;
      }
      "ns" in _d2 && (r = _d2.ns);
    }

    return {
      host: t,
      port: l,
      domain: n,
      subdomain: i,
      secure: o,
      scheme: a,
      pathString: s,
      namespace: r
    };
  };

  var gr = /*#__PURE__*/function () {
    function gr(e, t, n, i) {
      _classCallCheck(this, gr);

      this.eventType = e, this.eventRegistration = t, this.snapshot = n, this.prevName = i;
    }

    _createClass(gr, [{
      key: "getPath",
      value: function getPath() {
        var e = this.snapshot.ref;
        return "value" === this.eventType ? e._path : e.parent._path;
      }
    }, {
      key: "getEventType",
      value: function getEventType() {
        return this.eventType;
      }
    }, {
      key: "getEventRunner",
      value: function getEventRunner() {
        return this.eventRegistration.getEventRunner(this);
      }
    }, {
      key: "toString",
      value: function toString() {
        return this.getPath().toString() + ":" + this.eventType + ":" + f(this.snapshot.exportVal());
      }
    }]);

    return gr;
  }();

  var mr = /*#__PURE__*/function () {
    function mr(e, t, n) {
      _classCallCheck(this, mr);

      this.eventRegistration = e, this.error = t, this.path = n;
    }

    _createClass(mr, [{
      key: "getPath",
      value: function getPath() {
        return this.path;
      }
    }, {
      key: "getEventType",
      value: function getEventType() {
        return "cancel";
      }
    }, {
      key: "getEventRunner",
      value: function getEventRunner() {
        return this.eventRegistration.getEventRunner(this);
      }
    }, {
      key: "toString",
      value: function toString() {
        return this.path.toString() + ":cancel";
      }
    }]);

    return mr;
  }();

  var yr = /*#__PURE__*/function () {
    function yr(e, t) {
      _classCallCheck(this, yr);

      this.snapshotCallback = e, this.cancelCallback = t;
    }

    _createClass(yr, [{
      key: "onValue",
      value: function onValue(e, t) {
        this.snapshotCallback.call(null, e, t);
      }
    }, {
      key: "onCancel",
      value: function onCancel(t) {
        return e(this.hasCancelCallback, "Raising a cancel event on a listener with no cancel callback"), this.cancelCallback.call(null, t);
      }
    }, {
      key: "hasCancelCallback",
      get: function get() {
        return !!this.cancelCallback;
      }
    }, {
      key: "matches",
      value: function matches(e) {
        return this.snapshotCallback === e.snapshotCallback || void 0 !== this.snapshotCallback.userCallback && this.snapshotCallback.userCallback === e.snapshotCallback.userCallback && this.snapshotCallback.context === e.snapshotCallback.context;
      }
    }]);

    return yr;
  }();

  var vr = /*#__PURE__*/function () {
    function vr(e, t) {
      _classCallCheck(this, vr);

      this._repo = e, this._path = t;
    }

    _createClass(vr, [{
      key: "cancel",
      value: function cancel() {
        var e = new h();
        return er(this._repo, this._path, e.wrapCallback(function () {})), e.promise;
      }
    }, {
      key: "remove",
      value: function remove() {
        Ws("OnDisconnect.remove", this._path);
        var e = new h();
        return tr(this._repo, this._path, null, e.wrapCallback(function () {})), e.promise;
      }
    }, {
      key: "set",
      value: function set(e) {
        Ws("OnDisconnect.set", this._path), Ls("OnDisconnect.set", e, this._path, !1);
        var t = new h();
        return tr(this._repo, this._path, e, t.wrapCallback(function () {})), t.promise;
      }
    }, {
      key: "setWithPriority",
      value: function setWithPriority(e, t) {
        Ws("OnDisconnect.setWithPriority", this._path), Ls("OnDisconnect.setWithPriority", e, this._path, !1), function (e, t, n) {
          if (!n || void 0 !== t) {
            if (Ue(t)) throw new Error(E(e, "priority") + "is " + t.toString() + ", but must be a valid Firebase priority (a string, finite number, server value, or null).");
            if (!Ms(t)) throw new Error(E(e, "priority") + "must be a valid Firebase priority (a string, finite number, server value, or null).");
          }
        }("OnDisconnect.setWithPriority", t, !1);
        var n = new h();
        return function (e, t, n, i, s) {
          var r = gn(n, i);
          e.server_.onDisconnectPut(t.toString(), r.val(!0), function (n, i) {
            "ok" === n && On(e.onDisconnect_, t, r), sr(0, s, n, i);
          });
        }(this._repo, this._path, e, t, n.wrapCallback(function () {})), n.promise;
      }
    }, {
      key: "update",
      value: function update(e) {
        Ws("OnDisconnect.update", this._path), function (e, t, n, i) {
          if (i && void 0 === t) return;
          var s = E(e, "values");
          if (!t || "object" != _typeof(t) || Array.isArray(t)) throw new Error(s + " must be an object containing the children to replace.");
          var r = [];
          Ke(t, function (e, t) {
            var i = new bt(e);
            if (Fs(s, t, Rt(n, i)), ".priority" === kt(i) && !Ms(t)) throw new Error(s + "contains an invalid value for '" + i.toString() + "', which must be a valid Firebase priority (a string, finite number, server value, or null).");
            r.push(i);
          }), function (e, t) {
            var n, i;

            for (n = 0; n < t.length; n++) {
              i = t[n];

              var _s47 = Nt(i);

              for (var _t59 = 0; _t59 < _s47.length; _t59++) {
                if (".priority" === _s47[_t59] && _t59 === _s47.length - 1) ;else if (!As(_s47[_t59])) throw new Error(e + "contains an invalid key (" + _s47[_t59] + ") in path " + i.toString() + '. Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');
              }
            }

            t.sort(At);
            var s = null;

            for (n = 0; n < t.length; n++) {
              if (i = t[n], null !== s && Mt(s, i)) throw new Error(e + "contains a path " + s.toString() + " that is ancestor of another path " + i.toString());
              s = i;
            }
          }(s, r);
        }("OnDisconnect.update", e, this._path, !1);
        var t = new h();
        return function (e, t, n, i) {
          if (v(n)) return Me("onDisconnect().update() called with empty data.  Don't do anything."), void sr(0, i, "ok", void 0);
          e.server_.onDisconnectMerge(t.toString(), n, function (s, r) {
            "ok" === s && Ke(n, function (n, i) {
              var s = gn(i);
              On(e.onDisconnect_, Rt(t, n), s);
            }), sr(0, i, s, r);
          });
        }(this._repo, this._path, e, t.wrapCallback(function () {})), t.promise;
      }
    }]);

    return vr;
  }();

  var Cr = /*#__PURE__*/function () {
    function Cr(e, t, n, i) {
      _classCallCheck(this, Cr);

      this._repo = e, this._path = t, this._queryParams = n, this._orderByCalled = i;
    }

    _createClass(Cr, [{
      key: "key",
      get: function get() {
        return xt(this._path) ? null : kt(this._path);
      }
    }, {
      key: "ref",
      get: function get() {
        return new wr(this._repo, this._path);
      }
    }, {
      key: "_queryIdentifier",
      get: function get() {
        var e = Rn(this._queryParams),
            t = $e(e);
        return "{}" === t ? "default" : t;
      }
    }, {
      key: "_queryObject",
      get: function get() {
        return Rn(this._queryParams);
      }
    }, {
      key: "isEqual",
      value: function isEqual(e) {
        if (!((e = S(e)) instanceof Cr)) return !1;
        var t = this._repo === e._repo,
            n = Ot(this._path, e._path),
            i = this._queryIdentifier === e._queryIdentifier;
        return t && n && i;
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return this.toString();
      }
    }, {
      key: "toString",
      value: function toString() {
        return this._repo.toString() + function (e) {
          var t = "";

          for (var _n71 = e.pieceNum_; _n71 < e.pieces_.length; _n71++) {
            "" !== e.pieces_[_n71] && (t += "/" + encodeURIComponent(String(e.pieces_[_n71])));
          }

          return t || "/";
        }(this._path);
      }
    }]);

    return Cr;
  }();

  var wr = /*#__PURE__*/function (_Cr) {
    _inherits(wr, _Cr);

    var _super11 = _createSuper(wr);

    function wr(e, t) {
      _classCallCheck(this, wr);

      return _super11.call(this, e, t, new Nn(), !1);
    }

    _createClass(wr, [{
      key: "parent",
      get: function get() {
        var e = Pt(this._path);
        return null === e ? null : new wr(this._repo, e);
      }
    }, {
      key: "root",
      get: function get() {
        var e = this;

        for (; null !== e.parent;) {
          e = e.parent;
        }

        return e;
      }
    }]);

    return wr;
  }(Cr);

  var br = /*#__PURE__*/function () {
    function br(e, t, n) {
      _classCallCheck(this, br);

      this._node = e, this.ref = t, this._index = n;
    }

    _createClass(br, [{
      key: "priority",
      get: function get() {
        return this._node.getPriority().val();
      }
    }, {
      key: "key",
      get: function get() {
        return this.ref.key;
      }
    }, {
      key: "size",
      get: function get() {
        return this._node.numChildren();
      }
    }, {
      key: "child",
      value: function child(e) {
        var t = new bt(e),
            n = Er(this.ref, e);
        return new br(this._node.getChild(t), n, on);
      }
    }, {
      key: "exists",
      value: function exists() {
        return !this._node.isEmpty();
      }
    }, {
      key: "exportVal",
      value: function exportVal() {
        return this._node.val(!0);
      }
    }, {
      key: "forEach",
      value: function forEach(e) {
        var _this41 = this;

        return !this._node.isLeafNode() && !!this._node.forEachChild(this._index, function (t, n) {
          return e(new br(n, Er(_this41.ref, t), on));
        });
      }
    }, {
      key: "hasChild",
      value: function hasChild(e) {
        var t = new bt(e);
        return !this._node.getChild(t).isEmpty();
      }
    }, {
      key: "hasChildren",
      value: function hasChildren() {
        return !this._node.isLeafNode() && !this._node.isEmpty();
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return this.exportVal();
      }
    }, {
      key: "val",
      value: function val() {
        return this._node.val();
      }
    }]);

    return br;
  }();

  function Ir(e, t) {
    return (e = S(e))._checkNotDeleted("ref"), void 0 !== t ? Er(e._root, t) : e._root;
  }

  function Er(e, t) {
    var n;
    return null === Et((e = S(e))._path) ? ("child", "path", !1, (n = t) && (n = n.replace(/^\/*\.info(\/|$)/, "/")), qs("child", "path", n, false)) : qs("child", "path", t, !1), new wr(e._repo, Rt(e._path, t));
  }

  function Tr(e) {
    return e = S(e), new vr(e._repo, e._path);
  }

  function Sr(e, t) {
    e = S(e), Ws("push", e._path), Ls("push", t, e._path, !0);
    var n = Ks(e._repo),
        i = Cn(n),
        s = Er(e, i),
        r = Er(e, i);
    var o;
    return o = null != t ? kr(r, t).then(function () {
      return r;
    }) : Promise.resolve(r), s.then = o.then.bind(o), s["catch"] = o.then.bind(o, void 0), s;
  }

  function kr(e, t) {
    e = S(e), Ws("set", e._path), Ls("set", t, e._path, !1);
    var n = new h();
    return function (e, t, n, i, s) {
      ir(e, "set", {
        path: t.toString(),
        value: n,
        priority: i
      });
      var r = Gs(e),
          o = gn(n, i),
          a = is(e.serverSyncTree_, t),
          l = vs(o, a, r),
          h = Zs(e),
          c = Xi(e.serverSyncTree_, t, l, h, !0);
      js(e.eventQueue_, c), e.server_.put(t.toString(), o.val(!0), function (n, i) {
        var r = "ok" === n;
        r || We("set at " + t + " failed: " + n);
        var o = Zi(e.serverSyncTree_, h, !r);
        Hs(e.eventQueue_, t, o), sr(0, s, n, i);
      });
      var u = dr(e, t);
      ar(e, u), Hs(e.eventQueue_, u, []);
    }(e._repo, e._path, t, null, n.wrapCallback(function () {})), n.promise;
  }

  var Nr = /*#__PURE__*/function () {
    function Nr(e) {
      _classCallCheck(this, Nr);

      this.callbackContext = e;
    }

    _createClass(Nr, [{
      key: "respondsTo",
      value: function respondsTo(e) {
        return "value" === e;
      }
    }, {
      key: "createEvent",
      value: function createEvent(e, t) {
        var n = t._queryParams.getIndex();

        return new gr("value", this, new br(e.snapshotNode, new wr(t._repo, t._path), n));
      }
    }, {
      key: "getEventRunner",
      value: function getEventRunner(e) {
        var _this42 = this;

        return "cancel" === e.getEventType() ? function () {
          return _this42.callbackContext.onCancel(e.error);
        } : function () {
          return _this42.callbackContext.onValue(e.snapshot, null);
        };
      }
    }, {
      key: "createCancelEvent",
      value: function createCancelEvent(e, t) {
        return this.callbackContext.hasCancelCallback ? new mr(this, e, t) : null;
      }
    }, {
      key: "matches",
      value: function matches(e) {
        return e instanceof Nr && (!e.callbackContext || !this.callbackContext || e.callbackContext.matches(this.callbackContext));
      }
    }, {
      key: "hasAnyCallback",
      value: function hasAnyCallback() {
        return null !== this.callbackContext;
      }
    }]);

    return Nr;
  }();

  var Pr = /*#__PURE__*/function () {
    function Pr(e, t) {
      _classCallCheck(this, Pr);

      this.eventType = e, this.callbackContext = t;
    }

    _createClass(Pr, [{
      key: "respondsTo",
      value: function respondsTo(e) {
        var t = "children_added" === e ? "child_added" : e;
        return t = "children_removed" === t ? "child_removed" : t, this.eventType === t;
      }
    }, {
      key: "createCancelEvent",
      value: function createCancelEvent(e, t) {
        return this.callbackContext.hasCancelCallback ? new mr(this, e, t) : null;
      }
    }, {
      key: "createEvent",
      value: function createEvent(t, n) {
        e(null != t.childName, "Child events should have a childName.");

        var i = Er(new wr(n._repo, n._path), t.childName),
            s = n._queryParams.getIndex();

        return new gr(t.type, this, new br(t.snapshotNode, i, s), t.prevName);
      }
    }, {
      key: "getEventRunner",
      value: function getEventRunner(e) {
        var _this43 = this;

        return "cancel" === e.getEventType() ? function () {
          return _this43.callbackContext.onCancel(e.error);
        } : function () {
          return _this43.callbackContext.onValue(e.snapshot, e.prevName);
        };
      }
    }, {
      key: "matches",
      value: function matches(e) {
        return e instanceof Pr && this.eventType === e.eventType && (!this.callbackContext || !e.callbackContext || this.callbackContext.matches(e.callbackContext));
      }
    }, {
      key: "hasAnyCallback",
      value: function hasAnyCallback() {
        return !!this.callbackContext;
      }
    }]);

    return Pr;
  }();

  function Rr(e, t, n, i) {
    return function (e, t, n, i, s) {
      var r;

      if ("object" == _typeof(i) && (r = void 0, s = i), "function" == typeof i && (r = i), s && s.onlyOnce) {
        var _t60 = n,
            _i64 = function _i64(n, i) {
          nr(e._repo, e, a), _t60(n, i);
        };

        _i64.userCallback = n.userCallback, _i64.context = n.context, n = _i64;
      }

      var o = new yr(n, r || void 0),
          a = "value" === t ? new Nr(o) : new Pr(t, o);
      return function (e, t, n) {
        var i;
        i = ".info" === Et(t._path) ? ns(e.infoSyncTree_, t, n) : ns(e.serverSyncTree_, t, n), Bs(e.eventQueue_, t._path, i);
      }(e._repo, e, a), function () {
        return nr(e._repo, e, a);
      };
    }(e, "value", t, n, i);
  }

  !function (t) {
    e(!Wi, "__referenceConstructor has already been defined"), Wi = t;
  }(wr), function (t) {
    e(!Ui, "__referenceConstructor has already been defined"), Ui = t;
  }(wr);
  var xr = {};

  function Dr(e, t, n, i, s) {
    var r = i || e.options.databaseURL;
    void 0 === r && (e.options.projectId || qe("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."), Me("Using default host for project ", e.options.projectId), r = "".concat(e.options.projectId, "-default-rtdb.firebaseio.com"));

    var o,
        a,
        l = _r(r, s),
        h = l.repoInfo;

    "undefined" != typeof process && process.env && (a = process.env.FIREBASE_DATABASE_EMULATOR_HOST), a ? (o = !0, r = "http://".concat(a, "?ns=").concat(h.namespace), l = _r(r, s), h = l.repoInfo) : o = !l.repoInfo.secure;
    var c = s && o ? new nt(nt.OWNER) : new tt(e.name, e.options, t);
    (function (e, t) {
      var n = t.path.toString();
      if ("string" != typeof t.repoInfo.host || 0 === t.repoInfo.host.length || !As(t.repoInfo.namespace) && "localhost" !== t.repoInfo.host.split(":")[0] || 0 !== n.length && !function (e) {
        return e && (e = e.replace(/^\/*\.info(\/|$)/, "/")), Os(e);
      }(n)) throw new Error(E(e, "url") + 'must be a valid firebase URL and the path can\'t contain ".", "#", "$", "[", or "]".');
    })("Invalid Firebase Database URL", l), xt(l.path) || qe("Database URL must point to the root of a Firebase Database (not including a child path).");

    var u = function (e, t, n, i) {
      var s = xr[t.name];
      s || (s = {}, xr[t.name] = s);
      var r = s[e.toURLString()];
      return r && qe("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."), r = new $s(e, false, n, i), s[e.toURLString()] = r, r;
    }(h, e, c, new et(e.name, n));

    return new Ar(u, e);
  }

  var Ar = /*#__PURE__*/function () {
    function Ar(e, t) {
      _classCallCheck(this, Ar);

      this._repoInternal = e, this.app = t, this.type = "database", this._instanceStarted = !1;
    }

    _createClass(Ar, [{
      key: "_repo",
      get: function get() {
        return this._instanceStarted || (Ys(this._repoInternal, this.app.options.appId, this.app.options.databaseAuthVariableOverride), this._instanceStarted = !0), this._repoInternal;
      }
    }, {
      key: "_root",
      get: function get() {
        return this._rootInternal || (this._rootInternal = new wr(this._repo, It())), this._rootInternal;
      }
    }, {
      key: "_delete",
      value: function _delete() {
        return null !== this._rootInternal && (function (e, t) {
          var n = xr[t];
          n && n[e.key] === e || qe("Database ".concat(t, "(").concat(e.repoInfo_, ") has already been deleted.")), function (e) {
            e.persistentConnection_ && e.persistentConnection_.interrupt("repo_interrupt");
          }(e), delete n[e.key];
        }(this._repo, this.app.name), this._repoInternal = null, this._rootInternal = null), Promise.resolve();
      }
    }, {
      key: "_checkNotDeleted",
      value: function _checkNotDeleted(e) {
        null === this._rootInternal && qe("Cannot call " + e + " on a deleted database.");
      }
    }]);

    return Ar;
  }();

  jt.prototype.simpleListen = function (e, t) {
    this.sendRequest("q", {
      p: e
    }, t);
  }, jt.prototype.echo = function (e, t) {
    this.sendRequest("echo", {
      d: e
    }, t);
  }, Ie = "9.10.0", le(new k("database", function (e, _ref8) {
    var t = _ref8.instanceIdentifier;
    return Dr(e.getProvider("app").getImmediate(), e.getProvider("auth-internal"), e.getProvider("app-check-internal"), t);
  }, "PUBLIC").setMultipleInstances(!0)), ue(we, be, void 0), ue(we, be, "esm2017");
  var Or = {
    apiKey: "AIzaSyClZE6Pm6b53gDmt1IXo9jw2nkTdBUUJqU",
    authDomain: "soarnet-2a594.firebaseapp.com",
    projectId: "soarnet-2a594",
    storageBucket: "soarnet-2a594.appspot.com",
    messagingSenderId: "574349000604",
    appId: "1:574349000604:web:478231141ef41a5022d259",
    databaseURL: "https://soarnet-2a594-default-rtdb.europe-west1.firebasedatabase.app"
  };
  SOARNET = {
    checkvalue: {},
    currentEvent: "test",
    eventDetails: "",
    userId: "",
    eventUserRef: null
  }, SOARNET.initConnection = function () {
    var e = function () {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "[DEFAULT]";
        var t = re.get(e);
        if (!t) throw he.create("no-app", {
          appName: e
        });
        return t;
      }();
      var t = arguments.length > 1 ? arguments[1] : undefined;
      return function (e, t) {
        var n = e.container.getProvider("heartbeat").getImmediate({
          optional: !0
        });
        return n && n.triggerHeartbeat(), e.container.getProvider(t);
      }(e, "database").getImmediate({
        identifier: t
      });
    }(function (e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      "object" != _typeof(t) && (t = {
        name: t
      });
      var n = Object.assign({
        name: "[DEFAULT]",
        automaticDataCollectionEnabled: !1
      }, t),
          i = n.name;
      if ("string" != typeof i || !i) throw he.create("bad-app-name", {
        appName: String(i)
      });
      var s = re.get(i);

      if (s) {
        if (w(e, s.options) && w(n, s.config)) return s;
        throw he.create("duplicate-app", {
          appName: i
        });
      }

      var r = new R(i);

      var _iterator15 = _createForOfIteratorHelper(oe.values()),
          _step15;

      try {
        for (_iterator15.s(); !(_step15 = _iterator15.n()).done;) {
          var _e102 = _step15.value;
          r.addComponent(_e102);
        }
      } catch (err) {
        _iterator15.e(err);
      } finally {
        _iterator15.f();
      }

      var o = new ce(e, n, r);
      return re.set(i, o), o;
    }(Or));

    Rr(Ir(e, "check/"), function (e) {
      SOARNET.checkvalue = e.val();
    }), Rr(Ir(e, "eventDetails/"), function (e) {
      SOARNET.eventDetails = e.val(), SOARNET.updateEventInfo();
    }), SOARNET.updateEvent = function (t, n) {
      kr(Ir(e, "eventDetails/" + t), n);
    }, SOARNET.createEvent = function (t) {
      var n = Sr(Ir(e, "eventDetails/"));
      return Tr(n).remove(), kr(n, t), n.key;
    }, SOARNET.createListener = function (t) {
      SOARNET.eventUserRef = Ir(e, "events/" + t + "/users/"), Rr(SOARNET.eventUserRef, function (e) {
        SOARNET.eventusers = e.val();
      });
    }, SOARNET.detachlistener = function () {
      !function (e, t, n) {
        var i = null;
        nr(e._repo, e, i);
      }(SOARNET.eventUserRef);
    }, SOARNET.writeUserData = function (t, n, i) {
      kr(Ir(e, "events/" + t + "/users/" + n), i);
    }, SOARNET.getUserId = function (t) {
      var n = Sr(Ir(e, "events/" + t + "/users"));
      return Tr(n).remove(), n.key;
    }, SOARNET.deleteEventUser = function (t, n) {
      Ir(e, "events/" + t + "/users/" + n).remove();
    };
  };
})();