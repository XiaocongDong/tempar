const { pairBlockTypes, unifiedBlockTypes, blockTypes } = require('./constants')
const { getParamFromMatch } = require('./regex')

const getPairBlockType = (blockType) => {
  const pairs = Object.entries(pairBlockTypes)
  for (let [b1, b2] of pairs) {
    if (blockType === b1) {
      return b2
    }
  }
}

const isClosedBlockType = (blockType) => {
  return Object.values(pairBlockTypes).includes(blockType)
}

const isUnifiedBlockType = (blockType) => {
  return Object.values(unifiedBlockTypes).includes(blockType)
}

const getBlockWithType = (type, match, blockString) => {
  const block = { type, payload: {} }

  if (isClosedBlockType(type)) {
    block.childrenBlocks = []
  }

  if (match) {
    block.payload.param = getParamFromMatch(type, match)          
  } else {
    block.payload.value = blockString    
  }

  return block
}

module.exports = {
  getPairBlockType,
  isClosedBlockType,
  isUnifiedBlockType,
  getBlockWithType
}
