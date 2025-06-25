import { useState } from "react";

//^ here we don't need to export default b/c it's component  , also It use inside client component so it is also work as client component , here no need to use "use client" at top
export const Counter = () => {
  const [valueInc, setValueInc] = useState(0);
  return (
    <div>
      Counter
      <button
        className="bg-cyan-800 px-2 py-1 rounded"
        onClick={() => setValueInc((prev) => prev + 1)}
      >
        click {valueInc}
      </button>
    </div>
  );
};
