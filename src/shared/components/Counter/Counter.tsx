import React from 'react';

interface ICounter {
  count: number;
  onChange: (arg: number) => void;
}

const Counter = ({ count, onChange }: ICounter) => {
  return (
    <div className="relative flex flex-row h-8 mt-1 bg-transparent rounded-lg">
      <button
        className="w-8 h-full px-2 bg-white border border-r-0 border-gray-400 cursor-pointer focus:outline-none focus:shadow-outline rounded-l-md"
        onClick={() => onChange(count - 1)}
      >
        <span className="m-auto text-xl font-thin">−</span>
      </button>
      <input
        type="number"
        disabled
        name="custom-input-number"
        min="0"
        className="flex items-center w-12 text-center bg-white border-t border-b border-gray-400"
        value={count}
      />
      <button
        onClick={() => onChange(count + 1)}
        className="w-8 h-full px-2 bg-white border border-l-0 border-gray-400 cursor-pointer focus:outline-none focus:shadow-outline rounded-r-md"
      >
        <span className="m-auto text-xl font-thin">+</span>
      </button>
    </div>
  );
};

export default Counter;
