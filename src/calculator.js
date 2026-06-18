#!/usr/bin/env node

/**
 * Node.js CLI Calculator App
 * 
 * Supported Operations:
 * - Addition (+)
 * - Subtraction (-)
 * - Multiplication (*)
 * - Division (/)
 * - Modulo (%)
 * - Power (^)
 * - Square Root (sqrt)
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
  },
  
  // Modulo: returns the remainder of a divided by b
  modulo: (a, b) => {
    if (b === 0) {
      throw new Error('Cannot perform modulo with zero divisor');
    }
    return a % b;
  },
  
  // Power/Exponentiation: returns base raised to the exponent
  power: (base, exponent) => Math.pow(base, exponent),
  
  // Square Root: returns the square root of n with error handling for negative numbers
  squareRoot: (n) => {
    if (n < 0) {
      throw new Error('Cannot calculate square root of a negative number');
    }
    return Math.sqrt(n);
  }
};

// Map operators to their corresponding functions
const operators = {
  '+': 'add',
  '-': 'subtract',
  '*': 'multiply',
  '/': 'divide',
  '%': 'modulo',
  '^': 'power'
};

// Parse and evaluate expression
function evaluateExpression(expression) {
  const trimmed = expression.trim();
  
  // Check for sqrt function (single operand)
  const sqrtMatch = trimmed.match(/^sqrt\s*\(\s*(-?\d+\.?\d*)\s*\)$/i);
  if (sqrtMatch) {
    const num = parseFloat(sqrtMatch[1]);
    if (isNaN(num)) {
      throw new Error('Invalid number provided');
    }
    return calculator.squareRoot(num);
  }
  
  // Match pattern: number operator number
  const match = trimmed.match(/^(-?\d+\.?\d*)\s*([+\-*/%^])\s*(-?\d+\.?\d*)$/);
  
  if (!match) {
    throw new Error('Invalid expression format. Use: number operator number (e.g., 5 + 3) or sqrt(n)');
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
console.log('\nSupported operations: + - * / % ^ sqrt');
console.log('Examples: 10 + 5, 2 ^ 3, 20 % 7, sqrt(16)\n');

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
