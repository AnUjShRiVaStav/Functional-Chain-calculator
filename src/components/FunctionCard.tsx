import React from "react";
import "./FunctionCard.scss"

interface FunctionCardProps {
  id: number;
  equation: string;
  onEquationChange: (id: number, newEq: string) => void;
  nextFunction: string;
}

const FunctionCard: React.FC<FunctionCardProps> = ({
  id,
  equation,
  onEquationChange,
  nextFunction,
}) => {
  return (
    <div className="border border-gray-300 p-4 rounded-lg shadow-md bg-white w-64">
      <h3 className="text-lg font-semibold mb-2">Function: {id}</h3>
      <label className="block text-sm mb-1">Equation</label>
      <input
        type="text"
        value={equation}
        onChange={(e) => onEquationChange(id, e.target.value)}
        className="border border-gray-300 rounded-md p-2 w-full"
      />
      <label className="block text-sm mt-4 mb-1">Next function</label>
      <select
        className="border border-gray-300 rounded-md p-2 w-full bg-gray-100 cursor-not-allowed"
        disabled
        value={nextFunction}
      >
        <option>{nextFunction}</option>
      </select>

      <div className="flex justify-between mt-16">
      <div className="bullet-box-01">
            <input type="radio" checked={true} className="input-01" />
            <span>input</span>
            {/* <div className="line-01"></div> */}
            </div>
      <div className="bullet-box-02">
            <span>output</span>
            <input type="radio" checked={true} className="input-02" />
            {/* <div className="line-02"></div> */}
            </div>


      </div>



    </div>
  );
};

export default FunctionCard;
