const blockTypes = {
  TEXT: 'TEXT',
  LITERAL: 'LITERAL',
  LITERAL_HELPER: 'LITERAL_HELPER',
  IF_START: 'IF_START',
  IF_END: 'IF_END',
  LIST_START: 'LIST_START',
  LIST_END: 'LIST_END',
  IF: 'IF',
  LIST: 'LIST'
}

const blockSymbols = {
  LEFT: '{',
  RIGHT: '}'
}

const pairBlockTypes = {
  [blockTypes.IF_START]: blockTypes.IF_END,
  [blockTypes.LIST_START]: blockTypes.LIST_END
}

const unifiedBlockTypes = {
  [blockTypes.IF_START]: blockTypes.IF,
  [blockTypes.LIST_START]: blockTypes.LIST
}

module.exports = {
  blockSymbols,
  blockTypes,
  unifiedBlockTypes,
  pairBlockTypes
}