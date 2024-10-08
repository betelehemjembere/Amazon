import React, { createContext, useReducer } from 'react'
// import { initialstate,reducer } from '../../../Utility/reducer';


export const DataContext=createContext();


export const Dataprovider=({children,reducer,initialstate})=>{
    return(
        <DataContext.Provider value={useReducer(reducer,initialstate)}>
                {children}
        </DataContext.Provider>
    )
}