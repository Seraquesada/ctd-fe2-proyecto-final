import { rest } from "msw";
import { setupServer } from "msw/node";
import { screen } from "@testing-library/react";
import { render } from "../../test-utils"
import { API_URL } from "../../app/constants";
import { Provider } from "react-redux";
import Noticias from "./Noticias";
import userEvent from "@testing-library/user-event";

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


describe("NoticiasComponent", () => {

    it.skip("Should render three buttons", async () => {
        render(<Noticias/>)
        
        const buttons = await screen.findAllByRole('button');
        expect(buttons.length).toBe(3);
    });
    it.skip("Should render button Suscribite when prop esPremium is true", async () => {
        render(<Noticias/>)
        
        const buttons = await screen.findAllByRole('button');
        const buttonVerMas3 = buttons[buttons.length - 1];

        userEvent.click(buttonVerMas3)

        const buttonSuscribite = await screen.findByRole('button'); 
        expect(buttonSuscribite).toBeInTheDocument();
    })
})

