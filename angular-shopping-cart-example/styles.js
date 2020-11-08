(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["styles"],{

/***/ 2:
/*!******************************!*\
  !*** multi ./src/styles.css ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\Tommy\Desktop\shopping-cart-2020\src\styles.css */"OmL/");


/***/ }),

/***/ "JPst":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "LboF":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "OmL/":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "LboF");
            var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js??ref--12-1!../node_modules/postcss-loader/src??embedded!./styles.css */ "W9N5");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "W9N5":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--12-1!./node_modules/postcss-loader/src??embedded!./src/styles.css ***!
  \*********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "JPst");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(true);
// Module
___CSS_LOADER_EXPORT___.push([module.i, "* {\n  box-sizing: border-box;\n}\n\nhtml {\n  font-size: 12px;\n}\n\nbody {\n  margin: 20px 0;\n  padding: 0;\n  font-family: arial, sans-serif;\n  overflow: scroll;\n}\n\nimg {\n  max-width: 100%;\n  vertical-align: middle;\n  border-radius: 4px;\n}\n\na {\n  text-decoration: none;\n  color: #333333;\n}\n\na:hover {\n  color: #f58551;\n}\n\nbutton {\n  background-color: #16cc9b;\n  border: 2px solid #16cc9b;\n  color: #ffffff;\n  transition: all 0.25s linear;\n  cursor: pointer;\n}\n\nbutton::after {\n  position: relative;\n  right: 0;\n  content: \" \\276f\";\n  transition: all 0.15s linear;\n}\n\nbutton:hover {\n  background-color: #f58551;\n  border-color: #f58551;\n}\n\nbutton:hover::after {\n  right: -5px;\n}\n\nbutton:focus {\n  outline: none;\n}\n\nul {\n  padding: 0;\n  margin: 0;\n  list-style-type: none;\n}\n\ninput {\n  transition: all 0.25s linear;\n}\n\ninput[type=\"number\"]::-webkit-inner-spin-button,\ninput[type=\"number\"]::-webkit-outer-spin-button {\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n  margin: 0;\n}\n\ninput {\n  outline: none;\n}\n\n.container {\n  width: 90%;\n  margin: 0 auto;\n  overflow: auto;\n}\n\n/* --- HEADER --- */\n\nheader.container {\n  margin-bottom: 1.5rem;\n}\n\nheader .breadcrumb {\n  color: #7d7d7d;\n}\n\nheader .breadcrumb li {\n  float: left;\n  padding: 0 6px;\n  height: 20px;\n  line-height: 20px;\n}\n\nheader .breadcrumb li:first-child {\n  padding-left: 2px;\n}\n\nheader .breadcrumb li:not(:last-child)::after {\n  content: \" \\276f\";\n  padding-left: 8px;\n}\n\nheader .count {\n  float: right;\n  color: #333333;\n  height: 20px;\n  line-height: 20px;\n}\n\n/* --- PRODUCT LIST --- */\n\n.products {\n  border-top: 1px solid #ddd;\n}\n\n.products > li {\n  padding: 1rem 0;\n  border-bottom: 1px solid #ddd;\n}\n\n.row {\n  position: relative;\n  overflow: auto;\n  width: 100%;\n}\n\n.col,\n.quantity,\n.remove {\n  float: left;\n}\n\n.col.left {\n  width: 70%;\n}\n\n.col.right {\n  width: 30%;\n  position: absolute;\n  right: 0;\n  top: calc(50% - 30px);\n}\n\n.detail {\n  padding: 0 0.5rem;\n  line-height: 2.2rem;\n}\n\n.detail .name {\n  font-size: 1.2rem;\n}\n\n.detail .description {\n  color: #7d7d7d;\n  font-size: 1rem;\n}\n\n.detail .price {\n  font-size: 1.5rem;\n}\n\n.quantity,\n.remove {\n  width: 50%;\n  text-align: center;\n}\n\n.remove svg {\n  width: 60px;\n  height: 60px;\n}\n\n.quantity > input {\n  display: inline-block;\n  width: 60px;\n  height: 60px;\n  position: relative;\n  left: calc(50% - 30px);\n  background: #fff;\n  border: 2px solid #ddd;\n  color: #7f7f7f;\n  text-align: center;\n  font: 600 1.5rem Helvetica, Arial, sans-serif;\n}\n\n.quantity > input:hover,\n.quantity > input:focus {\n  border-color: #f58551;\n}\n\n.close {\n  fill: #7d7d7d;\n  transition: color 150ms linear, background-color 150ms linear,\n    fill 150ms linear, 150ms opacity linear;\n  cursor: pointer;\n}\n\n.close:hover {\n  fill: #f58551;\n}\n\n/* --- SUMMARY --- */\n\n.promotion,\n.summary,\n.checkout {\n  float: left;\n  width: 100%;\n  margin-top: 1.5rem;\n}\n\n.promotion > label {\n  float: left;\n  width: 100%;\n  margin-bottom: 1rem;\n}\n\n.promotion > input {\n  float: left;\n  width: 80%;\n  font-size: 1rem;\n  padding: 0.5rem 0 0.5rem 1.8rem;\n  border: 2px solid #16cc9b;\n  border-radius: 2rem 0 0 2rem;\n}\n\n.promotion:hover > input {\n  border-color: #f58551;\n}\n\n.promotion > button {\n  float: left;\n  width: 20%;\n  height: 2.4rem;\n  border-radius: 0 2rem 2rem 0;\n}\n\n.promotion:hover > button {\n  border-color: #f58551;\n  background-color: #f58551;\n}\n\n.promotion > button::after {\n  content: \"\\276f\";\n  font-size: 1rem;\n}\n\n.summary {\n  font-size: 1.2rem;\n  text-align: right;\n}\n\n.summary ul li {\n  padding: 0.5rem 0;\n}\n\n.summary ul li span {\n  display: inline-block;\n  width: 30%;\n}\n\n.summary ul li.total {\n  font-weight: bold;\n}\n\n.checkout {\n  text-align: right;\n}\n\n.checkout > button {\n  font-size: 1.2rem;\n  padding: 0.8rem 2.8rem;\n  border-radius: 1.5rem;\n}\n\n.empty-product {\n  text-align: center;\n}\n\n.empty-product > button {\n  font-size: 1.3rem;\n  padding: 10px 30px;\n  border-radius: 5px;\n}\n\n/* --- SMALL SCREEN --- */\n\n@media all and (max-width: 599px) {\n  .thumbnail img {\n    display: none;\n  }\n\n  .quantity > input {\n    width: 40px;\n    height: 40px;\n    left: calc(50% - 20px);\n  }\n\n  .remove svg {\n    width: 40px;\n    height: 40px;\n  }\n}\n\n/* --- MEDIUM & LARGE SCREEN --- */\n\n@media all and (min-width: 600px) {\n  html {\n    font-size: 14px;\n  }\n\n  .container {\n    width: 75%;\n    max-width: 960px;\n  }\n\n  .thumbnail,\n  .detail {\n    float: left;\n  }\n\n  .thumbnail {\n    width: 35%;\n  }\n\n  .detail {\n    width: 65%;\n  }\n\n  .promotion,\n  .summary {\n    width: 50%;\n  }\n\n  .checkout {\n    width: 100%;\n  }\n\n  .checkout,\n  .summary {\n    text-align: right;\n  }\n}\n\n/* --- LARGE SCREEN --- */\n\n@media all and (min-width: 992px) {\n  html {\n    font-size: 16px;\n  }\n}\n", "",{"version":3,"sources":["webpack://src/styles.css"],"names":[],"mappings":"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","sourcesContent":["* {\n  box-sizing: border-box;\n}\n\nhtml {\n  font-size: 12px;\n}\n\nbody {\n  margin: 20px 0;\n  padding: 0;\n  font-family: arial, sans-serif;\n  overflow: scroll;\n}\n\nimg {\n  max-width: 100%;\n  vertical-align: middle;\n  border-radius: 4px;\n}\n\na {\n  text-decoration: none;\n  color: #333333;\n}\n\na:hover {\n  color: #f58551;\n}\n\nbutton {\n  background-color: #16cc9b;\n  border: 2px solid #16cc9b;\n  color: #ffffff;\n  transition: all 0.25s linear;\n  cursor: pointer;\n}\n\nbutton::after {\n  position: relative;\n  right: 0;\n  content: \" \\276f\";\n  transition: all 0.15s linear;\n}\n\nbutton:hover {\n  background-color: #f58551;\n  border-color: #f58551;\n}\n\nbutton:hover::after {\n  right: -5px;\n}\n\nbutton:focus {\n  outline: none;\n}\n\nul {\n  padding: 0;\n  margin: 0;\n  list-style-type: none;\n}\n\ninput {\n  transition: all 0.25s linear;\n}\n\ninput[type=\"number\"]::-webkit-inner-spin-button,\ninput[type=\"number\"]::-webkit-outer-spin-button {\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n  margin: 0;\n}\n\ninput {\n  outline: none;\n}\n\n.container {\n  width: 90%;\n  margin: 0 auto;\n  overflow: auto;\n}\n\n/* --- HEADER --- */\nheader.container {\n  margin-bottom: 1.5rem;\n}\n\nheader .breadcrumb {\n  color: #7d7d7d;\n}\n\nheader .breadcrumb li {\n  float: left;\n  padding: 0 6px;\n  height: 20px;\n  line-height: 20px;\n}\n\nheader .breadcrumb li:first-child {\n  padding-left: 2px;\n}\n\nheader .breadcrumb li:not(:last-child)::after {\n  content: \" \\276f\";\n  padding-left: 8px;\n}\n\nheader .count {\n  float: right;\n  color: #333333;\n  height: 20px;\n  line-height: 20px;\n}\n\n/* --- PRODUCT LIST --- */\n.products {\n  border-top: 1px solid #ddd;\n}\n\n.products > li {\n  padding: 1rem 0;\n  border-bottom: 1px solid #ddd;\n}\n\n.row {\n  position: relative;\n  overflow: auto;\n  width: 100%;\n}\n\n.col,\n.quantity,\n.remove {\n  float: left;\n}\n\n.col.left {\n  width: 70%;\n}\n\n.col.right {\n  width: 30%;\n  position: absolute;\n  right: 0;\n  top: calc(50% - 30px);\n}\n\n.detail {\n  padding: 0 0.5rem;\n  line-height: 2.2rem;\n}\n\n.detail .name {\n  font-size: 1.2rem;\n}\n\n.detail .description {\n  color: #7d7d7d;\n  font-size: 1rem;\n}\n\n.detail .price {\n  font-size: 1.5rem;\n}\n\n.quantity,\n.remove {\n  width: 50%;\n  text-align: center;\n}\n\n.remove svg {\n  width: 60px;\n  height: 60px;\n}\n\n.quantity > input {\n  display: inline-block;\n  width: 60px;\n  height: 60px;\n  position: relative;\n  left: calc(50% - 30px);\n  background: #fff;\n  border: 2px solid #ddd;\n  color: #7f7f7f;\n  text-align: center;\n  font: 600 1.5rem Helvetica, Arial, sans-serif;\n}\n\n.quantity > input:hover,\n.quantity > input:focus {\n  border-color: #f58551;\n}\n\n.close {\n  fill: #7d7d7d;\n  transition: color 150ms linear, background-color 150ms linear,\n    fill 150ms linear, 150ms opacity linear;\n  cursor: pointer;\n}\n\n.close:hover {\n  fill: #f58551;\n}\n\n/* --- SUMMARY --- */\n.promotion,\n.summary,\n.checkout {\n  float: left;\n  width: 100%;\n  margin-top: 1.5rem;\n}\n\n.promotion > label {\n  float: left;\n  width: 100%;\n  margin-bottom: 1rem;\n}\n\n.promotion > input {\n  float: left;\n  width: 80%;\n  font-size: 1rem;\n  padding: 0.5rem 0 0.5rem 1.8rem;\n  border: 2px solid #16cc9b;\n  border-radius: 2rem 0 0 2rem;\n}\n\n.promotion:hover > input {\n  border-color: #f58551;\n}\n\n.promotion > button {\n  float: left;\n  width: 20%;\n  height: 2.4rem;\n  border-radius: 0 2rem 2rem 0;\n}\n\n.promotion:hover > button {\n  border-color: #f58551;\n  background-color: #f58551;\n}\n\n.promotion > button::after {\n  content: \"\\276f\";\n  font-size: 1rem;\n}\n\n.summary {\n  font-size: 1.2rem;\n  text-align: right;\n}\n\n.summary ul li {\n  padding: 0.5rem 0;\n}\n\n.summary ul li span {\n  display: inline-block;\n  width: 30%;\n}\n\n.summary ul li.total {\n  font-weight: bold;\n}\n\n.checkout {\n  text-align: right;\n}\n\n.checkout > button {\n  font-size: 1.2rem;\n  padding: 0.8rem 2.8rem;\n  border-radius: 1.5rem;\n}\n\n.empty-product {\n  text-align: center;\n}\n\n.empty-product > button {\n  font-size: 1.3rem;\n  padding: 10px 30px;\n  border-radius: 5px;\n}\n\n/* --- SMALL SCREEN --- */\n@media all and (max-width: 599px) {\n  .thumbnail img {\n    display: none;\n  }\n\n  .quantity > input {\n    width: 40px;\n    height: 40px;\n    left: calc(50% - 20px);\n  }\n\n  .remove svg {\n    width: 40px;\n    height: 40px;\n  }\n}\n\n/* --- MEDIUM & LARGE SCREEN --- */\n@media all and (min-width: 600px) {\n  html {\n    font-size: 14px;\n  }\n\n  .container {\n    width: 75%;\n    max-width: 960px;\n  }\n\n  .thumbnail,\n  .detail {\n    float: left;\n  }\n\n  .thumbnail {\n    width: 35%;\n  }\n\n  .detail {\n    width: 65%;\n  }\n\n  .promotion,\n  .summary {\n    width: 50%;\n  }\n\n  .checkout {\n    width: 100%;\n  }\n\n  .checkout,\n  .summary {\n    text-align: right;\n  }\n}\n\n/* --- LARGE SCREEN --- */\n@media all and (min-width: 992px) {\n  html {\n    font-size: 16px;\n  }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ })

},[[2,"runtime"]]]);
//# sourceMappingURL=styles.js.map