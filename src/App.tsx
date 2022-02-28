import React, { useEffect, useState } from 'react';
import './App.css';

const button = 'px-4 py-2 bg-blue-500 hover:bg-sky-700 transition duration-50 text-white rounded-sm'
const zero = ' col-span-2 px-4 py-2 bg-blue-500 hover:bg-sky-700 transition duration-50 text-white rounded-sm'
const clear = 'col-span-2 px-4 py-2 bg-red-500 hover:bg-red-700 transition duration-50 text-white rounded-sm'
const equal = 'col-span-2 place-self-right px-4 py-2 bg-green-500 hover:bg-green-700 transition duration-50 text-white rounded-sm'

function App() {

  useEffect(() => {
    document.title = "Calculator"
  }, []);
  
  const [result, setResult] = useState({
    sign: "",
    value: 0,
    result: 0
  });

  const handleNumber = (val: any) => {
    console.log(val);
    setResult({
      ...result,
      value: 
        result.value === 0 && val === "0"                   // is the result = 0 and press 0 ?
        ? 0 : result.value % 1 === 0                        // result = 0 and press a number or decimal
        ? !result.value.toString().includes(".")            // is result contain a decimal ?   
        ? Number(result.value + val) : result.value + val   // add number to last digit
        : result.value + val,  
      result: 
        !result.sign ? 0 : result.result,
    });
    console.log(result);
  }

  const handleSign = (sign: any) => {
    setResult({
      ...result,
      sign: sign,
      value: 0,
      result: 
        !result.result && result.value 
        ? result.value : result.result,
    })
  }

  const handleDecimal = (decimal: any) => {
    setResult({
      ...result,
      value: 
        !result.value.toString().includes(".")    // only one decimal symbol allowed
        ? result.value + decimal : result.value,
    });
  }

  const handleEqual = () => {
    if (result.sign && result.value) {
      const math = (num1: any, num2: any, sign: any) =>
        sign === '+' ? num1 + num2 :
        sign === '-' ? num1 - num2 :
        sign === '*' ? num1 * num2 :
        num1 / num2;

      setResult({
        ...result,
        value: 0,
        sign: "",
        result:
          math(Number(result.result), Number(result.value), result.sign),
      });
    }
  }

  const handleClear = () => {
    setResult({
      ...result,
      sign: "",
      value: 0,
      result: 0,
    })
  }

  return (
    <>
      <div className='bg-yellow-100 max-w-4xl mx-auto my-16 flex justify-center'>
        <div className='pb-16'>
          <h1 className='my-8 font-bold text-4xl text-center'>Calculator</h1>
          <div className='text-right px-1 min-w-full mb-8 bg-white border border-black'>{result.value ? result.value : result.result}</div>
          <div className='grid grid-cols-4 gap-4'>
            <button onClick={() => handleNumber('1')} className={button}>1</button>
            <button onClick={() => handleNumber('2')} className={button}>2</button>
            <button onClick={() => handleNumber('3')} className={button}>3</button>
            <button onClick={() => handleSign('/')} className={button}>/</button>
            <button onClick={() => handleNumber('4')} className={button}>4</button>
            <button onClick={() => handleNumber('5')} className={button}>5</button>
            <button onClick={() => handleNumber('6')} className={button}>6</button>
            <button onClick={() => handleSign('*')} className={button}>*</button>
            <button onClick={() => handleNumber('7')}className={button}>7</button>
            <button onClick={() => handleNumber('8')}className={button}>8</button>
            <button onClick={() => handleNumber('9')}className={button}>9</button>
            <button onClick={() => handleSign('-')} className={button}>-</button>
            <button onClick={() => handleDecimal('.')} className={button}>.</button>
            <button onClick={() => handleNumber('0')}className={zero}>0</button>
            <button onClick={() => handleSign('+')} className={button}>+</button>
            <button onClick={handleClear} className={clear}>C</button>
            <button onClick={handleEqual} className={equal}>=</button>
          </div>
        </div>
      </div>
      <div className='flex max-w-4xl mx-auto'>
        <a href='https://www.sitepoint.com/react-tutorial-build-calculator-app/' target="_blank" rel="noreferrer noopenerr">
          Huge thanks for a tutorial from https://www.sitepoint.com/react-tutorial-build-calculator-app/
        </a>
      </div>
    </>
  );
}

export default App;
