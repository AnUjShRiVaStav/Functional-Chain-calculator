import React from "react";

const ChainLine: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={`absolute w-1 bg-blue-500 ${className}`}
      style={{ height: "50px" }}
    />
  );
};

export default ChainLine;
