/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.queryParameters = exports.jsonApiHttpClient = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _HttpError = __webpack_require__(2);

var _HttpError2 = _interopRequireDefault(_HttpError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fetchJson = function fetchJson(url) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var requestHeaders = options.headers || new Headers({
        'Accept': 'application/vnd.api+json'
    });
    if (!(options && options.body && options.body instanceof FormData)) {
        requestHeaders.set('Content-Type', 'application/vnd.api+json');
    }
    if (options.user && options.user.authenticated && options.user.token) {
        requestHeaders.set('Authorization', options.user.token);
    }
    return fetch(url, _extends({}, options, { headers: requestHeaders })).then(function (response) {
        return response.text().then(function (text) {
            return {
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
                body: text
            };
        });
    }).then(function (_ref) {
        var status = _ref.status,
            statusText = _ref.statusText,
            headers = _ref.headers,
            body = _ref.body;

        var json = void 0;
        try {
            json = JSON.parse(body);
        } catch (e) {
            // not json, no big deal
        }
        if (status < 200 || status >= 300) {
            return Promise.reject(new _HttpError2.default(json && json.message || statusText, status));
        }
        return { status: status, headers: headers, body: body, json: json };
    });
};

var jsonApiHttpClient = exports.jsonApiHttpClient = function jsonApiHttpClient(url) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (!options.headers) {
        options.headers = new Headers({ 'Accept': 'application/vnd.api+json' });
    }
    // add your own headers here
    options.headers.set('Content-Type', 'application/vnd.api+json');
    return fetchJson(url, options);
};

var queryParameters = exports.queryParameters = function queryParameters(data) {
    return Object.keys(data).map(function (key) {
        return [key, data[key]].map(encodeURIComponent).join('=');
    }).join('&');
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var GET_LIST = exports.GET_LIST = 'GET_LIST';
var GET_ONE = exports.GET_ONE = 'GET_ONE';
var GET_MANY = exports.GET_MANY = 'GET_MANY';
var GET_MANY_REFERENCE = exports.GET_MANY_REFERENCE = 'GET_MANY_REFERENCE';
var CREATE = exports.CREATE = 'CREATE';
var UPDATE = exports.UPDATE = 'UPDATE';
var DELETE = exports.DELETE = 'DELETE';

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HttpError = function (_Error) {
    _inherits(HttpError, _Error);

    function HttpError(message, status) {
        _classCallCheck(this, HttpError);

        var _this = _possibleConstructorReturn(this, (HttpError.__proto__ || Object.getPrototypeOf(HttpError)).call(this, message));

        _this.message = message;
        _this.status = status;
        _this.name = _this.constructor.name;
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(_this, _this.constructor);
        } else {
            _this.stack = new Error(message).stack;
        }
        _this.stack = new Error().stack;
        return _this;
    }

    return HttpError;
}(Error);

exports.default = HttpError;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _types = __webpack_require__(1);

var _fetch = __webpack_require__(0);

/* eslint-disable */
exports.default = function (apiUrl) {
    var httpClient = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _fetch.jsonApiHttpClient;

    /**
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The REST request params, depending on the type
     * @returns {Object} { url, options } The HTTP request parameters
     */
    var convertRESTRequestToHTTP = function convertRESTRequestToHTTP(type, resource, params) {
        var url = '';
        var options = {};
        switch (type) {
            case _types.GET_LIST:
                var _params$pagination = params.pagination,
                    page = _params$pagination.page,
                    perPage = _params$pagination.perPage;
                var _params$sort = params.sort,
                    field = _params$sort.field,
                    order = _params$sort.order;
                var _params$filter = params.filter,
                    name = _params$filter.name,
                    value = _params$filter.value;

                var _query = {
                    'page[offset]': (page - 1) * perPage,
                    'page[limit]': perPage
                };
                //add filters
                Object.keys(params.filter).forEach(function (key) {
                    var filterField = 'filter[' + key + ']';
                    _query[filterField] = params.filter[key];
                });
                if (order === 'ASC') {
                    _query.sort = field;
                } else {
                    _query.sort = '-' + field;
                }
                url = apiUrl + '/' + resource + '?' + (0, _fetch.queryParameters)(_query);
                break;
            case _types.GET_ONE:
                url = apiUrl + '/' + resource + '/' + params.id;
                break;
            case _types.GET_MANY:
                var _query = { 'filter[id]': params.ids.toString() };
                url = apiUrl + '/' + resource + '?' + (0, _fetch.queryParameters)(_query);
                console.log('GET_MANY url');
                console.log(url);
                break;
            case _types.GET_MANY_REFERENCE:

                break;
            case _types.UPDATE:
                url = apiUrl + '/' + resource + '/' + params.id;
                options.method = 'PATCH';
                var attrs = {};
                Object.keys(params.data.attributes).forEach(function (key) {
                    return attrs[key] = params.data[key];
                });
                var updateParams = { data: { type: resource, id: params.id, attributes: attrs } };
                options.body = JSON.stringify(updateParams);
                break;
            case _types.CREATE:
                url = apiUrl + '/' + resource;
                options.method = 'POST';
                var createParams = { data: { type: resource, attributes: params.data } };
                options.body = JSON.stringify(createParams);
                break;
            case _types.DELETE:
                url = apiUrl + '/' + resource + '/' + params.id;
                options.method = 'DELETE';
                break;
            default:
                throw new Error('Unsupported fetch action type ' + type);
        }
        return { url: url, options: options };
    };

    /**
     * @param {Object} response HTTP response from fetch()
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The REST request params, depending on the type
     * @returns {Object} REST response
     */
    var convertHTTPResponseToREST = function convertHTTPResponseToREST(response, type, resource, params) {
        var headers = response.headers,
            json = response.json;

        switch (type) {
            case _types.GET_LIST:
                var jsonData = json.data.map(function (dic) {
                    return Object.assign({ id: dic.id }, dic.attributes);
                });
                return { data: jsonData, total: json.meta['record-count'] };
            case _types.GET_MANY_REFERENCE:
                return;
            case _types.UPDATE:
            case _types.CREATE:
                return { data: Object.assign({ id: json.data.id }, json.data.attributes) };
            case _types.DELETE:
                return { data: json };
            default:
                return { data: json.data };
        }
    };

    /**
     * @param {string} type Request type, e.g GET_LIST
     * @param {string} resource Resource name, e.g. "posts"
     * @param {Object} payload Request parameters. Depends on the request type
     * @returns {Promise} the Promise for a REST response
     */
    return function (type, resource, params) {
        var _convertRESTRequestTo = convertRESTRequestToHTTP(type, resource, params),
            url = _convertRESTRequestTo.url,
            options = _convertRESTRequestTo.options;

        return httpClient(url, options).then(function (response) {
            return convertHTTPResponseToREST(response, type, resource, params);
        });
    };
};

/***/ })
/******/ ]);