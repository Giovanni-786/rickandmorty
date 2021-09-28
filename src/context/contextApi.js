import React, { createContext, useState, useContext } from 'react';



const BoardContext = createContext(); 

export default function BoardProvider({ children }){
   
    const [currentPage, setCurrentPage] = useState(0);
   

    return (
        <BoardContext.Provider value={{
            currentPage,
            setCurrentPage    
        }}>
            {children}
        </BoardContext.Provider>
    )

}

export function useBoard(){
    const context = useContext(BoardContext)

    const {currentPage, setCurrentPage} = context;

    return {currentPage, setCurrentPage}

}
