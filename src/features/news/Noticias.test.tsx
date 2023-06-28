
import { screen } from "@testing-library/react";
import { render } from "../../test-utils"
import Noticias from "./Noticias";
import userEvent from "@testing-library/user-event";


describe("NoticiasComponent", () => {

    it("Should render the title", async () => {
        render(<Noticias/>)
        const title = await screen.findByText("Noticias de los Simpsons");
        expect(title).toBeInTheDocument();
        jest.setTimeout(2000);
        const buttons = await screen.findAllByRole("button", {name:'Ver más'});
        expect(buttons.length).toBe(3);
        
    });
    
    it.skip("Should render button Suscribite when prop esPremium is true", async () => {
        render(<Noticias />)

        const buttons = await screen.findAllByRole('Ver más');
        expect(buttons.length).toBe(3);
        const buttonVerMas3 = buttons[buttons.length - 1];

        userEvent.click(buttonVerMas3)

        const buttonSuscribite = await screen.findByRole('button');
        expect(buttonSuscribite).toBeInTheDocument();
    });

})

