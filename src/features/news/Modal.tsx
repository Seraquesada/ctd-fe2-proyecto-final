
import ModalFree  from "./ModalFree";
import ModalPremium  from "./ModalPremium";
import useModalContext from "./context";
import { ContenedorModal } from "./styled";


const Modal = () =>{
    const { modal } = useModalContext();
    return(
        <>
        { modal && 
            <ContenedorModal>
            {modal?.esPremium ? <ModalPremium/>: <ModalFree/>} 
            </ContenedorModal>
        }
        </>
    )
}

export default Modal; 