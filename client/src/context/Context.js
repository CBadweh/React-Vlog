import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";

// Initial State when there's no user loggin 
const INITIAL_STATE = {
    // Once we loggin in, we can acces this 'user' at any pages
    user: JSON.parse(localStorage.getItem("user")) || null,  // if there's a user in local storage, that that user, else null 
    isFetching: false,
    error: false,
};

export const Context = createContext(INITIAL_STATE);

//  Create a wraper where pages can access the INITIAL_STATE's 'user'
export const ContextProvider = ({ children }) => {
    // using our Recuder from Recuder.js to update INITIAL_STATE
    const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

    // add user in Local Storage from inspect/Application/Storage
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user));
    }, [state.user]);

    return (
        <Context.Provider
            // value to pass
            value={{
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                dispatch, // dispatch successful or error
            }}
        >
            {children}
        </Context.Provider>
    );
};