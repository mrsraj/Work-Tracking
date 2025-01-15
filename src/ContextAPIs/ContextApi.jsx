import React, { createContext, useContext, useState } from "react";

// Create the context
const MyContext = createContext(null);

// Context Provider component
function ContextProvider({ children }) {
    const [logIn, setLogin] = useState(localStorage.getItem('user_id'));
    const [isAuthenticated, setAuthenticated] = useState(null);
    const [cardId, setCardId] = useState()

    return (
        <MyContext.Provider
            value={{
                setLogin, logIn,
                isAuthenticated, setAuthenticated,
                cardId, setCardId
            }}
        >
            {children}
        </MyContext.Provider>
    );
}

// Custom hook to consume the context
function useMyContext() {
    const context = useContext(MyContext);
    if (!context) {
        throw new Error("useMyContext must be used within a MyContext.Provider");
    }
    return context;
}

export { ContextProvider, useMyContext };