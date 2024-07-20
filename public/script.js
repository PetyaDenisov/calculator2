function addCalculator() {
    const container = document.getElementById('calculators-container');
    const calculatorId = `calculator-${Date.now()}`;
    const calculatorHtml = `
      <div class="calculator" id="${calculatorId}">
        <span class="close-btn" onclick="removeCalculator('${calculatorId}')">&times;</span>
        <input id="display" readonly>
        <div id="keys">
          <button onclick="appendNumber('${calculatorId}', '1')">1</button>
          <button onclick="appendNumber('${calculatorId}', '2')">2</button>
          <button onclick="appendNumber('${calculatorId}', '3')">3</button>
          <button class="operator-btn" onclick="appendOperator('${calculatorId}', '+')">+</button>
          <button onclick="appendNumber('${calculatorId}', '4')">4</button>
          <button onclick="appendNumber('${calculatorId}', '5')">5</button>
          <button onclick="appendNumber('${calculatorId}', '6')">6</button>
          <button class="operator-btn" onclick="appendOperator('${calculatorId}', '-')">-</button>
          <button  onclick="appendNumber('${calculatorId}', '7')">7</button>
          <button onclick="appendNumber('${calculatorId}', '8')">8</button>
          <button onclick="appendNumber('${calculatorId}', '9')">9</button>
          <button class="operator-btn" onclick="appendOperator('${calculatorId}', '*')">*</button>
          <button onclick="appendNumber('${calculatorId}', '0')">0</button>
          <button class="operator-btn" onclick="clearDisplay('${calculatorId}')">C</button>
          <button class="operator-btn" onclick="appendOperator('${calculatorId}', '/')">/</button>
          <button class="operator-btn"  onclick="removeElementFromDisplayValue('${calculatorId}', '←')">←</button>
          <button class="operator-btn" onclick="calculate('${calculatorId}')">=</button>
        </div>
      </div>
      <h1></h1>
    `;
    container.insertAdjacentHTML('beforeend', calculatorHtml);
  }

  function appendNumber(calculatorId, number) {
    const display = document.querySelector(`#${calculatorId} input`);
    display.value += number;
  }

  function appendOperator(calculatorId, operator) {
    const display = document.querySelector(`#${calculatorId} input`);
    display.value += operator;
  }

  function clearDisplay(calculatorId) {
    const display = document.querySelector(`#${calculatorId} input`);
    display.value = '';
  }

  async function calculate(calculatorId) {
    const display = document.querySelector(`#${calculatorId} input`);
    const expression = display.value;
    const response = await fetch('/calculate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ expression })
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      display.value = data.result;
    }
  }

  function removeCalculator(calculatorId) {
    const calculator = document.getElementById(calculatorId);
    calculator.remove();
  }

  function removeElementFromDisplayValue(calculatorId) {
    const display = document.querySelector(`#${calculatorId} input`);
    if(display.value != '')
        display.value = display.value.slice(0, -1);
}