import React, { useState, useEffect } from "react";
import FunctionCard from "./components/FunctionCard";
import "./index.css";
import "./style.scss";

const functionChain = [
  { id: 1, next: 2 },
  { id: 2, next: 4 },
  { id: 4, next: 5 },
  { id: 5, next: 3 },
  { id: 3, next: null },
];

const App: React.FC = () => {
  const [initialX, setInitialX] = useState<number>(2);
  const [equations, setEquations] = useState<Record<number, string>>({
    1: "x^2",
    2: "2x+4",
    3: "x^2+20",
    4: "x-2",
    5: "x/2",
  });
  const [finalOutput, setFinalOutput] = useState<number>(0);

  // Update the equation for a given function
  const handleEquationChange = (id: number, newEq: string) => {
    setEquations((prev) => ({ ...prev, [id]: newEq }));
  };

  // Evaluate a given equation string with the value of x
  const evaluateEquation = (equation: string, x: number): number => {
    try {
      // Step 1: Replace '^' with '**' for exponentiation
      let sanitizedEquation = equation.replace(/\^/g, "**");

      // Step 2: Add explicit multiplication where necessary before replacing x
      sanitizedEquation = sanitizedEquation.replace(/(\d)(x)/g, "$1 * $2"); // Add * between number and x
      sanitizedEquation = sanitizedEquation.replace(/(x)(\d)/g, "$1 * $2"); // Add * between x and number

      // Step 3: Replace x with its actual value
      sanitizedEquation = sanitizedEquation.replace(/x/g, `(${x})`);

      // Step 4: Use Function constructor to evaluate the sanitized equation
      return Function(`"use strict"; return (${sanitizedEquation})`)();
    } catch (error) {
      console.error("Invalid equation:", equation, error);
      return 0; // Return 0 if the equation is invalid
    }
  };


  // Dynamically derive the order of the function chain
  const getChainOrder = () => {
    const order = [];
    let current: any = functionChain.find((f) => f.id === 1); // Start with the function where id = 1
    while (current) {
      order.push(current.id);
      current = functionChain.find((f: any) => f.id === current.next);
    }
    return order;
  };

  // Compute the final output based on the function chain
  useEffect(() => {
    let value = initialX;
    const chainOrder = getChainOrder();

    console.log(`Initial x: ${value}`); // Log the initial value
    for (const funcId of chainOrder) {
      const prevValue = value;
      value = evaluateEquation(equations[funcId], value);
      console.log(
        `Function ${funcId}: Equation = "${equations[funcId]}", Input = ${prevValue}, Output = ${value}`
      );
    }

    setFinalOutput(value);
    console.log(`Final Output: ${value}`);
  }, [initialX, equations]);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Function Chain Calculator</h1>
      <div className="grid grid-rows-2 gap-16 relative">
        <div className="flex justify-center space-x-28 relative">
          <div className="input-container">
            <div className="font-inter text-xl font-semibold text-rgba-orange">
              Initial value of x
            </div>
            <div className="input-feild rounded-md">
              <input
                type="number"
                value={initialX}
                onChange={(e) => setInitialX(parseFloat(e.target.value))}
                className="w-full p-2 rounded-md"
              />
              <div className="bull-box">
                <div className="bullet-box-1">
                  <input type="radio" checked={true} className="input-1" />
                  <div className="line-1"></div>
                </div>
              </div>
            </div>
          </div>
          <FunctionCard
            id={1}
            equation={equations[1]}
            onEquationChange={handleEquationChange}
            nextFunction="Function 2"
          />
          <img src="src/assets/Vector 1.png" alt="line-2" className="line-2" />
          <FunctionCard
            id={2}
            equation={equations[2]}
            onEquationChange={handleEquationChange}
            nextFunction="Function 4"
          />
          <img src="src/assets/Vector 2.png" alt="line-3" className="line-3" />
          <img src="src/assets/Vector 4.png" alt="line-5" className="line-5" />
          <FunctionCard
            id={3}
            equation={equations[3]}
            onEquationChange={handleEquationChange}
            nextFunction="End"
          />
          <div className="output-container">
            <div className="font-inter text-xl font-semibold text-rgba-green">
              Final Output y
            </div>
            <div className="input-feild-green rounded-md">
              <div className="bull-box-green">
                <div className="bullet-box-1">
                  <input type="radio" checked={true} className="input-1" />
                  <div className="line-1-green"></div>
                </div>
              </div>
              <div className="text-black-700 w-full p-2 rounded-md final-output">{finalOutput.toFixed(2)}</div>
            </div>
          </div>
        </div>
        <div className="flex justify-center space-x-28 relative">
          <FunctionCard
            id={4}
            equation={equations[4]}
            onEquationChange={handleEquationChange}
            nextFunction="Function 5"
          />
          <img src="src/assets/Vector 1.png" alt="line-4" className="line-4" />
          <FunctionCard
            id={5}
            equation={equations[5]}
            onEquationChange={handleEquationChange}
            nextFunction="Function 3"
          />



        </div>
      </div>
    </div>
  );
};

export default App;
