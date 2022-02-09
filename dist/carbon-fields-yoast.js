/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/carbon-fields-yoast.js":
/*!************************************!*\
  !*** ./src/carbon-fields-yoast.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass CarbonFieldsYoast {\n\t/**\n\t * Plugin name.\n\t *\n\t * @type {String}\n\t */\n\tname = 'CarbonFieldsYoast';\n\n\t/**\n\t * Plugin version.\n\t *\n\t * @type {String}\n\t */\n\tversion = '2.0.0-alpha.1';\n\n\t/**\n\t * Additional content.\n\t *\n\t * @type {String}\n\t */\n\tadditionalContent = '';\n\n\t/**\n\t * Refresh interval in ms.\n\t *\n\t * @type {Number}\n\t */\n\trefreshInterval = 300;\n\n\t/**\n\t * Constructor\n\t *\n\t * @type {Object} params\n\t */\n\tconstructor(params = {}) {\n\t\tthis.additionalContent = '';\n\n\t\tthis.init();\n\t}\n\n\t/**\n\t * Initialize.\n\t *\n\t * @return {void}\n\t */\n\tinit() {\n\t\tYoastSEO.app.registerPlugin(this.name, {\n\t\t\tstatus: 'ready'\n\t\t});\n\n\t\tYoastSEO.app.registerModification('content', (content) => {\n\t\t\treturn content + ' ' + this.additionalContent;\n\t\t}, this.name, 5);\n\n\t\tthis.invokeUpdate();\n\n\t\twindow.cf.vendor['@wordpress/data'].subscribe(() => {\n\t\t\tthis.invokeUpdate();\n\t\t});\n\t}\n\n\t/**\n\t * Refresh content with field updates.\n\t *\n\t * @return {void}\n\t */\n\tasync invokeUpdate() {\n\t\tawait setTimeout(async () => {\n\t\t\tthis.additionalContent = '';\n\n\t\t\tconst fields = window.cf.vendor['@wordpress/data']\n\t\t\t\t.select('carbon-fields/metaboxes')\n\t\t\t\t.getFields();\n\n\t\t\tfor (let fieldId in fields) {\n\t\t\t\tconst field = fields[fieldId];\n\n\t\t\t\t// Other fields\n\t\t\t\tthis.additionalContent += await this.getFieldContent(field);\n\t\t\t}\n\n\t\t\tYoastSEO.app.pluginReloaded(this.name);\n\t\t}, this.refreshInterval);\n\t}\n\n\t/**\n\t * Returns the value of a field.\n\t *\n\t * @param {Object} field\n\t * @return {String}\n\t */\n\tasync getFieldContent(field) {\n\t\tlet content = '';\n\n\t\t// Complex field\n\t\tif (field.type === 'complex') {\n\t\t\t// do nothing..\n\t\t} else if ((['image', 'media_gallery'].indexOf(field.type) !== -1) && field.value) {\n\t\t\tconst attachments = await window.wp.ajax.post( 'query-attachments', {\n\t\t\t\tquery: {\n\t\t\t\t\tpost__in: field.type === 'media_gallery' ? field.value : [ field.value ]\n\t\t\t\t}\n\t\t\t} );\n\n\t\t\tattachments.forEach( ( attachment ) => {\n\t\t\t\tcontent += `<img src=\"${attachment.url}\" alt=\"${attachment.alt}\" title=\"${attachment.title}\">`;\n\t\t\t});\n\t\t}\n\n\t\treturn content;\n\t}\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CarbonFieldsYoast);\n\n\n//# sourceURL=webpack://carbon-fields-yoast/./src/carbon-fields-yoast.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _carbon_fields_yoast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./carbon-fields-yoast */ \"./src/carbon-fields-yoast.js\");\n/**\n * Internal dependencies\n */\n\n\n/**\n * Initialize module\n */\nif ( window.hasOwnProperty( 'cf' ) ) {\n\tif (\n\t\ttypeof YoastSEO !== 'undefined'\n\t\t&& typeof YoastSEO.app !== 'undefined'\n\t) {\n\t\tnew _carbon_fields_yoast__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n\t} else {\n\t\tjQuery( window ).on( 'YoastSEO:ready', () => {\n\t\t\tnew _carbon_fields_yoast__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n\t\t} );\n\t}\n}\n\n\n//# sourceURL=webpack://carbon-fields-yoast/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;