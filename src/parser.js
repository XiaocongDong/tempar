const BlockDetector = require('./block/detector')
const blockStringify = require('./block/stringify')
const { removeFirstNewLine, removeLastNewLine } = require('./util')
const { getBlockWithType, isUnifiedBlockType, isClosedBlockType, getPairBlockType } = require('./block/blockUtil')
const { blockSymbols, blockTypes, unifiedBlockTypes } = require('./block/constants')
const { validate, getParamFromMatch } = require('./block/regex')

class Parser {
  constructor (template, left=2, right=2) {
    if (left !== right) {
      throw new Error('Error: left must be equal to right')
    }
    this.template = template
    this.blocks = null
    // Current parsing row number
    this.row = 1
    // Current parsing column number
    this.column = 1
    this.left = left
    this.right = right
  }

  parse () {
    const { blocks } = this.parseBlocks(this.template)
    this.blocks = blocks
  }

  /**
   * Get all the semantic blocks out of template until the end of string or encountering the closedBlockType
   * @param {string} template 
   * @param {blockType?} closedBlockType 
   */
  parseBlocks (template, closedBlockType) {
    const blockDetector = new BlockDetector(this.left, this.right)
    const blocks = []
    const lastPositionOfTemplate = template.length - 1

    // Position of current parsing char
    let i = 0
  
    while (i <= lastPositionOfTemplate) {
      const c = template.charAt(i)
      switch (c) {
        case blockSymbols.LEFT:
          blockDetector.handleLeftSymbol(i)
          break
        case blockSymbols.RIGHT:
          blockDetector.handleRightSymbol()
          if (blockDetector.isBlockDetected()) {
            const blockStartPos = blockDetector.blockStartPos
            const blockString = template.substring(blockStartPos, i + 1)
            const restString = template.substring(i + 1)
            const { isBlock, block, consumeLen } = this.checkBlock(blockString, restString)

            if (isBlock) {
              // Get the string between last block and current block.
              let textString = template.substring(blockDetector.lastBlockEndPos + 1, blockStartPos)
              
              // If this is a unifiedBlock like if or each block,
              // The indentation caused by this block should be ignore.
              if (isUnifiedBlockType(block.type)) {
                textString = removeLastNewLine(textString)
              }

              if (textString) {
                blocks.push(getBlockWithType(blockTypes.TEXT, null, textString))
              }

              if (isClosedBlockType(block.type)) {
                if (closedBlockType !== block.type) {
                  throw new Error(`Error: wrong closed block type: expected: ${closedBlockType} got: ${block.type}, line: ${this.row}, column: ${this.column}`)
                }

                return { blockConsumeLen: i + 1, blocks }
              }

              blocks.push(block)
              // Update lastBlockEndPos
              blockDetector.lastBlockEndPos = blockStartPos + consumeLen - 1
              i = blockDetector.lastBlockEndPos + 1         
              blockDetector.resetSymbolCounters()
              continue
            }
            blockDetector.resetSymbolCounters()
          }
          break
        case '\n':
          this.row++
          this.column = 0
        default:
          blockDetector.handleOtherSymbols()
      }
      i++
      this.column++
    }
  
    if (closedBlockType) {
      throw new Error(`Error: unclosed block: line ${this.row}, column: ${this.column}`)
    }
  
    if (blockDetector.lastBlockEndPos < lastPositionOfTemplate) {
      blocks.push(getBlockWithType(blockTypes.TEXT, null, template.substring(blockDetector.lastBlockEndPos + 1)))
    }
  
    return {
      blocks,
      blockConsumeLen: template.length
    }
  }

  checkBlock (blockString, restString) {
    const checkResult = {
      isBlock: false, // indicates if this blockstring is a validate semantic block.
      block: null,
      consumeLen: 0 // how many chars has been consumed for creating this block.
    }
    const { key, match } = validate(blockString)
    if (match) {
      const { block, consumeLen } = this.consumeBlock(key, blockString, restString, match)
      checkResult.isBlock = true
      checkResult.block = block
      checkResult.consumeLen = consumeLen
    }
    return checkResult
  }

  consumeBlock (type, blockString, restString, match) {
    let block = getBlockWithType(type, match)
    let consumeLen = blockString.length
    const closedBlockType = getPairBlockType(type)

    if (closedBlockType) {
      const { blockConsumeLen, blocks } = this.parseBlocks(restString, closedBlockType)
      consumeLen += blockConsumeLen
      block.childrenBlocks = blocks
      block.type = unifiedBlockTypes[type]
    }
  
    return {
      consumeLen,
      block
    }
  }

  generate (context) {
    if (!this.blocks) {
      throw new Error("Error: template hasn't been parsed!")
    }

    const contexts = [context]
    return this.blocks.reduce((str, block) => {
      return str + blockStringify(block, contexts)
    }, '')
  }
}

module.exports = Parser
