const { blockTypes } = require('./constants')
const { is, getValueWithKeyFromContexts, removeFirstNewLine } = require('../util')

const handleTextBlock = (block) => {
  const { payload: { value }} = block
  return value
}

const handleLiteralBlock = (block, contexts) => {
  const { payload: { param }} = block
  const { value } = getValueWithKeyFromContexts(param, contexts)
  if (!is.undefined(value)) {
    if (is.func(value)) {
      return value(contexts[0])
    }
    
    return value
  } else {
    return ''
  }
}

const handleLiteralHelperBlock = (block, contexts) => {
  const { payload: { param: [helperKey, valueKey] }} = block
  const { value } = getValueWithKeyFromContexts(valueKey, contexts)
  const { value: helper } = getValueWithKeyFromContexts(helperKey, contexts)

  if (is.undefined(helper)) {
    throw new Error(`Error: can't find ${helperKey}`)
  }

  if (!is.func(helper)) {
    throw new Error(`Error: ${helperKey} must be a function, found ${typeof helper} along the contexts.`)
  }

  return helper(value)
}

const handleIfBlock = (block, contexts) => {
  const { payload: { param }, childrenBlocks } = block
  const { value } = getValueWithKeyFromContexts(param, contexts)

  if (!value) {
    return ''
  }

  const contextsForChild = [...contexts]

  if (is.pureObject(value)) {
    // Only pure object, we add it to context stack.
    contextsForChild.unshift(value)
  }

  const lastIndex = childrenBlocks.length - 1
  return childrenBlocks.reduce((prev, block, index) => {
    if (block.type === blockTypes.TEXT && index === lastIndex) {
      beautifyTextBlock(block)
    }
    return prev + stringify(block, contextsForChild)
  }, '')
}

const handleListBlock = (block, contexts) => {
  const { payload: { param }, childrenBlocks } = block
  const { value } = getValueWithKeyFromContexts(param, contexts)

  if (!value) {
    return ''
  }

  if (!Array.isArray(value)) {
    throw new Error('Error: must provide a list param for using list syntax')
  }

  return value.reduce((str, curr) => {
    const contextsForChild = [curr, ...contexts]
    const lastIndex = childrenBlocks.length - 1

    return str + childrenBlocks.reduce((childStr, block, index) => {
      if (block.type === blockTypes.TEXT && index === lastIndex) {
        beautifyTextBlock(block)
      }
      return childStr + stringify(block, contextsForChild)
    }, '')
  }, '')
}

const beautifyTextBlock = (block) => {
  const { payload: { value }} = block
  block.payload.value = removeFirstNewLine(value)
}

const handlersMap = {
  [blockTypes.TEXT]: handleTextBlock,
  [blockTypes.LITERAL]: handleLiteralBlock,
  [blockTypes.IF]: handleIfBlock,
  [blockTypes.LIST]: handleListBlock,
  [blockTypes.LITERAL_HELPER]: handleLiteralHelperBlock
}

const stringify = (block, contexts) => {
  return handlersMap[block.type](block, contexts)
}

module.exports = stringify
