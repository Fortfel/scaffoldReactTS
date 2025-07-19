// eslint-test.ts - Save this file and run ESLint on it

import React from 'react'

// Unused variable (should trigger no-unused-vars)
const unusedVariable = 'this will cause an error'

// Missing return type (should trigger @typescript-eslint rules)
function badFunction(param) {
  // No explicit any type
  const data: any = param

  // Console.log (might trigger no-console if enabled)
  console.log(data)

  // Missing return statement for non-void function
}

// Unused parameter (should trigger no-unused-parameters)
const arrowFunction = (usedParam: string, unusedParam: number) => {
  return usedParam.toUpperCase()
}

// Bad React component
const BadComponent = () => {
  // Missing dependency in useEffect
  const [count, setCount] = React.useState(0)
  const someValue = 42

  React.useEffect(() => {
    // Using someValue but not in dependencies array
    console.log(someValue + count)
  }, [count]) // Missing someValue dependency

  // Event handler without useCallback (might trigger react-hooks rules)
  const handleClick = () => {
    setCount(count + 1) // Should use functional update
  }

  return <button onClick={handleClick}>Click me</button>
}

// Poor practices that various rules should catch
const messyCode = {
  // Trailing comma issues
  prop1: 'value1',
  prop2: 'value2', // Extra comma
}

// Non-null assertion (should trigger @typescript-eslint/no-non-null-assertion)
const element = document.getElementById('test')!

// Prefer const assertion (might trigger unicorn rules)
const array = ['a', 'b', 'c'] as const

// Double negation (should trigger unicorn/prefer-logical-operator-over-negation)
const isValid = !!someValue

// Export to avoid module errors
export { BadComponent, arrowFunction, messyCode }
