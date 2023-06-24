import {screen } from "@testing-library/react";
import {render} from "../../test-utils"
import Noticias from "./Noticias";
import userEvent from "@testing-library/user-event";


describe("NoticiasComponent", () => {

    it("Should render three buttons", async () => {
        render(<Noticias/>)
        
        const buttons = await screen.findAllByRole('button');
        expect(buttons.length).toBe(3);
    });
    it("Should render button Suscribite when prop esPremium is true", async () => {
        render(<Noticias/>)
        
        const buttons = await screen.findAllByRole('button');
        const buttonVerMas3 = buttons[buttons.length - 1];

        userEvent.click(buttonVerMas3)

        const buttonSuscribite = await screen.findByRole('button'); 
        expect(buttonSuscribite).toBeInTheDocument();
    })
})

export {};