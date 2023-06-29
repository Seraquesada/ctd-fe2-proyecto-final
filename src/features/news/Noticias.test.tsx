
import { screen } from "@testing-library/react";
import { render } from "../../test-utils"
import Noticias from "./Noticias";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import _default from "react-redux/es/components/connect";

const data = [
    {
        id: 1,
        titulo: "Los Simpson 'predijeron' escasez de combustible",
        descripcion: `La más reciente es una teoría de que un episodio de 2010 del programa,
            titulado "Lisa Simpson, esta no es tu vida", predijo la crisis de combustible en el Reino Unido.
            Tras los informes de escasez de más de 100.000 vehículos, muchos conductores han estado comprando
            gasolina por pánico, lo que ha llevado a estaciones vacías apenas unas horas después de abiertas.
            Esto ha sido comparado con la escena de Los Simpson en la que se puede ver a Homero llenando el 
            maletero de su coche con 1,000 galones de combustible para ganar un juguete promocional para su hija Maggie.`,
        imagen:
            "https://i2-prod.mirror.co.uk/incoming/article25142408.ece/ALTERNATES/s615b/0_SIMPSONSJPG.jpg",
        fecha: new Date(),
        esPremium: false,
        fuente:
            "https://www.mirror.co.uk/tv/tv-news/simpsons-fans-convinced-show-predicted-25140770",
    },
    {
        id: 2,
        titulo: "Los Simpsons se asocian con Marvel",
        descripcion: `Los Simpson se han asociado con Marvel para lanzar un nuevo corto exclusivo de Disney+. 
            "The Good, The Bart y The Loki" estará disponible exclusivamente para ver por aquellos que están registrados 
            en el servicio de suscripción.`,
        imagen:
            "https://i2-prod.mirror.co.uk/incoming/article24436503.ece/ALTERNATES/n310p/0_DISNEY.jpg",
        fecha: new Date(),
        esPremium: false,
        fuente:
            "https://www.mirror.co.uk/tv/tv-news/simpsons-teams-up-marvel-exciting-24435616",
    },
    {
        id: 3,
        titulo:
            "Los Simpson mostraron a Richard Branson en el espacio en un episodio de 2014",
        descripcion: `En un capítulo que se emitió por primera vez en 2014, un Richard
            Branson animado se reclinó y sonrió mientras flotaba en una nave espacial y admiraba algunas
            obras de arte. Naturalmente, los fanáticos de Los Simpson no tardaron mucho en
            expresar su sorpresa ya que la serie había previsto otro gran evento.`,
        imagen:
            "https://i2-prod.mirror.co.uk/incoming/article24547200.ece/ALTERNATES/s615b/0_EHP_CHP_160721The-Simpsons_53631JPG.jpg",
        fecha: new Date(),
        esPremium: true,
        fuente:
            "https://www.mirror.co.uk/tv/tv-news/simpsons-correctly-predicts-future-again-24547074",
    },
];

export const handlers = [
    rest.get("./fakeRest/obtenerNoticias", (req, res, ctx) => {
        return res(ctx.json(data), ctx.status(200));
    }),
    ];

describe.skip("Noticias", () => {

    it.skip("Should render the title and the news", async () => {
        render(<Noticias/>)
        jest.setTimeout(2000);
        
        const title = await screen.findByText("Noticias de los Simpsons");
        expect(title).toBeInTheDocument();
        
        const news = await screen.findAllByRole("button", {name:/Ver más/i});
        expect(news.length).toBe(3);
        
    });

    it.skip("Should render button Suscribite when prop esPremium is true", async () => {
        render(<Noticias />)
        jest.setTimeout(2000);
        const buttons = await screen.findAllByRole("button", {name:/Ver más/i});
        expect(buttons.length).toBe(3);
        const buttonVerMas3 = buttons[buttons.length - 1];

        userEvent.click(buttonVerMas3)

        const buttonSuscribite = await screen.findByRole('button');
        expect(buttonSuscribite).toBeInTheDocument();

    });

})

