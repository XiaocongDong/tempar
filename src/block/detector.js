class Detector {
  constructor (leftMax = 2, rightMax = 2) {
    this.left = 0
    this.right = 0
    this.leftMax = leftMax
    this.rightMax = rightMax
    this._blockStartPos = 0
    this._lastBlockEndPos = -1
  }

  get blockStartPos () {
    return this._blockStartPos
  }

  get lastBlockEndPos () {
    return this._lastBlockEndPos
  }

  set lastBlockEndPos (pos) {
    this._lastBlockEndPos = pos
  }

  handleLeftSymbol (index) {
    if (this.left < this.leftMax) {
      this.left++
    } else {
      this.left = 1
    }

    if (this.left === 1) {
      this._blockStartPos = index
    }
  }

  handleRightSymbol () {
    if (this.left < this.leftMax) {
      this.left = 0
      return
    }
    
    if (this.right < this.rightMax) {
      this.right++
    }
  }

  handleOtherSymbols () {
    if (this.left > 0 && this.left < this.leftMax) {
      this.left = 0
      this.right = 0
    }
  }

  isBlockDetected () {
    return this.left === this.leftMax && this.right === this.rightMax
  }

  resetSymbolCounters () {
    this.left = 0
    this.right = 0
  }
}

module.exports = Detector
