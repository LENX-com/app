import React, { useState } from "react";

const RadioBox = ({ prices, handleFilters }) => {
    const [value, setValue] = useState(0);

    const handleChange = event => {
        handleFilters(event.target.value);
        setValue(event.target.value);
    };

    return prices?.map((p, i) => (
    <label className="flex justify-start items-start">
        <div className="bg-white border-2 rounded border-gray-400 w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500">
          <input 
                type="checkbox"
                className="opacity-0 absolute"
                onChange={handleChange}
                value={`${p._id}`}
                name={p}
                />
          <svg className="fill-current hidden w-4 h-4 text-green-500 pointer-events-none" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z" /></svg>
        </div>
        <div className="select-none"> { p.name } </div>
      </label>
    ));
};

export default RadioBox;

