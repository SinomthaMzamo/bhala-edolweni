import React, { useState, useEffect } from "react"

const Counter = ({initialCount}) => {
    // Hooks need to be top level statements
    const [count, updateCount] = useState(initialCount);

    const increment = () => {
        updateCount((prev) => prev + 1);
    };

    const decrement = () => {
        updateCount((prev) => prev - 1);
    };

    const reset = () => {
        updateCount(0);
    };

    const switchSigns = () => {
        updateCount((prev) => prev * -1);
    }

    return(
        <>
            <h1>
                Count: <h3 data-testid="count">{count}</h3>
            </h1>
            <div className="">
                <button onClick={increment}>+</button>
                <button onClick={decrement}>-</button>
                <button onClick={reset}>Reset</button>
                <button onClick={switchSigns}>flip</button>
            </div>
        </>
    );
};

export default Counter;

