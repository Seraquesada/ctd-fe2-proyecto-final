import { rest } from "msw";
import { setupServer } from "msw/node";
import { API_URL } from "../../app/constants";
import { screen } from "@testing-library/react";
import { render } from "../../test-utils"
import Bio from "./Bio";
export const handlers = [
    rest.get(API_URL, (req, res, ctx) => {
    }),
];

const server = setupServer(...handlers);
// Establish API mocking before all tests.
beforeAll(() => server.listen())

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers())

// Clean up after the tests are finished.
afterAll(() => server.close())

describe("Bio", () => {
    test.skip("Should render five buttons",async()=>{
        render(<Bio/>)

        const buttons = screen.getAllByRole('button');
        expect(buttons.length).toBe(5);

    })
})