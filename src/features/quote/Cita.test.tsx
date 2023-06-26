import { rest } from "msw";
import { setupServer } from "msw/node";
import {  fireEvent, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import {  render  } from "../../test-utils"
import { API_URL } from "../../app/constants";

import Cita from "./Cita";


import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

const data = {
  results : [
    {
      cita: "I cant even say the word titmouse without gigggling like a schoolgirl.",
      personaje: "Homer Simpson",
      imagen: "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FHomerSimpson.png?1497567511939",
      direccionPersonaje: "Right",
    }
  ]
}
export const handlers = [
    rest.get(API_URL, (req, res, ctx) => {
      return res(ctx.json(data), ctx.status(200));
    }),
    rest.get(API_URL, (req, res, ctx) => {
        
    }),
  ];
  
const server = setupServer(...handlers);

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

describe("Cita component", () => {
  const onClickObtenerCita = jest.fn();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onClickBorrar = jest.fn();


  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("When rendering", () => {})
  describe("when executing the search", () =>{

    it.skip("Should render Cargando", async() => {
      render(<Cita/>)

      const buttonSearch = await screen.findByLabelText("Obtener cita aleatoria");
      userEvent.click(buttonSearch);  
      const textCargando = await screen.findByText(/Cargando/i);
      expect(textCargando).toBeInTheDocument();
      //screen.debug()
    });

    it.skip("Should give a random character when input is empty", async () => {
        render(<Cita/>)
        
        const input = screen.getByPlaceholderText("Ingresa el nombre del autor");
        const buttonSearch = await screen.findByRole("button",{name:"Obtener cita aleatoria"});
        
        buttonSearch.onclick = onClickObtenerCita;
        userEvent.click(buttonSearch);

        await waitFor(() => screen.findByText(/Cargando/i));

        expect(input).toBeInTheDocument();
        expect(buttonSearch).toBeInTheDocument();
        await waitFor(()=>{expect(onClickObtenerCita).toHaveBeenCalled()});

        //screen.debug()
    });

    it("Should retun the name of the search with the same name", async () => {

      render(<Cita/>)
      
      const input = screen.getByPlaceholderText("Ingresa el nombre del autor");
      const buttonSearch = screen.getByRole('button', {name: /obtener cita/i});
    
      fireEvent.change(input, { target: { value: "Homer Simpson"} });
      buttonSearch.onclick = onClickObtenerCita;
      userEvent.click(buttonSearch);
      
      expect(input).toBeInTheDocument();
      expect(buttonSearch).toBeInTheDocument();
      await waitFor(()=>{
        expect(onClickObtenerCita).toHaveBeenCalled()
      });

      await waitFor(()=>{
        expect(screen.getByText(/Homer Simpson/i)).toBeInTheDocument();
      })
      

      screen.debug()
    })
    it.skip("Should retun Por favor ingrese un nombre válido when it is called with a number instead of string", async ()=>{
      render(<Cita/>)

      const buttonSearch = await screen.findByRole("button",{name:"Obtener cita aleatoria"});
      
      const input = screen.getByPlaceholderText("Ingresa el nombre del autor");

      buttonSearch.onclick = onClickObtenerCita;
      fireEvent.change(input, { target: { value: 9} });
      userEvent.click(buttonSearch);
      await waitFor(()=>{expect(onClickObtenerCita).toHaveBeenCalled()});
      const textError = await screen.findByText(/Por favor ingrese un nombre válido/i);
      expect(textError).toBeInTheDocument();
      //screen.debug()
    })
  })

})
  