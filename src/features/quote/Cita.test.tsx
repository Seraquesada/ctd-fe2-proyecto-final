import {screen } from "@testing-library/react";
import {render} from "../../test-utils"
import Cita from "./Cita";

import userEvent from "@testing-library/user-event";

describe("Cita component", () => {
    it("Should give a random character when input is empty", () => {

        render(<Cita/>)
        const  input = screen.getByPlaceholderText("Ingresa el nombre del autor");
        const buttonSearch = screen.getByText("Obtener cita aleatoria");

        userEvent.click(buttonSearch);

        expect(input).toBeInTheDocument();
        expect(buttonSearch).toHaveBeenCalled();

    });
})