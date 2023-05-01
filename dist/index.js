(function ($$1) {
    'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (g && (g = 0, op[0] && (_ = 0)), _) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    }

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function isFunction(value) {
        return typeof value === 'function';
    }

    function createErrorClass(createImpl) {
        var _super = function (instance) {
            Error.call(instance);
            instance.stack = new Error().stack;
        };
        var ctorFunc = createImpl(_super);
        ctorFunc.prototype = Object.create(Error.prototype);
        ctorFunc.prototype.constructor = ctorFunc;
        return ctorFunc;
    }

    var UnsubscriptionError = createErrorClass(function (_super) {
        return function UnsubscriptionErrorImpl(errors) {
            _super(this);
            this.message = errors
                ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function (err, i) { return i + 1 + ") " + err.toString(); }).join('\n  ')
                : '';
            this.name = 'UnsubscriptionError';
            this.errors = errors;
        };
    });

    function arrRemove(arr, item) {
        if (arr) {
            var index = arr.indexOf(item);
            0 <= index && arr.splice(index, 1);
        }
    }

    var Subscription = (function () {
        function Subscription(initialTeardown) {
            this.initialTeardown = initialTeardown;
            this.closed = false;
            this._parentage = null;
            this._finalizers = null;
        }
        Subscription.prototype.unsubscribe = function () {
            var e_1, _a, e_2, _b;
            var errors;
            if (!this.closed) {
                this.closed = true;
                var _parentage = this._parentage;
                if (_parentage) {
                    this._parentage = null;
                    if (Array.isArray(_parentage)) {
                        try {
                            for (var _parentage_1 = __values(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
                                var parent_1 = _parentage_1_1.value;
                                parent_1.remove(this);
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return)) _a.call(_parentage_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                    }
                    else {
                        _parentage.remove(this);
                    }
                }
                var initialFinalizer = this.initialTeardown;
                if (isFunction(initialFinalizer)) {
                    try {
                        initialFinalizer();
                    }
                    catch (e) {
                        errors = e instanceof UnsubscriptionError ? e.errors : [e];
                    }
                }
                var _finalizers = this._finalizers;
                if (_finalizers) {
                    this._finalizers = null;
                    try {
                        for (var _finalizers_1 = __values(_finalizers), _finalizers_1_1 = _finalizers_1.next(); !_finalizers_1_1.done; _finalizers_1_1 = _finalizers_1.next()) {
                            var finalizer = _finalizers_1_1.value;
                            try {
                                execFinalizer(finalizer);
                            }
                            catch (err) {
                                errors = errors !== null && errors !== void 0 ? errors : [];
                                if (err instanceof UnsubscriptionError) {
                                    errors = __spreadArray(__spreadArray([], __read(errors)), __read(err.errors));
                                }
                                else {
                                    errors.push(err);
                                }
                            }
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_finalizers_1_1 && !_finalizers_1_1.done && (_b = _finalizers_1.return)) _b.call(_finalizers_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
                if (errors) {
                    throw new UnsubscriptionError(errors);
                }
            }
        };
        Subscription.prototype.add = function (teardown) {
            var _a;
            if (teardown && teardown !== this) {
                if (this.closed) {
                    execFinalizer(teardown);
                }
                else {
                    if (teardown instanceof Subscription) {
                        if (teardown.closed || teardown._hasParent(this)) {
                            return;
                        }
                        teardown._addParent(this);
                    }
                    (this._finalizers = (_a = this._finalizers) !== null && _a !== void 0 ? _a : []).push(teardown);
                }
            }
        };
        Subscription.prototype._hasParent = function (parent) {
            var _parentage = this._parentage;
            return _parentage === parent || (Array.isArray(_parentage) && _parentage.includes(parent));
        };
        Subscription.prototype._addParent = function (parent) {
            var _parentage = this._parentage;
            this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
        };
        Subscription.prototype._removeParent = function (parent) {
            var _parentage = this._parentage;
            if (_parentage === parent) {
                this._parentage = null;
            }
            else if (Array.isArray(_parentage)) {
                arrRemove(_parentage, parent);
            }
        };
        Subscription.prototype.remove = function (teardown) {
            var _finalizers = this._finalizers;
            _finalizers && arrRemove(_finalizers, teardown);
            if (teardown instanceof Subscription) {
                teardown._removeParent(this);
            }
        };
        Subscription.EMPTY = (function () {
            var empty = new Subscription();
            empty.closed = true;
            return empty;
        })();
        return Subscription;
    }());
    Subscription.EMPTY;
    function isSubscription(value) {
        return (value instanceof Subscription ||
            (value && 'closed' in value && isFunction(value.remove) && isFunction(value.add) && isFunction(value.unsubscribe)));
    }
    function execFinalizer(finalizer) {
        if (isFunction(finalizer)) {
            finalizer();
        }
        else {
            finalizer.unsubscribe();
        }
    }

    var config = {
        onUnhandledError: null,
        onStoppedNotification: null,
        Promise: undefined,
        useDeprecatedSynchronousErrorHandling: false,
        useDeprecatedNextContext: false,
    };

    var timeoutProvider = {
        setTimeout: function (handler, timeout) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            var delegate = timeoutProvider.delegate;
            if (delegate === null || delegate === void 0 ? void 0 : delegate.setTimeout) {
                return delegate.setTimeout.apply(delegate, __spreadArray([handler, timeout], __read(args)));
            }
            return setTimeout.apply(void 0, __spreadArray([handler, timeout], __read(args)));
        },
        clearTimeout: function (handle) {
            var delegate = timeoutProvider.delegate;
            return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearTimeout) || clearTimeout)(handle);
        },
        delegate: undefined,
    };

    function reportUnhandledError(err) {
        timeoutProvider.setTimeout(function () {
            {
                throw err;
            }
        });
    }

    function noop() { }

    function errorContext(cb) {
        {
            cb();
        }
    }

    var Subscriber = (function (_super) {
        __extends(Subscriber, _super);
        function Subscriber(destination) {
            var _this = _super.call(this) || this;
            _this.isStopped = false;
            if (destination) {
                _this.destination = destination;
                if (isSubscription(destination)) {
                    destination.add(_this);
                }
            }
            else {
                _this.destination = EMPTY_OBSERVER;
            }
            return _this;
        }
        Subscriber.create = function (next, error, complete) {
            return new SafeSubscriber(next, error, complete);
        };
        Subscriber.prototype.next = function (value) {
            if (this.isStopped) ;
            else {
                this._next(value);
            }
        };
        Subscriber.prototype.error = function (err) {
            if (this.isStopped) ;
            else {
                this.isStopped = true;
                this._error(err);
            }
        };
        Subscriber.prototype.complete = function () {
            if (this.isStopped) ;
            else {
                this.isStopped = true;
                this._complete();
            }
        };
        Subscriber.prototype.unsubscribe = function () {
            if (!this.closed) {
                this.isStopped = true;
                _super.prototype.unsubscribe.call(this);
                this.destination = null;
            }
        };
        Subscriber.prototype._next = function (value) {
            this.destination.next(value);
        };
        Subscriber.prototype._error = function (err) {
            try {
                this.destination.error(err);
            }
            finally {
                this.unsubscribe();
            }
        };
        Subscriber.prototype._complete = function () {
            try {
                this.destination.complete();
            }
            finally {
                this.unsubscribe();
            }
        };
        return Subscriber;
    }(Subscription));
    var _bind = Function.prototype.bind;
    function bind(fn, thisArg) {
        return _bind.call(fn, thisArg);
    }
    var ConsumerObserver = (function () {
        function ConsumerObserver(partialObserver) {
            this.partialObserver = partialObserver;
        }
        ConsumerObserver.prototype.next = function (value) {
            var partialObserver = this.partialObserver;
            if (partialObserver.next) {
                try {
                    partialObserver.next(value);
                }
                catch (error) {
                    handleUnhandledError(error);
                }
            }
        };
        ConsumerObserver.prototype.error = function (err) {
            var partialObserver = this.partialObserver;
            if (partialObserver.error) {
                try {
                    partialObserver.error(err);
                }
                catch (error) {
                    handleUnhandledError(error);
                }
            }
            else {
                handleUnhandledError(err);
            }
        };
        ConsumerObserver.prototype.complete = function () {
            var partialObserver = this.partialObserver;
            if (partialObserver.complete) {
                try {
                    partialObserver.complete();
                }
                catch (error) {
                    handleUnhandledError(error);
                }
            }
        };
        return ConsumerObserver;
    }());
    var SafeSubscriber = (function (_super) {
        __extends(SafeSubscriber, _super);
        function SafeSubscriber(observerOrNext, error, complete) {
            var _this = _super.call(this) || this;
            var partialObserver;
            if (isFunction(observerOrNext) || !observerOrNext) {
                partialObserver = {
                    next: (observerOrNext !== null && observerOrNext !== void 0 ? observerOrNext : undefined),
                    error: error !== null && error !== void 0 ? error : undefined,
                    complete: complete !== null && complete !== void 0 ? complete : undefined,
                };
            }
            else {
                var context_1;
                if (_this && config.useDeprecatedNextContext) {
                    context_1 = Object.create(observerOrNext);
                    context_1.unsubscribe = function () { return _this.unsubscribe(); };
                    partialObserver = {
                        next: observerOrNext.next && bind(observerOrNext.next, context_1),
                        error: observerOrNext.error && bind(observerOrNext.error, context_1),
                        complete: observerOrNext.complete && bind(observerOrNext.complete, context_1),
                    };
                }
                else {
                    partialObserver = observerOrNext;
                }
            }
            _this.destination = new ConsumerObserver(partialObserver);
            return _this;
        }
        return SafeSubscriber;
    }(Subscriber));
    function handleUnhandledError(error) {
        {
            reportUnhandledError(error);
        }
    }
    function defaultErrorHandler(err) {
        throw err;
    }
    var EMPTY_OBSERVER = {
        closed: true,
        next: noop,
        error: defaultErrorHandler,
        complete: noop,
    };

    var observable = (function () { return (typeof Symbol === 'function' && Symbol.observable) || '@@observable'; })();

    function identity(x) {
        return x;
    }

    function pipeFromArray(fns) {
        if (fns.length === 0) {
            return identity;
        }
        if (fns.length === 1) {
            return fns[0];
        }
        return function piped(input) {
            return fns.reduce(function (prev, fn) { return fn(prev); }, input);
        };
    }

    var Observable = (function () {
        function Observable(subscribe) {
            if (subscribe) {
                this._subscribe = subscribe;
            }
        }
        Observable.prototype.lift = function (operator) {
            var observable = new Observable();
            observable.source = this;
            observable.operator = operator;
            return observable;
        };
        Observable.prototype.subscribe = function (observerOrNext, error, complete) {
            var _this = this;
            var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new SafeSubscriber(observerOrNext, error, complete);
            errorContext(function () {
                var _a = _this, operator = _a.operator, source = _a.source;
                subscriber.add(operator
                    ?
                        operator.call(subscriber, source)
                    : source
                        ?
                            _this._subscribe(subscriber)
                        :
                            _this._trySubscribe(subscriber));
            });
            return subscriber;
        };
        Observable.prototype._trySubscribe = function (sink) {
            try {
                return this._subscribe(sink);
            }
            catch (err) {
                sink.error(err);
            }
        };
        Observable.prototype.forEach = function (next, promiseCtor) {
            var _this = this;
            promiseCtor = getPromiseCtor(promiseCtor);
            return new promiseCtor(function (resolve, reject) {
                var subscriber = new SafeSubscriber({
                    next: function (value) {
                        try {
                            next(value);
                        }
                        catch (err) {
                            reject(err);
                            subscriber.unsubscribe();
                        }
                    },
                    error: reject,
                    complete: resolve,
                });
                _this.subscribe(subscriber);
            });
        };
        Observable.prototype._subscribe = function (subscriber) {
            var _a;
            return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
        };
        Observable.prototype[observable] = function () {
            return this;
        };
        Observable.prototype.pipe = function () {
            var operations = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                operations[_i] = arguments[_i];
            }
            return pipeFromArray(operations)(this);
        };
        Observable.prototype.toPromise = function (promiseCtor) {
            var _this = this;
            promiseCtor = getPromiseCtor(promiseCtor);
            return new promiseCtor(function (resolve, reject) {
                var value;
                _this.subscribe(function (x) { return (value = x); }, function (err) { return reject(err); }, function () { return resolve(value); });
            });
        };
        Observable.create = function (subscribe) {
            return new Observable(subscribe);
        };
        return Observable;
    }());
    function getPromiseCtor(promiseCtor) {
        var _a;
        return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : config.Promise) !== null && _a !== void 0 ? _a : Promise;
    }
    function isObserver(value) {
        return value && isFunction(value.next) && isFunction(value.error) && isFunction(value.complete);
    }
    function isSubscriber(value) {
        return (value && value instanceof Subscriber) || (isObserver(value) && isSubscription(value));
    }

    function hasLift(source) {
        return isFunction(source === null || source === void 0 ? void 0 : source.lift);
    }
    function operate(init) {
        return function (source) {
            if (hasLift(source)) {
                return source.lift(function (liftedSource) {
                    try {
                        return init(liftedSource, this);
                    }
                    catch (err) {
                        this.error(err);
                    }
                });
            }
            throw new TypeError('Unable to lift unknown Observable type');
        };
    }

    function createOperatorSubscriber(destination, onNext, onComplete, onError, onFinalize) {
        return new OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize);
    }
    var OperatorSubscriber = (function (_super) {
        __extends(OperatorSubscriber, _super);
        function OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize, shouldUnsubscribe) {
            var _this = _super.call(this, destination) || this;
            _this.onFinalize = onFinalize;
            _this.shouldUnsubscribe = shouldUnsubscribe;
            _this._next = onNext
                ? function (value) {
                    try {
                        onNext(value);
                    }
                    catch (err) {
                        destination.error(err);
                    }
                }
                : _super.prototype._next;
            _this._error = onError
                ? function (err) {
                    try {
                        onError(err);
                    }
                    catch (err) {
                        destination.error(err);
                    }
                    finally {
                        this.unsubscribe();
                    }
                }
                : _super.prototype._error;
            _this._complete = onComplete
                ? function () {
                    try {
                        onComplete();
                    }
                    catch (err) {
                        destination.error(err);
                    }
                    finally {
                        this.unsubscribe();
                    }
                }
                : _super.prototype._complete;
            return _this;
        }
        OperatorSubscriber.prototype.unsubscribe = function () {
            var _a;
            if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
                var closed_1 = this.closed;
                _super.prototype.unsubscribe.call(this);
                !closed_1 && ((_a = this.onFinalize) === null || _a === void 0 ? void 0 : _a.call(this));
            }
        };
        return OperatorSubscriber;
    }(Subscriber));

    var dateTimestampProvider = {
        now: function () {
            return (dateTimestampProvider.delegate || Date).now();
        },
        delegate: undefined,
    };

    var Action = (function (_super) {
        __extends(Action, _super);
        function Action(scheduler, work) {
            return _super.call(this) || this;
        }
        Action.prototype.schedule = function (state, delay) {
            return this;
        };
        return Action;
    }(Subscription));

    var intervalProvider = {
        setInterval: function (handler, timeout) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            var delegate = intervalProvider.delegate;
            if (delegate === null || delegate === void 0 ? void 0 : delegate.setInterval) {
                return delegate.setInterval.apply(delegate, __spreadArray([handler, timeout], __read(args)));
            }
            return setInterval.apply(void 0, __spreadArray([handler, timeout], __read(args)));
        },
        clearInterval: function (handle) {
            var delegate = intervalProvider.delegate;
            return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearInterval) || clearInterval)(handle);
        },
        delegate: undefined,
    };

    var AsyncAction = (function (_super) {
        __extends(AsyncAction, _super);
        function AsyncAction(scheduler, work) {
            var _this = _super.call(this, scheduler, work) || this;
            _this.scheduler = scheduler;
            _this.work = work;
            _this.pending = false;
            return _this;
        }
        AsyncAction.prototype.schedule = function (state, delay) {
            var _a;
            if (delay === void 0) { delay = 0; }
            if (this.closed) {
                return this;
            }
            this.state = state;
            var id = this.id;
            var scheduler = this.scheduler;
            if (id != null) {
                this.id = this.recycleAsyncId(scheduler, id, delay);
            }
            this.pending = true;
            this.delay = delay;
            this.id = (_a = this.id) !== null && _a !== void 0 ? _a : this.requestAsyncId(scheduler, this.id, delay);
            return this;
        };
        AsyncAction.prototype.requestAsyncId = function (scheduler, _id, delay) {
            if (delay === void 0) { delay = 0; }
            return intervalProvider.setInterval(scheduler.flush.bind(scheduler, this), delay);
        };
        AsyncAction.prototype.recycleAsyncId = function (_scheduler, id, delay) {
            if (delay === void 0) { delay = 0; }
            if (delay != null && this.delay === delay && this.pending === false) {
                return id;
            }
            if (id != null) {
                intervalProvider.clearInterval(id);
            }
            return undefined;
        };
        AsyncAction.prototype.execute = function (state, delay) {
            if (this.closed) {
                return new Error('executing a cancelled action');
            }
            this.pending = false;
            var error = this._execute(state, delay);
            if (error) {
                return error;
            }
            else if (this.pending === false && this.id != null) {
                this.id = this.recycleAsyncId(this.scheduler, this.id, null);
            }
        };
        AsyncAction.prototype._execute = function (state, _delay) {
            var errored = false;
            var errorValue;
            try {
                this.work(state);
            }
            catch (e) {
                errored = true;
                errorValue = e ? e : new Error('Scheduled action threw falsy error');
            }
            if (errored) {
                this.unsubscribe();
                return errorValue;
            }
        };
        AsyncAction.prototype.unsubscribe = function () {
            if (!this.closed) {
                var _a = this, id = _a.id, scheduler = _a.scheduler;
                var actions = scheduler.actions;
                this.work = this.state = this.scheduler = null;
                this.pending = false;
                arrRemove(actions, this);
                if (id != null) {
                    this.id = this.recycleAsyncId(scheduler, id, null);
                }
                this.delay = null;
                _super.prototype.unsubscribe.call(this);
            }
        };
        return AsyncAction;
    }(Action));

    var Scheduler = (function () {
        function Scheduler(schedulerActionCtor, now) {
            if (now === void 0) { now = Scheduler.now; }
            this.schedulerActionCtor = schedulerActionCtor;
            this.now = now;
        }
        Scheduler.prototype.schedule = function (work, delay, state) {
            if (delay === void 0) { delay = 0; }
            return new this.schedulerActionCtor(this, work).schedule(state, delay);
        };
        Scheduler.now = dateTimestampProvider.now;
        return Scheduler;
    }());

    var AsyncScheduler = (function (_super) {
        __extends(AsyncScheduler, _super);
        function AsyncScheduler(SchedulerAction, now) {
            if (now === void 0) { now = Scheduler.now; }
            var _this = _super.call(this, SchedulerAction, now) || this;
            _this.actions = [];
            _this._active = false;
            return _this;
        }
        AsyncScheduler.prototype.flush = function (action) {
            var actions = this.actions;
            if (this._active) {
                actions.push(action);
                return;
            }
            var error;
            this._active = true;
            do {
                if ((error = action.execute(action.state, action.delay))) {
                    break;
                }
            } while ((action = actions.shift()));
            this._active = false;
            if (error) {
                while ((action = actions.shift())) {
                    action.unsubscribe();
                }
                throw error;
            }
        };
        return AsyncScheduler;
    }(Scheduler));

    var asyncScheduler = new AsyncScheduler(AsyncAction);
    var async = asyncScheduler;

    function isScheduler(value) {
        return value && isFunction(value.schedule);
    }

    var isArrayLike = (function (x) { return x && typeof x.length === 'number' && typeof x !== 'function'; });

    function isPromise(value) {
        return isFunction(value === null || value === void 0 ? void 0 : value.then);
    }

    function isInteropObservable(input) {
        return isFunction(input[observable]);
    }

    function isAsyncIterable(obj) {
        return Symbol.asyncIterator && isFunction(obj === null || obj === void 0 ? void 0 : obj[Symbol.asyncIterator]);
    }

    function createInvalidObservableTypeError(input) {
        return new TypeError("You provided " + (input !== null && typeof input === 'object' ? 'an invalid object' : "'" + input + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
    }

    function getSymbolIterator() {
        if (typeof Symbol !== 'function' || !Symbol.iterator) {
            return '@@iterator';
        }
        return Symbol.iterator;
    }
    var iterator = getSymbolIterator();

    function isIterable(input) {
        return isFunction(input === null || input === void 0 ? void 0 : input[iterator]);
    }

    function readableStreamLikeToAsyncGenerator(readableStream) {
        return __asyncGenerator(this, arguments, function readableStreamLikeToAsyncGenerator_1() {
            var reader, _a, value, done;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        reader = readableStream.getReader();
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, , 9, 10]);
                        _b.label = 2;
                    case 2:
                        return [4, __await(reader.read())];
                    case 3:
                        _a = _b.sent(), value = _a.value, done = _a.done;
                        if (!done) return [3, 5];
                        return [4, __await(void 0)];
                    case 4: return [2, _b.sent()];
                    case 5: return [4, __await(value)];
                    case 6: return [4, _b.sent()];
                    case 7:
                        _b.sent();
                        return [3, 2];
                    case 8: return [3, 10];
                    case 9:
                        reader.releaseLock();
                        return [7];
                    case 10: return [2];
                }
            });
        });
    }
    function isReadableStreamLike(obj) {
        return isFunction(obj === null || obj === void 0 ? void 0 : obj.getReader);
    }

    function innerFrom(input) {
        if (input instanceof Observable) {
            return input;
        }
        if (input != null) {
            if (isInteropObservable(input)) {
                return fromInteropObservable(input);
            }
            if (isArrayLike(input)) {
                return fromArrayLike(input);
            }
            if (isPromise(input)) {
                return fromPromise(input);
            }
            if (isAsyncIterable(input)) {
                return fromAsyncIterable(input);
            }
            if (isIterable(input)) {
                return fromIterable(input);
            }
            if (isReadableStreamLike(input)) {
                return fromReadableStreamLike(input);
            }
        }
        throw createInvalidObservableTypeError(input);
    }
    function fromInteropObservable(obj) {
        return new Observable(function (subscriber) {
            var obs = obj[observable]();
            if (isFunction(obs.subscribe)) {
                return obs.subscribe(subscriber);
            }
            throw new TypeError('Provided object does not correctly implement Symbol.observable');
        });
    }
    function fromArrayLike(array) {
        return new Observable(function (subscriber) {
            for (var i = 0; i < array.length && !subscriber.closed; i++) {
                subscriber.next(array[i]);
            }
            subscriber.complete();
        });
    }
    function fromPromise(promise) {
        return new Observable(function (subscriber) {
            promise
                .then(function (value) {
                if (!subscriber.closed) {
                    subscriber.next(value);
                    subscriber.complete();
                }
            }, function (err) { return subscriber.error(err); })
                .then(null, reportUnhandledError);
        });
    }
    function fromIterable(iterable) {
        return new Observable(function (subscriber) {
            var e_1, _a;
            try {
                for (var iterable_1 = __values(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
                    var value = iterable_1_1.value;
                    subscriber.next(value);
                    if (subscriber.closed) {
                        return;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return)) _a.call(iterable_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            subscriber.complete();
        });
    }
    function fromAsyncIterable(asyncIterable) {
        return new Observable(function (subscriber) {
            process(asyncIterable, subscriber).catch(function (err) { return subscriber.error(err); });
        });
    }
    function fromReadableStreamLike(readableStream) {
        return fromAsyncIterable(readableStreamLikeToAsyncGenerator(readableStream));
    }
    function process(asyncIterable, subscriber) {
        var asyncIterable_1, asyncIterable_1_1;
        var e_2, _a;
        return __awaiter(this, void 0, void 0, function () {
            var value, e_2_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, 6, 11]);
                        asyncIterable_1 = __asyncValues(asyncIterable);
                        _b.label = 1;
                    case 1: return [4, asyncIterable_1.next()];
                    case 2:
                        if (!(asyncIterable_1_1 = _b.sent(), !asyncIterable_1_1.done)) return [3, 4];
                        value = asyncIterable_1_1.value;
                        subscriber.next(value);
                        if (subscriber.closed) {
                            return [2];
                        }
                        _b.label = 3;
                    case 3: return [3, 1];
                    case 4: return [3, 11];
                    case 5:
                        e_2_1 = _b.sent();
                        e_2 = { error: e_2_1 };
                        return [3, 11];
                    case 6:
                        _b.trys.push([6, , 9, 10]);
                        if (!(asyncIterable_1_1 && !asyncIterable_1_1.done && (_a = asyncIterable_1.return))) return [3, 8];
                        return [4, _a.call(asyncIterable_1)];
                    case 7:
                        _b.sent();
                        _b.label = 8;
                    case 8: return [3, 10];
                    case 9:
                        if (e_2) throw e_2.error;
                        return [7];
                    case 10: return [7];
                    case 11:
                        subscriber.complete();
                        return [2];
                }
            });
        });
    }

    function executeSchedule(parentSubscription, scheduler, work, delay, repeat) {
        if (delay === void 0) { delay = 0; }
        if (repeat === void 0) { repeat = false; }
        var scheduleSubscription = scheduler.schedule(function () {
            work();
            if (repeat) {
                parentSubscription.add(this.schedule(null, delay));
            }
            else {
                this.unsubscribe();
            }
        }, delay);
        parentSubscription.add(scheduleSubscription);
        if (!repeat) {
            return scheduleSubscription;
        }
    }

    function isValidDate(value) {
        return value instanceof Date && !isNaN(value);
    }

    function map(project, thisArg) {
        return operate(function (source, subscriber) {
            var index = 0;
            source.subscribe(createOperatorSubscriber(subscriber, function (value) {
                subscriber.next(project.call(thisArg, value, index++));
            }));
        });
    }

    var isArray = Array.isArray;
    function callOrApply(fn, args) {
        return isArray(args) ? fn.apply(void 0, __spreadArray([], __read(args))) : fn(args);
    }
    function mapOneOrManyArgs(fn) {
        return map(function (args) { return callOrApply(fn, args); });
    }

    function mergeInternals(source, subscriber, project, concurrent, onBeforeNext, expand, innerSubScheduler, additionalFinalizer) {
        var buffer = [];
        var active = 0;
        var index = 0;
        var isComplete = false;
        var checkComplete = function () {
            if (isComplete && !buffer.length && !active) {
                subscriber.complete();
            }
        };
        var outerNext = function (value) { return (active < concurrent ? doInnerSub(value) : buffer.push(value)); };
        var doInnerSub = function (value) {
            expand && subscriber.next(value);
            active++;
            var innerComplete = false;
            innerFrom(project(value, index++)).subscribe(createOperatorSubscriber(subscriber, function (innerValue) {
                onBeforeNext === null || onBeforeNext === void 0 ? void 0 : onBeforeNext(innerValue);
                if (expand) {
                    outerNext(innerValue);
                }
                else {
                    subscriber.next(innerValue);
                }
            }, function () {
                innerComplete = true;
            }, undefined, function () {
                if (innerComplete) {
                    try {
                        active--;
                        var _loop_1 = function () {
                            var bufferedValue = buffer.shift();
                            if (innerSubScheduler) {
                                executeSchedule(subscriber, innerSubScheduler, function () { return doInnerSub(bufferedValue); });
                            }
                            else {
                                doInnerSub(bufferedValue);
                            }
                        };
                        while (buffer.length && active < concurrent) {
                            _loop_1();
                        }
                        checkComplete();
                    }
                    catch (err) {
                        subscriber.error(err);
                    }
                }
            }));
        };
        source.subscribe(createOperatorSubscriber(subscriber, outerNext, function () {
            isComplete = true;
            checkComplete();
        }));
        return function () {
            additionalFinalizer === null || additionalFinalizer === void 0 ? void 0 : additionalFinalizer();
        };
    }

    function mergeMap(project, resultSelector, concurrent) {
        if (concurrent === void 0) { concurrent = Infinity; }
        if (isFunction(resultSelector)) {
            return mergeMap(function (a, i) { return map(function (b, ii) { return resultSelector(a, b, i, ii); })(innerFrom(project(a, i))); }, concurrent);
        }
        else if (typeof resultSelector === 'number') {
            concurrent = resultSelector;
        }
        return operate(function (source, subscriber) { return mergeInternals(source, subscriber, project, concurrent); });
    }

    var nodeEventEmitterMethods = ['addListener', 'removeListener'];
    var eventTargetMethods = ['addEventListener', 'removeEventListener'];
    var jqueryMethods = ['on', 'off'];
    function fromEvent(target, eventName, options, resultSelector) {
        if (isFunction(options)) {
            resultSelector = options;
            options = undefined;
        }
        if (resultSelector) {
            return fromEvent(target, eventName, options).pipe(mapOneOrManyArgs(resultSelector));
        }
        var _a = __read(isEventTarget(target)
            ? eventTargetMethods.map(function (methodName) { return function (handler) { return target[methodName](eventName, handler, options); }; })
            :
                isNodeStyleEventEmitter(target)
                    ? nodeEventEmitterMethods.map(toCommonHandlerRegistry(target, eventName))
                    : isJQueryStyleEventEmitter(target)
                        ? jqueryMethods.map(toCommonHandlerRegistry(target, eventName))
                        : [], 2), add = _a[0], remove = _a[1];
        if (!add) {
            if (isArrayLike(target)) {
                return mergeMap(function (subTarget) { return fromEvent(subTarget, eventName, options); })(innerFrom(target));
            }
        }
        if (!add) {
            throw new TypeError('Invalid event target');
        }
        return new Observable(function (subscriber) {
            var handler = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return subscriber.next(1 < args.length ? args : args[0]);
            };
            add(handler);
            return function () { return remove(handler); };
        });
    }
    function toCommonHandlerRegistry(target, eventName) {
        return function (methodName) { return function (handler) { return target[methodName](eventName, handler); }; };
    }
    function isNodeStyleEventEmitter(target) {
        return isFunction(target.addListener) && isFunction(target.removeListener);
    }
    function isJQueryStyleEventEmitter(target) {
        return isFunction(target.on) && isFunction(target.off);
    }
    function isEventTarget(target) {
        return isFunction(target.addEventListener) && isFunction(target.removeEventListener);
    }

    function timer(dueTime, intervalOrScheduler, scheduler) {
        if (dueTime === void 0) { dueTime = 0; }
        if (scheduler === void 0) { scheduler = async; }
        var intervalDuration = -1;
        if (intervalOrScheduler != null) {
            if (isScheduler(intervalOrScheduler)) {
                scheduler = intervalOrScheduler;
            }
            else {
                intervalDuration = intervalOrScheduler;
            }
        }
        return new Observable(function (subscriber) {
            var due = isValidDate(dueTime) ? +dueTime - scheduler.now() : dueTime;
            if (due < 0) {
                due = 0;
            }
            var n = 0;
            return scheduler.schedule(function () {
                if (!subscriber.closed) {
                    subscriber.next(n++);
                    if (0 <= intervalDuration) {
                        this.schedule(undefined, intervalDuration);
                    }
                    else {
                        subscriber.complete();
                    }
                }
            }, due);
        });
    }

    function throttle(durationSelector, config) {
        return operate(function (source, subscriber) {
            var _a = config !== null && config !== void 0 ? config : {}, _b = _a.leading, leading = _b === void 0 ? true : _b, _c = _a.trailing, trailing = _c === void 0 ? false : _c;
            var hasValue = false;
            var sendValue = null;
            var throttled = null;
            var isComplete = false;
            var endThrottling = function () {
                throttled === null || throttled === void 0 ? void 0 : throttled.unsubscribe();
                throttled = null;
                if (trailing) {
                    send();
                    isComplete && subscriber.complete();
                }
            };
            var cleanupThrottling = function () {
                throttled = null;
                isComplete && subscriber.complete();
            };
            var startThrottle = function (value) {
                return (throttled = innerFrom(durationSelector(value)).subscribe(createOperatorSubscriber(subscriber, endThrottling, cleanupThrottling)));
            };
            var send = function () {
                if (hasValue) {
                    hasValue = false;
                    var value = sendValue;
                    sendValue = null;
                    subscriber.next(value);
                    !isComplete && startThrottle(value);
                }
            };
            source.subscribe(createOperatorSubscriber(subscriber, function (value) {
                hasValue = true;
                sendValue = value;
                !(throttled && !throttled.closed) && (leading ? send() : startThrottle(value));
            }, function () {
                isComplete = true;
                !(trailing && hasValue && throttled && !throttled.closed) && subscriber.complete();
            }));
        });
    }

    function throttleTime(duration, scheduler, config) {
        if (scheduler === void 0) { scheduler = asyncScheduler; }
        var duration$ = timer(duration, scheduler);
        return throttle(function () { return duration$; }, config);
    }

    const FruitsRegex = 'gyümölcs|alma|körte|barack|szilva|cseresznye|málna|eper|szamóca|meggy|citrom|narancs|szőlő|'
        + 'dinnye|kivi|banán|ananász|datolya|mangó|szeder|ribizli|áfonya|'
        + 'barack|kaki|mandarin|karambola|kókusz|lime|pomelo|csipkebogyó|gránátalma|füge|'
        + 'galagonya|hurma|kajszi|kumkvat|licsi|mangosztán|maracuja|nektarin|papaya|passiógyümölcs|'
        + 'pitahaya|pitaja|egres';
    const FishSpeciesList = [
        'ponty', 'süllő', 'harcsa', 'tokhal', 'lazac', 'pisztráng', 'tonhal',
        'pangasius', 'tőkehal', 'keszeg', 'szardínia', 'makréla', 'hering', 'hekk', 'sügér',
        'tilápia',
        //'csuka'
    ];
    const LikeLevel = {
        favorite1: 'favorite1',
        favorite2: 'favorite2',
        neutral: 'neutral',
        test: 'test',
        warn: 'warn',
        blacklist: 'blacklist',
    };

    function evaluateCardText(foodDescription, userConfig, acceptanceLevel) {
        //is blacklisted?
        if (containsLcMatch(userConfig.blacklist, foodDescription) && !containsLcMatch(userConfig.blacklistExceptions, foodDescription)) {
            return LikeLevel.blacklist;
        }
        //testing
        if (containsLcMatch(userConfig.testingList, foodDescription) && !containsLcMatch(userConfig.blacklistExceptions, foodDescription)) {
            return LikeLevel.test;
        }
        //warning
        if (containsLcMatch(userConfig.warnList, foodDescription) && !containsLcMatch(userConfig.blacklistExceptions, foodDescription)) {
            return LikeLevel.warn;
        }
        //is meh?
        if (containsLcMatch(userConfig.mehList, foodDescription)) {
            return LikeLevel.neutral;
        }
        //is fav 1 ?
        if (containsLcMatch(userConfig.favList1, foodDescription)) {
            return LikeLevel.favorite1;
        }
        //is fav2 ?
        if (acceptanceLevel >= 2) {
            if (containsLcMatch(userConfig.favList2, foodDescription)) {
                return LikeLevel.favorite2;
            }
        }
        return LikeLevel.neutral;
    }
    function lcMatch(e1, e2) {
        return e1.toLowerCase().match(e2.toLowerCase()) != null;
    }
    function containsLcMatch(list1, foodText) {
        for (const listItem1 of list1) {
            if (lcMatch(foodText, listItem1)) {
                //console.log("Found match in containsLcMatch: " + foodObj.text() + " " + listItem1);
                return true;
            }
        }
        return false;
    }

    class UnreachableCaseError extends Error {
        constructor(value) {
            super('Unreachable case: ' + value);
        }
    }

    function applyHighlightToCellStyle($food, likeLevel) {
        myApplyCss($food, getStyleForLevel(likeLevel));
    }
    function myApplyCss($elem, { children, ...rest }) {
        $elem.css(rest);
        if (children) {
            myApplyCss($elem.children(), children);
        }
    }
    function getStyleForLevel(level) {
        switch (level) {
            case LikeLevel.blacklist:
                return { 'border-color': '#ff6060', children: { opacity: '0.3' } };
            case LikeLevel.test:
                return { 'border-color': 'yellow' };
            case LikeLevel.warn:
                return { 'border-color': 'orange' };
            case LikeLevel.neutral:
                return { 'border-color': '#e0e0e0' };
            case LikeLevel.favorite1:
                return { 'border-color': '#60d860' };
            case LikeLevel.favorite2:
                return { 'border-color': '#a0e0a0' };
            default:
                throw new UnreachableCaseError(level);
        }
    }

    function patchPizzaforteStyles() {
        if ($$1('#assistant-pizzaforte-styles').length === 0) {
            $$1(document.body).append(`
      <style id="assistant-pizzaforte-styles">
        .product {
          border-left: 16px solid #eeeeee;
        }
      </style>
    `);
        }
    }

    function jxItems(jq) {
        return jq.toArray().map(elem => $$1(elem));
    }
    function jxNthParent($elem, n) {
        for (let i = 0; i < n; i++) {
            $elem = $elem.parent();
        }
        return $elem;
    }

    function patchTeletalStyles() {
        const $newRows = $$1('.menu-slider-logged:not([x-original-height])');
        for (const $row of jxItems($newRows)) {
            $row.attr('x-original-height', $row.css('height') ?? '');
            $row.css('height', '');
        }
        const $newCells = $$1('.menu-card:not(.assistant-styled)');
        for (const $cell of jxItems($newCells)) {
            jxItems($cell.children('> .menu-cell-text')).forEach((text, i) => {
                text.css('flex', i === 0 ? '1 1 auto' : '');
            });
            $cell.addClass('.assistant-styled');
        }
        if ($$1('#assistant-teletal-styles').length === 0) {
            $$1(document.body).append(`
      <style id="assistant-teletal-styles">
        .menu-slider-logged, .menu-slider {
          margin-bottom: 0;
          height: unset;
          display: flex;
          flex-flow: row nowrap;
        }
        /* artificially increase specificity by duplicating the same class over enough times */
        .menu .menu-card.menu-card.menu-card {
          border: 6px solid #eeeeee;
          box-sizing: border-box;
          height: unset;
          display: flex;
          flex-flow: column nowrap;
        }
        .menu .menu-cell-text.menu-cell-text.menu-cell-text {
          border: none;
          height: unset;
        }
        .menu-card > .menu-cell-text.menu-cell-text-description {
          flex: 1 1 auto;
        }
      </style>
    `);
        }
    }

    const UIkit = self.UIkit;

    const AndiConfig = {
        userNameToFind: 'Dusza Andrea',
        blacklist: [],
        warnList: [],
        blacklistExceptions: [],
        mehList: ['tarhonya'],
        favList1: ['juhtúró', 'camembert', 'grillezett sajt', 'grill sajt', 'tápiókapuding', 'rák', 'lazac'],
        favList2: ['aszalt paradicsom'],
        testingList: [],
    };

    const HegeConfig = {
        userNameToFind: 'Hegedűs Tamás László',
        blacklist: [
            'halfilé', 'halszelet', 'halrud', 'rákragu', 'koktélrák',
            'tonhal', 'szardínia',
            'garnél(a|á)', 'polip', 'kagyló', 'tenger gyümölcs', 'tengeri gyümölcs',
            'gomb(a|á)', 'csiperk(e|é)', 'vargány(a|á)',
            '(sertés|kacsa|liba|csirke|szárnyas).?máj',
            'zúz(a|á)',
            'ceruzabab', 'héjas zöldborsó',
            'Budapest sertés', 'milánói',
        ].concat(FishSpeciesList),
        warnList: ['hal', 'rák', 'máj'],
        blacklistExceptions: ['[^a-z]dhal', 'kagylótészta', 'kultúrák', 'lepkeszegmag'],
        mehList: ['tarhonya', 'főzelék', 'zöldbab', 'csirkeszárny',
            'wok zöldség', 'fahéj', 'kávé',
            'mátrai saláta'],
        favList1: ['kijevi', 'brassói', 'lyoni', 'floridai', 'borzas',
            'szűz', 'chilis bab',
            '^(?!.*leves).*(tepsis|házi|falusi|tejföl).*(burgonya|burgonyá|krumpli)(?!püré)',
            'bors.*(mártás|szósz)',
            '(' + FruitsRegex + '|mézes|édes).*leves',
            'paradicsomleves',
            'tápiókapuding', 'gyümölcsrizs',
            'édesburgony(a|á)',
            'cheddar',
            'padlizsánkrém',
        ],
        favList2: ['hidasi', 'dijoni', 'mátrai',
            '^(?!.*leves).*(grillezett|bacon).*(burgonya|burgonyá|krumpli)(?!püré)',
            'aszalt paradicsom',
            'palak', 'tikka masala',
            'tzatziki', 'tartár', 'majonéz',
            'hagym(a|á)',
            'rózsabors',
            'rétes',
            'burrito', 'quesadilla',
            'coleslaw', 'káposztasaláta',
        ],
        testingList: [],
    };

    const TestUserConfig = {
        userNameToFind: 'Test User - Custom',
        blacklist: ['mushroom', 'salmon', 'shell', '[^\p{L}]egg[^\p{L}]', 'gomb(a|á)', 'lazac', 'kagyló', '[^\p{L}]hal[^\p{L}]'],
        warnList: ['fish', 'egg', 'hal'],
        blacklistExceptions: ['shell pasta', 'fish sauce', 'eggplant', 'kagylótészt(a|á)', 'halszósz'],
        mehList: ['shell pasta', 'fish sauce', 'eggplant', 'tarhonya', 'kelbimbó', 'csirkeszárny'],
        favList1: ['chicken', 'csirk(e|é)'],
        favList2: ['onion', 'hagym(a|á)'],
        testingList: [ /*'a'*/],
    };

    function avgTextLength(elements) {
        if (elements.length === 0)
            return 0;
        let totalLength = 0;
        elements.each(function () {
            totalLength += $(this).text().length;
        });
        return totalLength / elements.length;
    }

    function iife(fn) {
        return fn();
    }

    function sleep(delayMs) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, delayMs);
        });
    }

    async function poll({ fn, interval = 250, timeout, }) {
        const ending = Date.now() + timeout;
        for (let i = 0;; i++) {
            const result = fn(i);
            if (result !== undefined) {
                return result;
            }
            if (Date.now() >= ending) {
                throw new PollTimeoutError();
            }
            await sleep(interval);
        }
    }
    class PollTimeoutError extends Error {
    }

    function unique(items) {
        return Array.from(new Set(items));
    }

    function main() {
        try {
            //alert('Tampermonkey script started...');
            console.log('Tampermonkey script started...');
            const uc = location.href.includes("https://www.teletal.hu") ? getCurrentUserConfig() : getDefaultUserConfig();
            if (location.href.includes("https://www.teletal.hu")) {
                if (uc === undefined) {
                    insertFeedbackText('Tampermonkey script will NOT run. Could not identify user.');
                    return;
                }
                else {
                    insertFeedbackText('Tampermonkey script will run based on the preferences of ' + uc.userNameToFind + '.<br/> '
                        + 'When pressing key 1/2, every visible item\'s title will be evaluated. Results will be indicated by color code / opacity.<br/> '
                        + 'Ingredients check only happens when an item is added to the basket.<br/>');
                }
            }
            else if (uc === undefined) {
                throw new AssistantError('Tampermonkey hiba: alapértelmezett felhasználó nincs definiálva');
            }
            console.log('Food Order Assistant - user name: ' + uc.userNameToFind);
            console.log('Food Order Assistant - user preferences: ' + uc);
            mainWithUserConfig(uc);
        }
        catch (error) {
            console.error('Initialization error', error);
        }
    }
    function getCurrentUserConfig() {
        const UserConfigs = [AndiConfig, HegeConfig];
        let detectedCurrentUserConfig;
        UserConfigs.find(uc => {
            let userNameSpans = $$1('span:contains("' + uc.userNameToFind + '")');
            if (userNameSpans.length > 0) {
                detectedCurrentUserConfig = uc;
                return;
            }
        });
        if (detectedCurrentUserConfig)
            return detectedCurrentUserConfig;
        return getDefaultUserConfig();
    }
    function getDefaultUserConfig() {
        return TestUserConfig;
    }
    class AssistantError extends Error {
    }
    async function checkIngredients($elem, uc) {
        console.log('Menu element tagName:', $elem.prop('tagName') + '; class: ' + $elem.attr('class'));
        const $infoButton = $elem.find('.menu-info-button').first();
        console.log('Info button:' + $infoButton);
        UIkit.toggle($infoButton).toggle(); //.click() did not work
        await sleep(30);
        UIkit.modal('#info-modal').hide();
        const ingredientLabelSpans = await iife(async () => {
            try {
                return await poll({
                    fn: i => {
                        console.log(`Polling ${i}`);
                        //There can be multiple spans if I order a multi course menu. That's why I need a loop
                        const ingredientLabelSpans = $$1('span:contains("Összetevők")');
                        //console.log(ingredientLabelSpans.length);
                        if (ingredientLabelSpans.length >= 1) {
                            return ingredientLabelSpans;
                        }
                    },
                    timeout: 5000,
                });
            }
            catch (error) {
                if (error instanceof PollTimeoutError) {
                    throw new AssistantError('Tampermonkey script hiba: összetevők címke hiányzik!');
                }
                throw error;
            }
        });
        const ingredientsString = jxItems(ingredientLabelSpans).map(currIngredientLabelSpan => {
            const currIngredientsString = currIngredientLabelSpan.next().text();
            if (currIngredientsString.length < 20) {
                throw new AssistantError('Tampermonkey script hiba: összetevők listája hiányzik / túl rövid! ');
            }
            return currIngredientsString + '\n\n';
        }).join('');
        const totalBlacklist = uc.blacklist.concat(uc.warnList);
        const foundItems = unique(totalBlacklist.flatMap(item => {
            //let regex = '[a-z ]*' + item.toLowerCase() + '[a-z ]*';
            const regex = new RegExp('\\b[a-záéíóóöőúüű \p{L}]*' + item.toLowerCase() + '[a-záéíóóöőúüű \p{L}]*\\b', 'g');
            return ingredientsString.toLowerCase().match(regex) ?? [];
        }));
        console.log('founditems: ' + foundItems);
        if (foundItems.length > 0) {
            alert('FIGYELMEZTETÉS: ' + foundItems.join(', ') + '\n\n' + ingredientsString);
            $elem.css('color', 'red');
        }
        else {
            /*if (modal.isToggled()) {
                modal.hide();
            }*/
            $elem.css('color', 'green');
        }
    }
    function fireCheckIngredients($elem, uc) {
        checkIngredients($elem, uc).catch(error => {
            if (error instanceof AssistantError) {
                alert(error.message);
            }
            else {
                console.error(error);
            }
        });
    }
    function mainWithUserConfig(uc) {
        $$1('body').on('click', '.menu-button-plus', function (e) {
            e.preventDefault();
            fireCheckIngredients(jxNthParent($$1(this), 3), uc);
            return false;
        });
        $$1(document).on('keydown', event => {
            const { key } = event;
            if (['1', '2'].includes(key)) {
                checkAllVisibleFoods(Number(key));
            }
        });
        fromEvent(window, 'scroll').pipe(throttleTime(1000, undefined, { leading: false, trailing: true })).subscribe(() => {
            refreshColoring();
        });
        $$1(document).on('loaded', () => {
            refreshColoring();
        });
        function refreshColoring() {
            patchTeletalStyles();
            patchPizzaforteStyles();
            checkAllVisibleFoods(2);
        }
        function checkAllVisibleFoods(acceptanceLevel) {
            console.log('Running checkAllVisibleFoods()');
            let $allVisibleFoods;
            if (location.href.includes("https://www.teletal.hu")) {
                $allVisibleFoods = $$1('.menu-card.uk-card-small'); //looks great
            }
            else if (location.href.includes("https://pizzaforte.hu")) {
                $allVisibleFoods = $$1('.product'); //looks great
            }
            else if (location.href.includes("https://wolt.com")) {
                $allVisibleFoods = $$1('.sc-8c9b94e6-2'); //opacity change works, but no border
            }
            else if (location.href.includes("https://app.ordit.hu")) {
                $allVisibleFoods = $$1('.food-card'); //looks OK
            }
            else if (location.href.includes("https://www.foodora.hu")) {
                $allVisibleFoods = $$1('.product-button-overlay'); //NOT working at all
                //TODO: handle the fact that food name is in aria-label. The value of .text() is empty
            }
            else {
                throw new AssistantError('Tampermonkey script hiba: ismeretlen URL ' + location.href);
            }
            console.log('Number of visible food items: ' + $allVisibleFoods.length + ', avg text() length: ' + avgTextLength($allVisibleFoods));
            for (const $food of jxItems($allVisibleFoods)) {
                const foodText = $food.text();
                const likeLevel = evaluateCardText(foodText, uc, acceptanceLevel);
                switch (foodText) {
                    case LikeLevel.test:
                        console.log('Test result: ' + foodText);
                        break;
                    case LikeLevel.warn:
                        console.log('Warning: ' + foodText);
                        break;
                }
                applyHighlightToCellStyle($food, likeLevel);
            }
        }
    }
    function insertFeedbackText(text) {
        var $mainTable = $$1('section:contains("Reggeli")').first();
        //var $mainTable = $('table:contains("Reggeli")').first();
        //var $mainTable = $('#etlap');
        const $newDiv = $$1('<div><br/>' + text + '</div>');
        $newDiv.css({
            'width': '50%',
            'margin-left': 'auto',
            'margin-right': 'auto', // center the div horizontally
        });
        $newDiv.insertBefore($mainTable);
    }
    main();

})($);
