(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/block/blockUtil.js":
/*!********************************!*\
  !*** ./src/block/blockUtil.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const { pairBlockTypes, unifiedBlockTypes, blockTypes } = __webpack_require__(/*! ./constants */ \"./src/block/constants.js\")\nconst { getParamFromMatch } = __webpack_require__(/*! ./regex */ \"./src/block/regex.js\")\n\nconst getPairBlockType = (blockType) => {\n  const pairs = Object.entries(pairBlockTypes)\n  for (let [b1, b2] of pairs) {\n    if (blockType === b1) {\n      return b2\n    }\n  }\n}\n\nconst isClosedBlockType = (blockType) => {\n  return Object.values(pairBlockTypes).includes(blockType)\n}\n\nconst isUnifiedBlockType = (blockType) => {\n  return Object.values(unifiedBlockTypes).includes(blockType)\n}\n\nconst getBlockWithType = (type, match, blockString) => {\n  const block = { type, payload: {} }\n\n  if (isClosedBlockType(type)) {\n    block.childrenBlocks = []\n  }\n\n  if (match) {\n    block.payload.param = getParamFromMatch(type, match)          \n  } else {\n    block.payload.value = blockString    \n  }\n\n  return block\n}\n\nmodule.exports = {\n  getPairBlockType,\n  isClosedBlockType,\n  isUnifiedBlockType,\n  getBlockWithType\n}\n\n\n//# sourceURL=webpack:///./src/block/blockUtil.js?");

/***/ }),

/***/ "./src/block/constants.js":
/*!********************************!*\
  !*** ./src/block/constants.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const blockTypes = {\n  TEXT: 'TEXT',\n  LITERAL: 'LITERAL',\n  LITERAL_HELPER: 'LITERAL_HELPER',\n  IF_START: 'IF_START',\n  IF_END: 'IF_END',\n  LIST_START: 'LIST_START',\n  LIST_END: 'LIST_END',\n  IF: 'IF',\n  LIST: 'LIST'\n}\n\nconst blockSymbols = {\n  LEFT: '{',\n  RIGHT: '}'\n}\n\nconst pairBlockTypes = {\n  [blockTypes.IF_START]: blockTypes.IF_END,\n  [blockTypes.LIST_START]: blockTypes.LIST_END\n}\n\nconst unifiedBlockTypes = {\n  [blockTypes.IF_START]: blockTypes.IF,\n  [blockTypes.LIST_START]: blockTypes.LIST\n}\n\nmodule.exports = {\n  blockSymbols,\n  blockTypes,\n  unifiedBlockTypes,\n  pairBlockTypes\n}\n\n//# sourceURL=webpack:///./src/block/constants.js?");

/***/ }),

/***/ "./src/block/detector.js":
/*!*******************************!*\
  !*** ./src/block/detector.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Detector {\n  constructor (leftMax = 2, rightMax = 2) {\n    this.left = 0\n    this.right = 0\n    this.leftMax = leftMax\n    this.rightMax = rightMax\n    this._blockStartPos = 0\n    this._lastBlockEndPos = -1\n  }\n\n  get blockStartPos () {\n    return this._blockStartPos\n  }\n\n  get lastBlockEndPos () {\n    return this._lastBlockEndPos\n  }\n\n  set lastBlockEndPos (pos) {\n    this._lastBlockEndPos = pos\n  }\n\n  handleLeftSymbol (index) {\n    if (this.left < this.leftMax) {\n      this.left++\n    } else {\n      this.left = 1\n    }\n\n    if (this.left === 1) {\n      this._blockStartPos = index\n    }\n  }\n\n  handleRightSymbol () {\n    if (this.left < this.leftMax) {\n      this.left = 0\n      return\n    }\n    \n    if (this.right < this.rightMax) {\n      this.right++\n    }\n  }\n\n  handleOtherSymbols () {\n    if (this.left > 0 && this.left < this.leftMax) {\n      this.left = 0\n      this.right = 0\n    }\n  }\n\n  isBlockDetected () {\n    return this.left === this.leftMax && this.right === this.rightMax\n  }\n\n  resetSymbolCounters () {\n    this.left = 0\n    this.right = 0\n  }\n}\n\nmodule.exports = Detector\n\n\n//# sourceURL=webpack:///./src/block/detector.js?");

/***/ }),

/***/ "./src/block/regex.js":
/*!****************************!*\
  !*** ./src/block/regex.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const { blockTypes } = __webpack_require__(/*! ./constants */ \"./src/block/constants.js\")\n\nconst regexMap = {\n  [blockTypes.LITERAL]: /{+\\s*([a-zA-Z0-9.]+)\\s*}+/,\n  [blockTypes.LITERAL_HELPER]: /{+\\s*([a-zA-Z0-9.]+)\\s*([a-zA-Z0-9.]+)\\s*}+/,\n  [blockTypes.IF_START]: /{+\\s*#if\\s*([a-zA-Z0-9.]+)\\s*}+/,\n  [blockTypes.IF_END]: /{+\\/if}+/,\n  [blockTypes.LIST_START]: /{+\\s*#each\\s*([a-zA-Z0-9.]+)}+/,\n  [blockTypes.LIST_END]: /{+\\/each}+/\n}\n\nconst getParamFromMatch = (type, match) => {\n  switch (type) {\n    case blockTypes.LITERAL:\n    case blockTypes.IF_START:\n    case blockTypes.LIST_START:\n      return match[1]\n    case blockTypes.LITERAL_HELPER:\n      return [match[1], match[2]]\n    default:\n      return null\n  }\n}\n\nconst validate = (str) => {\n  const regexKeyValues = Object.entries(regexMap)\n  for (let i = 0; i < regexKeyValues.length; i++) {\n    const [key, regex] = regexKeyValues[i]\n    const match = regex.exec(str)\n    \n    if (match) {\n      return {\n        key,\n        match\n      }\n    }\n  }\n  return { match: null }\n}\n\n\nmodule.exports = {\n  validate,\n  getParamFromMatch\n}\n\n//# sourceURL=webpack:///./src/block/regex.js?");

/***/ }),

/***/ "./src/block/stringify.js":
/*!********************************!*\
  !*** ./src/block/stringify.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const { blockTypes } = __webpack_require__(/*! ./constants */ \"./src/block/constants.js\")\nconst { is, getValueWithKeyFromContexts, removeLastNewLine, cloneObj } = __webpack_require__(/*! ../util */ \"./src/util.js\")\n\nconst handleTextBlock = (block) => {\n  const { payload: { value }} = block\n  return value\n}\n\nconst handleLiteralBlock = (block, contexts) => {\n  const { payload: { param }} = block\n  const { value } = getValueWithKeyFromContexts(param, contexts)\n  if (!is.undefined(value)) {\n    if (is.func(value)) {\n      return value(contexts[0])\n    }\n    \n    return value\n  } else {\n    return ''\n  }\n}\n\nconst handleLiteralHelperBlock = (block, contexts) => {\n  const { payload: { param: [helperKey, valueKey] }} = block\n  const { value } = getValueWithKeyFromContexts(valueKey, contexts)\n  const { value: helper } = getValueWithKeyFromContexts(helperKey, contexts)\n\n  if (is.undefined(helper)) {\n    throw new Error(`Error: can't find ${helperKey}`)\n  }\n\n  if (!is.func(helper)) {\n    throw new Error(`Error: ${helperKey} must be a function, found ${typeof helper} along the contexts.`)\n  }\n\n  return helper(value)\n}\n\nconst handleIfBlock = (block, contexts) => {\n  const { payload: { param }, childrenBlocks } = block\n  const { value } = getValueWithKeyFromContexts(param, contexts)\n\n  if (!value) {\n    return ''\n  }\n\n  const contextsForChild = [...contexts]\n\n  if (is.pureObject(value)) {\n    // Only pure object, we add it to context stack.\n    contextsForChild.unshift(value)\n  }\n\n  const lastIndex = childrenBlocks.length - 1\n  return childrenBlocks.reduce((prev, block, index) => {\n    if (block.type === blockTypes.TEXT && index === lastIndex) {\n      block = beautifyTextBlock(block)\n    }\n    return prev + stringify(block, contextsForChild)\n  }, '')\n}\n\nconst handleListBlock = (block, contexts) => {\n  const { payload: { param }, childrenBlocks } = block\n  const { value } = getValueWithKeyFromContexts(param, contexts)\n\n  if (!value) {\n    return ''\n  }\n\n  if (!Array.isArray(value)) {\n    throw new Error('Error: must provide a list param for using list syntax')\n  }\n\n  return value.reduce((str, curr) => {\n    const contextsForChild = [curr, ...contexts]\n    const lastIndex = childrenBlocks.length - 1\n\n    return str + childrenBlocks.reduce((childStr, block, index) => {\n      if (block.type === blockTypes.TEXT && index === lastIndex) {\n        block = beautifyTextBlock(block)\n      }\n      return childStr + stringify(block, contextsForChild)\n    }, '')\n  }, '')\n}\n\nconst beautifyTextBlock = (block) => {\n  block = cloneObj(block)\n  const { payload: { value }} = block\n  block.payload.value = removeLastNewLine(value)\n  return block\n}\n\nconst handlersMap = {\n  [blockTypes.TEXT]: handleTextBlock,\n  [blockTypes.LITERAL]: handleLiteralBlock,\n  [blockTypes.IF]: handleIfBlock,\n  [blockTypes.LIST]: handleListBlock,\n  [blockTypes.LITERAL_HELPER]: handleLiteralHelperBlock\n}\n\nconst stringify = (block, contexts) => {\n  return handlersMap[block.type](block, contexts)\n}\n\nmodule.exports = stringify\n\n\n//# sourceURL=webpack:///./src/block/stringify.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Parser = __webpack_require__(/*! ./parser */ \"./src/parser.js\")\n\nmodule.exports = Parser\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/parser.js":
/*!***********************!*\
  !*** ./src/parser.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const BlockDetector = __webpack_require__(/*! ./block/detector */ \"./src/block/detector.js\")\nconst blockStringify = __webpack_require__(/*! ./block/stringify */ \"./src/block/stringify.js\")\nconst { removeFirstNewLine, removeLastNewLine } = __webpack_require__(/*! ./util */ \"./src/util.js\")\nconst { getBlockWithType, isUnifiedBlockType, isClosedBlockType, getPairBlockType } = __webpack_require__(/*! ./block/blockUtil */ \"./src/block/blockUtil.js\")\nconst { blockSymbols, blockTypes, unifiedBlockTypes } = __webpack_require__(/*! ./block/constants */ \"./src/block/constants.js\")\nconst { validate, getParamFromMatch } = __webpack_require__(/*! ./block/regex */ \"./src/block/regex.js\")\n\nclass Parser {\n  constructor (template, left=2, right=2) {\n    if (left !== right) {\n      throw new Error('Error: left must be equal to right')\n    }\n    this.template = template\n    this.blocks = null\n    // Current parsing row number\n    this.row = 1\n    // Current parsing column number\n    this.column = 1\n    this.left = left\n    this.right = right\n  }\n\n  parse () {\n    const { blocks } = this.parseBlocks(this.template)\n    this.blocks = blocks\n  }\n\n  /**\n   * Get all the semantic blocks out of template until the end of string or encountering the closedBlockType\n   * @param {string} template \n   * @param {blockType?} closedBlockType \n   */\n  parseBlocks (template, closedBlockType) {\n    const blockDetector = new BlockDetector(this.left, this.right)\n    const blocks = []\n    const lastPositionOfTemplate = template.length - 1\n\n    // Position of current parsing char\n    let i = 0\n  \n    while (i <= lastPositionOfTemplate) {\n      const c = template.charAt(i)\n      switch (c) {\n        case blockSymbols.LEFT:\n          blockDetector.handleLeftSymbol(i)\n          break\n        case blockSymbols.RIGHT:\n          blockDetector.handleRightSymbol()\n          if (blockDetector.isBlockDetected()) {\n            const blockStartPos = blockDetector.blockStartPos\n            const blockString = template.substring(blockStartPos, i + 1)\n            const restString = template.substring(i + 1)\n            const { isBlock, block, consumeLen } = this.checkBlock(blockString, restString)\n\n            if (isBlock) {\n              // Get the string between last block and current block.\n              let textString = template.substring(blockDetector.lastBlockEndPos + 1, blockStartPos)\n              \n              // If this is a unifiedBlock like if or each block,\n              // The indentation caused by this block should be ignore.\n              if (isUnifiedBlockType(block.type)) {\n                textString = removeLastNewLine(textString)\n              }\n\n              if (textString) {\n                blocks.push(getBlockWithType(blockTypes.TEXT, null, textString))\n              }\n\n              if (isClosedBlockType(block.type)) {\n                if (closedBlockType !== block.type) {\n                  throw new Error(`Error: wrong closed block type: expected: ${closedBlockType} got: ${block.type}, line: ${this.row}, column: ${this.column}`)\n                }\n\n                return { blockConsumeLen: i + 1, blocks }\n              }\n\n              blocks.push(block)\n              // Update lastBlockEndPos\n              blockDetector.lastBlockEndPos = blockStartPos + consumeLen - 1\n              i = blockDetector.lastBlockEndPos + 1         \n              blockDetector.resetSymbolCounters()\n              continue\n            }\n            blockDetector.resetSymbolCounters()\n          }\n          break\n        case '\\n':\n          this.row++\n          this.column = 0\n        default:\n          blockDetector.handleOtherSymbols()\n      }\n      i++\n      this.column++\n    }\n  \n    if (closedBlockType) {\n      throw new Error(`Error: unclosed block: line ${this.row}, column: ${this.column}`)\n    }\n  \n    if (blockDetector.lastBlockEndPos < lastPositionOfTemplate) {\n      blocks.push(getBlockWithType(blockTypes.TEXT, null, template.substring(blockDetector.lastBlockEndPos + 1)))\n    }\n  \n    return {\n      blocks,\n      blockConsumeLen: template.length\n    }\n  }\n\n  checkBlock (blockString, restString) {\n    const checkResult = {\n      isBlock: false, // indicates if this blockstring is a validate semantic block.\n      block: null,\n      consumeLen: 0 // how many chars has been consumed for creating this block.\n    }\n    const { key, match } = validate(blockString)\n    if (match) {\n      const { block, consumeLen } = this.consumeBlock(key, blockString, restString, match)\n      checkResult.isBlock = true\n      checkResult.block = block\n      checkResult.consumeLen = consumeLen\n    }\n    return checkResult\n  }\n\n  consumeBlock (type, blockString, restString, match) {\n    let block = getBlockWithType(type, match)\n    let consumeLen = blockString.length\n    const closedBlockType = getPairBlockType(type)\n\n    if (closedBlockType) {\n      const { blockConsumeLen, blocks } = this.parseBlocks(restString, closedBlockType)\n      consumeLen += blockConsumeLen\n      block.childrenBlocks = blocks\n      block.type = unifiedBlockTypes[type]\n    }\n  \n    return {\n      consumeLen,\n      block\n    }\n  }\n\n  generate (context) {\n    if (!this.blocks) {\n      throw new Error(\"Error: template hasn't been parsed!\")\n    }\n\n    const contexts = [context]\n    return this.blocks.reduce((str, block) => {\n      return str + blockStringify(block, contexts)\n    }, '')\n  }\n}\n\nmodule.exports = Parser\n\n\n//# sourceURL=webpack:///./src/parser.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const is = {\n  pureObject: v => {\n    return v && typeof v === 'object' && v !== null && v.constructor === Object\n  },\n  undefined: v => v == null,\n  strOnlyContainsWhitespaces: str => /^\\s*$/.test(str),\n  func: v => typeof v === 'function'\n}\n\nconst cloneObj = obj => JSON.parse(JSON.stringify(obj))\n\nconst getValueWithKeyFromContexts = (key, contexts) => {\n  const keys = getKeys(key)\n  for (let context of contexts) {\n    const value = getValueWithKeys(keys, context)\n    if (value) {\n      return { value, context }\n    }\n  }\n\n  return { value: null, context: null }\n}\n\nconst getValueWithKeys = (keys, obj) => {\n  const keyQueue = [...keys]\n\n  if (!is.pureObject(obj)) {\n    return null\n  }\n\n  let curr = obj\n  while (keyQueue.length && is.pureObject(curr)) {\n    const key = keyQueue.shift()\n    const value = curr[key]\n    curr = value\n  }\n  \n  if (keyQueue.length) {\n    return null\n  }\n\n  return curr\n}\n\nconst getKeys = (key) => {\n  return key.split('.')\n}\n\nconst removeFirstNewLine = (str) => {\n  const newLineIndex = str.indexOf('\\n')\n  let strAfterNewline = str\n\n  if (newLineIndex !== -1) {\n    const strBeforeNewline = str.substring(0, newLineIndex)\n\n    if (is.strOnlyContainsWhitespaces(strBeforeNewline)) {\n      strAfterNewline = str.substring(newLineIndex + 1)      \n    }\n  }\n\n  return strAfterNewline\n}\n\nconst removeLastNewLine = (str) => {\n  const newLineIndex = str.lastIndexOf('\\n')\n  let strBeforeNewline = str\n\n  if (newLineIndex !== -1) {\n    const strAfterNewline = str.substring(newLineIndex)\n\n    if (is.strOnlyContainsWhitespaces(strAfterNewline)) {\n      strBeforeNewline = str.substring(0, newLineIndex)\n    }\n  }\n\n  return strBeforeNewline\n}\n\nmodule.exports = {\n  is,\n  getKeys,\n  cloneObj,\n  removeFirstNewLine,\n  removeLastNewLine,\n  getValueWithKeyFromContexts,\n  getValueWithKeys\n}\n\n\n//# sourceURL=webpack:///./src/util.js?");

/***/ })

/******/ });
});