import { INoticiasNormalizadas } from "./types";
import { INoticias } from "./fakeRest";

export const formatearNoticias = (noticias : INoticias[]) : INoticiasNormalizadas[]  => {
    return noticias.map((n) => {
        const titulo = useCapitalizarPalabras(n.titulo);
        const minutosTranscurridos = useCalcularMinutos(n.fecha);
        return {
            id: n.id,
            titulo,
            descripcion: n.descripcion,
            fecha: `Hace ${minutosTranscurridos} minutos`,
            esPremium: n.esPremium,
            imagen: n.imagen,
            descripcionCorta: n.descripcion.substring(0, 100),
        };
    });
};

const useCapitalizarPalabras = (str : String) => {
    return str
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};

const useCalcularMinutos = (fecha : Date) : number => {
    const ahora = new Date();
    const minutosTranscurridos = Math.floor((ahora.getTime() - fecha.getTime()) / 60000);
    return minutosTranscurridos;
};
