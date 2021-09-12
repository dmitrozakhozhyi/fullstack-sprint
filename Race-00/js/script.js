
class Calculator {
  constructor(prevValueTextArea, currentTextArea) {
    this.prevValueTextArea = prevValueTextArea
    this.currentTextArea = currentTextArea
    this.clear()
  }
  
  clear() {
    this.prevValueOperand = ''
    this.currentOperand = ''
    this.operation = undefined
  }

  percent() {
    this.currentOperand = eval(this.currentOperand) / 100;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return//чтоб не ставилась 2 или больше раз точка
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  chooseOperatioon(operation) {
    if (this.currentOperand === '') return
    if (this.prevValueOperand !== '') {
      this.compute()
    }    
    this.operation = operation    
    this.prevValueOperand = this.currentOperand
    this.currentOperand = ''
  }

  changeNegative() {
    this.currentOperand *= -1
  }

  sqrt() {
    const current = parseFloat(this.currentOperand)
    if (isNaN(current)) return
    if (current < 0) {
      console.log('Не извлекай корень квадратный из отрицательного числа !')
      return
    } else {
      this.currentOperand = Math.sqrt(current)
      this.operation = undefined
    }
  }

  compute() {
    let computation;
    const prev = parseFloat(this.prevValueOperand),
          current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return //если поля пустые и мы нажимаем на = , то ничего не происходит 
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '×':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
    }

    this.currentOperand = computation
    this.operation = undefined
    this.prevValueOperand = ''
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.currentTextArea.innerText =
      this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.prevValueTextArea.innerText =
        `${this.getDisplayNumber(this.prevValueOperand)} ${this.operation}`
    } else {
      this.prevValueTextArea.innerText = ''
    }
  }
}

const numberButtons = document.querySelectorAll('[data-number]'),
      operationButtons = document.querySelectorAll('[data-operation]'),
      equalsButtons = document.querySelector('[data-equals]'),
      deleteButtons = document.querySelector('[data-delete]'),
      clearButtons = document.querySelector('[data-all-clear]'),      
      percentButtons = document.querySelector('[data-percent]'),
      negativeButtons = document.querySelector('[data-change-negative]'),
      sqrtButtons = document.querySelector('[data-sqrt]');
let prevValueTextArea = document.querySelector('[data-prevValue]'),
    currentTextArea = document.querySelector('[data-currentNumber ]');


const calculator = new Calculator(
  prevValueTextArea,
  currentTextArea
);

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperatioon(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButtons.addEventListener('click', button => {
  calculator.compute();
  calculator.updateDisplay();
})

clearButtons.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButtons.addEventListener('click', () => {
  calculator.delete()
  calculator.updateDisplay()
})

negativeButtons.addEventListener('click', () => {
  calculator.changeNegative()
  calculator.updateDisplay()
})

sqrtButtons.addEventListener('click', () => {
  calculator.sqrt()
  calculator.updateDisplay()
})

percentButtons.addEventListener('click', button => {
  calculator.percent()
  calculator.updateDisplay()
})