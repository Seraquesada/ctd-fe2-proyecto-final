import {  createContext, useContext, useMemo, useState } from "react";
import { IModal, INoticiasNormalizadas } from "./types";


const initialState = {
    modal: null
    };

const ModalContext = createContext<IModal | undefined>(undefined);

export const ModalContextProvider = ({children}:any)=>{
    const [modal, setModal] = useState<INoticiasNormalizadas | null>(initialState.modal);

    const value = useMemo(
        () => ({
            modal,
            setModal
        }),
        [modal]
    );
    return(
        <ModalContext.Provider value={value}>
            {children}
        </ModalContext.Provider>
    )
};

const useModalContext = (): IModal => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('Modal must be called inside ModalContextProvider');
    }
    return context;
};

export default useModalContext;