import {
    CloseButton,
    TarjetaModal,
    DescripcionModal,
    ImagenModal,
    TituloModal,
    BotonSuscribir,
    CotenedorTexto,
} from "./styled";
import { SuscribeImage, CloseButton as Close } from "../../assets";
import useModalContext from "./context";




const ModalPremium = () =>{
    const { setModal} = useModalContext();

    return(
        <TarjetaModal>
            <CloseButton onClick={() => {
                setModal(null);

            }}>
                <img src={Close} alt="close-button" />
            </CloseButton>
            <ImagenModal src={SuscribeImage} alt="mr-burns-excelent" />
            <CotenedorTexto>
                <TituloModal>Suscríbete a nuestro Newsletter</TituloModal>
                <DescripcionModal>
                    Suscríbete a nuestro newsletter y recibe noticias de
                    nuestros personajes favoritos.
                </DescripcionModal>
                <BotonSuscribir
                    onClick={() =>
                        setTimeout(() => {
                        alert("Suscripto!");
                        setModal(null);
                    }, 1000)
                    }
                >
                    Suscríbete
                </BotonSuscribir>
            </CotenedorTexto>
        </TarjetaModal>
    )
};

export default ModalPremium;