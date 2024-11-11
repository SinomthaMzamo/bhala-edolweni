import { render } from "@testing-library/react"
import Counter from "./Counter";

describe(Counter, () => {
    // unit tests go here
    it('counter desplays correct initial count', () =>{
        const expectedValue = 0;
        const {getByTestId} = render(<Counter initialCount={expectedValue}/>);
        const countValue = getByTestId('count').textContent;
        expect(countValue).toEqual(expectedValue);
    });
});

