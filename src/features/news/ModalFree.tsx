
import {
    CloseButton,
    TarjetaModal,
    DescripcionModal,
    ImagenModal,
    TituloModal,
    CotenedorTexto,
} from "./styled";
import { CloseButton as Close } from "../../assets";
import useModalContext from "./context";



const ModalFree = () =>{
    const { modal , setModal} = useModalContext();
    return(
        <TarjetaModal>
            <CloseButton onClick={() => {
                setModal(null)
            }}>
                <img src={Close} alt="close-button" />
            </CloseButton>
            <ImagenModal src={modal?.imagen} alt="news-image" />
            <CotenedorTexto>
                <TituloModal>{modal?.titulo}</TituloModal>
                <DescripcionModal>{modal?.descripcion}</DescripcionModal>
            </CotenedorTexto>
        </TarjetaModal>
    )
}

export default ModalFree;