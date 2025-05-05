"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@heroui+use-callback-ref@2.1.7_react@18.3.1";
exports.ids = ["vendor-chunks/@heroui+use-callback-ref@2.1.7_react@18.3.1"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/@heroui+use-callback-ref@2.1.7_react@18.3.1/node_modules/@heroui/use-callback-ref/dist/index.mjs":
/*!*****************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@heroui+use-callback-ref@2.1.7_react@18.3.1/node_modules/@heroui/use-callback-ref/dist/index.mjs ***!
  \*****************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   useCallbackRef: () => (/* binding */ useCallbackRef)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(ssr)/./node_modules/.pnpm/next@15.1.6_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js\");\n/* harmony import */ var _heroui_use_safe_layout_effect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @heroui/use-safe-layout-effect */ \"(ssr)/./node_modules/.pnpm/@heroui+use-safe-layout-effect@2.1.7_react@18.3.1/node_modules/@heroui/use-safe-layout-effect/dist/index.mjs\");\n// src/index.ts\n\n\nfunction useCallbackRef(fn, deps = []) {\n  const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(fn);\n  (0,_heroui_use_safe_layout_effect__WEBPACK_IMPORTED_MODULE_1__.useSafeLayoutEffect)(() => {\n    ref.current = fn;\n  });\n  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((...args) => {\n    var _a;\n    return (_a = ref.current) == null ? void 0 : _a.call(ref, ...args);\n  }, deps);\n}\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vQGhlcm91aSt1c2UtY2FsbGJhY2stcmVmQDIuMS43X3JlYWN0QDE4LjMuMS9ub2RlX21vZHVsZXMvQGhlcm91aS91c2UtY2FsbGJhY2stcmVmL2Rpc3QvaW5kZXgubWpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQzRDO0FBQ3lCO0FBQ3JFO0FBQ0EsY0FBYyw2Q0FBTTtBQUNwQixFQUFFLG1GQUFtQjtBQUNyQjtBQUNBLEdBQUc7QUFDSCxTQUFTLGtEQUFXO0FBQ3BCO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFHRSIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxBRE1JTlxcRG9jdW1lbnRzXFxwcm9qZWN0XFxtaW5kYXJ5X3YyXFxNaW5kYXJ5LUZyb250ZW5kLUZURUNIXFxub2RlX21vZHVsZXNcXC5wbnBtXFxAaGVyb3VpK3VzZS1jYWxsYmFjay1yZWZAMi4xLjdfcmVhY3RAMTguMy4xXFxub2RlX21vZHVsZXNcXEBoZXJvdWlcXHVzZS1jYWxsYmFjay1yZWZcXGRpc3RcXGluZGV4Lm1qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBzcmMvaW5kZXgudHNcbmltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHVzZVNhZmVMYXlvdXRFZmZlY3QgfSBmcm9tIFwiQGhlcm91aS91c2Utc2FmZS1sYXlvdXQtZWZmZWN0XCI7XG5mdW5jdGlvbiB1c2VDYWxsYmFja1JlZihmbiwgZGVwcyA9IFtdKSB7XG4gIGNvbnN0IHJlZiA9IHVzZVJlZihmbik7XG4gIHVzZVNhZmVMYXlvdXRFZmZlY3QoKCkgPT4ge1xuICAgIHJlZi5jdXJyZW50ID0gZm47XG4gIH0pO1xuICByZXR1cm4gdXNlQ2FsbGJhY2soKC4uLmFyZ3MpID0+IHtcbiAgICB2YXIgX2E7XG4gICAgcmV0dXJuIChfYSA9IHJlZi5jdXJyZW50KSA9PSBudWxsID8gdm9pZCAwIDogX2EuY2FsbChyZWYsIC4uLmFyZ3MpO1xuICB9LCBkZXBzKTtcbn1cbmV4cG9ydCB7XG4gIHVzZUNhbGxiYWNrUmVmXG59O1xuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/@heroui+use-callback-ref@2.1.7_react@18.3.1/node_modules/@heroui/use-callback-ref/dist/index.mjs\n");

/***/ })

};
;