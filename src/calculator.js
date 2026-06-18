#!/usr/bin/env node

/**
 * Node.js CLI Calculator App
 * 
 * Supported Operations:
 * - Addition (+)
 * - Subtraction (-)
 * - Multiplication (*)
 * - Division (/)
 */

const readline = require('readline');

// Calculator functions for the four basic math operations
const calculator = {
  // Addition: adds two numbers
  add: (a, b) => a + b,
  
  // Subtraction: subtracts b from a
  subtract: (a, b) => a - b,
  
  // Multiplication: multiplies two numbers
  multiply: (a, b) => a * b,
  
  // Division: divides a by b (with error handling for division by zero)
  divide: (a, b) => {
    if (b === 0) {
      throw new Error('Cannot divide by zero');
    }
    return a / b;
  }
};

// Map operators to their corresponding functions
const operators = {
  '+': 'add',
  '-': 'subtract',
  '*': 'multiply',
  '/': 'divide'
};

// Parse and evaluate expression
function evaluateExpression(expression) {
  const trimmed = expression.trim();
  
  // Match pattern: number operator number
  const match = trimmed.match(/^(-?\d+\.?\d*)\s*([+\-*/])\s*(-?\d+\.?\d*)$/);
  
  if (!match) {
    throw new Error('Invalid expression format. Use: number operator number (e.g., 5 + 3)');
  }
  
  const [, num1Str, operator, num2Str] = match;
  const num1 = parseFloat(num1Str);
  const num2 = parseFloat(num2Str);
  
  if (isNaN(num1) || isNaN(num2)) {
    throw new Error('Invalid numbers provided');
  }
  
  const operation = operators[operator];
  if (!operation) {
    throw new Error(`Unsupported operator: ${operator}`);
  }
  
  return calculator[operation](num1, num2);
}

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('='.repeat(50));
console.log('Welcome to the Node.js CLI Calculator!');
console.log('='.repeat(50));
console.log('\nSupported operations: + - * /');
console.log('Example: 10 + 5\n');

function promptUser() {
  rl.question('Enter expression (or "exit" to quit): ', (input) => {
    if (input.toLowerCase() === 'exit') {
      console.log('\nThank you for using the calculator. Goodbye!');
      rl.close();
      return;
    }
    
    try {
      const result = evaluateExpression(input);
      console.log(`Result: ${result}\n`);
    } catch (error) {
      console.log(`Error: ${error.message}\n`);
    }
    
    promptUser();
  });
}

promptUser();

// Export calculator functions for testing
module.exports = { calculator, evaluateExpression };
