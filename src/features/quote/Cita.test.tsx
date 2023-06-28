import { rest } from "msw";
import { setupServer } from "msw/node";
import {  fireEvent, screen, waitFor,} from "@testing-library/react";
import {  render  } from "../../test-utils"
import { API_URL } from "../../app/constants";

import Cita from "./Cita";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

const data = [
  {
    cita: "I cant even say the word titmouse without gigggling like a schoolgirl.",
    personaje: "Homer Simpson",
    imagen: "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FHomerSimpson.png?1497567511939",
    direccionPersonaje: "Right",
  }
];

export const handlers = [
    rest.get(API_URL, (req, res, ctx) => {
      return res(ctx.json(data), ctx.status(200));
    }),
  ];
  
const server = setupServer(...handlers);

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

  describe("Cita component", () => {

      //Works
      describe("testing buttons",()=>{

        it.skip("should render Obtener cita aleatoria when input is empty", async ()=>{
          render(<Cita/>)
          expect(screen.getByRole("button",{name:/Obtener cita aleatoria/i})).toBeInTheDocument();
        })

        it.skip("should render Obtener Cita when input has value", async ()=>{
          render(<Cita/>)
          const input = screen.getByRole('textbox', { name: /author cita/i });
          fireEvent.change(input, { target: { value: /Homer Simpson/i } });
          
          const buttonSearch = await screen.findByRole('button', {name: /Obtener Cita/i});
          
          expect(buttonSearch).toBeInTheDocument();
          expect(screen.queryByRole('button', { name: /Obtener cita aleatoria/i })).not.toBeInTheDocument();

        })

        it.skip("should clean input when button borrar is called", async() => {
          render(<Cita/>)
          const onClickBorrar = jest.fn();
          const input = screen.getByRole('textbox', {name: /author cita/i});
          fireEvent.change(input, { target: { value: "Homer Simpson"} });
          
          const buttonDelete = screen.getByRole("button", {name:/Borrar/i});
          buttonDelete.onclick = onClickBorrar;
          userEvent.click(buttonDelete);

          await waitFor(()=>{
            expect(onClickBorrar).toHaveBeenCalled();
          });
          expect(input).toBeInTheDocument();
          expect(input).toHaveDisplayValue("");

        })
      });
      //Works
      describe("when executing the search", () =>{
        
        it.skip("Should render Cargando", async() => {
          render(<Cita/>)

          const buttonSearch = await screen.findByRole("button",{name:/Obtener cita aleatoria/i});
          userEvent.click(buttonSearch);  
          const textCargando = await screen.findByText(/Cargando/i);
          expect(textCargando).toBeInTheDocument();
          //screen.debug()
        });

      });

      describe("When the query is successful", () => {
        it("Should give a random character when input is empty", async () => {
          render(<Cita/>)
          const onClickObtenerCita = jest.fn();
          const input = screen.getByRole('textbox', {name: /Author Cita/i});
          userEvent.clear(input);

          const buttonSearch = await screen.findByRole("button",{name:/Obtener cita aleatoria/i});
          buttonSearch.onclick = onClickObtenerCita;
          userEvent.click(buttonSearch);

          expect(input).toBeInTheDocument();
          expect(input).toHaveDisplayValue("");
          expect(buttonSearch).toBeInTheDocument();

          await waitFor(()=>{
            expect(onClickObtenerCita).toHaveBeenCalled();
          });
          
          const character = await screen.findByText(/Homer Simpson/i);
          expect(character).toBeInTheDocument();
          
          });
        
        it.skip("Should retun the name of the search", async () => {
          
          render(<Cita/>);
          const onClickObtenerCita = jest.fn();
          const input = screen.getByRole('textbox', {name: /Author Cita/i});
          fireEvent.change(input, { target: { value: "Homer Simpson"} });
          
          const buttonSearch = screen.getByRole("button", {name: /Obtener Cita/i});

          expect(input).toBeInTheDocument();
          expect(buttonSearch).toBeInTheDocument();
          expect(input).toHaveDisplayValue("Homer Simpson");
          buttonSearch.onclick = onClickObtenerCita;
          userEvent.click(buttonSearch);
          
          await waitFor(()=>{
            expect(onClickObtenerCita).toHaveBeenCalled();
          });

          const character = await screen.findByText(/Homer Simpson/i);
          expect(character).toBeInTheDocument();

          screen.debug();
          });
        it.skip("Should retun the correct qoute", async () => {
          
            render(<Cita/>)

            const onClickObtenerCita = jest.fn();

            const input = screen.getByRole('textbox', {name: /Author Cita/i});
            fireEvent.change(input, { target: { value: "Homer Simpson"} });
            
            const buttonSearch = await screen.findByRole("button", {name: /Obtener Cita/i});
  
            expect(input).toBeInTheDocument();
            expect(buttonSearch).toBeInTheDocument();
  
            buttonSearch.onclick = onClickObtenerCita;
            userEvent.click(buttonSearch);
            
            await waitFor(()=>{
              expect(onClickObtenerCita).toHaveBeenCalled();
            });
  
            const character = await screen.findByText(data[0].cita);
            expect(character).toBeInTheDocument();
  
            screen.debug();
            });
      });
      
      //Works
      describe("When the query is wrongly called", () =>{
        it.skip("Should retun Por favor ingrese un nombre válido when it is called with a number", async ()=>{
              render(<Cita/>)

              const input = screen.getByRole('textbox', {name: /author cita/i});
              fireEvent.change(input, { target: { value: 9}});
              
              const buttonSearch = await screen.findByRole("button",{name:/Obtener cita/i});
              userEvent.click(buttonSearch);

              const textError = await screen.findByText(/Por favor ingrese un nombre válido/i);
              expect(textError).toBeInTheDocument();
              
          });

        it.skip("Should retun No se encontro ninguna cita when it is called with name that does not exist", async ()=>{
              render(<Cita/>)

              const input = screen.getByRole('textbox', {name: /author cita/i});
              fireEvent.change(input, { target: { value: "Serafin"}});

              const buttonSearch = await screen.findByRole("button",{name:/Obtener Cita/i});
              userEvent.click(buttonSearch);
              
              const textError = await screen.findByText(/No se encontro ninguna cita/i);
              expect(textError).toBeInTheDocument();
              
          })
      });
});