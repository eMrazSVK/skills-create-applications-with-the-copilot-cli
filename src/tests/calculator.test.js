/**
 * Comprehensive Unit Tests for Calculator Functions
 * Tests all four basic math operations and edge cases
 */

const { calculator, evaluateExpression } = require('../calculator');

describe('Calculator - Addition Tests', () => {
  test('adds two positive numbers', () => {
    expect(calculator.add(2, 3)).toBe(5);
  });

  test('adds positive and negative numbers', () => {
    expect(calculator.add(10, -5)).toBe(5);
  });

  test('adds two negative numbers', () => {
    expect(calculator.add(-5, -3)).toBe(-8);
  });

  test('adds zero to a number', () => {
    expect(calculator.add(5, 0)).toBe(5);
  });

  test('adds decimal numbers', () => {
    expect(calculator.add(2.5, 3.5)).toBe(6);
  });
});

describe('Calculator - Subtraction Tests', () => {
  test('subtracts two positive numbers (10 - 4)', () => {
    expect(calculator.subtract(10, 4)).toBe(6);
  });

  test('subtracts larger number from smaller', () => {
    expect(calculator.subtract(5, 10)).toBe(-5);
  });

  test('subtracts negative numbers', () => {
    expect(calculator.subtract(10, -4)).toBe(14);
  });

  test('subtracts zero from a number', () => {
    expect(calculator.subtract(5, 0)).toBe(5);
  });

  test('subtracts decimal numbers', () => {
    expect(calculator.subtract(10.5, 2.5)).toBe(8);
  });
});

describe('Calculator - Multiplication Tests', () => {
  test('multiplies two positive numbers (45 * 2)', () => {
    expect(calculator.multiply(45, 2)).toBe(90);
  });

  test('multiplies positive and negative numbers', () => {
    expect(calculator.multiply(5, -3)).toBe(-15);
  });

  test('multiplies two negative numbers', () => {
    expect(calculator.multiply(-5, -3)).toBe(15);
  });

  test('multiplies by zero', () => {
    expect(calculator.multiply(5, 0)).toBe(0);
  });

  test('multiplies decimal numbers', () => {
    expect(calculator.multiply(2.5, 4)).toBe(10);
  });

  test('multiplies by one', () => {
    expect(calculator.multiply(5, 1)).toBe(5);
  });
});

describe('Calculator - Division Tests', () => {
  test('divides two positive numbers (20 / 5)', () => {
    expect(calculator.divide(20, 5)).toBe(4);
  });

  test('divides positive by negative number', () => {
    expect(calculator.divide(10, -2)).toBe(-5);
  });

  test('divides two negative numbers', () => {
    expect(calculator.divide(-10, -2)).toBe(5);
  });

  test('divides resulting in decimal', () => {
    expect(calculator.divide(7, 2)).toBe(3.5);
  });

  test('divides by one', () => {
    expect(calculator.divide(5, 1)).toBe(5);
  });

  test('throws error when dividing by zero', () => {
    expect(() => calculator.divide(10, 0)).toThrow('Cannot divide by zero');
  });

  test('throws specific error type for division by zero', () => {
    expect(() => calculator.divide(5, 0)).toThrow(Error);
  });
});

describe('Calculator - Edge Cases and Special Tests', () => {
  test('handles very large numbers', () => {
    expect(calculator.add(1000000, 2000000)).toBe(3000000);
  });

  test('handles very small decimal numbers', () => {
    expect(calculator.add(0.1, 0.2)).toBeCloseTo(0.3);
  });

  test('multiplication by zero always returns zero', () => {
    expect(calculator.multiply(999, 0)).toBe(0);
  });

  test('operations maintain precision with decimals', () => {
    expect(calculator.divide(10, 4)).toBe(2.5);
  });
});

describe('Calculator - Expression Evaluation Tests', () => {
  test('evaluates addition expression "2 + 3"', () => {
    expect(evaluateExpression('2 + 3')).toBe(5);
  });

  test('evaluates subtraction expression "10 - 4"', () => {
    expect(evaluateExpression('10 - 4')).toBe(6);
  });

  test('evaluates multiplication expression "45 * 2"', () => {
    expect(evaluateExpression('45 * 2')).toBe(90);
  });

  test('evaluates division expression "20 / 5"', () => {
    expect(evaluateExpression('20 / 5')).toBe(4);
  });

  test('handles whitespace in expressions', () => {
    expect(evaluateExpression('  10  +  5  ')).toBe(15);
  });

  test('handles negative numbers in expressions', () => {
    expect(evaluateExpression('-5 + 3')).toBe(-2);
  });

  test('handles decimal numbers in expressions', () => {
    expect(evaluateExpression('10.5 - 2.5')).toBe(8);
  });

  test('throws error for invalid expression format', () => {
    expect(() => evaluateExpression('10 ++ 5')).toThrow('Invalid expression format');
  });

  test('throws error for missing operand', () => {
    expect(() => evaluateExpression('10 +')).toThrow('Invalid expression format');
  });

  test('throws error for division by zero in expression', () => {
    expect(() => evaluateExpression('10 / 0')).toThrow('Cannot divide by zero');
  });
});

describe('Calculator - Real-world Usage Tests', () => {
  test('calculate total cost with tax (45 * 1.2)', () => {
    expect(evaluateExpression('45 * 1.2')).toBe(54);
  });

  test('calculate split bill (100 / 4)', () => {
    expect(evaluateExpression('100 / 4')).toBe(25);
  });

  test('calculate change (50 - 25.50)', () => {
    expect(evaluateExpression('50 - 25.50')).toBe(24.5);
  });

  test('calculate total distance (100 + 50 + 25)', () => {
    // Note: This uses the basic add function twice
    const total = calculator.add(calculator.add(100, 50), 25);
    expect(total).toBe(175);
  });
});
