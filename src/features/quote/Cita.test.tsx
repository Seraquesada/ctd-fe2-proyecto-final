import { rest } from "msw";
import { setupServer } from "msw/node";
import { fireEvent, screen, waitFor, } from "@testing-library/react";
import { render } from "../../test-utils"
import { API_URL } from "../../app/constants";

import Cita from "./Cita";
import userEvent from "@testing-library/user-event";
import { mockedCitas } from "./mockedCitas";


const randomQuote = mockedCitas[0].data;
const validQueries = mockedCitas.map((q) => q.query);

const handlers = [
  rest.get(`${API_URL}`, (req, res, ctx) => {
    const character = req.url.searchParams.get('character');

    if (character === null) {
      return res(ctx.json([randomQuote]), ctx.delay(150));
    }

    if (validQueries.includes(character)) {
      const quote = mockedCitas.find((q) => q.query === character);
      return res(ctx.json([quote?.data]));
    }

    return res(ctx.json([]), ctx.delay(150));
  }),
];


const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

const renderComponent = () => {
  render(
    <Cita />
  );
}

describe.skip("Cita component", () => {
  const onClickObtenerCita = jest.fn();
  const onClickBorrar = jest.fn();
  afterEach(() => {
    jest.clearAllMocks();
  });
  //Works
  describe("First render", () => {

    it("should render No se encontro ninguna cita", async () => {
      renderComponent();
      expect(
        screen.getByText(/No se encontro ninguna cita/i)
      ).toBeInTheDocument();
    });
    it("should render Obtener cita aleatoria when input is empty", async () => {
      renderComponent()
      expect(screen.getByRole("button", { name: /Obtener cita aleatoria/i })).toBeInTheDocument();
    })

    it("should render Obtener Cita when input has value", async () => {
      renderComponent()
      const input = screen.getByRole('textbox', { name: /author cita/i });
      fireEvent.change(input, { target: { value: /Homer Simpson/i } });

      const buttonSearch = await screen.findByRole('button', { name: /Obtener Cita/i });

      expect(buttonSearch).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /Obtener cita aleatoria/i })).not.toBeInTheDocument();

    })
    it("should clean input when button borrar is called", async () => {
      renderComponent()

      const input = screen.getByRole('textbox', { name: /author cita/i });
      await userEvent.type(input, "Homer Simpson");
      expect(input).toHaveDisplayValue("Homer Simpson");

      const buttonDelete = screen.getByRole("button", { name: /Borrar/i });
      buttonDelete.onclick = onClickBorrar;
      userEvent.click(buttonDelete);

      await waitFor(() => {
        expect(onClickBorrar).toHaveBeenCalled();
      });
      expect(input).toBeInTheDocument();
      expect(input).toHaveDisplayValue("");

    })
  });
  //Works
  describe("when executing the query", () => {
    it("Should render Cargando", async () => {
      renderComponent()

      const buttonSearch = await screen.findByRole("button", { name: /Obtener cita aleatoria/i });
      userEvent.click(buttonSearch);
      const textCargando = await screen.findByText(/Cargando/i);
      expect(textCargando).toBeInTheDocument();

    });
  });
  //Works
  describe("When the query is successful", () => {
    test("Should give a random character when input is empty", async () => {
      renderComponent()

      const input = screen.getByRole('textbox', { name: /Author Cita/i });

      const buttonSearch = await screen.findByRole("button", { name: /Obtener cita aleatoria/i });
      buttonSearch.onclick = onClickObtenerCita;
      userEvent.click(buttonSearch);

      expect(input).toBeInTheDocument();
      expect(input).toHaveDisplayValue("");
      expect(buttonSearch).toBeInTheDocument();

      await waitFor(() => {
        expect(onClickObtenerCita).toHaveBeenCalled();
      });

      const character = await screen.findByText(/Moe Szyslak/i);
      expect(character).toBeInTheDocument();

    });

    test("Should retun the character search", async () => {
      renderComponent()

      const input = screen.getByRole('textbox', { name: 'Author Cita' });
      userEvent.click(input);

      await userEvent.type(input, "Homer")
      const buttonSearch = await screen.findByText(/Obtener Cita/i);
      expect(input).toBeInTheDocument();
      expect(buttonSearch).toBeInTheDocument();

      buttonSearch.onclick = onClickObtenerCita;
      userEvent.click(buttonSearch);

      await waitFor(() => {
        expect(onClickObtenerCita).toHaveBeenCalled();
      });

      await waitFor(() => {
        expect(screen.getByText(mockedCitas[1].data.character)).toBeInTheDocument();
      })

      await waitFor(() => { 
        expect(screen.getByText(mockedCitas[1].data.quote)).toBeInTheDocument()
      });

    });

  });
  //Works
  describe("When the query is wrongly called", () => {
    it("Should retun Por favor ingrese un nombre válido when it is called with a number", async () => {
      renderComponent()

      const input = screen.getByRole('textbox', { name: /author cita/i });
      fireEvent.change(input, { target: { value: 9 } });

      const buttonSearch = await screen.findByRole("button", { name: /Obtener cita/i });
      userEvent.click(buttonSearch);

      const textError = await screen.findByText(/Por favor ingrese un nombre válido/i);
      expect(textError).toBeInTheDocument();

    });

    it("Should retun No se encontro ninguna cita when it is called with name that does not exist", async () => {
      renderComponent();

      const input = screen.getByRole('textbox', { name: /author cita/i });
      await userEvent.type(input, "Serafin");

      const buttonSearch = await screen.findByRole("button", { name: /Obtener Cita/i });
      userEvent.click(buttonSearch);

      const textError = await screen.findByText(/No se encontro ninguna cita/i);
      expect(textError).toBeInTheDocument();

    })
  });
});