/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 76);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Level; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return init; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return log; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getLogs; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);

var LEVEL_STR = "level";
var Level;
(function (Level) {
    Level[Level["DEBUG"] = 0] = "DEBUG";
    Level[Level["INFO"] = 1] = "INFO";
    Level[Level["WARN"] = 2] = "WARN";
})(Level || (Level = {}));
;
var logLevel = Level.WARN;
var pendingLines = [];
var process = "";
function addListener() {
    browser.storage.onChanged.addListener(function (changes) {
        var levelChange = _utils__WEBPACK_IMPORTED_MODULE_0__[/* getSafe */ "j"](function () { return changes[LEVEL_STR].newValue; });
        if (levelChange) {
            console.log("[Diagnostics] level-changed: " + levelChange);
            logLevel = Level[levelChange];
        }
    });
}
function trimDiagnostics(diagnostics) {
    if (diagnostics !== undefined) {
        var entries = diagnostics.split("\n").length;
        if (entries > 100) {
            return diagnostics.replace(/(.*\n){50}/, "");
        }
        else {
            return diagnostics;
        }
    }
    return "";
}
function appendStorage(lines) {
    var diagString = "diagnostics" + process;
    return _utils__WEBPACK_IMPORTED_MODULE_0__[/* storageGet */ "m"](diagString).then(function (result) {
        var diagnostics = trimDiagnostics(result[diagString]);
        var newLines = lines.join("");
        return diagnostics + newLines;
    }).then(function (newDiagnostics) {
        return _utils__WEBPACK_IMPORTED_MODULE_0__[/* storageSet */ "o"](diagString, newDiagnostics);
    });
}
function logStorage(message) {
    if (pendingLines.push(message + "\n") >= 10) {
        appendStorage(pendingLines.slice());
        pendingLines = [];
    }
}
function logConsoleWarn(message) {
    console.warn(message);
}
function logConsoleInfo(message) {
    console.log(message);
}
function getTimeString() {
    var currentTime = new Date();
    return currentTime.getHours() + ":" + currentTime.getMinutes() + ":" + currentTime.getSeconds();
}
function logOutputs(level, message) {
    var timeString = getTimeString();
    var line = "[TB] " + Level[level] + " :" + timeString + " - " + message;
    if (level == Level.WARN) {
        logConsoleWarn(line);
    }
    else {
        logConsoleInfo(line);
    }
    logStorage(line);
}
function init(src) {
    addListener();
    process = src;
    _utils__WEBPACK_IMPORTED_MODULE_0__[/* storageGet */ "m"](LEVEL_STR).then(function (result) {
        var level = result[LEVEL_STR];
        if (level !== undefined) {
            logLevel = level;
        }
    });
}
function log(level, message) {
    var currentLevel = logLevel;
    var shouldLog = (level == Level.WARN) || (currentLevel == Level.DEBUG) ||
        (currentLevel == Level.INFO && level != Level.DEBUG);
    if (shouldLog) {
        logOutputs(level, message);
    }
}
function getLogs() {
    return appendStorage(pendingLines).then(function () {
        return _utils__WEBPACK_IMPORTED_MODULE_0__[/* storageGetAll */ "n"]();
    }).then(function (result) {
        return result.diagnosticsBackground;
    });
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return getMonthString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return dateOlderThan; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return storageGetAll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return storageGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return storageSet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return storageClear; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BrowserType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return getBrowserType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return getBrowserTitle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return PlatformClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return getPlatformClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return isScreenRetina; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return versionString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return getCountryName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return getSafe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return delayPromise; });
///<reference types="web-ext-types"/>
/**********************************
  Months
 **********************************/
var months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
function getMonthString() {
    return months[(new Date).getMonth()];
}
function dateOlderThan(date, days) {
    var currentDate = Date.now();
    var daysToMs = days * 24 * 60 * 60 * 1000;
    var currentMinusDays = currentDate - daysToMs;
    return currentMinusDays > date;
}
/**********************************
  Storage
 **********************************/
function storageGetAll() {
    return browser.storage.local.get();
}
function storageGet(key) {
    return browser.storage.local.get(key);
}
function storageSet(keyStr, value) {
    var _a;
    return browser.storage.local.set((_a = {}, _a[keyStr] = value, _a));
}
function storageClear() {
    return browser.storage.local.clear();
}
/**********************************
  Browser and System Properties
 **********************************/
var BrowserType;
(function (BrowserType) {
    BrowserType[BrowserType["OPERA"] = 0] = "OPERA";
    BrowserType[BrowserType["FIREFOX"] = 1] = "FIREFOX";
    BrowserType[BrowserType["CHROME"] = 2] = "CHROME";
})(BrowserType || (BrowserType = {}));
function getBrowserType() {
    if (navigator.userAgent.indexOf("OPR") >= 0 || navigator.userAgent.indexOf("Opera") >= 0) {
        return BrowserType.OPERA;
    }
    else if (navigator.userAgent.indexOf("Firefox") >= 0) {
        return BrowserType.FIREFOX;
    }
    else {
        return BrowserType.CHROME;
    }
}
function getBrowserTitle() {
    var browser = getBrowserType();
    switch (browser) {
        case BrowserType.FIREFOX:
            return "Firefox";
        case BrowserType.OPERA:
            return "Opera";
        default:
            return "Chrome";
    }
}
var PlatformClass;
(function (PlatformClass) {
    PlatformClass["WINDOWS"] = "Windows";
    PlatformClass["LINUX"] = "Linux";
    PlatformClass["MAC"] = "Mac";
})(PlatformClass || (PlatformClass = {}));
function getPlatformClass() {
    if (window.navigator.platform.indexOf("Win") != -1) {
        return PlatformClass.WINDOWS;
    }
    else if (window.navigator.platform.indexOf("Linux") != -1) {
        return PlatformClass.LINUX;
    }
    return PlatformClass.MAC;
}
function isScreenRetina() {
    return window.devicePixelRatio > 1;
}
var versionString = (function () {
    var prefix = (getBrowserType() === BrowserType.FIREFOX) ? "f" :
        (getBrowserType() === BrowserType.CHROME) ? "c" : "o";
    var number = browser.runtime.getManifest().version;
    return prefix + number;
})();
/**********************************
  Country Names
 **********************************/
function getCountryName(countryCode) {
    if (isoCountries.hasOwnProperty(countryCode)) {
        return isoCountries[countryCode];
    }
    else {
        return countryCode;
    }
}
var isoCountries = {
    'AF': 'Afghanistan',
    'AX': 'Aland Islands',
    'AL': 'Albania',
    'DZ': 'Algeria',
    'AS': 'American Samoa',
    'AD': 'Andorra',
    'AO': 'Angola',
    'AI': 'Anguilla',
    'AQ': 'Antarctica',
    'AG': 'Antigua And Barbuda',
    'AR': 'Argentina',
    'AM': 'Armenia',
    'AW': 'Aruba',
    'AU': 'Australia',
    'AT': 'Austria',
    'AZ': 'Azerbaijan',
    'BS': 'Bahamas',
    'BH': 'Bahrain',
    'BD': 'Bangladesh',
    'BB': 'Barbados',
    'BY': 'Belarus',
    'BE': 'Belgium',
    'BZ': 'Belize',
    'BJ': 'Benin',
    'BM': 'Bermuda',
    'BT': 'Bhutan',
    'BO': 'Bolivia',
    'BA': 'Bosnia And Herzegovina',
    'BW': 'Botswana',
    'BV': 'Bouvet Island',
    'BR': 'Brazil',
    'IO': 'British Indian Ocean Territory',
    'BN': 'Brunei Darussalam',
    'BG': 'Bulgaria',
    'BF': 'Burkina Faso',
    'BI': 'Burundi',
    'KH': 'Cambodia',
    'CM': 'Cameroon',
    'CA': 'Canada',
    'CV': 'Cape Verde',
    'KY': 'Cayman Islands',
    'CF': 'Central African Republic',
    'TD': 'Chad',
    'CL': 'Chile',
    'CN': 'China',
    'CX': 'Christmas Island',
    'CC': 'Cocos (Keeling) Islands',
    'CO': 'Colombia',
    'KM': 'Comoros',
    'CG': 'Congo',
    'CD': 'Congo, Democratic Republic',
    'CK': 'Cook Islands',
    'CR': 'Costa Rica',
    'CI': 'Cote D\'Ivoire',
    'HR': 'Croatia',
    'CU': 'Cuba',
    'CY': 'Cyprus',
    'CZ': 'Czech Republic',
    'DK': 'Denmark',
    'DJ': 'Djibouti',
    'DM': 'Dominica',
    'DO': 'Dominican Republic',
    'EC': 'Ecuador',
    'EG': 'Egypt',
    'SV': 'El Salvador',
    'GQ': 'Equatorial Guinea',
    'ER': 'Eritrea',
    'EE': 'Estonia',
    'ET': 'Ethiopia',
    'FK': 'Falkland Islands (Malvinas)',
    'FO': 'Faroe Islands',
    'FJ': 'Fiji',
    'FI': 'Finland',
    'FR': 'France',
    'GF': 'French Guiana',
    'PF': 'French Polynesia',
    'TF': 'French Southern Territories',
    'GA': 'Gabon',
    'GM': 'Gambia',
    'GE': 'Georgia',
    'DE': 'Germany',
    'GH': 'Ghana',
    'GI': 'Gibraltar',
    'GR': 'Greece',
    'GL': 'Greenland',
    'GD': 'Grenada',
    'GP': 'Guadeloupe',
    'GU': 'Guam',
    'GT': 'Guatemala',
    'GG': 'Guernsey',
    'GN': 'Guinea',
    'GW': 'Guinea-Bissau',
    'GY': 'Guyana',
    'HT': 'Haiti',
    'HM': 'Heard Island & Mcdonald Islands',
    'VA': 'Holy See (Vatican City State)',
    'HN': 'Honduras',
    'HK': 'Hong Kong',
    'HU': 'Hungary',
    'IS': 'Iceland',
    'IN': 'India',
    'ID': 'Indonesia',
    'IR': 'Iran, Islamic Republic Of',
    'IQ': 'Iraq',
    'IE': 'Ireland',
    'IM': 'Isle Of Man',
    'IL': 'Israel',
    'IT': 'Italy',
    'JM': 'Jamaica',
    'JP': 'Japan',
    'JE': 'Jersey',
    'JO': 'Jordan',
    'KZ': 'Kazakhstan',
    'KE': 'Kenya',
    'KI': 'Kiribati',
    'KR': 'Korea',
    'KW': 'Kuwait',
    'KG': 'Kyrgyzstan',
    'LA': 'Lao People\'s Democratic Republic',
    'LV': 'Latvia',
    'LB': 'Lebanon',
    'LS': 'Lesotho',
    'LR': 'Liberia',
    'LY': 'Libyan Arab Jamahiriya',
    'LI': 'Liechtenstein',
    'LT': 'Lithuania',
    'LU': 'Luxembourg',
    'MO': 'Macao',
    'MK': 'Macedonia',
    'MG': 'Madagascar',
    'MW': 'Malawi',
    'MY': 'Malaysia',
    'MV': 'Maldives',
    'ML': 'Mali',
    'MT': 'Malta',
    'MH': 'Marshall Islands',
    'MQ': 'Martinique',
    'MR': 'Mauritania',
    'MU': 'Mauritius',
    'YT': 'Mayotte',
    'MX': 'Mexico',
    'FM': 'Micronesia, Federated States Of',
    'MD': 'Moldova',
    'MC': 'Monaco',
    'MN': 'Mongolia',
    'ME': 'Montenegro',
    'MS': 'Montserrat',
    'MA': 'Morocco',
    'MZ': 'Mozambique',
    'MM': 'Myanmar',
    'NA': 'Namibia',
    'NR': 'Nauru',
    'NP': 'Nepal',
    'NL': 'Netherlands',
    'AN': 'Netherlands Antilles',
    'NC': 'New Caledonia',
    'NZ': 'New Zealand',
    'NI': 'Nicaragua',
    'NE': 'Niger',
    'NG': 'Nigeria',
    'NU': 'Niue',
    'NF': 'Norfolk Island',
    'MP': 'Northern Mariana Islands',
    'NO': 'Norway',
    'OM': 'Oman',
    'PK': 'Pakistan',
    'PW': 'Palau',
    'PS': 'Palestinian Territory, Occupied',
    'PA': 'Panama',
    'PG': 'Papua New Guinea',
    'PY': 'Paraguay',
    'PE': 'Peru',
    'PH': 'Philippines',
    'PN': 'Pitcairn',
    'PL': 'Poland',
    'PT': 'Portugal',
    'PR': 'Puerto Rico',
    'QA': 'Qatar',
    'RE': 'Reunion',
    'RO': 'Romania',
    'RU': 'Russian Federation',
    'RW': 'Rwanda',
    'BL': 'Saint Barthelemy',
    'SH': 'Saint Helena',
    'KN': 'Saint Kitts And Nevis',
    'LC': 'Saint Lucia',
    'MF': 'Saint Martin',
    'PM': 'Saint Pierre And Miquelon',
    'VC': 'Saint Vincent And Grenadines',
    'WS': 'Samoa',
    'SM': 'San Marino',
    'ST': 'Sao Tome And Principe',
    'SA': 'Saudi Arabia',
    'SN': 'Senegal',
    'RS': 'Serbia',
    'SC': 'Seychelles',
    'SL': 'Sierra Leone',
    'SG': 'Singapore',
    'SK': 'Slovakia',
    'SI': 'Slovenia',
    'SB': 'Solomon Islands',
    'SO': 'Somalia',
    'ZA': 'South Africa',
    'GS': 'South Georgia And Sandwich Isl.',
    'ES': 'Spain',
    'LK': 'Sri Lanka',
    'SD': 'Sudan',
    'SR': 'Suriname',
    'SJ': 'Svalbard And Jan Mayen',
    'SZ': 'Swaziland',
    'SE': 'Sweden',
    'CH': 'Switzerland',
    'SY': 'Syrian Arab Republic',
    'TW': 'Taiwan',
    'TJ': 'Tajikistan',
    'TZ': 'Tanzania',
    'TH': 'Thailand',
    'TL': 'Timor-Leste',
    'TG': 'Togo',
    'TK': 'Tokelau',
    'TO': 'Tonga',
    'TT': 'Trinidad And Tobago',
    'TN': 'Tunisia',
    'TR': 'Turkey',
    'TM': 'Turkmenistan',
    'TC': 'Turks And Caicos Islands',
    'TV': 'Tuvalu',
    'UG': 'Uganda',
    'UA': 'Ukraine',
    'AE': 'United Arab Emirates',
    'GB': 'United Kingdom',
    'US': 'United States',
    'UM': 'United States Outlying Islands',
    'UY': 'Uruguay',
    'UZ': 'Uzbekistan',
    'VU': 'Vanuatu',
    'VE': 'Venezuela',
    'VN': 'Viet Nam',
    'VG': 'Virgin Islands, British',
    'VI': 'Virgin Islands, U.S.',
    'WF': 'Wallis And Futuna',
    'EH': 'Western Sahara',
    'YE': 'Yemen',
    'ZM': 'Zambia',
    'ZW': 'Zimbabwe'
};
/**********************************
  Misc Helper Functions
 **********************************/
function getSafe(fn) {
    try {
        return fn();
    }
    catch (e) {
        return undefined;
    }
}
function delayPromise(time) {
    return function (result) { return new Promise(function (resolve) { return setTimeout(function () { return resolve(result); }, time); }); };
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PortName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return init; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return sendMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return setup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return subscribeTo; });
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);

function log(level, message) {
    Object(_logger__WEBPACK_IMPORTED_MODULE_0__[/* log */ "d"])(level, "[Common - Ports] " + message);
}
var PortName;
(function (PortName) {
    PortName["REVIEW"] = "REVIEW";
    PortName["SETTINGS"] = "SETTINGS";
    PortName["LOCATION"] = "LOCATION";
    PortName["APP_STATE"] = "APP_STATE";
    PortName["REGISTER"] = "REGISTER";
    PortName["UPGRADE"] = "UPGRADE";
    PortName["BROWSER"] = "BROWSER";
    PortName["POPUP_STATE"] = "POPUP_STATE";
})(PortName || (PortName = {}));
var ports = new Map();
var listeners = new Map();
var persistent = false;
// Common
function init(persist) {
    persistent = persist;
    browser.runtime.onConnect.addListener(function (port) {
        if (persistent) {
            log(_logger__WEBPACK_IMPORTED_MODULE_0__[/* Level */ "a"].DEBUG, " got port " + port.name);
            ports.set(PortName[port.name], port);
            port.onDisconnect.addListener(function (port) {
                disconnectHandler(PortName[port.name]);
            });
            port.onMessage.addListener(makeMessageHandler(PortName[port.name]));
        }
    });
}
function sendMessage(portName, message) {
    var port = ports.get(portName);
    if (port !== undefined) {
        port.postMessage(message);
    }
}
// Sender setup
function setup(portName, callback) {
    var port = browser.runtime.connect(undefined, { name: portName });
    ports.set(portName, port);
    port.onMessage.addListener(callback);
}
// Receiver setup
function disconnectHandler(portName) {
    ports.delete(portName);
}
function subscribeTo(portName, callback) {
    listeners.set(portName, callback);
}
function makeMessageHandler(portName) {
    return function (message) {
        var listener = listeners.get(portName);
        log(_logger__WEBPACK_IMPORTED_MODULE_0__[/* Level */ "a"].DEBUG, "[" + portName + "] got message: " + message);
        if (listener !== undefined) {
            listener(portName, message);
        }
    };
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(13);
var isBuffer = __webpack_require__(55);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(3);
var normalizeHeaderName = __webpack_require__(53);

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(12);
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(12);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(14)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(56);

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(51);

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);
var settle = __webpack_require__(52);
var buildURL = __webpack_require__(50);
var parseHeaders = __webpack_require__(49);
var isURLSameOrigin = __webpack_require__(48);
var createError = __webpack_require__(11);
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(47);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if ("production" !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(46);

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(9);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);
var transformData = __webpack_require__(43);
var isCancel = __webpack_require__(10);
var defaults = __webpack_require__(7);
var isAbsoluteURL = __webpack_require__(42);
var combineURLs = __webpack_require__(41);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(11);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(7);
var utils = __webpack_require__(3);
var InterceptorManager = __webpack_require__(45);
var dispatchRequest = __webpack_require__(44);

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, {method: 'get'}, this.defaults, config);
  config.method = config.method.toLowerCase();

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),
/* 55 */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);
var bind = __webpack_require__(13);
var Axios = __webpack_require__(54);
var defaults = __webpack_require__(7);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(9);
axios.CancelToken = __webpack_require__(40);
axios.isCancel = __webpack_require__(10);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(39);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/common/logger.ts
var logger = __webpack_require__(0);

// EXTERNAL MODULE: ./src/common/utils.ts
var utils = __webpack_require__(1);

// EXTERNAL MODULE: ./src/common/ports.ts
var ports = __webpack_require__(2);

// EXTERNAL MODULE: ./node_modules/axios/index.js
var axios = __webpack_require__(8);
var axios_default = /*#__PURE__*/__webpack_require__.n(axios);

// CONCATENATED MODULE: ./src/common/ajax-helper.ts



function log(level, message) {
    logger["d" /* log */](level, "[Ajax-Helper] " + message);
}
var CSRFToken = "";
var rateLimitCount = 20;
var rateLimitExpiry = 30;
var maxNbCalls = 40;
var lastCalls = [];
function addCall(url) {
    lastCalls.push({ url: url, time: Date.now() });
}
function trimCalls() {
    if (lastCalls.length > maxNbCalls) {
        log(logger["a" /* Level */].DEBUG, "------- trimming calls -------");
        lastCalls.shift();
    }
}
function isRecentCall(call, url) {
    var sameKey = url === call.url;
    var diffSeconds = (Date.now() - call.time) / 1000;
    var isRecent = diffSeconds < rateLimitExpiry;
    return sameKey && isRecent;
}
function canCall(url) {
    trimCalls();
    var callOccurences = lastCalls.filter(function (call) { return isRecentCall(call, url); }).length;
    log(logger["a" /* Level */].DEBUG, "call occurrences for " + url + " is: " + callOccurences);
    if (callOccurences > rateLimitCount) {
        return false;
    }
    return true;
}
axios_default.a.interceptors.request.use(function (config) {
    config.headers["tb-csrf-token"] = CSRFToken;
    if (utils["f" /* getBrowserType */]() === utils["a" /* BrowserType */].FIREFOX) {
        config.headers["tb-origin"] = browser.runtime.getURL("");
    }
    return config;
});
axios_default.a.interceptors.response.use(function (response) {
    var token = response.headers["tb-csrf-token"];
    CSRFToken = token;
    return response;
});
function makeAjaxRequest(method, req) {
    if (!req.ignoreRateLimiting) {
        addCall(req.url);
    }
    if (!req.ignoreRateLimiting && !canCall(req.url)) {
        log(logger["a" /* Level */].WARN, "rate limiting call made to : " + req.url);
        return Promise.reject("rate limited call to : " + req.url);
    }
    var config = {
        method: method,
        url: req.url,
        responseType: "json"
    };
    if (req.params !== undefined) {
        config.params = req.params;
    }
    if (req.timeout !== undefined) {
        config.timeout = req.timeout;
    }
    if (req.data !== undefined) {
        config.data = req.data;
    }
    log(logger["a" /* Level */].DEBUG, "call made to : " + req.url);
    return axios_default.a(config);
}
function post(req) {
    return makeAjaxRequest("post", req);
}
function get(req) {
    return makeAjaxRequest("get", req);
}

// CONCATENATED MODULE: ./src/background/state.ts
///<reference path="../../typings/tunnelbear/index.d.ts"/>
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ValueWatcher = /** @class */ (function () {
    function ValueWatcher(initialValue) {
        this.watchFunctions = new Map();
        this.internalValue = initialValue;
    }
    ValueWatcher.prototype.addWatch = function (name, watcher) {
        this.watchFunctions.set(name, watcher);
    };
    ValueWatcher.prototype.triggerWatch = function () {
        var _this = this;
        this.watchFunctions.forEach(function (func) { return func(_this.internalValue); });
    };
    Object.defineProperty(ValueWatcher.prototype, "value", {
        get: function () {
            return this.internalValue;
        },
        set: function (newValue) {
            this.internalValue = newValue;
            if (newValue !== undefined) {
                this.triggerWatch();
            }
        },
        enumerable: true,
        configurable: true
    });
    return ValueWatcher;
}());
var defaultRegReponse = {
    emailConfirmed: "1",
    fullVersion: "1",
    templateTweet: "",
    dataCap: "3000000000000",
    dataAllowed: "3000000000000",
    vpnServers: [],
    countryInfo: [{ code: 0, iso: "US", lat: 37, lon: -95.7, enabled: true, paidOnly: false }],
    twitterPromo: "1",
    twitterPromoEnabled: false,
    status: "OK",
    message: ""
};
var RegResponseWatcher = /** @class */ (function (_super) {
    __extends(RegResponseWatcher, _super);
    function RegResponseWatcher() {
        var _this = _super.call(this, defaultRegReponse) || this;
        _this.registeredCountry = -1;
        return _this;
    }
    RegResponseWatcher.prototype.isNil = function () {
        return this.internalValue === undefined;
    };
    RegResponseWatcher.prototype.resetDefaultValue = function () {
        this.internalValue = defaultRegReponse;
    };
    Object.defineProperty(RegResponseWatcher.prototype, "emailConfirmed", {
        // Getters
        get: function () {
            return this.internalValue.emailConfirmed === "1";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegResponseWatcher.prototype, "fullVersion", {
        get: function () {
            return this.internalValue.fullVersion === "1";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegResponseWatcher.prototype, "templateTweet", {
        get: function () {
            return this.internalValue.templateTweet;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegResponseWatcher.prototype, "dataCap", {
        get: function () {
            return Number(this.internalValue.dataCap);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegResponseWatcher.prototype, "dataAllowed", {
        get: function () {
            return Number(this.internalValue.dataAllowed);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegResponseWatcher.prototype, "vpnServers", {
        get: function () {
            return this.internalValue.vpnServers;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegResponseWatcher.prototype, "countryInfo", {
        get: function () {
            return this.internalValue.countryInfo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegResponseWatcher.prototype, "twitterPromo", {
        get: function () {
            return this.internalValue.twitterPromo === "1";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegResponseWatcher.prototype, "twitterPromoEnabled", {
        get: function () {
            return this.internalValue.twitterPromoEnabled;
        },
        enumerable: true,
        configurable: true
    });
    return RegResponseWatcher;
}(ValueWatcher));
var regResponse = new RegResponseWatcher();
var AppStateWatcher = /** @class */ (function (_super) {
    __extends(AppStateWatcher, _super);
    function AppStateWatcher() {
        return _super.call(this, {
            country: 0,
            permissions: { error: false, details: "" },
            originLocation: { latitude: 0, longitude: 0, city: "", countryName: "" },
            lastServers: { country: -1, servers: [] },
            toggled: false,
            canShowTwitter: true
        }) || this;
    }
    Object.defineProperty(AppStateWatcher.prototype, "country", {
        // Getters
        get: function () {
            return this.internalValue.country;
        },
        // Setters
        set: function (country) {
            this.internalValue.country = country;
            this.triggerWatch();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppStateWatcher.prototype, "permissions", {
        get: function () {
            return this.internalValue.permissions;
        },
        set: function (permissions) {
            this.internalValue.permissions = permissions;
            this.triggerWatch();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppStateWatcher.prototype, "originLocation", {
        get: function () {
            return this.internalValue.originLocation;
        },
        set: function (location) {
            this.internalValue.originLocation = location;
            this.triggerWatch();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppStateWatcher.prototype, "lastServers", {
        get: function () {
            return this.internalValue.lastServers;
        },
        set: function (serversInfo) {
            this.internalValue.lastServers = serversInfo;
            this.triggerWatch();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppStateWatcher.prototype, "toggled", {
        get: function () {
            return this.internalValue.toggled;
        },
        set: function (toggled) {
            this.internalValue.toggled = toggled;
            this.triggerWatch();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppStateWatcher.prototype, "canShowTwitter", {
        get: function () {
            return this.internalValue.canShowTwitter;
        },
        set: function (canShowTwitter) {
            this.internalValue.canShowTwitter = canShowTwitter;
            this.triggerWatch();
        },
        enumerable: true,
        configurable: true
    });
    return AppStateWatcher;
}(ValueWatcher));
var appState = new AppStateWatcher();
function getPopupState() {
    var countries = regResponse.countryInfo;
    return {
        isToggled: appState.toggled,
        countries: countries,
        selectedCountry: countries.filter(function (country) { return country.code === appState.country; })[0],
        emailConfirmed: regResponse.emailConfirmed,
        isFullVersion: regResponse.fullVersion,
        twitterPromo: regResponse.twitterPromo,
        twitterPromoEnabled: regResponse.twitterPromoEnabled,
        canShowTwitter: appState.canShowTwitter,
        dataCap: regResponse.dataCap,
        dataAllowed: regResponse.dataAllowed,
        permissionsError: appState.permissions
    };
}

// CONCATENATED MODULE: ./src/background/tabs.ts

var BASE_URL = "https://www.tunnelbear.com";
var HELP_URL = "https://help.tunnelbear.com";
function outOfData() {
    browser.tabs.create({ url: BASE_URL + "/account/upgrade?notice=no_data&v=" + utils["p" /* versionString */] });
}
function lowAccount(emailConfirmed) {
    if (emailConfirmed === true) {
        browser.tabs.create({ url: BASE_URL + "/account/upgrade?notice=low_data&v=" + utils["p" /* versionString */] });
    }
    else {
        browser.tabs.create({ url: BASE_URL + "/account/upgrade?v=" + utils["p" /* versionString */] });
    }
}
function upgradeAccount() {
    browser.tabs.create({ url: BASE_URL + "/account/upgrade?v=" + utils["p" /* versionString */] });
}
function openHelp() {
    browser.tabs.create({ url: HELP_URL });
}
function openAccount() {
    browser.tabs.create({ url: BASE_URL + "/account/overview" });
}
function openFeedback() {
    browser.tabs.create({ url: BASE_URL + "/support/contact.html" });
}
function openReview() {
    if (utils["f" /* getBrowserType */]() === utils["a" /* BrowserType */].OPERA) {
        browser.tabs.create({ url: "https://addons.opera.com/extensions/details/tunnelbear/" });
    }
    else if (utils["f" /* getBrowserType */]() === utils["a" /* BrowserType */].CHROME) {
        browser.tabs.create({ url: "https://chrome.google.com/webstore/detail/tunnelbear/" + browser.runtime.id + "/reviews" });
    }
    else {
        browser.tabs.create({ url: "https://addons.mozilla.org/en-US/firefox/addon/" + "tunnelbear-vpn-firefox" });
    }
}
function openExtensions() {
    if (utils["f" /* getBrowserType */]() === utils["a" /* BrowserType */].CHROME) {
        browser.tabs.create({ url: "chrome://extensions/?id=" + browser.runtime.id });
    }
    else if (utils["f" /* getBrowserType */]() === utils["a" /* BrowserType */].OPERA) {
        browser.tabs.create({ url: "opera://extensions" });
    }
    else {
        browser.tabs.create({ url: "about:addons" });
    }
}
function openPrivacyPolicy() {
    browser.tabs.create({ url: BASE_URL + "/privacy-policy" });
}
function openTwitter(tweet) {
    browser.tabs.update(undefined, { url: "https://twitter.com/intent/tweet?text=" + tweet });
}
function openAccountTweet() {
    browser.tabs.create({ url: BASE_URL + "/account/twitter" });
}
function openLogin() {
    browser.tabs.create({ url: BASE_URL + "/account/login?v=" + utils["p" /* versionString */] });
}
function openSignup() {
    browser.tabs.create({ url: BASE_URL + "/account/signup?v=" + utils["p" /* versionString */] });
}
function uninstallFeedbackUrl() {
    return BASE_URL + "/account/feedback";
}

// CONCATENATED MODULE: ./src/background/api.ts






function api_log(level, message) {
    logger["d" /* log */](level, "[API] " + message);
}
var TBEAR_BASE_API_URL = "https://api.tunnelbear.com";
function uuid() {
    var nums = function (len) { return Array(len).fill(16).map(function (n) { return Math.floor((Math.random() * n)); }); };
    return nums(8).concat(["-"])
        .concat(nums(4)).concat(["-4"])
        .concat(nums(3)).concat(["-"])
        .concat([(0x8 | (0x3 & Math.floor(Math.random() * 16)))])
        .concat(nums(3)).concat(["-"])
        .concat(nums(12))
        .map(function (element) { return String(element); })
        .join("");
}
function persistResponse(response, country) {
    api_log(logger["a" /* Level */].DEBUG, response.status + " " + JSON.stringify(response.message));
    regResponse.value = response;
    regResponse.registeredCountry = country;
    return response;
}
var registerErrorHandler = function () { };
function setRegisterErrorHandler(actions) {
    registerErrorHandler = actions;
}
function callRegisterErrorHandler(error) {
    if (error.response !== undefined) {
        var status_1 = error.response.status;
        var statusText = error.response.statusText;
        api_log(logger["a" /* Level */].WARN, "Register Error: " + status_1 + " " + statusText);
        if (status_1 === 403) {
            registerErrorHandler();
        }
    }
    else {
        api_log(logger["a" /* Level */].WARN, "Register error: unable to reach server");
    }
}
function registerIgnoreErrors(country) {
    api_log(logger["a" /* Level */].DEBUG, "register ignoring errors " + country + " " + deviceId);
    return post({
        url: TBEAR_BASE_API_URL + "/core/register",
        params: {
            "json": "1",
            "v": utils["p" /* versionString */],
            "country": country,
            "deviceId": deviceId,
            "getToken": false
        }
    }).then(function (response) {
        return persistResponse(response.data, country);
    });
}
function register(getToken, country) {
    api_log(logger["a" /* Level */].DEBUG, "register params " + utils["p" /* versionString */] + " " + country + " " + deviceId);
    return post({
        url: TBEAR_BASE_API_URL + "/core/register",
        params: {
            "json": "1",
            "v": utils["p" /* versionString */],
            "country": country,
            "deviceId": deviceId,
            "getToken": getToken
        }
    }).then(function (response) {
        return persistResponse(response.data, country);
    }).catch(function (error) {
        callRegisterErrorHandler(error);
        throw error;
    });
}
function api_location() {
    return new Promise(function (resolve, reject) {
        // Give the proxy some time to change
        setTimeout(function () {
            get({
                url: TBEAR_BASE_API_URL + "/core/bearsmyip/location",
                timeout: 3000
            }).then(function (response) {
                resolve(response.data);
            }).catch(function (error) {
                reject(error);
            });
        }, 200);
    });
}
function sendFeedback() {
    logger["b" /* getLogs */]().then(function (background) {
        var formData = new FormData();
        formData.append("v", utils["p" /* versionString */]);
        formData.append("feedback", "");
        formData.append("data", background);
        post({
            url: TBEAR_BASE_API_URL + "/core/api/uploadLogsText",
            data: formData,
            timeout: 2000
        });
    });
}
function logout() {
    post({
        url: TBEAR_BASE_API_URL + "/core/api/logout"
    }).catch(function () {
        api_log(logger["a" /* Level */].WARN, "Logout error: unable to reach server");
    }).then(function () {
        regResponse.resetDefaultValue();
        utils["l" /* storageClear */]();
        openLogin();
    });
}
function testCall() {
    get({ url: "https://tunnelbear.com/core/status" });
}
var deviceId = "";
function init() {
    regResponse.addWatch("reg-watcher-api", function () {
        ports["c" /* sendMessage */](ports["a" /* PortName */].POPUP_STATE, getPopupState());
    });
    utils["m" /* storageGet */]("deviceId").then(function (result) {
        var storedDeviceId = result.deviceId;
        if (storedDeviceId !== undefined) {
            deviceId = storedDeviceId;
        }
        else {
            deviceId = uuid();
            utils["o" /* storageSet */]("deviceId", deviceId);
        }
    });
}

// CONCATENATED MODULE: ./src/background/token-manager.ts



function token_manager_log(level, message) {
    logger["d" /* log */](level, "[Token-Manager] " + message);
}
var token_manager_TokenManager = /** @class */ (function () {
    function TokenManager() {
        this.currentToken = "";
        this.currentProxies = new Map();
        this.registerPromise = undefined;
        this.requestInProgress = false;
    }
    TokenManager.prototype.logout = function () {
        this.currentToken = "";
        this.currentProxies.clear();
    };
    TokenManager.prototype.getToken = function (proxy) {
        var proxyToken = this.currentProxies.get(proxy);
        token_manager_log(logger["a" /* Level */].INFO, "[Get-Token] - current token for " + proxy + " " + proxyToken);
        if (this.currentToken === "") {
            return this.newToken(proxy);
        }
        return this.validateToken(proxy, proxyToken);
    };
    TokenManager.prototype.newToken = function (proxy) {
        var _this = this;
        if (this.requestInProgress === false || this.registerPromise === undefined) {
            token_manager_log(logger["a" /* Level */].INFO, "Fetching new token for " + proxy);
            this.requestInProgress = true;
            this.registerPromise = register(true, appState.country).then(function (response) {
                _this.requestInProgress = false;
                var status = response.status;
                var token = response.vpnToken;
                var dataAllowed = Number(response.dataAllowed);
                var message = response.message;
                token_manager_log(logger["a" /* Level */].DEBUG, "RegResponse: " + status + " token: " + token);
                if (dataAllowed <= 0) {
                    throw "No data left";
                }
                else if (status !== "OK") {
                    throw message;
                }
                return token;
            }).catch(function (error) {
                _this.requestInProgress = false;
                token_manager_log(logger["a" /* Level */].WARN, "Error fetching token: " + JSON.stringify(error));
                throw error;
            });
        }
        return this.registerPromise;
    };
    TokenManager.prototype.validateToken = function (proxy, proxyToken) {
        token_manager_log(logger["a" /* Level */].INFO, "Validating token " + proxyToken + " for " + proxy);
        // If proxy is in array, means we need to get a new token or give the current one if its different from the one set
        if (proxyToken !== undefined) {
            if (proxyToken !== this.currentToken) {
                // Token is different
                this.setToken(proxy, this.currentToken);
                return Promise.resolve(this.currentToken);
            }
            else {
                // Token is the same, so need to get a new one since its erroring out
                return this.newToken(proxy);
            }
        }
        else {
            this.setToken(proxy, this.currentToken);
            return Promise.resolve(this.currentToken);
        }
    };
    TokenManager.prototype.setToken = function (proxy, token) {
        token_manager_log(logger["a" /* Level */].INFO, "Setting token: " + token + " for proxy: " + proxy);
        this.currentToken = token;
        if (proxy !== undefined) {
            this.currentProxies.set(proxy, token);
        }
    };
    return TokenManager;
}());
/* harmony default export */ var token_manager = (token_manager_TokenManager);

// CONCATENATED MODULE: ./src/background/browser.ts
///<reference types="chrome"/>







function browser_log(level, message) {
    logger["d" /* log */](level, "[BROWSER] " + message);
}
var tokenManager = new token_manager();
var lastDataAllowed = 0;
var LOW_DATA_CAP = 100;
var canWarnLowData = false;
var toggleOffBackground = function () { };
var lastErrorRegister = 0;
var pendingRequests = new Set();
function proxiesString(servers) {
    return servers.map(function (server) { return "HTTPS " + server + ":8080;"; }).join(" ");
}
var DIRECT = { type: "direct" };
var browser_FirefoxBrowser = /** @class */ (function () {
    function FirefoxBrowser() {
    }
    FirefoxBrowser.prototype.makeProxyRequestListener = function () {
        var _this = this;
        return function (details) {
            var url = new URL(details.url);
            if (url.hostname === "localhost" || url.hostname === "127.0.0.1") {
                return DIRECT;
            }
            if (url.protocol === "https:" && url.hostname === "api.tunnelbear.com") {
                return DIRECT;
            }
            return appState.toggled ? _this.proxyInfo : DIRECT;
        };
    };
    FirefoxBrowser.prototype.browserResetProxy = function () {
        if (this.proxyRequestListener !== undefined) {
            browser.proxy.onRequest.removeListener(this.proxyRequestListener);
            this.proxyRequestListener = undefined;
        }
    };
    FirefoxBrowser.prototype.browserSetProxy = function (isEnabled, servers) {
        if (this.proxyRequestListener === undefined) {
            this.proxyRequestListener = this.makeProxyRequestListener();
            browser.proxy.onRequest.addListener(this.proxyRequestListener, { urls: ["<all_urls>"] });
        }
        this.proxyInfo = servers.map(function (server) { return { type: "https", host: server, port: "8080" }; });
    };
    FirefoxBrowser.prototype.browserEvalProxy = function () {
        // Firefox doesn't seem to have a way to check if we are the only extension controlling the proxy
        return Promise.resolve({ error: false, details: "" });
    };
    FirefoxBrowser.prototype.browserRegisterOnAuthListener = function () {
        browser.webRequest.onAuthRequired.addListener(function (details) {
            browser_log(logger["a" /* Level */].DEBUG, "---- onAuthRequired ---");
            var proxyInfo = details.proxyInfo;
            var tabId = details.tabId;
            var requestId = details.requestId;
            if (proxyInfo !== undefined) {
                var proxy = proxyInfo.host;
                if (pendingRequests.has(requestId)) {
                    browser_log(logger["a" /* Level */].WARN, "Bad credentials for request: " + requestId);
                    return { cancel: true };
                }
                else if (proxy.indexOf("lazerpenguin.com") > 0) {
                    pendingRequests.add(requestId);
                    return tokenManager.getToken(proxy).then(function (token) {
                        return { authCredentials: { username: token, password: token } };
                    }).catch(function (error) {
                        handleTokenError(tabId, error);
                        return { cancel: true };
                    });
                }
            }
        }, { urls: ["<all_urls>"] }, ["blocking"]);
    };
    return FirefoxBrowser;
}());
var browser_ChromeBrowser = /** @class */ (function () {
    function ChromeBrowser() {
    }
    ChromeBrowser.prototype.browserResetProxy = function () {
        chrome.proxy.settings.set({
            value: { mode: "direct" },
            scope: "regular"
        }, function (details) { return browser_log(logger["a" /* Level */].DEBUG, JSON.stringify(details)); });
    };
    ChromeBrowser.prototype.browserSetProxy = function (isEnabled, servers) {
        var proxies = proxiesString(servers);
        var pacString = "function FindProxyForURL(url, host) {\n      var diff = new Date().getTime() - " + Date.now() + ";\n      var seconds = diff / 1000;\n      if(seconds > 4) {\n        return 'DIRECT';\n      }\n      if (shExpMatch(url, 'https://api.tunnelbear.com/*')) {\n        return 'DIRECT';\n      }\n      if (shExpMatch(host, 'localhost')) {\n        return 'DIRECT';\n      }\n      if (shExpMatch(host, '127.0.0.1')){\n        return 'DIRECT';\n      }\n      return '" + (isEnabled ? proxies : "DIRECT") + "';\n    };";
        chrome.proxy.settings.set({
            value: { mode: "pac_script", pacScript: { data: pacString } },
            scope: "regular"
        }, function () { });
    };
    ChromeBrowser.prototype.browserEvalProxy = function () {
        return new Promise(function (resolve) {
            return chrome.proxy.settings.get({ incognito: false }, function (details) {
                var levelOfControl = details.levelOfControl;
                var hasPermissions = !(levelOfControl === "controlled_by_other_extensions" || levelOfControl === "not_controllable");
                if (hasPermissions) {
                    return resolve({ error: false, details: "" });
                }
                else {
                    chrome.management.getAll(function (apps) {
                        var appId = chrome.runtime.id;
                        var culprits = apps.filter(function (app) { return app.permissions.indexOf("proxy") >= 0; });
                        var culprit = culprits.filter(function (app) { return app.id !== appId; })[0];
                        var icon16 = (culprit.icons !== undefined && culprit.icons.length > 0) ? culprit.icons[0] : {};
                        var icon32 = (culprit.icons !== undefined && culprit.icons.length > 1) ? culprit.icons[1] : icon16;
                        var icon = utils["k" /* isScreenRetina */]() ? icon32 : icon16;
                        browser_log(logger["a" /* Level */].DEBUG, JSON.stringify(culprit));
                        resolve({ error: true, details: culprit.shortName, icon: icon });
                    });
                }
            });
        });
    };
    ChromeBrowser.prototype.browserRegisterOnAuthListener = function () {
        chrome.webRequest.onAuthRequired.addListener(function (details, callback) {
            browser_log(logger["a" /* Level */].DEBUG, "---- onAuthRequired ---");
            var proxy = details.challenger.host;
            var tabId = details.tabId;
            browser_log(logger["a" /* Level */].INFO, "onAuthRequired for proxy: " + proxy);
            if (proxy.indexOf("lazerpenguin.com") > 0) {
                tokenManager.getToken(proxy).then(function (token) {
                    if (callback !== undefined) {
                        callback({ authCredentials: { username: token, password: token } });
                    }
                }).catch(function (error) {
                    handleTokenError(tabId, error);
                    if (callback !== undefined) {
                        callback({ cancel: true });
                    }
                });
            }
            else {
                if (callback !== undefined) {
                    callback({});
                }
            }
        }, { urls: ["<all_urls>"] }, ["asyncBlocking"]);
    };
    return ChromeBrowser;
}());
function handleTokenError(tabId, error) {
    if (0 < tabId && error === "No data left") {
        browser_log(logger["a" /* Level */].INFO, "No data -disconnecting");
        toggleOffBackground();
    }
}
var IconType;
(function (IconType) {
    IconType[IconType["NONE"] = 0] = "NONE";
    IconType[IconType["OFF"] = 1] = "OFF";
    IconType[IconType["WARN"] = 2] = "WARN";
    IconType[IconType["ALERT"] = 3] = "ALERT";
})(IconType || (IconType = {}));
function toggleIcon(isToggled) {
    if (isToggled) {
        browser.browserAction.setIcon({
            path: {
                19: __webpack_require__(82),
                38: __webpack_require__(81)
            }
        });
    }
    else {
        browser.browserAction.setIcon({
            path: {
                19: __webpack_require__(80),
                38: __webpack_require__(79)
            }
        });
    }
}
function setExtensionBadge(text, type) {
    browser_log(logger["a" /* Level */].INFO, "Setting extension badge " + text);
    browser.browserAction.setBadgeText({ text: text });
    switch (type) {
        case IconType.NONE: {
            browser_log(logger["a" /* Level */].DEBUG, "setting extension badge to nothing");
            break;
        }
        case IconType.OFF: {
            browser.browserAction.setBadgeBackgroundColor({ color: "#7d6549" });
            break;
        }
        case IconType.WARN: {
            browser.browserAction.setBadgeBackgroundColor({ color: "#e48b2d" });
            break;
        }
        case IconType.ALERT: {
            browser.browserAction.setBadgeBackgroundColor({ color: "#d64a2f" });
            break;
        }
    }
}
function setDataLevel(dataAllowed, isToggled, emailConfirmed) {
    if (dataAllowed === undefined) {
        setExtensionBadge("", IconType.NONE);
        return;
    }
    // The badge is not scaled correctly in Opera MacOS, so don't show the badges
    var isOpera = utils["f" /* getBrowserType */]() === utils["a" /* BrowserType */].OPERA;
    var isMac = utils["i" /* getPlatformClass */]() === utils["b" /* PlatformClass */].MAC;
    if (isOpera && isMac) {
        setExtensionBadge("", IconType.NONE);
        return;
    }
    if ((dataAllowed / 1048576 < LOW_DATA_CAP) && (dataAllowed > 0)) {
        browser_log(logger["a" /* Level */].INFO, "Low Data : Can warn user? " + canWarnLowData);
        if (canWarnLowData && isToggled) {
            canWarnLowData = false;
            lowAccount(emailConfirmed);
        }
        setExtensionBadge("Low", IconType.WARN);
    }
    if (dataAllowed <= 0) {
        browser_log(logger["a" /* Level */].INFO, "No more Data");
        setExtensionBadge("0mb", IconType.ALERT);
        toggleOffBackground();
    }
    if (dataAllowed / 1048576 > LOW_DATA_CAP) {
        canWarnLowData = true;
        if (isToggled) {
            setExtensionBadge("", IconType.NONE);
        }
        else {
            setExtensionBadge("Off", IconType.OFF);
        }
    }
}
var registerTimer;
function adjustTimer(interval) {
    browser_log(logger["a" /* Level */].DEBUG, "adjusting timer to: " + interval);
    clearInterval(registerTimer);
    registerTimer = window.setInterval(browser_register, interval);
}
function evaluateTimer(newDataAllowed) {
    var newData = newDataAllowed / 1048576;
    var diffDataUsage = lastDataAllowed - newData;
    if (diffDataUsage > 0) {
        browser_log(logger["a" /* Level */].DEBUG, "[DATA] usage since last time: " + diffDataUsage);
        if (diffDataUsage < 1) {
            adjustTimer(60000);
        }
        else if (diffDataUsage < 5) {
            adjustTimer(50000);
        }
        else if (diffDataUsage < 10) {
            adjustTimer(40000);
        }
        else if (diffDataUsage < 15) {
            adjustTimer(35000);
        }
        else if (diffDataUsage < 20) {
            adjustTimer(30000);
        }
        else {
            adjustTimer(25000);
        }
    }
    lastDataAllowed = newDataAllowed;
}
function browser_logout() {
    tokenManager.logout();
}
function browser_register() {
    if (appState.toggled === true) {
        browser_log(logger["a" /* Level */].DEBUG, "TIMER registering");
        registerIgnoreErrors(appState.country);
    }
}
function registerListeners(toggleAllCallback, changeCountryCallback, disconnectProxyCallback) {
    browser_log(logger["a" /* Level */].INFO, "AppStart - Registering listeners");
    function toggleAll() {
        var isToggled = !appState.toggled;
        var dataAllowed = regResponse.dataAllowed;
        var emailConfirmed = regResponse.emailConfirmed;
        setDataLevel(dataAllowed, isToggled, emailConfirmed);
        toggleIcon(isToggled);
        toggleAllCallback();
    }
    function incognitoTunnelling() {
        browser.extension.isAllowedIncognitoAccess().then(function (isAllowed) {
            if (isAllowed) {
                var toggled = appState.toggled;
                if (toggled === false && !regResponse.isNil()) {
                    toggleAll();
                }
                browser.windows.create({ url: "https://bearsmyip.com", incognito: true });
            }
            else {
                openExtensions();
            }
        });
    }
    function toggleOff() {
        browser_log(logger["a" /* Level */].DEBUG, "calling toggle-off");
        var isToggled = appState.toggled;
        if (isToggled) {
            browser_log(logger["a" /* Level */].INFO, "Toggling off");
            toggleIcon(false);
            toggleAllCallback();
            disconnectProxyCallback();
            outOfData();
        }
        else {
            browser_log(logger["a" /* Level */].INFO, "Already toggled-off");
        }
    }
    toggleOffBackground = toggleOff;
    browser.commands.onCommand.addListener(function (command) {
        browser_log(logger["a" /* Level */].DEBUG, "Command: " + command);
        if (command === "toggle-tunnelling") {
            toggleAll();
        }
        else if (command === "incognito-tunnelling") {
            incognitoTunnelling();
        }
        else if (command === "send-feedback") {
            sendFeedback();
        }
    });
    function firstInstall(handler) {
        utils["m" /* storageGet */]("installed").then(function (result) {
            var installed = (result !== undefined) && (result.installed === true);
            handler(installed);
        });
    }
    browser.runtime.onInstalled.addListener(function () {
        browser_log(logger["a" /* Level */].INFO, "app installed");
        firstInstall(function (installed) {
            if (!installed) {
                utils["o" /* storageSet */]("installed", Date.now());
            }
        });
        utils["m" /* storageGet */]("isToggled").then(function (result) {
            var toggled = result.isToggled;
            if (toggled === undefined) {
                // Only auto-launch if it's the first time intalled
                register(true, appState.country).then(function () {
                    if (!regResponse.isNil()) {
                        toggleAll();
                    }
                });
            }
        });
    });
    browser.runtime.onMessageExternal.addListener(function (request, sender, response) {
        browser_log(logger["a" /* Level */].DEBUG, "Got external message: " + JSON.stringify(request));
        var toggle = request.toggled;
        var openTab = request.opentab;
        var strMessage = request.message;
        var twitter = strMessage === "twitter";
        var isToggled = appState.toggled;
        if (toggle !== undefined) {
            registerIgnoreErrors(appState.country).then(function () {
                var dataAllowed = regResponse.dataAllowed;
                if (dataAllowed > 0 && isToggled === false) {
                    toggleAll();
                }
            });
        }
        if (openTab !== undefined) {
            if (openTab === "") {
                browser.tabs.create({});
            }
            else {
                browser.tabs.create({ url: openTab });
            }
        }
        if (twitter) {
            openTwitter(regResponse.templateTweet);
        }
    });
    browser.runtime.onMessage.addListener(function (request, sender) {
        if (request === ports["a" /* PortName */].POPUP_STATE) {
            return Promise.resolve(getPopupState());
        }
        browser_log(logger["a" /* Level */].DEBUG, "Got content-script message: " + JSON.stringify(request));
        var toggle = request.toggled;
        var country = request.country;
        var isToggled = appState.toggled;
        if (toggle !== undefined && country !== undefined && toggle === true) {
            registerIgnoreErrors(country).then(function () {
                var dataAllowed = regResponse.dataAllowed;
                if (dataAllowed > 0 && isToggled === false) {
                    toggleAll();
                }
            });
            appState.country = country;
        }
    });
    function portCallback(portName, message) {
        if (message === "toggle-all") {
            toggleAll();
        }
        else {
            browser_log(logger["a" /* Level */].DEBUG, "not a normal command");
        }
        var command = message["COMMAND"];
        if (command !== undefined && command === "change-country") {
            changeCountryCallback(message["PARAM"]);
        }
    }
    ports["e" /* subscribeTo */](ports["a" /* PortName */].BROWSER, portCallback);
    function onRequestCompleted(details) {
        pendingRequests.delete(details.requestId);
    }
    browser.webRequest.onErrorOccurred.addListener(function (details) {
        onRequestCompleted(details);
        var errorStatus = details.error;
        var isToggled = appState.toggled;
        browser_log(logger["a" /* Level */].DEBUG, "WebRequestOnErrorOccured: " + JSON.stringify(details));
        if (isToggled === true && (errorStatus.indexOf("ERR_PROXY_CONNECTION_FAILED") > -1 ||
            errorStatus.indexOf("ERR_CONNECTION_RESET") > -1 ||
            errorStatus.indexOf("ERR_NETWORK_IO_SUSPENDED") > -1 ||
            errorStatus.indexOf("NS_ERROR_PROXY_CONNECTION_REFUSED") > -1 ||
            errorStatus.indexOf("NS_ERROR_NET_RESET") > -1)) {
            if (lastErrorRegister === 0 || (Date.now() - lastErrorRegister) > 15000) {
                browser_log(logger["a" /* Level */].WARN, "Registering again, possible server error");
                lastErrorRegister = Date.now();
                browser_register();
            }
            else {
                browser_log(logger["a" /* Level */].WARN, "Not registering - registered too many times");
            }
        }
    }, { urls: ["<all_urls>"] });
    browser.webRequest.onCompleted.addListener(onRequestCompleted, { urls: ["<all_urls>"] });
    whichBrowser.browserRegisterOnAuthListener();
    utils["m" /* storageGet */]("isToggled").then(function (result) {
        var toggled = result.isToggled;
        if (toggled === true) {
            toggleAll();
        }
    });
    browser.contextMenus.removeAll().then(function () {
        browser.contextMenus.create({
            title: "Acknowledgements",
            contexts: ["browser_action"],
            onclick: function () {
                browser.windows.getCurrent().then(function (currWindow) {
                    var popupWidth = 600;
                    var popupHeight = 600;
                    browser.windows.create({
                        url: browser.runtime.getURL("acknowledgements.html"),
                        type: "popup",
                        width: popupWidth,
                        height: popupHeight,
                        top: 125,
                        left: currWindow.width - popupWidth - 25
                    });
                });
            }
        });
    });
}
var whichBrowser;
function setBrowser() {
    if (utils["f" /* getBrowserType */]() === utils["a" /* BrowserType */].CHROME || utils["f" /* getBrowserType */]() === utils["a" /* BrowserType */].OPERA) {
        whichBrowser = new browser_ChromeBrowser();
    }
    else {
        whichBrowser = new browser_FirefoxBrowser();
    }
}
function resetProxy() {
    whichBrowser.browserResetProxy();
}
function setProxy(isEnabled, servers) {
    whichBrowser.browserSetProxy(isEnabled, servers);
}
function evalProxy() {
    return whichBrowser.browserEvalProxy();
}
function browser_init() {
    setBrowser();
    browser.runtime.setUninstallURL(uninstallFeedbackUrl());
    registerTimer = window.setInterval(browser_register, 40000);
    regResponse.addWatch("reg-watcher-browser", function (newValue) {
        var dataAllowed = newValue.dataAllowed;
        var emailConfirmed = newValue.emailConfirmed;
        var isToggled = appState.toggled;
        browser_log(logger["a" /* Level */].DEBUG, "API.reg-response changed!");
        setDataLevel(dataAllowed, isToggled, emailConfirmed);
        evaluateTimer(dataAllowed);
    });
}

// CONCATENATED MODULE: ./src/background/proxy.ts


var proxy_lastServers = [];
function proxy_log(level, message) {
    logger["d" /* log */](level, "[Proxy] " + message);
}
function proxyAll(enabled, servers) {
    if (enabled) {
        proxy_log(logger["a" /* Level */].DEBUG, "[Background - Proxy] : Enabling");
        if (browser.privacy.network.webRTCMultipleRoutesEnabled !== undefined) {
            browser.privacy.network.webRTCMultipleRoutesEnabled.set({ value: false });
        }
        if (browser.privacy.network.webRTCNonProxiedUdpEnabled !== undefined) {
            browser.privacy.network.webRTCNonProxiedUdpEnabled.set({ value: false });
        }
        if (browser.privacy.network.webRTCIPHandlingPolicy !== undefined) {
            browser.privacy.network.webRTCIPHandlingPolicy.set({ value: "disable_non_proxied_udp" });
        }
        if (browser.privacy.network.networkPredictionEnabled !== undefined) {
            browser.privacy.network.networkPredictionEnabled.set({ value: false });
        }
    }
    else {
        proxy_log(logger["a" /* Level */].INFO, "[Background - Proxy] : Disabling");
        if (browser.privacy.network.webRTCMultipleRoutesEnabled !== undefined) {
            browser.privacy.network.webRTCMultipleRoutesEnabled.set({ value: true });
        }
        if (browser.privacy.network.webRTCNonProxiedUdpEnabled !== undefined) {
            browser.privacy.network.webRTCNonProxiedUdpEnabled.set({ value: true });
        }
        if (browser.privacy.network.webRTCIPHandlingPolicy !== undefined) {
            browser.privacy.network.webRTCIPHandlingPolicy.set({ value: "default" });
        }
        if (browser.privacy.network.networkPredictionEnabled !== undefined) {
            browser.privacy.network.networkPredictionEnabled.set({ value: true });
        }
    }
    proxy_lastServers = servers;
    setProxy(enabled, proxy_lastServers);
}
browser.proxy.onProxyError.addListener(function (error) {
    proxy_log(logger["a" /* Level */].WARN, "proxy error" + JSON.stringify(proxy_lastServers));
    proxy_log(logger["a" /* Level */].WARN, JSON.stringify(error));
});

// CONCATENATED MODULE: ./src/background/core.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeAppStateCountry", function() { return changeAppStateCountry; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toggleOff", function() { return core_toggleOff; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closePopup", function() { return closePopup; });
///<reference path="../../typings/tunnelbear/index.d.ts"/>








function core_log(level, message) {
    logger["d" /* log */](level, "[Background - Core] " + message);
}
var serverRotatedTime = Date.now();
var proxyTimer;
ports["b" /* init */](true);
logger["c" /* init */]("Background");
init();
browser_init();
core_log(logger["a" /* Level */].DEBUG, "App Started");
appState.addWatch("app-watcher", function (newState) {
    if (!regResponse.isNil()) {
        ports["c" /* sendMessage */](ports["a" /* PortName */].POPUP_STATE, getPopupState());
    }
});
function getServers() {
    if (regResponse.vpnServers !== undefined) {
        return regResponse.vpnServers.map(function (server) { return server.host; });
    }
    return [];
}
function updateProxyAll() {
    var servers = getServers();
    var regCountry = regResponse.registeredCountry;
    if (servers.length > 0) {
        appState.lastServers = { country: regCountry, servers: servers };
        proxyAll(appState.toggled, servers);
    }
    else {
        core_log(logger["a" /* Level */].WARN, "empty list of servers");
    }
}
function shouldRotate() {
    var hour = 60 * 60 * 1000;
    var interval = hour * 2;
    if ((Date.now() - serverRotatedTime) >= interval) {
        return true;
    }
    return false;
}
function getBackgroundServers() {
    var lastServers = appState.lastServers;
    var regServers = getServers();
    var regCountry = regResponse.registeredCountry;
    var selectedCountry = appState.country;
    if (lastServers.servers.length === 0 && regServers.length === 0) {
        return [];
    }
    else if (lastServers.country !== selectedCountry || lastServers.servers.length == 0) {
        if (regCountry !== selectedCountry) {
            return [];
        }
        else {
            appState.lastServers = { country: regCountry, servers: regServers };
        }
    }
    else if (shouldRotate() === true && regServers.length > 0) {
        core_log(logger["a" /* Level */].DEBUG, "--- Rotating servers ---");
        serverRotatedTime = Date.now();
        appState.lastServers = { country: regCountry, servers: regServers };
    }
    return appState.lastServers.servers;
}
function proxyTimerCallback() {
    var toggled = appState.toggled;
    if (toggled === true) {
        var servers = getBackgroundServers();
        if (servers.length > 0) {
            proxyAll(toggled, servers);
        }
        else {
            core_log(logger["a" /* Level */].WARN, "Timer: empty list of servers");
            register(false, appState.country);
        }
    }
}
function startProxyTimer() {
    proxyTimer = window.setInterval(proxyTimerCallback, 3500);
}
// Promise with boolean result indicates whether or not app-state changed and should be sent to subscribers
function core_evalProxy() {
    return evalProxy().then(function (result) {
        if (appState.permissions.error !== result.error) {
            appState.permissions = result;
            return true;
        }
        return false;
    });
}
function apiLocation() {
    return api_location().then(function (response) {
        core_log(logger["a" /* Level */].DEBUG, "[API/Location] response: " + JSON.stringify(response));
        if (response.latitude === undefined || response.longitude === undefined) {
            return { latitude: 0, longitude: 0, city: "", countryName: "" };
        }
        else {
            var originLocation = {
                latitude: response.latitude,
                longitude: response.longitude
            };
            if (response.city && response.countryName) {
                originLocation.city = response.city;
                originLocation.countryName = response.countryName;
            }
            if (response.connected) {
                originLocation.connected = response.connected === 1;
            }
            appState.originLocation = originLocation;
            return appState.originLocation;
        }
    }).catch(function () {
        return { latitude: 0, longitude: 0, city: "", countryName: "" };
    });
}
function getLocation() {
    apiLocation().then(function (origin) {
        ports["c" /* sendMessage */](ports["a" /* PortName */].LOCATION, origin);
    });
}
function closeTwitter() {
    appState.canShowTwitter = false;
    ports["c" /* sendMessage */](ports["a" /* PortName */].POPUP_STATE, getPopupState());
    utils["o" /* storageSet */]("twitter", Date.now());
}
function core_portCallback(portName, message) {
    switch (portName) {
        case ports["a" /* PortName */].POPUP_STATE: {
            getLocation();
            register(false, appState.country).then(function () {
                return core_evalProxy();
            }).then(function () {
                ports["c" /* sendMessage */](ports["a" /* PortName */].POPUP_STATE, getPopupState());
            });
            break;
        }
        case ports["a" /* PortName */].UPGRADE: {
            upgradeAccount();
            break;
        }
        case ports["a" /* PortName */].REVIEW: {
            if (!regResponse.isNil()) {
                ports["c" /* sendMessage */](ports["a" /* PortName */].REVIEW, regResponse.value);
            }
            break;
        }
        case ports["a" /* PortName */].SETTINGS: {
            switch (message) {
                case "help": {
                    openHelp();
                    break;
                }
                case "account": {
                    openAccount();
                    break;
                }
                case "review": {
                    openReview();
                    break;
                }
                case "privacy": {
                    openPrivacyPolicy();
                    break;
                }
                case "logout": {
                    logout();
                    browser_logout();
                    break;
                }
                case "extensions": {
                    openExtensions();
                    break;
                }
                case "feedback": {
                    openFeedback();
                    sendFeedback();
                    break;
                }
                case "close-twitter": {
                    closeTwitter();
                    break;
                }
                case "tweet-now": {
                    openAccountTweet();
                    break;
                }
            }
            break;
        }
    }
}
ports["e" /* subscribeTo */](ports["a" /* PortName */].POPUP_STATE, core_portCallback);
ports["e" /* subscribeTo */](ports["a" /* PortName */].UPGRADE, core_portCallback);
ports["e" /* subscribeTo */](ports["a" /* PortName */].REVIEW, core_portCallback);
ports["e" /* subscribeTo */](ports["a" /* PortName */].SETTINGS, core_portCallback);
function changeAppStateCountry(country) {
    appState.country = country;
}
function persistToggle(state) {
    core_log(logger["a" /* Level */].DEBUG, "persisting state");
    utils["o" /* storageSet */]("isToggled", state);
    utils["o" /* storageSet */]("lastCountry", appState.country);
}
function toggleCountryParam(country) {
    register(false, country).then(updateProxyAll);
    changeAppStateCountry(country);
    persistToggle(appState.toggled);
}
function disconnectProxy() {
    resetProxy();
}
function core_toggleAll() {
    core_log(logger["a" /* Level */].DEBUG, "[Background - Core] toggle-all");
    appState.toggled = !appState.toggled;
    persistToggle(appState.toggled);
    updateProxyAll();
    if (appState.toggled === true) {
        core_log(logger["a" /* Level */].DEBUG, "[Background - Core] test call triggered");
        testCall();
    }
}
function core_toggleOff() {
    var toggled = appState.toggled;
    if (toggled === true) {
        toggleIcon(false);
        core_toggleAll();
    }
    disconnectProxy();
}
function closePopup() {
    ports["c" /* sendMessage */](ports["a" /* PortName */].SETTINGS, "close");
}
regResponse.addWatch("reg-watcher-core", function (newValue) {
    if (newValue.dataAllowed <= 0) {
        core_log(logger["a" /* Level */].DEBUG, "No data left");
    }
    if (newValue.status !== "OK") {
        var message = JSON.stringify(newValue.message);
        core_log(logger["a" /* Level */].WARN, "Registration failure: " + message + " disabling proxy");
    }
});
utils["m" /* storageGet */](["lastCountry", "twitter"]).then(function (result) {
    // lastCountry
    var country = result.lastCountry;
    var toggled = appState.toggled;
    core_log(logger["a" /* Level */].DEBUG, "lastCountry loaded is " + country);
    if (country !== undefined) {
        if (toggled === true) {
            toggleCountryParam(country);
        }
        else {
            appState.country = country;
        }
    }
    // twitter
    var twitterLastTime = result.twitter;
    if (twitterLastTime !== undefined) {
        appState.canShowTwitter = utils["c" /* dateOlderThan */](twitterLastTime, 2);
    }
}).then(function () {
    setRegisterErrorHandler(function () {
        core_toggleOff();
        closePopup();
        openSignup();
    });
    return registerIgnoreErrors(appState.country);
}).then(function () {
    registerListeners(core_toggleAll, toggleCountryParam, disconnectProxy);
}).catch(function () {
    registerListeners(core_toggleAll, toggleCountryParam, disconnectProxy);
}).then(startProxyTimer);


/***/ }),
/* 77 */,
/* 78 */,
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/icon_off2x.png";

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/icon_off.png";

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/icon_on2x.png";

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/icon_on.png";

/***/ })
/******/ ]);