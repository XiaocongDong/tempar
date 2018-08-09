const is = {
  pureObject: v => {
    return v && typeof v === 'object' && v !== null && v.constructor === Object
  },
  undefined: v => v == null,
  strOnlyContainsWhitespaces: str => /^\s*$/.test(str),
  func: v => typeof v === 'function'
}

const cloneObj = obj => JSON.parse(JSON.stringify(obj))

const getValueWithKeyFromContexts = (key, contexts) => {
  const keys = getKeys(key)
  for (let context of contexts) {
    const value = getValueWithKeys(keys, context)
    if (value) {
      return { value, context }
    }
  }

  return { value: null, context: null }
}

const getValueWithKeys = (keys, obj) => {
  const keyQueue = [...keys]

  if (!is.pureObject(obj)) {
    return null
  }

  let curr = obj
  while (keyQueue.length && is.pureObject(curr)) {
    const key = keyQueue.shift()
    const value = curr[key]
    curr = value
  }
  
  if (keyQueue.length) {
    return null
  }

  return curr
}

const getKeys = (key) => {
  return key.split('.')
}

const removeFirstNewLine = (str) => {
  const newLineIndex = str.indexOf('\n')
  let strAfterNewline = str

  if (newLineIndex !== -1) {
    const strBeforeNewline = str.substring(0, newLineIndex)

    if (is.strOnlyContainsWhitespaces(strBeforeNewline)) {
      strAfterNewline = str.substring(newLineIndex + 1)      
    }
  }

  return strAfterNewline
}

const removeLastNewLine = (str) => {
  const newLineIndex = str.lastIndexOf('\n')
  let strBeforeNewline = str

  if (newLineIndex !== -1) {
    const strAfterNewline = str.substring(newLineIndex)

    if (is.strOnlyContainsWhitespaces(strAfterNewline)) {
      strBeforeNewline = str.substring(0, newLineIndex)
    }
  }

  return strBeforeNewline
}

module.exports = {
  is,
  getKeys,
  cloneObj,
  removeFirstNewLine,
  removeLastNewLine,
  getValueWithKeyFromContexts,
  getValueWithKeys
}
