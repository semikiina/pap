import React, { createContext, useState } from 'react'

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState({});
    const [storeA, setStoreA] = useState({});

    return (
        <AuthContext.Provider value={{user, setUser, storeA, setStoreA}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
