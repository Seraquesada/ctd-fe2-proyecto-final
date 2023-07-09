import { useEffect, useState } from "react";
import { obtenerNoticias } from "./fakeRest";
import { formatearNoticias } from "./hooks";
import { INoticiasNormalizadas } from "./types";
import { ModalContextProvider } from "./context";
import ListadoNoticias from "./ListadoNoticias";
import  Modal from "./Modal";
import { ContenedorNoticias, TituloNoticias } from "./styled";


const Noticias = () => {
  const [noticias, setNoticias] = useState<INoticiasNormalizadas[]>([]);
  
  useEffect(() => {
      const obtenerInformacion = async () => {
        const respuesta = await obtenerNoticias();
        const data = formatearNoticias(respuesta);
        setNoticias(data);
    };
      obtenerInformacion();
// eslint-disable-next-line react-hooks/exhaustive-deps
},[]);

/*
    El hook useEffect tenia múltiples responsabilidades, como obtener las noticias, 
    formatear los datos y actualizar el estado. 
    Para aplicar el Principio de Responsabilidad Única, las dividi en funciones separadas cumpliendo el principio,
    adecide separaras las en otro archivo llamado "hooks" para genenar una mejor lectura del codigo.
*/ 


  return (
    <ModalContextProvider>
      <ContenedorNoticias>
        <TituloNoticias>Noticias de los Simpsons</TituloNoticias>
        <ListadoNoticias noticias={noticias} />
        <Modal/>
      </ContenedorNoticias>
    </ModalContextProvider>


  );
};

export default Noticias;
