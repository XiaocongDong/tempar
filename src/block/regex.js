const { blockTypes } = require('./constants')

const regexMap = {
  [blockTypes.LITERAL]: /{+\s*([a-zA-Z0-9.]+)\s*}+/,
  [blockTypes.LITERAL_HELPER]: /{+\s*([a-zA-Z0-9.]+)\s*([a-zA-Z0-9.]+)\s*}+/,
  [blockTypes.IF_START]: /{+\s*#if\s*([a-zA-Z0-9.]+)\s*}+/,
  [blockTypes.IF_END]: /{+\/if}+/,
  [blockTypes.LIST_START]: /{+\s*#each\s*([a-zA-Z0-9.]+)}+/,
  [blockTypes.LIST_END]: /{+\/each}+/
}

const getParamFromMatch = (type, match) => {
  switch (type) {
    case blockTypes.LITERAL:
    case blockTypes.IF_START:
    case blockTypes.LIST_START:
      return match[1]
    case blockTypes.LITERAL_HELPER:
      return [match[1], match[2]]
    default:
      return null
  }
}

const validate = (str) => {
  const regexKeyValues = Object.entries(regexMap)
  for (let i = 0; i < regexKeyValues.length; i++) {
    const [key, regex] = regexKeyValues[i]
    const match = regex.exec(str)
    
    if (match) {
      return {
        key,
        match
      }
    }
  }
  return { match: null }
}


module.exports = {
  validate,
  getParamFromMatch
}