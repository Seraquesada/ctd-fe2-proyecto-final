import { screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import { render } from "../../test-utils"
import Bio from "./Bio";
import userEvent from "@testing-library/user-event";


beforeAll(() => {})

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {})

// Clean up after the tests are finished.
afterAll(() => {})

describe("Bio", () => {
    const onClick = jest.fn();
    afterEach(() => {
        jest.clearAllMocks();
    });
    //works
    test("Should render five buttons",async ()=>{
        render(<Bio/>)
        const buttons = screen.getAllByRole('button');
        expect(buttons.length).toBe(5);
        
    });
    //works
    test("Should render character Bart Simpson by default", ()=>{
        render(<Bio/>)
        const characterSearch = screen.getByText("Bart Simpson");
        expect(characterSearch).toBeInTheDocument();
        expect(characterSearch).toHaveTextContent("Bart Simpson");
        expect(characterSearch).not.toHaveTextContent("Marge Simpson");
        
    });
    //works
    test("Should render the correct character and change the style of the button", async ()=>{
        render(<Bio/>)
        

        const button = await screen.findByRole('button',{name : "MARGE"});
        
        button.onclick = onClick;
        userEvent.click(button);
        
        await waitFor(()=>expect(onClick).toHaveBeenCalled());

        const characterSearch = await screen.findByText("Marge Simpson");
        expect(characterSearch).toBeInTheDocument();
        expect(characterSearch).toHaveTextContent("Marge Simpson");
        expect(characterSearch).not.toHaveTextContent("Bart Simpson");
        await waitFor(()=>{
            expect(button.className).toBe("sc-iGgWBj fRoafO");
        })
    })
})